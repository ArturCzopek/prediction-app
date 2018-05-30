import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {StreamService} from "../services/stream.service";
import {MatchService} from "../services/match.service";
import {Match, MatchResult} from "../model";

declare var $: any;


@Component({
  selector: 'sc-modal-add-result',
  styles: [`
    input[type=number] {
      width: 65px !important;
    }

    .inline.field {
      align-items: center;
      display: flex;
    }

    .inline.field:first-of-type {
      justify-content: flex-end;
    }

    .inline.field:last-of-type {
      justify-content: flex-start;
    }

    .form-separator {
      align-items: center;
      display: flex;
      font-weight: 800;
    }

    label {
      font-size: 20px !important;
    }
  `],
  template: `
    <div id="add-result-modal" class="ui small modal">
      <div class="header">Add Result</div>
      <div class="content">
        <div class="ui positive message" *ngIf="successMessage">
          <div class="header">Success!</div>
          <p>{{successMessage}}</p>
        </div>
        <div class="ui negative message" *ngIf="errorMessage">
          <div class="header">Error!</div>
          <p>{{errorMessage}}</p>
        </div>
        <div class="ui form" *ngIf="currentMatch">
          <div class="two fields">
            <div class="inline field">
              <label>{{currentMatch?.team1}}</label>
              <input type="number" min="0" step="1" [(ngModel)]="goals1">
            </div>
            <div class="form-separator">
              vs
            </div>
            <div class="inline field">
              <input type="number" min="0" step="1" [(ngModel)]="goals2">
              <label>{{currentMatch?.team2}}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui buttons">
          <button class="ui positive button" (click)="addResult()" [class.disabled]="!isResultValid()">Add</button>
          <div class="or"></div>
          <button class="ui button" (click)="closeModal()">Cancel</button>
        </div>
      </div>
    </div>
  `
})
export class AddResultModal implements OnInit, OnDestroy {

  public currentMatch: Match;
  public goals1 = 0;
  public goals2 = 0;
  public successMessage = '';
  public errorMessage = '';
  private openModal$: Subscription;

  constructor(
    private streamService: StreamService,
    private matchService: MatchService
  ) {
  }

  ngOnInit(): void {
    this.openModal$ = this.streamService.addResultModal.subscribe((match: Match) => {
      this.currentMatch = match;
      this.openModal()
    });

    $('#add-result-modal').modal({
      closeable: false,
      onApprove: () => false
    });
  }

  ngOnDestroy(): void {
    if (this.openModal$) {
      this.openModal$.unsubscribe();
    }
  }

  isResultValid(): boolean {
    return Number.isInteger(this.goals1) && this.goals1 >= 0 &&
      Number.isInteger(this.goals2) && this.goals2 >= 0;
  }

  addResult() {
    this.matchService.addResult(
      <MatchResult> {
        matchId: this.currentMatch.id,
        goals1: this.goals1,
        goals2: this.goals2,
      }
    ).subscribe(
      matchWithResult => {
        this.errorMessage = '';
        this.successMessage = `Result updated: ${matchWithResult.team1} ${matchWithResult.goals1}:${matchWithResult.goals2} ${matchWithResult.team2}`;
        setTimeout(() => {
          this.closeModal();
          this.streamService.callRefreshHomePage();
        }, 2000);
      },
      error => {
        this.successMessage = '';
        this.errorMessage = 'Cannot add result! Contact admin if you are still having a problem';
      }
    )
  }

  public closeModal() {
    $('#add-result-modal').modal('hide');
  }

  private openModal() {
    this.goals1 = this.currentMatch.goals1 || 0;
    this.goals2 = this.currentMatch.goals2 || 0;
    this.successMessage = '';
    this.errorMessage = '';

    $('#add-result-modal').modal('show');
  }
}
