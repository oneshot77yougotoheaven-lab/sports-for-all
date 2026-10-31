import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI if key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({ apiKey });
}

// System instruction for the Arena Hub AI Assistant
const SYSTEM_INSTRUCTION = `You are the official AI Sports & Esports Specialist for ARENA HUB.
Your purpose:
1. Explain official sports rules (Cricket, Football, Basketball, Volleyball, Badminton, Athletics, Tennis, etc.) and esports rules (Free Fire MAX, BGMI, Valorant, CS2, Rocket League, etc.).
2. Explain tournament formats: Single/Double elimination, Swiss system, Round Robin, Battle Royale point matrix (placement + kill points), tiebreak protocols.
3. Help users learn game mechanics, tactical rotations, economy systems, and sportsmanship.
4. Recommend suitable learning paths and practice drills.
5. Provide support in English and Tamil (தமிழ்). When answering in Tamil, use natural, accurate Tamil sports terms alongside recognized English terms in brackets where helpful.

CRITICAL INTEGRITY GUIDELINES:
- Always clearly distinguish between OFFICIAL GOVERNING BODY RULES (e.g. MCC, IFAB, FIBA, BWF, Krafton, Riot Games, Garena) and GENERAL TACTICAL ADVICE.
- NEVER invent fictitious live tournament dates, fake prize money, or unofficial registration links.
- When explaining rules, mention the governing body or official esports rulebook version where relevant.
- Keep answers well-structured, using bullet points, bold highlights, and readable formatting.`;

