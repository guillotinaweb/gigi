import { Component } from '@angular/core';
import { GrangeViews, Grange } from 'grange';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { SidebarService } from 'develop/pastanaga-angular/projects/pastanaga/src/lib/sidebar/sidebar.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isAuthenticated = false;
    constructor(
        private grange: Grange,
        private views: GrangeViews,
        private _sidebarService: SidebarService
    ) {
        this.views.initialize();
        this.grange.traverser.addView('edit', 'Document', DocumentEditComponent);

        this.grange.core.auth.isAuthenticated.subscribe(
            auth => (this.isAuthenticated = auth.state)
        );
    }

    toggleMenu() {
        this._sidebarService.getSidebar('toolbar').toggleOpen();
    }

    logout() {
        this.grange.core.auth.logout();
    }
}
