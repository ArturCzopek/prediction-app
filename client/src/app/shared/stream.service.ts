import {Injectable} from "@angular/core";
import {Subject} from "rxjs/internal/Subject";
import {Match, MatchWithUserType} from "./model";


@Injectable()
export class StreamService {
  readonly addMatchModal = new Subject<any>();
  readonly addResultModal = new Subject<Match>();
  readonly addTypeModal = new Subject<MatchWithUserType>();
  readonly refreshHomePage = new Subject<any>();

  public callAddMatchModal() {
    this.addMatchModal.next(null);
  }

  public callAddResultModal(match: Match) {
    this.addResultModal.next(match);
  }

  public callAddTypeModal(matchWithUserType: MatchWithUserType) {
    this.addTypeModal.next(matchWithUserType);
  }

  public callRefreshHomePage() {
    this.refreshHomePage.next(null);
  }
}
