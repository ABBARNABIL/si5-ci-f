import { Injectable, IterableDiffers } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Subject } from 'rxjs';
import { TableOrder } from '../models/tableOrder';
import { CartService } from './cart.service';
import { KitchenService } from './kitchen.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  orders_DATA: Subject<any[]> = new Subject<any[]>();
  public orders: BehaviorSubject<TableOrder[]> = new BehaviorSubject<TableOrder[]>([]);
  public table : TableOrder[] = []
  public all_keys: any [] = []
  public valuesOrders : Map<number, TableOrder> = new Map<number, TableOrder>();

  public finishOrders: any = []

  iterableDiffer: any
  inputArray :any = []

  constructor( private kitchenService : KitchenService){

  }

  saveOrder(order : TableOrder){
    var orderWithStatus = {...order,ready:false}
    localStorage.setItem(""+order.id,JSON.stringify(orderWithStatus))
  }

  allStorage() {
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

    while ( i-- ) {
      var val = localStorage.getItem(keys[i])
      if (val){
        values.push(JSON.parse(val));
      }
    }

    return values;
  }

  updateOrders(order : TableOrder){
    this.orders.next(this.orders.getValue().concat([order]))
    console.log(this.orders)
  }

  ngOnInit(){
  }

  startAll(order : TableOrder){
    var shoulBeReadydate = new Date()
    let promises: Array<Promise<any>> = [];

    order.preparations?.forEach(preparation => {
      if (shoulBeReadydate < preparation.shouldBeReadyAt){
        shoulBeReadydate = preparation.shouldBeReadyAt
      }
      shoulBeReadydate = preparation.shouldBeReadyAt
      shoulBeReadydate = new Date(shoulBeReadydate)
      shoulBeReadydate.setMinutes(shoulBeReadydate.getMinutes()+1)
      console.log(shoulBeReadydate.getMinutes())
      console.log(shoulBeReadydate.getMinutes)
      console.log(preparation.shouldBeReadyAt.getDate)
      console.log("PREPARED ITEMS")
      console.log(preparation.preparedItems)
      preparation.preparedItems.forEach(element  =>{
        promises.push(lastValueFrom(this.kitchenService.startToPrepareItemOnPost(""+element.id)))
      })

      Promise.all(promises).then(() => {
        console.log("TDDDDDDDDDDDDDDDDDDDDDDD")
        console.log()
        var time = (shoulBeReadydate.getMinutes() - (new Date()).getMinutes())*1000*60
        console.log("TIMEEEEEEEEEEEEEE    "+time)
        var key = new Date().getTime() + time
        this.valuesOrders.set(key,order)
        this.all_keys.push(key)
        this.all_keys.sort()
        console.log(this.all_keys)
        console.log(this.valuesOrders)
        setTimeout(() =>{
          var current_order = this.valuesOrders.get(this.all_keys[0])
          console.log("ORDERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR ")
          console.log(current_order)
          let promisesN: Array<Promise<any>> = [];
          this.all_keys.splice(0, 1)
          current_order?.preparations?.forEach(preparation => {
              preparation.preparedItems.forEach(element  =>{

                promisesN.push(lastValueFrom(this.kitchenService.finishToPrepareItemOnPost(element.id)))

                Promise.all(promisesN).then(()=> {
                  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh  FERME<")
                  var value = localStorage.getItem(""+current_order?.id)
                  if (value){
                    var TheOrder = JSON.parse(value)
                    localStorage.setItem(""+current_order?.id,JSON.stringify({...TheOrder,ready:true}))
                    console.log(localStorage.getItem(""+current_order?.id))
                  }
                })
              })
            })
        }, time)
      })

    })
  }
}
