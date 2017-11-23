webpackJsonp([0],{

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RentalSearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rental_search_input_rental_search_input__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_first__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_first__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_startWith__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngrx_store__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_user_user_actions__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agm_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__rental_search_result_rental_search_result__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__store_search_search_actions__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__theme_mapStyles__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var RentalSearchPage = (function () {
    function RentalSearchPage(navCtrl, navParams, modalCtrl, mapsAPILoader, store, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.mapsAPILoader = mapsAPILoader;
        this.store = store;
        this.loadingCtrl = loadingCtrl;
        this.mapStyles = __WEBPACK_IMPORTED_MODULE_10__theme_mapStyles__["a" /* mapStyles */];
    }
    RentalSearchPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.mapsAPILoader.load().then(function () {
            _this.bounds = _this.store.select('search').map(function (search) {
                var bounds = new google.maps.LatLngBounds();
                if (search.originCoords) {
                    bounds.extend(search.originCoords);
                }
                if (search.destinationCoords) {
                    bounds.extend(search.destinationCoords);
                }
                return bounds;
            });
            loading.dismiss();
        }); // TODO: maybe I should load the google maps api during the splash screen or something then I won't have to do this
    };
    RentalSearchPage.prototype.ngOnInit = function () {
        var station = this.navParams.get('station');
        if (station) {
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_9__store_search_search_actions__["j" /* OriginChange */](station.address));
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_9__store_search_search_actions__["k" /* OriginCoordsReceived */](station.coords));
        }
        else {
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_user_user_actions__["i" /* FetchCoords */]());
        }
        this.currentLocation = this.store.select('user', 'currentLocation', 'coords');
        this.fetchingAddress = this.store.select('user', 'fetchingAddress');
        this.originCoords = this.store.select('search', 'originCoords');
        this.destinationCoords = this.store.select('search', 'destinationCoords');
        this.origin = this.store.select('search', 'query', 'origin');
        this.destination = this.store.select('search', 'query', 'destination');
        this.timeTarget = this.store.select('search', 'query', 'timeTarget');
        this.time = this.store.select('search', 'query', 'time');
    };
    RentalSearchPage.prototype.openOriginModal = function ($event) {
        var _this = this;
        $event.preventDefault();
        this.store.first().subscribe(function (store) {
            if (!store.user.fetchingAddress) {
                var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__rental_search_input_rental_search_input__["a" /* RentalSearchInputPage */], {
                    title: 'Origin',
                    value: store.search.query.origin
                });
                modal.present();
                // modal.onDidDismiss(result => {
                //   if (result) {
                //     this.origin = result;
                //   }
                // })
            }
        });
    };
    RentalSearchPage.prototype.openDestinationModal = function ($event) {
        var _this = this;
        $event.preventDefault();
        this.store.first().subscribe(function (store) {
            var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__rental_search_input_rental_search_input__["a" /* RentalSearchInputPage */], {
                title: 'Destination',
                value: store.search.query.destination
            });
            modal.present();
            modal.onDidDismiss(function (result) {
                if (result) {
                    _this.origin = result;
                }
            });
        });
    };
    RentalSearchPage.prototype.onTimeChange = function ($event) {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_9__store_search_search_actions__["s" /* TimeChange */]($event));
    };
    RentalSearchPage.prototype.onTimeTargetChange = function ($event) {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_9__store_search_search_actions__["t" /* TimeTargetChange */]($event));
    };
    RentalSearchPage.prototype.rentalSearch = function (form) {
        var query = form.value;
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_9__store_search_search_actions__["p" /* Search */](query));
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__rental_search_result_rental_search_result__["a" /* RentalSearchResultPage */]);
    };
    RentalSearchPage.prototype.switch = function () {
        var _this = this;
        this.store.first().subscribe(function (store) {
            var originAddress = store.search.query.origin;
            var destinationAddress = store.search.query.destination;
            var originCoords = store.search.originCoords;
            var destinationCoords = store.search.destinationCoords;
            _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_9__store_search_search_actions__["j" /* OriginChange */](destinationAddress));
            _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_9__store_search_search_actions__["d" /* DestinationChange */](originAddress));
            _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_9__store_search_search_actions__["k" /* OriginCoordsReceived */](destinationCoords));
            _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_9__store_search_search_actions__["e" /* DestinationCoordsReceived */](originCoords));
        });
    };
    return RentalSearchPage;
}());
RentalSearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-rental-search',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/rental-search/rental-search.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Rental Search</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div class="content-container">\n    <div class="map-container">\n      <agm-map\n        *ngIf="currentLocation | async"\n        [latitude]="(currentLocation | async).lat "\n        [longitude]="(currentLocation | async).lng"\n        [maxZoom]="16"\n        [fitBounds]="bounds | async"\n        [styles]="mapStyles"\n        [zoomControl]="false"\n        [streetViewControl]="false"\n        gestureHandling="none">\n        <agm-marker\n          *ngIf="originCoords | async"\n          [latitude]="(originCoords | async).lat"\n          [longitude]="(originCoords | async).lng">\n        </agm-marker>\n        <agm-marker\n          *ngIf="destinationCoords | async"\n          [latitude]="(destinationCoords | async).lat"\n          [longitude]="(destinationCoords | async).lng">\n        </agm-marker>\n      </agm-map>\n    </div>\n    <div class="form-container">\n      <form\n        #form="ngForm"\n        (ngSubmit)="rentalSearch(form)"\n        class="search-form">\n        <ion-item *ngIf="!(fetchingLocation | async)" id="origin-item">\n          <ion-icon name="pin" item-start></ion-icon>\n          <ion-label stacked>Origin</ion-label>\n          <ion-input\n            [placeholder]="(fetchingAddress | async) ? \'Fetching your location...\' : \'Enter your start location\'"\n            id="origin"\n            type="text"\n            name="origin"\n            [ngModel]="origin | async"\n            required\n            (click)="openOriginModal($event)"\n            (touchstart)="openOriginModal($event)"\n            [disabled]="fetchingLocation | async">\n          </ion-input>\n          <ion-spinner *ngIf="fetchingAddress | async" item-end></ion-spinner>\n        </ion-item>\n        <ion-item id="destination-item">\n          <ion-icon name="pin" item-start></ion-icon>\n          <ion-label stacked>Destination</ion-label>\n          <ion-input\n            placeholder="Enter your destination"\n            id="destination"\n            type="text"\n            name="destination"\n            ngModel\n            (click)="openDestinationModal($event)"\n            (touchstart)="openDestinationModal($event)"\n            [ngModel]="destination | async">\n          </ion-input>\n        </ion-item>\n        <img\n          id="switch"\n          (click)="switch()"\n          src="assets/imgs/switch.svg" alt="">\n        <ion-item id="time-target-item">\n          <ion-icon name="arrow-round-forward" item-start></ion-icon>\n          <ion-segment\n            [ngModel]="timeTarget | async"\n            (ngModelChange)="onTimeTargetChange($event)"\n            name="timeTarget">\n            <ion-segment-button value="DEPART">Depart at</ion-segment-button>\n            <ion-segment-button value="ARRIVE">Arrive by</ion-segment-button>\n          </ion-segment>\n        </ion-item>\n        <ion-item id="time-item">\n          <ion-icon name="clock" item-start></ion-icon>\n          <ion-datetime\n            displayFormat="MMM DD, h:mm A"\n            [ngModel]="(time | async).toISOString()"\n            (ngModelChange)="onTimeChange($event)"\n            name="time"></ion-datetime>\n        </ion-item>\n        <div id="button-container-area" class="button-container">\n          <button\n            padding\n            ion-button\n            block\n            [disabled]="!form.valid"\n            type="submit">Find bike rentals\n          </button>\n        </div>\n      </form>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/rental-search/rental-search.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_7__agm_core__["c" /* MapsAPILoader */],
        __WEBPACK_IMPORTED_MODULE_5__ngrx_store__["h" /* Store */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], RentalSearchPage);

