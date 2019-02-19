import { Component } from '@angular/core';
import { NavController, App, AlertController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../services/restProvider';
import { SignInPage } from '../signIn/signIn';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  loading: any;
  userDetail = {
    username: '',
    address: '',
    mobileNumber: '',
    created_date: '',
  }

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public appCtrl: App, public alertCtrl: AlertController, public loadingController:LoadingController) {
    this.getUserDetails();
  }

  getUserDetails() {
    this.loading = this.loadingController.create({ content: "Loading..." });
    this.loading.present();
    this.restProvider.getUserDetails().subscribe(data => {
      console.log(data);
      if (data != null){
        console.log(data);
        this.userDetail = data.apdsUser;
      } else {
        console.log("error loading orders");
      }

      this.loading.dismissAll();
    });
  }

  promptAlert()
  {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to logout?',
      buttons: [
        {
            text: 'Yes',
            handler: () => {
                alert.dismiss(true);
                return false;
            }
        }, {
            text: 'No',
            handler: () => {
                alert.dismiss(false);
                return false;
            }
        }
      ]
    });

    return alert;
  }

  logoutUser() {
    let alert = this.promptAlert();
    alert.present();
    alert.onDidDismiss((data) => {
      if (data){
        this.restProvider.clearStorage();
        this.appCtrl.getRootNav().setRoot(SignInPage);
      }
    });
  }
}
