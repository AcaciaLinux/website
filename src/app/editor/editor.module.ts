import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { RouterModule, Routes } from '@angular/router';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  }
];

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets', // configure base path for monaco editor. Starting with version 8.0.0 it defaults to './assets'. Previous releases default to '/assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MonacoEditorModule.forRoot()
  ]
})
export class EditorModule { }
