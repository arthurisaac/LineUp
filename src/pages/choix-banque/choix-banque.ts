import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BanqueProvider} from "../../providers/banque/banque";
import {Constants} from "../../providers/Constants";

@IonicPage()
@Component({
  selector: 'page-choix-banque',
  templateUrl: 'choix-banque.html',
})
export class ChoixBanquePage {
  notif = false;
  erreur: boolean = false;
  load: boolean = true;
  banque = [];
  new_notification = false;
  url = Constants.getUrl();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public banqueProvider: BanqueProvider,
              public events: Events) {

    //this.banquesCollection = db.collection<any>('banques');
    //this.banques = this.banquesCollection.valueChanges();

    /*let d = new Date();
    let t = d.getHours() + ":" + d.getMinutes(); // hh:mm
    let ms = Number(t.split(':')[0]) * 60 * 60 * 1000 + Number(t.split(':')[1]) * 60 * 1000;
    console.log(ms);*/

    /*let countDownDate = new Date();
    countDownDate.setMilliseconds(900000);
    console.log(countDownDate);*/
  }

  ionViewDidLoad() {

    let tasks = [];
    let now = new Date();
    if (localStorage.getItem('task')) {
      tasks = JSON.parse(localStorage.getItem('task'));
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (task.expired <= now) {
          let not = [
            {
              type: 'ticket',
              photoURL: task.photoURL,
              numero: task.numero,
              message: task.message
            }
          ];
          console.log(not);
          tasks.splice(tasks.indexOf(1), 1);
          localStorage.setItem("notifications", JSON.stringify(not));
          this.new_notification = true;
        }
      }
    }
    if (sessionStorage.getItem('new')) {
      this.notif = true;
      sessionStorage.removeItem('new');
    }

    this.getBanques();
  }

  async getBanques() {
    this.load = true;
    this.erreur = false;
    await this.banqueProvider.getBanks()
      .subscribe(
        res => {
          this.load = false;
          this.banque = res;
        },
        err => {
          // TODO: Message d'erreur avec button reessayer
          this.load = false;
          this.erreur = true;
          console.log(err);
        }
      )
  }


  goToChoixAgence(x) {
    this.navCtrl.push('ChoixAgencePage', {agence: x.agence, photoURL: x.photoURL});
  }

  goToNotifications() {
    this.navCtrl.push('NotificationsPage');
  }

  toggle() {
    this.notif = false;
  }
}
