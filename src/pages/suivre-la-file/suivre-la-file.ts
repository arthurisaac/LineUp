import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SuivreLaFilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suivre-la-file',
  templateUrl: 'suivre-la-file.html',
})
export class SuivreLaFilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToMesTickets() {
    this.navCtrl.push('MesTicketsPage');
  }

  goToEvolutionFile() {
    this.navCtrl.push('ChoixBanque2Page');
  }

}
