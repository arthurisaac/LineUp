import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChoixServicePage} from './choix-service';

@NgModule({
  declarations: [
    ChoixServicePage,
  ],
  imports: [
    IonicPageModule.forChild(ChoixServicePage),
  ],
})
export class ChoixServicePageModule {}
