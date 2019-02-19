import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { OrderDetailPage } from '../orderDetail/orderDetail'
import { RestProvider } from '../../services/restProvider'

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  loading: any;
  timeline: string = "recent";
  userRecentOrders = [];
  userCompletedOrders = [];

  constructor(public navCtrl: NavController, public restProvider: RestProvider, public loadingController:LoadingController) {

  }

  ionViewWillEnter(){
    this.getOrders();
  }

  getOrders = () => {
    this.loading = this.loadingController.create({ content: "Loading..." });
    this.loading.present();
    this.restProvider.getOrders().subscribe(data => {
      console.log(data);
      if (data != null) {
        let recentOrders = [];
        let completedOrders = [];
        
        data['inquiry'].forEach(order => {
          if (order.deliveryStatus == 'COMPLETED') {
            completedOrders.push(order);
          } else {
            recentOrders.push(order);
          }
        });
        
        this.userRecentOrders = recentOrders;
        this.userCompletedOrders = completedOrders;
      } else {
        console.log("error loading orders");
      }

      this.loading.dismissAll();
    });
  }

  showOrder(order) {
    console.log(order);
    this.navCtrl.push(OrderDetailPage, {"selectedOrder": order});
  }
}
