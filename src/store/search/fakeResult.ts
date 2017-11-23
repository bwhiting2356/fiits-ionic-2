import { TripData } from '../../shared/tripData/tripData';

export const fakeResult: TripData = {
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
