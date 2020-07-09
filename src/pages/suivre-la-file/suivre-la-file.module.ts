import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SuivreLaFilePage} from './suivre-la-file';

@NgModule({
  declarations: [
    SuivreLaFilePage,
  ],
  imports: [
    IonicPageModule.forChild(SuivreLaFilePage),
  ],
})
export class SuivreLaFilePageModule {}
