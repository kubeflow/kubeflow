/*!
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Christian Speckner <cnspeckn@googlemail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

interface MutexInterface {
	acquire(): Promise<MutexInterface.Releaser>;

	runExclusive<T>(callback: MutexInterface.Worker<T>): Promise<T>;

	isLocked(): boolean;
}

namespace MutexInterface {
	export interface Releaser {
		(): void;
	}

	export interface Worker<T> {
		(): Promise<T> | T;
	}
}

class Mutex implements MutexInterface {
	isLocked(): boolean {
		return this._pending;
	}

	acquire(): Promise<MutexInterface.Releaser> {
		const ticket = new Promise<MutexInterface.Releaser>(resolve =>
			this._queue.push(resolve)
		);

		if (!this._pending) {
			this._dispatchNext();
		}

		return ticket;
	}

	runExclusive<T>(callback: MutexInterface.Worker<T>): Promise<T> {
		return this.acquire().then(release => {
			let result: T | Promise<T>;

			try {
				result = callback();
			} catch (e) {
				release();
				throw e;
			}

			return Promise.resolve(result).then(
				(x: T) => (release(), x),
				e => {
					release();
					throw e;
				}
			);
		});
	}

	private _dispatchNext(): void {
		if (this._queue.length > 0) {
			this._pending = true;
			this._queue.shift()!(this._dispatchNext.bind(this));
		} else {
			this._pending = false;
		}
	}

	private _queue: Array<(release: MutexInterface.Releaser) => void> = [];
	private _pending = false;
}

export default Mutex;
