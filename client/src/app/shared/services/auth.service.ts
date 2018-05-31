import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {User, UserRole} from "../model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  private loggedInUser: User;

  constructor(private userService: UserService, private http: HttpClient, private r: Router) {
    this.userService.getLoggedInUserData()
      .subscribe(user => this.loggedInUser = user);
  }

  public logOut(): any {
    this.http.post(environment.logoutUrl, {})
      .subscribe(
        ok => {
          this.loggedInUser = null;
          this.r.navigate(['/logout']);
        }
      )
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
