import {OnInit} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {PropertyDetailsPage} from '../property-details/property-details';
import {PropertyService} from '../../services/property-service';

@Page({
    templateUrl: 'build/pages/property-list/property-list.html'
})
export class PropertyListPage {

    static get parameters() {
        return [[NavController], [PropertyService]];
    }

    constructor(nav, propertyService) {
        this.nav = nav;
        this.propertyService = propertyService;
        this.view = "map";
    }

    ngOnInit() {
        this.propertyService.findAll().then(properties => this.properties = properties);
    }

    itemTapped(event, property) {
        this.nav.push(PropertyDetailsPage, {
            property: property
        });
    }

    itemFavorited(event, property) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    itemBlocked(event, property) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    toggleView() {
        this.view = this.view === "map" ? "list" : "map";
    }


}