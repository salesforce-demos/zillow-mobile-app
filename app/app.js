import {ViewChild} from '@angular/core';
import {App, Platform, Alert} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {WelcomePage} from './pages/welcome/welcome';
import {PropertyListPage} from './pages/property-list/property-list';
import {BrokerListPage} from './pages/broker-list/broker-list';
import {FavoriteListPage} from './pages/favorite-list/favorite-list';
import {PropertyService} from './services/property-service';
import {BrokerService} from './services/broker-service';
import {PushService} from './services/push-service';
import * as force from './force';

@App({
    templateUrl: 'build/app.html',
    config: {
        mode: "ios"
    },
    queries: {
        nav: new ViewChild('content')
    },
    providers: [PropertyService, BrokerService, PushService]
})
class MyApp {

    static get parameters() {
        return [[Platform], [PushService]];
    }

    constructor(platform, pushService) {

        this.platform = platform;
        this.pushService = pushService;

        this.initializeApp();

        this.pages = {
            welcome: WelcomePage,
            propertyList: PropertyListPage,
            brokerList: BrokerListPage,
            favoriteList: FavoriteListPage
        };

        this.rootPage = WelcomePage;
    }

    initializeApp() {

        this.platform.ready().then(() => {

            StatusBar.styleDefault();

            force.init({
                appId: "3MVG9sG9Z3Q1Rlbc4tkIx2fI3ZYblYiG9oMxlbHO3gixLK8CcH.342BxX6L7NT8W4iND3lT9h52sAq1KtTIiz",
                proxyURL: "https://dev-cors-proxy.herokuapp.com/"
            });
            force.login().then(() => {
                console.log("logged in");
            });

            if (window.PushNotification) {
                let push = window.PushNotification.init({
                    "ios": {
                        "alert": true,
                        "sound": true,
                        "vibration": true,
                        "badge": true
                    }
                });

                push.on('registration', data => {
                    this.pushService.register(force.getUserId(), data.registrationId).subscribe();
                    console.log("registration event: " + data.registrationId);
                });

                push.on('notification', data => {
                    if (data.additionalData.foreground) {
                        let alert = Alert.create({
                            title: "Price Change",
                            subTitle: data.message,
                            buttons: ['OK']
                        });
                        this.nav.present(alert);
                    }
                });

                push.on('error', e => {
                    console.log("push error = " + e.message);
                });
            }

        });

    }

    openPage(page) {
        this.nav.setRoot(page);
    }

    logoutUser() {
        force.logout();
    }

}