// Pre-defined knowledge base fallback when API key is missing or offline
const KNOWLEDGE_FALLBACKS: Record<string, { en: string; ta: string }> = {
  valorant_economy: {
    en: "### Valorant Economy System (Official Riot Games VCT Rules)\n- **Starting Creds:** 800 Creds in Pistol Round.\n- **Round Win:** +3,000 Creds.\n- **Round Loss:** +1,900 Creds (1st loss), +2,400 Creds (2nd loss streak), +2,900 Creds (3+ loss streak max).\n- **Spike Plant Bonus:** +300 Creds to each attacking team member.\n- **Kill Reward:** +200 Creds per kill.\n- **Full Buy Threshold:** ~3,900 - 4,500 Creds (Vandal/Phantom + Heavy Shields + Full Utility).",
    ta: "### வாலோரண்ட் எகனாமி விதிகள் (Riot Games VCT)\n- **துவக்க கிரெடிட்ஸ்:** 800 Creds (பிஸ்டல் சுற்று).\n- **சுற்று வெற்றி:** +3,000 Creds.\n- **சுற்று தோல்வி:** +1,900 (1வது), +2,400 (2வது தொடர் தோல்வி), +2,900 (3+ தொடர் தோல்வி).\n- **ஸ்பைக் பிளான்ட் போனஸ்:** தாக்குதல் அணியில் உள்ள ஒவ்வொருவருக்கும் +300 Creds.\n- **கில் ரிவார்ட்:** ஒவ்வொரு எதிரியைக் கொல்லும்போதும் +200 Creds.\n- **முழு கொள்முதல் (Full Buy):** சுமார் 3,900 - 4,500 Creds."
  },
  cricket_dls: {
    en: "### Duckworth-Lewis-Stern (DLS) Method in Cricket (MCC / ICC)\n- **Concept:** In rain-interrupted limited overs matches, teams lose two vital resources: *Overs remaining* and *Wickets in hand*.\n- **Target Calculation:** The revised target is calculated by equating the percentage of total resources available to both sides.\n- **Official Reference:** ICC Standard ODI/T20 Playing Conditions Clause 16. DLS calculations are handled by the official ICC DLS software.",
    ta: "### கிரிக்கெட்டில் டக்வொர்த்-லூயிஸ்-ஸ்டெர்ன் (DLS) முறை (ICC)\n- **கருத்து:** மழை காரணமாக தடைபடும் போட்டிகளில், அணிகள் இரண்டு முக்கிய வளங்களை இழக்கின்றன: *மீதமுள்ள ஓவர்கள்* மற்றும் *கைவசம் உள்ள விக்கெட்டுகள்*.\n- **இலக்கு கணக்கீடு:** இரு அணிகளுக்கும் கிடைக்கக்கூடிய வளங்களின் சதவீதத்தை சமன் செய்து புதிய இலக்கு நிர்ணயிக்கப்படுகிறது.\n- **அதிகாரப்பூர்வ குறிப்பு:** ICC சர்வதேச ஒருநாள் மற்றும் T20 விதிமுறைகளின் கீழ் இது நிர்வகிக்கப்படுகிறது."
  },
  freefire_points: {
    en: "### Free Fire MAX Esports Official Point Matrix (Garena FFWS)\n- **1st Place (Booyah!):** 12 Points\n- **2nd Place:** 9 Points\n- **3rd Place:** 8 Points\n- **4th Place:** 7 Points\n- **5th Place:** 6 Points\n- **6th Place:** 5 Points\n- **7th Place:** 4 Points\n- **8th Place:** 3 Points\n- **9th Place:** 2 Points\n- **10th Place:** 1 Point\n- **11th - 12th Place:** 0 Points\n- **Elimination (Kill) Point:** 1 Point per kill\n- **Tie-breaker:** Total Booyahs > Placement Points > Total Kills > Latest Match placement.",
    ta: "### ஃப்ரீ பயர் மேக்ஸ் (Free Fire MAX) புள்ளி முறை (Garena FFWS)\n- **1வது இடம் (Booyah!):** 12 புள்ளிகள்\n- **2வது இடம்:** 9 புள்ளிகள்\n- **3வது இடம்:** 8 புள்ளிகள்\n- **4வது இடம்:** 7 புள்ளிகள்\n- **5வது இடம்:** 6 புள்ளிகள்\n- **6வது இடம்:** 5 புள்ளிகள்\n- **7வது இடம்:** 4 புள்ளிகள்\n- **8வது இடம்:** 3 புள்ளிகள்\n- **9வது இடம்:** 2 புள்ளிகள்\n- **10வது இடம்:** 1 புள்ளி\n- **11 - 12வது இடம்:** 0 புள்ளி\n- **ஒவ்வொரு கில் (Kill) புள்ளி:** 1 புள்ளி\n- **டை பிரேக்கர்:** அதிக பூயாக்கள் > பிளேஸ்மென்ட் புள்ளிகள் > மொத்த கில்கள்."
  },
  football_offside: {
    en: "### Law 11 - Offside in Football (IFAB Laws of the Game)\n- **Offside Position:** A player is in an offside position if any part of the head, body, or feet is in the opponents' half AND nearer to the opponents' goal line than both the ball and the second-last opponent.\n- **Offside Offence:** It is only penalised if at the moment the ball is played, the player becomes actively involved in play (interfering with play, opponent, or gaining an advantage).\n- **Exceptions:** No offside offence directly from a Goal Kick, Throw-in, or Corner Kick.",
    ta: "### கால்பந்து ஆஃப்சைடு விதி (IFAB Law 11)\n- **ஆஃப்சைடு நிலை:** பந்தை பாஸ் செய்யும் தருணத்தில், ஒரு வீரர் எதிரணியின் பாதியில் பந்தையும் இரண்டாவது கடைசி எதிராளியையும் விட கோல் கோட்டிற்கு அருகில் இருந்தால் அவர் ஆஃப்சைடில் உள்ளார்.\n- **தண்டனை:** ஆட்டக்காரர் பந்தை விளையாட முற்பட்டாலோ அல்லது எதிராளியை தடுத்தாலோ மட்டுமே தவறு என விசில் அடிக்கப்படும்.\n- **விதிவிலக்குகள்:** கோல் கிக், த்ரோ-இன் (Throw-in), மற்றும் கார்னர் கிக் ஆகியவற்றில் நேரடியாக பந்து வரும்போது ஆஃப்சைடு கிடையாது."
  }
};

