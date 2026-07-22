import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { EmptyStateComponent } from '../../../../common/component/empty-state/empty-state.component';
import { LoaderComponent } from '../../../../common/component/loader/loader.component';
import { PageHeaderComponent } from '../../../../common/component/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../common/component/search-box/search-box.component';
import { StoreProfile, StoreService } from '../../../../service/store/store.service';

@Component({
  selector: 'mlp-store-find-page',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, SearchBoxComponent, LoaderComponent, EmptyStateComponent],
  templateUrl: './store-find-page.component.html',
  styleUrl: './store-find-page.component.scss'
})
export class StoreFindPageComponent {
  loading = false;
  searched = false;
  store: StoreProfile | undefined;

  
  constructor(
  private storeService: StoreService
) {}

  findStore(query: string): void {
    const trimmed = query.trim();
    if (!trimmed) {
      this.searched = false;
      this.store = undefined;
      return;
    }

    const id = Number(trimmed);
    if (isNaN(id)) {
      alert('Please enter a valid numeric Store ID.');
      return;
    }

    this.loading = true;
    this.searched = true;
    this.storeService.findStore(id).subscribe({
      next: (res) => {
        this.store = res;
        this.loading = false;
      },
      error: () => {
        this.store = undefined;
        this.loading = false;
      }
    });
  }
}