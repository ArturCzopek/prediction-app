import {Injectable} from "@angular/core";

declare var moment: any;

@Injectable()
export class DateService {

  public convertDateFromDbToString(dateFromDb: string): string {
    return this.formatDbDateToMomentDate(dateFromDb).format('DD.MM.YYYY HH:mm');
  }

  public isDateValidToPredict(dateFromDb: string): boolean {
    return this.formatDbDateToMomentDate(dateFromDb).diff(moment()) > 0;
  }

  public isDateValidToAddResult(dateFromDb: string): boolean {
    const hoursDifference = 2;
    return this.formatDbDateToMomentDate(dateFromDb).add(hoursDifference, 'h').diff(moment()) < 0;
  }

  public convertDateFromFormToDbDate(dateFromForm: Date): string {
    return moment(dateFromForm).format('YYYY-MM-DD HH:mm:ss');
  }

  private formatDbDateToMomentDate(dateFromDb: string): any {
    return moment(dateFromDb.replace('T', ' '), 'YYYY-MM-DD HH:mm:ss');
  }
}
