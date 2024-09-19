const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('frontend'));

app.get('/api/fetch-notion-data', async (req, res) => {
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionPageId = process.env.NOTION_PAGE_ID;

    try {
        const response = await fetch(`https://api.notion.com/v1/pages/${notionPageId}`, {
            headers: {
                'Authorization': `Bearer ${notionApiKey}`,
                'Notion-Version': '2021-05-13'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});