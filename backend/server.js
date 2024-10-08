const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('frontend'));

app.get('/api/fetch-notion-data', async (req, res) => {
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionPageId = process.env.NOTION_PAGE_ID;

    console.log('Fetching data from Notion API');
    console.log('Notion API Key:', notionApiKey ? 'Present' : 'Missing');
    console.log('Notion Page ID:', notionPageId);

    try {
        const response = await fetch(`https://api.notion.com/v1/pages/${notionPageId}`, {
            headers: {
                'Authorization': `Bearer ${notionApiKey}`,
                'Notion-Version': '2021-05-13'
            }
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response from Notion API:', errorText);
            throw new Error('Network response was not ok: ' + errorText);
        }

        const data = await response.json();
        console.log('Data fetched from Notion API:', data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});