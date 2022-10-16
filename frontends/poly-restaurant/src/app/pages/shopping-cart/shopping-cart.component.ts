import { Component, Input, OnInit } from '@angular/core';
import { StatusService } from 'src/app/services/status.service';
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

  constructor(private cartService: CartService, private statutService: StatusService) {
    this.cartService.totalPrice.subscribe(total => this.total = total);
    this.cartService.itemCount.subscribe(count => this.itemCount = count);
  }

  ngOnInit(): void {
  }

  ngOnChanges() {

  }

  cancel() {
    this.cartService.cancel();
  }

  confirm(){
    this.cartService.validate();
    this.statutService.openDialog();
  }

}
