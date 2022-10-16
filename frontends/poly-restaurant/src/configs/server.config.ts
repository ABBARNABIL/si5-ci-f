import { HttpHeaders } from '@angular/common/http';

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const serverMenuUrl = 'http://localhost:3000';
export const serverDiningUrl = 'http://localhost:3001';
export const serverKitchenUrl = 'http://localhost:3002';
export const serverURL = 'http://127.0.0.1:9500/'
