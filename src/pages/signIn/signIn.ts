import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { SignUpPage } from '../signUp/signUp';
import { ResetPasswordPage } from '../resetPassword/resetPassword';
import { TabsPage } from '../tabs/tabs';
import { RestProvider } from '../../services/restProvider'

@Component({
  selector: 'page-signIn',
  templateUrl: 'signIn.html'
})
export class SignInPage {
  signInModel = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public toastCtrl: ToastController) {

  }

  navigateToSignUp() {
    this.navCtrl.push(SignUpPage, {});
  }

  navigateToResetPassword() {
    this.navCtrl.push(ResetPasswordPage, {});
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

  signInForm(form) {
    this.restProvider.getUser(form.value).then(success => {
      console.log(success);
      if (success){
        this.navCtrl.push(TabsPage, {});
        this.showToast('middle', 'You have successfully Logged!', 5000);
      } else {
        this.showToast('middle', 'Unauthorized', 5000);
      }
    });

    console.log(form.value);
  }
}
