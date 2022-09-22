import { Component, OnInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableOrder } from 'src/app/models/models';
import { StartOrderingDTO } from 'src/app/models/startOrderingDTO';
import { TableWithOrderDTO } from 'src/app/models/tableWithOrderDTO';
import { DiningService } from 'src/app/services/dining.service';

@Component({
  selector: 'app-tables-dialogue',
  templateUrl: './tables-dialogue.component.html',
  styleUrls: ['./tables-dialogue.component.scss']
})

export class TablesDialogueComponent implements OnInit {
  tables:Array<TableWithOrderDTO> = [];
  value = 0;
  tableOrder! : TableOrder;
  startOrder : StartOrderingDTO = {
    "tableId" : 0,
   "customersCount" : 0
};

  constructor(public dialog: MatDialog, private diningService : DiningService) {
    this.diningService.listAllTables().subscribe(data =>{
      this.tables = data;
    })
  }

  ngOnInit(): void {

  }

  selectedElement(tableId : number | undefined){
    let el = document.getElementById("table")!.style.color ="red";
    this.startOrder.tableId = tableId,
    this.startOrder.customersCount = this.value;

    console.log(this.startOrder.tableId);
    console.log(this.startOrder.customersCount);
  }

  openTable(){
     this.diningService.openTable(this.startOrder).subscribe(data => {
        this.tableOrder= data;
        console.log(data);
    })
  }
}
