import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationService {
  currentLocation: Geoposition;

  constructor(private geolocation: Geolocation) {}
  setLocation() {
    return this.geolocation.getCurrentPosition().then(resp => {
      this.currentLocation = resp;
      return resp
    });
  }

  getLocation(): Promise<Geoposition> {
    if (this.currentLocation) {
      return Promise.resolve(this.currentLocation);
    } else {
      this.setLocation().then((resp) => {
        return resp;
      })
    }
  }

}
