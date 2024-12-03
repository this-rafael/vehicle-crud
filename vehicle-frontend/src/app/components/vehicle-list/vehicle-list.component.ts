import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService, Vehicle } from '../../services/vehicle.service';
import { VehicleDetailComponent } from '../vehicle-detail/vehicle-detail.component';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule, VehicleDetailComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  skip = 0;
  take = 10;
  total = 0;

  filters = {
    nameLike: '',
    brandLike: '',
    year: undefined as number | undefined,
  };

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    const params = {
      skip: this.skip,
      take: this.take,
      nameLike: this.filters.nameLike,
      brandLike: this.filters.brandLike,
      year: this.filters.year,
    };

    this.vehicleService.getVehiclesWithFilters(params).subscribe((response) => {
      this.vehicles = response.items;
      this.total = response.total;
    });
  }

  loadMore(): void {
    this.skip += this.take;
    const params = {
      skip: this.skip,
      take: this.take,
      nameLike: this.filters.nameLike,
      brandLike: this.filters.brandLike,
      year: this.filters.year,
    };

    this.vehicleService.getVehiclesWithFilters(params).subscribe((response) => {
      this.vehicles = [...this.vehicles, ...response.items];
    });
  }

  search(): void {
    this.skip = 0;
    this.loadVehicles();
  }

  clearFilters(): void {
    this.filters = { nameLike: '', brandLike: '', year: undefined };
    this.skip = 0;
    this.loadVehicles();
  }
}