//# sourceMappingURL=rental-search.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mapStyles; });
var mapStyles = [
    {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }]
    }
];
//# sourceMappingURL=mapStyles.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GMAP_KEY; });
var GMAP_KEY = 'AIzaSyAwPYOksRcTuVdLW4qRxj86I9_w0uJ7OqU';
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 198:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 198;

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RentalSearchInputPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngrx_store__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_search_search_actions__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RentalSearchInputPage = (function () {
    function RentalSearchInputPage(navCtrl, navParams, viewCtrl, mapsAPILoader, store, ngZone, applicationRef) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.mapsAPILoader = mapsAPILoader;
        this.store = store;
        this.ngZone = ngZone;
        this.applicationRef = applicationRef;
        this.autocompleteItems = [];
        this.query = '';
    }
    Object.defineProperty(RentalSearchInputPage.prototype, "showSpinner", {
        get: function () {
            if (this.search) {
                return this.search.value.length > 0 && this.autocompleteItems.length === 0;
            }
            else {
                return this.autocompleteItems.length === 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RentalSearchInputPage.prototype, "showMessage", {
        get: function () {
            return !this.showSpinner && this.autocompleteItems.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    RentalSearchInputPage.prototype.ionViewDidLoad = function () {
        this.title = this.navParams.get('title');
        this.query = this.navParams.get('value');
    };
    RentalSearchInputPage.prototype.ngOnInit = function () {
        var _this = this;
        this.mapsAPILoader.load().then(function () {
            _this.autocompleteService = new google.maps.places.AutocompleteService();
            _this.geocodeService = new google.maps.Geocoder();
            if (_this.query) {
                _this.updateSearch();
            }
        });
    };
    RentalSearchInputPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.search.setFocus();
        }, 500);
    };
    RentalSearchInputPage.prototype.onCancel = function () {
        this.viewCtrl.dismiss();
    };
    RentalSearchInputPage.prototype.chooseItem = function (item) {
        if (this.title === 'Origin') {
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_5__store_search_search_actions__["l" /* OriginItemChosen */](item.place_id));
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_5__store_search_search_actions__["j" /* OriginChange */](item.description));
        }
        else if (this.title === 'Destination') {
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_5__store_search_search_actions__["f" /* DestinationItemChosen */](item.place_id));
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_5__store_search_search_actions__["d" /* DestinationChange */](item.description));
        }
        this.viewCtrl.dismiss();
    };
    RentalSearchInputPage.prototype.updateSearch = function () {
        var _this = this;
        if (this.query === '') {
            this.autocompleteItems = [];
            return;
        }
        this.autocompleteService.getPlacePredictions({ input: this.query }, function (predictions, status) {
            _this.autocompleteItems = [];
            if (predictions) {
                predictions.forEach(function (prediction) {
                    _this.autocompleteItems.push(prediction);
                });
            }
            _this.applicationRef.tick(); // TODO: there's probably a better way
        });
    };
    return RentalSearchInputPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('search'),
    __metadata("design:type", Object)
], RentalSearchInputPage.prototype, "search", void 0);
RentalSearchInputPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-rental-search-input',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/rental-search-input/rental-search-input.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button (click)="onCancel()">\n        Cancel\n      </button>\n    </ion-buttons>\n    <ion-title>{{ title }}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-searchbar\n    #search\n    clearInput\n    placeholder="Address or place name"\n    [(ngModel)]="query"\n    (ionInput)="updateSearch()"\n    (ionCancel)="dismiss()">\n  </ion-searchbar>\n  <ion-spinner class="center-spinner" *ngIf="showSpinner"></ion-spinner>\n  <div class="center-message" *ngIf="showMessage">Enter a place name or address</div>\n  <ion-list>\n    <ion-item *ngFor="let item of autocompleteItems" tappable (click)="chooseItem(item)">\n      <ion-icon name="pin" item-start></ion-icon>\n      {{ item.description }}\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/rental-search-input/rental-search-input.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__ionic_native_keyboard__["a" /* Keyboard */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__agm_core__["c" /* MapsAPILoader */],
        __WEBPACK_IMPORTED_MODULE_4__ngrx_store__["h" /* Store */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
], RentalSearchInputPage);

//# sourceMappingURL=rental-search-input.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RentalSearchResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__theme_mapStyles__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agm_core__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RentalSearchResultPage = (function () {
    function RentalSearchResultPage(navCtrl, navParams, store) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.mapStyles = __WEBPACK_IMPORTED_MODULE_2__theme_mapStyles__["a" /* mapStyles */];
    }
    RentalSearchResultPage.prototype.ngOnInit = function () {
        this.result = this.store.select('search', 'result');
        this.bounds = this.store.select('search', 'result').map(function (result) {
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(result.destination.coords);
            bounds.extend(result.origin.coords);
            return bounds;
        });
    };
    return RentalSearchResultPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4__agm_core__["b" /* AgmMap */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__agm_core__["b" /* AgmMap */])
], RentalSearchResultPage.prototype, "myMap", void 0);
RentalSearchResultPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-rental-search-result',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/rental-search-result/rental-search-result.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Search Result</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-spinner class="center-spinner" *ngIf="!(result | async)"></ion-spinner>\n  <div *ngIf="(result | async)" class="content-container">\n    <div class="map-container">\n      <agm-map\n        [zoom]="16"\n        [zoomControl]="false"\n        [fitBounds]="bounds | async"\n        [streetViewControl]="false"\n        [styles]="mapStyles"\n        [zoomControl]="false"\n        [streetViewControl]="false">\n        <agm-marker\n          [iconUrl]="\'assets/imgs/origin.svg\'"\n          [latitude]="(result | async).origin.coords.lat"\n          [longitude]="(result | async).origin.coords.lng">\n        </agm-marker>\n        <agm-marker\n          [iconUrl]="\'assets/imgs/station.svg\'"\n          [latitude]="(result | async).station1.coords.lat"\n          [longitude]="(result | async).station1.coords.lng">\n        </agm-marker>\n        <agm-marker\n          [iconUrl]="\'assets/imgs/station.svg\'"\n          [latitude]="(result | async).station2.coords.lat"\n          [longitude]="(result | async).station2.coords.lng">\n        </agm-marker>\n        <agm-marker\n          [iconUrl]="\'assets/imgs/destination.svg\'"\n          [latitude]="(result | async).destination.coords.lat"\n          [longitude]="(result | async).destination.coords.lng">\n        </agm-marker>\n      </agm-map>\n    </div>\n    <div class="results-and-button">\n      <trip-details [result]="result | async"></trip-details>\n      <div class="button-container">\n        <button\n          padding\n          ion-button\n          block\n          type="submit">Book reservation package\n        </button>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/rental-search-result/rental-search-result.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */]])
], RentalSearchResultPage);

//# sourceMappingURL=rental-search-result.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__theme_mapStyles__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_user_user_actions__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rental_search_rental_search__ = __webpack_require__(125);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var fakeStations = [
    {
        address: '587 Eddy St, San Francisco, CA 94109',
        coords: {
            lat: 37.783207,
            lng: -122.417295
        }
    }
];
var MapPage = (function () {
    function MapPage(navCtrl, navParams, store) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.mapStyles = __WEBPACK_IMPORTED_MODULE_2__theme_mapStyles__["a" /* mapStyles */];
        this.stations = fakeStations;
    }
    MapPage.prototype.ngOnInit = function () {
        this.currentLocation = this.store.select('user', 'currentLocation', 'coords');
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_5__store_user_user_actions__["i" /* FetchCoords */]());
    };
    MapPage.prototype.searchFromStation = function (index) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__rental_search_rental_search__["a" /* RentalSearchPage */], { station: this.stations[index] });
    };
    return MapPage;
}());
MapPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-map',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/map/map.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Map</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content>\n  <div class="map-container" *ngIf="currentLocation | async">\n    <agm-map\n      [latitude]="(currentLocation | async).lat "\n      [longitude]="(currentLocation | async).lng"\n      [zoom]="16"\n      [styles]="mapStyles">\n      <agm-marker\n        *ngFor="let station of stations; let i = index"\n        [latitude]="station.coords.lat"\n        [longitude]="station.coords.lng">\n        <agm-info-window>\n          {{ station.address }}\n          <button\n            (click)="searchFromStation(i)"\n            block\n            ion-button>Search from this station</button>\n        </agm-info-window>\n      </agm-marker>\n    </agm-map>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/map/map.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */]])
], MapPage);

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trip_detail_trip_detail__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_search_fakeTrips__ = __webpack_require__(362);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TripsPage = (function () {
    function TripsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.time = 'upcoming';
        this.trips = __WEBPACK_IMPORTED_MODULE_3__store_search_fakeTrips__["a" /* fakeTrips */];
    }
    Object.defineProperty(TripsPage.prototype, "tripsToShow", {
        get: function () {
            return this.trips[this.time];
        },
        enumerable: true,
        configurable: true
    });
    TripsPage.prototype.onTripClicked = function ($event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__trip_detail_trip_detail__["a" /* TripDetailPage */], { trip: $event });
    };
    return TripsPage;
}());
TripsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-trips',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/trips/trips.html"*/'<!--\n  Generated template for the TripsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Trips</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-segment [(ngModel)]="time" color="secondary">\n    <ion-segment-button value="upcoming">\n      Upcoming\n    </ion-segment-button>\n    <ion-segment-button value="past">\n      Past\n    </ion-segment-button>\n  </ion-segment>\n  <div class="center-message" *ngIf="tripsToShow.length === 0">No trips to show</div>\n  <ion-list>\n    <trip-card\n      *ngFor="let trip of tripsToShow; let i = index"\n      [trip]="trip"\n      [index]="i"\n      [upcoming]="time == \'upcoming\'"\n      (tripClicked)="onTripClicked($event)">\n    </trip-card>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/trips/trips.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], TripsPage);

