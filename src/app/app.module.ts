import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { GrangeRootModule } from 'grange';
import { TraversalModule } from 'angular-traversal';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ButtonModule, SidebarModule } from 'pastanaga-angular';
import { AngularReactBrowserModule } from '@angular-react/core';
// import { DocumentEditViewComponent } from './document-edit-view/document-edit-view.component';
import { registerElement } from '@angular-react/core';
import { NxModule } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RichtextEditorComponent } from './richtext-editor/richtext-editor.component';
import { GutenbergEditorComponent } from './gutenberg-editor/gutenberg-editor.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { Editable, DragDropContext } from '@react-page/core';
import EditorUi from '@react-page/ui';
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
  BlockInspector,
  WritingFlow,
  ObserveTyping
} from '@wordpress/block-editor';
import {
  Button,
  Popover,
  SlotFillProvider,
  DropZoneProvider
} from '@wordpress/components';
import { GrangeFormModule } from 'grange-form';
import { SchemaFormModule } from 'ngx-schema-form';

@NgModule({
  declarations: [
    AppComponent,
    RichtextEditorComponent,
    GutenbergEditorComponent,
    DocumentEditComponent
  ],
  entryComponents: [DocumentEditComponent],
  imports: [
    AngularReactBrowserModule,
    NxModule.forRoot(),
    BrowserAnimationsModule,
    ButtonModule,
    TraversalModule,
    SchemaFormModule.forRoot(),
    GrangeRootModule.forRoot(),
    SidebarModule,
    GrangeFormModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 25
    }),
    ButtonModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: 'CONFIGURATION',
      useValue: {
        BACKEND_URL: environment.backend,
        CLIENT_TIMEOUT: 5000
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Editable', () => Editable);
    registerElement('EditorUi', () => EditorUi);
    registerElement('BlockEditorProvider', () => BlockEditorProvider);
    registerElement('BlockInspector', () => BlockInspector);
    registerElement(
      'BlockEditorKeyboardShortcuts',
      () => BlockEditorKeyboardShortcuts
    );
    registerElement('WritingFlow', () => WritingFlow);
    registerElement('ObserveTyping', () => ObserveTyping);
    registerElement('BlockList', () => BlockList);
    registerElement('DropZoneProvider', () => DropZoneProvider);
    registerElement('SlotFillProvider', () => SlotFillProvider);
    registerElement('Popover.Slot', () => Popover.Slot);
    registerElement('DragDropContext', () => DragDropContext);
  }
}
