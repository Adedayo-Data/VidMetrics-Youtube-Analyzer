# 📊 VidMetrics | Enterprise YouTube Intelligence

**"I don’t just write software; I ship products with real intent."**

VidMetrics is a high-fidelity competitive intelligence platform engineered for media agencies and enterprise creators. It transforms raw YouTube Data into actionable strategic insights through proprietary metrics and statistical analysis.

---

## 🚀 Live Links
* **Live Demo:** https://vid-metrics-youtube-analyzer.vercel.app/
* **Loom Walkthrough:** https://www.loom.com/share/9e763536a5dc43dca10770480fb00386
* **Technical Case Study:** https://vid-metrics-youtube-analyzer.vercel.app/case-study

---

## ✨ Key Features

### 1. The "Intelligence Hub"
Deep-dive video analysis that goes beyond raw views.
* **Thumbnail Appeal Score:** Real-time pixel analysis using the **Browser Canvas API** to determine Luminance, Contrast ratios, and visual accessibility.
* **Sentiment Proxy:** Proprietary L/V (Likes per View) and C/L (Comments per Like) ratios to measure audience appreciation and discussion heat.
* **Outlier Detection:** Statistical flagging of "viral" content using a **Modified Z-Score** algorithm (Standard Deviation) to identify performance 2+ deviations above the mean.

### 2. Strategic Format Segmentation
Unlike native YouTube Studio, VidMetrics separates **Shorts** from **Long-form** content. This ensures data integrity by preventing high-volume, low-retention Shorts from skewing the performance metrics of high-value long-form content.

### 3. Performance Velocity Mapping
Visualizing growth trends using **Recharts**, comparing recent video performance against the channel's 30-day baseline to detect "Spiking" or "Growth" statuses.

---

## 🛠️ Technical Stack
* **Framework:** [Next.js 16.2.1 (App Router)](https://nextjs.org/) 
* **Styling:** [Tailwind CSS 4.2.2](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) 
* **Charts:** [Recharts 3.8.1](https://recharts.org/) 
* **API:** [YouTube Data API v3](https://developers.google.com/youtube/v3) 
* **Animation:** [Framer Motion](https://www.framer.com/motion/) 

---

## 🤖 AI-Assisted Workflow
This project was built using an "AI-First" methodology to maximize velocity:
* **Research & Architecture:** Utilized **Gemini** for API deep-dives and **Claude** for intuitive mathematical modeling of engagement metrics.
* **Coding Agents:** Leveraged **Windsurf/Cascade** and **Trae** for rapid component scaffolding and complex UI transitions.
* **Design:** Used **Stitch** to iterate on the high-contrast "Enterprise" aesthetic.
* **Security & Review:** AI-driven code reviews to ensure secure API handling and optimized caching strategies.

---

## 📈 Strategic Ratios & Formulas
* **Performance Ratio:** $\frac{Views}{Subscribers} \times 100$ 
    * *100%+ = Viral/Market Dominator*
    * *20-100% = Strong Performance*
* **Engagement Rate:** $\frac{Likes + Comments}{Views} \times 100$ 
    * *8%+ = Exceptional Community Trust*

---

## ⚙️ Setup & Installation

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/](https://github.com/)[Your-Username]/vidmetrics.git
    cd vidmetrics
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file and add your YouTube API Key:
    ```env
    NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

---

## 🗺️ Roadmap (Version 2.0)
* **Persistence Layer:** Transitioning from `localStorage` to **PostgreSQL/Supabase** for historical trend tracking.
* **AI Vision Integration:** Using Gemini 1.5 Pro to analyze video frames for automated thumbnail A/B testing recommendations.
* **Multi-Channel Matrix:** Head-to-head competitive audits for market share analysis.

---

### Developed by **Adedayo** *Software Developer | Product Developer*