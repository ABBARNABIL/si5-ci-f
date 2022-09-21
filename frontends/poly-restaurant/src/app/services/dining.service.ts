import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpResponse, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { Preparation } from '../models/preparation';
import { StartOrderingDTO } from '../models/startOrderingDTO';
import { TableOrder } from '../models/tableOrder';
import { Configuration } from '../configuration/configuration';
import { BASE_PATH_DINING} from '../configuration/variables';
import { TableCreationDTO } from '../models/tableCreationDTO';
import { TableWithOrderDTO } from '../models/tableWithOrderDTO';
import {serverDiningUrl} from 'src/configs/server.config'

@Injectable({
  providedIn: 'root',
})
export class DiningService {

    protected basePath = serverDiningUrl;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH_DINING) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    private initializeHeaders(consumesValues:string[]){
      let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*',
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        if(consumesValues){
          const consumes: string[] = consumesValues;
          const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
          if (httpContentTypeSelected != undefined) {
              headers = headers.set('Content-Type', httpContentTypeSelected);
          }
        }
        return headers;
    }
    /**
     *
     *
     * @param body
     * @param tableOrderId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addToTableOrder(body: Item, tableOrderId: string, observe?: 'body', reportProgress?: boolean): Observable<TableOrder>;
    public addToTableOrder(body: Item, tableOrderId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TableOrder>>;
    public addToTableOrder(body: Item, tableOrderId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TableOrder>>;
    public addToTableOrder(body: Item, tableOrderId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addToTableOrder.');
        }

        if (tableOrderId === null || tableOrderId === undefined) {
            throw new Error('Required parameter tableOrderId was null or undefined when calling addToTableOrder.');
        }

        let headers = this.initializeHeaders(['application/json']);

        return this.httpClient.request<TableOrder>('post',`${this.basePath}/tableOrders/${encodeURIComponent(String(tableOrderId))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param tableOrderId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bill(tableOrderId: string, observe?: 'body', reportProgress?: boolean): Observable<TableOrder>;
    public bill(tableOrderId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TableOrder>>;
    public bill(tableOrderId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TableOrder>>;
    public bill(tableOrderId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (tableOrderId === null || tableOrderId === undefined) {
            throw new Error('Required parameter tableOrderId was null or undefined when calling bill.');
        }

        let headers = this.initializeHeaders([]);

        return this.httpClient.request<TableOrder>('post',`${this.basePath}/tableOrders/${encodeURIComponent(String(tableOrderId))}/bill`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllTableOrders(observe?: 'body', reportProgress?: boolean): Observable<Array<TableOrder>>;
    public findAllTableOrders(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<TableOrder>>>;
    public findAllTableOrders(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<TableOrder>>>;
    public findAllTableOrders(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.initializeHeaders([]);

        return this.httpClient.request<Array<TableOrder>>('get',`${this.basePath}/tableOrders`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public openTable(body: StartOrderingDTO, observe?: 'body', reportProgress?: boolean): Observable<TableOrder>;
    public openTable(body: StartOrderingDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TableOrder>>;
    public openTable(body: StartOrderingDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TableOrder>>;
    public openTable(body: StartOrderingDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling openTable.');
        }
        let headers = this.initializeHeaders(['application/json']);
        return this.httpClient.request<TableOrder>('post',`${this.basePath}/tableOrders`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param tableOrderId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public prepare(tableOrderId: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Preparation>>;
    public prepare(tableOrderId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Preparation>>>;
    public prepare(tableOrderId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Preparation>>>;
    public prepare(tableOrderId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (tableOrderId === null || tableOrderId === undefined) {
            throw new Error('Required parameter tableOrderId was null or undefined when calling prepare.');
        }

        let headers = this.initializeHeaders([]);

        return this.httpClient.request<Array<Preparation>>('post',`${this.basePath}/tableOrders/${encodeURIComponent(String(tableOrderId))}/prepare`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param tableOrderId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public tableOrder(tableOrderId: string, observe?: 'body', reportProgress?: boolean): Observable<TableOrder>;
    public tableOrder(tableOrderId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TableOrder>>;
    public tableOrder(tableOrderId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TableOrder>>;
    public tableOrder(tableOrderId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (tableOrderId === null || tableOrderId === undefined) {
            throw new Error('Required parameter tableOrderId was null or undefined when calling tableOrder.');
        }

        let headers = this.initializeHeaders([]);

        return this.httpClient.request<TableOrder>('get',`${this.basePath}/tableOrders/${encodeURIComponent(String(tableOrderId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

     /**
     *
     *
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
      public createTable(body: TableCreationDTO, observe?: 'body', reportProgress?: boolean): Observable<TableWithOrderDTO>;
      public createTable(body: TableCreationDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TableWithOrderDTO>>;
      public createTable(body: TableCreationDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TableWithOrderDTO>>;
      public createTable(body: TableCreationDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

          if (body === null || body === undefined) {
              throw new Error('Required parameter body was null or undefined when calling createTable.');
          }

          let headers = this.initializeHeaders(['application/json']);

          return this.httpClient.request<TableWithOrderDTO>('post',`${this.basePath}/tables`,
              {
                  body: body,
                  withCredentials: this.configuration.withCredentials,
                  headers: headers,
                  observe: observe,
                  reportProgress: reportProgress
              }
          );
      }

      /**
       *
       *
       * @param tableId
       * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
       * @param reportProgress flag to report request and response progress.
       */
      public findTableByNumber(tableId: number, observe?: 'body', reportProgress?: boolean): Observable<TableWithOrderDTO>;
      public findTableByNumber(tableId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TableWithOrderDTO>>;
      public findTableByNumber(tableId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TableWithOrderDTO>>;
      public findTableByNumber(tableId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

          if (tableId === null || tableId === undefined) {
              throw new Error('Required parameter tableId was null or undefined when calling findTableByNumber.');
          }

          let headers = this.initializeHeaders([]);
          return this.httpClient.request<TableWithOrderDTO>('get',`${this.basePath}/tables/${encodeURIComponent(String(tableId))}`,
              {
                  withCredentials: this.configuration.withCredentials,
                  headers: headers,
                  observe: observe,
                  reportProgress: reportProgress
              }
          );
      }

      /**
       *
       *
       * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
       * @param reportProgress flag to report request and response progress.
       */
      public listAllTables(observe?: 'body', reportProgress?: boolean): Observable<Array<TableWithOrderDTO>>;
      public listAllTables(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<TableWithOrderDTO>>>;
      public listAllTables(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<TableWithOrderDTO>>>;
      public listAllTables(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

          let headers = this.initializeHeaders([]);
          return this.httpClient.request<Array<TableWithOrderDTO>>('get',`${this.basePath}/tables`,
              {
                  withCredentials: this.configuration.withCredentials,
                  headers: headers,
                  observe: observe,
                  reportProgress: reportProgress
              }
          );
      }

}
