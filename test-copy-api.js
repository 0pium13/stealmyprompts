// Test the copy API endpoint directly
async function testCopyAPI() {
    const promptId = 'cmib9l8yp000512a9j3kcepn9'; // Use the prompt from debug

    console.log('=== TESTING COPY API ===\n');
    console.log('Prompt ID:', promptId);
    console.log('API URL:', `http://localhost:3000/api/prompts/${promptId}/copy`);

    try {
        const response = await fetch(`http://localhost:3000/api/prompts/${promptId}/copy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('\nResponse status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        const text = await response.text();
        console.log('\nResponse body (raw):', text);

        try {
            const json = JSON.parse(text);
            console.log('Response body (JSON):', json);
        } catch {
            console.log('Response is not JSON');
        }

        if (response.ok) {
            console.log('\n✅ API call successful!');
        } else {
            console.log('\n❌ API call failed!');
        }

    } catch (error) {
        console.error('\n❌ Fetch error:', error);
    }
}

testCopyAPI();
