import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || "MOCK_KEY_FOR_BUILD",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API endpoint to generate tailored AI Monetization Business Plans
app.post("/api/generate-plan", async (req, res) => {
  if (!apiKey) {
    return res.status(500).json({
      error: "Gemini API Key is not configured in the workspace secrets. Please add GEMINI_API_KEY in Settings > Secrets.",
    });
  }

  const { pathway, experience, capital, timeCommitment, skills, language = "zh" } = req.body;

  if (!pathway) {
    return res.status(400).json({ error: "Pathway is required" });
  }

  const systemInstruction = `
    You are an elite business consultant, entrepreneur, and AI automation agency expert.
    Your task is to generate a comprehensive, highly customized, and realistic business plan for a user wishing to monetize using AI.
    The response MUST be in ${language === "zh" ? "Chinese (Simplified)" : "English"}.
    Be highly concrete, realistic, and practical. Avoid generic marketing jargon. Outline EXACT steps they should take this week.
    Ensure pricing, timelines, tools, and marketing recommendations are deeply specific to the selected pathway and user constraint profile.
  `;

  const userPrompt = `
    Generate an AI monetization business blueprint with the following user profile:
    - Pathway / Direction: ${pathway}
    - Prior Experience: ${experience}
    - Start-up Capital: ${capital}
    - Time Commitment: ${timeCommitment}
    - Key Personal Skills: ${skills || "None specified"}
    
    Please structure the roadmap logically, estimating realistic numbers. Make the prompts incredibly powerful and ready to use.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A summary of the custom business plan, outlining why this fits the user's skills and constraints."
            },
            potentialMonthlyIncome: {
              type: Type.STRING,
              description: "Estimated realistic monthly income potential (e.g., 5,000 - 15,000 RMB / mo) after 3 months."
            },
            difficultyScore: {
              type: Type.INTEGER,
              description: "Difficulty score from 1 (easiest) to 10 (hardest)."
            },
            steps: {
              type: Type.ARRAY,
              description: "Detailed step-by-step launch roadmap.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Step title" },
                  description: { type: Type.STRING, description: "What to do" },
                  timeframe: { type: Type.STRING, description: "e.g., 'Day 1-3', 'Week 1-2'" },
                  keyActionItem: { type: Type.STRING, description: "The single most critical action to complete this step" }
                },
                required: ["title", "description", "timeframe", "keyActionItem"]
              }
            },
            monetizationModel: {
              type: Type.ARRAY,
              description: "Revenue channels for this business.",
              items: {
                type: Type.OBJECT,
                properties: {
                  channel: { type: Type.STRING, description: "e.g., Service Retainers, Ad Sponsorships, Subscription" },
                  estimatedEarning: { type: Type.STRING, description: "Expected income tier per unit or month" },
                  description: { type: Type.STRING, description: "Explanation of how they sell and charge" }
                },
                required: ["channel", "estimatedEarning", "description"]
              }
            },
            tools: {
              type: Type.ARRAY,
              description: "AI tools and utility software needed.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Tool name (e.g., Midjourney, Kimi, Cursor)" },
                  cost: { type: Type.STRING, description: "Cost level, e.g., Free, $20/mo" },
                  purpose: { type: Type.STRING, description: "What this tool is used for in this plan" }
                },
                required: ["name", "cost", "purpose"]
              }
            },
            marketingStrategy: {
              type: Type.ARRAY,
              description: "Client acquisition tactics.",
              items: { type: Type.STRING }
            },
            examplePrompts: {
              type: Type.ARRAY,
              description: "Copy-pasteable AI prompt templates custom designed to start this business right away.",
              items: {
                type: Type.OBJECT,
                properties: {
                  targetTool: { type: Type.STRING, description: "Target AI model (e.g., Midjourney, ChatGPT, Gemini)" },
                  title: { type: Type.STRING, description: "Prompt purpose" },
                  promptText: { type: Type.STRING, description: "The complete copy-pasteable prompt" }
                },
                required: ["targetTool", "title", "promptText"]
              }
            },
            risksAndMitigations: {
              type: Type.ARRAY,
              description: "Key potential risks and strategic mitigations.",
              items: {
                type: Type.OBJECT,
                properties: {
                  risk: { type: Type.STRING },
                  mitigation: { type: Type.STRING }
                },
                required: ["risk", "mitigation"]
              }
            }
          },
          required: [
            "summary",
            "potentialMonthlyIncome",
            "difficultyScore",
            "steps",
            "monetizationModel",
            "tools",
            "marketingStrategy",
            "examplePrompts",
            "risksAndMitigations"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const parsedData = JSON.parse(text);
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini business plan generation error:", error);
    return res.status(500).json({
      error: "Failed to generate plan: " + (error.message || error),
    });
  }
});

// Setup Vite development middleware, or static files serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
