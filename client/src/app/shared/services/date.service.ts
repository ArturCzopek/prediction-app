import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

declare var moment: any;

@Injectable()
export class DateService {

  private timeZone = 'Europe/Berlin';

  constructor(private http: HttpClient) {
  }

  public loadTimeZone() {
    return new Promise(resolve => {
      this.http.get(`${environment.usersUrl}/timezone`)
        .subscribe((tz: string) => {
            this.timeZone = tz;
            resolve(true)
          },
          error => {
            resolve(error)
          })
    });
  }

  public convertDateFromDbToString(dateFromDb: string): string {
    return this.formatDbDateToMomentDate(dateFromDb).format('DD.MM.YYYY HH:mm');
  }

  public isDateValidToPredict(dateFromDb: string): boolean {
    return this.formatDbDateToMomentDate(dateFromDb).diff(moment.tz(this.timeZone)) > 0;
  }

  public isDateValidToAddResult(dateFromDb: string): boolean {
    const hoursDifference = 2;
    return this.formatDbDateToMomentDate(dateFromDb).add(hoursDifference, 'h').diff(moment.tz(this.timeZone)) < 0;
  }

  public convertDateFromFormToDbDate(dateFromForm: Date): string {
    return moment.tz(dateFromForm, this.timeZone).format('YYYY-MM-DD HH:mm:ss');
  }

  private formatDbDateToMomentDate(dateFromDb: string): any {
    return moment.tz(dateFromDb.replace('T', ' '), 'YYYY-MM-DD HH:mm:ss', this.timeZone);
  }
}
