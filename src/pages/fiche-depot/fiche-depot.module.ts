import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FicheDepotPage} from './fiche-depot';

@NgModule({
  declarations: [
    FicheDepotPage,
  ],
  imports: [
    IonicPageModule.forChild(FicheDepotPage),
  ],
})
export class FicheDepotPageModule {}
