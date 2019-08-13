import {request} from 'http';

export function sendTestRequest(
    url: string, headers?: {[header: string]: string}, expectedStatus = 200,
    method = 'get', body: {} = null): Promise<{}> {
  return new Promise((resolve) => {
    const clientRequest = request(url, {method, headers}, (res) => {
      expect(res.statusCode).toBe(expectedStatus);
      let body = '';
      res.on('data', (chunk) => body += String(chunk));
      res.on('end', () => {
        resolve(JSON.parse(body));
      });
    });
    if (body !== null) {
      clientRequest.write(JSON.stringify(body));
    }
    clientRequest.end();
  });
}
