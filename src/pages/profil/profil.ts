import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {User} from "../model/user";
import {UserProvider} from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  @ViewChild('inputNom') inputNom;
  @ViewChild('inputPrenom') inputPrenom;
  @ViewChild('inputTel') inputTel;

  user = {} as User;
  data: any;
  edNom: boolean = false;
  edPrenom: boolean = false;
  edTel: boolean = false;
  notification = false;
  sms = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public userProvider: UserProvider) {

    this.data = JSON.parse(localStorage.getItem("user"));

    this.user.email = this.data.email;
    this.user.nom = this.data.nom;
    this.user.prenom = this.data.prenom;
    this.user.tel = this.data.tel;

    if (localStorage.getItem("notification")) {
      this.notification = Boolean(localStorage.getItem("notification"));
    }

    if (localStorage.getItem("sms")) {
      this.notification = Boolean(localStorage.getItem("sms"));
    }

  }

  savePassword() {
    let alert = this.alertCtrl.create({
      title: 'Modifier votre de passe',
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Nouveau mot de passe..',
          type: 'password'
        },
        {
          name: 'newPasswordConfirm',
          placeholder: 'Confirmer mot de passe..',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Annuler');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            if (data.newPassword != data.newPasswordConfirm) {
              let alert = this.alertCtrl.create({
                title: 'Echec Modification',
                message: 'Les mots de passe ne se correspondent pas.',
                buttons: [
                  {
                    text: 'Reessayer',
                    handler: () => {
                      this.savePassword();
                    }
                  }
                ]
              });
              alert.present();
            } else if (data.newPassword.length < 6) {
              let alert = this.alertCtrl.create({
                title: 'Echec Modification',
                message: 'Votre mot de passe doit avoir 6 caractères minimum',
                buttons: ['Reessayer']
              });
              alert.present();
            } else {
              this.user.password = data.newPassword;
              this.userProvider.updatePassword(this.user)
                .subscribe((res) => {
                  console.log(res);
                  if (res.error == null) {
                    let alert = this.alertCtrl.create({
                      title: 'Mot de passe modifié',
                      message: 'Votre mot de passe a bien été mis à jour!',
                      buttons: ['OK']
                    });
                    alert.present();
                  } else {
                    let alert = this.alertCtrl.create({
                      title: 'Erreur',
                      message: 'Nos serveurs sont maintenance.. Reessayer plutard svp',
                      buttons: ['OK']
                    });
                    alert.present();
                  }
                }, error => {
                  console.log(error);
                  let alert = this.alertCtrl.create({
                    title: 'Problème de connexion',
                    message: 'Vous n\'avez pas accès à internet',
                    buttons: ['OK']
                  });
                  alert.present();
                });
            }

          }
        }
      ]
    });
    alert.present();
  }

  updateUser() {
    const loader = this.loadingCtrl.create({
      content: "Chargement..."
    });
    loader.present();

    this.userProvider.updateUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          loader.dismiss();
        },
        error => {
          console.log(error);
          loader.dismiss();
        }
      )
  }

  logout() {
    let c = confirm("Souhaiter-vous vraiment vous deconnecter?");
    if (c) {
      localStorage.removeItem('user');
      this.navCtrl.setRoot('ConnexionPage');
    }
  }

  save() {
    this.updateUser();
    let user = JSON.stringify(this.user);
    localStorage.setItem("user", user);
    // alert("Informations modifiées");
  }

  toggleNomTrue() {
    this.edNom = true;
  }

  toggleNomFalse() {
    this.edNom = false;
    this.save();
  }

  togglePrenomTrue() {
    this.edPrenom = true;
  }

  togglePrenomFalse() {
    this.edPrenom = false;
    this.save();
  }

  toggleTelTrue() {
    this.edTel = true;
  }

  toggleTelFalse() {
    this.edTel = false;
    this.save();
  }

  changeNotif() {
    console.log("Par Notification = " + this.notification);
    localStorage.setItem('notication', this.notification + '');
  }

  changeSMS() {
    console.log("Par SMS = " + this.sms);
    localStorage.setItem('sms', this.sms + '');
  }

}
