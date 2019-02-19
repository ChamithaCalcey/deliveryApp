import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { ModalPage } from '../modal/modal'

@Component({
  selector: 'page-orderDetail',
  templateUrl: 'orderDetail.html'
})

export class OrderDetailPage {
  selectedOrder = [];
  
  constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams, public modalCtrl : ModalController) {
      console.log(this.navParams.get('selectedOrder'));
      this.selectedOrder = this.navParams.get('selectedOrder');
  }

  completeOrder () {
    var modalPage = this.modalCtrl.create(ModalPage);
    modalPage.present();
  }
}
