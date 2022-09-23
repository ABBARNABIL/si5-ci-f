import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TablesDialogueComponent } from '../tables-dialogue/tables-dialogue.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  @Input() items!: any[];
  @Input() total: any
  @Output() itemRemoved = new EventEmitter();
  panelOpenState = true;
  
  constructor(public dialog: MatDialog) {
    this.items = [];
   }

  ngOnInit(): void {
  }

  removeItem(item: any) {
    this.itemRemoved.emit(item)
  }

  validate(){
      const dialogRef = this.dialog.open(TablesDialogueComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    this.items = [];
  }
}
