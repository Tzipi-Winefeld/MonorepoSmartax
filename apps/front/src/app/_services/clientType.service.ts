import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClientType } from '../_models/clientType.module'; // Update the path according to the location of your model

@Injectable({
  providedIn: 'root'
})
export class ClientTypeService {

  private apiUrl = 'http://localhost:3000/clientTypes'; // Base URL for the ClientType API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) { }

  // Create a new ClientType
  createClientType(clientType: ClientType): Observable<ClientType> {
    return this.http.post<ClientType>(this.apiUrl, clientType, this.httpOptions)
      .pipe(
        catchError(this.handleError<ClientType>('createClientType'))
      );
  }

  // Get all ClientTypes
  getAllClientTypes(): Observable<ClientType[]> {
    return this.http.get<ClientType[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError<ClientType[]>('getAllClientTypes', []))
      );
  }

  // Search for a ClientType by ID
  searchClientType(id: string): Observable<ClientType[]> {
    return this.http.post<ClientType[]>(`${this.apiUrl}/searchClientType`, { id }, this.httpOptions)
      .pipe(
        catchError(this.handleError<ClientType[]>('searchClientType', []))
      );
  }

  // Update an existing ClientType
  updateClientType(clientType: ClientType): Observable<ClientType> {
    return this.http.put<ClientType>(`${this.apiUrl}`, clientType, this.httpOptions)
      .pipe(
        catchError(this.handleError<ClientType>('updateClientType'))
      );
  }

  // Delete a ClientType by ID
  deleteClientType(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}`, { ...this.httpOptions, body: { id } })
      .pipe(
        catchError(this.handleError<boolean>('deleteClientType', false))
      );
  }

  // Error handling function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error message to console
      return of(result as T); // Return default result to keep the app running
    };
  }
}
