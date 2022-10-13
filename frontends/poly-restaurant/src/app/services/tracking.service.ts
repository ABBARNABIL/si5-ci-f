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
      "id": "disdzis",
      "tableNumber": "2",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },
    {
      "id": "zhdzhd",
      "tableNumber": "3",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },
    {
      "id": "zhdzhd",
      "tableNumber": "4",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },{
      "id": "uoppp",
      "tableNumber": "5",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },{
      "id": "uduhd",
      "tableNumber": "6",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },{
      "id": "jifieue",
      "tableNumber": "7",
      "customersCount": 2,
      "opened": "",
      "lines": "",
      "status":false
    },{
      "id": "gjgjj",
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
