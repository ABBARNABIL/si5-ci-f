import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '../models/menuItem';
import { StartOrderingDTO } from '../models/startOrderingDTO';
import { TableOrder } from '../models/tableOrder';
import { TableWithOrderDTO } from '../models/tableWithOrderDTO';
import { BillDialogueComponent } from '../pages/bill-dialogue/bill-dialogue.component';
import { TablesDialogueComponent } from '../pages/tables-dialogue/tables-dialogue.component';
import { DiningService } from './dining.service';
import { TrackingService } from './tracking.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: Map<MenuItem, number> = new Map<MenuItem, number>();
  startOrder! : StartOrderingDTO
  public totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public itemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public orderBeingPrepared!: TableOrder;

  constructor(public dialog: MatDialog, private diningService : DiningService) { }

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

  async validate(){
    if(this.getItemCount() > 0){
      this.diningService.listAllTables().subscribe(
        res => {
          let availableTables = res.filter(table => table.taken == false);
          let randomTable = availableTables[Math.floor(Math.random() * availableTables.length)];
          let startOrderingDTO : StartOrderingDTO = {tableId: randomTable.number, customersCount:3};
          console.log(startOrderingDTO);
          console.log("+++++++++++++++++++++++++++++++");
          this.diningService.openTable(startOrderingDTO).subscribe(
            result =>{
              console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
              console.log(result);
              let count = 0;
              this.cartItems.forEach((value, key) => {
                console.log("key: " + key);
                console.log("value: " + value);
                this.diningService.addToTableOrder({
                  id: key.id,
                  shortName: key.shortName,
                  howMany: value
                }, ""+result.id).subscribe(
                  resul => {
                    count++;
                    console.log(" line hjdhjzh " +resul.lines?.length)
                    console.log("ff "+resul)
                    if (resul.lines?.length == this.cartItems.size) {
                      this.diningService.prepare(""+result.id).subscribe(
                        _ => {
                          this.diningService.bill(""+result.id).subscribe(
                            result => {
                              this.orderBeingPrepared = result;
                              this.cartItems.clear();
                              this.calculateTotalPrice();
                              this.calculateTotalItems();
                            }
                          );
                        });
                    }
                  }
                );
              });


          });

        }
      );

    }
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
