import {Component} from '@angular/core';


@Component({
  selector: 'sc-root',
  template: `
    <sc-header></sc-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
