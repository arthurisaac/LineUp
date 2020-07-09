import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChoixBanquePage} from './choix-banque';

@NgModule({
  declarations: [
    ChoixBanquePage,
  ],
  imports: [
    IonicPageModule.forChild(ChoixBanquePage),
  ],
})
export class ChoixBanquePageModule {}
