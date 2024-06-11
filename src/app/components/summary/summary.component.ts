import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StepDataService } from '../../services/step-data.service';
import { TeslaDataService } from '../../services/tesla-data.service';
import { stepModal, ColorOption } from '../../models/modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class SummaryComponent implements OnInit, OnDestroy {
  summary!: stepModal;
  colorObject!: ColorOption;
  total: number = 0;
  private summaryData!: Subscription;

  constructor(
    private stepDataService: StepDataService, 
    private teslaDataService: TeslaDataService
  ) { }

  ngOnInit(): void {
    this.summaryData = this.stepDataService.getstep2Model().subscribe((model) => {
      if (model && model.modelSelect && model.colorSelect) {
        this.stepDataService.setstep1Model(model);
        this.summary = model;
        this.setUpColorAndCalculateTotal(model);
      }
    });
  }

  setUpColorAndCalculateTotal(model: stepModal): void {
    const configPrice = model.configSelectModel?.price ?? 0;
    this.colorObject = model.currentColors.find((e: any) => e.code === model.colorSelect) as ColorOption;
    const colorPrice = this.colorObject.price;
    const towPrice = model.includeTow ? 1000 : 0;
    const yokePrice = model.includeYoke ? 1000 : 0;
    this.total = configPrice + colorPrice + towPrice + yokePrice;
  }

  getSelectedCarImageUrl(): string | null {
    const { modelSelect, colorSelect } = this.summary;
    return (modelSelect && colorSelect) ? this.teslaDataService.getImageUrl(modelSelect, colorSelect) : null;
  }

  ngOnDestroy(): void {
    this.summaryData.unsubscribe();
  }
}
