import {Component, Input, OnInit} from '@angular/core';
import {MatchWithUserType} from "./model";
import {AuthService} from "../shared/auth.service";
import {DateService} from "../shared/date.service";


@Component({
  selector: 'sc-match-card',
  styles: [`
    .match-card {
      align-items: center;
      border: 1px solid lightgray;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    .match-card--red {
      background-color: #ff6f5f;
    }

    .match-card--yellow {
      background-color: #fffe7b;
    }

    .match-card--green {
      background-color: #baffa1;
    }

    .match-card__content {
      align-items: center;
      border-bottom: 1px solid lightgray;
      display: flex;
      flex-direction: column;
      height: 120px;
      justify-content: space-around;
      padding: 10px;
      width: 100%;
    }

    .match-card__content__title {
      display: flex;
      flex-direction: row;
      font-size: 20px;
      font-weight: 700;
      justify-content: center;
      width: 450px;
    }

    .match-card__content__title__team1 {
      flex-basis: 200px;
      display: flex;
      justify-content: flex-end;
    }

    .match-card__content__title__team2 {
      flex-basis: 200px;
      display: flex;
      justify-content: flex-start;
    }

    .match-card__content__title__result {
      display: flex;
      flex-basis: 50px;
      justify-content: center;
    }

    .match-card__content__subtitle {
      color: grey;
      font-size: 12px;
      font-weight: 400;
    }

    .match-card__separator {
      color: lightgray;
      width: 100%;
    }

    .match-card__content__points {
      font-weight: 600;
    }

    .match-card__actions {
      align-items: center;
      display: flex;
      flex-direction: row;
      height: 40px;
      justify-content: center;
      width: 100%;
    }

    .match-card__actions__button {
      align-items: center;
      cursor: pointer;
      display: flex;
      flex-grow: 1;
      height: 100%;
      justify-content: center;
      line-height: 40px;
    }

    .match-card__actions__button p {
      font-size: 16px;
    }

    .match-card__actions__button i {
      height: 38px;
    }

    .match-card__actions__button:hover {
      background-color: RGBA(0, 0, 0, 0.05);
      filter: hue-rotate(90deg);
    }

    .match-card__actions__button + .match-card__actions__button {
      border-left: 1px solid lightgray;
    }
  `],
  template: `
    <div class="match-card" [ngClass]="classForUserType">
      <div class="match-card__content">
        <div class="match-card__content__title">
          <div class="match-card__content__title__team1">{{matchWithType.match.team1}}</div>
          <div class="match-card__content__title__result">{{matchWithType.match?.goals1 || "-"}} :
            {{matchWithType.match?.goals2 || "-"}}
          </div>
          <div class="match-card__content__title__team2">{{matchWithType.match.team2}}</div>
        </div>
        <div class="match-card__content__subtitle">{{formattedDate}}</div>
        <div class="match-card__content__type">Your type: {{getFormattedType()}}</div>
        <div class="match-card__content__points">Points for type: {{matchWithType?.type?.pointsForType || "-"}}</div>
      </div>
      <div *ngIf="isActionAvailable" class="match-card__separator"></div>
      <div *ngIf="isActionAvailable" class="match-card__actions">
        <div class="match-card__actions__button" *ngIf="isAdmin">
          <i class="plus circle icon"></i>
          <p>Add match result</p>
        </div>
        <div class="match-card__actions__button" *ngIf="canPredict">
          <i class="money bill alternate outline icon"></i>
          <p>Predict!</p>
        </div>
      </div>
    </div>
  `
})
export class MatchCardComponent implements OnInit {

  @Input() matchWithType: MatchWithUserType;
  public isActionAvailable = false;
  public isAdmin = false;
  public canPredict = false;
  public formattedDate = '';
  public classForUserType = '';

  constructor(private authService: AuthService, private dateService: DateService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isLoggedInAsAdmin();
    this.canPredict = this.dateService.isDateValidToPredict(this.matchWithType.match.time);
    this.isActionAvailable = this.isAdmin || this.canPredict;
    this.formattedDate = this.dateService.convertDateFromDbToString(this.matchWithType.match.time);
    this.classForUserType = this.getClassForUserType();
  }

  private getClassForUserType(): string {
    if ((!this.matchWithType.type || !this.matchWithType.type.pointsForType) && this.canPredict) {
      return '';
    } else if (((!this.matchWithType.type || !this.matchWithType.type.pointsForType) && !this.canPredict) || this.matchWithType.type.pointsForType === 0) {
      return 'match-card--red';
    } else if (this.matchWithType.type.pointsForType === 1) {
      return 'match-card--yellow';
    } else if (this.matchWithType.type.pointsForType === 3) {
      return 'match-card--green';
    } else {
      return '';
    }
  }

  public getFormattedType() {
    const {type} = this.matchWithType;
    return type ? `${type.goals1} : ${type.goals2}` : 'Not found';
  }
}
