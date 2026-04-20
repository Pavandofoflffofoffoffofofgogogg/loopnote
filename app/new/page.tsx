'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function NewNotePage() {
  const [content, setContent] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  // Default to 6 months from today
  useEffect(() => {
    const sixMonths = new Date()
    sixMonths.setMonth(sixMonths.getMonth() + 6)
    setDeliveryDate(sixMonths.toISOString().split('T')[0])

    // Check auth
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
      else setUser(user)
    }
    getUser()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.from('notes').insert({
      user_id: user.id,
      content,
      delivery_date: deliveryDate,
    })

    if (error) {
      alert('Error: ' + error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  // Minimum date = tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif italic">LoopNote</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-slate-400 hover:text-white transition"
          >
            ← Back
          </button>
        </div>

        {/* Form */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
          <h2 className="text-3xl font-serif italic mb-2">Dear future me...</h2>
          <p className="text-slate-400 text-sm mb-6">
            Write something you want to remember. It'll be locked until the delivery date.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              placeholder="What's on your mind today?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 resize-none"
            />

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Deliver on
              </label>
              <input
                type="date"
                value={deliveryDate}
                min={minDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Locking...' : '🔒 Lock & Send to Future Me'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}