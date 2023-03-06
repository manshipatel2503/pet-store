import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  getPetsByStatus(status: string) {
    return this.http.get(`${environment.serverUrl}/pet/findByStatus?status=${status}`);
  }

  addPets(pet : any){
    return this.http.post(`${environment.serverUrl}/pet`, pet);
  }
}
