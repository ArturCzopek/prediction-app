import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {MatchWithUserType} from "../home/model";
import {environment} from "../../environments/environment";


@Injectable()
export class MatchService {
  constructor(private http: HttpClient) {
  }

  public getAllMatchesWithUserTypes(): Observable<Map<string, Array<MatchWithUserType>>> {
    return this.http.get<Map<string, Array<MatchWithUserType>>>(environment.matchesUrl);
  }
}
