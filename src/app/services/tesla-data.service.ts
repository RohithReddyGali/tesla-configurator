import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarModel, ConfigInformation, ConfigurationOption, ModelsResponse } from '../models/modal';

@Injectable({
  providedIn: 'root'
})
export class TeslaDataService {
  private apiEndpoint = '/models'; // Adjust this if your endpoint is different
  private optionsEndpoint = '/options/'; // Adjust if needed
  private imageBaseUrl = 'https://interstate21.com/tesla-app/images/';

  constructor(private http: HttpClient) { }

  getModels() {
    return this.http.get<CarModel[]>(this.apiEndpoint);
  }

  getConfigs(modelCode: string) {
    return this.http.get<ConfigInformation>(`${this.optionsEndpoint}${modelCode}`);
  }

  getImageUrl(modelCode: string, colorCode: string): string {
    return `${this.imageBaseUrl}${modelCode}/${colorCode}.jpg`;
  }
}
