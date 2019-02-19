import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { RestProvider } from '../../services/restProvider'
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'modal.html'
})

export class ModalPage {
  rating: number = 1;
  comment: string;
  selectedOrder = [];
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public events: Events, public navParams: NavParams, public viewCtrl : ViewController, public restProvider: RestProvider) {
     events.subscribe('star-rating:changed', (starRating) => {
       console.log(starRating);
       this.rating = starRating;
     });
  }

  public closeModal(){
    this.viewCtrl.dismiss();
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

  doneReview () {
    let data = {
      "comment" : this.comment,
      "rating" : this.rating
    }

    // this.restProvider.addReview(data).subscribe(success => {
    //   console.log(success);
    //   if (success){
    //     this.viewCtrl.dismiss();
    //     this.showToast('middle', 'You have successfully registered. Please login!', 5000);
    //   } else {
    //     this.showToast('middle', 'An error occurred', 5000);
    //   }
    // });
  }
}
