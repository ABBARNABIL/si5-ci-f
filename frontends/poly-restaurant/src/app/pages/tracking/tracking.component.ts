import { AfterViewInit, Component, IterableDiffers, OnInit, ViewChild } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableOrder } from 'src/app/models/tableOrder';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})

export class TrackingComponent implements OnInit {

  orders : any[] = []
  status : Boolean = true
  constructor(private trackingService : TrackingService) {

  }

  ngOnInit(): void {
    this.orders = this.trackingService.allStorage()

  }

  ngDoCheck(){
    this.orders = this.trackingService.allStorage()
  }
  
}

