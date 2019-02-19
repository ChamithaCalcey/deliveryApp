import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { RestProvider } from '../../services/restProvider'
import { SignInPage } from '../signIn/signIn'

@Component({
  selector: 'page-signUp',
  templateUrl: 'signUp.html'
})
export class SignUpPage {
  signUpModel = {
    email: '',
    username: '',
    address: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  }

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public toastCtrl: ToastController) {

  }

  showToast(position: string, message: string, duration: number) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      dismissOnPageChange: true,
      position: position,
    });

    toast.present(toast);
  }

  singUpForm = (form) => {
    this.restProvider.createUser(form.value).then(success => {
      console.log(success);
      if (success){
        this.navCtrl.push(SignInPage, {});
        this.showToast('middle', 'You have successfully registered. Please login!', 5000);
      } else {
        this.showToast('middle', 'An error occurred', 5000);
      }
    });

    console.log(form.value);
  }
}
