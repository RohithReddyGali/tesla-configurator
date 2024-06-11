import { Routes, Route } from '@angular/router';
import { ConfigSelectionComponent } from './components/config-selection/config-selection.component';
import { ModelSelectionComponent } from './components/model-selection/model-selection.component';
import { SummaryComponent } from './components/summary/summary.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/step1', pathMatch: 'full' },

  {
    path: 'step1',
    component: ModelSelectionComponent,
  },
  {
    path: 'step2',
    component: ConfigSelectionComponent,
  },
  {
    path: 'step3',
    component: SummaryComponent,
  }

];
