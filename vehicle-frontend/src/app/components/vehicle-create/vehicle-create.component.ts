import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService, Vehicle } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss'],
})
export class VehicleCreateComponent {
  vehicle: Vehicle = {
    placa: '',
    chassi: '',
    renavam: '',
    modelo: '',
    marca: '',
    ano: new Date().getFullYear(),
  };

  currentYear: number = new Date().getFullYear();

  constructor(private vehicleService: VehicleService, private router: Router) {}

  save(): void {
    if (this.vehicle.placa.length !== 7) {
      console.error('Placa deve ter exatamente 7 caracteres.');
      return;
    }

    this.vehicleService.createVehicle(this.vehicle).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
