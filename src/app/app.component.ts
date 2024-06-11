import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StepDataService } from './services/step-data.service';
import { ModelSelectionComponent } from './components/model-selection/model-selection.component';
import { ConfigSelectionComponent } from './components/config-selection/config-selection.component';
import { SummaryComponent } from './components/summary/summary.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    ModelSelectionComponent,
    ConfigSelectionComponent,
    SummaryComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tesla-configurator';
  tabSelected: number = 1;
  modalData !: Subscription;
  configData !: Subscription;
  step2Active: boolean = false;
  step3Active: boolean = false;
  constructor(private stepDataService: StepDataService) {
    this.modalData = this.stepDataService.getstep1Model().subscribe((model) => {
      if (model?.modelSelect && model?.colorSelect)
        this.step2Active = true;
    });
    this.configData = this.stepDataService.getstep2Model().subscribe((model) => {
      if (model?.configSelect && model?.configSelect != "")
        this.step3Active = true;
    });
  }


  ngOnDestroy() {
    this.configData.unsubscribe();
    this.modalData.unsubscribe();
  }


  canSelectStep2(): boolean {
    // return this.stepDataService.selectedModelValue !== null;
    return true;
  }

  canSelectStep3(): boolean {
    //   return this.stepDataService.selectedModelValue !== null &&
    //     this.stepDataService.selectedConfigValue !== null;
    // }
    return true;
  }
}
