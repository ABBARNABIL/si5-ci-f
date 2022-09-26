import { Injectable } from '@angular/core';
import { DiningService } from './dining.service';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private diningService : DiningService) {

  }

  
}
