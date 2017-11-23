import { Component, Input } from '@angular/core';
import { TripData } from '../../shared/tripData/tripData';
import { fakeResult } from '../../store/search/fakeResult';
import { getTotalPrice } from '../../shared/tripData/getTotalPrice';
import { getTotalTime } from '../../shared/tripData/getTotalTime';
import { getTotalDistance } from '../../shared/tripData/getTotalDistance';

/**
 * Generated class for the ResultContainerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'trip-details',
  templateUrl: 'trip-details.html'
})
export class TripDetailsComponent {
  @Input() result: TripData;

  get totalPrice() {
    return getTotalPrice(this.result);
  }

  get totalTime() {
    return getTotalTime(this.result);
  }

  get totalDistance() {
    return getTotalDistance(this.result);
  }

}
