import { Component, OnInit, OnChanges, EventEmitter } from '@angular/core';
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
  choosenTable : any;
  onAdd = new EventEmitter();
  playerName!: string;

  constructor(public dialog: MatDialog, private diningService : DiningService) {
    this.diningService.listAllTables().subscribe(data =>{
      this.tables = data;
    })
  }

  ngOnInit(): void {

  }

  selectedElement(table : any){
    // let el = document.getElementById("table")!.style.color ="red";
    // this.startOrder.tableId = tableId,
    // this.startOrder.customersCount = this.value;
    this.choosenTable = table
    console.log(this.choosenTable)
  }


  onButtonClick() {
    this.startOrder.tableId = this.choosenTable.number;
    this.startOrder.customersCount = 1;
    this.onAdd.emit(this.startOrder);
  }
}
