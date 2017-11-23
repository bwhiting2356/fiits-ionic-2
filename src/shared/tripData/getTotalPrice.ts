import { TripData } from './tripData';

export const getTotalPrice = (trip: TripData): number => {
  return (trip.station1.price
    + trip.station2.price
    + trip.bicyclingPrice )
}
