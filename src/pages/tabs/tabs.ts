import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { OrdersPage } from '../orders/orders';

@Component({
    templateUrl: 'tabs.html'
})

export class TabsPage {
    home = HomePage;
    orders = OrdersPage;
    profile = ProfilePage;

    constructor(public navCtrl: NavController) {
    }
}