import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Geolocation} from '@ionic-native/geolocation';
import {InAppBrowser} from '@ionic-native/in-app-browser';

/**
 * Generated class for the ChoixAgence2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choix-agence2',
  templateUrl: 'choix-agence2.html',
})
export class ChoixAgence2Page {
  agences = [];
  locations = [];
  photoURL: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public http: HttpClient,
              public geolocation: Geolocation,
              public inappBrowser: InAppBrowser) {
    if (this.navParams.get('agence')) {
      this.agences = this.navParams.get('agence');

      for (let i = 0; i < this.agences.length; i++) {
        this.locations.push(this.agences[i].coord);
      }
    }
    this.photoURL = this.navParams.get('photoURL');
    if (this.locations.length > 0) {
      this.getCurrentLocation();
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToChoixService(agence) {
    if (agence.url == null) {
      let alert = this.alertCtrl.create({
        title: 'Attention',
        message: 'Cet agence n\'est configurée! Veuillez en choisir une autre S.V.P',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.navCtrl.push('ChoixService2Page', {agence: agence, photoURL: this.photoURL});
    }
  }

  getCurrentLocation() {
    /*for (let i = 0; i < this.agences.length; i++) {
      this.agences[i].distance = "calcul en cours";
    }*/
    this.agences.map((agence) => {
      agence.distance = "calcul en cours";
    });
    navigator.geolocation.getCurrentPosition(
      (resp) => {
        /*
        let coord = {
          "latLng": {
            "lng": resp.coords.longitude,
            "lat": resp.coords.latitude
          }
        }
        this.locations.unshift(coord);

        this.getItineraire();
        */

        this.agences.forEach(agence => {
          agence.distance = this.distance(
            resp.coords.latitude,
            resp.coords.longitude,
            agence.coord.lat,
            agence.coord.lng,
            "K");
        });

        this.agences.map(agence => agence.distance = agence.distance + " Km");

        //this.agences.map("km");
      }, () => {
        let alert = this.alertCtrl.create({
          title: 'Attention',
          message: 'Impossible d\'obtenir position actuelle',
          buttons: ['OK']
        });
        alert.present();
        this.agences.map((agence) => {
          agence.distance = "erreur";
        });
      });
    /*this.geolocation.getCurrentPosition(
      {maximumAge: 1000, timeout: 5000,
        enableHighAccuracy: true }
        ).then((resp) => {
          let coord = {
            "latLng": {
              "lng": resp.coords.longitude,
              "lat": resp.coords.latitude
            }
          }
          this.locations.unshift(coord);

          this.getItineraire();
        }, er => {
          let alert = this.alertCtrl.create({
            title: 'Attention',
            message: 'Impossible d\'obtenir position actuelle',
            buttons: ['OK']
          });
          alert.present();
        }).catch((error) => {
          console.log(error);
        });*/
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344
      }
      if (unit == "N") {
        dist = dist * 0.8684
      }
      return dist.toFixed(1);
    }
  }

  getItineraire() {
    let locat = {
      "locations": this.locations,
      "options": {
        "allToAll": false,
        "manyToOne": true,
        "unit": "k"
      }
    };

    this.http.post<any>("http://www.mapquestapi.com/directions/v2/routematrix?key=Cecg1kckAFYm99PDr1JyeDivBFceeAdR", locat)
      .subscribe(
        (data: any) => {
          if (data.distance) {
            for (let i = 0; i < this.agences.length; i++) {
              this.agences[i].distance = data.distance[i + 1];
            }
          } else {
            console.log(data);
            // alert(JSON.stringify(data));
          }
        }, (error) => {
          console.log(error);
          let alert = this.alertCtrl.create({
            title: 'Attention',
            message: 'Impossible d\'obtenir de trouver un itineraire',
            buttons: ['OK']
          });
          alert.present();
        }
      )

  }

  openItineraire(agence) {
    let lat = agence.coord.lat;
    let lng = agence.coord.lng;
    const link = `http://www.google.com/maps/place/${lat},${lng}`;
    const options = 'location=no';
    this.inappBrowser.create(link, '_system', options);
  }

}
