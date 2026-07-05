import { Pathway } from "./types";

export const PATHWAYS: Pathway[] = [
  {
    id: "content-creation",
    title: "AI 视觉与多媒体内容创作",
    titleEn: "AI Visual & Multimedia Content Creation",
    description: "利用 AI 图文和视频生成工具（如 Midjourney、Sora、HeyGen），在小红书、抖音、YouTube 制作高质量爆款视频和文章，赚取广告、商单或流量分成。",
    descriptionEn: "Leverage AI graphic and video generation tools (Midjourney, Sora, HeyGen) to create viral visual content and scripts, earning from sponsorships, ads, or traffic sharing.",
    icon: "Video",
    difficulty: "简单",
    capitalRequired: "零成本",
    avgEarnings: "¥3,000 - ¥15,000 / 月",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50/50",
    borderClass: "border-blue-100 hover:border-blue-300",
    recommendedTools: ["Midjourney / DALL-E 3", "Kimi / ChatGPT", "剪映 (CapCut) AI", "HeyGen / Luma Dream Machine"],
    keySteps: [
      "确定细分垂直领域（如 AI 疗愈故事、国风壁纸、虚拟博主、科幻动画）",
      "使用 AI 批量生成高质量图像与文案脚本",
      "使用 AI 自动配音与视频剪辑工具进行拼接混剪",
      "多平台分发（小红书、抖音、B站、YouTube），持续积累初始粉丝"
    ],
    marketingTips: [
      "主打‘视觉震撼’或‘情绪价值’，AI 艺术风格越独特越容易在社交平台破圈",
      "保持每日更新或隔天更新，利用算法推荐增加曝光率",
      "粉丝达到一定量级后，可承接品牌置入商单、定制壁纸出售、或售卖提示词教程"
    ]
  },
  {
    id: "freelance-services",
    title: "AI 自由职业与高效代工",
    titleEn: "AI Freelance & Micro-Services",
    description: "利用 AI 将工作效率提升 10 倍，在接单平台（淘宝、闲鱼、Fiverr、Upwork）承接文案撰写、LOGO设计、翻译、PPT制作等服务，实现低价高频变现。",
    descriptionEn: "Use AI to supercharge your efficiency by 10x, offering copy editing, logo design, professional translation, or slide design on platforms like Fiverr or Upwork.",
    icon: "Briefcase",
    difficulty: "中等",
    capitalRequired: "零成本",
    avgEarnings: "¥5,000 - ¥20,000 / 月",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50/50",
    borderClass: "border-emerald-100 hover:border-emerald-300",
    recommendedTools: ["Claude / ChatGPT", "Midjourney / Magnific AI", "Gamma (PPT生成)", "DeepL / Google Translator API"],
    keySteps: [
      "在闲鱼、小红书、淘宝或海外 Fiverr 注册卖家店铺，上架垂直代工服务",
      "收到需求后，利用 AI 进行初稿快速生成（如 10 分钟设计 5 款精美 LOGO 或 1 小时输出 1 万字翻译）",
      "对 AI 输出进行人工微调和深度润色，确保交付质量达到专业标准",
      "交付并索取好评，逐步提高客单价和店铺排名"
    ],
    marketingTips: [
      "‘超快速交付’（如 2 小时交稿）是 AI 代工的核心竞争优势",
      "打包销售服务：例如提供‘PPT设计+演讲搞撰写+Q&A常见问答’一条龙服务，增加溢价空间",
      "通过展示前后对比图或视频，展示 AI 加持下的专业和高效"
    ]
  },
  {
    id: "prompt-engineering",
    title: "企业 AI 落地与提示词咨询",
    titleEn: "Corporate AI Prompt Consulting",
    description: "为中小企业或传统行业定制 AI 办公提效工作流、企业专属知识库及提示词（Prompt）模版，提供企业内部培训和 AI 应用落地咨询。",
    descriptionEn: "Design custom AI workflows, private corporate knowledge bases, and optimized prompt databases for small-to-medium businesses. Offer team training and implementation audits.",
    icon: "Cpu",
    difficulty: "困难",
    capitalRequired: "低成本",
    avgEarnings: "¥10,000 - ¥50,000 / 项目",
    color: "from-purple-500 to-pink-600",
    bgLight: "bg-purple-50/50",
    borderClass: "border-purple-100 hover:border-purple-300",
    recommendedTools: ["Coze (扣子) / Dify", "Cursor / VSCode", "Notion / LangChain", "Gemini Pro / Claude API"],
    keySteps: [
      "深入了解特定行业（如电商客服、外贸跟单、新媒体运营）的痛点和高频重复工作",
      "利用 Dify/Coze 搭建行业专用的 AI Agent（智能体）或知识库工作流",
      "为客户定制简单易用的前端交互界面或微信机器人对接",
      "提供交付培训，提供后续的维护和升级服务，收取按月/按季的服务年费"
    ],
    marketingTips: [
      "用直观的‘帮您节省了多少人工小时 / 降本增效百分比’作为营销话术",
      "先从熟悉的细分领域做起（例如‘跨境电商亚马逊描述一键生成智能体’），建立标杆案例后再跨界获客",
      "通过发布干货文章或短视频建立行业专家形象，吸引主动咨询的 B 端客户"
    ]
  },
  {
    id: "ai-education",
    title: "AI 知识传播与技能培训",
    titleEn: "AI Education & Masterclass",
    description: "通过制作 AI 基础操作教程、行业提效网课或开设社群训练营，帮助普通人、职场人士克服技术焦虑，掌握 AI 工具的核心使用方法并收取学费。",
    descriptionEn: "Create beginner-friendly AI tutorials, corporate training courses, or premium digital masterminds to help students and working professionals overcome tech anxiety.",
    icon: "GraduationCap",
    difficulty: "中等",
    capitalRequired: "低成本",
    avgEarnings: "¥8,000 - ¥40,000 / 月",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50/50",
    borderClass: "border-amber-100 hover:border-amber-300",
    recommendedTools: ["OBS Studio (录课)", "Notion (大纲整理)", "小鹅通 / 腾讯课堂 (发布课程)", "知识星球 / 微信社群"],
    keySteps: [
      "整理市面上热门 AI 工具（如 Midjourney、ChatGPT、Suno 等）的基础与进阶玩法",
      "针对细分人群（如新媒体小编、UI设计师、大学生）开发‘保姆级提效课程’",
      "在公开平台（抖音、小红书、公众号、B站）分享有价值的免费技巧进行引流",
      "将流量导入私域，销售录播课、开展训练营打卡，或者经营高价值的付费社群"
    ],
    marketingTips: [
      "不要卖‘AI底层算法’，要卖‘明天上班就能省出 2 小时下班的实战动作’",
      "社群的‘陪伴式答疑服务’往往比课程本身更有黏性，也是口碑传播的关键",
      "设计‘助学返学费’等打卡机制，鼓励学员产出优秀作业作为你的下一次裂变广告"
    ]
  },
  {
    id: "ai-saas",
    title: "轻量化 AI 独立产品 (SaaS)",
    titleEn: "Micro-SaaS & Wrappers",
    description: "开发解决特定痛点的垂直 AI 小工具（如：AI起名、AI模拟面试、智能法律合同审查），通过接口付费、VIP订阅或广告变现。",
    descriptionEn: "Build micro-SaaS or light Web tools solving highly specific problems (e.g., AI naming, resume feedback, smart contract review). Monetize via subscriptions or API paywalls.",
    icon: "Code",
    difficulty: "困难",
    capitalRequired: "中等",
    avgEarnings: "¥15,000 - ¥80,000 / 月",
    color: "from-rose-500 to-red-600",
    bgLight: "bg-rose-50/50",
    borderClass: "border-rose-100 hover:border-rose-300",
    recommendedTools: ["Cursor / v0 (极速全栈开发)", "Vite / Next.js", "Gemini API / Groq API", "Stripe / 支付宝/微信支付 (接入支付)"],
    keySteps: [
      "在社区或社媒中寻找极其细分的真实痛点（如：留学生写论文改格式、电商卖家快速抠图换背景）",
      "使用 Cursor 和 v0 快速搭建出可交互的前端网页并部署，时间控制在 1-2 周内",
      "接入 Gemini/Claude 接口实现核心功能，加入简易的第三方登录与支付",
      "在 Product Hunt、即刻、小红书、V2EX 零成本推广发布，根据早期用户的反馈快速迭代"
    ],
    marketingTips: [
      "产品越垂越好，避开跟科技巨头的正面竞争，解决大厂看不上的‘小麻烦’",
      "提供‘每日 3 次免费试用’降低用户的体验门槛，体验满意后自然会进行订阅升级",
      "做 SEO (搜索引擎优化)，让搜索对应需求（如‘免费PDF转思维导图AI’）的流量精准到达你的产品"
    ]
  }
];

export const TIPS_AND_STRATEGY = [
  {
    title: "避开红海：寻找‘信息差’和‘效率差’",
    desc: "AI 时代，信息差和效率差是最大的财富来源。普通人无法感知 AI 的强大，或不知道怎么写提示词，这就产生了‘信息差’。你能用 AI 1分钟完成别人1小时的工作，这就是‘效率差’。赚钱的核心在于：找到还不知道这些的人，卖效率或结果给他们。"
  },
  {
    title: "工具思维 vs 问题思维",
    desc: "不要逢人就推销‘这是一个 AI 工具’。客户不在乎你用的是 ChatGPT 还是人工，他们只在乎‘我的问题有没有被解决’。将你的 AI 产品或服务包装成‘解决方案’，比如‘24小时全自动客服解决方案’，而不是‘一个接入了大模型的聊天窗口’。"
  },
  {
    title: "拥抱低边际成本",
    desc: "AI 的最大优势是边际成本几乎为零。你可以生成 10,000 张壁纸、撰写 1,000 篇文案，而成本相差无几。尽量设计那些‘一次性制作，无限次售卖’的产品或服务（如电子书、模版、提示词库、SaaS小工具），让 AI 为你构建被动收入管道。"
  }
];
