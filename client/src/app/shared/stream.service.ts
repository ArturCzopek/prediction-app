import {Injectable} from "@angular/core";
import {Subject} from "rxjs/internal/Subject";
import {Match} from "../home/model";


@Injectable()
export class StreamService {
  readonly addMatchModal = new Subject<any>();
  readonly addResultModal = new Subject<Match>();
  readonly addTypeModal = new Subject<Match>();
  readonly refreshHomePage = new Subject<any>();

  public callAddMatchModal() {
    this.addMatchModal.next(null);
  }

  public callAddResultModal(match: Match) {
    this.addResultModal.next(match);
  }

  public callAddTypeModal(match: Match) {
    this.addTypeModal.next(match);
  }

  public callRefreshHomePage() {
    this.refreshHomePage.next(null);
  }
}
