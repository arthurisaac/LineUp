import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

declare var require: any;

/**
 * Generated class for the RecapitulatifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recapitulatif',
  templateUrl: 'recapitulatif.html',
})

export class RecapitulatifPage {
  fiche: any;
  lettre: number = 0;

  url: string = ''; // uri du serveur de l'agence à atteindre
  service: any; // nom du service
  agence: string;
  photoURL: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fiche = this.navParams.get('fiche');
    let writtenNumber = require('written-number');
    writtenNumber.defaults.lang = 'fr';
    this.lettre = writtenNumber(this.fiche.total);
    console.log(this.lettre);

    this.service = this.navParams.get('service');
    this.agence = this.navParams.get('agence');
    this.photoURL = this.navParams.get('photoURL');
    this.url = this.navParams.get('url');
  }

  goBack() {
    this.navCtrl.pop();
  }

  suivant() {
    this.navCtrl.push('PrendreTicketPage', {fiche: this.fiche, service: this.service, agence: this.agence, photoURL: this.photoURL, url: this.url})
      .then(() => {
        let index = this.navCtrl.getActive().index - 4;
        this.navCtrl.remove(index, 4)
          .then((res) => {
            console.log(res)
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

}
