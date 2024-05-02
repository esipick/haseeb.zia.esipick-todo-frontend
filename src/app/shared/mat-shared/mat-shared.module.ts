import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

const matModule = [
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ...matModule
  ]
})
export class MatSharedModule { }
