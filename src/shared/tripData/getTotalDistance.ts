import { TripData } from './tripData';

export const getTotalDistance = (trip: TripData): number => {
  return (trip.walking1Travel.distance
    + trip.walking2Travel.distance
    + trip.bicyclingTravel.distance )
}
