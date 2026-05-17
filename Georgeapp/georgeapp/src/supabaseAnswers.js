const SUPABASE_URL = 'https://nijwgwkuqqfzpgkeabkj.supabase.co'
const SUPABASE_KEY = 'sb_publishable_xdKxMhio-jRbjzu5Ak2ByQ_MXbw-GtD'

export async function sendAnswerToDashboard(payload) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/answers`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      chapter: payload.chapter,
      slide_id: payload.slideId,
      question_title: payload.questionTitle,
      prompt: payload.prompt,
      answer: payload.answer,
      submitted_at: payload.submittedAt,
    }),
  })

  if (!response.ok) {
    throw new Error(`Supabase returned ${response.status}`)
  }
}
