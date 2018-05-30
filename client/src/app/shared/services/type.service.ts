import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../../environments/environment";
import {NewType, Type} from "../model";


@Injectable()
export class TypeService {
  constructor(private http: HttpClient) {
  }

  public addNewType(type: NewType): Observable<Type> {
    return this.http.post<Type>(`${environment.typesUrl}/new`, type);
  }
}
