import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  
  @Output() pageChange = new EventEmitter<number>();

  totalPages: number = 0;
  startItem: number = 0;
  endItem: number = 0;
  visiblePages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePagination();
  }

  private calculatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));
    
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    
    this.startItem = this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
    this.endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
    
    this.generateVisiblePages();
  }

  private generateVisiblePages(): void {
    const pages: number[] = [];
    const maxVisible = 5;
    
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    this.visiblePages = pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
