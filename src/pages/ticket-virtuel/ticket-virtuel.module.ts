import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TicketVirtuelPage} from './ticket-virtuel';

@NgModule({
  declarations: [
    TicketVirtuelPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketVirtuelPage),
  ],
})
export class TicketVirtuelPageModule {}
