import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-ticket-virtuel',
  templateUrl: 'ticket-virtuel.html',
})
export class TicketVirtuelPage {

  ticket: number = 0;
  code: string = "";
  temps: number = 0;
  logo: string = "";

  heureE = 0;
  minuteE = 0;
  secondeE = 0;
  estimation = new Date();

  today = new Date();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              ) {
    this.ticket = this.navParams.get("ticket");
    this.code = this.navParams.get("code");
    this.logo = this.navParams.get("logo");
    /*let estimationTemps = this.navParams.get("temps");
    this.estimation.setMilliseconds(estimationTemps);*/
    this.estimation = this.navParams.get("temps");


    // let approximatifTemps = this.today.setMilliseconds(estimationTemps);
    /*this.heureE = PrendreTicketPage.msToTime(approximatifTemps).heure;
    this.minuteE = PrendreTicketPage.msToTime(approximatifTemps).minutes;
    this.secondeE = PrendreTicketPage.msToTime(approximatifTemps).secondes;*/
  }

  goToChoixBanque() {
    sessionStorage.setItem('new', '1');
    this.navCtrl.setRoot(HomePage);
  }

  warning() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Attention vous serez rediriger vers la page d\'accueil ?',
      buttons: [
        {
          text: 'Poursuivre',
          handler: () => {
            this.goToChoixBanque();
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
