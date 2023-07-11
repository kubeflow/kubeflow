import { Component, Input, TrackByFunction } from '@angular/core';
import { UrlItem } from './types';

@Component({
  selector: 'lib-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.scss'],
})
export class UrlsComponent {
  @Input() urlList: UrlItem[];

  urlTrackByFn: TrackByFunction<UrlItem> = (id: number, url: UrlItem) =>
    url.name;

  constructor() {}
}
