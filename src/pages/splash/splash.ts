import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TicketProvider} from '../../providers/ticket/ticket';

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  tickets = [];
  idUser: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              // private localNotifications: LocalNotifications,
              public ticketProvider: TicketProvider) {
    this.checkLogin();
  }

  checkLogin() {
    if (localStorage.getItem('user')) {
      this.navCtrl.setRoot('HomePage');
    } else {
      this.navCtrl.setRoot('ConnexionPage');
    }
  }

  /*
    fetch_my_tickets() {
      console.log("Fetching tickets...");
      let my_saved_tickets = localStorage.getItem("ticket");
      if (JSON.parse(my_saved_tickets) !== null) {
        this.tickets = JSON.parse(my_saved_tickets);
        for (let i=0; i < this.tickets.length; i++) {

          this.tickets[i].picked = new Date(this.tickets[i].picked);
          if (this.tickets[i].userTMP) {
            if (this.tickets[i].ticket == null ) {
              this.check(this.tickets[i]);
            }
          }
        }
      } else {
        console.log("No tickets");
      }
    }

      check(data) {
        if (this.idUser != '') {
            this.ticketProvider.verifier(data.url,  this.idUser, data.userTMP,)
            .subscribe( (res) => {
              if (res.numero >= 0) {
                this.updateTicket(data.userTMP, res.numero);
                this.ticketProvider.create(data.service.id, data.url)
                .subscribe(res => {
                }, err => {
                  alert('Pas de connexion');
                })
              }
            },  (err) => {
              console.log(err);
            });
        } else {
          console.log("Pas connecté");
        }
      }

    updateTicket(userTMP, numero) {
      for (let i = 0; i < this.tickets.length; i++) {
        if (this.tickets[i].userTMP === userTMP) {
          this.tickets[i].ticket = numero;
        }
      }
      this.localNotifications.schedule({
        title: 'LineUp',
        text: 'Vous passerai bientot au guichet',
        trigger: {at: new Date(new Date().getTime() + 10000)}
      });
      localStorage.setItem("ticket", JSON.stringify(this.tickets));
    }
    */

}
