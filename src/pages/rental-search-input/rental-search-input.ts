import { AfterViewInit, ApplicationRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps'
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import {
  DestinationChange, DestinationItemChosen, OriginChange,
  OriginItemChosen
} from '../../store/search/search.actions';


@Component({
  selector: 'page-rental-search-input',
  templateUrl: 'rental-search-input.html',
  providers: [Keyboard]
})
export class RentalSearchInputPage implements OnInit, AfterViewInit {
  @ViewChild('search') search;
  get showSpinner() {
    if (this.search) {
      return this.search.value.length > 0 && this.autocompleteItems.length === 0;
    } else {
      return this.autocompleteItems.length === 0;
    }
  }

  get showMessage() {
    return !this.showSpinner && this.autocompleteItems.length === 0;
  }

  title: string;
  autocompleteItems = [];
  query = '';
  autocompleteService: google.maps.places.AutocompleteService;
  geocodeService: google.maps.Geocoder;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private mapsAPILoader: MapsAPILoader,
              private store: Store<AppState>,
              private ngZone: NgZone,
              private applicationRef: ApplicationRef) {}


  ionViewDidLoad() {
    this.title = this.navParams.get('title');
    this.query = this.navParams.get('value');
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.geocodeService = new google.maps.Geocoder();

      if (this.query) {
        this.updateSearch();
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {  // TODO: is there a better way of doing this?
      this.search.setFocus();
    }, 500)
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: google.maps.places.AutocompletePrediction) {
    if (this.title === 'Origin') {
      this.store.dispatch(new OriginItemChosen(item.place_id));
      this.store.dispatch(new OriginChange(item.description));
    } else if (this.title === 'Destination') {
      this.store.dispatch(new DestinationItemChosen(item.place_id));
      this.store.dispatch(new DestinationChange(item.description));
    }
    this.viewCtrl.dismiss();
  }

  updateSearch() {
    if (this.query === '') {
      this.autocompleteItems = [];
      return;
    }

    this.autocompleteService.getPlacePredictions(
      { input: this.query },
      (predictions: google.maps.places.AutocompletePrediction[], status) => {
        this.autocompleteItems = [];
        if (predictions) {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        }
        this.applicationRef.tick();  // TODO: there's probably a better way
      });
  }
}
