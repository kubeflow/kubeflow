import express from 'express';
import process from 'process';

import {KubernetesService} from './k8s_service';
import {routes} from './routes';

const {PORT_1} = process.env; // PORT_1 was defined in an earlier version
const port: number = Number(PORT_1) || 8082;
const app: express.Application = express();
const k8sService = new KubernetesService();

app.use(routes(k8sService));
app.listen(
    port,
    () => console.info(`Server listening on port http://localhost:${port}`));
