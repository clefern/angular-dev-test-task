import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LineChartModule } from './components/line-chart/line-chart.module'

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		LineChartModule
	],
	providers: [],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
