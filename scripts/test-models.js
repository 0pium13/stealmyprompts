const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env' });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // For v1beta, we can't easily list models via the SDK helper in older versions, 
        // but let's try a simple generation with 'gemini-pro' to see if it works,
        // or use the model listing if available. 
        // Actually, the SDK doesn't have a direct listModels method exposed in the main class in all versions.
        // Let's try to generate with a few common names and see which one succeeds.

        const models = [
            'gemini-1.5-flash',
            'gemini-1.5-flash-001',
            'gemini-1.5-flash-latest',
            'gemini-1.5-pro',
            'gemini-pro',
        ];

        console.log("Testing models...");

        for (const modelName of models) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                console.log(`✅ ${modelName} is AVAILABLE`);
            } catch (error) {
                console.log(`❌ ${modelName} failed: ${error.message.split('\n')[0]}`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
