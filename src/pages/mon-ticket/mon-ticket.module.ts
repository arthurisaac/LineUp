import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MonTicketPage} from './mon-ticket';

@NgModule({
  declarations: [
    MonTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(MonTicketPage),
  ],
})
export class MonTicketPageModule {}
