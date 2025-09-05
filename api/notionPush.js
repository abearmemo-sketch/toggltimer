import fetch from "node-fetch";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { start, description } = req.body;
    const DATABASE_ID = "265aa782851d80e8a6d5dde28fb9615d";
    const NOTION_TOKEN = process.env.NOTION_TOKEN;

    try {
        const notionDate = new Date(start.replace(' ', 'T')).toISOString();
        const response = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${NOTION_TOKEN}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                parent: { database_id: DATABASE_ID },
                properties: {
                    "Task": { title: [{ text: { content: description } }] },
                    "Start Date": { date: { start: notionDate } }
                }
            })
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Notion API error:", text);
            return res.status(500).json({ error: text });
        }

        return res.status(200).json({ success: true });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
