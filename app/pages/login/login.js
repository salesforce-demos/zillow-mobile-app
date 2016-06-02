import {Page, NavController, ViewController, Loading} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

    static get parameters() {
        return [[NavController], [ViewController]];
    }

    constructor(nav, viewCtrl) {
        this.nav = nav;
        this.viewCtrl = viewCtrl;
    }

    login() {
        let loading = Loading.create({
            content: 'Authenticating...'
        });

        this.nav.present(loading);

        setTimeout(() => {
            loading.dismiss();
            this.viewCtrl.dismiss();
        }, 1000);
    }

}