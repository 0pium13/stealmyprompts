import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function enhancePrompt(userPrompt: string): Promise<string> {
    const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL_TEXT || 'gemini-2.5-flash-lite',
        systemInstruction: `You are a cinematic director. Rewrite prompts into detailed image generation instructions. Include camera angles, lighting (chiaroscuro, volumetric), and texture. Max 40 words.`
    });

    const result = await model.generateContent(userPrompt);
    return result.response.text();
}

export async function generateGridImage(enhancedPrompt: string): Promise<Uint8Array> {
    const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL_IMAGE || 'imagen-3.0-fast-generate-001'
    });

    // Grid-Shot Protocol: 1 prompt = 3 panels
    const gridPrompt = `
    Split screen, cinematic storyboard layout, three vertical panels.
    Panel 1 (Left): Wide shot of ${enhancedPrompt}, establishing environment.
    Panel 2 (Center): Medium shot of ${enhancedPrompt}, action/dialogue focus.
    Panel 3 (Right): Extreme close-up of ${enhancedPrompt}, emotion/details.
    Style: Cinematic lighting, photorealistic, 8k, consistent character.
    --ar 3:2
  `;

    const result = await model.generateContent(gridPrompt);

    // Get image data from response
    const image = result.response.candidates?.[0]?.content?.parts?.[0];
    if (!image || !('inlineData' in image) || !image.inlineData) {
        throw new Error('No image generated');
    }

    // Return image buffer
    return Buffer.from(image.inlineData.data, 'base64');
}
