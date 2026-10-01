import { IssueForm } from '@/components/issue-form';

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 md:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Report an Issue</h1>
          <p className="mt-2 text-slate-300">
            Help us improve by reporting negative issues, feedback, or concerns. Your report will be analyzed by our AI system and reviewed by our team.
          </p>
        </div>

        <IssueForm />

        <div className="mt-12 rounded-[24px] border border-slate-700 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">What happens after you report?</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex gap-3"><span className="text-blue-400 font-bold">1</span><span>Your issue is automatically classified by our AI system</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold">2</span><span>The report is assigned a severity level (High, Medium, Low)</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold">3</span><span>Our team reviews and takes appropriate action</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-bold">4</span><span>You may be contacted for follow-up if you provided your email</span></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
