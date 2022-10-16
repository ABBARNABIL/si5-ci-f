import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menuItem';
import { BASE_PATH} from '../configuration/variables';
import { Configuration } from '../configuration/configuration';
import {serverMenuUrl,serverURL} from 'src/configs/server.config'


@Injectable({
  providedIn: 'root',
})
export class MenuService {

    protected basePath = serverURL+"menu";
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
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
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     *
     *
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addMenuItem(body: MenuItem, observe?: 'body', reportProgress?: boolean): Observable<MenuItem>;
    public addMenuItem(body: MenuItem, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MenuItem>>;
    public addMenuItem(body: MenuItem, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MenuItem>>;
    public addMenuItem(body: MenuItem, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addMenuItem.');
        }
        let headers = this.initializeHeaders(['application/json']);
        return this.httpClient.request<MenuItem>('post',`${this.basePath}/menus`,
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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTheFullMenu(observe?: 'body', reportProgress?: boolean): Observable<Array<MenuItem>>;
    public getTheFullMenu(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<MenuItem>>>;
    public getTheFullMenu(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<MenuItem>>>;
    public getTheFullMenu(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      let headers = this.initializeHeaders( [
          'application/json'
      ]);
        return this.httpClient.request<Array<MenuItem>>('get',`${this.basePath}/menus`,
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
     * @param menuItemId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public tableOrder(menuItemId: string, observe?: 'body', reportProgress?: boolean): Observable<MenuItem>;
    public tableOrder(menuItemId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MenuItem>>;
    public tableOrder(menuItemId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MenuItem>>;
    public tableOrder(menuItemId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (menuItemId === null || menuItemId === undefined) {
            throw new Error('Required parameter menuItemId was null or undefined when calling tableOrder.');
        }

        let headers = this.initializeHeaders([]);

        return this.httpClient.request<MenuItem>('get',`${this.basePath}/menus/${encodeURIComponent(String(menuItemId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
}
