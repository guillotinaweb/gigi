import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ElementRef,
  ChangeDetectorRef,
  Renderer2,
  NgZone,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { registerCoreBlocks } from '@wordpress/block-library';
import { ReactWrapperComponent } from '@angular-react/core';

@Component({
  selector: 'app-gutenberg-editor',
  templateUrl: './gutenberg-editor.component.html',
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GutenbergEditorComponent extends ReactWrapperComponent<
  RichtextEditorProps
> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() blocks: any;

  styles = {
    'margin-left': '40%',
    width: '60%'
  };

  @Output('onEditChange') readonly onEditChange = new EventEmitter<any>();

  constructor(
    elementRef: ElementRef,
    changeDetectorRef: ChangeDetectorRef,
    renderer: Renderer2,
    ngZone: NgZone
  ) {
    super(elementRef, changeDetectorRef, renderer, {
      ngZone,
      setHostDisplay: true
    });
    this.blocks = [];
    registerCoreBlocks();
  }
}

interface RichtextEditorProps {
  onMouseEnter?: (ev: MouseEvent) => void;
  onMouseLeave?: (ev: MouseEvent) => void;
  content: string;
  styles?: object;
}
