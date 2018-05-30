import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../../environments/environment";
import {AllResultsForUser} from "../model";


@Injectable()
export class ResultService {
  constructor(private http: HttpClient) {
  }

  public getAllResults(): Observable<AllResultsForUser[]> {
    return this.http.get<AllResultsForUser[]>(`${environment.resultsUrl}/all`);
  }
}
