import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TicketProvider} from "../../providers/ticket/ticket";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifications = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ticketProvider: TicketProvider,
              public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NotificationsPage');
    this.ticketProvider.getNotification()
      .subscribe(res => {
        this.notifications = res;
      }, err => {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: 'Erreur',
          message: 'Pas d\'accès internet',
          buttons: ['OK']
        });
        alert.present();
      })
  }

  goBack() {
    this.navCtrl.pop();
  }

}
