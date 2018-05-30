import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {StreamService} from "../services/stream.service";
import {DateService} from "../services/date.service";
import {MatchService} from "../services/match.service";
import {NewMatch} from "../model";

declare var $: any;


@Component({
  selector: 'sc-modal-add-match',
  template: `
    <div id="add-match-modal" class="ui small modal">
      <div class="header">Add Match</div>
      <div class="content">
        <div class="ui positive message" *ngIf="successMessage">
          <div class="header">Success!</div>
          <p>{{successMessage}}</p>
        </div>
        <div class="ui negative message" *ngIf="errorMessage">
          <div class="header">Error!</div>
          <p>{{errorMessage}}</p>
        </div>
        <div class="ui form">
          <div class="two fields">
            <div class="field">
              <label>Label</label>
              <input type="text" placeholder="Label" [(ngModel)]="label">
            </div>
            <div class="field left icon" id="match-date">
              <label>Date</label>
              <input type="text" placeholder="Date" [(ngModel)]="date">
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <label>Team One</label>
              <input type="text" placeholder="Team One" [(ngModel)]="team1">
            </div>
            <div class="field">
              <label>Team Two</label>
              <input type="text" placeholder="Team Two" [(ngModel)]="team2">
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui buttons">
          <button class="ui positive button" (click)="addMatch()" [class.disabled]="!isNewMatchValid()">Add</button>
          <div class="or"></div>
          <button class="ui button" (click)="closeModal()">Cancel</button>
        </div>
      </div>
    </div>
  `
})
export class AddMatchModal implements OnInit, OnDestroy {

  public label = '';
  public team1 = '';
  public team2 = '';
  public date = '';
  public successMessage = '';
  public errorMessage = '';
  private openModal$: Subscription;

  constructor(
    private streamService: StreamService,
    private dateService: DateService,
    private matchService: MatchService
  ) {
  }

  ngOnInit(): void {
    this.openModal$ = this.streamService.addMatchModal.subscribe(nothing => this.openModal());
    $('#add-match-modal').modal({
      closeable: false,
      onApprove: () => false
    });
    $('#match-date').calendar({
      minDate: new Date(),
      formatter: {
        datetime: (date, settings) => {
          const convertedDate = this.dateService.convertDateFromFormToDbDate(date);
          this.date = convertedDate;
          return convertedDate;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.openModal$) {
      this.openModal$.unsubscribe();
    }
  }

  isNewMatchValid(): boolean {
    return this.team1.length > 0 && this.team2.length > 0
      && this.label.length > 0 && this.date.length > 0;
  }

  addMatch() {
    this.matchService.addNewMatch(
      <NewMatch> {
        label: this.label,
        team1: this.team1,
        team2: this.team2,
        time: this.date.replace(' ', 'T')
      }
    ).subscribe(
      newMatch => {
        this.errorMessage = '';
        this.successMessage = `Match [${newMatch.label}] ${newMatch.team1} vs ${newMatch.team2} has been added`;
        setTimeout(() => {
          this.closeModal();
          this.streamService.callRefreshHomePage();
        }, 2000);
      },
      error => {
        this.successMessage = '';
        this.errorMessage = 'Cannot add match! Contact admin if you are still having a problem';
      }
    )
  }

  public closeModal() {
    $('#add-match-modal').modal('hide');
  }

  private openModal() {
    this.label = '';
    this.team1 = '';
    this.team2 = '';
    this.date = '';
    this.successMessage = '';
    this.errorMessage = '';

    $('#add-match-modal').modal('show');
  }
}
