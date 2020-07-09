import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TicketProvider} from "../../providers/ticket/ticket";

/**
 * Generated class for the MesTicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mes-tickets',
  templateUrl: 'mes-tickets.html',
})
export class MesTicketsPage {
  tickets = [];
  actu = new Date();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ticketProvider: TicketProvider) {
    this.fetch_my_tickets();
  }

  goBack() {
    this.navCtrl.pop();
  }

  fetch_my_tickets() {
    if (localStorage.getItem("user")) {
      this.ticketProvider.getTickets()
        .subscribe((res) => {
          this.tickets = res;
        });
    }
  }

  /*fetch_my_tickets() {
    let my_saved_tickets = localStorage.getItem("ticket");
    if (JSON.parse(my_saved_tickets) !== null) {
      this.tickets = JSON.parse(my_saved_tickets);
      for (let i=0; i < this.tickets.length; i++) {
        /!*let d = { d: new Date(this.tickets[i].picked) };
        this.tickets.push(d);*!/
        let date = this.tickets[i].picked = new Date(this.tickets[i].picked);

        let d = new Date();
        let t = d.getHours() + ":" + d.getMinutes(); // hh:mm
        let ms = Number(t.split(':')[0]) * 60 * 60 * 1000 + Number(t.split(':')[1]) * 60 * 1000;

        let estimationTemps = this.tickets[i].expire - ms;
        if (this.tickets[i].ticket == null) {
          this.tickets.splice(i, 1);
        } else if (estimationTemps <= 0) {
          this.tickets.splice(i, 1);
        } else if (date.getDay() != new Date().getDay()) {
          this.tickets.splice(i, 1);
        }

      }
      // localStorage.setItem("ticket", JSON.stringify(this.tickets));
    }
  }*/

  goToMonTicket(ticket) {
    this.navCtrl.push('MonTicketPage', {ticket: ticket});
  }

}
