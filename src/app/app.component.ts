import { Component } from '@angular/core';
import { DataService } from './data.service';
import { IData } from './idata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // pipes: [searchTablePipe]   // This Line      
})
export class AppComponent {
  data: IData[];
  side:Boolean = false;
	newLabel: string;
	newValue: number;
  switchText;
  
	constructor(private dataService: DataService) { 
		this.name = `Angular!` 
    this.switchText = !this.side ? 'Receiving' : 'Ready To Ship'
	}

	ngOnInit() {
		this.dataService.$data.subscribe(data => {
			this.data = data;
		});
	}
  switchSides(){
    this.side =!this.side; 
    this.switchText = !this.side ? 'Receiving' : 'Ready To Ship'
  }
	addData(): void {
		let newData = {
			label: this.newLabel,
			value: this.newValue
		} as IData;

		this.dataService.addData(newData);
	}

  
	name:string;
    
    chartData = {
    labels: [
      'resilience', 'maintainability', 'accessibility',
      'uptime'
    ],
    series: [{
      label: '2012',
      values: [100, 75, 25, 35]
    },
    {
      label: '2013',
      values: [12, 43, 22, 11, 73, 25]
    },
    {
      label: '2014',
      values: [31, 28, 14, 8, 15, 21]
    }
    ]
  };
  

    salesData1 = [{
      "asset_type": "Coffee",
      "working": 20,
      "not_working": 40,
      "service_required": 60,
    },
    // {
    //   "asset_type": "Printer",
    //   "working": 20,
    //   "not_working": 31,
    //   "service_required": 30,
    // },
    // {
    //   'asset_type': 'Mobile',
    //   'working': 60,
    //   'not_working': 20,
    //   'service_required': 70
    // },
    ];
    salesData2 = [
    //   {
    //   "asset_type": "Coffee",
    //   "working": 20,
    //   "not_working": 40,
    //   "service_required": 60,
    // },
    {
      "asset_type": "Printer",
      "working": 20,
      "not_working": 31,
      "service_required": 30,
    },
    // {
    //   'asset_type': 'Mobile',
    //   'working': 60,
    //   'not_working': 20,
    //   'service_required': 70
    // },
    ];
    salesData3 = [
      //   {
      //   "asset_type": "Coffee",
      //   "working": 20,
      //   "not_working": 40,
      //   "service_required": 60,
      // },
      // {
      //   "asset_type": "Printer",
      //   "working": 20,
      //   "not_working": 31,
      //   "service_required": 30,
      // },
      {
        'asset_type': 'Mobile',
        'working': 60,
        'not_working': 20,
        'service_required': 70
      },
      ];

    itemsListHorizontal = [
      { firstName: 'Lance', lastName: 'Klusener', 'cData': this.salesData1 },
      { firstName: 'Shayne', lastName: 'Warne', 'cData': this.salesData2 }
      ];
    public foodItem;
    public searchString: string;

}
