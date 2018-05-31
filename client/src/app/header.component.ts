import {Component} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";


@Component({
  selector: 'sc-header',
  styles: [`
    a.item.title {
      padding: 10px 0;
      font-size: 20px;
    }

    a.item.title:before {
      width: 0 !important;
    }

    a.item.title:hover {
      background-color: transparent !important;
      color: #ffffff !important;
    }
  `],
  template: `
    <div class="ui inverted green fixed menu">
      <div class="ui container">
        <div class="menu">
          <a class="item title" [routerLink]="['/']">PREDICTION APP 1x2</a>
        </div>
        <div class="right menu">
          <a class="item" [routerLink]="['/home']" routerLinkActive="active">Home</a>
          <a class="item" [routerLink]="['/results']" routerLinkActive="active">Results</a>
          <a class="item" (click)="logOut()" routerLinkActive="active">Logout</a>
        </div>
      </div>
    </div>
  `
})
export class HeaderComponent {

  constructor(private authService: AuthService) {}

  public logOut() {
    this.authService.logOut();
  }
}
