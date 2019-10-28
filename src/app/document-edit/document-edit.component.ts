import { Component, OnInit } from '@angular/core';
import { EditView } from 'develop/grange/projects/grange/src/lib/views/edit';
import { Grange } from 'grange';
import { Toaster, SidebarService } from 'pastanaga-angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent extends EditView {
  content: any;
  constructor(
    public grange: Grange,
    public toaster: Toaster,
    private sidebarService: SidebarService
  ) {
    super(grange, toaster);
    this.content = [];
  }

  save(content) {
    this.content = content;
  }

  onSave() {
    if (!this.error) {
      this.context.pipe(take(1)).subscribe(context => {
        const model = this.updateModel(context, this.editModel);
        model['guillotina_cms.interfaces.editors.IGutenberg'] = this.content;
        this.grange.core.resource.save(context['@id'], model).subscribe(
          () => {
            this.toaster.open('Updated');
            this.grange.traverser.traverse('.');
          },
          () => this.toaster.open('Error when updating')
        );
      });
    }
  }
  showMetadata() {
    this.sidebarService.getSidebar('metadata').toggleOpen();
  }
}
