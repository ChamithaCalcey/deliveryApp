
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment'

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'http://68.183.176.139:8082/auto-parts-dilivery-system-ws/';

@Injectable()
export class RestProvider {
    constructor(private http: HttpClient, private storage: Storage) {
        
    }

    getUser = (formdata) => {
        const httpOptions = {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json' 
            }),
        };
        
        let body = {
            'username':formdata.username,
            'password':formdata.password,
        };

        return new Promise(resolve => {
            this.http.post(apiUrl + 'login', body, httpOptions).subscribe(data => {
                console.log(data['Authorization']);
                let userToken = data['Authorization'];
                this.storage.set('userJWTToken', userToken);
                this.storage.set('userEmail', formdata.username);
                resolve(true);
            }, err => {
                console.log(err);
                resolve(false);
            });
        });
    }

    createUser = (formdata) => {
        let body = {
            'username':formdata.email,
            'mobileNumber':formdata.mobile,
            'password':formdata.password,
            "userType":'MOBILE',
            'address':formdata.address,
            'createdBy':null
        };
        
        return new Promise(resolve => {
            this.http.post(apiUrl + 'auth-user-service/register/apds/user', body).subscribe(data => {
                console.log(data);
                resolve(true);
            }, err => {
                console.log(false);
                resolve(false);
            });
        });
    }
    
    createOrder(formData): Observable<any> {
       return new Observable((observer) => {
            let userToken = null;
            let httpOptions = null;
            let userEmail = null;

            var tokenPromise = this.storage.get('userJWTToken');
            var emailPromise = this.storage.get('userEmail');

            Promise.all([tokenPromise, emailPromise]).then((results) => {
                console.log(results[0]);
                console.log(results[1]);
                userToken = results[0];
                userEmail = results[1];

                httpOptions = {
                    headers: new HttpHeaders({ 
                        'Content-Type': 'application/json',
                        'Authorization': userToken 
                    }),
                };
                console.log(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
                let body = {
                    "vehicleMake":formData.make,
                    "vehicleModel":formData.model,
                    "requestedAutoParts":formData.autopart,
                    "dliveryAddress":formData.address,
                    "dliveryDate":"2018-10-25 00:00:00",
                    "dliveryStatus":"PENDING",
                    "mobileNumber":formData.mobile,
                    "notes":formData.notes,
                    "username":userEmail,
                    "inquiryDate":moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                    "createdBy":"ADMIN_RAJITH"
                }
        
                return new Promise(resolve => {
                    this.http.post(apiUrl + 'apds-inquiry-service/add/inquiry', body, httpOptions).subscribe(data => {
                        console.log(data);
                        observer.next(true);
                        observer.complete();
                    }, err => {
                        console.log(err);
                        observer.next(false);
                        observer.complete();
                    });
                });
            });
        })
    }

    clearStorage = () => {
        this.storage.clear();
    }

    getUserDetails(): Observable<any> {
        return new Observable((observer) => {
            let userToken = null;
            let httpOptions = null;
            let userEmail = null;

            var tokenPromise = this.storage.get('userJWTToken');
            var emailPromise = this.storage.get('userEmail');

            Promise.all([tokenPromise, emailPromise]).then((results) => {
                console.log(results[0]);
                console.log(results[1]);
                userToken = results[0];
                userEmail = results[1];

                httpOptions = {
                    headers: new HttpHeaders({ 
                        'Content-Type': 'application/json',
                        'Authorization': userToken 
                    }),
                };
                
                let body = {
                    "username": userEmail,
                }
        
                return new Promise(resolve => {
                    this.http.post(apiUrl + 'auth-user-service/user/find/by/email', body, httpOptions).subscribe(data => {
                        console.log(data);
                        observer.next(data);
                        observer.complete();
                    }, err => {
                        console.log(err);
                        observer.next(null);
                        observer.complete();
                    });
                });
            });
        })
        
    }

    getOrders = () => {
        return new Observable((observer) => {
            // this.storage.clear();
            let userToken = null;
            let httpOptions = null;
            let userEmail = null;

            var tokenPromise = this.storage.get('userJWTToken');
            var emailPromise = this.storage.get('userEmail');

            Promise.all([tokenPromise, emailPromise]).then((results) => {
                console.log(results[0]);
                console.log(results[1]);
                userToken = results[0];
                userEmail = results[1];

                httpOptions = {
                    headers: new HttpHeaders({ 
                        'Content-Type': 'application/json',
                        'Authorization': userToken 
                    }),
                };

                let body = {
                    "username" : userEmail,
                }
    
                return new Promise(resolve => {
                    this.http.post(apiUrl + 'apds-inquiry-service/orders/find/by/email', body, httpOptions).subscribe(data => {
                        console.log(data);
                        observer.next(data);
                        observer.complete();
                    }, err => {
                        console.log(err);
                        observer.next(null);
                        observer.complete();
                    });
                });
            });
        })
    }

    // addReview = (data) => {
    //     return new Observable((observer) => {
    //         let userToken = null;
    //         let httpOptions = null;
    //         let userEmail = null;

    //         var tokenPromise = this.storage.get('userJWTToken');
    //         var emailPromise = this.storage.get('userEmail');

    //         Promise.all([tokenPromise, emailPromise]).then((results) => {
    //             console.log(results[0]);
    //             console.log(results[1]);
    //             userToken = results[0];
    //             userEmail = results[1];

    //             httpOptions = {
    //                 headers: new HttpHeaders({ 
    //                     'Content-Type': 'application/json',
    //                     'Authorization': userToken 
    //                 }),
    //             };
                
    //             let body = {
    //                 "username": userEmail,
    //                 "comment": data.comment,
    //                 "rating": data.rating,
    //             }
        
    //             return new Promise(resolve => {
    //                 this.http.post(apiUrl + '', body, httpOptions).subscribe(data => {
    //                     console.log(data);
    //                     observer.next(true);
    //                     observer.complete();
    //                 }, err => {
    //                     console.log(err);
    //                     observer.next(false);
    //                     observer.complete();
    //                 });
    //             });
    //         });
    //     })
    // }
}

