import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  @Input() items!: any[];
  panelOpenState = true;
  tableOrder : any;

  constructor(private cartService: CartService) {
   }

  ngOnInit(): void {
  }

  validate(){
    this.cartService.validate();
  }

}
