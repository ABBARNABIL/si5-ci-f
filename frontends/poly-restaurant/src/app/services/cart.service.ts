import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, elementAt, lastValueFrom, Observable } from 'rxjs';
import { MenuItem } from '../models/menuItem';
import { StartOrderingDTO } from '../models/startOrderingDTO';
import { TableOrder } from '../models/tableOrder';
import { TableWithOrderDTO } from '../models/tableWithOrderDTO';
import { BillDialogueComponent } from '../pages/bill-dialogue/bill-dialogue.component';
import { TablesDialogueComponent } from '../pages/tables-dialogue/tables-dialogue.component';
import { DiningService } from './dining.service';
import { KitchenService } from './kitchen.service';
import { TrackingService } from './tracking.service';
import { Preparation } from '../models/preparation';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: Map<MenuItem, number> = new Map<MenuItem, number>();
  startOrder! : StartOrderingDTO
  public totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public itemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public orderBeingPrepared!: TableOrder;

  constructor(public dialog: MatDialog, private diningService : DiningService,
    private kitchenService : KitchenService,
    private router: Router,private tracking: TrackingService) { }

  addItemToCart(item : MenuItem) {
    let itemSet = this.findItemByFullName(item.fullName);
    if(itemSet){
      this.cartItems.set(itemSet, this.cartItems.get(itemSet)! + 1);
    } else {
      this.cartItems.set(item, 1);
    }
    this.calculateTotalPrice();
    this.calculateTotalItems();
  }

  addItemsToCart(item: MenuItem, quantity: number) {
    let itemSet = this.findItemByFullName(item.fullName);
    if(itemSet){
      this.cartItems.set(itemSet, this.cartItems.get(itemSet)! + quantity);
    } else {
      this.cartItems.set(item, quantity);
    }
    this.calculateTotalPrice();
    this.calculateTotalItems();
  }

  removeItem(item : MenuItem) {
    let itemSet = this.findItemByFullName(item.fullName);
    if(itemSet){
      this.cartItems.get(itemSet)! > 1 ? this.cartItems.set(itemSet, this.cartItems.get(itemSet)! - 1) : this.cartItems.delete(itemSet);
    }
    this.calculateTotalPrice();
    this.calculateTotalItems();
  }

  removeAllItems(item : MenuItem) {
    let itemSet = this.findItemByFullName(item.fullName);
    if(itemSet){
      this.cartItems.delete(itemSet);
    }
    this.calculateTotalPrice();
    this.calculateTotalItems();
  }

  // async validate(){
  //   if(this.getItemCount() > 0){
  //     this.diningService.listAllTables().subscribe(
  //       res => {
  //         let availableTables = res.filter(table => table.taken == false);
  //         let randomTable = availableTables[Math.floor(Math.random() * availableTables.length)];
  //         let startOrderingDTO : StartOrderingDTO = {tableId: randomTable.number, customersCount:3};
  //         this.diningService.openTable(startOrderingDTO).subscribe(
  //           result =>{
  //             console.log(result);
  //             let promises: Array<Promise<any>> = [];

  //             this.cartItems.forEach((value, key) => {
  //               promises.push(lastValueFrom((this.diningService.addToTableOrder({
  //                 id: key.id,
  //                 shortName: key.shortName,
  //                 howMany: value
  //               }, ""+result.id))));

  //               Promise.all(promises).then(() => {
  //                     this.diningService.prepare(""+result.id).subscribe(
  //                       preparations => {
  //                         this.diningService.bill(""+result.id).subscribe(
  //                           result => {
  //                             this.tracking.orders.next(this.tracking.orders.getValue().concat([result]))
  //                             this.orderBeingPrepared = result;
  //                             this.cartItems.clear();
  //                             this.calculateTotalPrice();
  //                             this.calculateTotalItems();
  //                           });
  //                       });
  //                      });
  //                 });
  //             });
  //         });
  //   }
  // }



  async validate(){
    if(this.getItemCount() > 0){
      this.diningService.listAllTables().subscribe(
        res => {
          let availableTables = res.filter(table => table.taken == false);
          let randomTable = availableTables[Math.floor(Math.random() * availableTables.length)];
          let startOrderingDTO : StartOrderingDTO = {tableId: randomTable.number, customersCount:3};
          this.diningService.openTable(startOrderingDTO).subscribe(
            result =>{

                let promises: Array<Promise<any>> = [];

                this.cartItems.forEach((value, key) => {
                  console.log( key);
                  console.log("value: " + value);
                  promises.push(lastValueFrom((this.diningService.addToTableOrder({
                    id: key.id,
                    shortName: key.shortName,
                    howMany: value
                  }, ""+result.id))));

                  Promise.all(promises).then(() => {
                    this.diningService.bill(""+result.id!).subscribe(
                      _ => {
                        this.diningService.prepare(""+result.id).subscribe(
                          res => {
                            this.diningService.tableOrder(""+result.id).subscribe(tableOrder => {
                              this.tracking.saveOrder(tableOrder)
                              this.orderBeingPrepared = tableOrder;
                              this.tracking.startAll(tableOrder)
                              this.cartItems.clear();
                              this.calculateTotalPrice();
                              this.calculateTotalItems();
                            })
                            }
                          );
                        }
                    );
                  });
                });
            }
          );
        }
      );
    }
  }



  finish(){

  }
  /*async validate(){
    if(this.getItemCount() > 0){
      let availbleTableNumber = await this.getRandomAvailableTable();
      let startOrderingDTO : StartOrderingDTO = {tableId: availbleTableNumber, customersCount:3};
      console.log(startOrderingDTO);
      this.diningService.openTable(startOrderingDTO).subscribe(
        result =>{
          for (const [key, value] of this.cartItems.entries()) {
            this.diningService.addToTableOrder({
              id: key.id,
              shortName: key.shortName,
              howMany: value
          }, ""+result.id);
        }
        this.diningService.prepare(""+result.id).subscribe(
          _ => {
            this.diningService.bill(""+result.id).subscribe(
              result => {
                this.orderBeingPrepared = result;
              }
            );
          });
      });
      this.cartItems.clear();
      this.calculateTotalPrice();
      this.calculateTotalItems();
    }
  }*/

  cancel() {
    this.cartItems.clear();
    this.calculateTotalPrice();
    this.calculateTotalItems();
  }


  calculateTotalPrice() {
    let sum = 0;
    this.cartItems.forEach((value, key) => {
      sum += value * key.price!;
    });
    this.totalPrice.next(sum);
  }

  calculateTotalItems() {
    let count = 0;
    this.cartItems.forEach((value, key) => {
      count += value;
    });
    this.itemCount.next(count);
  }

  calculatePrice(item : MenuItem) {
    if(this.cartItems.has(item)){
      return this.cartItems.get(item)! * item.price!;
    } else {
      return 0;
    }
  }

  findItemByFullName(fullName : string) : MenuItem | undefined {
    let item : MenuItem | undefined;
    this.cartItems.forEach((value, key) => {
      if(key.fullName == fullName){
        item = key;
      }
    });
    return item;
  }

  getItemCount() : number {
    return this.itemCount.value;
  }

  async getRandomAvailableTable() : Promise<number> {
    this.diningService.listAllTables().subscribe(
      result => {
        let availableTables = result.filter(table => table.taken == false);
        let randomTable = availableTables[Math.floor(Math.random() * availableTables.length)];
        return randomTable.number;
      }
    );
    console.log("Error: No available tables");
    return 0;
  }

}
