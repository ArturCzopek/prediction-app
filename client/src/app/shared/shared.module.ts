import {NgModule} from '@angular/core';
import {LoaderComponent} from "./components/loader.component";
import {ErrorMessageComponent} from "./components/error-message.component";
import {AddMatchModal} from "./components/add-match.modal";
import {AddResultModal} from "./components/add-result.modal";
import {AddTypeModal} from "./components/add-type.modal";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AddMatchModal,
    AddResultModal,
    AddTypeModal,
    ErrorMessageComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AddMatchModal,
    AddResultModal,
    AddTypeModal,
    LoaderComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule {

}
