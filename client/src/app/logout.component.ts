import {Component} from '@angular/core';


@Component({
  selector: 'sc-logout',
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
      <h1>You have been logged out!</h1>
      <h3><a [routerLink]="['/']">But you can come back of course ;) </a></h3>
    </div>
  `
})
export class LogoutComponent {

}
