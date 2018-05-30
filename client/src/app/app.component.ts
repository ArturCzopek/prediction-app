import {Component} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";


@Component({
  selector: 'sc-root',
  template: `
    <sc-header></sc-header>
    <router-outlet></router-outlet>
    <sc-modal-add-match *ngIf="authService.isLoggedInAsAdmin()"></sc-modal-add-match>
    <sc-modal-add-result></sc-modal-add-result>
    <sc-modal-add-type></sc-modal-add-type>
  `
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
