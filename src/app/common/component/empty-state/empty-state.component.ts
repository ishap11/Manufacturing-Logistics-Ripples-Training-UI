import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  @Input() icon: string = 'fa-folder-open';
  @Input() title: string = 'No Data Found';
  @Input() description: string = 'There are no items matching the criteria.';
  @Input() actionLabel: string = '';
  @Input() actionIcon: string = '';

  @Output() action = new EventEmitter<void>();

  onActionClicked(): void {
    this.action.emit();
  }
}
