let savedEntry = {}; // 簡單暫存資料（記憶體）
// 若部署 Vercel，重啟後會清空；可改寫成寫檔或 DB
export default async function handler(req, res) {
    if (req.method === "POST") {
        savedEntry = req.body;
        return res.status(200).json({ success: true });
    } else {
        return res.status(200).json(savedEntry || {});
    }
}
