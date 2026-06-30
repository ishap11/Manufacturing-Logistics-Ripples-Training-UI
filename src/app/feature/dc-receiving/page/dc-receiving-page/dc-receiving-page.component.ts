import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../common/component/status-badge/status-badge.component';
import { LoaderComponent } from '../../../../common/component/loader/loader.component';
import { GateRecord } from '../../../../model/dc-receiving.model';

@Component({
  selector: 'app-dc-receiving-page',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, StatusBadgeComponent, LoaderComponent],
  templateUrl: './dc-receiving-page.component.html',
  styleUrl: './dc-receiving-page.component.scss'
})
export class DcReceivingPageComponent implements OnInit {
  loading = false;
  gates: GateRecord[] = [];

  ngOnInit(): void {
    this.loadGates();
  }

  loadGates(): void {
    this.loading = true;
    setTimeout(() => {
      this.gates = [
        { id: 1, gateName: 'Dock Gate 01', status: 'Active', activeShipment: { carrier: 'Maersk Transport', poRef: 'PO-2026-9021', qcCheck: 'Passed' } },
        { id: 2, gateName: 'Dock Gate 02', status: 'QC Check', activeShipment: { carrier: 'DHL Express', poRef: 'PO-2026-1045', qcCheck: 'Pending' } },
        { id: 3, gateName: 'Dock Gate 03', status: 'Idle' }
      ];
      this.loading = false;
    }, 400);
  }

  completeIntake(gate: GateRecord): void {
    alert(`Simulating receiving closure for ${gate.gateName}. Shipment stored on racks.`);
    gate.status = 'Idle';
    delete gate.activeShipment;
  }

  completeReceiving(gate: GateRecord): void {
    this.completeIntake(gate);
  }
}
