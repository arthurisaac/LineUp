import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';

/**
 * Generated class for the ConfirmationHeurePassagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmation-heure-passage',
  templateUrl: 'confirmation-heure-passage.html',
})
export class ConfirmationHeurePassagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // sessionStorage.setItem('new', '1');
  }

  goToChoixBanque() {
    this.navCtrl.setRoot(HomePage);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
