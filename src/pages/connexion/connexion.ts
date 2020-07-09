import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {User} from "../model/user";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {
  tabConn: boolean = false;
  user = {} as User;
  confirm: string = "";
  code = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    this.checkLogin();
  }


  basculer() {
    this.tabConn = !this.tabConn;
  };

  checkLogin() {
    if (localStorage.getItem('user')) {
      this.navCtrl.setRoot('HomePage');
    }
  }

  async login(user: User) {
    const loader = this.loadingCtrl.create({
      content: "Connexion..."
    });
    await loader.present();

    await this.userProvider.login(user)
      .subscribe(
        res => {
          loader.dismiss();
          console.log(res);
          if (res.user != null) {
            localStorage.setItem('user', JSON.stringify(res.user));
            this.navCtrl.setRoot('HomePage');
          } else if (res.user == null) {
            // TODO: afficer message d'erreur
            alert("Nom d'utilisateur ou mot de passe incorrect");
          }
        },
        err => {
          // TODO: Afficher l'erreur
          console.log(err);
          loader.dismiss();
        }
      )

  }

  async register(user: User) {
    console.log(user);
    this.userProvider.register(user)
      .subscribe(
        (res) => {
          console.log(res);
          if (res.user_exist) {
            // TODO: afficher erreur
            alert("Cet email existe");
          } else if (res.error != null) {
            // TODO: afficher erreur
            alert("Le serveur est occupee");
          } else if (res.user != null) {
            localStorage.setItem('user', JSON.stringify(res.user));
            this.navCtrl.setRoot('HomePage');
          }
        },
        () => {
          let alert = this.alertCtrl.create({
            title: 'Erreur',
            message: 'Une erreur s\'est produite. Veuillez reéssayer plutard',
            buttons: ['OK']
          });
          alert.present();
        }
      );
  }

  forget() {
    let alert = this.alertCtrl.create({
      title: 'Mot de passe oublié',
      inputs: [
        {
          name: 'email',
          placeholder: 'Votre adresse email',
          type: 'email'
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
            this.checkEmail(data.email);
          }
        }
      ]
    });
    alert.present();
  }

  async checkEmail(email) {
    // TODO: Show loading
    this.user.email = email;
    await this.userProvider.resetPassword(this.user)
      .subscribe(
        res => {
          this.code = res.code;
          console.log(this.code);
          this.showCodeDialog();
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Erreur',
            message: 'Une erreur s\'est produite. Veuillez reéssayer plutard',
            buttons: ['OK']
          });
          alert.present();
          console.log(err);
        }
      )
  }

  showNewPasswordDialog() {
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
                      this.showNewPasswordDialog();
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

  showCodeDialog() {
    let alert = this.alertCtrl.create({
      title: `Entrez le code recu dans votre email ${this.user.email}`,
      inputs: [
        {
          name: 'code',
          placeholder: '',
          type: 'number'
        },
      ],
      buttons:
        [
          {
            text: 'Annuler',
            role: 'cancel',
            handler: () => {
              console.log('Annuler');
            }
          },
          {
            text: 'Continuer',
            handler: data => {
              if (parseInt(data.code) === this.code) {
                this.showNewPasswordDialog();
              } else {
                let alert = this.alertCtrl.create({
                  title: 'Attention',
                  message: 'Le code saisi n\'est pas correct!',
                  buttons: ['OK']
                });
                alert.present();
              }
            }
          }
        ]
    });
    alert.present();
  }

}