//# sourceMappingURL=trips.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agm_core__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TripDetailPage = (function () {
    function TripDetailPage(navCtrl, navParams, mapsAPILoader) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mapsAPILoader = mapsAPILoader;
        this.trip = this.navParams.get('trip');
        this.mapsAPILoader.load().then(function () {
            _this.bounds = new google.maps.LatLngBounds();
            _this.bounds.extend(_this.trip.origin.coords);
            _this.bounds.extend(_this.trip.destination.coords);
        });
    }
    TripDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TripDetailPage');
    };
    return TripDetailPage;
}());
TripDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-trip-detail',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/trip-detail/trip-detail.html"*/'<!--\n  Generated template for the TripDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Trip Details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="content-container">\n    <div class="map-container">\n      <agm-map\n        [zoom]="16"\n        [zoomControl]="false"\n        [fitBounds]="bounds"\n        [streetViewControl]="false"\n        [styles]="mapStyles"\n        [zoomControl]="false"\n        [streetViewControl]="false">\n        <agm-marker\n          [iconUrl]="\'assets/imgs/origin.svg\'"\n          [latitude]="trip.origin.coords.lat"\n          [longitude]="trip.origin.coords.lng">\n        </agm-marker>\n        <agm-marker\n          [iconUrl]="\'assets/imgs/station.svg\'"\n          [latitude]="trip.station1.coords.lat"\n          [longitude]="trip.station1.coords.lng">\n        </agm-marker>\n        <agm-marker\n          [iconUrl]="\'assets/imgs/station.svg\'"\n          [latitude]="trip.station2.coords.lat"\n          [longitude]="trip.station2.coords.lng">\n        </agm-marker>\n        <agm-marker\n          [iconUrl]="\'assets/imgs/destination.svg\'"\n          [latitude]="trip.destination.coords.lat"\n          [longitude]="trip.destination.coords.lng">\n        </agm-marker>\n      </agm-map>\n    </div>\n    <div class="details-and-button">\n      <trip-details [result]="trip"></trip-details>\n      <div class="button-container">\n        <button\n          padding\n          ion-button\n          block\n          type="submit">Book reservation package\n        </button>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/trip-detail/trip-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__agm_core__["c" /* MapsAPILoader */]])
], TripDetailPage);

//# sourceMappingURL=trip-detail.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_auth0_js__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_auth0_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_auth0_js__);
// src/app/auth/auth.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { Router } from '@angular/router';


var auth0Config = {
    // needed for auth0
    clientID: 'TobrJNkQAdTNZuvUb7AS09hmunDE1fQJ',
    // needed for auth0cordova
    clientId: 'TobrJNkQAdTNZuvUb7AS09hmunDE1fQJ',
    domain: 'fiits.auth0.com',
    callbackURL: location.href,
    packageIdentifier: 'io.ionic.starter.auth0'
};
var AuthService = (function () {
    function AuthService() {
        this.auth0 = new __WEBPACK_IMPORTED_MODULE_2_auth0_js__["WebAuth"]({
            clientID: 'TobrJNkQAdTNZuvUb7AS09hmunDE1fQJ',
            domain: 'fiits.auth0.com',
            responseType: 'token id_token',
            audience: 'https://fiits.auth0.com/userinfo',
            redirectUri: 'http://localhost:8100',
            scope: 'openid'
        });
    }
    AuthService.prototype.handleAuthentication = function () {
        var _this = this;
        this.auth0.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                _this.setSession(authResult);
                // this.router.navigate(['/home']);
            }
            else if (err) {
                // this.router.navigate(['/home']);
                console.log(err);
            }
        });
    };
    AuthService.prototype.setSession = function (authResult) {
        // Set the time that the access token will expire at
        var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    };
    AuthService.prototype.logout = function () {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        // this.router.navigate(['/']);
    };
    AuthService.prototype.login = function () {
        this.auth0.authorize();
    };
    AuthService.prototype.isAuthenticated = function () {
        // Check whether the current time is past the
        // access token's expiry time
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], AuthService);

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment_method_payment_method__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_money_add_money__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__withdraw_money_withdraw_money__ = __webpack_require__(273);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var fakeTransactions = [
    {
        description: 'Reservation package',
        date: new Date(),
        amount: 5.04
    },
    {
        description: 'Reservation package',
        date: new Date(),
        amount: 5.04
    },
    {
        description: 'Reservation package',
        date: new Date(),
        amount: -5.04
    },
    {
        description: 'Withdrawl',
        date: new Date(),
        amount: -5.04
    }
];
var PaymentPage = (function () {
    function PaymentPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.prepaidCredit = 5.67;
        this.earnedRewards = 3.67;
        this.promotional = 10.00;
        this.transactions = fakeTransactions;
    }
    Object.defineProperty(PaymentPage.prototype, "balance", {
        get: function () {
            return this.prepaidCredit + this.earnedRewards + this.promotional;
        },
        enumerable: true,
        configurable: true
    });
    PaymentPage.prototype.isPositive = function (transaction) {
        return transaction.amount > 0;
    };
    PaymentPage.prototype.editPaymentMethod = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__payment_method_payment_method__["a" /* PaymentMethodPage */]);
    };
    PaymentPage.prototype.onAddMoney = function () {
        var addMoney = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__add_money_add_money__["a" /* AddMoneyPage */]);
        addMoney.present();
    };
    PaymentPage.prototype.onWithdrawMoney = function () {
        var withdrawMoney = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__withdraw_money_withdraw_money__["a" /* WithdrawMoneyPage */]);
        withdrawMoney.present();
    };
    return PaymentPage;
}());
PaymentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-payment',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/payment/payment.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Payment</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-item-divider class="divider">\n      <h2 item-start>Balance</h2>\n      <span item-end class="balance">{{ balance | currency:\'USD\':true }}</span>\n    </ion-item-divider>\n    <ion-item *ngIf="prepaidCredit">\n      <span>Pre-paid credit</span>\n      <span item-end>{{ prepaidCredit | currency:\'USD\':true }}</span>\n    </ion-item>\n    <ion-item *ngIf="earnedRewards">\n      <span>Earned rewards</span>\n      <span item-end>{{ earnedRewards | currency:\'USD\':true }}</span>\n    </ion-item>\n    <ion-item *ngIf="promotional">\n      <span>Promotional</span>\n      <span item-end>{{ promotional | currency:\'USD\':true }}</span>\n    </ion-item>\n    <div class="button-group">\n      <button ion-button (click)="onAddMoney()">Add Money</button>\n      <button ion-button (click)="onWithdrawMoney()">Withdraw Money</button>\n    </div>\n    <ion-item-divider class="divider">\n      <h2 item-start>Payment Method</h2>\n    </ion-item-divider>\n    <button ion-item no-lines (click)="editPaymentMethod()">\n      <ion-icon name="card" item-left></ion-icon>\n      *2976\n    </button>\n    <ion-item-divider class="divider">\n      <h2 item-start>Transactions</h2>\n    </ion-item-divider>\n    <ion-list>\n      <ion-item *ngFor="let transaction of transactions">\n        <h2>{{ transaction.description }}</h2>\n        <p>{{ transaction.date | date:\'mediumDate\'}}</p>\n        <span item-end [ngClass]="{positive: isPositive(transaction)}">{{ transaction.amount | currency:\'USD\':true }}</span>\n      </ion-item>\n    </ion-list>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/payment/payment.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], PaymentPage);

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentMethodPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the PaymentMethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PaymentMethodPage = (function () {
    function PaymentMethodPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    return PaymentMethodPage;
}());
PaymentMethodPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-payment-method',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/payment/payment-method/payment-method.html"*/'<!--\n  Generated template for the PaymentMethodPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Payment Method</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/payment/payment-method/payment-method.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], PaymentMethodPage);

