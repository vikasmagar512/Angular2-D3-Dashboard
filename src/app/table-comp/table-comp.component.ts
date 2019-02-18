import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Person} from './Person';
import {Http} from '@angular/http';
import {Format} from './Format';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-table-comp',
  templateUrl: './table-comp.component.html',
  styleUrls: ['./table-comp.component.css']
})
export class TableCompComponent implements OnInit,OnDestroy, OnChanges {
  dtOptions: DataTables.Settings = {};
  data: Person[] = [];
  columns: any[];
  // We use this trigger because fetching the list of data can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Person[]> = new Subject();
  exportFileName:string = "csv";

  constructor(private http: Http,private dataService: DataService) { }
  ngOnInit(): void {
    // console.log('dataNumber ',this.dataNumber)
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      destroy: true,
      // sDom: 'rtlfip'
    };
    this.dataService.$tableData.subscribe((data) => {
      this.data = data;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
    this.columns= [
      {
        display: 'Order No',
        variable: 'orderNo',
        filter: 'text'
      },
      {
        display: 'Customer',
        variable: 'Customer',
        filter: 'text'
      },
      {
        display: 'Items',
        variable: 'Items',
        filter: 'text'
      },
      {
        display: 'Order Date',
        variable: 'Order_Date',
        filter: 'text'
      },
      {
        display: 'Quantity',
        variable: 'Quantity',
        filter: 'text'
      },  {
        display: 'Order Cost',
        variable: 'Order_Cost',
        filter: 'text'
      },  {
        display: 'QH City',
        variable: 'QH_City',
        filter: 'text'
      }, {
        display: 'PO Arrivals',
        variable: 'PO_Arrivals',
        filter: 'text'
      }, {
        display: 'PO Horizon',
        variable: 'PO_Horizon',
        filter: 'text'
      },
      {
        display: 'Chart',
        variable: 'chart',
        filter: 'chart'
      },
    ];
  }
  ngOnChanges(changes: SimpleChanges) {
  //   this.getDataForNumber(changes.dataNumber.currentValue);
  }
  // getDataForNumber(numberIndex){
  //   this.dataService.getPersonsData()
  //   // .map(this.extractData)
  //   .subscribe(persons=> {
  //     this.data = persons;
  //     // Calling the DT trigger to manually render the table
  //     this.dtTrigger.next();
  //   });
  // }

  extractData(res) {
    // const body = res.json();
    return res['data'] || {};
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  public static downloadcsv(data: any, exportFileName: string) {
    var csvData = this.convertToCSV(data);

    var blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, this.createFileName(exportFileName))
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", this.createFileName(exportFileName));
        //link.style = "visibility:hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
  exporttoCSV() {
    let exprtcsv: any[] = [];
    (<any[]>JSON.parse(JSON.stringify(this.data))).forEach(x => {
        var obj = new Object();
        var frmt = new Format();
        for (var i = 0; i < this.columns.length; i++) {
          let transfrmVal = frmt.transform(x[this.columns[i].variable],
            this.columns[i].filter);
          obj[this.columns[i].display] = transfrmVal;
        }
        exprtcsv.push(obj);
      }
    );
    TableCompComponent.downloadcsv(exprtcsv, this.exportFileName);
  }
  private static convertToCSV(objarray: any) {
    var array = typeof objarray != 'object' ? JSON.parse(objarray) : objarray;

    var str = '';
    var row = "";

    for (var index in objarray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','
        line += JSON.stringify(array[i][index]);
      }
      str += line + '\r\n';
    }
    return str;
  }

  private static createFileName(exportFileName: string): string {
    var date = new Date();
    return (exportFileName +
      date.toLocaleDateString() + "_" +
      date.toLocaleTimeString()
      + '.csv')
  }
}
