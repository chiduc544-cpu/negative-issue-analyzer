import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, ChartColumn, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const highlights = [
  {
    title: 'AI Classification Engine',
    description: 'Phân loại các vấn đề tiêu cực theo mức độ khẩn cấp, loại hình và xu hướng nguy hiểm.',
    icon: Sparkles
  },
  {
    title: 'Admin Security Layer',
    description: 'Hệ thống xác thực, cookie bảo mật, RBAC và kiểm soát truy cập trước khi xem dữ liệu.',
    icon: ShieldCheck
  },
  {
    title: 'Operational Intelligence',
    description: 'Dashboard quan sát số lượng phản hồi, phân tích xu hướng và cảnh báo dữ liệu theo thời gian.',
    icon: ChartColumn
  }
];

export function LandingPage() {
  return (
    <div className="min-h-screen text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-lg font-bold text-blue-300">
            N
          </div>
          <div>
            <div className="text-lg font-semibold">NegativeScope</div>
            <div className="text-xs text-slate-400">Risk intelligence platform</div>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#features">Features</a>
          <a href="#security">Security</a>
          <a href="#dashboard">Dashboard</a>
        </nav>

        <a href="/login" className="rounded-full border border-blue-400/40 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-200 transition hover:bg-blue-500/20">
          Admin login
        </a>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <section className="grid-pattern rounded-[28px] border border-slate-700/60 bg-slate-950/40 p-8 shadow-soft md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-blue-200">
                AI + Insight
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl">
                Theo dõi, phân loại và quản lý vấn đề tiêu cực bằng AI.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-300">
                Hệ thống quản lý dữ liệu thực tế giúp thu thập ý kiến, phản hồi tiêu cực từ người truy cập và chuyển chúng thành báo cáo, xu hướng và cảnh báo có thể hành động.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="/login" className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400">
                  Truy cập dashboard
                </a>
                <a href="#features" className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500">
                  Xem tính năng
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
                <div>
                  <div className="text-2xl font-bold text-white">12.4k</div>
                  <div>records processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">94.2%</div>
                  <div>accuracy index</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div>monitoring</div>
                </div>
              </div>
            </div>

            <div className="card-glass rounded-[26px] p-5">
              <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Threat overview</div>
                    <div className="mt-2 text-3xl font-bold text-white">+31.4%</div>
                  </div>
                  <div className="rounded-full bg-red-500/15 p-2 text-red-300">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {['Harassment', 'Fraud', 'Spam', 'Safety risk'].map((label, index) => (
                    <div key={label}>
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                        <span>{label}</span>
                        <span>{[42, 31, 28, 19][index]}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800">
                        <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${[42, 31, 28, 19][index]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/60 p-3 text-sm text-slate-300">
                  <span>Highest priority</span>
                  <span className="font-semibold text-red-300">Fraud reports</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-20">
          <div className="mb-10 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">Features</div>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Tích hợp dữ liệu, AI và quy trình xử lý</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="card-glass border-slate-700/60 bg-slate-900/50 text-left">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
                  <p className="text-slate-300">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="security" className="mt-20 rounded-[28px] border border-slate-700/60 bg-slate-950/60 p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">Security-first</div>
              <h3 className="mt-4 text-3xl font-bold text-white">Bảo mật được xây dựng từ đầu.</h3>
              <p className="mt-4 text-slate-300">
                Hệ thống tăng cường bảo mật bằng xác thực admin, cookie chỉ đọc trên máy chủ, giới hạn tốc độ truy cập API, mã hóa mật khẩu và phân quyền rõ ràng trước khi truy cập dashboard.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Password hashing with bcrypt',
                'HTTP-only secure session cookie',
                'Role-based access control',
                'Input validation and rate limits'
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="dashboard" className="mt-20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-300">Preview</div>
              <h3 className="mt-3 text-3xl font-bold text-white">Bảng điều khiển quản lý rủi ro</h3>
            </div>
            <a href="/dashboard" className="inline-flex items-center gap-2 text-blue-300">
              Open dashboard <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
