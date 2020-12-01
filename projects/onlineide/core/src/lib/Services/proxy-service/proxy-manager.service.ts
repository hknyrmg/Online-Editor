import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ProxyContentTypes } from './enum/proxy-content-types.enum';
import { Observable, throwError } from 'rxjs';
import { map, finalize, retry, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProxyManager {
  private _baseUri: string;
  private _reqheaders = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/json' });

  constructor(private _httpClient: HttpClient,
    @Inject('baseApiUrl') baseApiUrl: string) {
    this._baseUri = baseApiUrl;
  }

  public post(actionName: string, body: any, contentType?: ProxyContentTypes): Observable<any> {
    // this._showSpinner(ProxyCallingTypes.Post);
    let httpRequestBody: any = contentType == ProxyContentTypes.UrlEncoded ? this._serializeObj(body) : body;

    let uri: string = `${this._baseUri}/${actionName}`;

    let headerOptions: any = { headers: this._getHeader(contentType) };

    if (contentType === ProxyContentTypes.Stream) {
      headerOptions.responseType = 'arraybuffer' as 'arraybuffer';
    }
    // return this._httpClient.post(uri, httpRequestBody, headerOptions).pipe(
    //   map((data: any) => {
    //     console.log(data);
    //     if (data)
    //       return data;
    //   }

    //   ),
    //   catchError((err: any) => throwError(err)),
    //   finalize(() => {
    //     // hideSpinner
    //   })
    // )
    return this._httpClient.post(uri, httpRequestBody, { headers: this._reqheaders });

  }
  public get(controllerName: string, actionName: string): Observable<any> {

    // this._showSpinner(ProxyCallingTypes.Post);

    // let uri: string = `${this._baseUri}/${controllerName}/${actionName}`;
    // TODO: HAKAN api endpointler gelince duzelecek
    let uri: string = `${this._baseUri}`;
    uri = controllerName ? uri + `/${controllerName}/${actionName}` : uri + `/${actionName}`;

    return this._httpClient.get(uri, { headers: this._reqheaders });

  }

  private _handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  private _serializeObj(obj: any): any {
    let result: any = [];
    for (let property in obj) {

      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    }
    return result.join("&");

  }
  private _getHeader(contentType: ProxyContentTypes): HttpHeaders {

    let headers: any = new HttpHeaders();

    headers = headers.append('Accept', 'text/html, application/xhtml+xml, */*');

    if (contentType == ProxyContentTypes.UrlEncoded) {
      headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }

    else if (contentType == ProxyContentTypes.Stream) {
      headers = headers.append('Content-Type', 'arraybuffer');
    }

    else {

      headers = headers.append('Content-Type', 'application/json; charset=UTF-8')
    }
    return headers;
  }
}

