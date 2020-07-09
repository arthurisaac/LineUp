import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TicketProvider} from "../../providers/ticket/ticket";
import {LocalNotifications} from "@ionic-native/local-notifications";


/**
 * Generated class for the HeurePassagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-heure-passage',
  templateUrl: 'heure-passage.html',
})
export class HeurePassagePage {
  //actu = new Date();

  now = new Date();
  url: string = ''; // uri du serveur de l'agence à atteindre
  service: any; // nom du service
  agence: any; // nom du service

  photoURL: string;
  fiche: any;
  temps: any;
  idUser: string = '';
  heure = 1;
  minute = 0;
  est_h = this.heure;
  est_m = this.minute;

  my_tickets = [];
  expire: any;
  t = this.now;
  hh = [];
  mm = [];

  // TODO
  CLOSE_HOUR = 22;
  closed = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ticketProvider: TicketProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private localNotifications: LocalNotifications) {
    this.service = this.navParams.get('service');
    this.agence = this.navParams.get('agence');
    this.photoURL = this.navParams.get('photoURL');
    this.url = this.navParams.get('url');
    this.fiche = this.navParams.get('fiche');

    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      this.idUser = user.id;
    }

  }

  ionViewDidLoad() {

    this.t = new Date();
    this.t.setHours(this.now.getHours() + (+this.heure), this.now.getMinutes() + (+this.minute));
    this.est_h = this.t.getHours();
    this.est_m = this.t.getMinutes();

    // Get current hour and limit hours
    let now = new Date();
    if (now.getHours() >= this.CLOSE_HOUR) {
      alert("Guichet fermé");
    } else {
      let cpt = 0;
      for (let i = now.getHours(); i < this.CLOSE_HOUR; i++) {
        this.hh.push(cpt);
        cpt++;
        // this.heure = cpt;
      }
      for (let i = 0; i <= 59; i++) {
        this.mm.push(i);
        // this.minute = i;
      }
    }
  }

  suivant() {
    // console.log(this.service );
    // console.log("agence " + this.agence );
    // console.log("photoURL " + this.photoURL );
    // console.log(this.url );
    // console.log("temps " + this.temps );

    this.t = new Date();
    if (this.heure >= 0 && this.minute != null) {
      this.t.setHours(this.t.getHours() + (+this.heure), this.t.getMinutes() + (+this.minute));

      const ticket = {
        'agence': this.agence.nom,
        'service': this.service.nom,
        'url': this.url,
        'photoURL': this.url + 'uploads/' + this.photoURL,
        'expire': this.t,
        'picked': new Date(),
        'user': this.idUser,
        'reservation': this.t
      };

      let loader = this.loadingCtrl.create({
        content: "Chargement..."
      });
      loader.present();

      this.ticketProvider.setReservation(ticket)
        .subscribe(() => {
          loader.dismiss();
          this.navCtrl.push('ConfirmationHeurePassagePage')
            .then(() => {
              let index = this.navCtrl.getActive().index - 1;
              this.navCtrl.remove(index, 1)
                .then((res) => {
                  console.log(res)
                })
                .catch(err => {
                  console.log(err);
                });
            });
        }, () => {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Erreur',
            message: 'Une erreur s\'est déroulée. Merci de réessayer',
            buttons: ['OK']
          });
          alert.present();
        })

    } else {
      // TODO:
      let alert = this.alertCtrl.create({
        title: 'Attention',
        message: 'Choisir heure et minutes',
        buttons: ['OK']
      });
      alert.present();
    }

    /*if (Object.prototype.toString.call(this.estimation) === "[object Date]") {
      // it is a date
      if (isNaN(this.estimation.getTime())) {  // d.valueOf() could also work
        let alert = this.alertCtrl.create({
          title: 'Temps invalid',
          message: 'Veuillez choisir à nouveau le temps',
          buttons: ['OK']
        });
        alert.present();
      } else {
        // date is valid

        if (this.heure == null && this.minute == null) {
          let alert = this.alertCtrl.create({
            title: 'Temps invalid',
            message: 'Veuillez choisir à nouveau le temps',
            buttons: ['OK']
          });
          alert.present();
        } else {
          this.http.get<any>(
            this.url + 'user/create_tmp.php?idService=' +
            this.service.id + "&temps=" + this.temps + "&idUser=" + this.idUser
          ).subscribe( (data) => {
            console.log(data);
            this.save(data);
            this.scheduleNotification();
            this.navCtrl.push('ConfirmationHeurePassagePage')
              .then(() => {
                let index = this.navCtrl.getActive().index - 1;
                this.navCtrl.remove(index, 1)
                  .then((res) => {
                    console.log(res)
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
          }, () => {
            let alert = this.alertCtrl.create({
              title: 'Attention',
              message: 'Pas d\'acces internet',
              buttons: ['OK']
            });
            alert.present();
          })
        }
      }
    } else {
      // not a date
      let alert = this.alertCtrl.create({
        title: 'Temps invalid',
        message: 'Veuillez choisir à nouveau le temps',
        buttons: ['OK']
      });
      alert.present();
    }*/

  }

  goBack() {
    this.navCtrl.pop();
  }

  scheduleNotification() {
    /*let add_minutes =  function (dt, minutes) {
      return new Date(dt.getTime() - minutes*60000);
    }*/

    /*LocalNotifications.schedule({
      notifications: [
        {
          title: "LineUp",
          body: "Vous passerez bientot au guichet",
          id: 1,
          schedule: { at: new Date(this.t.getTime() - 5 * 60000) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });*/

    this.localNotifications.schedule({
      title: 'LineUp',
      text: 'Vous passerez bientot au guichet',
      trigger: {at: new Date(this.t.getTime() - 5 * 60000)}
      // trigger: {at: add_minutes(date1, 10)},
    });
  }

  updateEstimation() {
    this.t = new Date();
    this.t.setHours(this.now.getHours() + (+this.heure), this.now.getMinutes() + (+this.minute));

    this.est_h = this.t.getHours();
    this.est_m = this.t.getMinutes();
  }
}
