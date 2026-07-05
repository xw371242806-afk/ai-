import { useState, useEffect } from "react";
import { Calculator, Coins } from "lucide-react";

interface IncomeSimulatorProps {
  lang: "zh" | "en";
}

interface BizProfile {
  name: string;
  nameEn: string;
  defaultPrice: number;
  defaultQty: number;
  priceUnit: string;
  priceUnitEn: string;
  qtyUnit: string;
  qtyUnitEn: string;
  defaultToolCost: number;
}

const BIZ_PROFILES: BizProfile[] = [
  {
    name: "AI 内容创作者 (接单/广告)",
    nameEn: "AI Content Creator (Sponsorships)",
    defaultPrice: 1500,
    defaultQty: 4,
    priceUnit: "元 / 条商单",
    priceUnitEn: "$ / sponsorship",
    qtyUnit: "个商单 / 月",
    qtyUnitEn: "sponsorships / mo",
    defaultToolCost: 300,
  },
  {
    name: "AI 自由职业者 (代客设计/文案)",
    nameEn: "AI Freelancer (Design/Copywriting)",
    defaultPrice: 200,
    defaultQty: 40,
    priceUnit: "元 / 份单",
    priceUnitEn: "$ / gig",
    qtyUnit: "份接单 / 月",
    qtyUnitEn: "gigs / mo",
    defaultToolCost: 150,
  },
  {
    name: "企业 AI 落地咨询顾问",
    nameEn: "Corporate AI Consultant",
    defaultPrice: 8000,
    defaultQty: 2,
    priceUnit: "元 / 咨询项目",
    priceUnitEn: "$ / project",
    qtyUnit: "个客户 / 月",
    qtyUnitEn: "clients / mo",
    defaultToolCost: 500,
  },
  {
    name: "AI 轻量级独立产品 (SaaS 订阅)",
    nameEn: "Micro-SaaS Subscriptions",
    defaultPrice: 30,
    defaultQty: 150,
    priceUnit: "元 / 季度订阅",
    priceUnitEn: "$ / sub",
    qtyUnit: "个订阅用户",
    qtyUnitEn: "subscribers / mo",
    defaultToolCost: 1200,
  },
];

