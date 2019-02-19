import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingModule } from 'ionic3-star-rating';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { SignInPage } from '../pages/signIn/signIn';
import { SignUpPage } from '../pages/signUp/signUp';
import { ResetPasswordPage } from '../pages/resetPassword/resetPassword';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { ModalPage } from '../pages/modal/modal';
import { OrdersPage } from '../pages/orders/orders';
import { OrderDetailPage } from '../pages/orderDetail/orderDetail';
import { RestProvider } from '../services/restProvider';

@NgModule({
  declarations: [
    MyApp,
    SignInPage,
    SignUpPage,
    ResetPasswordPage,
    TabsPage,
    ModalPage,
    HomePage,
    ProfilePage,
    OrdersPage,
    OrderDetailPage,
  ],
  imports: [
    BrowserModule,
    StarRatingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInPage,
    SignUpPage,
    ResetPasswordPage,
    TabsPage,
    ModalPage,
    HomePage,
    ProfilePage,
    OrdersPage,
    OrderDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
