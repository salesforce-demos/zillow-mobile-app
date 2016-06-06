import {OnInit} from '@angular/core';
import {Page, Modal, NavController, NavParams, Toast, ActionSheet} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {BrokerDetailsPage} from '../broker-details/broker-details';
import {PropertyService} from '../../services/property-service';
import {PropertyListPage} from '../property-list/property-list';
import {Http,Headers} from "@angular/http";

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
        this.pages = {
            propertyList: PropertyListPage
        };
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
                    var myxhr = new XMLHttpRequest();
                    var url = "https://ingestion-v4jqh2aftc96.us3.sfdcnow.com/streams/homes001/mobile_app001/event";
                    console.log('------------------------------------------');
                    console.log(url);
                    var params = '{"property_id":"a04B00000047jGqIAI","action":"FavoritedProperty"}';
                    myxhr.open("POST", url, true);
                    console.log('------------------------------------------');
                    console.log(myxhr);

                    //Send the proper header information along with the request
                    myxhr.setRequestHeader("Content-type", "application/json");
                    myxhr.setRequestHeader("Authorization", "Bearer X9qJ5ESmBZI9HfxRmQi0G6lJL73lAn9TNJUhKF2vpya2dSD17x9EzzyVr0YEMfo3Lf0bCchyCh8LzbvRAOZwcV");

                    myxhr.onreadystatechange = function() {//Call a function when the state changes.
                        if(myxhr.readyState == 4 && myxhr.status == 200) {
                            console.log(myxhr.responseText);
                            document.getElementById('badgeicon').style.display = 'inline-block';
                        }
                    }
                    console.log('------------------------------------------');
                    console.log(myxhr);

                    myxhr.send(params);
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
                        var myxhr = new XMLHttpRequest();
                        var url = "https://ingestion-v4jqh2aftc96.us3.sfdcnow.com/streams/homes001/mobile_app001/event";
                        console.log('------------------------------------------');
                        console.log(url);
                        var params = '{"property_id":"a04B00000047jGqIAI","action":"FavoritedProperty"}';
                        myxhr.open("POST", url, true);
                        console.log('------------------------------------------');
                        console.log(myxhr);

                        //Send the proper header information along with the request
                        myxhr.setRequestHeader("Content-type", "application/json");
                        myxhr.setRequestHeader("Authorization", "Bearer X9qJ5ESmBZI9HfxRmQi0G6lJL73lAn9TNJUhKF2vpya2dSD17x9EzzyVr0YEMfo3Lf0bCchyCh8LzbvRAOZwcV");

                        myxhr.onreadystatechange = function() {//Call a function when the state changes.
                            if(myxhr.readyState == 4 && myxhr.status == 200) {
                                console.log(myxhr.responseText);
                                document.getElementById('badgeicon').style.display = 'inline-block';
                            }
                        }
                        console.log('------------------------------------------');
                        console.log(myxhr);

                        myxhr.send(params); 
                    }
                });
        } else {
            this.login();
            this.loggedIn = true;
        }

    }
    
    like(event, property) {
        
        // Simulated in this sample. See "Favorite" for similar functionality.
        // this.property.likes++;
        
        var myxhr = new XMLHttpRequest();
        var url = "https://ingestion-v4jqh2aftc96.us3.sfdcnow.com/streams/homes001/mobile_app001/event";
        console.log('------------------------------------------');
        console.log(url);
        var params = '{"action":"FavoritedProperty","property_id":"a04B00000047jGqIAI"}';
        myxhr.open("POST", url, true);
        console.log('------------------------------------------');
        console.log(myxhr);

        //Send the proper header information along with the request
        myxhr.setRequestHeader("Content-type", "application/json");
        myxhr.setRequestHeader("Authorization", "Bearer X9qJ5ESmBZI9HfxRmQi0G6lJL73lAn9TNJUhKF2vpya2dSD17x9EzzyVr0YEMfo3Lf0bCchyCh8LzbvRAOZwcV");

        myxhr.onreadystatechange = function() {//Call a function when the state changes.
            if(myxhr.readyState == 4 && myxhr.status == 200) {
                console.log(myxhr.responseText);
                document.getElementById('badgeicon').style.display = 'inline-block';
            }
        }
        console.log('------------------------------------------');
        console.log(myxhr);

        myxhr.send(params);
        
        /*
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization','Bearer X9qJ5ESmBZI9HfxRmQi0G6lJL73lAn9TNJUhKF2vpya2dSD17x9EzzyVr0YEMfo3Lf0bCchyCh8LzbvRAOZwcV')
        var params = "property_id=a04B00000047jGpIAI&action=test";
        this.Http.post('https://ingestion-v4jqh2aftc96.us3.sfdcnow.com/streams/homes001/process_builder001/event',params, {
        headers: headers
        })
        .map(res => res.json())
        .subscribe(
          data => console.log(data),
          err => console.log(err),
          () => console.log('Authentication Complete')
        );
        */
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

    openPage(page) {
        this.nav.setRoot(page, {viewtype: 'list'});
    }

}