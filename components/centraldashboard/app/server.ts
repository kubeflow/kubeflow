import express from "express";
import { resolve } from "path";
import process from "process";

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 8080;
const frontEnd: string = resolve(__dirname, "public");

app.use(express.static(frontEnd));

app.get("/api", (req: express.Request, res: express.Response) => {
    console.info(`Request ${req.url} received`);
    res.send("Hello World");
});

app.listen(port,
    () => console.info(`Server listening on port http://localhost:${port}`));