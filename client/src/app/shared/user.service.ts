import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../environments/environment";
import {User} from "./model";


@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getLoggedInUserData(): Observable<User> {
    return this.http.get<User>(`${environment.usersUrl}/data`);
  }
}
