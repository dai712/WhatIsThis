import { Injectable } from '@angular/core';

function _window(): any {
  return window;
}

@Injectable()
export class WindowRef {
  get nativeWindow(): any {
    return _window();
  }
}

// 새 창을 위한 Service
