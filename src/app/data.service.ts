import { Injectable } from '@angular/core';
import { IData } from './idata';

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Person } from './table-comp/Person';
@Injectable()
export class DataService {
    private mockData: IData[] = [
            {
                label: "clear",
                value: 1,
            },
            {
                label: "dock",
                value: 2,
            },
            {
                label: "inspection",
                value: 3,
            },
            {
                label: "hold",
                value: 4,
            }
        ];
    private tableMockData = [
        {

            'orderNo':'11',
            'Customer':'Hydrill llc 11',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                {
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
          ]
        },
        {

            'orderNo':'12',
            'Customer':'Hydrill llc 12',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'13',
            'Customer':'Hydrill llc 13',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'14',
            'Customer':'Hydrill llc 14',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                {
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
          ]
        },
        {

            'orderNo':'15',
            'Customer':'Hydrill llc 15',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'12',
            'Customer':'Hydrill llc 12',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'13',
            'Customer':'Hydrill llc 13',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'14',
            'Customer':'Hydrill llc 14',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                {
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
          ]
        },
        {

            'orderNo':'12',
            'Customer':'Hydrill llc 12',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'13',
            'Customer':'Hydrill llc 13',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'14',
            'Customer':'Hydrill llc 14',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                {
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
          ]
        },
        {

            'orderNo':'12',
            'Customer':'Hydrill llc 12',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'13',
            'Customer':'Hydrill llc 13',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'14',
            'Customer':'Hydrill llc 14',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                {
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
          ]
        },
        {

            'orderNo':'12',
            'Customer':'Hydrill llc 12',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'13',
            'Customer':'Hydrill llc 13',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'14',
            'Customer':'Hydrill llc 14',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                {
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
          ]
        },
        {

            'orderNo':'12',
            'Customer':'Hydrill llc 12',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'13',
            'Customer':'Hydrill llc 13',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'14',
            'Customer':'Hydrill llc 14',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                {
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
          ]
        },
        {

            'orderNo':'12',
            'Customer':'Hydrill llc 12',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'13',
            'Customer':'Hydrill llc 13',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'14',
            'Customer':'Hydrill llc 14',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                {
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
          ]
        },
        {

            'orderNo':'12',
            'Customer':'Hydrill llc 12',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'13',
            'Customer':'Hydrill llc 13',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'14',
            'Customer':'Hydrill llc 14',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                {
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
          ]
        },
        {

            'orderNo':'12',
            'Customer':'Hydrill llc 12',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'13',
            'Customer':'Hydrill llc 13',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                // {
                //     "asset_type": "Coffee",
                //     "working": 20,
                //     "not_working": 40,
                //     "service_required": 60,
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
          ]
        },
        {

            'orderNo':'14',
            'Customer':'Hydrill llc 14',
            'Items':23,
            'Order_Date':'2013-04-03',
            'Quantity':23,
            'Order_Cost':'$2309',
            'QH_City':'23',
            'PO_Arrivals':23,
            'PO_Horizon':23,
            "chart" : [
                {
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
          ]
        },
    ]

    private dataSubject = new BehaviorSubject<IData[]>(this.mockData);
    private tableDataSubject = new BehaviorSubject<Person[]>(null);
    
    $data = this.dataSubject.asObservable();
    $tableData = this.tableDataSubject.asObservable();

    constructor() {
        setTimeout(()=>{
            this.tableDataSubject.next(this.tableMockData)
        },1000)
    }

    addData(newData: IData) {
        this.mockData.push(newData);
        this.dataSubject.next(this.mockData);
    }


}	