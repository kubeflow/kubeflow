import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  readonly prefix = this.getPrefix();
  private window: Window;

  constructor(@Inject(DOCUMENT) document: Document) {
    this.window = document.defaultView || window;
  }

  private getPrefix() {
    return '/centraldashboard/';
  }

  set(name: string, data: any): void {
    const key = this.getPrefixedKey(name);
    if (typeof data === 'undefined') {
      data = '';
    }
    const stringifyData = JSON.stringify(data);
    this.window.localStorage.setItem(key, stringifyData);
  }

  get(name: string): any {
    const key = this.getPrefixedKey(name);
    const data = this.window.localStorage.getItem(key);
    try {
      return JSON.parse(data as any);
    } catch (e) {
      this.window.localStorage.clear();
      console.error(e);
    }
  }

  remove(name: string): void {
    const key = this.getPrefixedKey(name);
    this.window.localStorage.removeItem(key);
  }

  private getPrefixedKey(name: string): string {
    return this.prefix + name;
  }
}
