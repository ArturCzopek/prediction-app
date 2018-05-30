import {Component} from '@angular/core';


@Component({
  selector: 'sc-error-message',
  template: `
    <div class="ui negative message">
      <div class="header">
       Error!
      </div>
      <p>Cannot load data. Try again later or contact with administrator</p></div>
  `
})
export class ErrorMessageComponent {

}
