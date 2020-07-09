import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ServiceProvider} from "../../providers/service/service";

/**
 * Generated class for the ChoixServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choix-service',
  templateUrl: 'choix-service.html',
})
export class ChoixServicePage {

  services = [];
  agence = <any>{};
  photoURL: string;
  url: string = '';
  myModal: boolean = false;
  service: any;
  erreur: boolean = false;
  load: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              private srvProvider: ServiceProvider) {

                if ( this.navParams.get("agence")) {
                  this.agence = this.navParams.get("agence");
                }
    this.photoURL = this.navParams.get("photoURL");
    this.url = this.agence.url;
    this.getService();
  }

  getService() {
    this.srvProvider.read( this.url )
      .subscribe(
        data => {
          this.load = false;
          this.services = data;
        },
        error1 => {
          console.error(error1);
          this.load = false;
          this.erreur = true;
          //alert("Pas d'acces internet");
        }
      )
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToFicheDepot() {
    this.navCtrl.push('FicheDepotPage', {service: this.service, agence: this.agence, photoURL: this.photoURL, url: this.url} );
  }

  goToFicheRetrait() {
    this.navCtrl.push('FicheRetraitPage', {service: this.service, agence: this.agence, photoURL: this.photoURL, url: this.url} );
  }

  goToPrendreTicket() {
    this.navCtrl.push('PrendreTicketPage', {service: this.service, agence: this.agence, photoURL: this.photoURL, url: this.url})
      .then(() => {
        let index = this.navCtrl.getActive().index - 2;
        this.navCtrl.remove(index, 2);
      });
  }

  showDialog(service) {
    this.service = service;
    if (service.nom === 'Dépot') {
      this.presentActionSheetDepot();
    } else if (service.nom === 'Retrait') {
      this.presentActionSheetRetrait();
    } else {
        this.goToPrendreTicket();
    }
  }

  hideMyModal() {
    this.myModal = false;
  }

  presentActionSheetDepot() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Souhaitez vous remplir la fiche de dépôt maintenant ?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.goToFicheDepot()
          }
        },
        {
          text: 'Non',
          handler: () => {
            this.goToPrendreTicket();
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  presentActionSheetRetrait() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Souhaitez vous remplir la fiche de retrait maintenant ?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.goToFicheRetrait();
          }
        },
        {
          text: 'Non',
          handler: () => {
            this.goToPrendreTicket();
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

}
