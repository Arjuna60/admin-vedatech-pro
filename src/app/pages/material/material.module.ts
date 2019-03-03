import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule, MatTableModule, MatIconModule, MatPaginator, MatPaginatorModule, MatSortModule, MatButtonModule, MatButtonToggleModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class MaterialModule { }
