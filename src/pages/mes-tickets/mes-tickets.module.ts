import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MesTicketsPage} from './mes-tickets';

@NgModule({
  declarations: [
    MesTicketsPage,
  ],
  imports: [
    IonicPageModule.forChild(MesTicketsPage),
  ],
})
export class MesTicketsPageModule {}
