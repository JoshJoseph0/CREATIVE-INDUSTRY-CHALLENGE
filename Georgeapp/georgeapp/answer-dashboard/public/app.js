import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://nijwgwkuqqfzpgkeabkj.supabase.co'
const SUPABASE_KEY = 'sb_publishable_xdKxMhio-jRbjzu5Ak2ByQ_MXbw-GtD'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const answersGrid = document.querySelector('#answers-grid')
const answerCount = document.querySelector('#answer-count')
const clearButton = document.querySelector('#clear-button')
const statusDot = document.querySelector('#status-dot')
const statusText = document.querySelector('#status-text')

let currentAnswers = []

function setStatus(text, isOnline) {
  statusText.textContent = text
  statusDot.classList.toggle('status-dot--online', isOnline)
}

function formatTime(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Just now'
  }

  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  }).format(date)
}

function mapAnswer(row) {
  return {
    id: row.id,
    chapter: row.chapter,
    slideId: row.slide_id,
    questionTitle: row.question_title,
    prompt: row.prompt,
    answer: row.answer,
    submittedAt: row.submitted_at,
  }
}

function groupByQuestion(answers) {
  return answers.reduce((groups, answer) => {
    const key = answer.slideId || answer.questionTitle || answer.prompt

    if (!groups.has(key)) {
      groups.set(key, {
        title: answer.questionTitle || 'Question',
        prompt: answer.prompt,
        answers: [],
      })
    }

    groups.get(key).answers.push(answer)
    return groups
  }, new Map())
}

function createAnswerCard(answer) {
  const card = document.createElement('article')
  card.className = 'answer-card'

  const deleteButton = document.createElement('button')
  deleteButton.className = 'answer-delete'
  deleteButton.type = 'button'
  deleteButton.textContent = 'Delete'
  deleteButton.setAttribute('aria-label', `Delete answer from ${formatTime(answer.submittedAt)}`)
  deleteButton.addEventListener('click', async () => {
    deleteButton.disabled = true
    card.classList.add('answer-card--removing')

    try {
      const { error } = await supabase
        .from('answers')
        .delete()
        .eq('id', answer.id)

      if (error) throw error

      currentAnswers = currentAnswers.filter(item => item.id !== answer.id)
      renderAnswers(currentAnswers)
      setStatus('Live', true)
    } catch (error) {
      deleteButton.disabled = false
      card.classList.remove('answer-card--removing')
      setStatus('Delete failed', false)
      console.error(error)
    }
  })

  const meta = document.createElement('p')
  meta.className = 'answer-meta'
  meta.textContent = formatTime(answer.submittedAt)

  const text = document.createElement('p')
  text.className = 'answer-text'
  text.textContent = answer.answer

  card.append(deleteButton, meta, text)
  return card
}

function renderAnswers(answers) {
  answerCount.textContent = String(answers.length)
  answersGrid.replaceChildren()

  if (answers.length === 0) {
    const empty = document.createElement('section')
    empty.className = 'empty-state'
    empty.innerHTML = `
      <span class="empty-badge">Waiting</span>
      <h2>No answers yet</h2>
      <p>Run the main George story, answer one of the question slides, and it will appear here.</p>
    `
    answersGrid.append(empty)
    return
  }

  const groups = groupByQuestion(answers)

  groups.forEach(group => {
    const section = document.createElement('section')
    section.className = 'question-column'

    const header = document.createElement('header')
    header.className = 'question-header'

    const title = document.createElement('h2')
    title.textContent = group.title

    const prompt = document.createElement('p')
    prompt.textContent = group.prompt

    const count = document.createElement('span')
    count.className = 'question-count'
    count.textContent = `${group.answers.length} answer${group.answers.length === 1 ? '' : 's'}`

    header.append(title, prompt, count)
    section.append(header, ...group.answers.slice().reverse().map(createAnswerCard))
    answersGrid.append(section)
  })
}

async function loadAnswers() {
  try {
    const { data, error } = await supabase
      .from('answers')
      .select('id, chapter, slide_id, question_title, prompt, answer, submitted_at')
      .order('submitted_at', { ascending: true })

    if (error) throw error

    currentAnswers = (data || []).map(mapAnswer)
    renderAnswers(currentAnswers)
    setStatus('Live', true)
  } catch (error) {
    setStatus('Offline', false)
    console.error(error)
  }
}

clearButton.addEventListener('click', async () => {
  const confirmed = window.confirm('Clear all displayed answers?')

  if (!confirmed) return

  const { error } = await supabase
    .from('answers')
    .delete()
    .not('id', 'is', null)

  if (error) {
    setStatus('Clear failed', false)
    console.error(error)
    return
  }

  currentAnswers = []
  renderAnswers(currentAnswers)
})

await loadAnswers()

supabase
  .channel('answers-dashboard')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'answers' }, () => {
    void loadAnswers()
  })
  .subscribe(status => {
    if (status === 'SUBSCRIBED') {
      setStatus('Live', true)
    } else if (status === 'CHANNEL_ERROR') {
      setStatus('Realtime error', false)
    } else {
      setStatus('Connecting...', false)
    }
  })

window.setInterval(loadAnswers, 15000)
