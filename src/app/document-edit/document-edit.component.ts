import { Component, OnInit } from '@angular/core';
import { EditView } from 'develop/grange/projects/grange/src/lib/views/edit';
import { Grange } from 'grange';
import { Toaster, SidebarService } from 'pastanaga-angular';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent extends EditView {
  constructor(
    public grange: Grange,
    public toaster: Toaster,
    private _sidebarService: SidebarService
  ) {
    super(grange, toaster);
  }

  save($event) {
    debugger;
  }

  showMetadata() {
    this._sidebarService.getSidebar('metadata').toggleOpen();
  }
}
