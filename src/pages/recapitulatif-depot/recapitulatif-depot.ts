import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

declare var require: any;

@IonicPage()
@Component({
  selector: 'page-recapitulatif-depot',
  templateUrl: 'recapitulatif-depot.html',
})
export class RecapitulatifDepotPage {
  fiche = {names: "", account: "", amount: ""};
  lettre = 0;
  today = new Date();

  url: string = ''; // uri du serveur de l'agence à atteindre
  service: any; // nom du service
  agence: string;
  photoURL: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fiche = this.navParams.get('fiche');
    let writtenNumber = require('written-number');
    writtenNumber.defaults.lang = 'fr';
    this.lettre = writtenNumber(this.fiche.amount);

    this.service = this.navParams.get('service');
    this.agence = this.navParams.get('agence');
    this.photoURL = this.navParams.get('photoURL');
    this.url = this.navParams.get('url');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecapitulatifDepotPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  suivant() {
    this.navCtrl.push('PrendreTicketPage', {
      fiche: this.fiche,
      service: this.service,
      agence: this.agence,
      photoURL: this.photoURL,
      url: this.url
    }).then(() => {
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
