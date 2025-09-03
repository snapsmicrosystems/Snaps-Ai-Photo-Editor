
import { GoogleGenAI, Modality } from "@google/genai";
import type { EditedImageResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash-image-preview';

function fileToGenerativePart(base64Data: string, mimeType: string) {
  return {
    inlineData: {
      data: base64Data,
      mimeType
    },
  };
}

export async function editImageWithNanoBanana(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<EditedImageResult> {
  try {
    const imagePart = fileToGenerativePart(base64ImageData, mimeType);
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let editedImageUrl: string | null = null;
    let responseText: string | null = null;
    
    if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64Bytes = part.inlineData.data;
                editedImageUrl = `data:${part.inlineData.mimeType};base64,${base64Bytes}`;
            } else if (part.text) {
                responseText = (responseText || "") + part.text;
            }
        }
    }
    
    if (!editedImageUrl) {
        throw new Error("API did not return an edited image.");
    }

    return { imageUrl: editedImageUrl, text: responseText };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to edit image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while editing the image.");
  }
}