//# sourceMappingURL=payment-method.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddMoneyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AddMoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddMoneyPage = (function () {
    function AddMoneyPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    AddMoneyPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return AddMoneyPage;
}());
AddMoneyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add-money',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/payment/add-money/add-money.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">Cancel</button>\n    </ion-buttons>\n\n    <ion-title>Add Money</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  (Under construction)\n</ion-content>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/payment/add-money/add-money.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
], AddMoneyPage);

//# sourceMappingURL=add-money.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WithdrawMoneyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the WithdrawMoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WithdrawMoneyPage = (function () {
    function WithdrawMoneyPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    WithdrawMoneyPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return WithdrawMoneyPage;
}());
WithdrawMoneyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-withdraw-money',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/payment/withdraw-money/withdraw-money.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">Cancel</button>\n    </ion-buttons>\n\n    <ion-title>Withdraw Money</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  (Under construction)\n</ion-content>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/pages/payment/withdraw-money/withdraw-money.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
], WithdrawMoneyPage);

//# sourceMappingURL=withdraw-money.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return userInitialState; });
var userInitialState = {
    currentLocation: {
        address: '',
        coords: {
            lat: 37.777939,
            lng: -122.415085
        }
    },
    fetchingCoords: false,
    fetchingAddress: false
};
//# sourceMappingURL=user.state.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return searchInitialState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_timeTarget__ = __webpack_require__(404);

var searchInitialState = {
    query: {
        origin: '',
        destination: '',
        timeTarget: __WEBPACK_IMPORTED_MODULE_0__shared_timeTarget__["a" /* TimeTarget */].DEPART,
        time: new Date()
    },
    originCoords: undefined,
    destinationCoords: undefined,
    fetching: false,
    result: undefined
};
//# sourceMappingURL=search.state.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getTotalPrice; });
var getTotalPrice = function (trip) {
    return (trip.station1.price
        + trip.station2.price
        + trip.bicyclingPrice);
};
//# sourceMappingURL=getTotalPrice.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getTotalTime; });
var getTotalTime = function (trip) {
    return (trip.walking1Travel.time
        + trip.walking2Travel.time
        + trip.bicyclingTravel.time);
};
//# sourceMappingURL=getTotalTime.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getTotalDistance; });
var getTotalDistance = function (trip) {
    return (trip.walking1Travel.distance
        + trip.walking2Travel.distance
        + trip.bicyclingTravel.distance);
};
//# sourceMappingURL=getTotalDistance.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(294);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environment_environment__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__agm_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__environment_constants__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_rental_search_rental_search__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_rental_search_input_rental_search_input__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_rental_search_result_rental_search_result__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_map_map__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_payment_payment__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_payment_payment_method_payment_method__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_payment_add_money_add_money__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_payment_withdraw_money_withdraw_money__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_trips_trips__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_trip_detail_trip_detail__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_geolocation__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_geolocation_service__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ngrx_store__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__store_reducer__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ngrx_effects__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__store_effects__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ngrx_store_devtools__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_components_module__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_auth_service__ = __webpack_require__(258);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// Angular Google Maps


// Pages










// Geolocation


// Ngrx







