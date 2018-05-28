import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {tap} from "rxjs/operators";
import {environment} from "../environments/environment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

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
