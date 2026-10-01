'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function IssueForm() {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('harassment');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, category, email, source: 'public-form' })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit issue');
      }

      setMessage({
        type: 'success',
        text: `Issue #${data.id} reported successfully. AI confidence: ${(Number(data.confidence) * 100).toFixed(1)}%`
      });
      setContent('');
      setEmail('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error submitting issue'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-glass rounded-[24px] p-6 space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Describe the issue
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Describe the negative issue or feedback..."
          className="w-full h-32 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 outline-none"
          required
          minLength={10}
          maxLength={5000}
        />
        <div className="mt-2 text-xs text-slate-400">
          {content.length}/5000 characters
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white focus:border-blue-500 outline-none"
        >
          <option value="harassment">Harassment</option>
          <option value="fraud">Fraud</option>
          <option value="spam">Spam</option>
          <option value="misinformation">Misinformation</option>
          <option value="safety">Safety Risk</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Email (optional)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 outline-none"
        />
      </div>

      {message && (
        <div
          className={`flex items-start gap-3 rounded-2xl p-4 ${
            message.type === 'success'
              ? 'border border-emerald-500/30 bg-emerald-500/10'
              : 'border border-red-500/30 bg-red-500/10'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          )}
          <p className={message.type === 'success' ? 'text-emerald-200' : 'text-red-200'}>
            {message.text}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || content.length < 10}
        className="w-full rounded-2xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Submitting...' : 'Submit Issue Report'}
      </button>
    </form>
  );
}
