import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';

@Component({
  selector: 'app-control-orders',
  templateUrl: './control-orders.component.html',
  styleUrls: ['./control-orders.component.scss']
})
export class ControlOrdersComponent implements OnInit {

  order = []
  constructor(private tracking : TrackingService) {
    this.order = this.tracking.all_orders
  }
  ngOnInit(): void {

  }

}
