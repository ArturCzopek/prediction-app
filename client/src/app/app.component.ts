import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {tap} from "rxjs/operators";
import {environment} from "../environments/environment";


@Component({
  selector: 'sc-root',
  template: `
    <sc-header></sc-header>
    <button (click)="testMatchesForUserWithIdOne()">TEST!!!</button>
    <router-outlet></router-outlet>
`
})
export class AppComponent {

  constructor(private http: HttpClient) {

  }

  testMatchesForUserWithIdOne() {
    this.http.get(environment.matchesUrl)
      .pipe(
        tap(match => console.log(`match ${match}`))
      )
      .subscribe(res => console.log(`res ${res}`))
  }
}
