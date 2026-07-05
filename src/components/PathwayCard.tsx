import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pathway } from "../types";
import {
  Video,
  Briefcase,
  Cpu,
  GraduationCap,
  Code,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Wrench,
  Milestone,
  Megaphone
} from "lucide-react";

interface PathwayCardProps {
  key?: string;
  pathway: Pathway;
  index: number;
  lang: "zh" | "en";
  onSelect: (pathwayTitle: string) => void;
}

const iconMap: Record<string, any> = {
  Video,
  Briefcase,
  Cpu,
  GraduationCap,
  Code,
};

export default function PathwayCard({ pathway, index, lang, onSelect }: PathwayCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = iconMap[pathway.icon] || Cpu;

  const content = {
    zh: {
      difficulty: "入门难度",
      capital: "启动资金",
      avgEarnings: "预计收益",
      recommendedTools: "推荐 AI 工具",
      keySteps: "落地执行路径",
      marketingTips: "核心获客与变现技巧",
      actionBtn: "生成专属蓝图",
      expandBtn: "查看落地细则",
    },
    en: {
      difficulty: "Difficulty",
      capital: "Startup Capital",
      avgEarnings: "Estimated Income",
      recommendedTools: "Recommended AI Tools",
      keySteps: "Execution Steps",
      marketingTips: "Growth & Marketing Tips",
      actionBtn: "Get Blueprint",
      expandBtn: "Details",
    },
  };

  const t = content[lang];

  return (
    <motion.div
      layout
      id={`pathway-card-${pathway.id}`}
      className="bg-white border border-[#1A1A1A]/10 p-6 rounded-none flex flex-col justify-between hover:border-[#1A1A1A]/30 transition-all duration-300 shadow-xs"
    >
      <div className="space-y-4">
        {/* Editorial Top header: Numbering and category tag */}
        <div className="flex justify-between items-start border-b border-[#1A1A1A]/5 pb-3">
          <span className="text-[11px] font-sans font-bold py-1 px-2.5 bg-[#F9F8F3] border border-[#1A1A1A]/10 text-[#1A1A1A]">
            0{index + 1}
          </span>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#E07A5F] font-extrabold flex items-center gap-1">
            <IconComponent className="w-3 h-3 text-[#E07A5F]" />
            {pathway.id.replace("-", " ")}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl font-bold text-[#1A1A1A] leading-tight font-serif hover:text-[#E07A5F] transition-colors">
            {lang === "zh" ? pathway.title : pathway.titleEn}
          </h3>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="inline-block text-[11px] font-sans font-extrabold text-[#E07A5F] bg-[#E07A5F]/5 px-2 py-0.5 border border-[#E07A5F]/15">
              {pathway.avgEarnings}
            </span>
          </div>
        </div>

        <p className="text-[#1A1A1A]/70 text-sm leading-relaxed font-serif">
          {lang === "zh" ? pathway.description : pathway.descriptionEn}
        </p>

        {/* Meta Grid (Strictly Editorial style) */}
        <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-[#1A1A1A]/5 text-xs font-serif">
          <div>
            <span className="text-[#1A1A1A]/40 block text-[10px] font-sans uppercase tracking-wider font-bold mb-0.5">{t.difficulty}</span>
            <span className="font-bold text-[#1A1A1A]">{pathway.difficulty}</span>
          </div>
          <div>
            <span className="text-[#1A1A1A]/40 block text-[10px] font-sans uppercase tracking-wider font-bold mb-0.5">{t.capital}</span>
            <span className="font-bold text-[#1A1A1A]">{pathway.capitalRequired}</span>
          </div>
        </div>

        {/* Detailed expansion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-5 pt-3"
            >
              {/* Recommended Tools */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-sans font-extrabold text-[#1A1A1A]/50 uppercase tracking-widest flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#2D3047]" />
                  {t.recommendedTools}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {pathway.recommendedTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs font-sans font-medium bg-[#2D3047]/5 text-[#2D3047] border border-[#2D3047]/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Execution Steps */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-sans font-extrabold text-[#1A1A1A]/50 uppercase tracking-widest flex items-center gap-1.5">
                  <Milestone className="w-3.5 h-3.5 text-[#E07A5F]" />
                  {t.keySteps}
                </h4>
                <ol className="space-y-2 text-xs text-[#1A1A1A]/80 font-serif">
                  {pathway.keySteps.map((step, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1A1A1A]/5 text-[#1A1A1A] border border-[#1A1A1A]/10 flex items-center justify-center font-sans font-bold text-[9px] mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Marketing Tips */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-sans font-extrabold text-[#1A1A1A]/50 uppercase tracking-widest flex items-center gap-1.5">
                  <Megaphone className="w-3.5 h-3.5 text-[#2D3047]" />
                  {t.marketingTips}
                </h4>
                <ul className="space-y-1.5 text-xs text-[#1A1A1A]/80 font-serif">
                  {pathway.marketingTips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-[#E07A5F] font-bold">•</span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Editorial Card Buttons */}
      <div className="mt-6 pt-4 border-t border-[#1A1A1A]/10 flex gap-2">
        <button
          id={`expand-btn-${pathway.id}`}
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex items-center justify-center gap-1 px-2.5 py-2 border border-[#1A1A1A]/20 hover:border-[#1A1A1A]/50 text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A] transition-colors bg-white"
        >
          {t.expandBtn}
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <button
          id={`select-btn-${pathway.id}`}
          onClick={() => onSelect(lang === "zh" ? pathway.title : pathway.titleEn)}
          className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-2 bg-[#1A1A1A] hover:bg-[#E07A5F] text-[#F9F8F3] text-xs font-sans font-bold uppercase tracking-wider transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          {t.actionBtn}
        </button>
      </div>
    </motion.div>
  );
}

