import {AuthService} from "../shared/services/auth.service";
import {Component, OnInit} from "@angular/core";
import {UserInfo} from "../shared/model";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'sc-users-management',
  styles: [`
    .ui.container {
      height: 100%;
      padding-top: 80px;
    }

    table {
      margin: 0 auto !important;
    }
  `],
  template: `
    <div class="ui container">
      <sc-loader *ngIf="isLoading"></sc-loader>
      <sc-error-message *ngIf="!isLoading && isError"></sc-error-message>
      <ng-container *ngIf="!isLoading && !isError && usersInfo && usersInfo.length > 0">
        <table class="ui green collapsing compact table unstackable">
          <thead>
          <tr>
            <th>Name</th>
            <th class="right aligned">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let userInfo of usersInfo; trackBy: trackByFullName">
            <td>
              {{userInfo.fullName}}
            </td>
            <td *ngIf="!loggedUser(userInfo)" class="right aligned">
              <button *ngIf="userInfo.enabled" class="ui negative button" (click)="toggleEnableUserStatus(userInfo)">Disable
              </button>
              <div class="or"></div>
              <button *ngIf="!userInfo.enabled" class="ui positive button" (click)="toggleEnableUserStatus(userInfo)">Enable
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </ng-container>
    </div>
  `
})
export class UsersManagementComponent implements OnInit {

  public isLoading = true;
  public isError = false;
  public usersInfo: UserInfo[];

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isError = false;
    this.userService.getAllUsersInfo()
      .subscribe(
        usersInfo => {
          this.usersInfo = usersInfo;
          this.isError = false;
          this.isLoading = false;
        },
        e => {
          this.isError = true;
          this.isLoading = false;
        });
  }

  private loggedUser(userInfo: UserInfo) {
    return userInfo.fullName === this.authService.getUser().fullName;
  }


  public trackByFullName(index: number, fullName: string) {
    return fullName;
  }


  private toggleEnableUserStatus(userInfo: UserInfo) {
    this.userService.toggleEnableUserStatus(userInfo.id)
      .subscribe(
        statusOK => {
          userInfo.enabled = !userInfo.enabled;
        },
        error => {
          console.error("User not found", error)
        }
      );
  }
}
