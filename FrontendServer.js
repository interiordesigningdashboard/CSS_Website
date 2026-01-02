import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const app = express();
const PORT = process.env.FRONTEND_PORT || 5173;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to Nuxt SSG output
const publicDir = path.join(__dirname, ".output", "public");

// Serve static files
app.use("/CSS_Website", express.static(publicDir));

// ✅ Express 5 fallback — MUST point to REAL index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Nuxt SSG running at http://localhost:${PORT}/CSS_Website`);
});
