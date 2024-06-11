import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarModel, ConfigurationOption, ColorOption, stepModal } from '../models/modal';

@Injectable({
  providedIn: 'root'
})
export class StepDataService {
  modelList = new BehaviorSubject<CarModel[]>([]);
  selectedModel = new BehaviorSubject<CarModel | null>(null);
  step1Model = new BehaviorSubject<stepModal | null>(null);
  step2Model = new BehaviorSubject<stepModal | null>(null);
  getModelsValue(): Observable<Object> {
    return this.modelList.asObservable();
  }
  setModelValue(settings: CarModel[]): void {
    this.modelList.next(settings);
  }

  getselectedModel(): Observable<CarModel | null> {
    return this.selectedModel.asObservable();
  }
  setselectedModel(settings: CarModel | null): void {
    this.selectedModel.next(settings);
  }

  getstep1Model(): Observable<stepModal | null> {
    return this.step1Model.asObservable();
  }
  setstep1Model(settings: stepModal | null): void {
    this.step1Model.next(settings);
  }

  getstep2Model(): Observable<stepModal | null> {
    return this.step2Model.asObservable();
  }
  setstep2Model(settings: stepModal | null): void {
    this.step2Model.next(settings);
  }
}
