import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import { KitchenService } from '../../services/kitchen.service';

@Component({
  selector: 'app-control-orders',
  templateUrl: './control-orders.component.html',
  styleUrls: ['./control-orders.component.scss']
})
export class ControlOrdersComponent implements OnInit {
  dataSource = [];
  displayedColumns: string[] = ['order', 'start'];
  orders: any
  constructor(private tracking : TrackingService, private kitchenService: KitchenService) {
    this.orders = this.tracking.all_orders
  }
  ngOnInit(): void {

  }

  start(orderId: any){
    console.log(orderId)
    this.kitchenService.startToPrepareItemOnPost(orderId)
    document.getElementById("start")!.innerHTML = "Finish"
    document.getElementById("start")!.style.backgroundColor ="red"
  }

  finish(orderId : any){
    console.log(orderId)

    //this.kitchenService.finishToPrepareItemOnPost(orderId)
    // this.tracking.finishOrders.push(orderId)
    this.tracking.all_orders.forEach((element: { id: any; status: boolean; }) => {
      if (element.id == orderId) element.status=true
    });
    console.log(this.tracking.all_orders)
    this.tracking.orders_DATA.next(this.tracking.all_orders)
  }

}
