import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableConfig } from '../../model/receiving.model';
import { TableCellDirective } from '../../directive/table-cell.directive';
import { SearchBoxComponent } from '../../../../common/component/search-box/search-box.component';
import { StatusBadgeComponent } from '../../../../common/component/status-badge/status-badge.component';
import { LoaderComponent } from '../../../../common/component/loader/loader.component';
import { EmptyStateComponent } from '../../../../common/component/empty-state/empty-state.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    SearchBoxComponent,
    StatusBadgeComponent,
    LoaderComponent,
    EmptyStateComponent
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @Input() config!: TableConfig;
  @Input() data: any[] = [];
  @Input() loading = false;

  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<string>();
  @Output() add = new EventEmitter<void>();
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  @ContentChildren(TableCellDirective) cellTemplates!: QueryList<TableCellDirective>;

  selectedFilter = 'All';

  getTemplateForColumn(columnKey: string): TemplateRef<any> | null {
    const matched = this.cellTemplates?.find(t => t.columnName === columnKey);
    return matched ? matched.templateRef : null;
  }

  onSearch(query: string): void {
    this.search.emit(query);
  }

  onFilterChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedFilter = select.value;
    this.filter.emit(this.selectedFilter);
  }

  onAddClick(): void {
    this.add.emit();
  }

  onViewClick(item: any): void {
    this.view.emit(item);
  }

  onEditClick(item: any): void {
    this.edit.emit(item);
  }

  onDeleteClick(item: any): void {
    this.delete.emit(item);
  }

  // Row identification
  trackByRow(index: number, item: any): any {
    return item.receivingId || item.id || index;
  }
}
