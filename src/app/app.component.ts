import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
	    statusBar.overlaysWebView(true);
      splashScreen.hide();
      /*localNotifications.hasPermission();
      localNotifications.on('click')
        .subscribe((notification) => {
          alert(JSON.stringify(notification));
        });*/
      this.rootPage = this.checkLogin();
    });


    /*
    let app = "18:30";
    console.log(app)
    let date = new Date();
    let jj = date.getDay();
    let mm = date.getMonth();
    let yyyy = date.getFullYear();
    let date1 = new Date(jj + "-" + mm + "-" + yyyy +" " + app + ":00");
    console.log(date1);

    let add_minutes =  function (dt, minutes) {
      return new Date(dt.getTime() - minutes*60000);
  }
  console.log(add_minutes(date1, 20));
  */
  }

  checkLogin() {
    if (localStorage.getItem('user')) {
      return 'HomePage';
    } else {
      return 'ConnexionPage';
    }
  }
}

