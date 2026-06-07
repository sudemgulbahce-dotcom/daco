
import { GoogleGenAI, Modality, Type, FunctionDeclaration } from "@google/genai";

// Komut Araçları - AI'nın neyi sileceğini anlaması için açıklamalar detaylandırıldı
const addSectionTool: FunctionDeclaration = {
  name: 'add_custom_section',
  parameters: {
    type: Type.OBJECT,
    description: 'Sisteme yeni bir alan veya düğme ekler.',
    properties: {
      name: { type: Type.STRING, description: 'Bölümün başlığı' },
      icon: { type: Type.STRING, description: 'Bölümün emojisi' },
      description: { type: Type.STRING, description: 'Kısa açıklama' },
      content: { type: Type.STRING, description: 'Detaylı metin içeriği' }
    },
    required: ['name', 'icon', 'description', 'content']
  }
};

const removeSectionTool: FunctionDeclaration = {
  name: 'remove_section',
  parameters: {
    type: Type.OBJECT,
    description: 'Bir bölümü gizler. (Akademi=video_store, Market=problems, Stil/Kıyafet=avatar_store, Arena=arena, Müzik=music, Arşiv=resources, Görevler=planner, Veriler=stats, Lab=code)',
    properties: {
      sectionId: { 
        type: Type.STRING, 
        enum: ['stats', 'arena', 'problems', 'code', 'planner', 'resources', 'music', 'chat', 'avatar_store', 'video_store'],
        description: 'Silinecek bölümün teknik kimliği.'
      }
    },
    required: ['sectionId']
  }
};

const restoreSectionTool: FunctionDeclaration = {
  name: 'restore_section',
  parameters: {
    type: Type.OBJECT,
    description: 'Silinmiş bir bölümü geri getirir.',
    properties: {
      sectionId: { type: Type.STRING, enum: ['stats', 'arena', 'problems', 'code', 'planner', 'resources', 'music', 'chat', 'avatar_store', 'video_store'] }
    },
    required: ['sectionId']
  }
};

const triggerEffectTool: FunctionDeclaration = {
  name: 'trigger_visual_effect',
  parameters: {
    type: Type.OBJECT,
    description: 'Görsel efekt başlatır.',
    properties: {
      effect: { type: Type.STRING, enum: ['hacker', 'gold', 'glitch', 'rainbow', 'tsunami', 'none'] }
    },
    required: ['effect']
  }
};

const updatePointsTool: FunctionDeclaration = {
  name: 'update_user_points',
  parameters: {
    type: Type.OBJECT,
    description: 'Puan ekler veya çıkarır.',
    properties: {
      amount: { type: Type.NUMBER }
    },
    required: ['amount']
  }
};

const getSystemInstruction = (isAdmin: boolean) => {
  const base = `Sen DacoLearn AI asistanısın. Kurucu: Muhammed Mirza Gülbahçe.`;
  if (isAdmin) {
    return `${base} SİSTEM YÖNETİCİSİ MODU: AKTİF.
            KESİN KURAL: Kullanıcı "sil", "kaldır", "getir", "ekle", "puan ver" gibi emirler verdiğinde ASLA normal metinle geçiştirme. MUTLAKA ilgili fonksiyonu (Tool Call) çağır.
            - "Akademi" denirse 'video_store'
            - "Market" denirse 'problems'
            - "Kıyafet/Stil/Avatar" denirse 'avatar_store'
            - "Müzik/Odak" denirse 'music'
            bölümlerini hedefle. İşlem bitince mutlaka "Emriniz yerine getirildi efendim." de.`;
  }
  return `${base} Yardımsever bir eğitim asistanı ol.`;
};

export class GeminiService {
  async chat(message: string, history: any[], isAdmin: boolean = false) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    const modelName = isAdmin ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    
    const tools = [{ 
      functionDeclarations: [
        addSectionTool, removeSectionTool, restoreSectionTool, 
        triggerEffectTool, updatePointsTool
      ] 
    }];

    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [...history, { role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: getSystemInstruction(isAdmin),
          tools: tools,
          temperature: 0.7
        }
      });

      return {
        text: response.text || "Komutunuz işlendi efendim.",
        functionCalls: response.functionCalls || [],
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    } catch (error) {
      console.error("AI Error:", error);
      return { text: "⚠️ Sistem yoğunluğu nedeniyle işlem başarısız.", functionCalls: [] };
    }
  }

  async generateSpeech(text: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text.substring(0, 300) }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } } },
        },
      });
      return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    } catch { return null; }
  }
}

export const geminiService = new GeminiService();
