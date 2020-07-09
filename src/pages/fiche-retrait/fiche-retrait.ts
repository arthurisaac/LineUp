import {Component} from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the FicheRetraitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fiche-retrait',
  templateUrl: 'fiche-retrait.html',
})
export class FicheRetraitPage {
  today = new Date();
  fiche = {
    names: '',
    account: '',
    amount: '',
  };
  url: string = ''; // uri du serveur de l'agence à atteindre
  service: any; // nom du service
  agence: string;
  photoURL: string = '';

  constructor(public navCtrl: NavController,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
    this.service = this.navParams.get('service');
    this.agence = this.navParams.get('agence');
    this.photoURL = this.navParams.get('photoURL');
    this.url = this.navParams.get('url');
  }

  suivant() {
    // console.log(this.fiche);
    if (this.fiche.names !== '' && this.fiche.account !== '' && this.fiche.amount) {
      this.navCtrl.push('RecapitulatifDepotPage', {fiche: this.fiche, service: this.service, agence: this.agence, photoURL: this.photoURL, url: this.url})
    } else {
      let alert = this.alertCtrl.create({
        title: 'Attention',
        message: 'Veuiller remplir tous les champs svp',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  goBack() {
    this.presentActionSheetDepot();
  }

  presentActionSheetDepot() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Vous risquer de perdre les informations saisie?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.navCtrl.pop()
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });

    actionSheet.present();
  }
}
