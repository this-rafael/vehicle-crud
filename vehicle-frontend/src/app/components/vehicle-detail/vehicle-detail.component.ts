import { Component, Input } from '@angular/core';
import { VehicleService, Vehicle } from '../../services/vehicle.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class VehicleDetailComponent {
  @Input() vehicle!: Vehicle;
  currentYear: number = new Date().getFullYear();

  constructor(private vehicleService: VehicleService, private router: Router) {}

  save(): void {
    if (!this.vehicle.placa || this.vehicle.placa.length !== 7) {
      alert('Placa deve ter exatamente 7 caracteres.');
      return;
    }

    this.vehicleService.updateVehicle(this.vehicle.id!, this.vehicle).subscribe(() => {
      alert('Veículo atualizado com sucesso!');
    });
  }

  delete(): void {
    this.vehicleService.deleteVehicle(this.vehicle.id!).subscribe(() => {
      alert('Veículo deletado com sucesso!');
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    });
  }
}