var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_13__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_rental_search_rental_search__["a" /* RentalSearchPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_rental_search_input_rental_search_input__["a" /* RentalSearchInputPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_rental_search_result_rental_search_result__["a" /* RentalSearchResultPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_trips_trips__["a" /* TripsPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_trip_detail_trip_detail__["a" /* TripDetailPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_payment_payment__["a" /* PaymentPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_payment_payment_method_payment_method__["a" /* PaymentMethodPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_payment_add_money_add_money__["a" /* AddMoneyPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_payment_withdraw_money_withdraw_money__["a" /* WithdrawMoneyPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_8__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: __WEBPACK_IMPORTED_MODULE_9__environment_constants__["a" /* GMAP_KEY */],
                libraries: ['places']
            }),
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_27__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_22__ngrx_store__["i" /* StoreModule */].forRoot(__WEBPACK_IMPORTED_MODULE_23__store_reducer__["a" /* reducer */]),
            !__WEBPACK_IMPORTED_MODULE_6__environment_environment__["a" /* environment */].production ? __WEBPACK_IMPORTED_MODULE_26__ngrx_store_devtools__["a" /* StoreDevtoolsModule */].instrument() : [],
            __WEBPACK_IMPORTED_MODULE_24__ngrx_effects__["c" /* EffectsModule */].forRoot(__WEBPACK_IMPORTED_MODULE_25__store_effects__["a" /* effects */]),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_13__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_rental_search_rental_search__["a" /* RentalSearchPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_rental_search_input_rental_search_input__["a" /* RentalSearchInputPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_rental_search_result_rental_search_result__["a" /* RentalSearchResultPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_trips_trips__["a" /* TripsPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_trip_detail_trip_detail__["a" /* TripDetailPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_payment_payment__["a" /* PaymentPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_payment_payment_method_payment_method__["a" /* PaymentMethodPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_payment_add_money_add_money__["a" /* AddMoneyPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_payment_withdraw_money_withdraw_money__["a" /* WithdrawMoneyPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_21__services_geolocation_service__["a" /* GeolocationService */],
            __WEBPACK_IMPORTED_MODULE_28__services_auth_service__["a" /* AuthService */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_rental_search_rental_search__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_map_map__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_trips_trips__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_auth_service__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_payment_payment__ = __webpack_require__(270);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, authService, toastCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.menuCtrl = menuCtrl;
        this.authService = authService;
        this.toastCtrl = toastCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_rental_search_rental_search__["a" /* RentalSearchPage */];
        this.rentalSearchPage = __WEBPACK_IMPORTED_MODULE_4__pages_rental_search_rental_search__["a" /* RentalSearchPage */];
        this.tripsPage = __WEBPACK_IMPORTED_MODULE_6__pages_trips_trips__["a" /* TripsPage */];
        this.paymentPage = __WEBPACK_IMPORTED_MODULE_8__pages_payment_payment__["a" /* PaymentPage */];
        this.mapPage = __WEBPACK_IMPORTED_MODULE_5__pages_map_map__["a" /* MapPage */];
        this.authService.handleAuthentication();
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.onLoad = function (page) {
        this.nav.setRoot(page);
        this.menuCtrl.close();
    };
    MyApp.prototype.onLogIn = function () {
        this.authService.login();
    };
    MyApp.prototype.onLogout = function () {
        var _this = this;
        this.menuCtrl.close().then(function () {
            _this.authService.logout();
            var toast = _this.toastCtrl.create({
                message: 'You are now logged out',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
        });
    };
    Object.defineProperty(MyApp.prototype, "isAuthenticated", {
        get: function () {
            return this.authService.isAuthenticated();
        },
        enumerable: true,
        configurable: true
    });
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('nav'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/app/app.html"*/'<ion-menu [content]="nav">\n  <ion-header>\n    <ion-toolbar>\n      <ion-buttons start>\n        <button ion-button icon-only menuToggle>\n          <ion-icon name="close"></ion-icon>\n        </button>\n      </ion-buttons>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-list>\n      <ion-item-group>\n        <button\n          ion-item\n          (click)="onLoad(rentalSearchPage)">\n          <ion-icon name="search" item-left></ion-icon>\n          Rental Search\n        </button>\n        <button\n          ion-item\n          (click)="onLoad(mapPage)">\n          <ion-icon name="pin" item-left></ion-icon>\n          Map\n        </button>\n        <button\n          ion-item\n          *ngIf="isAuthenticated"\n          (click)="onLoad(tripsPage)">\n          <ion-icon name="bicycle" item-left></ion-icon>\n          Trips\n        </button>\n        <button\n          ion-item\n          *ngIf="isAuthenticated"\n          (click)="onLoad(paymentPage)">\n          <ion-icon name="card" item-left></ion-icon>\n          Payment\n        </button>\n      </ion-item-group>\n      <ion-item-group>\n        <ion-item-divider color="light"></ion-item-divider>\n        <button\n          ion-item\n          (click)="onLogIn()"\n          *ngIf="!isAuthenticated">\n          <ion-icon name="log-in" item-left></ion-icon>\n          Log In / Sign Up\n        </button>\n\n        <button\n          ion-item\n          (click)="onLogout()"\n          *ngIf="isAuthenticated">\n          <ion-icon name="log-in" item-left></ion-icon>\n          Logout\n        </button>\n      </ion-item-group>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav [root]="rootPage" #nav></ion-nav>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_7__services_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fakeTrips; });
var fakeTrips = {
    upcoming: [{
            origin: {
                address: '236 King St',
                coords: {
                    lat: 37.777789,
                    lng: -122.392460
                }
            },
            departureTime: new Date("2017-11-17T00:49:52+00:00"),
            walking1Travel: {
                distance: 3650,
                time: 58
            },
            station1: {
                time: new Date(),
                price: 0.50,
                address: '201 Berry St',
                coords: {
                    lat: 37.775694,
                    lng: -122.393415
                }
            },
            bicyclingTravel: {
                distance: 4,
                time: 15
            },
            bicyclingPrice: 1.50,
            station2: {
                time: new Date(),
                price: -0.50,
                address: '610 Long Bridge Street',
                coords: {
                    lat: 37.773497,
                    lng: -122.391527
                }
            },
            walking2Travel: {
                distance: 134,
                time: 5
            },
            destination: {
                address: '295 Terry A Francois Blvd',
                coords: {
                    lat: 37.774303,
                    lng: -122.387042,
                }
            },
            arrivalTime: new Date()
        }, {
            origin: {
                address: '236 King St',
                coords: {
                    lat: 37.777789,
                    lng: -122.392460
                }
            },
            departureTime: new Date("2017-11-17T00:50:15+00:00"),
            walking1Travel: {
                distance: 3650,
                time: 58
            },
            station1: {
                time: new Date(),
                price: 0.50,
                address: '201 Berry St',
                coords: {
                    lat: 37.775694,
                    lng: -122.393415
                }
            },
            bicyclingTravel: {
                distance: 4,
                time: 15
            },
            bicyclingPrice: 1.50,
            station2: {
                time: new Date(),
                price: -0.50,
                address: '610 Long Bridge Street',
                coords: {
                    lat: 37.773497,
                    lng: -122.391527
                }
            },
            walking2Travel: {
                distance: 134,
                time: 5
            },
            destination: {
                address: '295 Terry A Francois Blvd',
                coords: {
                    lat: 37.774303,
                    lng: -122.387042,
                }
            },
            arrivalTime: new Date()
        }, {
            origin: {
                address: '236 King St',
                coords: {
                    lat: 37.777789,
                    lng: -122.392460
                }
            },
            departureTime: new Date(),
            walking1Travel: {
                distance: 3650,
                time: 58
            },
            station1: {
                time: new Date(),
                price: 0.50,
                address: '201 Berry St',
                coords: {
                    lat: 37.775694,
                    lng: -122.393415
                }
            },
            bicyclingTravel: {
                distance: 4,
                time: 15
            },
            bicyclingPrice: 1.50,
            station2: {
                time: new Date(),
                price: -0.50,
                address: '610 Long Bridge Street',
                coords: {
                    lat: 37.773497,
                    lng: -122.391527
                }
            },
            walking2Travel: {
                distance: 134,
                time: 5
            },
            destination: {
                address: '295 Terry A Francois Blvd',
                coords: {
                    lat: 37.774303,
                    lng: -122.387042,
                }
            },
            arrivalTime: new Date()
        }, {
            origin: {
                address: '236 King St',
                coords: {
                    lat: 37.777789,
                    lng: -122.392460
                }
            },
            departureTime: new Date(),
            walking1Travel: {
                distance: 3650,
                time: 58
            },
            station1: {
                time: new Date(),
                price: 0.50,
                address: '201 Berry St',
                coords: {
                    lat: 37.775694,
                    lng: -122.393415
                }
            },
            bicyclingTravel: {
                distance: 4,
                time: 15
            },
            bicyclingPrice: 1.50,
            station2: {
                time: new Date(),
                price: -0.50,
                address: '610 Long Bridge Street',
                coords: {
                    lat: 37.773497,
                    lng: -122.391527
                }
            },
            walking2Travel: {
                distance: 134,
                time: 5
            },
            destination: {
                address: '295 Terry A Francois Blvd',
                coords: {
                    lat: 37.774303,
                    lng: -122.387042,
                }
            },
            arrivalTime: new Date()
        }],
    past: []
};
// fakeResult2, fakeResult2, fakeResult2, fakeResult2
//# sourceMappingURL=fakeTrips.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeolocationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_geolocation__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GeolocationService = (function () {
    function GeolocationService(geolocation) {
        this.geolocation = geolocation;
    }
    GeolocationService.prototype.setLocation = function () {
        var _this = this;
        return this.geolocation.getCurrentPosition().then(function (resp) {
            _this.currentLocation = resp;
            return resp;
        });
    };
    GeolocationService.prototype.getLocation = function () {
        if (this.currentLocation) {
            return Promise.resolve(this.currentLocation);
        }
        else {
            this.setLocation().then(function (resp) {
                return resp;
            });
        }
    };
    return GeolocationService;
}());
GeolocationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_native_geolocation__["a" /* Geolocation */]])
], GeolocationService);

//# sourceMappingURL=geolocation.service.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export initialState */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_user_state__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_user_reducer__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search_state__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search_reducer__ = __webpack_require__(405);




var initialState = {
    user: __WEBPACK_IMPORTED_MODULE_0__user_user_state__["a" /* userInitialState */],
    search: __WEBPACK_IMPORTED_MODULE_2__search_search_state__["a" /* searchInitialState */]
};
var reducer = {
    user: __WEBPACK_IMPORTED_MODULE_1__user_user_reducer__["a" /* userReducer */],
    search: __WEBPACK_IMPORTED_MODULE_3__search_search_reducer__["a" /* searchReducer */]
};
//# sourceMappingURL=reducer.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = userReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_state__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_actions__ = __webpack_require__(70);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


function userReducer(state, action) {
    if (state === void 0) { state = __WEBPACK_IMPORTED_MODULE_0__user_state__["a" /* userInitialState */]; }
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_1__user_actions__["g" /* FETCH_COORDS */]:
            return __assign({}, state, { fetchingCoords: true, fetchingAddress: true });
        case __WEBPACK_IMPORTED_MODULE_1__user_actions__["c" /* COORDS_RECEIVED */]:
            return __assign({}, state, { fetchingCoords: false, currentLocation: { address: '', coords: action.payload } });
        case __WEBPACK_IMPORTED_MODULE_1__user_actions__["f" /* FETCH_ADDRESS */]:
            return __assign({}, state, { fetchingAddress: true });
        case __WEBPACK_IMPORTED_MODULE_1__user_actions__["a" /* ADDRESS_RECEIVED */]:
            return __assign({}, state, { fetchingAddress: false, currentLocation: __assign({}, state.currentLocation, { address: action.payload }) });
        case __WEBPACK_IMPORTED_MODULE_1__user_actions__["e" /* ERROR */]:
            return state;
        default:
            return state;
    }
}
//# sourceMappingURL=user.reducer.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeTarget; });
var TimeTarget = {
    DEPART: 'DEPART',
    ARRIVE: 'ARRIVE'
};
//# sourceMappingURL=timeTarget.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = searchReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search_state__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_actions__ = __webpack_require__(52);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


