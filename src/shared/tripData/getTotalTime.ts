import { TripData } from './tripData';

export const getTotalTime = (trip: TripData): number => {
  return (trip.walking1Travel.time
    + trip.walking2Travel.time
    + trip.bicyclingTravel.time )
}
