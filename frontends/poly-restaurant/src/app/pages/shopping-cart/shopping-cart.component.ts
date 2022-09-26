import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StartOrderingDTO } from 'src/app/models/startOrderingDTO';
import { TablesDialogueComponent } from '../tables-dialogue/tables-dialogue.component';
import { DiningService } from '../../services/dining.service';
import { TableOrder } from '../../models/tableOrder';
import { BillDialogueComponent } from '../bill-dialogue/bill-dialogue.component';
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
