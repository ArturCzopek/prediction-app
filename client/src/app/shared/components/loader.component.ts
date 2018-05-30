import {Component} from '@angular/core';


@Component({
  selector: 'sc-loader',
  styles: [`
    .ui.active.loader {
      margin-top: 100px;
    }
  `],
  template: `
    <div class="ui active big text centered inline loader">Loading...</div>
  `
})
export class LoaderComponent {

}
