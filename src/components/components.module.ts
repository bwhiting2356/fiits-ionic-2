import { NgModule } from '@angular/core';
import { TripDetailsComponent } from './trip-details/trip-details';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicErrorHandler, IonicModule, Keyboard } from 'ionic-angular';
import { TripCardComponent } from './trip-card/trip-card';
import { AgmCoreModule } from '@agm/core';
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
	declarations: [
    TripDetailsComponent,
    TripCardComponent],
	imports: [
	  CommonModule,
    AgmCoreModule,
    PipesModule,
    IonicModule.forRoot(TripDetailsComponent)],  // TODO: I don't undertsand what this does
	exports: [
    TripDetailsComponent,
    TripCardComponent]
})
export class ComponentsModule {}
