import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../../environments/environment";
import {User, UserInfo} from "../model";



@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getLoggedInUserData(): Observable<User> {
    return this.http.get<User>(`${environment.usersUrl}/data`);
  }

  public getAllUsersInfo(): Observable<UserInfo[]> {
     return this.http.get<UserInfo[]>(`${environment.usersUrl}/all`);
  }

  public disableUser(userId: number) {
    return this.http.post<UserInfo>(`${environment.usersUrl}/disable`, userId);
  }

  public enableUser(userId: number) {
    return this.http.post<UserInfo>(`${environment.usersUrl}/enable`, userId);
  }
}
