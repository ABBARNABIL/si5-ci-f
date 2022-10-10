import { Injectable, IterableDiffers } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  orders_DATA: Subject<any[]> = new Subject<any[]>();
  public all_orders = [
    {
      "id": "disdzis-fgfg",
      "tableNumber": "2",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },
    {
      "id": "zhdzhd-ffg",
      "tableNumber": "3",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },
    {
      "id": "zhdzhd-rgrgr",
      "tableNumber": "4",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },{
      "id": "uoppp-etue",
      "tableNumber": "5",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },{
      "id": "uduhd-euude",
      "tableNumber": "6",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },{
      "id": "jifieue-gugu",
      "tableNumber": "7",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },{
      "id": "gjgjj-yyii",
      "tableNumber": "8",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    }
  ]

  public finishOrders: any = []

  iterableDiffer: any
  inputArray :any = []

  constructor(){
    this.orders_DATA.subscribe((value) => {
      this.all_orders = value
  });
  }

  ngOnInit(){
  }
  
  getTime(){
    this.all_orders.forEach((order: any) => {
        console.log(order)
    });
  }
}
