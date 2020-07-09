import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HeurePassagePage} from './heure-passage';

@NgModule({
  declarations: [
    HeurePassagePage,
  ],
  imports: [
    IonicPageModule.forChild(HeurePassagePage),
  ],
})
export class HeurePassagePageModule {}
