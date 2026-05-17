import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import { dirname, extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, 'public')
const dataDir = join(__dirname, 'data')
const answersPath = join(dataDir, 'answers.json')
const port = Number(process.env.ANSWER_PORT || 5174)

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
}

async function ensureDataFile() {
  await mkdir(dataDir, { recursive: true })

  try {
    await readFile(answersPath, 'utf8')
  } catch {
    await writeFile(answersPath, '[]\n', 'utf8')
  }
}

async function readAnswers() {
  await ensureDataFile()
  const raw = await readFile(answersPath, 'utf8')

  try {
    const answers = JSON.parse(raw)
    return Array.isArray(answers) ? answers : []
  } catch {
    return []
  }
}

async function writeAnswers(answers) {
  await ensureDataFile()
  await writeFile(answersPath, `${JSON.stringify(answers, null, 2)}\n`, 'utf8')
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
  })
  response.end(JSON.stringify(payload))
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''

    request.on('data', chunk => {
      body += chunk
      if (body.length > 100_000) {
        reject(new Error('Request body is too large'))
        request.destroy()
      }
    })

    request.on('end', () => resolve(body))
    request.on('error', reject)
  })
}

function cleanAnswer(payload) {
  const answer = String(payload.answer || '').trim()
  const prompt = String(payload.prompt || '').trim()

  if (!answer || !prompt) {
    return null
  }

  return {
    id: randomUUID(),
    chapter: String(payload.chapter || 'Questions'),
    slideId: String(payload.slideId || ''),
    questionTitle: String(payload.questionTitle || 'Question'),
    prompt,
    answer,
    submittedAt: String(payload.submittedAt || new Date().toISOString()),
  }
}

function serveStaticFile(request, response) {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`)
  const pathname = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname
  const filePath = normalize(join(publicDir, pathname))

  if (!filePath.startsWith(publicDir)) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  const stream = createReadStream(filePath)

  stream.on('open', () => {
    response.writeHead(200, {
      'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream',
    })
    stream.pipe(response)
  })

  stream.on('error', () => {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
  })
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host}`)

  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {})
    return
  }

  if (requestUrl.pathname.startsWith('/api/answers')) {
    try {
      if (request.method === 'GET' && requestUrl.pathname === '/api/answers') {
        const answers = await readAnswers()
        sendJson(response, 200, { answers, total: answers.length })
        return
      }

      if (request.method === 'POST' && requestUrl.pathname === '/api/answers') {
        const body = await readRequestBody(request)
        const payload = JSON.parse(body || '{}')
        const nextAnswer = cleanAnswer(payload)

        if (!nextAnswer) {
          sendJson(response, 400, { error: 'Answer and prompt are required.' })
          return
        }

        const answers = await readAnswers()
        answers.push(nextAnswer)
        await writeAnswers(answers)
        sendJson(response, 201, nextAnswer)
        return
      }

      if (request.method === 'DELETE' && requestUrl.pathname === '/api/answers') {
        await writeAnswers([])
        sendJson(response, 200, { answers: [], total: 0 })
        return
      }

      if (request.method === 'DELETE' && requestUrl.pathname.startsWith('/api/answers/')) {
        const answerId = decodeURIComponent(requestUrl.pathname.replace('/api/answers/', '')).trim()
        const answers = await readAnswers()
        const nextAnswers = answers.filter(answer => answer.id !== answerId)

        if (nextAnswers.length === answers.length) {
          sendJson(response, 404, { error: 'Answer not found.' })
          return
        }

        await writeAnswers(nextAnswers)
        sendJson(response, 200, { answers: nextAnswers, total: nextAnswers.length })
        return
      }
    } catch (error) {
      sendJson(response, 500, { error: error.message })
      return
    }
  }

  serveStaticFile(request, response)
})

server.listen(port, () => {
  console.log(`George answers dashboard running at http://localhost:${port}/`)
})