function searchReducer(state, action) {
    if (state === void 0) { state = __WEBPACK_IMPORTED_MODULE_0__search_state__["a" /* searchInitialState */]; }
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_1__search_actions__["g" /* ORIGIN_CHANGE */]:
            return __assign({}, state, { query: __assign({}, state.query, { origin: action.payload }) });
        case __WEBPACK_IMPORTED_MODULE_1__search_actions__["i" /* ORIGIN_ITEM_CHOSEN */]:
            return __assign({}, state, { fetching: true });
        case __WEBPACK_IMPORTED_MODULE_1__search_actions__["h" /* ORIGIN_COORDS_RECEIVED */]:
            return __assign({}, state, { fetching: false, originCoords: action.payload });
        case __WEBPACK_IMPORTED_MODULE_1__search_actions__["a" /* DESTINATION_CHANGE */]:
            return __assign({}, state, { query: __assign({}, state.query, { destination: action.payload }) });
        case __WEBPACK_IMPORTED_MODULE_1__search_actions__["c" /* DESTINATION_ITEM_CHOSEN */]:
            return __assign({}, state, { fetching: true });
        case __WEBPACK_IMPORTED_MODULE_1__search_actions__["b" /* DESTINATION_COORDS_RECEIVED */]:
            return __assign({}, state, { fetching: false, destinationCoords: action.payload });
        case __WEBPACK_IMPORTED_MODULE_1__search_actions__["r" /* TIME_TARGET_CHANGE */]:
            return __assign({}, state, { query: __assign({}, state.query, { timeTarget: action.payload }) });
        case __WEBPACK_IMPORTED_MODULE_1__search_actions__["q" /* TIME_CHANGE */]:
            return __assign({}, state, { query: __assign({}, state.query, { date: action.payload }) });
        case __WEBPACK_IMPORTED_MODULE_1__search_actions__["o" /* SEARCH */]:
            return __assign({}, state, { fetching: true });
        case __WEBPACK_IMPORTED_MODULE_1__search_actions__["m" /* RESULT_RECEIVED */]:
            return __assign({}, state, { fetching: false, result: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=search.reducer.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return effects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_user_effects__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_search_effects__ = __webpack_require__(420);


var effects = [__WEBPACK_IMPORTED_MODULE_0__user_user_effects__["a" /* UserEffects */], __WEBPACK_IMPORTED_MODULE_1__search_search_effects__["a" /* SearchEffects */]];
//# sourceMappingURL=effects.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserEffects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_effects__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_actions__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_fromPromise__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__agm_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__environment_constants__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__search_search_actions__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var UserEffects = (function () {
    // geocodeService: google.maps.Geocoder;
    function UserEffects(actions$, geolocation, mapsAPILoadier, http) {
        var _this = this;
        this.actions$ = actions$;
        this.geolocation = geolocation;
        this.mapsAPILoadier = mapsAPILoadier;
        this.http = http;
        // ngOnInit() {
        //   this.mapsAPILoadier.load().then(() => {
        //     this.geocodeService = new google.maps.Geocoder();
        //   })
        // }
        this.fetchCoords = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_2__user_actions__["g" /* FETCH_COORDS */])
            .switchMap(function (action) {
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].fromPromise(_this.geolocation.getCurrentPosition());
        })
            .mergeMap(function (resp) {
            var coords = {
                lat: resp.coords.latitude,
                lng: resp.coords.longitude
            };
            return [
                new __WEBPACK_IMPORTED_MODULE_2__user_actions__["d" /* CoordsReceived */](coords),
                new __WEBPACK_IMPORTED_MODULE_13__search_search_actions__["k" /* OriginCoordsReceived */](coords),
                new __WEBPACK_IMPORTED_MODULE_2__user_actions__["h" /* FetchAddress */](coords)
            ];
        })
            .catch(function (err) {
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of(new Error("geolocation error"));
            // TODO: why does this throw an error "Actions must have a type property" when I have a poor connection?
        });
        this.fetchAddress = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_2__user_actions__["f" /* FETCH_ADDRESS */])
            .switchMap(function (action) {
            var requestString = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + action.payload.lat + "," + action.payload.lng + "&key=" + __WEBPACK_IMPORTED_MODULE_11__environment_constants__["a" /* GMAP_KEY */];
            return _this.http.get(requestString);
        })
            .mergeMap(function (response) {
            if (response.results) {
                var address = response.results[0].formatted_address;
                return [
                    new __WEBPACK_IMPORTED_MODULE_2__user_actions__["b" /* AddressReceived */](address),
                    new __WEBPACK_IMPORTED_MODULE_13__search_search_actions__["j" /* OriginChange */](address)
                ];
            }
            else {
                throw new Error('no address');
            }
        });
    }
    return UserEffects;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", Object)
], UserEffects.prototype, "fetchCoords", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", Object)
], UserEffects.prototype, "fetchAddress", void 0);
UserEffects = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["a" /* Actions */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_10__agm_core__["c" /* MapsAPILoader */],
        __WEBPACK_IMPORTED_MODULE_12__angular_common_http__["a" /* HttpClient */]])
], UserEffects);

//# sourceMappingURL=user.effects.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchEffects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_effects__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_actions__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environment_constants__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__fakeResult__ = __webpack_require__(425);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SearchEffects = (function () {
    function SearchEffects(actions$, http) {
        var _this = this;
        this.actions$ = actions$;
        this.http = http;
        this.search = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_6__search_actions__["o" /* SEARCH */])
            .delay(500) // TODO: Take this out when I have a real request
            .map(function (resp) {
            return new __WEBPACK_IMPORTED_MODULE_6__search_actions__["n" /* ResultReceived */](__WEBPACK_IMPORTED_MODULE_9__fakeResult__["a" /* fakeResult */]);
        });
        this.geocodeOriginAddress = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_6__search_actions__["i" /* ORIGIN_ITEM_CHOSEN */])
            .switchMap(function (action) {
            return _this.geocodePlaceId(action.payload);
        })
            .map(function (latlng) {
            return new __WEBPACK_IMPORTED_MODULE_6__search_actions__["k" /* OriginCoordsReceived */](latlng);
        });
        this.geocodeDestinationAddress = this.actions$
            .ofType(__WEBPACK_IMPORTED_MODULE_6__search_actions__["c" /* DESTINATION_ITEM_CHOSEN */])
            .switchMap(function (action) {
            return _this.geocodePlaceId(action.payload);
        })
            .map(function (latlng) {
            return new __WEBPACK_IMPORTED_MODULE_6__search_actions__["e" /* DestinationCoordsReceived */](latlng);
        });
    }
    SearchEffects.prototype.geocodePlaceId = function (placeId) {
        var requestString = "https://maps.googleapis.com/maps/api/geocode/json?place_id=" + placeId + "&key=" + __WEBPACK_IMPORTED_MODULE_7__environment_constants__["a" /* GMAP_KEY */];
        return this.http.get(requestString).map(function (response) {
            return {
                lat: response.results[0].geometry.location.lat,
                lng: response.results[0].geometry.location.lng
            };
        });
    };
    return SearchEffects;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", Object)
], SearchEffects.prototype, "search", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", Object)
], SearchEffects.prototype, "geocodeOriginAddress", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["b" /* Effect */])(),
    __metadata("design:type", Object)
], SearchEffects.prototype, "geocodeDestinationAddress", void 0);
SearchEffects = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngrx_effects__["a" /* Actions */],
        __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["a" /* HttpClient */]])
], SearchEffects);

