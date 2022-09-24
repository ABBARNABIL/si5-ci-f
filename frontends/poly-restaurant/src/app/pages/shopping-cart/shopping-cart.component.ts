import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StartOrderingDTO } from 'src/app/models/startOrderingDTO';
import { TablesDialogueComponent } from '../tables-dialogue/tables-dialogue.component';
import { DiningService } from '../../services/dining.service';
import { TableOrder } from '../../models/tableOrder';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  @Input() items!: any[];
  @Output() itemRemoved = new EventEmitter();
  startOrder! : StartOrderingDTO
  panelOpenState = true;
  tableOrder : any;

  constructor(public dialog: MatDialog, private dinigService : DiningService) {
   }

  ngOnInit(): void {
  }

  removeItem(item: any) {
    this.itemRemoved.emit(item)
  }

  validate(){
    // if(this.items.length>0){
      const dialogRef = this.dialog.open(TablesDialogueComponent);
      dialogRef.componentInstance.onAdd.subscribe((data) => {
        console.log(data)
        this.startOrder = data;
        this.dinigService.openTable(data).subscribe(
          result =>{
            this.items.forEach(item => {
              this.dinigService.addToTableOrder(item,"");
            })
            // this.tableOrder = result;
            // console.log(result);
        });
      });
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(`Dialog result: ${result}`);
      // });
    }
  // }
}
