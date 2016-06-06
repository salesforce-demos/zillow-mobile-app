import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/notifications/notifications.html'
})
export class NotificationsPage {

    static get parameters() {
        return [[NavController], [NavParams]];
    }

    constructor(nav, navParams) {
        this.nav = nav;
    }

}