import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { RouterModule, Routes } from '@angular/router';
import { CodeEditorModule, CodeEditorService, setupEditorService } from '@ngstack/code-editor';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  }
];

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CodeEditorModule.forChild()
  ]
})
export class EditorModule { }
