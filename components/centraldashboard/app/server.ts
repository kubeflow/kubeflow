import express from "express";
import { resolve } from "path";
import process from "process";

const app: express.Application = express();
const {PORT, PORT_1} = process.env;
const port: number = Number(PORT) || Number(PORT_1) || 8082;
const frontEnd: string = resolve(__dirname, "public");

interface Activity {
    time: Date;
    event: string;
    isError: boolean;
    source: string;
}
const actvities = _generateActivities();
function _generateActivities(): Activity[] {
    const activities: Activity[] = [];
    const systems: string[] = [
        "serving-system",
        "gpu-system",
        "training-system"
    ];
    const now = Date.now();
    for (let i = 0; i < 100; i++) {
        activities.push({
            time: new Date(now - (Math.random() * 86400000)),
            event: `Event #${i}`,
            isError: Math.random() * 10 <= 1, // 1/10 probability
            source: systems[Math.floor(Math.random() * 3)]
        });
    }
    return activities.sort((a, b) => b.time.getTime() - a.time.getTime());
}

app.use(express.json());
app.use(express.static(frontEnd));

app.get("/api", (req: express.Request, res: express.Response) => {
    console.info(`Request ${req.url} received`);
    res.send("Hello World");
});
app.get("/api/activities", (req: express.Request, res: express.Response) => {
    res.send(actvities);
});
app.get("/*", (req: express.Request, res: express.Response) => {
    res.sendFile(resolve(frontEnd, "index.html"));
});

app.listen(port,
    () => console.info(`Server listening on port http://localhost:${port}`));
