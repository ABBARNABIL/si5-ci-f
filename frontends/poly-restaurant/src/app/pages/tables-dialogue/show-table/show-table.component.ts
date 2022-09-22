import { Component, Input, OnInit } from '@angular/core';
import { StartOrderingDTO } from 'src/app/models/startOrderingDTO';
import { TableOrder } from 'src/app/models/tableOrder';
import { TableWithOrderDTO } from '../../../models/tableWithOrderDTO';
import { DiningService } from '../../../services/dining.service';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent implements OnInit {
  tableOrder! : TableOrder;
  @Input()
  table!: TableWithOrderDTO;

  constructor() { }

  ngOnInit(): void {
  }


}
