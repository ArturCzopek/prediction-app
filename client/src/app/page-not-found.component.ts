import {Component} from '@angular/core';


@Component({
  selector: 'sc-not-found',
  styles: [`
    .ui.container {
      margin-top: 100px;
    }

    h1 {
      font-size: 70px;
    }
  `],
  template: `
    <div class="ui container center aligned">
      <h1>Ooops!</h1>
      <h3>This page does not exist</h3>
      <h4>:(</h4>
    </div>
  `
})
export class PageNotFoundComponent {

}
