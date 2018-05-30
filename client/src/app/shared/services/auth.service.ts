import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {User, UserRole} from "../model";

@Injectable()
export class AuthService {

  private loggedInUser: User;

  constructor(private userService: UserService) {
    this.userService.getLoggedInUserData()
      .subscribe(user => this.loggedInUser = user);
  }

  getUser(): User {
    return this.loggedInUser;
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  isLoggedInAsAdmin(): boolean {
    return this.isLoggedIn() && this.loggedInUser.role == UserRole.ADMIN;
  }
}
