import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StartOrderingDTO } from 'src/app/models/startOrderingDTO';
import { TablesDialogueComponent } from '../tables-dialogue/tables-dialogue.component';
import { DiningService } from '../../services/dining.service';
import { TableOrder } from '../../models/tableOrder';
import { BillDialogueComponent } from '../bill-dialogue/bill-dialogue.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  panelOpenState = true;
  total : number = 0;
  itemCount : number = 0;

  constructor(public dialog: MatDialog, private dinigService : DiningService) {
   }

  ngOnInit(): void {
  }

}
