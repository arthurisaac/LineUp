import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PrendreTicketPage} from "../prendre-ticket/prendre-ticket";
import {ServiceProvider} from "../../providers/service/service";

/**
 * Generated class for the MonTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mon-ticket',
  templateUrl: 'mon-ticket.html',
})
export class MonTicketPage {

  today = new Date();
  actu = new Date();
  ticket: number = 0;
  code: string = "";
  temps: number = 0;

  heureA: number = 0;
  minuteA: number = 0;
  secondeA: number = 0;

  heureE = 0;
  minuteE = 0;
  secondeE = 0;
  ecoule: boolean = false;

  tk: any;
  prs: number = 0;
  date_estimation = new Date();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              srvProvider: ServiceProvider
  ) {
    this.tk = this.navParams.get("ticket");
    this.ticket = this.tk.ticket;
    this.code = this.tk.code;
    this.actu = new Date(this.tk.expire);

    /*let d = new Date();
    let t = d.getHours() + ":" + d.getMinutes(); // hh:mm
    let ms = Number(t.split(':')[0]) * 60 * 60 * 1000 + Number(t.split(':')[1]) * 60 * 1000;*/

    let estimationTemps = this.actu.getTime() - this.today.getTime();
    if (estimationTemps <= 0) {
      console.log('Temps écoulé');
      this.ecoule = true;
    } else {
      console.log('remaining time : ' + estimationTemps);
      this.estimate(estimationTemps);
      this.estimate3(estimationTemps);
    }
    srvProvider.remain(this.tk.url, this.tk.service)
      .subscribe(
        (data) => {
          this.prs = data.restant;
        }
      )
    //setInterval( () => this.estimate(estimationTemps), 2000);
  }

  goBack() {
    this.navCtrl.pop();
  }

  // estimate(estimationTemps) {
  //   //let estimationTemps = 2700000;
  //   this.heureA = PrendreTicketPage.msToTime(estimationTemps).heure;
  //   this.minuteA = PrendreTicketPage.msToTime(estimationTemps).minutes;
  //   this.secondeA = PrendreTicketPage.msToTime(estimationTemps).secondes;
  //
  //   let approximatifTemps = this.today.setMilliseconds(estimationTemps);
  //   this.heureE = PrendreTicketPage.msToTime(approximatifTemps).heure;
  //   this.minuteE = PrendreTicketPage.msToTime(approximatifTemps).minutes;
  //   this.secondeE = PrendreTicketPage.msToTime(approximatifTemps).secondes;
  // }

  estimate(temps) {
    let current = new Date();
    current.setMilliseconds(temps);
    let countDownDate = current.getTime();
    // console.log(countDownDate);

    // Update the count down every 1 second
    let x = setInterval(() => {

      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      // + minutes + "m " + seconds + "s ";
      this.heureE = hours;
      this.minuteE = minutes;
      this.secondeE = seconds;

      this.heureA = PrendreTicketPage.msToTime(temps).heure;
      this.minuteA = PrendreTicketPage.msToTime(temps).minutes;
      this.secondeA = PrendreTicketPage.msToTime(temps).secondes;

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        this.heureE = 0;
        this.minuteE = 0;
        this.secondeE = 0;
        // document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

  estimate3(temps) {
    let countDownDate = new Date();
    countDownDate.setMilliseconds(temps);

    this.date_estimation = countDownDate;
  }

}
