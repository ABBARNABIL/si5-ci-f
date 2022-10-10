import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  panelOpenState = true;
  total : number = 0;
  itemCount : number = 0;

  constructor(private cartService: CartService) {
    this.cartService.totalPrice.subscribe(total => this.total = total);
    this.cartService.itemCount.subscribe(count => this.itemCount = count);
  }

  ngOnInit(): void {
  }

  ngOnChanges() {

  }


  confirm(){
    // this.cartService.validate();
  }

}
