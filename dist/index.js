import express from "express";
import cors from "cors";
import { connectDb, config } from "./config/index.js";
import resultRoutes from "./routes/result.routes.js";
import runRoutes from "./routes/run.routes.js";
import testRoutes from "./routes/test.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use((_req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src *; img-src * data: blob:; frame-src *;");
    next();
});
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/runs", runRoutes);
app.use("/tests", testRoutes);
app.use("/results", resultRoutes);
connectDb().then(() => {
    app.listen(config.port, () => {
        console.log(`🧪 Results Service running on port ${config.port}`);
    });
});