//# sourceMappingURL=search.effects.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fakeResult; });
var fakeResult = {
    origin: {
        address: '236 King St',
        coords: {
            lat: 37.777789,
            lng: -122.392460
        }
    },
    departureTime: new Date(),
    walking1Travel: {
        distance: 3650,
        time: 58
    },
    station1: {
        time: new Date(),
        price: 0.50,
        address: '201 Berry St',
        coords: {
            lat: 37.775694,
            lng: -122.393415
        }
    },
    bicyclingTravel: {
        distance: 4,
        time: 15
    },
    bicyclingPrice: 1.50,
    station2: {
        time: new Date(),
        price: -0.50,
        address: '610 Long Bridge Street',
        coords: {
            lat: 37.773497,
            lng: -122.391527
        }
    },
    walking2Travel: {
        distance: 134,
        time: 5
    },
    destination: {
        address: '295 Terry A Francois Blvd',
        coords: {
            lat: 37.774303,
            lng: -122.387042,
        }
    },
    arrivalTime: new Date()
};
//# sourceMappingURL=fakeResult.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trip_details_trip_details__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__trip_card_trip_card__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agm_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__ = __webpack_require__(433);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    return ComponentsModule;
}());
ComponentsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__trip_details_trip_details__["a" /* TripDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_4__trip_card_trip_card__["a" /* TripCardComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_5__agm_core__["a" /* AgmCoreModule */],
            __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* PipesModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_1__trip_details_trip_details__["a" /* TripDetailsComponent */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__trip_details_trip_details__["a" /* TripDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_4__trip_card_trip_card__["a" /* TripCardComponent */]
        ]
    })
], ComponentsModule);

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_tripData_getTotalPrice__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_tripData_getTotalTime__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_tripData_getTotalDistance__ = __webpack_require__(282);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ResultContainerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var TripDetailsComponent = (function () {
    function TripDetailsComponent() {
    }
    Object.defineProperty(TripDetailsComponent.prototype, "totalPrice", {
        get: function () {
            return Object(__WEBPACK_IMPORTED_MODULE_1__shared_tripData_getTotalPrice__["a" /* getTotalPrice */])(this.result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripDetailsComponent.prototype, "totalTime", {
        get: function () {
            return Object(__WEBPACK_IMPORTED_MODULE_2__shared_tripData_getTotalTime__["a" /* getTotalTime */])(this.result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripDetailsComponent.prototype, "totalDistance", {
        get: function () {
            return Object(__WEBPACK_IMPORTED_MODULE_3__shared_tripData_getTotalDistance__["a" /* getTotalDistance */])(this.result);
        },
        enumerable: true,
        configurable: true
    });
    return TripDetailsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], TripDetailsComponent.prototype, "result", void 0);
TripDetailsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'trip-details',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/components/trip-details/trip-details.html"*/'<div class="container">\n  <div class="trip-details">\n    <div id="departureTime" class="time">{{ result.departureTime | date:"h:mm a" }}</div>\n    <div id="originIcon" class="icon">\n      <img src="assets/imgs/origin.svg" alt="">\n    </div>\n    <div id="originAddress" class="address">{{ result.origin.address }}</div>\n    <div id="walkingDots1" class="icon">\n      <img\n        *ngFor="let i of [1, 2, 3]"\n        src="assets/imgs/walk-dot.svg" alt="">\n    </div>\n    <div id="walkingTravelInfo1" class="travel-info">\n      <ion-icon name="walk"></ion-icon>\n      <span>Walk {{ result.walking1Travel.time }} min ({{ result.walking1Travel.distance}} ft)</span>\n    </div>\n    <div id="reservation1Time" class="time">{{ result.station1.time | date:"h:mm a" }}</div>\n    <div id="bikeReservationLine" class="icon">\n      <div class="line">\n        <img id="dot-1" src="assets/imgs/station.svg" alt="">\n        <img id="dot-2" src="assets/imgs/station.svg" alt="">\n      </div>\n    </div>\n    <div id="reservation1Desc" class="reservation">Bike pickup reservation</div>\n    <div id="reservation1Address" class="address">{{ result.station1.address}}</div>\n    <div\n      id="reservation1Price"\n      class="price"\n      [ngClass]="{positive: result.station1.price > 0}">\n      {{ result.station1.price | currency:\'USD\':true }}\n    </div>\n    <div id="bikeTravelInfo" class="travel-info">\n      <ion-icon name="bicycle"></ion-icon>\n      <span>Ride {{ result.bicyclingTravel.time }} min ({{ result.bicyclingTravel.distance}} ft)</span>\n    </div>\n    <div\n      id="bikePrice"\n      class="price"\n      [ngClass]="{positive: result.bicyclingPrice > 0}">\n      {{ result.bicyclingPrice | currency:\'USD\':true }}</div>\n    <div id="reservation2Time" class="time">{{ result.station2.time | date:\'h:mm a\'}}</div>\n    <div id="reservation2Desc" class="reservation">Bike dropoff reservation</div>\n    <div id="reservation2Address" class="address">{{ result.station2.address }}</div>\n    <div\n      id="reservation2Price"\n      class="price"\n      [ngClass]="{positive: result.station1.price > 0}">\n      {{ result.station2.price | currency:\'USD\':true }}\n    </div>\n    <div id="walkingDots2" class="icon">\n      <img\n        *ngFor="let i of [1, 2, 3, 4]"\n        src="assets/imgs/walk-dot.svg" alt="">\n    </div>\n    <div id="walkingTravelInfo2" class="travel-info">\n      <ion-icon name="walk"></ion-icon>\n      <span>Walk {{ result.walking2Travel.time }} min ({{ result.walking2Travel.distance }} ft)</span>\n    </div>\n    <div id="arrivalTime" class="time">{{ result.arrivalTime | date:\'h:mm a\'}}</div>\n    <div id="destinationIcon" class="icon">\n      <img src="assets/imgs/destination.svg" alt="">\n    </div>\n    <div id="destinationAddress" class="address">{{ result.destination.address }}</div>\n  </div>\n  <div class="summary">\n    <span id="travel-time">{{ totalTime  | time }}</span>\n    <span id="travel-distance">{{ totalDistance | distance }}</span>\n    <span id="total-cost">Total cost: {{ totalPrice | currency:\'USD\':true }}</span>\n  </div>\n</div>\n\n\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/components/trip-details/trip-details.html"*/
    })
], TripDetailsComponent);

//# sourceMappingURL=trip-details.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agm_core__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_tripData_getTotalPrice__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_tripData_getTotalTime__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_tripData_getTotalDistance__ = __webpack_require__(282);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TripCardComponent = (function () {
    function TripCardComponent(mapsAPILoader) {
        var _this = this;
        this.mapsAPILoader = mapsAPILoader;
        this.tripClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.mapsAPILoader.load().then(function () {
            _this.bounds = new google.maps.LatLngBounds();
            _this.bounds.extend(_this.trip.origin.coords);
            _this.bounds.extend(_this.trip.destination.coords);
        });
    }
    Object.defineProperty(TripCardComponent.prototype, "totalPrice", {
        get: function () {
            return Object(__WEBPACK_IMPORTED_MODULE_2__shared_tripData_getTotalPrice__["a" /* getTotalPrice */])(this.trip);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripCardComponent.prototype, "totalTime", {
        get: function () {
            return Object(__WEBPACK_IMPORTED_MODULE_3__shared_tripData_getTotalTime__["a" /* getTotalTime */])(this.trip);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripCardComponent.prototype, "totalDistance", {
        get: function () {
            return Object(__WEBPACK_IMPORTED_MODULE_4__shared_tripData_getTotalDistance__["a" /* getTotalDistance */])(this.trip);
        },
        enumerable: true,
        configurable: true
    });
    TripCardComponent.prototype.ngOnInit = function () {
        this.isNextTrip = this.index === 0 && this.upcoming;
    };
    TripCardComponent.prototype.onCardClick = function ($event) {
        this.tripClicked.emit(this.trip);
    };
    return TripCardComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], TripCardComponent.prototype, "trip", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Number)
], TripCardComponent.prototype, "index", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Boolean)
], TripCardComponent.prototype, "upcoming", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    __metadata("design:type", Object)
], TripCardComponent.prototype, "tripClicked", void 0);
TripCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'trip-card',template:/*ion-inline-start:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/components/trip-card/trip-card.html"*/'<ion-card\n  class="trip-item"\n  (click)="onCardClick($event)"\n  [class.next-trip]="isNextTrip">\n  <ion-card-header *ngIf="isNextTrip" >\n    Next Trip\n  </ion-card-header>\n  <agm-map\n    [latitude]="trip.origin.coords.lat"\n    [longitude]="trip.origin.coords.lng"\n    [scrollwheel]="false"\n    [fitBounds]="bounds"\n    [zoomControl]="false"\n    [streetViewControl]="false"\n    gestureHandling="none">\n    <agm-marker\n      [iconUrl]="\'assets/imgs/origin.svg\'"\n      [latitude]="trip.origin.coords.lat"\n      [longitude]="trip.origin.coords.lng">\n    </agm-marker>\n    <!-- TODO: add polylines from directions -->\n    <agm-marker\n      [iconUrl]="\'assets/imgs/station.svg\'"\n      [latitude]="trip.station1.coords.lat"\n      [longitude]="trip.station1.coords.lng">\n    </agm-marker>\n    <agm-marker\n      [iconUrl]="\'assets/imgs/station.svg\'"\n      [latitude]="trip.station2.coords.lat"\n      [longitude]="trip.station2.coords.lng">\n    </agm-marker>\n    <agm-marker\n      [iconUrl]="\'assets/imgs/destination.svg\'"\n      [latitude]="trip.destination.coords.lat"\n      [longitude]="trip.destination.coords.lng">\n    </agm-marker>\n  </agm-map>\n  <div class="info-container">\n    <div class="date-time">{{ trip.departureTime | date:\'MMM d, h:mm a\' }} - {{ trip.arrivalTime | date:\'h:mm a\'}}</div>\n    <div class="price" [ngClass]="{positive: totalPrice > 0}">{{ totalPrice | currency:\'USD\':true }}</div>\n    <p class="miles-minutes">\n      {{ totalDistance | distance }}\n      <span class="middot">&#8226;</span>\n      {{ totalTime | time }}</p>\n  </div>\n</ion-card>\n'/*ion-inline-end:"/Users/brendan.whiting/Documents/fiits-ionic-2/src/components/trip-card/trip-card.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__agm_core__["c" /* MapsAPILoader */]])
], TripCardComponent);

