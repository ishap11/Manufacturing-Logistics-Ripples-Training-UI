import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input() placeholder: string = 'Search...';
  @Input() maxWidth: string = '100%';
  @Input() debounceMs: number = 300;
  
  @Output() search = new EventEmitter<string>();

  searchQuery: string = '';
  private searchSubject = new Subject<string>();
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.searchSubject.pipe(
      debounceTime(this.debounceMs),
      distinctUntilChanged()
    ).subscribe(value => {
      this.search.emit(value);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearchChanged(query: string): void {
    this.searchSubject.next(query);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchSubject.next('');
  }
}
