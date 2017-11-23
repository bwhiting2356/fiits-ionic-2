import { NgModule } from '@angular/core';
import { DistancePipe } from './distance/distance';
import { TimePipe } from './time/time';
@NgModule({
	declarations: [
	  DistancePipe,
    TimePipe],
	imports: [],
	exports: [
	  DistancePipe,
    TimePipe]
})
export class PipesModule {}
