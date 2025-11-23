const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env' });

async function diagnose() {
    console.log("🔍 --- Gemini API Diagnostic ---");

    // 1. Check Env Vars
    const apiKey = process.env.GEMINI_API_KEY;
    const textModel = process.env.GEMINI_MODEL_TEXT;
    const imageModel = process.env.GEMINI_MODEL_IMAGE;

    console.log(`🔑 API Key: ${apiKey ? 'Present (' + apiKey.slice(0, 8) + '...)' : 'MISSING'}`);
    console.log(`📝 Text Model (Env): ${textModel}`);
    console.log(`🖼️ Image Model (Env): ${imageModel}`);

    if (!apiKey) {
        console.error("❌ API Key missing. Aborting.");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // 2. Test Models via SDK
    const modelsToTest = [
        textModel, // The one currently in .env
        'gemini-1.5-flash',
        'gemini-1.5-flash-latest',
        'gemini-1.5-flash-001',
        'gemini-1.5-flash-002',
        'gemini-2.5-flash-lite',
        'gemini-pro'
    ];

    console.log("\n🧪 --- Testing SDK Generation ---");
    for (const modelName of modelsToTest) {
        if (!modelName) continue;
        try {
            console.log(`Testing: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say 'Hello'");
            const response = await result.response;
            console.log(`✅ SUCCESS: ${modelName} -> "${response.text().trim()}"`);
        } catch (error) {
            console.log(`❌ FAILED: ${modelName} -> ${error.message.split('\n')[0]}`);
        }
    }

    // 3. Test Direct REST API (Bypass SDK)
    console.log("\n🌐 --- Testing Direct REST API (v1beta) ---");
    const restModel = 'gemini-1.5-flash'; // Try standard model
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${restModel}:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Say 'Hello'" }] }]
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log(`✅ REST SUCCESS (${restModel}):`, JSON.stringify(data.candidates?.[0]?.content?.parts?.[0]?.text));
        } else {
            console.log(`❌ REST FAILED (${restModel}):`, JSON.stringify(data));
        }
    } catch (error) {
        console.error("❌ REST ERROR:", error);
    }
    // 4. Test Image Generation
    console.log("\n🖼️ --- Testing Image Generation ---");
    const imageModels = [
        imageModel, // From .env
        'imagen-3.0-fast-generate-001',
        'imagen-3.0-generate-001',
        'gemini-2.5-flash-image'
    ];

    for (const modelName of imageModels) {
        if (!modelName) continue;
        try {
            console.log(`Testing Image: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("A cute robot");
            const response = await result.response;
            console.log(`✅ IMAGE SUCCESS: ${modelName} (Candidates: ${response.candidates?.length})`);
        } catch (error) {
            console.log(`❌ IMAGE FAILED: ${modelName} -> ${error.message.split('\n')[0]}`);
        }
    }
}

diagnose();
