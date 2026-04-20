'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      // Fetch notes
      const { data: notesData } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      setNotes(notesData || [])
      setLoading(false)
    }
    load()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const daysUntil = (date: string) => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const then = new Date(date)
    const diff = Math.ceil((then.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif italic">LoopNote</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-white transition"
          >
            Log out
          </button>
        </div>

        {/* Welcome */}
        <div className="mb-8">
          <p className="text-slate-400 text-sm mb-2">Welcome back</p>
          <h2 className="text-2xl font-serif italic">{user?.email}</h2>
        </div>

        {/* Write note button */}
        <button
          onClick={() => router.push('/new')}
          className="mb-8 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium transition"
        >
          + Write a Note
        </button>

        {/* Notes list */}
        {notes.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-12 text-center">
            <p className="text-6xl mb-4">📬</p>
            <h3 className="text-2xl font-serif italic mb-2">No notes yet</h3>
            <p className="text-slate-400">
              Write your first letter to your future self.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => {
              const days = daysUntil(note.delivery_date)
              const isDelivered = days <= 0
              return (
                <div
                  key={note.id}
                  className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-emerald-500 transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{isDelivered ? '📬' : '🔒'}</span>
                      <span className="text-sm text-slate-400">
                        {isDelivered
                          ? 'Unlocked'
                          : `Opens in ${days} day${days === 1 ? '' : 's'}`}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      Delivers {new Date(note.delivery_date).toLocaleDateString()}
                    </span>
                  </div>

                  {isDelivered ? (
                    <p className="text-white whitespace-pre-wrap">{note.content}</p>
                  ) : (
                    <p className="text-slate-500 italic">
                      Locked. This message from your past self is waiting.
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}