import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeslaDataService } from '../../services/tesla-data.service';
import { StepDataService } from '../../services/step-data.service';
import { CarModel, ColorOption, ConfigInformation, ConfigurationOption, stepModal } from '../../models/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config-selection',
  templateUrl: './config-selection.component.html',
  styleUrls: ['./config-selection.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class ConfigSelectionComponent implements OnInit {
  @Output() configSelected = new EventEmitter<ConfigurationOption>();
  form: FormGroup;
  configs: ConfigurationOption[] = [];
  selectedModel!: CarModel;
  colors: ColorOption[] = [];
  configData !: Subscription;
  currentConfigSelect: ConfigurationOption | null = null;
  constructor(
    private teslaDataService: TeslaDataService,
    private stepDataService: StepDataService
  ) {
    this.form = new FormGroup({
      modelSelect: new FormControl(),
      colorSelect: new FormControl(),
      configSelect: new FormControl(),
      configSelectModel: new FormControl(),
      includeTow: new FormControl({ value: false, disabled: true }),
      includeYoke: new FormControl({ value: false, disabled: true })
    });
  }

  ngOnInit(): void {
    // Assuming selectedModel is being set in stepDataService when a model is selected

    this.configData = this.stepDataService.getstep1Model().subscribe((model) => {
      console.log("step-2", model)
      if (model && model.modelSelect) {
        this.selectedModel = model.currentModel;
        this.teslaDataService.getConfigs(model.modelSelect).subscribe((configData: ConfigInformation) => {
          this.configs = configData.configs || [];
          this.updateOptionCheckboxes(configData);
          if (this.configs.length > 0) {
            // Set initial config selection and notify the StepDataService
            const initialConfig = this.configs[0];
            if (model.configSelect) {
              this.form.patchValue({
                configSelect: model.configSelect,
                configSelectModel: this.configs.find((e: ConfigurationOption) => e.id == Number(model.configSelect))
              })
              this.currentConfigSelect = this.configs.find((e: ConfigurationOption) => e.id == Number(model.configSelect)) as ConfigurationOption;
            }
            else {
              this.form.controls['configSelect'].setValue(initialConfig.id, { emitEvent: true });
              this.form.controls['configSelectModel'].setValue(initialConfig, { emitEvent: true });
              this.currentConfigSelect = initialConfig;

            }
          }

          this.form.patchValue({
            modelSelect: model.modelSelect,
            colorSelect: model.colorSelect,
            includeTow: model.includeTow,
            includeYoke: model.includeYoke,
          })
          this.setModuleSetup(model)
        });
      }

    })
  }

  ngOnDestroy() {
    this.configData.unsubscribe();
  }

  onConfigChange(event: Event) {
    this.currentConfigSelect = this.configs.find((e: ConfigurationOption) => e.id == Number(this.form.get('configSelect')!.value)) as ConfigurationOption;
    this.form.patchValue({
      configSelect: this.form.get('configSelect')!.value,
      configSelectModel: this.currentConfigSelect
    })
    this.setDefaultSetup();
  }

  onCheckChange(event: Event) {
    this.setDefaultSetup();
  }

  updateOptionCheckboxes(model: ConfigInformation): void {
    this.form.controls['includeTow'].setValue(false, { emitEvent: false });
    this.form.controls['includeYoke'].setValue(false, { emitEvent: false });

    if (model.towHitch) {
      this.form.controls['includeTow'].enable();
    } else {
      this.form.controls['includeTow'].disable();
    }

    if (model.yoke) {
      this.form.controls['includeYoke'].enable();
    } else {
      this.form.controls['includeYoke'].disable();
    }
  }
  getSelectedCarImageUrl(): string | null {
    const modelCode = this.form.get('modelSelect')!.value;
    const colorCode = this.form.get('colorSelect')!.value;
    return (modelCode && colorCode) ? this.teslaDataService.getImageUrl(modelCode, colorCode) : null;
  }

  setModuleSetup(model: stepModal) {
    let obj = {
      modelSelect: this.form.get('modelSelect')!.value,
      colorSelect: this.form.get('colorSelect')!.value,
      configSelect: this.form.get('configSelect')!.value,
      currentModel: this.selectedModel,
      currentColors: model && model.currentColors ? model.currentColors : this.selectedModel.colors,
      includeTow: this.form.get('includeTow')!.value,
      includeYoke: this.form.get('includeYoke')!.value,
      configSelectModel: this.currentConfigSelect
    }
    this.stepDataService.setstep2Model(obj);
  }
  setDefaultSetup() {
    let obj: stepModal = {
      modelSelect: this.form.get('modelSelect')!.value,
      colorSelect: this.form.get('colorSelect')!.value,
      configSelect: this.form.get('configSelect')!.value,
      currentModel: this.selectedModel,
      currentColors: this.selectedModel.colors,
      includeTow: this.form.get('includeTow')!.value,
      includeYoke: this.form.get('includeYoke')!.value,
      configSelectModel: this.currentConfigSelect
    }
    this.stepDataService.setstep2Model(obj);
  }
}
