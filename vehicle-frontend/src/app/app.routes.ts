import { Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleCreateComponent } from './components/vehicle-create/vehicle-create.component';

export const routes: Routes = [
  { path: '', component: VehicleListComponent },
  { path: 'create', component: VehicleCreateComponent },
  { path: '**', redirectTo: '' },
];
