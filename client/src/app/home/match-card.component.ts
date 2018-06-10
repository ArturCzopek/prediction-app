import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {DateService} from "../shared/services/date.service";
import {StreamService} from "../shared/services/stream.service";
import {MatchWithUserType} from "../shared/model";


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

    .match-card__ribbon {
      width: 128px;
      height: 134px;
      overflow: hidden;
      position: absolute;
      top: 14px;
      left: 15px
    }

    .match-card__ribbon span {
      position: absolute;
      display: block;
      width: 150px;
      padding: 11px 0;
      background-color: #21BA45;
      box-shadow: 0 5px 10px rgba(0,0,0,.1);
      color: #fff;
      font: 700 18px/1 'Lato', sans-serif;
      text-shadow: 0 1px 1px rgba(0,0,0,.2);
      text-transform: uppercase;
      text-align: center;
      right: 15px;
      top: 20px;
      transform: rotate(-45deg);
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

    .match-card__actions--no-actions {
      color: gray;
      cursor: not-allowed;
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
  `],
  template: `
    <div class="match-card" [ngClass]="classForUserType">
      <div *ngIf="isRibbon" class="match-card__ribbon"><span>Added</span></div>
      <div class="match-card__content">
        <div class="match-card__content__title">
          <div class="match-card__content__title__team1">{{matchWithType.match.team1}}</div>
          <div class="match-card__content__title__result">{{goals1}} : {{goals2}}</div>
          <div class="match-card__content__title__team2">{{matchWithType.match.team2}}</div>
        </div>
        <div class="match-card__content__subtitle">{{formattedDate}}</div>
        <div class="match-card__content__type">Your type: {{getFormattedType()}}</div>
        <div class="match-card__content__points">Points for type: {{pointsForType}}</div>
      </div>
      <div *ngIf="isActionAvailable; else noAction" class="match-card__actions">
        <div class="match-card__actions__button" *ngIf="canAddResult" (click)="openAddResultModal()">
          <i class="plus circle icon"></i>
          <p>Add match result</p>
        </div>
        <div class="match-card__actions__button" *ngIf="canPredict" (click)="openAddTypeModal()">
          <i class="money bill alternate outline icon"></i>
          <p>Predict!</p>
        </div>
      </div>
      <ng-template #noAction>
        <div class="match-card__actions match-card__actions--no-actions">
          <p>No action for this match</p>
        </div>
      </ng-template>
    </div>
  `
})
export class MatchCardComponent implements OnInit {

  @Input() matchWithType: MatchWithUserType;
  public isActionAvailable = false;
  public isAdmin = false;
  public canPredict = false;
  public canAddResult = false;
  public formattedDate = '';
  public classForUserType = '';
  public goals1 = '-';
  public goals2 = '-';
  public pointsForType = '-';
  public isRibbon = false;
  private resultAdded = false;

  constructor(
    private authService: AuthService,
    private dateService: DateService,
    private streamService: StreamService
  ) {
  }

  ngOnInit(): void {
    const {match, type} = this.matchWithType;
    this.isAdmin = this.authService.isLoggedInAsAdmin();
    this.canPredict = this.dateService.isDateValidToPredict(match.time);
    this.canAddResult = this.isAdmin && this.dateService.isDateValidToAddResult(match.time);
    this.isActionAvailable = this.canAddResult || this.canPredict;
    this.formattedDate = this.dateService.convertDateFromDbToString(match.time);
    this.resultAdded = Number.isInteger(match.goals1) && Number.isInteger(match.goals2);
    this.goals1 = (match && Number.isInteger(match.goals1)) ? match.goals1 + '' : '-';
    this.goals2 = (match && Number.isInteger(match.goals2)) ? match.goals2 + '' : '-';
    if ((type && Number.isInteger(type.pointsForType)) || this.resultAdded) {
      this.pointsForType = type ? (type.pointsForType || 0) + '' : '0';
    } else {
      this.pointsForType = '-';
    }


    this.classForUserType = this.getClassForUserType();
    this.isRibbon = this.isRibbonAvailable();
  }

  private getClassForUserType(): string {
    if ((!this.arePointsForType() && this.canPredict) || !this.resultAdded) {
      return '';
    } else if ((!this.arePointsForType() && !this.canPredict && this.resultAdded) || this.matchWithType.type.pointsForType === 0) {
      return 'match-card--red';
    } else if (this.matchWithType.type.pointsForType === 1) {
      return 'match-card--yellow';
    } else if (this.matchWithType.type.pointsForType === 3) {
      return 'match-card--green';
    } else {
      return '';
    }
  }

  private isRibbonAvailable(): boolean {
    return !this.resultAdded && this.matchWithType.type && Number.isInteger(this.matchWithType.type.goals1) && Number.isInteger(this.matchWithType.type.goals2);
  }

  public getFormattedType() {
    const {type} = this.matchWithType;
    return type ? `${type.goals1} : ${type.goals2}` : 'Not found';
  }

  public openAddResultModal() {
    this.streamService.callAddResultModal(this.matchWithType.match);
  }

  public openAddTypeModal() {
    this.streamService.callAddTypeModal(this.matchWithType);
  }

  private arePointsForType(): boolean {
    if (!this.matchWithType.type) {
      return false;
    }

    return Number.isInteger(this.matchWithType.type.pointsForType);
  }
}
