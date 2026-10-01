import { Activity, BellDot, ShieldCheck, Users } from 'lucide-react';
import { dashboardStats, reportCategories, recentReports, riskTrends } from '@/lib/data';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function DashboardShell({ user }: { user: { email: string; role: string } }) {
  const stats = [
    { label: 'Total reports', value: dashboardStats.totalReports, delta: '+12.5% vs last week', icon: <Activity className="h-5 w-5" /> },
    { label: 'High severity', value: dashboardStats.criticalCases, delta: '+9.3% this week', icon: <BellDot className="h-5 w-5" /> },
    { label: 'Resolved cases', value: dashboardStats.resolved, delta: '+15.7% last 30 days', icon: <Users className="h-5 w-5" /> },
    { label: 'AI confidence', value: `${dashboardStats.aiConfidence}%`, delta: 'Stable model score', icon: <ShieldCheck className="h-5 w-5" /> }
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 rounded-[24px] border border-slate-700 bg-slate-900/70 p-5 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Operations Center</div>
            <h1 className="mt-2 text-3xl font-bold text-white">Negative issue intelligence dashboard</h1>
          </div>
          <div className="flex items-center gap-3 self-start rounded-full border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-300 md:self-auto">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            {user.email} • {user.role}
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="card-glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">{item.label}</div>
                  <div className="mt-3 text-3xl font-bold text-white">{item.value}</div>
                </div>
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-300">{item.icon}</div>
              </div>
              <div className="mt-4 text-sm text-emerald-300">{item.delta}</div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="card-glass rounded-[24px] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">Risk trend</div>
                <div className="text-xl font-semibold text-white">Threat activity</div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-300">
                <BellDot className="h-4 w-4 text-amber-300" />
                4 alerts
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskTrends}>
                  <defs>
                    <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.08} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#60a5fa" strokeWidth={3} fill="url(#trendFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-glass rounded-[24px] p-5">
            <div className="mb-5 text-sm text-slate-400">Issue categories</div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportCategories}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" angle={-12} textAnchor="end" height={45} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#38bdf8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card-glass rounded-[24px] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">Recent signals</div>
                <div className="text-xl font-semibold text-white">Latest reports</div>
              </div>
              <button className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-200">
                Export
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-slate-400">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Source</th>
                    <th className="pb-3 pr-4 font-medium">Type</th>
                    <th className="pb-3 pr-4 font-medium">Severity</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report) => (
                    <tr key={report.id} className="border-t border-slate-800 text-slate-200">
                      <td className="py-3 pr-4">{report.source}</td>
                      <td className="py-3 pr-4">{report.type}</td>
                      <td className="py-3 pr-4">
                        <span className={`rounded-full px-2 py-1 text-xs ${report.severity === 'High' ? 'bg-red-500/10 text-red-300' : report.severity === 'Medium' ? 'bg-amber-500/10 text-amber-300' : 'bg-emerald-500/10 text-emerald-300'}`}>
                          {report.severity}
                        </span>
                      </td>
                      <td className="py-3">{report.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-glass rounded-[24px] p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/10 p-2 text-blue-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Security posture</div>
                <div className="text-xl font-semibold text-white">Protected</div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              {[
                'Protected admin sessions',
                'Rate limiting enabled',
                'Validated input payloads',
                'Audit trail active'
              ].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900/60 p-3">
                  <span>{item}</span>
                  <span className="text-emerald-300">●</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Active reviewers</span>
                <span className="font-semibold text-white">8 persons</span>
              </div>
              <div className="mt-3 flex -space-x-2">
                {['A', 'B', 'C', 'D'].map((letter) => (
                  <div key={letter} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 bg-blue-500/80 text-xs font-semibold text-white">
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
