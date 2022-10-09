import { Injectable, IterableDiffers } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  public all_orders : any = [];
  iterableDiffer: any;
  inputArray :any = []

  constructor(){
    console.log()
  }
  // constructor(private iterableDiffers: IterableDiffers) {
  //   this.iterableDiffer = this.iterableDiffers.find([]).create();
  //   console.log("jhsjxhslkj")
  // }

  // ngOnInit(){
  //   console.log("hdkdhhhhhhhhhh")
  //   this.inputArray.push("3")
  //   console.log(this.inputArray)
  // }

  // ngDoCheck() {
  //   let changes = this.iterableDiffer.diff(this.inputArray);
  //   if (changes) {
  //       console.log('Changes detected!');
  //   }
  // }
  getTime(){
    this.all_orders.forEach((order: any) => {
        console.log(order)
    });
  }
}
