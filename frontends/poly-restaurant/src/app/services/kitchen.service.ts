import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreparationPublic } from '../models/preparationPublic';
import { PreparationRequestDTOPublic } from '../models/preparationRequestDTOPublic';
import { BASE_PATH_KITCHEN } from '../configuration/variables';
import { Configuration } from '../configuration/configuration';
import { PreparedItemInternal } from '../models/preparedItemInternal';
import { Recipe } from '../models/recipe';
import { CustomHttpUrlEncodingCodec } from '../configuration/encoder';
import { PreparedItemPublic } from '../models/preparedItemPublic';
import {serverKitchenUrl} from 'src/configs/server.config'


@Injectable({
  providedIn: 'root',
})
export class KitchenService {

    protected basePath = serverKitchenUrl;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH_KITCHEN) basePath: string, @Optional() configuration: Configuration) {
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
     * @param preparationId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findPreparationById(preparationId: string, observe?: 'body', reportProgress?: boolean): Observable<PreparationPublic>;
    public findPreparationById(preparationId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PreparationPublic>>;
    public findPreparationById(preparationId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PreparationPublic>>;
    public findPreparationById(preparationId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (preparationId === null || preparationId === undefined) {
            throw new Error('Required parameter preparationId was null or undefined when calling findPreparationById.');
        }

        let headers = this.initializeHeaders([]);

        return this.httpClient.request<PreparationPublic>('get',`${this.basePath}/preparations/${encodeURIComponent(String(preparationId))}`,
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
     * @param state
     * @param tableId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllPreparations(state: string, tableId?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<PreparationPublic>>;
    public getAllPreparations(state: string, tableId?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PreparationPublic>>>;
    public getAllPreparations(state: string, tableId?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PreparationPublic>>>;
    public getAllPreparations(state: string, tableId?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (state === null || state === undefined) {
            throw new Error('Required parameter state was null or undefined when calling getAllPreparations.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (state !== undefined && state !== null) {
            queryParameters = queryParameters.set('state', <any>state);
        }
        if (tableId !== undefined && tableId !== null) {
            queryParameters = queryParameters.set('tableId', <any>tableId);
        }

        let headers = this.initializeHeaders([]);

        return this.httpClient.request<Array<PreparationPublic>>('get',`${this.basePath}/preparations`,
            {
                params: queryParameters,
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
     * @param preparationId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public preparationIsServed(preparationId: string, observe?: 'body', reportProgress?: boolean): Observable<PreparationPublic>;
    public preparationIsServed(preparationId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PreparationPublic>>;
    public preparationIsServed(preparationId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PreparationPublic>>;
    public preparationIsServed(preparationId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (preparationId === null || preparationId === undefined) {
            throw new Error('Required parameter preparationId was null or undefined when calling preparationIsServed.');
        }

        let headers = this.initializeHeaders([]);
        return this.httpClient.request<PreparationPublic>('post',`${this.basePath}/preparations/${encodeURIComponent(String(preparationId))}/takenToTable`,
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
    public takeOrder(body: PreparationRequestDTOPublic, observe?: 'body', reportProgress?: boolean): Observable<Array<PreparationPublic>>;
    public takeOrder(body: PreparationRequestDTOPublic, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PreparationPublic>>>;
    public takeOrder(body: PreparationRequestDTOPublic, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PreparationPublic>>>;
    public takeOrder(body: PreparationRequestDTOPublic, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling takeOrder.');
        }

        let headers = this.initializeHeaders(['application/json']);
        return this.httpClient.request<Array<PreparationPublic>>('post',`${this.basePath}/preparations`,
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
     * @param preparedItemId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public findPreparedItemById(preparedItemId: string, observe?: 'body', reportProgress?: boolean): Observable<PreparedItemInternal>;
     public findPreparedItemById(preparedItemId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PreparedItemInternal>>;
     public findPreparedItemById(preparedItemId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PreparedItemInternal>>;
     public findPreparedItemById(preparedItemId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

         if (preparedItemId === null || preparedItemId === undefined) {
             throw new Error('Required parameter preparedItemId was null or undefined when calling findPreparedItemById.');
         }
         let headers = this.initializeHeaders([]);

         return this.httpClient.request<PreparedItemInternal>('get',`${this.basePath}/preparedItems/${encodeURIComponent(String(preparedItemId))}`,
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
      * @param preparedItemId
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public findRecipeByPreparedItemId(preparedItemId: string, observe?: 'body', reportProgress?: boolean): Observable<Recipe>;
     public findRecipeByPreparedItemId(preparedItemId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Recipe>>;
     public findRecipeByPreparedItemId(preparedItemId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Recipe>>;
     public findRecipeByPreparedItemId(preparedItemId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

         if (preparedItemId === null || preparedItemId === undefined) {
             throw new Error('Required parameter preparedItemId was null or undefined when calling findRecipeByPreparedItemId.');
         }

         let headers = this.initializeHeaders([]);
         return this.httpClient.request<Recipe>('get',`${this.basePath}/preparedItems/${encodeURIComponent(String(preparedItemId))}/recipe`,
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
      * @param preparedItemId
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public finishToPrepareItemOnPost(preparedItemId: string, observe?: 'body', reportProgress?: boolean): Observable<PreparedItemPublic>;
     public finishToPrepareItemOnPost(preparedItemId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PreparedItemPublic>>;
     public finishToPrepareItemOnPost(preparedItemId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PreparedItemPublic>>;
     public finishToPrepareItemOnPost(preparedItemId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

         if (preparedItemId === null || preparedItemId === undefined) {
             throw new Error('Required parameter preparedItemId was null or undefined when calling finishToPrepareItemOnPost.');
         }

         let headers = this.initializeHeaders([]);
         return this.httpClient.request<PreparedItemPublic>('post',`${this.basePath}/preparedItems/${encodeURIComponent(String(preparedItemId))}/finish`,
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
      * @param post
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public getPreparatedItemsToStartByPost(post: string, observe?: 'body', reportProgress?: boolean): Observable<Array<PreparedItemInternal>>;
     public getPreparatedItemsToStartByPost(post: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PreparedItemInternal>>>;
     public getPreparatedItemsToStartByPost(post: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PreparedItemInternal>>>;
     public getPreparatedItemsToStartByPost(post: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

         if (post === null || post === undefined) {
             throw new Error('Required parameter post was null or undefined when calling getPreparatedItemsToStartByPost.');
         }

         let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
         if (post !== undefined && post !== null) {
             queryParameters = queryParameters.set('post', <any>post);
         }

         let headers = this.initializeHeaders([]);

         return this.httpClient.request<Array<PreparedItemInternal>>('get',`${this.basePath}/preparedItems`,
             {
                 params: queryParameters,
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
      * @param preparedItemId
      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
      * @param reportProgress flag to report request and response progress.
      */
     public startToPrepareItemOnPost(preparedItemId: string, observe?: 'body', reportProgress?: boolean): Observable<PreparedItemInternal>;
     public startToPrepareItemOnPost(preparedItemId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PreparedItemInternal>>;
     public startToPrepareItemOnPost(preparedItemId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PreparedItemInternal>>;
     public startToPrepareItemOnPost(preparedItemId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

         if (preparedItemId === null || preparedItemId === undefined) {
             throw new Error('Required parameter preparedItemId was null or undefined when calling startToPrepareItemOnPost.');
         }

         let headers = this.initializeHeaders([]);
         return this.httpClient.request<PreparedItemInternal>('post',`${this.basePath}/preparedItems/${encodeURIComponent(String(preparedItemId))}/start`,
             {
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

}
