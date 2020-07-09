import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TicketProvider} from "../../providers/ticket/ticket";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  tab1Root = 'ChoixBanquePage';
  tab2Root = 'SuivreLaFilePage';
  tab3Root = 'ProfilPage';

  tickets = [];
  loading = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public ticketProvider: TicketProvider) {
  }

  ionViewDidLoad() {
    this.fetch_my_tickets();
    // console.log('ionViewDidLoad HomePage');
  }

  fetch_my_tickets()
  {
    this.loading = true;
    if (localStorage.getItem("user")) {
      this.ticketProvider.getTickets()
        .subscribe((res) => {
          this.tickets = res;
          this.loading = false;
        }, error => {
          this.loading = false;
        });
    }
  }

  ionOpen() {
    this.fetch_my_tickets();
  }

  goToMesTickets(ticket) {
    this.navCtrl.push('MonTicketPage', {ticket: ticket});
  }
}
