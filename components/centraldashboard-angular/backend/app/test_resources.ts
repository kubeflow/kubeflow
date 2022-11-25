import {request} from 'http';

function tryParse(a: string): {} | string {
  try {
    return JSON.parse(a);
  } catch(e) {
    console.error('Failed to parse response', a, {error: e});
    return a;
  }
}
export function sendTestRequest(
    url: string, headers?: {[header: string]: string}, expectedStatus = 200,
    method = 'get', body: {} = null): Promise<{}> {
  return new Promise((resolve) => {
    const clientRequest = request(url, {method, headers}, (res) => {
      expect(res.statusCode).toBe(expectedStatus);
      let body = '';
      res.on('data', (chunk) => body += String(chunk));
      res.on('end', () => {
        resolve(tryParse(body));
      });
    });
    if (body !== null) {
      clientRequest.write(JSON.stringify(body));
    }
    clientRequest.end();
  });
}