//# sourceMappingURL=trip-card.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__distance_distance__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__time_time__ = __webpack_require__(435);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PipesModule = (function () {
    function PipesModule() {
    }
    return PipesModule;
}());
PipesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__distance_distance__["a" /* DistancePipe */],
            __WEBPACK_IMPORTED_MODULE_2__time_time__["a" /* TimePipe */]
        ],
        imports: [],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__distance_distance__["a" /* DistancePipe */],
            __WEBPACK_IMPORTED_MODULE_2__time_time__["a" /* TimePipe */]
        ]
    })
], PipesModule);

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DistancePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the DistancePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var DistancePipe = (function () {
    function DistancePipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    DistancePipe.prototype.transform = function (feet) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (feet < 1000) {
            return feet + 'ft';
        }
        else {
            var miles = feet / 5280;
            var roundedMiles = Math.round(miles * 10) / 10;
            return roundedMiles + 'mi';
        }
    };
    return DistancePipe;
}());
DistancePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */])({
        name: 'distance',
    })
], DistancePipe);

//# sourceMappingURL=distance.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the TimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var TimePipe = (function () {
    function TimePipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    TimePipe.prototype.transform = function (minutes) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (minutes < 60) {
            return minutes + 'm';
        }
        else {
            var hours = minutes / 60;
            var roundedHours = Math.round(hours * 10) / 10;
            return roundedHours + 'h';
        }
    };
    return TimePipe;
}());
TimePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */])({
        name: 'time',
    })
], TimePipe);

//# sourceMappingURL=time.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return ORIGIN_ITEM_CHOSEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return OriginItemChosen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ORIGIN_COORDS_RECEIVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return OriginCoordsReceived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ORIGIN_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return OriginChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DESTINATION_ITEM_CHOSEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return DestinationItemChosen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DESTINATION_COORDS_RECEIVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return DestinationCoordsReceived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DESTINATION_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DestinationChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return TIME_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return TimeChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return TIME_TARGET_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return TimeTargetChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return SEARCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return Search; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return RESULT_RECEIVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return ResultReceived; });
// ********** Search query field changes *********
var ORIGIN_ITEM_CHOSEN = 'ORIGIN_ITEM_CHOSEN';
var OriginItemChosen = (function () {
    function OriginItemChosen(payload) {
        this.payload = payload;
        this.type = ORIGIN_ITEM_CHOSEN;
    }
    return OriginItemChosen;
}());

var ORIGIN_COORDS_RECEIVED = 'ORIGIN_COORDS_RECEIVED';
var OriginCoordsReceived = (function () {
    function OriginCoordsReceived(payload) {
        this.payload = payload;
        this.type = ORIGIN_COORDS_RECEIVED;
    }
    return OriginCoordsReceived;
}());

var ORIGIN_CHANGE = 'ORIGIN_CHANGE';
var OriginChange = (function () {
    function OriginChange(payload) {
        this.payload = payload;
        this.type = ORIGIN_CHANGE;
    }
    return OriginChange;
}());

var DESTINATION_ITEM_CHOSEN = 'DESTINATION_ITEM_CHOSEN';
var DestinationItemChosen = (function () {
    function DestinationItemChosen(payload) {
        this.payload = payload;
        this.type = DESTINATION_ITEM_CHOSEN;
    }
    return DestinationItemChosen;
}());

var DESTINATION_COORDS_RECEIVED = 'DESTINATION_COORDS_RECEIVED';
var DestinationCoordsReceived = (function () {
    function DestinationCoordsReceived(payload) {
        this.payload = payload;
        this.type = DESTINATION_COORDS_RECEIVED;
    }
    return DestinationCoordsReceived;
}());

var DESTINATION_CHANGE = 'DESTINATION_CHANGE';
var DestinationChange = (function () {
    function DestinationChange(payload) {
        this.payload = payload;
        this.type = DESTINATION_CHANGE;
    }
    return DestinationChange;
}());

var TIME_CHANGE = 'TIME_CHANGE';
var TimeChange = (function () {
    function TimeChange(payload) {
        this.payload = payload;
        this.type = TIME_CHANGE;
    }
    return TimeChange;
}());

var TIME_TARGET_CHANGE = 'TIME_TARGET_CHANGE';
var TimeTargetChange = (function () {
    function TimeTargetChange(payload) {
        this.payload = payload;
        this.type = TIME_TARGET_CHANGE;
    }
    return TimeTargetChange;
}());

// ********** Submit request and receive results **********
var SEARCH = 'SEARCH';
var Search = (function () {
    function Search(payload) {
        this.payload = payload;
        this.type = SEARCH;
    }
    return Search;
}());

var RESULT_RECEIVED = 'RESULT_RECEIVED';
var ResultReceived = (function () {
    function ResultReceived(payload) {
        this.payload = payload;
        this.type = RESULT_RECEIVED;
    }
    return ResultReceived;
}());

//# sourceMappingURL=search.actions.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return FETCH_COORDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return FetchCoords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return COORDS_RECEIVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CoordsReceived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ERROR; });
/* unused harmony export Error */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return FETCH_ADDRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return FetchAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADDRESS_RECEIVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AddressReceived; });
// **********  Geolocation  **********
var FETCH_COORDS = 'FETCH_COORDS';
var FetchCoords = (function () {
    function FetchCoords() {
        this.type = FETCH_COORDS;
    }
    return FetchCoords;
}());

var COORDS_RECEIVED = 'COORDS_RECEIVED';
var CoordsReceived = (function () {
    function CoordsReceived(payload) {
        this.payload = payload;
        this.type = COORDS_RECEIVED;
    }
    return CoordsReceived;
}());

var ERROR = 'ERROR';
var Error = (function () {
    function Error(payload) {
        this.payload = payload;
        this.type = ERROR;
    }
    return Error;
}());

var FETCH_ADDRESS = 'FETCH_ADDRESS';
var FetchAddress = (function () {
    function FetchAddress(payload) {
        this.payload = payload;
        this.type = FETCH_ADDRESS;
    }
    return FetchAddress;
}());

var ADDRESS_RECEIVED = 'ADDRESS_RECEIVED';
var AddressReceived = (function () {
    function AddressReceived(payload) {
        this.payload = payload;
        this.type = ADDRESS_RECEIVED;
    }
    return AddressReceived;
}());

//# sourceMappingURL=user.actions.js.map

/***/ })

},[283]);
//# sourceMappingURL=main.js.map