import { Coords } from './coords';

export interface Place {
  address: string,
  coords: google.maps.LatLngLiteral
}
