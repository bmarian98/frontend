import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shelter } from 'src/app/classes/shelter/shelter';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ShelterService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getShelters(): Observable<Shelter[]>{
      console.log("se apeleaza!")
        return this.http.get<Shelter[]>(`${this.apiServerUrl}/shelter/all`);
    }

    public addShelter(shelter: Shelter): Observable<Shelter>{
        return this.http.post<Shelter>(`${this.apiServerUrl}/shelter/add`, shelter);
    }

    public updateShelter(shelter: Shelter): Observable<Shelter>{
        return this.http.put<Shelter>(`${this.apiServerUrl}/shelter/edit`, shelter);
    }

    public deleteShelter(shelterId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/shelter/delete/${shelterId}`);
    }

}
