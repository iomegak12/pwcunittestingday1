import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from '../customers/customers.component';
import { SearchPipe } from '../search.pipe';
import { HighlightDirective } from '../highlight.directive';

@NgModule({
  declarations: [CustomersComponent, SearchPipe, HighlightDirective],
  imports: [
    CommonModule
  ]
})
export class CrmsystemModule { }
