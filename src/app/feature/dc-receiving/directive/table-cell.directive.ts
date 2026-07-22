import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableCell]',
  standalone: true
})
export class TableCellDirective {
  @Input('tableCell') columnName!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
