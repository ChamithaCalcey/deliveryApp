import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, LoadingController } from 'ionic-angular';

import { RestProvider } from '../../services/restProvider'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  inquiryModel = {
    make: '',
    model: '',
    notes: '',
    autopart: '',
    address: '',
    mobile: ''
  }

  loading: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public toastCtrl: ToastController, public loadingController:LoadingController) {
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

  submitInquiryForm (form){
    this.loading = this.loadingController.create({ content: "Loading..." });
    this.loading.present();
    console.log(form.value);
    this.restProvider.createOrder(form.value).subscribe(success => {
      console.log(success);
      if (success){
        form.resetForm();
        this.showToast('middle', 'We have recieved your inquiry. We will get back to you as soon as possible. Thank you!', 5000);
      } else {
        this.showToast('middle', 'An error occurred', 5000);
      }

      this.loading.dismissAll();
    });
  }
}
