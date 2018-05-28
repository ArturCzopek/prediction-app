import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'sc-root',
  template: `
    <sc-header></sc-header>
    <router-outlet></router-outlet>
`
})
export class AppComponent {
}
