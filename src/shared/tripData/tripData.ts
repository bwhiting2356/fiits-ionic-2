import { TravelData } from '../travelData';
import { Place } from '../place';

export interface TripData {
  origin: Place;
  departureTime: Date;
  walking1Travel: TravelData
  station1: {
    time: Date,
    price: number,
    address: string,
    coords: google.maps.LatLngLiteral,
  };
  bicyclingTravel: TravelData;
  bicyclingPrice: number;
  station2: {
    time: Date,
    price: number,
    address: string,
    coords: google.maps.LatLngLiteral,
  };
  walking2Travel: TravelData
  destination: Place;
  arrivalTime: Date;
}
 // TODO: add a place for directions points/polyline
