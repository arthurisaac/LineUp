import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PrendreTicketPage} from './prendre-ticket';

@NgModule({
  declarations: [
    PrendreTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(PrendreTicketPage),
  ],
})
export class PrendreTicketPageModule {}
