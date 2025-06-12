import { Injectable } from "@angular/core";
import { IPassagerDto, Passager } from "../models/passager.model";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PassagerService {
    constructor(private http: HttpClient) { }
    
    getPassengers(icao: string): Observable<Passager[]>{
        return this.http.get<any>(`https://randomuser.me/api/?results=20&inc=name,picture&seed=${icao}`).pipe(
              map((response) => response.results
                .map((dto: IPassagerDto) => new Passager(dto))
            ));
    }

}