export default async function handler(req,res){
    try{
        const {start, description} = req.body;
        if(!start || !description) return res.status(400).json({error:"缺少 start 或 description"});

        const PAGE_ID = "265aa782851d80e8a6d5dde28fb9615d";
        const NOTION_TOKEN = process.env.NOTION_TOKEN;

        const body = {
            properties:{
                "Task": { rich_text:[{text:{content:description}}] },
                "Start Date": { date:{start:start} }
            }
        };

        const r = await fetch(`https://api.notion.com/v1/pages/${PAGE_ID}`,{
            method:"PATCH",
            headers:{
                "Authorization": `Bearer ${NOTION_TOKEN}`,
                "Notion-Version":"2022-06-28",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        });

        if(!r.ok){
            const text = await r.text();
            throw new Error(text);
        }
        return res.status(200).json({ok:true});

    }catch(err){
        console.error(err);
        return res.status(500).json({error:err.message});
    }
}
