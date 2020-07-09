import {Component} from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the FicheDepotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fiche-depot',
  templateUrl: 'fiche-depot.html',
})
export class FicheDepotPage {
  i: number = 0;
  value = [10000, 5000, 2000, 1000, 500, 250, 200, 100, 50, 25, 10, 5];
  tout: number = 0;
  today = new Date();

  url: string = ''; // uri du serveur de l'agence à atteindre
  service: any; // nom du service
  agence: string;
  photoURL: string = '';

  billetages = [
    {
      billetage: this.value[this.i],
      quantite: 0,
      total: 0
    }
  ];

  fiche = {
    "beneficiaire": "",
    "numero_compte": "",
    "remettant": "",
    "telephone": "",
    "total": 0,
    "billetage": this.billetages,
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {
    this.service = this.navParams.get('service');
    this.agence = this.navParams.get('agence');
    this.photoURL = this.navParams.get('photoURL');
    this.url = this.navParams.get('url');
  }

  goBack() {
    // this.navCtrl.pop();
    this.presentActionSheetDepot()
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

  addField(){
    this.i++;
    if (this.value[this.i]) {
      this.billetages.push({
        billetage: this.value[this.i],
        quantite: 0,
        total: 0
      });
    }
  }

  removeField(x) {
    this.billetages.splice(this.billetages.indexOf(x), 1);
    --this.i;
  }

  addTotal(x) {
    x.total = x.quantite * x.billetage;
    this.tout = this.tout + x.total;
    this.fiche.total = this.tout;
  }

  suivant() {
    if (this.fiche.beneficiaire === "") {
      let alert = this.alertCtrl.create({
        title: 'Attention',
        message: 'Le bénéficiaire ne doit pas être vide',
        buttons: ['OK']
      });
      alert.present();
    } else if (this.fiche.telephone === "") {
      let alert = this.alertCtrl.create({
        title: 'Attention',
        message: 'Le numéro de téléphone ne doit pas être vide',
        buttons: ['OK']
      });
      alert.present();
    } else if(this.fiche.total == 0) {
      let alert = this.alertCtrl.create({
        title: 'Attention',
        message: 'Le total ne doit pas être égale à 0',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.navCtrl.push('RecapitulatifPage', {fiche: this.fiche, service: this.service, agence: this.agence, photoURL: this.photoURL, url: this.url});
    }
  }

}
