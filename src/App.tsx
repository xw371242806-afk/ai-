import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PATHWAYS, TIPS_AND_STRATEGY } from "./data";
import { BusinessPlan } from "./types";
import Header from "./components/Header";
import PathwayCard from "./components/PathwayCard";
import IncomeSimulator from "./components/IncomeSimulator";
import {
  Sparkles,
  ArrowRight,
  ClipboardCheck,
  Clipboard,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Award,
  Clock,
  Briefcase,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Lightbulb
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [selectedPathway, setSelectedPathway] = useState<string>("");
  const [experience, setExperience] = useState<string>("beginner");
  const [capital, setCapital] = useState<string>("zero");
  const [timeCommitment, setTimeCommitment] = useState<string>("part-time-low");
  const [skills, setSkills] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [blueprint, setBlueprint] = useState<BusinessPlan | null>(null);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  // Quick form presets based on selected direction
  const handleSelectPathwayFromCard = (pathwayTitle: string) => {
    setSelectedPathway(pathwayTitle);
    const formSection = document.getElementById("blueprint-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generateBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setBlueprint(null);

    const pathwayPayload = selectedPathway || (lang === "zh" ? PATHWAYS[0].title : PATHWAYS[0].titleEn);

    // Human-friendly mapping for API prompt matching
    const experienceLabel = {
      beginner: lang === "zh" ? "小白/零基础" : "Beginner",
      intermediate: lang === "zh" ? "有一定了解 / 会用基本AI工具" : "Intermediate",
      advanced: lang === "zh" ? "行内老手 / 资深从业者" : "Advanced / Professional",
    }[experience];

    const capitalLabel = {
      zero: lang === "zh" ? "零预算 (白嫖免费大模型/免费版工具)" : "Zero Budget",
      low: lang === "zh" ? "低预算 (每月可花 100-300 元订阅基本工具)" : "Low Budget ($15-$30/mo)",
      medium: lang === "zh" ? "中等预算 (每月可支出 500-1500 元购买专业工具/算力)" : "Medium Budget ($50-$200/mo)",
    }[capital];

    const timeLabel = {
      "part-time-low": lang === "zh" ? "业余轻度 (每天 1-2 小时)" : "Part-time (1-2 hrs/day)",
      "part-time-high": lang === "zh" ? "业余重度 (每天 3-4 小时)" : "Heavy Part-time (3-4 hrs/day)",
      "full-time": lang === "zh" ? "全职全意投入 (每天 8+ 小时)" : "Full-time Integration (8+ hrs/day)",
    }[timeCommitment];

    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pathway: pathwayPayload,
          experience: experienceLabel,
          capital: capitalLabel,
          timeCommitment: timeLabel,
          skills: skills || (lang === "zh" ? "无特殊技能" : "None specified"),
          language: lang,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setBlueprint(data);

      // Scroll to blueprint output smoothly
      setTimeout(() => {
        const blueprintSection = document.getElementById("blueprint-report");
        if (blueprintSection) {
          blueprintSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(index);
    setTimeout(() => {
      setCopiedPromptIndex(null);
    }, 2000);
  };

  const content = {
    zh: {
      headlineLabel: "Issue No. 04 — Editorial Insights",
      curatedHeading: "权威推荐：5 大经典 AI 商业化方向",
      curatedSub: "精选当前门槛最低、效率最高、回馈最丰厚的 AI 变现赛道。选择你的方向，即可在下方一键定制商业蓝图。",
      essayHeading: "智库专栏：AI 创富核心战略",
      essaySub: "由资深数字游民与商业顾问撰写的提效心法与思维跃迁指南。",
      formHeading: "定制你的专属 AI 商业蓝图",
      formSub: "输入你的个人能力、时间预算、启动资金，由 Gemini 3.5 智能模型瞬间为你生成一套高度可行、具有极强实操性的首周启动方案。",
      formPathway: "1. 拟选赛道",
      formPathwayPlaceholder: "—— 请选择一个变现路径 ——",
      formExperience: "2. 你的 AI 经验等级",
      formExperienceBeginner: "零基础小白 (听说过但没怎么用过 AI)",
      formExperienceIntermediate: "轻度使用者 (日常会用大模型聊天、润色论文)",
      formExperienceAdvanced: "专业极客 (掌握核心大模型，会基本提示词调教)",
      formCapital: "3. 启动预算",
      formCapitalZero: "零资本启动 (完全依靠免费工具/开源平台)",
      formCapitalLow: "轻量订阅 (每月 100-300 元订阅费)",
      formCapitalMedium: "专业规模 (每月 500-1500 元购买顶级软件/算力/云端服务)",
      formTime: "4. 时间投入 (每周可用时长)",
      formTimePartLow: "业余轻度 (每周 5 - 10 小时)",
      formTimePartHigh: "业余重度 (每周 15 - 25 小时)",
      formTimeFull: "全职全力创办 (每周 40+ 小时)",
      formSkills: "5. 个人优势技能 (可选，如：英语流利、懂一点摄影、有编程底子)",
      formSkillsPlaceholder: "例如：擅长写故事文案、懂外贸跟单、了解美妆穿搭、能剪辑短视频等...",
      btnGenerate: "开始定制我的 AI 商业蓝图",
      btnGenerating: "AI 精算顾问正在撰写报告...",
      blueprintReportTitle: "AI MONETIZATION EXECUTIVE BLUEPRINT",
      blueprintSubtitle: "尊享定制版商业蓝图报告 · 由 Gemini 提供实时算力保障",
      difficultyLabel: "综合落地难度",
      incomeLabel: "3个月后预计月度收益 (保守估计)",
      summaryTitle: "一、商业模式与契合度评估",
      roadmapTitle: "二、首周启动执行时间表 (Roadmap)",
      monetizationTitle: "三、多元化盈利变现模型",
      toolsTitle: "四、核心 AI 工具及软件预算清单",
      marketingTitle: "五、冷启动获客与增长路径",
      promptsTitle: "六、定制高价值提示词 (Copy & Paste Ready)",
      risksTitle: "七、关键潜在风险与对冲策略",
      channelCol: "盈利渠道",
      earningsCol: "预计收入",
      descCol: "盈利机制",
      toolCol: "软件名称",
      costCol: "月度支出预算",
      purposeCol: "关键核心用途",
      riskCol: "潜在威胁 / 风险",
      mitigationCol: "防范与对冲方案",
      whitepaperTitle: "SPECIAL DOWNLOAD",
      whitepaperBtn: "下载 AI 时代全套提示词库 (PDF)",
      footerPublished: "Published by AI Strategist Laboratory",
      footerCopyright: "Copyright © 2026 Insights and Analytics. All Rights Reserved."
    },
    en: {
      headlineLabel: "Issue No. 04 — Editorial Insights",
      curatedHeading: "Curated Sectors: 5 Core Monetization Channels",
      curatedSub: "We've audited and compiled the highest-yielding, lowest-barrier pathways for the year. Select one below to preload the builder.",
      essayHeading: "Special Column: The AI Capital Strategy",
      essaySub: "Essential business shifts and tactical principles formulated by modern internet pioneers.",
      formHeading: "Generate Your Bespoke AI Business Blueprint",
      formSub: "Provide your profile, time constraints, and start-up budget below. Gemini 3.5 will customize a highly actionable launch sequence in seconds.",
      formPathway: "1. Target Monetization Pathway",
      formPathwayPlaceholder: "—— Select a pathway to get started ——",
      formExperience: "2. Your Prior AI Experience Level",
      formExperienceBeginner: "Complete Novice (Heard of AI, but rarely used it)",
      formExperienceIntermediate: "Intermediate Enthusiast (Familiar with standard prompts/chats)",
      formExperienceAdvanced: "Tech-savvy Hacker (Familiar with advanced models & workflow automation)",
      formCapital: "3. Start-up Capital",
      formCapitalZero: "Zero Budget (Utilize exclusively free-tier/open-source assets)",
      formCapitalLow: "Light Subscriptions ($15 - $30/mo for standard tool tiers)",
      formCapitalMedium: "Professional Stack ($50 - $200/mo for API tokens/advanced tools)",
      formTime: "4. Time Commitment",
      formTimePartLow: "Light Part-time (5 - 10 hours / week)",
      formTimePartHigh: "Heavy Part-time (15 - 25 hours / week)",
      formTimeFull: "Full-time Integration (40+ hours / week)",
      formSkills: "5. Personal Superpowers & Specific Talents (Optional)",
      formSkillsPlaceholder: "E.g., Fluent in German, copywriting, basic HTML, background in sales...",
      btnGenerate: "Generate Personalized Blueprint",
      btnGenerating: "Formulating Report...",
      blueprintReportTitle: "AI MONETIZATION EXECUTIVE BLUEPRINT",
      blueprintSubtitle: "Premium Customized Business Guide · Secured by Gemini API",
      difficultyLabel: "General Launch Difficulty",
      incomeLabel: "Expected Mo. Revenue (3-Month conservative target)",
      summaryTitle: "I. Executive Suitability Review",
      roadmapTitle: "II. Launch Milestone Roadmap",
      monetizationTitle: "III. Monetization Framework",
      toolsTitle: "IV. Tool Stack & SaaS Budget List",
      marketingTitle: "V. Early Growth & Marketing Playbook",
      promptsTitle: "VI. Turnkey Prompts (Copy & Paste Ready)",
      risksTitle: "VII. Risk Identification & Strategic Mitigations",
      channelCol: "Channel",
      earningsCol: "Est. Income",
      descCol: "Pricing Mechanics",
      toolCol: "Tool Name",
      costCol: "Monthly Pricing",
      purposeCol: "Core Operation Purpose",
      riskCol: "Potential Threat / Risk",
      mitigationCol: "Risk Mitigation Strategy",
      whitepaperTitle: "SPECIAL DOWNLOAD",
      whitepaperBtn: "Download Modern Prompts Bible (PDF)",
      footerPublished: "Published by AI Strategist Laboratory",
      footerCopyright: "Copyright © 2026 Insights and Analytics. All Rights Reserved."
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#F9F8F3] text-[#1A1A1A] font-serif selection:bg-[#E07A5F]/20 selection:text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10">
        {/* Editorial Header */}
        <Header lang={lang} setLang={setLang} />

        {/* Curated Pathways Grid Section */}
        <section id="pathways" className="mb-16">
          <div className="border-b border-[#1A1A1A]/20 pb-4 mb-8">
            <span className="text-[10px] tracking-[0.2em] font-sans uppercase font-bold text-[#E07A5F]">
              {t.headlineLabel}
            </span>
            <h2 className="text-3xl font-extrabold text-[#1A1A1A] mt-1 font-serif tracking-tight">
              {t.curatedHeading}
            </h2>
            <p className="text-sm text-[#1A1A1A]/60 font-serif mt-2 max-w-2xl leading-relaxed">
              {t.curatedSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATHWAYS.map((pathway, idx) => (
              <PathwayCard
                key={pathway.id}
                pathway={pathway}
                index={idx}
                lang={lang}
                onSelect={handleSelectPathwayFromCard}
              />
            ))}
          </div>
        </section>

        {/* Tactical Strategy Column & Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          {/* Tactical Essays (Editorial Columns) */}
          <section className="lg:col-span-5 space-y-6">
            <div className="border-b border-[#1A1A1A]/20 pb-3">
              <h3 className="text-xl font-bold font-serif text-[#1A1A1A]">
                {t.essayHeading}
              </h3>
              <p className="text-xs text-[#1A1A1A]/50 font-sans uppercase tracking-widest font-semibold mt-1">
                {t.essaySub}
              </p>
            </div>

            <div className="space-y-6 divide-y divide-[#1A1A1A]/10">
              {TIPS_AND_STRATEGY.map((essay, idx) => (
                <div key={idx} className={`${idx > 0 ? "pt-5" : ""} space-y-2`}>
                  <h4 className="text-sm font-sans font-extrabold text-[#E07A5F] flex items-center gap-1.5 uppercase tracking-wide">
                    <Lightbulb className="w-4 h-4" />
                    {lang === "zh" ? essay.title : `Strategy 0${idx + 1}`}
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/80 font-serif leading-relaxed text-justify">
                    {essay.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Calculator Section */}
          <div className="lg:col-span-7">
            <IncomeSimulator lang={lang} />
          </div>
        </div>

        {/* Blueprint Questionnaire Form Section */}
        <section id="blueprint-form" className="bg-white border border-[#1A1A1A]/10 p-8 mb-16 relative">
          <div className="absolute top-0 right-0 p-3 text-[10px] font-mono tracking-widest font-bold opacity-35 uppercase border-l border-b border-[#1A1A1A]/10">
            SECURE BLUEPRINT GENERATOR
          </div>

          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold font-serif text-[#1A1A1A] mb-2 tracking-tight">
              {t.formHeading}
            </h2>
            <p className="text-xs text-[#1A1A1A]/60 font-serif leading-relaxed mb-8">
              {t.formSub}
            </p>

            <form onSubmit={generateBlueprint} className="space-y-6">
              {/* Target Pathway Selector */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-extrabold text-[#1A1A1A]/70 uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#E07A5F]" />
                  {t.formPathway}
                </label>
                <select
                  id="form-pathway-select"
                  value={selectedPathway}
                  onChange={(e) => setSelectedPathway(e.target.value)}
                  className="w-full bg-[#F9F8F3] border border-[#1A1A1A]/20 px-4 py-3 rounded-none text-sm font-serif focus:outline-none focus:border-[#E07A5F] focus:ring-1 focus:ring-[#E07A5F]"
                  required
                >
                  <option value="" disabled>
                    {t.formPathwayPlaceholder}
                  </option>
                  {PATHWAYS.map((p) => (
                    <option key={p.id} value={lang === "zh" ? p.title : p.titleEn}>
                      {lang === "zh" ? p.title : p.titleEn} ({p.avgEarnings})
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level Selector */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-extrabold text-[#1A1A1A]/70 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#E07A5F]" />
                  {t.formExperience}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setExperience("beginner")}
                    className={`p-3 text-left text-xs font-serif border transition-all ${
                      experience === "beginner"
                        ? "bg-[#1A1A1A] text-[#F9F8F3] border-[#1A1A1A]"
                        : "bg-[#F9F8F3] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 text-[#1A1A1A]/80"
                    }`}
                  >
                    <span className="block font-bold text-[10px] font-sans uppercase tracking-widest mb-1 opacity-55">Tier 01</span>
                    {t.formExperienceBeginner}
                  </button>
                  <button
                    type="button"
                    onClick={() => setExperience("intermediate")}
                    className={`p-3 text-left text-xs font-serif border transition-all ${
                      experience === "intermediate"
                        ? "bg-[#1A1A1A] text-[#F9F8F3] border-[#1A1A1A]"
                        : "bg-[#F9F8F3] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 text-[#1A1A1A]/80"
                    }`}
                  >
                    <span className="block font-bold text-[10px] font-sans uppercase tracking-widest mb-1 opacity-55">Tier 02</span>
                    {t.formExperienceIntermediate}
                  </button>
                  <button
                    type="button"
                    onClick={() => setExperience("advanced")}
                    className={`p-3 text-left text-xs font-serif border transition-all ${
                      experience === "advanced"
                        ? "bg-[#1A1A1A] text-[#F9F8F3] border-[#1A1A1A]"
                        : "bg-[#F9F8F3] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 text-[#1A1A1A]/80"
                    }`}
                  >
                    <span className="block font-bold text-[10px] font-sans uppercase tracking-widest mb-1 opacity-55">Tier 03</span>
                    {t.formExperienceAdvanced}
                  </button>
                </div>
              </div>

              {/* Startup Capital Selector */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-extrabold text-[#1A1A1A]/70 uppercase tracking-widest flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#E07A5F]" />
                  {t.formCapital}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setCapital("zero")}
                    className={`p-3 text-left text-xs font-serif border transition-all ${
                      capital === "zero"
                        ? "bg-[#1A1A1A] text-[#F9F8F3] border-[#1A1A1A]"
                        : "bg-[#F9F8F3] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 text-[#1A1A1A]/80"
                    }`}
                  >
                    <span className="block font-bold text-[10px] font-sans uppercase tracking-widest mb-1 opacity-55">Level 01</span>
                    {t.formCapitalZero}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCapital("low")}
                    className={`p-3 text-left text-xs font-serif border transition-all ${
                      capital === "low"
                        ? "bg-[#1A1A1A] text-[#F9F8F3] border-[#1A1A1A]"
                        : "bg-[#F9F8F3] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 text-[#1A1A1A]/80"
                    }`}
                  >
                    <span className="block font-bold text-[10px] font-sans uppercase tracking-widest mb-1 opacity-55">Level 02</span>
                    {t.formCapitalLow}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCapital("medium")}
                    className={`p-3 text-left text-xs font-serif border transition-all ${
                      capital === "medium"
                        ? "bg-[#1A1A1A] text-[#F9F8F3] border-[#1A1A1A]"
                        : "bg-[#F9F8F3] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 text-[#1A1A1A]/80"
                    }`}
                  >
                    <span className="block font-bold text-[10px] font-sans uppercase tracking-widest mb-1 opacity-55">Level 03</span>
                    {t.formCapitalMedium}
                  </button>
                </div>
              </div>

              {/* Weekly Time Commitment */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-extrabold text-[#1A1A1A]/70 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E07A5F]" />
                  {t.formTime}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setTimeCommitment("part-time-low")}
                    className={`p-3 text-left text-xs font-serif border transition-all ${
                      timeCommitment === "part-time-low"
                        ? "bg-[#1A1A1A] text-[#F9F8F3] border-[#1A1A1A]"
                        : "bg-[#F9F8F3] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 text-[#1A1A1A]/80"
                    }`}
                  >
                    <span className="block font-bold text-[10px] font-sans uppercase tracking-widest mb-1 opacity-55">Mild</span>
                    {t.formTimePartLow}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeCommitment("part-time-high")}
                    className={`p-3 text-left text-xs font-serif border transition-all ${
                      timeCommitment === "part-time-high"
                        ? "bg-[#1A1A1A] text-[#F9F8F3] border-[#1A1A1A]"
                        : "bg-[#F9F8F3] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 text-[#1A1A1A]/80"
                    }`}
                  >
                    <span className="block font-bold text-[10px] font-sans uppercase tracking-widest mb-1 opacity-55">Dedicated</span>
                    {t.formTimePartHigh}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeCommitment("full-time")}
                    className={`p-3 text-left text-xs font-serif border transition-all ${
                      timeCommitment === "full-time"
                        ? "bg-[#1A1A1A] text-[#F9F8F3] border-[#1A1A1A]"
                        : "bg-[#F9F8F3] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 text-[#1A1A1A]/80"
                    }`}
                  >
                    <span className="block font-bold text-[10px] font-sans uppercase tracking-widest mb-1 opacity-55">Obsessed</span>
                    {t.formTimeFull}
                  </button>
                </div>
              </div>

              {/* Specific Skills input */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-extrabold text-[#1A1A1A]/70 uppercase tracking-widest flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#E07A5F]" />
                  {t.formSkills}
                </label>
                <textarea
                  id="form-skills-input"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder={t.formSkillsPlaceholder}
                  rows={3}
                  className="w-full bg-[#F9F8F3] border border-[#1A1A1A]/20 p-3 rounded-none text-xs font-serif focus:outline-none focus:border-[#E07A5F] focus:ring-1 focus:ring-[#E07A5F]"
                />
              </div>

              {/* Call to action trigger */}
              <div className="pt-4">
                <button
                  id="submit-blueprint-btn"
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 text-sm font-sans font-extrabold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 ${
                    isLoading
                      ? "bg-[#1A1A1A]/60 text-[#F9F8F3] cursor-not-allowed"
                      : "bg-[#1A1A1A] hover:bg-[#E07A5F] text-[#F9F8F3]"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-transparent border-[#F9F8F3] rounded-full animate-spin" />
                      {t.btnGenerating}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      {t.btnGenerate}
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Handled Error display inside the container (Zero visual slop) */}
            {error && (
              <div className="mt-6 p-4 border border-[#E07A5F]/40 bg-[#E07A5F]/5 text-[#1A1A1A] flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#E07A5F] shrink-0 mt-0.5" />
                <div className="text-xs font-serif leading-relaxed">
                  <p className="font-bold uppercase tracking-wider font-sans mb-1 text-[#E07A5F]">API Error / Notice</p>
                  <p>{error}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Blueprint Document output */}
        <AnimatePresence>
          {blueprint && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              id="blueprint-report"
              className="bg-white border-2 border-[#1A1A1A] p-8 sm:p-12 mb-16 shadow-xl relative"
            >
              {/* Report Decorative Header */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#E07A5F]" />

              <div className="text-center border-b border-[#1A1A1A] pb-8 mb-10">
                <span className="text-[10px] tracking-[0.3em] font-sans uppercase font-bold text-[#1A1A1A]/50">
                  {blueprint.difficultyScore ? `Difficulty Assessment: ${blueprint.difficultyScore} / 10` : "Official Audit"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1A1A] mt-2 mb-2 tracking-tighter leading-tight font-serif uppercase">
                  {t.blueprintReportTitle}
                </h2>
                <p className="text-xs text-[#E07A5F] uppercase tracking-widest font-sans font-bold italic">
                  {t.blueprintSubtitle}
                </p>
              </div>

              {/* Key Indicators in top row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-[#1A1A1A]/10 mb-8 font-serif">
                <div className="p-4 bg-[#F9F8F3] border border-[#1A1A1A]/10">
                  <span className="text-[10px] font-sans uppercase tracking-widest font-extrabold text-[#1A1A1A]/40 block mb-1">
                    {t.difficultyLabel}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2.5 h-6 ${
                            i < blueprint.difficultyScore ? "bg-[#E07A5F]" : "bg-[#1A1A1A]/10"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-base font-sans">{blueprint.difficultyScore} / 10</span>
                  </div>
                </div>

                <div className="p-4 bg-[#F9F8F3] border border-[#1A1A1A]/10 flex flex-col justify-between">
                  <span className="text-[10px] font-sans uppercase tracking-widest font-extrabold text-[#1A1A1A]/40 block mb-1">
                    {t.incomeLabel}
                  </span>
                  <div className="text-2xl font-extrabold text-[#E07A5F] font-sans flex items-baseline">
                    {blueprint.potentialMonthlyIncome}
                  </div>
                </div>
              </div>

              {/* Sections Breakdown */}
              <div className="space-y-10">
                {/* 1. Suitability Review */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold font-serif text-[#1A1A1A] border-b border-[#1A1A1A] pb-1.5 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#E07A5F]" />
                    {t.summaryTitle}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-serif text-justify">
                    {blueprint.summary}
                  </p>
                </div>

                {/* 2. Step by Step Launch Timeline */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-serif text-[#1A1A1A] border-b border-[#1A1A1A] pb-1.5 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#E07A5F]" />
                    {t.roadmapTitle}
                  </h3>
                  <div className="space-y-4 relative pl-4 border-l border-[#1A1A1A]/10">
                    {blueprint.steps?.map((step, idx) => (
                      <div key={idx} className="relative space-y-1.5">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#E07A5F] border-2 border-white shadow-xs" />
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="font-sans font-extrabold text-[10px] text-[#E07A5F] uppercase tracking-widest px-2 py-0.5 bg-[#E07A5F]/5 border border-[#E07A5F]/15">
                            {step.timeframe}
                          </span>
                          <h4 className="text-sm font-bold text-[#1A1A1A] font-serif">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#1A1A1A]/70 font-serif leading-relaxed">
                          {step.description}
                        </p>
                        <div className="text-xs font-serif bg-[#F9F8F3] border border-[#1A1A1A]/5 p-2 flex items-start gap-1 text-[#1A1A1A]/80">
                          <span className="font-sans font-extrabold text-[#E07A5F] shrink-0 text-[10px] uppercase tracking-wider bg-[#E07A5F]/5 px-1 rounded-sm mt-0.5">Critical Action:</span>
                          <span>{step.keyActionItem}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Monetization Framework */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-serif text-[#1A1A1A] border-b border-[#1A1A1A] pb-1.5 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#E07A5F]" />
                    {t.monetizationTitle}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-serif border-collapse">
                      <thead>
                        <tr className="border-b border-[#1A1A1A] text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/60">
                          <th className="py-2.5 pr-4">{t.channelCol}</th>
                          <th className="py-2.5 px-4">{t.earningsCol}</th>
                          <th className="py-2.5 pl-4">{t.descCol}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1A1A1A]/5">
                        {blueprint.monetizationModel?.map((item, idx) => (
                          <tr key={idx} className="hover:bg-[#F9F8F3]/50">
                            <td className="py-3 pr-4 font-bold text-[#1A1A1A]">{item.channel}</td>
                            <td className="py-3 px-4 font-bold text-[#E07A5F]">{item.estimatedEarning}</td>
                            <td className="py-3 pl-4 text-[#1A1A1A]/70 leading-relaxed">{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4. Tool Stack Table */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-serif text-[#1A1A1A] border-b border-[#1A1A1A] pb-1.5 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#E07A5F]" />
                    {t.toolsTitle}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-serif border-collapse">
                      <thead>
                        <tr className="border-b border-[#1A1A1A] text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/60">
                          <th className="py-2.5 pr-4">{t.toolCol}</th>
                          <th className="py-2.5 px-4">{t.costCol}</th>
                          <th className="py-2.5 pl-4">{t.purposeCol}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1A1A1A]/5">
                        {blueprint.tools?.map((tool, idx) => (
                          <tr key={idx} className="hover:bg-[#F9F8F3]/50">
                            <td className="py-3 pr-4 font-bold text-[#1A1A1A]">{tool.name}</td>
                            <td className="py-3 px-4 font-bold text-[#E07A5F]">{tool.cost}</td>
                            <td className="py-3 pl-4 text-[#1A1A1A]/70 leading-relaxed">{tool.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 5. Marketing Growth Playbook */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold font-serif text-[#1A1A1A] border-b border-[#1A1A1A] pb-1.5 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#E07A5F]" />
                    {t.marketingTitle}
                  </h3>
                  <ul className="space-y-2.5 text-xs text-[#1A1A1A]/80 font-serif list-decimal pl-4">
                    {blueprint.marketingStrategy?.map((strategy, idx) => (
                      <li key={idx} className="leading-relaxed text-justify">
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 6. Turnkey Copy-paste Prompts */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-serif text-[#1A1A1A] border-b border-[#1A1A1A] pb-1.5 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#E07A5F]" />
                    {t.promptsTitle}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {blueprint.examplePrompts?.map((item, idx) => (
                      <div key={idx} className="border border-[#1A1A1A]/15 p-4 bg-[#F9F8F3]/50 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center border-b border-[#1A1A1A]/5 pb-2">
                            <span className="font-sans font-extrabold text-[9px] uppercase tracking-wider text-[#E07A5F] bg-[#E07A5F]/5 px-1.5 py-0.5 border border-[#E07A5F]/15">
                              {item.targetTool}
                            </span>
                            <span className="text-[10px] font-sans font-bold text-[#1A1A1A]/40 uppercase tracking-widest">PROMPT模板</span>
                          </div>
                          <h4 className="text-xs font-bold text-[#1A1A1A] font-serif">{item.title}</h4>
                          <p className="text-[11px] font-mono text-[#1A1A1A]/70 bg-white/80 border border-[#1A1A1A]/5 p-3 leading-relaxed break-words whitespace-pre-wrap max-h-36 overflow-y-auto">
                            {item.promptText}
                          </p>
                        </div>

                        <button
                          id={`copy-prompt-${idx}`}
                          onClick={() => handleCopyPrompt(item.promptText, idx)}
                          className="mt-3 w-full py-2 bg-[#1A1A1A] hover:bg-[#E07A5F] text-[#F9F8F3] text-[10px] font-sans uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          {copiedPromptIndex === idx ? (
                            <>
                              <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Clipboard className="w-3.5 h-3.5" />
                              Copy Prompt
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. Risks & Mitigations */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-serif text-[#1A1A1A] border-b border-[#1A1A1A] pb-1.5 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#E07A5F]" />
                    {t.risksTitle}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-serif border-collapse">
                      <thead>
                        <tr className="border-b border-[#1A1A1A] text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/60">
                          <th className="py-2.5 pr-4 w-1/3">{t.riskCol}</th>
                          <th className="py-2.5 pl-4 w-2/3">{t.mitigationCol}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1A1A1A]/5">
                        {blueprint.risksAndMitigations?.map((item, idx) => (
                          <tr key={idx} className="hover:bg-[#F9F8F3]/50">
                            <td className="py-3 pr-4 font-bold text-[#E07A5F]">{item.risk}</td>
                            <td className="py-3 pl-4 text-[#1A1A1A]/70 leading-relaxed">{item.mitigation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call-to-action Whitepaper Box */}
        <section className="bg-[#2D3047] text-[#F9F8F3] p-8 border border-[#1A1A1A]/20 flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#E07A5F]">
              {t.whitepaperTitle}
            </span>
            <h3 className="text-xl font-bold font-serif">
              {lang === "zh" ? "《AI 高价值实操红宝书 (2026版)》" : "AI Monetization Playbook & Prompts Vault"}
            </h3>
            <p className="text-xs font-serif text-[#F9F8F3]/70 max-w-xl leading-relaxed">
              {lang === "zh"
                ? "收录超过 120 多个可直接复制运行的顶级提示词模版与 50 多个副业代工冷启动真实案例拆解。"
                : "A collection of 120+ plug-and-play high-value prompt parameters and 50+ case breakdowns."}
            </p>
          </div>
          <button
            id="download-whitepaper-btn"
            onClick={() => alert(lang === "zh" ? "提示词白皮书下载任务已提交，将在后台异步打包发送至您的注册邮箱！" : "Download requested. The guide is being bundled and dispatched to your email address!")}
            className="w-full md:w-auto px-6 py-3 bg-[#E07A5F] hover:bg-[#F9F8F3] hover:text-[#1A1A1A] text-[#F9F8F3] text-xs font-sans font-bold uppercase tracking-widest transition-all shadow-md shrink-0"
          >
            {t.whitepaperBtn}
          </button>
        </section>

        {/* Editorial Footer */}
        <footer className="border-t border-[#1A1A1A]/25 pt-8 pb-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/40 gap-4">
          <div>
            {t.footerPublished}
          </div>
          <div className="text-center md:text-right">
            {t.footerCopyright}
          </div>
        </footer>
      </div>
    </div>
  );
}
