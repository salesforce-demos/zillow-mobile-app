import {OnInit} from '@angular/core';
import {Page, Modal, NavController, NavParams, Toast, ActionSheet} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {BrokerDetailsPage} from '../broker-details/broker-details';
import {PropertyService} from '../../services/property-service';


@Page({
    templateUrl: 'build/pages/property-details/property-details.html'
})
export class PropertyDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [PropertyService]];
    }

    constructor(nav, navParams, propertyService) {
        this.nav = nav;
        this.propertyService = propertyService;
        this.property = navParams.get('property');
        this.loggedIn = false;
    }

    ngOnInit() {
        this.propertyService.findById(this.property.id).then(property => this.property = property);
    }


    login() {
        let loginPage = Modal.create(LoginPage);
        this.nav.present(loginPage);
    }

    favorite(event, property) {

        if (this.loggedIn) {
            this.propertyService.favorite(property)
                .then(() => {
                    let toast = Toast.create({
                        message: 'Home saved',
                        cssClass: 'mytoast',
                        duration: 1000
                    });
                    this.nav.present(toast);
                })
                .catch(error => {
                    console.log(error);
                    if (error[0].message === "duplicate") {
                        let toast = Toast.create({
                            message: 'Home was already saved',
                            cssClass: 'mytoast',
                            duration: 1000
                        });
                        this.nav.present(toast);
                    }
                });
        } else {
            this.login();
            this.loggedIn = true;
        }

    }

    like(event, property) {
        // Simulated in this sample. See "Favorite" for similar functionality.
        this.property.likes++;
    }

    share(event, property) {
        let actionSheet = ActionSheet.create({
            buttons: [
                {
                    text: 'Text',
                    handler: () => {
                        console.log('Text clicked');
                    }
                },
                {
                    text: 'Email',
                    handler: () => {
                        console.log('Email clicked');
                    }
                },
                {
                    text: 'Facebook',
                    handler: () => {
                        console.log('Facebook clicked');
                    }
                },
                {
                    text: 'Twitter',
                    handler: () => {
                        console.log('Twitter clicked');
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        this.nav.present(actionSheet);
    }

    showBroker(event, broker) {
        this.nav.push(BrokerDetailsPage, {
            broker: broker
        });
    }

}