import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(protected http: HttpClient) { }

  public uploadFile(archivo: File): Observable<String>{
    const formData = new FormData();
    formData.append('multipartFile', archivo);
    return this.http.post<String>('http://localhost:8080/upload',
     formData);
  }
}
