import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TeslaDataService } from '../../services/tesla-data.service';
import { StepDataService } from '../../services/step-data.service';
import { CarModel, ColorOption, stepModal } from '../../models/modal';

@Component({
  selector: 'app-model-selection',
  templateUrl: './model-selection.component.html',
  styleUrls: ['./model-selection.component.scss'],
  imports: [CommonModule,ReactiveFormsModule],
  standalone: true
})
export class ModelSelectionComponent implements OnInit {
  @Output() modelSelected = new EventEmitter<CarModel>();
  form: FormGroup = new FormGroup({
    modelSelect: new FormControl(''),
    colorSelect: new FormControl(''),
    configSelect: new FormControl('')
  });
  models: CarModel[] = [];
  colors: ColorOption[] = [];
  selectedModel!: CarModel;
  private modelData!: Subscription;

  constructor(private teslaDataService: TeslaDataService, private stepDataService: StepDataService) {
    this.fetchInitialModels();
  }

  ngOnInit(): void {
    this.subscribeToModelData();
  }

  ngOnDestroy() {
    if (this.modelData) {
      this.modelData.unsubscribe();
    }
  }

  fetchInitialModels() {
    this.teslaDataService.getModels().subscribe(models => {
      this.models = models;
      this.stepDataService.setModelValue(models);
    });
  }

  subscribeToModelData() {
    this.modelData = this.stepDataService.getstep2Model().subscribe(model => {
      if (model?.modelSelect && model?.colorSelect) {
        this.selectedModel = model.currentModel;
        this.colors = model.currentColors;
        this.form.patchValue({
          modelSelect: model.modelSelect,
          colorSelect: model.colorSelect,
          configSelect: model.configSelect
        });
        this.updateModelSetup(model);
      }
    });
  }

  onModelChange(event: Event) {
    const selectedModelCode: string = this.form.get('modelSelect')!.value;
    const foundModel = this.models.find(model => model.code === selectedModelCode);
    if (foundModel) {
      this.selectedModel = foundModel;
      this.stepDataService.setselectedModel(foundModel);
      this.colors = foundModel.colors;
      this.form.patchValue({
        colorSelect: this.colors[0]?.code,
        configSelect: null
      });
      this.setDefaultSetup();
    }
  }

  onColorChange(event: Event) {
    this.setDefaultSetup();
  }

  getSelectedCarImageUrl(): string | null {
    const modelCode = this.form.get('modelSelect')!.value;
    const colorCode = this.form.get('colorSelect')!.value;
    return this.teslaDataService.getImageUrl(modelCode, colorCode);
  }

  updateModelSetup(model: stepModal) {
    let obj: stepModal = {
      modelSelect: this.form.get('modelSelect')!.value,
      colorSelect: this.form.get('colorSelect')!.value,
      currentModel: this.selectedModel,
      currentColors: this.colors,
      configSelect: this.form.get('configSelect')!.value,
      includeTow: model.includeTow ?? false,
      includeYoke: model.includeYoke ?? false,
    };
    this.stepDataService.setstep1Model(obj);
  }

  setDefaultSetup() {
    let obj = {
      modelSelect: this.form.get('modelSelect')!.value,
      colorSelect: this.form.get('colorSelect')!.value,
      currentModel: this.selectedModel,
      currentColors: this.colors,
      configSelect: this.form.get('configSelect')!.value,
      includeTow: false,
      includeYoke: false,
    };
    this.stepDataService.setstep1Model(obj);
  }
}
