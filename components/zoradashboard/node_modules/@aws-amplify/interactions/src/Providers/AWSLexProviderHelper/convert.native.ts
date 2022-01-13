export const convert = (stream: Blob): Promise<Uint8Array> => {
	return new Promise(async (res, rej) => {
		const blobURL = URL.createObjectURL(stream);
		const request = new XMLHttpRequest();
		request.responseType = 'arraybuffer';
		request.onload = _event => {
			return res(new Uint8Array(request.response));
		};
		request.onerror = rej;
		request.open('GET', blobURL, true);
		request.send();
	});
};
