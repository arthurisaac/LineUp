import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChoixAgencePage} from './choix-agence';

@NgModule({
  declarations: [
    ChoixAgencePage,
  ],
  imports: [
    IonicPageModule.forChild(ChoixAgencePage),
  ],
})
export class ChoixAgencePageModule {}
