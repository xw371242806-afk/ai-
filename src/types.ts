export interface Pathway {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  difficulty: "Easy" | "Medium" | "Hard" | "简单" | "中等" | "困难";
  capitalRequired: "Zero" | "Low" | "Medium" | "零成本" | "低成本" | "中等";
  avgEarnings: string;
  recommendedTools: string[];
  keySteps: string[];
  marketingTips: string[];
  color: string;
  bgLight: string;
  borderClass: string;
}

export interface BusinessPlan {
  summary: string;
  potentialMonthlyIncome: string;
  difficultyScore: number;
  steps: {
    title: string;
    description: string;
    timeframe: string;
    keyActionItem: string;
  }[];
  monetizationModel: {
    channel: string;
    estimatedEarning: string;
    description: string;
  }[];
  tools: {
    name: string;
    cost: string;
    purpose: string;
  }[];
  marketingStrategy: string[];
  examplePrompts: {
    targetTool: string;
    title: string;
    promptText: string;
  }[];
  risksAndMitigations: {
    risk: string;
    mitigation: string;
  }[];
}
