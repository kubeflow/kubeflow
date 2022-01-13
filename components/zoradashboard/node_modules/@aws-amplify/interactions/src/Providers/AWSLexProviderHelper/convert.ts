import { Readable } from 'stream';
export const convert = (
	stream: Blob | Readable | ReadableStream
): Promise<Uint8Array> => {
	if (stream instanceof Blob || stream instanceof ReadableStream) {
		return new Response(stream)
			.arrayBuffer()
			.then(buffer => new Uint8Array(buffer));
	} else {
		throw new Error('Readable is not supported.');
	}
};
