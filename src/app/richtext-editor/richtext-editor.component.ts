import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Renderer2,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';
import * as React from 'react';
import { ReactWrapperComponent } from '@angular-react/core';
import Editor, { createEmptyState } from '@react-page/core';
import { imagePlugin } from '@react-page/plugins-image';
import { ImageUploadType } from '@react-page/ui/lib/ImageUpload/types';
import slate from '@react-page/plugins-slate';
import spacer from '@react-page/plugins-spacer';
import video from '@react-page/plugins-video';
import background from '@react-page/plugins-background';
import html5video from '@react-page/plugins-html5-video';
import native from '@react-page/plugins-default-native';
import divider from '@react-page/plugins-divider';

import { Plugins } from '@react-page/core';
import { ModeEnum } from '@react-page/plugins-background';
import content from './content';

const fakeImageUploadService: (url: string) => ImageUploadType = defaultUrl => (
  file,
  reportProgress
) => {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      reportProgress(counter * 10);
      if (counter > 9) {
        clearInterval(interval);
        alert(
          'This is a fake image upload service, please provide actual implementation via plugin properties'
        );
        resolve({ url: defaultUrl });
      }
    }, 500);
  });
};

@Component({
  selector: 'app-richtext-editor',
  templateUrl: './richtext-editor.component.html',
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichtextEditorComponent extends ReactWrapperComponent<
  RichtextEditorProps
> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  constructor(
    elementRef: ElementRef,
    changeDetectorRef: ChangeDetectorRef,
    renderer: Renderer2,
    ngZone: NgZone
  ) {
    const slatePlugin = slate(def => ({
      ...def,
      plugins: {
        ...def.plugins
      }
    }));
    // Define which plugins we want to use (all of the above)
    const plugins: Plugins = {
      content: [
        slatePlugin,
        spacer,
        imagePlugin({
          imageUpload: fakeImageUploadService('/images/react.png')
        }),
        video,
        divider,
        html5video
      ],
      layout: [
        background({
          defaultPlugin: slatePlugin,
          imageUpload: fakeImageUploadService('/images/sea-bg.jpg'),
          enabledModes:
            ModeEnum.COLOR_MODE_FLAG |
            ModeEnum.IMAGE_MODE_FLAG |
            ModeEnum.GRADIENT_MODE_FLAG
        })
      ],

      // If you pass the native key the editor will be able to handle native drag and drop events (such as links, text, etc).
      // The native plugin will then be responsible to properly display the data which was dropped onto the editor.
      native
    };

    const editor = new Editor({
      plugins: plugins,
      // pass the content states
      editables: [
        ...content,
        // creates an empty state, basically like the line above
        createEmptyState()
      ]
    });
    super(elementRef, changeDetectorRef, renderer, {
      ngZone,
      setHostDisplay: true
    });
  }
}

interface RichtextEditorProps {
  onMouseEnter?: (ev: MouseEvent) => void;
  onMouseLeave?: (ev: MouseEvent) => void;
  content: string;
  styles?: object;
}
