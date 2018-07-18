import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../../environments/environment";
import {StatRecord} from "../model";


@Injectable()
export class StatisticsService {
  constructor(private http: HttpClient) {
  }

  public getAllStats(): Observable<StatRecord[]> {
    return this.http.get<StatRecord[]>(`${environment.statisticsUrl}/all`);
  }
}
