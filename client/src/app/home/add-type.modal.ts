import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {StreamService} from "../shared/stream.service";
import {TypeService} from "../shared/type.service";
import {MatchWithUserType, NewType} from "../shared/model";

declare var $: any;


@Component({
  selector: 'sc-modal-add-type',
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
    <div id="add-type-modal" class="ui small modal">
      <div class="header">Add Type</div>
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
            <div class="inline field">
              <label>{{currentMatchWithType?.match?.team1}}</label>
              <input type="number" min="0" step="1" [(ngModel)]="goals1">
            </div>
            <div class="form-separator">
              vs
            </div>
            <div class="inline field">
              <input type="number" min="0" step="1" [(ngModel)]="goals2">
              <label>{{currentMatchWithType?.match?.team2}}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui buttons">
          <button class="ui positive button" (click)="addType()" [class.disabled]="!isTypeValid()">Add</button>
          <div class="or"></div>
          <button class="ui button" (click)="closeModal()">Cancel</button>
        </div>
      </div>
    </div>
  `
})
export class AddTypeModal implements OnInit, OnDestroy {

  public currentMatchWithType: MatchWithUserType;
  public goals1 = 0;
  public goals2 = 0;
  public successMessage = '';
  public errorMessage = '';
  private openModal$: Subscription;

  constructor(
    private streamService: StreamService,
    private typeService: TypeService
  ) {
  }

  ngOnInit(): void {
    this.openModal$ = this.streamService.addTypeModal.subscribe((matchWithUserType: MatchWithUserType) => {
      this.currentMatchWithType = matchWithUserType;
      this.openModal()
    });

    $('#add-type-modal').modal({
      closeable: false,
      onApprove: () => false
    });
  }

  ngOnDestroy(): void {
    if (this.openModal$) {
      this.openModal$.unsubscribe();
    }
  }

  isTypeValid(): boolean {
    return Number.isInteger(this.goals1) && this.goals1 >= 0 &&
      Number.isInteger(this.goals2) && this.goals2 >= 0;
  }

  addType() {
    this.typeService.addNewType(
      <NewType> {
        matchId: this.currentMatchWithType.match.id,
        goals1: this.goals1,
        goals2: this.goals2,
      }
    ).subscribe(
      type => {
        this.errorMessage = '';
        this.successMessage = `Type updated: ${type.goals1} : ${type.goals2}`;
        setTimeout(() => {
          this.closeModal();
          this.streamService.callRefreshHomePage();
        }, 2000);
      },
      error => {
        this.successMessage = '';
        this.errorMessage = 'Cannot add type! Contact admin if you are still having a problem';
      }
    )
  }

  public closeModal() {
    $('#add-type-modal').modal('hide');
  }

  private openModal() {
    this.goals1 = (this.currentMatchWithType.type) ? this.currentMatchWithType.type.goals1 : 0;
    this.goals2 = (this.currentMatchWithType.type) ? this.currentMatchWithType.type.goals2 : 0;
    this.successMessage = '';
    this.errorMessage = '';

    $('#add-type-modal').modal('show');
  }
}
