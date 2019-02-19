import { Component } from '@angular/core';
import { NavController, Keyboard } from 'ionic-angular';
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
    this.restProvider.getUser(form.value).then(data => {
      console.log(data);
      if (data['status'] != 401){
        this.navCtrl.push(TabsPage, {});
        this.showToast('middle', 'Successfully Logged-in!', 5000);
      } else {
        this.showToast('middle', data['message'], 5000);
      }
    });

    console.log(form.value);
  }
}
