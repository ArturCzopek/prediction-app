import {Component} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";


@Component({
  selector: 'sc-admin-panel',

  styles: [`
    .ui.container {
      padding-top: 80px;
    }

    .admin-panel-card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      margin-bottom: 20px;
      padding: 5px 0 5px 5px;
    }

    .admin-panel-card:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

  `],

  template: `
    <div class="ui container" *ngIf="authService.isLoggedInAsAdmin()">
      <a [routerLink]="['/admin/users']" routerLinkActive="active">
        <div class="admin-panel-card">
          <h3>Users management panel</h3>
        </div>
      </a>

      <a [routerLink]="['/admin/users']" routerLinkActive="active">
        <div class="admin-panel-card">
          <h3>Matches management panel</h3>
        </div>
      </a>
    </div>
  `
})
export class AdminPanelComponent {
  constructor(public authService: AuthService) {
  }
}