export default function IncomeSimulator({ lang }: IncomeSimulatorProps) {
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [price, setPrice] = useState(1500);
  const [qty, setQty] = useState(4);
  const [toolCost, setToolCost] = useState(300);

  const profile = BIZ_PROFILES[selectedProfileIndex];

  // Sync state when selected profile changes
  useEffect(() => {
    setPrice(profile.defaultPrice);
    setQty(profile.defaultQty);
    setToolCost(profile.defaultToolCost);
  }, [selectedProfileIndex]);

  const grossRevenue = price * qty;
  const netProfit = Math.max(0, grossRevenue - toolCost);
  const margin = grossRevenue > 0 ? ((netProfit / grossRevenue) * 100).toFixed(0) : "0";

  const content = {
    zh: {
      title: "AI 变现收益与成本模拟器",
      desc: "利用滑动条调整你的定价与客户规模，直观感受 AI 极高的利润空间与近乎零的边际成本优势。",
      bizType: "商业变现模式",
      unitPrice: "客单价",
      volume: "月订单/客源规模",
      costs: "AI 软件与工具订阅成本 (月)",
      summaryTitle: "预计收益模型分析",
      gross: "月营业额",
      costLabel: "软件成本",
      netProfit: "预估月纯利润",
      margin: "净利润率",
      currency: "¥",
      currencyEn: "元",
      tips: [
        "边际成本几乎为零：传统行业每增加一个客户都需要昂贵的人工，而 AI 只需要几美分的 API 费用。",
        "高客单价策略：利用 AI 提供完整的、高颜值的交付物（如：把 logo 延展到全套 VI），能倍增定价空间。",
        "被动收入通道：轻量级 SaaS 订阅由于其自动化运行，极易形成庞大的高利润长尾收入。"
      ]
    },
    en: {
      title: "AI Business ROI Simulator",
      desc: "Adjust the pricing and volume sliders to see how AI enables ultra-high profit margins with extremely low marginal cost.",
      bizType: "Monetization Mode",
      unitPrice: "Unit Pricing",
      volume: "Monthly Client / Unit Volume",
      costs: "AI Software & Tool Subscriptions (Mo)",
      summaryTitle: "Estimated Income Breakdown",
      gross: "Gross Revenue",
      costLabel: "Tool Costs",
      netProfit: "Net Profit / Month",
      margin: "Net Margin",
      currency: "$",
      currencyEn: "",
      tips: [
        "Zero Marginal Cost: Unlike traditional work requiring hours of manual labor, AI scale costs are tiny API credits.",
        "Premium Bundle Strategy: Offer complete deliverables (e.g., logo drafts + full brand guidelines) to easily charge 5x-10x more.",
        "Passive Long-Tail SaaS: While single subscriptions are low, fully automated Micro-SaaS tools bring recurring high-margin profits."
      ]
    }
  };

  const t = content[lang];

  return (
    <section id="income-simulator" className="bg-[#2D3047] text-[#F9F8F3] rounded-none p-8 border border-[#1A1A1A]/20 shadow-md relative overflow-hidden">
      <div className="relative flex flex-col lg:flex-row gap-12 items-stretch">
        {/* Left column: inputs */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-[#E07A5F]" />
            <h2 className="text-2xl font-bold tracking-tight font-serif">{t.title}</h2>
          </div>
          <p className="text-[#F9F8F3]/70 text-sm leading-relaxed mb-6 font-serif">
            {t.desc}
          </p>

          {/* Model selection */}
          <div className="space-y-2">
            <label className="text-[10px] text-[#F9F8F3]/50 font-bold uppercase tracking-wider font-sans block">
              {t.bizType}
            </label>
            <select
              id="biz-profile-selector"
              value={selectedProfileIndex}
              onChange={(e) => setSelectedProfileIndex(Number(e.target.value))}
              className="w-full bg-[#1A1A1A]/40 text-[#F9F8F3] border border-[#F9F8F3]/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#E07A5F]"
            >
              {BIZ_PROFILES.map((p, idx) => (
                <option key={idx} value={idx} className="bg-[#2D3047]">
                  {lang === "zh" ? p.name : p.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-sans">
              <span className="text-[#F9F8F3]/50 uppercase tracking-wider font-bold">{t.unitPrice}</span>
              <span className="text-[#E07A5F] font-bold">
                {t.currency} {price} {lang === "zh" ? profile.priceUnit : profile.priceUnitEn}
              </span>
            </div>
            <input
              id="price-range-slider"
              type="range"
              min={profile.defaultPrice * 0.2 < 5 ? 5 : Math.floor(profile.defaultPrice * 0.2)}
              max={profile.defaultPrice * 3}
              step={profile.defaultPrice > 1000 ? 100 : profile.defaultPrice > 100 ? 10 : 1}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-1 bg-[#F9F8F3]/10 rounded appearance-none cursor-pointer accent-[#E07A5F]"
            />
          </div>

          {/* Volume Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-sans">
              <span className="text-[#F9F8F3]/50 uppercase tracking-wider font-bold">{t.volume}</span>
              <span className="text-[#E07A5F] font-bold">
                {qty} {lang === "zh" ? profile.qtyUnit : profile.qtyUnitEn}
              </span>
            </div>
            <input
              id="volume-range-slider"
              type="range"
              min="1"
              max={profile.defaultQty * 4}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full h-1 bg-[#F9F8F3]/10 rounded appearance-none cursor-pointer accent-[#E07A5F]"
            />
          </div>

          {/* Cost Input Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-sans">
              <span className="text-[#F9F8F3]/50 uppercase tracking-wider font-bold">{t.costs}</span>
              <span className="text-[#E07A5F] font-bold">
                {t.currency} {toolCost} / {lang === "zh" ? "月" : "mo"}
              </span>
            </div>
            <input
              id="cost-range-slider"
              type="range"
              min="0"
              max="2000"
              step="50"
              value={toolCost}
              onChange={(e) => setToolCost(Number(e.target.value))}
              className="w-full h-1 bg-[#F9F8F3]/10 rounded appearance-none cursor-pointer accent-[#E07A5F]"
            />
          </div>
        </div>

        {/* Right column: calculator output card */}
        <div className="w-full lg:w-96 bg-[#1A1A1A]/30 border border-[#F9F8F3]/10 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-[#F9F8F3]/10 pb-4">
              <p className="text-[10px] text-[#F9F8F3]/50 uppercase tracking-wider font-sans font-bold">{t.summaryTitle}</p>
              <p className="text-sm font-bold text-[#F9F8F3] mt-1 font-serif">
                {lang === "zh" ? profile.name : profile.nameEn}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 font-serif">
              <div>
                <span className="text-xs text-[#F9F8F3]/50 block">{t.gross}</span>
                <span className="text-xl font-bold text-[#F9F8F3]">
                  {t.currency}{grossRevenue.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#F9F8F3]/50 block">{t.costLabel}</span>
                <span className="text-xl font-bold text-[#F9F8F3]/80">
                  {t.currency}{toolCost}
                </span>
              </div>
            </div>

            <div className="bg-[#1A1A1A]/50 border border-[#F9F8F3]/10 p-4 rounded-none">
              <span className="text-[10px] text-[#E07A5F] block uppercase tracking-wider font-sans font-extrabold">
                {t.netProfit}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-[#E07A5F] font-serif">
                  {t.currency}{netProfit.toLocaleString()}
                </span>
                <span className="text-xs text-[#F9F8F3]/50 font-serif ml-1">
                  / {lang === "zh" ? "月" : "mo"}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm bg-[#1A1A1A]/20 p-3 border border-[#F9F8F3]/5">
              <span className="text-[#F9F8F3]/55 text-[10px] font-sans uppercase tracking-wider font-bold">{t.margin}</span>
              <span className="font-bold text-[#E07A5F] text-base font-serif">{margin}%</span>
            </div>
          </div>

          {/* Interactive takeaway tips */}
          <div className="mt-6 pt-4 border-t border-[#F9F8F3]/10 space-y-2">
            <p className="text-xs font-bold text-[#E07A5F] flex items-center gap-1 font-sans uppercase tracking-wider">
              <Coins className="w-3.5 h-3.5" />
              {lang === "zh" ? "核心商业洞察" : "Core Business Insights"}
            </p>
            <ul className="text-xs text-[#F9F8F3]/75 space-y-2 font-serif list-disc pl-3">
              {t.tips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

