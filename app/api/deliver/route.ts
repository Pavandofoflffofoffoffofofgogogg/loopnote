import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // 🔒 Security: verify the request is from Vercel Cron (not a random visitor)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Use the service role key for server-side access (bypasses RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]

  // Find all notes due for delivery today or earlier that haven't been delivered yet
  const { data: notesToDeliver, error: fetchError } = await supabase
    .from('notes')
    .select('id, user_id, content, delivery_date')
    .eq('delivered', false)
    .lte('delivery_date', today)

  if (fetchError) {
    console.error('Fetch error:', fetchError)
    return NextResponse.json({ error: fetchError.message }, { status: 500 })
  }

  // If nothing to deliver today, just say so
  if (!notesToDeliver || notesToDeliver.length === 0) {
    return NextResponse.json({
      message: 'No notes to deliver today',
      delivered: 0,
      date: today,
    })
  }

  // Mark them as delivered
  const noteIds = notesToDeliver.map((n) => n.id)
  const { error: updateError } = await supabase
    .from('notes')
    .update({ delivered: true })
    .in('id', noteIds)

  if (updateError) {
    console.error('Update error:', updateError)
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  console.log(`📬 Delivered ${notesToDeliver.length} note(s) on ${today}`)

  return NextResponse.json({
    message: 'Delivered successfully 📬',
    delivered: notesToDeliver.length,
    notes: noteIds,
    date: today,
  })
}