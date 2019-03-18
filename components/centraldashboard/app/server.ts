import {KubeConfig} from '@kubernetes/client-node';
import express from 'express';
import {resolve} from 'path';

import {api} from './api';

const {PORT_1} = process.env;  // PORT_1 was defined in an earlier version
const port: number = Number(PORT_1) || 8082;

const frontEnd: string = resolve(__dirname, 'public');
const app: express.Application = express();
const kubeConfig = new KubeConfig();

app.use(express.json());
app.use(express.static(frontEnd));
app.use('/api', api(kubeConfig));
app.get('/*', (_: express.Request, res: express.Response) => {
  res.sendFile(resolve(frontEnd, 'index.html'));
});
app.listen(
    port,
    () => console.info(`Server listening on port http://localhost:${port}`));
