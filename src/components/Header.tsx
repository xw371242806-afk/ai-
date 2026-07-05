import { motion } from "motion/react";
import { Sparkles, TrendingUp, Compass, Cpu } from "lucide-react";

interface HeaderProps {
  lang: "zh" | "en";
  setLang: (lang: "zh" | "en") => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const content = {
    zh: {
      tag: "Issue No. 04 — Special Report",
      titlePre: "如何利用",
      titlePost: "AI 赚取第一桶金",
      subtitle: "在智能时代，金钱偏爱效率。我们将复杂的 AI 技术拆解为可操盘的获利路径，从内容自动化到私有化大模型定制，探索未来的财富增长点。",
      stat1Title: "前沿变现路径",
      stat1Val: "5 大核心方向",
      stat2Title: "AI 提效幅度",
      stat2Val: "3x - 10x 生产力",
      stat3Title: "主流工具适配",
      stat3Val: "10+ 顶尖 AI 应用",
    },
    en: {
      tag: "Issue No. 04 — Special Report",
      titlePre: "Unlock Real",
      titlePost: "AI Monetization Pathways",
      subtitle: "In the age of intelligence, capital favors velocity. We deconstruct complex AI mechanisms into tactical workflows and high-yield blueprints designed for the modern builder.",
      stat1Title: "Monetization Paths",
      stat1Val: "5 Core Sectors",
      stat2Title: "AI Productivity Boost",
      stat2Val: "3x - 10x Velocity",
      stat3Title: "Tool Integrations",
      stat3Val: "10+ Industry Leaders",
    },
  };

  const t = content[lang];

  return (
    <header id="app-header" className="relative mb-12 border-b border-[#1A1A1A]/10 pb-8">
      {/* Editorial branding row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-6 border-b border-[#1A1A1A]/10 mb-8">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.2em] font-sans uppercase font-bold text-[#1A1A1A]/60">
            {t.tag}
          </span>
          <div className="text-xl font-extrabold italic mt-1 text-[#1A1A1A] tracking-wider font-serif">
            AI MONETIZATION DAILY
          </div>
        </div>

        {/* Language Switcher with Editorial Style */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] tracking-[0.1em] font-sans uppercase font-bold text-[#1A1A1A]/40 mr-2">Language:</span>
          <div className="bg-white border border-[#1A1A1A]/10 rounded-lg p-0.5 shadow-xs flex items-center">
            <button
              id="lang-btn-zh"
              onClick={() => setLang("zh")}
              className={`px-3 py-1 text-[10px] font-sans uppercase tracking-wider font-bold rounded transition-all ${
                lang === "zh"
                  ? "bg-[#1A1A1A] text-[#F9F8F3]"
                  : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
              }`}
            >
              中文
            </button>
            <button
              id="lang-btn-en"
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-[10px] font-sans uppercase tracking-wider font-bold rounded transition-all ${
                lang === "en"
                  ? "bg-[#1A1A1A] text-[#F9F8F3]"
                  : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        {/* Editorial Huge Typography */}
        <div className="lg:col-span-8 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1.05] text-[#1A1A1A] font-serif"
          >
            {t.titlePre}
            <span className="text-[#E07A5F] italic font-serif font-extrabold block sm:inline sm:ml-2">
              AI
            </span>{" "}
            {t.titlePost}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed font-serif max-w-2xl pt-2"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Start info box with Editorial circle button */}
        <div className="lg:col-span-4 flex items-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 bg-white/40 border border-[#1A1A1A]/10 p-5 rounded-2xl w-full max-w-sm shadow-xs"
          >
            <div className="w-12 h-12 rounded-full bg-[#2D3047] flex items-center justify-center text-[#F9F8F3] shrink-0 shadow-sm">
              <span className="text-[10px] font-sans font-extrabold tracking-widest">START</span>
            </div>
            <div>
              <h4 className="text-xs font-sans font-extrabold uppercase tracking-wider text-[#1A1A1A]">
                {lang === "zh" ? "立即定制蓝图" : "Instant Blueprint Generator"}
              </h4>
              <p className="text-xs font-serif italic text-[#1A1A1A]/60 mt-0.5">
                {lang === "zh"
                  ? "滑至底部，15秒生成你的AI专属创富方案"
                  : "Scroll below to tailor your personalized strategy in 15s"}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Editorial High Quality Minimalist Highlights widget (Tighter, border-based, zero visual slop) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 bg-white/40 border border-[#1A1A1A]/10 p-5 rounded-xl"
      >
        <div className="flex items-center gap-4 p-1">
          <div className="p-2.5 bg-[#2D3047]/5 text-[#2D3047] rounded-lg border border-[#2D3047]/10">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-sans font-bold text-[#1A1A1A]/50 uppercase tracking-widest">{t.stat1Title}</p>
            <p className="text-base font-bold text-[#1A1A1A] font-serif">{t.stat1Val}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-1 border-t md:border-t-0 md:border-x border-[#1A1A1A]/10">
          <div className="p-2.5 bg-[#E07A5F]/5 text-[#E07A5F] rounded-lg border border-[#E07A5F]/10">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-sans font-bold text-[#1A1A1A]/50 uppercase tracking-widest">{t.stat2Title}</p>
            <p className="text-base font-bold text-[#1A1A1A] font-serif">{t.stat2Val}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-1 border-t md:border-t-0 border-[#1A1A1A]/10">
          <div className="p-2.5 bg-[#1A1A1A]/5 text-[#1A1A1A] rounded-lg border border-[#1A1A1A]/10">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-sans font-bold text-[#1A1A1A]/50 uppercase tracking-widest">{t.stat3Title}</p>
            <p className="text-base font-bold text-[#1A1A1A] font-serif">{t.stat3Val}</p>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

