import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {Match, MatchResult, MatchWithUserType} from "../home/model";
import {environment} from "../../environments/environment";
import {NewMatch} from "./model";


@Injectable()
export class MatchService {
  constructor(private http: HttpClient) {
  }

  public getAllMatchesWithUserTypes(): Observable<Map<string, Array<MatchWithUserType>>> {
    return this.http.get<Map<string, Array<MatchWithUserType>>>(environment.matchesUrl);
  }

  public addNewMatch(newMatch: NewMatch): Observable<Match> {
    return this.http.post<Match>(`${environment.matchesUrl}/new`, newMatch);
  }

  public addResult(result: MatchResult): Observable<Match> {
    return this.http.post<Match>(`${environment.matchesUrl}/result`, result);
  }
}
