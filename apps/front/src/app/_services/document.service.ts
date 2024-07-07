import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOCS_ENDPOINT } from '../api-urls';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http:HttpClient) { }
   public async uploadFile(formData:any):Promise<Observable<any>>{
    return this.http.post(DOCS_ENDPOINT, formData)
  }
  public getviewLink(fileId: string): Observable<any> {
    return this.http.get(`${DOCS_ENDPOINT}/link/${fileId}`);
  }
  public viewFile(fileId: string): Observable<Blob> {
    return this.http.get(`${DOCS_ENDPOINT}/file/${fileId}`, { responseType: 'blob' });
  }
  public getAllFiles(client_id:string): Observable<any> {
    return this.http.get(`${DOCS_ENDPOINT}/files/${client_id}`);
  }
}
