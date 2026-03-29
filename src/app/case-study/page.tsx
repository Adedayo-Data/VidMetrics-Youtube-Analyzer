import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Meta */}
        <div className="flex items-center gap-6 text-sm text-slate-500 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>March 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>8 min read</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>By Adedayo</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-heading leading-tight text-slate-900 mb-6">
          Building VidMetrics: From Idea to YouTube Analytics Platform
        </h1>

        <p className="text-xl text-slate-600 leading-relaxed mb-12">
          A deep dive into the technical decisions, challenges faced, and lessons learned while building a competitive YouTube analytics platform from scratch.
        </p>

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-heading text-slate-900 mt-12 mb-4">The Problem</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Content creators and brands struggle to understand their competitive landscape on YouTube. 
            Existing tools either lack depth, are prohibitively expensive, or fail to provide actionable insights. 
            We set out to build something different—a platform that democratizes competitive intelligence.
          </p>

          <h2 className="text-2xl font-heading text-slate-900 mt-12 mb-4">Technical Architecture</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            VidMetrics is built on a modern stack: Next.js 14 for the frontend with server components, 
            TypeScript for type safety, and Tailwind CSS for styling. The backend leverages the YouTube Data API 
            with intelligent caching to minimize quota usage while maintaining real-time accuracy.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            Key architectural decisions included implementing a custom audit engine that analyzes 50+ metrics 
            per channel, a proprietary performance ratio algorithm, and PDF report generation for enterprise clients.
          </p>

          <h2 className="text-2xl font-heading text-slate-900 mt-12 mb-4">Challenges & Solutions</h2>
          
          <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">API Rate Limiting</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            YouTube API quotas are restrictive. We implemented a multi-tier caching strategy and request 
            batching to maximize throughput. Aggressive client-side caching ensures repeat audits are instant 
            without hitting the API.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Data Accuracy</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Ensuring metric accuracy across diverse channel sizes required normalizing engagement rates 
            and developing weighted scoring algorithms. We benchmarked against industry standards and 
            fine-tuned our models using known high-performing channels.
          </p>

          <h2 className="text-2xl font-heading text-slate-900 mt-12 mb-4">Key Features Built</h2>
          <ul className="list-disc list-inside space-y-3 text-slate-600 mb-8">
            <li>Deep channel audits with 50+ metric analysis</li>
            <li>Competitor landscape visualization</li>
            <li>Performance velocity tracking</li>
            <li>Content gap identification</li>
            <li>PDF report generation</li>
            <li>Real-time trend analysis</li>
          </ul>

          <h2 className="text-2xl font-heading text-slate-900 mt-12 mb-4">Lessons Learned</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Building VidMetrics taught us the importance of starting with a clear data model. 
            YouTube data is complex—normalized views, varying engagement patterns, and shifting algorithms 
            all impact how metrics should be interpreted. User feedback was crucial in refining what 
            metrics actually matter to creators.
          </p>

          <h2 className="text-2xl font-heading text-slate-900 mt-12 mb-4">What's Next</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The roadmap includes predictive analytics, automated content recommendations, and expanded 
            platform support beyond YouTube. We're excited to continue evolving VidMetrics into the 
            definitive creator intelligence platform.
          </p>

          <div className="border-t border-slate-100 mt-16 pt-8">
            <p className="text-slate-500 text-sm">
              Want to analyze your competitors?{" "}
              <Link href="/" className="text-indigo-600 font-semibold hover:underline">
                Try VidMetrics now
              </Link>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
