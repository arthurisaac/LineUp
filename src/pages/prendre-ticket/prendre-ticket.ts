import {Component} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import {TicketProvider} from "../../providers/ticket/ticket";
import {LocalNotifications} from "@ionic-native/local-notifications";

/**
 * Generated class for the PrendreTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prendre-ticket',
  templateUrl: 'prendre-ticket.html',
})
export class PrendreTicketPage {

  url: string = ''; // uri du serveur de l'agence à atteindre
  service: any; // nom du service
  agence: any; // nom du service
  current_ticket: number = 0; // numero ticket en cours
  remain: string = ''; // Nom de personne en attente
  receive: any; // variable tempoaire pour stocker les données recus

  today = new Date();
  actu = new Date();
  ticket = 0;
  heureA: number = 0;
  minuteA: number = 0;
  secondeA: number = 0;

  heureE = 0;
  minuteE = 0;
  secondeE = 0;

  my_tickets = [];
  photoURL: string;
  fiche: any;

  date_estimation = new Date();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              private ticketProvider: TicketProvider,
              private localNotifications: LocalNotifications) {

    this.service = this.navParams.get('service');
    this.agence = this.navParams.get('agence');
    this.photoURL = this.navParams.get('photoURL');
    this.url = this.navParams.get('url');
    this.fiche = this.navParams.get('fiche');

    this.getLast();

  }

  static msToTime(duration) {
    let duree: number = parseInt(duration);
    let
      // milliseconds = (duree % 1000 / 100),
      seconds = Math.floor((duree / 1000) % 60),
      minutes = Math.floor((duree / (1000 * 60)) % 60),
      hours = Math.floor((duree / (1000 * 60 * 60)) % 24);

    return {
      'heure': hours,
      'minutes': minutes,
      'secondes': seconds
    };
  }

  estimate(estimationTemps) {
    //let estimationTemps = 2700000;
    this.heureA = PrendreTicketPage.msToTime(estimationTemps).heure;
    this.minuteA = PrendreTicketPage.msToTime(estimationTemps).minutes;
    this.secondeA = PrendreTicketPage.msToTime(estimationTemps).secondes;

    let approximatifTemps = this.today.setMilliseconds(estimationTemps);
    this.heureE = PrendreTicketPage.msToTime(approximatifTemps).heure;
    this.minuteE = PrendreTicketPage.msToTime(approximatifTemps).minutes;
    this.secondeE = PrendreTicketPage.msToTime(approximatifTemps).secondes;

  }

  estimate2(temps) {
    let curr = new Date();
    curr.setMilliseconds(temps);
    let countDownDate = curr.getTime();
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
    if (temps !== 0) {
      countDownDate.setMilliseconds(temps);
    }

    this.date_estimation = countDownDate;
  }

  warning() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Attention vous serez rediriger vers la page d\'accueil ?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.navCtrl.push(
              'ChoixBanquePage'
            ).then(() => {
              const startIndex = this.navCtrl.getActive().index - 3;
              this.navCtrl.remove(startIndex, 3);
            });
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

  goBack() {
    this.navCtrl.pop();
  }

  getLast(): any {
    let loader = this.loadingCtrl.create({
      content: "Chargement..."
    });
    loader.present();

    this.ticketProvider.readLast(this.service.nom, this.url)
      .subscribe(
        data => {
          this.receive = data;
          // this.current_ticket = +this.receive.id;
          this.ticket = this.receive.numero;
          this.estimate3(this.receive.estimation);
          this.estimate2(this.receive.estimation);
          loader.dismiss();
        },
        error => {
          if (error.error.message) {
            console.log(error.error.message);
            this.ticket = 1;
            this.estimate2(error.error.temps);
          } else {
            console.log("Erreur reseau");
          }
          loader.dismiss();
        }
      )
  }

  prendre(): any {
    /*let my_saved_tickets = localStorage.getItem("ticket");
    if (JSON.parse(my_saved_tickets) !== null) {
      this.my_tickets = JSON.parse(my_saved_tickets);
    }

    // let present = false;
    for (let i = 0; i < this.my_tickets.length; i++) {
      if (this.my_tickets[i].agence === this.agence && this.my_tickets[i].service.nom === this.service.nom) {
        alert("Vous avez déjà pris un ticket");
        // present = true;
        break;
      }
    }*/
    //if (!present) {

    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));

      let loader = this.loadingCtrl.create({
        content: "Chargement..."
      });
      loader.present();

      this.ticketProvider.create(this.service.nom, this.url)
        .subscribe(
          data => {
            /*let d = new Date();
            let t = d.getHours() + ":" + d.getMinutes(); // hh:mm
            let ms = Number(t.split(':')[0]) * 60 * 60 * 1000 + Number(t.split(':')[1]) * 60 * 1000;*/

            let ticket = {
              'agence': this.agence.nom,
              'service': this.service.nom,
              'url': this.url,
              'photoURL': this.url + 'uploads/' + this.photoURL,
              'code': data.code,
              'ticket': data.number,
              'temps': data.estimation,
              'idTk': data.id,
              // 'expire': ms + data.estimation,
              'expire': this.date_estimation,
              'picked': new Date(),
              'user': user.id,
            };
            this.ticketProvider.saveTicket(ticket)
              .subscribe(() => {
                // Local notification
                if (data.estimation >= 0) {
                  let countDownDate = new Date();
                  countDownDate.setMilliseconds(data.estimation);
                  this.localNotifications.schedule({
                    text: 'LineUp',
                    title: 'C\'est votre tour! merci de vous rendre au guichet concerné.',
                    trigger: {at: countDownDate}
                  });
                }
                if (data.estimation > (30 * 60000)) {
                  let countDownDate = new Date(new Date().getTime() + (30 * 60000));
                  this.localNotifications.schedule({
                    text: 'LineUp',
                    title: 'Vous passerai dans 30 minutes',
                    trigger: {at: countDownDate}
                  });
                }

                this.my_tickets.push(ticket);
                // localStorage.setItem("ticket", JSON.stringify(this.my_tickets));

                this.navCtrl.push('TicketVirtuelPage', {
                  ticket: data.number,
                  code: data.code,
                  temps: this.date_estimation,
                  agence: this.agence,
                  photoURL: this.photoURL,
                  logo: this.url + 'uploads/' + this.photoURL
                }).then(() => {
                  let index = this.navCtrl.getActive().index - 1;
                  this.navCtrl.remove(index, 1);
                });

                loader.dismiss();
              }, error => {
                loader.dismiss();
                console.log(error);
              });
          },
          error => {
            console.log(error);
            loader.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Erreur',
              message: 'Pas d\'accès internet',
              buttons: ['OK']
            });
            alert.present();
          }
        );
    }

    //}

  }

  heurePassage(): any {
    /*setTimeout(() => {
      this.prendre();
      this.localNotifications.schedule({
        text: 'LineUp',
        title: 'Verifier votre numero',
        trigger: {at: new Date(new Date().getTime() + 30000)}
      });

    }, 10000);*/

    this.navCtrl.push('HeurePassagePage', {
      fiche: this.fiche,
      service: this.service,
      agence: this.agence,
      photoURL: this.photoURL,
      url: this.url
    });
  }

}
