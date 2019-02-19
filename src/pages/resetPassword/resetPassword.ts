import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignInPage } from '../signIn/signIn'

@Component({
  selector: 'page-ResetPassword',
  templateUrl: 'resetPassword.html'
})
export class ResetPasswordPage {
  resetPasswordModel = {
    email: '',
  }

  constructor(public navCtrl: NavController) {

  }

  navigateToSignIn(){
    this.navCtrl.push(SignInPage, {});
  }

  resetPasswordForm(form){
    console.log(form.value);
    this.navigateToSignIn();
  }
}
