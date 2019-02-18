import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { StackedHorizontalComponent } from './stacked-horizontal/stacked-horizontal.component';
import { StackedVerticalComponent } from './stacked-vertical/stacked-vertical.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { HorizontalStackedBarChartComponent } from './horizontal-stacked-bar-chart/horizontal-stacked-bar-chart.component';
import { TableCompComponent } from './table-comp/table-comp.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    StackedHorizontalComponent,
    StackedVerticalComponent,
    BarChartComponent,
    HorizontalStackedBarChartComponent,
    TableCompComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTablesModule,
     HttpModule 
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
