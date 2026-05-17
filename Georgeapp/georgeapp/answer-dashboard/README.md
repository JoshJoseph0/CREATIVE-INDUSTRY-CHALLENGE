# George Answers Dashboard

This is a separate mini website for displaying audience answers from the George story questions. It now reads answers from Supabase, so it can be hosted separately from the story and still update live.

## Run it

From the main `georgeapp` folder:

```bash
npm run answers
```

Then open:

```text
http://localhost:5174/
```

Keep the George story running separately:

```bash
npm run dev
```

The story sends question answers to Supabase. This dashboard reads from the same Supabase table and listens for live changes.

## Supabase

Both apps use:

```text
https://nijwgwkuqqfzpgkeabkj.supabase.co
```

The `answers` table must exist in Supabase with public insert, select, and delete policies for the anon/publishable key. Use the dashboard's "Clear answers" button to empty the display.

## Hosting

Host the story and this dashboard as two static sites. The local Node server is only needed for testing this dashboard on your computer.
