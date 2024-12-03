import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vehicle {
  id?: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}


export interface VehicleResponse {
  take: number;
  skip: number;
  total: number;
  items: Vehicle[];
  order: Record<string, any>;
}


@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/vehicles';

  constructor(private http: HttpClient) {}

  getVehicles(skip: number = 0, take: number = 10): Observable<VehicleResponse> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('take', take.toString())
      .set('selectedFields', 'placa,modelo,ano,marca,chassi,renavam');

    return this.http.get<VehicleResponse>(`${this.apiUrl}/search`, { params });
  }

  getVehicle(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

  updateVehicle(id: string, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${id}`, vehicle);
  }

  deleteVehicle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getVehiclesWithFilters(params: { skip: number; take: number; nameLike?: string; brandLike?: string; year?: number }): Observable<VehicleResponse> {
    let httpParams = new HttpParams()
      .set('skip', params.skip.toString())
      .set('take', params.take.toString())
      .set('selectedFields', 'placa,modelo,ano,marca,chassi,renavam');

    if (params.nameLike) {
      httpParams = httpParams.set('nameLike', params.nameLike);
    }

    if (params.brandLike) {
      httpParams = httpParams.set('brandLike', params.brandLike);
    }

    if (params.year) {
      httpParams = httpParams.set('year', params.year.toString());
    }

    return this.http.get<VehicleResponse>(`${this.apiUrl}/search`, { params: httpParams });
  }
}
