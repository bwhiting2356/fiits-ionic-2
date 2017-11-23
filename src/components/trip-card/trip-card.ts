import { ApplicationRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripData } from '../../shared/tripData/tripData';
import { MapsAPILoader } from '@agm/core';

import { getTotalPrice } from '../../shared/tripData/getTotalPrice';
import { getTotalTime } from '../../shared/tripData/getTotalTime';
import { getTotalDistance } from '../../shared/tripData/getTotalDistance';

@Component({
  selector: 'trip-card',
  templateUrl: 'trip-card.html'
})
export class TripCardComponent implements OnInit {
  @Input() trip: TripData;
  @Input() index: number;
  @Input() upcoming: boolean;
  isNextTrip: boolean;
  @Output() tripClicked = new EventEmitter();
  bounds: google.maps.LatLngBounds;

  get totalPrice() {
    return getTotalPrice(this.trip);
  }

  get totalTime() {
    return getTotalTime(this.trip);
  }

  get totalDistance() {
    return getTotalDistance(this.trip);
  }

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      this.bounds = new google.maps.LatLngBounds()
      this.bounds.extend(this.trip.origin.coords);
      this.bounds.extend(this.trip.destination.coords);
    })
  }

  ngOnInit() {
    this.isNextTrip = this.index === 0 && this.upcoming;
  }

  onCardClick($event) {
    this.tripClicked.emit(this.trip)
  }

}