// AI Assistant endpoint
app.post('/api/assistant', async (req: Request, res: Response) => {
  try {
    const { message, language = 'en', category = 'general' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const lowerMsg = message.toLowerCase();

    // Check if we have an instant verified fallback match
    let fallbackKey: string | null = null;
    if (lowerMsg.includes('valorant') && (lowerMsg.includes('econ') || lowerMsg.includes('creds') || lowerMsg.includes('buy'))) {
      fallbackKey = 'valorant_economy';
    } else if (lowerMsg.includes('dls') || (lowerMsg.includes('duckworth') && lowerMsg.includes('cricket')) || (lowerMsg.includes('rain') && lowerMsg.includes('cricket'))) {
      fallbackKey = 'cricket_dls';
    } else if ((lowerMsg.includes('free fire') || lowerMsg.includes('ffws') || lowerMsg.includes('freefire')) && (lowerMsg.includes('point') || lowerMsg.includes('score') || lowerMsg.includes('booyah'))) {
      fallbackKey = 'freefire_points';
    } else if (lowerMsg.includes('offside') || (lowerMsg.includes('law 11') && lowerMsg.includes('football'))) {
      fallbackKey = 'football_offside';
    }

    // If Gemini client is active, call gemini-3.8-flash
    if (aiClient) {
      try {
        const langPrompt = language === 'ta'
          ? 'Respond entirely in Tamil (தமிழ்) with accurate sports/esports terms.'
          : 'Respond in clear English with well-formatted markdown.';

        const fullPrompt = `User question: "${message}"\nSelected topic category: ${category}\nTarget response language: ${language}\n\nInstructions: ${langPrompt}\nProvide accurate, verified rules and helpful sports/esports advice. Do not invent tournament dates or prize amounts. Distinguish official rules with clear headers.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: fullPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.3,
          },
        });

        const replyText = response.text || '';
        res.json({
          reply: replyText,
          language,
          isAiGenerated: true,
          model: 'gemini-3.8-flash',
        });
        return;
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to local expert rules database:', geminiError?.message || geminiError);
      }
    }

    // Fallback if no Gemini client or if API request fails
    if (fallbackKey && KNOWLEDGE_FALLBACKS[fallbackKey]) {
      const resp = language === 'ta' ? KNOWLEDGE_FALLBACKS[fallbackKey].ta : KNOWLEDGE_FALLBACKS[fallbackKey].en;
      res.json({
        reply: resp,
        language,
        isAiGenerated: false,
        source: 'Arena Hub Verified Rules Knowledge Base',
      });
      return;
    }

    // Default polite helpful response if key is generic
    const defaultEn = `### Arena Hub Sports Specialist\n\nThank you for asking about **"${message.trim()}"**.\n\n**Official Rules Reference:**\n- For esports (Free Fire MAX, BGMI, Valorant), rules are governed by Garena, Krafton, and Riot Games official competitive guidelines.\n- For traditional sports (Cricket, Football, Basketball, Badminton), refer to the respective MCC/ICC, IFAB, FIBA, and BWF rulebooks.\n\n*Tip:* You can also browse the dedicated **Sports Rules Library** in Arena Hub for full section-by-section official guides and player positions!`;
    const defaultTa = `### அரீனா ஹப் விளையாட்டு ஆலோசகர் (Arena Hub Sports Assistant)\n\nஉங்கள் கேள்வி: **"${message.trim()}"**\n\n**அதிகாரப்பூர்வ விதிமுறைகள்:**\n- ஈஸ்போர்ட்ஸ் விளையாட்டுகளுக்கு (Free Fire MAX, BGMI, Valorant) கிராஃப்டன், ரியட் கேம்ஸ் மற்றும் கரேனாவின் விதிமுறைகள் பொருந்தும்.\n- பாரம்பரிய விளையாட்டுகளுக்கு (கிரிக்கெட், கால்பந்து, கூடைப்பந்து, இறகுப்பந்து) ICC, IFAB, FIBA மற்றும் BWF சர்வதேச விதிகளே அடிப்படையாகும்.\n\n*குறிப்பு:* எங்கள் **விதிகள் நூலகம் (Rules Library)** பகுதியில் அனைத்து விளையாட்டு விதிகளையும் விரிவாக வாசிக்கலாம்!`;

    res.json({
      reply: language === 'ta' ? defaultTa : defaultEn,
      language,
      isAiGenerated: false,
      source: 'Arena Hub Rule Engine',
    });
  } catch (err: any) {
    console.error('Error handling assistant request:', err);
    res.status(500).json({ error: 'Internal server error processing sports query' });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Setup Vite in Dev or serve static in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Arena Hub server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
