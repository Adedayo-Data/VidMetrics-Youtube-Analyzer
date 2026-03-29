import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Zap, BarChart3, Code2, Brain, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-slate-600 hover:text-indigo-600 -ml-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8">
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">Case Study</Badge>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>March 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>10 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>By Adedayo</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-heading leading-tight text-slate-900 mb-6">
            Building VidMetrics: From Idea to YouTube Analytics Platform
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl">
            A deep dive into the technical decisions, challenges, and lessons learned while building a competitive intelligence engine from scratch.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents - Sticky Sidebar */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">Contents</h3>
              <nav className="space-y-2 text-sm">
                <a href="#mission" className="block text-slate-600 hover:text-indigo-600 transition-colors py-1">The Mission</a>
                <a href="#sprint" className="block text-slate-600 hover:text-indigo-600 transition-colors py-1">48-Hour Sprint</a>
                <a href="#engine" className="block text-slate-600 hover:text-indigo-600 transition-colors py-1">The Engine</a>
                <a href="#ai" className="block text-slate-600 hover:text-indigo-600 transition-colors py-1">AI Force Multiplier</a>
                <a href="#architecture" className="block text-slate-600 hover:text-indigo-600 transition-colors py-1">Architecture</a>
                <a href="#roadmap" className="block text-slate-600 hover:text-indigo-600 transition-colors py-1">V2.0 Roadmap</a>
                <a href="#conclusion" className="block text-slate-600 hover:text-indigo-600 transition-colors py-1">Conclusion</a>
              </nav>
            </div>
          </aside>

          {/* Article Content */}
          <div className="lg:col-span-9 space-y-16">
            
            {/* The Mission */}
            <section id="mission" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-heading text-slate-900">The Mission</h2>
              </div>
              
              <Card className="p-8 bg-white border-slate-200 mb-8">
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  We wanted a tool that allows a major media company to audit a competitor's YouTube channel and extract strategic insights. For an enterprise client, it's not enough to just show views; the tool needs to provide a deep-dive analysis and actionable insights so they can deduce a competitive advantage. This was the core mission behind VidMetrics.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">50+</div>
                    <div className="text-sm text-slate-600">Metrics Analyzed</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">24h</div>
                    <div className="text-sm text-slate-600">Cache Duration</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">&lt;3s</div>
                    <div className="text-sm text-slate-600">Audit Load Time</div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Build Breakdown */}
            <section id="sprint" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-heading text-slate-900">Build Breakdown: The 48-Hour Sprint</h2>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                The product evolved from a "napkin sketch" to an initial completion phase in approximately <strong>10 - 14 hours of focused engineering</strong> over two days. I divide my product process into three distinct phases:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-t-4 border-t-indigo-500">
                  <div className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wider">Phase 1</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Research</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Finding patterns in how enterprise audit tools are built and understanding the mathematical expressions needed for deep analysis.
                  </p>
                </Card>
                <Card className="p-6 border-t-4 border-t-emerald-500">
                  <div className="text-sm font-semibold text-emerald-600 mb-2 uppercase tracking-wider">Phase 2</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Build</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Taking those findings and designs and bringing them to life through code. Rapid iteration with immediate feedback loops.
                  </p>
                </Card>
                <Card className="p-6 border-t-4 border-t-amber-500">
                  <div className="text-sm font-semibold text-amber-600 mb-2 uppercase tracking-wider">Phase 3</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Ship</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Deploying a functional MVP that is ready for the intended users. Production-ready with proper error handling.
                  </p>
                </Card>
              </div>
            </section>

            {/* The Engine */}
            <section id="engine" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-heading text-slate-900">The Engine: Tools & Tech Stack</h2>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                I selected a modern stack designed for high performance and clean aesthetics:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Next.js 16.2.1</h4>
                    <p className="text-sm text-slate-600 mt-1">App Router for high-performance rendering with server components</p>
                  </div>
                </Card>
                <Card className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">T</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Tailwind CSS 4.2.2</h4>
                    <p className="text-sm text-slate-600 mt-1">Utility-first styling for rapid, consistent design implementation</p>
                  </div>
                </Card>
                <Card className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">shadcn</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">shadcn/ui</h4>
                    <p className="text-sm text-slate-600 mt-1">Accessible, customizable components for that "Enterprise" feel</p>
                  </div>
                </Card>
                <Card className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Recharts</h4>
                    <p className="text-sm text-slate-600 mt-1">Complex trend analysis: Performance Velocity, Engagement Distribution</p>
                  </div>
                </Card>
              </div>
            </section>

            {/* AI Force Multiplier */}
            <section id="ai" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-violet-600" />
                </div>
                <h2 className="text-3xl font-heading text-slate-900">AI as a Force Multiplier</h2>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                Building VidMetrics was an end-to-end AI-backed process. Writing code is a "back and forth" process for me—I review, refine, and send it back for review. I leveraged a wide range of specialized tools to move fast:
              </p>

              <div className="space-y-4 mb-8">
                <Card className="p-6 border-l-4 border-l-blue-500">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Research: Gemini</h4>
                      <p className="text-slate-600">My primary research tool. Being a Google product, its access to a massive data lake makes it a "no brainer" for technical findings.</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Research</Badge>
                  </div>
                </Card>
                <Card className="p-6 border-l-4 border-l-orange-500">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Mathematics & Statistics: Claude</h4>
                      <p className="text-slate-600">Used to intuitively understand the statistics. Claude works best for complex calculations and coding logic.</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">Math</Badge>
                  </div>
                </Card>
                <Card className="p-6 border-l-4 border-l-emerald-500">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Coding & Architecture: Windsurf & Trae</h4>
                      <p className="text-slate-600">My primary coding agents, with Antigravity (Sonnet) supporting the codebase understanding.</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">Code</Badge>
                  </div>
                </Card>
                <Card className="p-6 border-l-4 border-l-purple-500">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">UI/UX Design: Stitch + Google</h4>
                      <p className="text-slate-600">Handled the interface design and ensured it felt like a real SaaS product.</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">Design</Badge>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-slate-900 text-white">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Parts Automated by AI
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  The most critical part automated by AI was <strong>Code Review</strong>. This is vital for security, as constant reviews help catch lapses that might arise during rapid building. Additionally, my coding agents helped implement the complex, custom UI components that give VidMetrics its premium feel.
                </p>
              </Card>
            </section>

            {/* Architecture Diagram */}
            <section id="architecture" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-heading text-slate-900">System Architecture</h2>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                The architecture follows a clean, modular approach with clear separation of concerns:
              </p>

              {/* ASCII Architecture Diagram */}
              <Card className="p-8 bg-slate-900 text-slate-300 font-mono text-sm overflow-x-auto">
                <pre className="leading-relaxed">
{`┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ LandingHero  │  │   Sidebar    │  │ Intelligence │       │
│  │  (Search)    │  │ (Navigation) │  │    Hub       │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
└─────────┼──────────────────┼──────────────────┼───────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    API ROUTE LAYER                           │
│                    /api/audit (POST)                         │
└────────────┬───────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│              YouTube Data API Integration                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Search     │  │   Channel    │  │    Video     │       │
│  │  (Resolve)   │  │   (Info)     │  │   (Stats)    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└────────────┬───────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                  Data Processing Engine                    │
│  • Calculate performanceRatio                               │
│  • Calculate engagementRate                                 │
│  • Detect outliers (statistical)                            │
│  • Segment Shorts vs Long-form                              │
│  • Calculate format averages                                │
└────────────┬───────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│              In-Memory Cache (24h TTL)                     │
│              Map<string, { data, timestamp }>              │
└────────────┬───────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                  JSON Response → UI Render                 │
└─────────────────────────────────────────────────────────────┘`}
                </pre>
              </Card>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Core Metrics</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• <strong>Performance Ratio:</strong> (Views / Subscribers) × 100</li>
                    <li>• <strong>Engagement Rate:</strong> ((Likes + Comments) / Views) × 100</li>
                    <li>• <strong>Outlier Detection:</strong> Z-Score with 2σ threshold</li>
                    <li>• <strong>Short Detection:</strong> ISO 8601 duration parsing</li>
                  </ul>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold text-slate-900 mb-3">API Calls per Audit</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>1. search?part=snippet&type=channel</li>
                    <li>2. channels?part=snippet,statistics</li>
                    <li>3. search?part=snippet&order=date</li>
                    <li>4. playlistItems?part=contentDetails</li>
                    <li>5. videos?part=snippet,statistics,contentDetails</li>
                  </ul>
                </Card>
              </div>
            </section>

            {/* Version 2.0 Roadmap */}
            <section id="roadmap" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-3xl font-heading text-slate-900">Product Thinking: The Version 2.0 Roadmap</h2>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                While the MVP is strong, there is a lot of room to go beyond. Here is what I would implement in the next phase:
              </p>

              <div className="space-y-6">
                <Card className="p-6 border-l-4 border-l-indigo-500">
                  <h4 className="font-semibold text-slate-900 mb-3 text-lg">AI Agentic & ML Approaches</h4>
                  <p className="text-slate-600 mb-4">
                    I want to move from standard math to ML-driven decisions. For the <strong>Thumbnail Analysis</strong>, instead of just using the Canvas API for pixel data, I'd use an AI model to correlate visual elements directly to video performance. I'd also add <strong>Predictive Analysis</strong> and a RAG-based AI chat feature to let users "talk" to their data.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">AI Thumbnail Analysis</Badge>
                    <Badge variant="outline">Predictive Models</Badge>
                    <Badge variant="outline">RAG Chat Interface</Badge>
                  </div>
                </Card>

                <Card className="p-6 border-l-4 border-l-emerald-500">
                  <h4 className="font-semibold text-slate-900 mb-3 text-lg">Multi-Channel Correlation</h4>
                  <p className="text-slate-600 mb-4">
                    The insights would be more holistic if users could audit multiple channels concurrently to see how they stack up against their own performance in real-time. This would enable true competitive benchmarking.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Head-to-Head Comparison</Badge>
                    <Badge variant="outline">Market Share Analysis</Badge>
                    <Badge variant="outline">Trend Correlation</Badge>
                  </div>
                </Card>

                <Card className="p-6 border-l-4 border-l-blue-500">
                  <h4 className="font-semibold text-slate-900 mb-3 text-lg">Team Collaboration</h4>
                  <p className="text-slate-600 mb-4">
                    Implementing "Team Audits" would allow creators and agencies to work together, share updates, and set implementation goals live on the platform. Think Notion-style collaboration for competitive intelligence.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Shared Workspaces</Badge>
                    <Badge variant="outline">Commenting System</Badge>
                    <Badge variant="outline">Goal Tracking</Badge>
                  </div>
                </Card>
              </div>
            </section>

            {/* Conclusion */}
            <section id="conclusion" className="scroll-mt-32">
              <Card className="p-8 md:p-12 bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-0">
                <h2 className="text-3xl font-heading mb-6">Conclusion</h2>
                <p className="text-lg leading-relaxed mb-6 text-indigo-100">
                  Overall, building VidMetrics was a challenging but rewarding experience. Balancing multiple projects while engineering this platform from scratch gave me a new perspective on rapid product development. It was fun, I enjoyed the process, and I'm proud of the result.
                </p>
                <p className="text-xl font-semibold">
                  Thanks, AgencyHires.
                </p>
              </Card>

              <div className="mt-12 text-center">
                <p className="text-slate-600 mb-6">
                  Want to analyze your competitors?
                </p>
                <Link href="/">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8">
                    Try VidMetrics Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </article>
    </div>
  );
}
