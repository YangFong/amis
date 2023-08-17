// 基本上都是从 sortable 那抄的，让拖拽切换有个动画，看起来更流畅。
// 用法是移动前先 animat.capture(container) 把移动前的位置信息记住
// 然后移动节点
// 然后 animate.animateAll(); 计算移动后的位置，然后马上通过 css transform 到原来的位置
// 然后开始动画到移动后的位置。

interface Rect {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
}

interface AnimationState {
  rect: Rect;
  target: HTMLElement & {
    toRect?: any;
    animationResetTimer?: NodeJS.Timeout;
    animationTime?: number;
    prevFromRect?: any;
    fromRect?: any;
    prevToRect?: any;
    thisAnimationDuration?: any;
  };
}

function userAgent(pattern: RegExp): any {
  if (typeof window !== 'undefined' && window.navigator) {
    return !!(/*@__PURE__*/ navigator.userAgent.match(pattern));
  }
}

const IE11OrLess = userAgent(
  /(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i
);
// const Edge = userAgent(/Edge/i);
// const FireFox = userAgent(/firefox/i);
// const Safari =
//   userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
// const IOS = userAgent(/iP(ad|od|hone)/i);
// const ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

const AnimationDuration = 150;
const AnimationEasing = 'cubic-bezier(1, 0, 0, 1)';

const toUpperCamelCase = (s: string) => {
  return [s[0].toUpperCase(), ...s.slice(1)].join('');
};

function css(
  el: HTMLElement & {currentStyle?: CSSStyleDeclaration},
  prop: keyof CSSStyleDeclaration,
  val?: string | number
) {
  if (val == null) {
    return (document.defaultView?.getComputedStyle(el, '') ??
      el.currentStyle)?.[prop];
  }

  const style = el.style;

  if (
    !(prop in style) &&
    typeof prop === 'string' &&
    prop.indexOf('webkit') === -1
  ) {
    prop = ('webkit' + toUpperCamelCase(prop)) as keyof CSSStyleDeclaration;
  }

  (style[prop] as string) = val + (typeof val === 'number' ? 'px' : '');
  return null;
}

function matrix(el: HTMLElement) {
  const transform = css(el, 'transform');
  let appliedTransforms = '';

  if (transform && transform !== 'none') {
    appliedTransforms = transform + ' ' + appliedTransforms;
  }

  const matrixFn =
    window.DOMMatrix ||
    window.WebKitCSSMatrix ||
    (window as any).CSSMatrix ||
    (window as any).MSCSSMatrix;

  /*jshint -W056 */
  return matrixFn && new matrixFn(appliedTransforms);
}

function isRectEqual(rect1: Rect, rect2: Rect) {
  return (
    Math.round(rect1.top) === Math.round(rect2.top) &&
    Math.round(rect1.left) === Math.round(rect2.left) &&
    Math.round(rect1.height) === Math.round(rect2.height) &&
    Math.round(rect1.width) === Math.round(rect2.width)
  );
}

function calculateRealTime(animatingRect: Rect, fromRect: Rect, toRect: Rect) {
  return (
    (Math.sqrt(
      Math.pow(fromRect.top - animatingRect.top, 2) +
        Math.pow(fromRect.left - animatingRect.left, 2)
    ) /
      Math.sqrt(
        Math.pow(fromRect.top - toRect.top, 2) +
          Math.pow(fromRect.left - toRect.left, 2)
      )) *
    AnimationDuration
  );
}

function getWindowScrollingElement() {
  return document.scrollingElement || document.documentElement;
}

function getRect(
  el: HTMLElement,
  relativeToContainingBlock?: boolean,
  relativeToNonStaticParent?: boolean,
  undoScale?: boolean,
  container?: HTMLElement
) {
  if (!el.getBoundingClientRect && (el as any) !== window) {
    return;
  }

  let elRect, top, left, bottom, right, height, width;

  if ((el as any) !== window && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }

  if (
    (relativeToContainingBlock || relativeToNonStaticParent) &&
    (el as any) !== window
  ) {
    // Adjust for translate()
    container = container || (el.parentNode as HTMLElement);

    // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
    // Not needed on <= IE11
    if (!IE11OrLess) {
      do {
        if (
          container &&
          container.getBoundingClientRect &&
          (css(container, 'transform') !== 'none' ||
            (relativeToNonStaticParent &&
              css(container, 'position') !== 'static'))
        ) {
          const containerRect = container.getBoundingClientRect();

          // Set relative to edges of padding box of container
          top -=
            containerRect.top +
            parseInt(css(container, 'borderTopWidth') as string);
          left -=
            containerRect.left +
            parseInt(css(container, 'borderLeftWidth') as string);
          bottom = top + (elRect as any).height;
          right = left + (elRect as any).width;

          break;
        }
        /* jshint boss:true */
      } while ((container = container.parentNode as HTMLElement));
    }
  }

  if (undoScale && (el as any) !== window) {
    // Adjust for scale()
    const elMatrix = matrix(container || el);
    if (elMatrix) {
      const scaleX = elMatrix.a;
      const scaleY = elMatrix.d;

      top /= scaleY;
      left /= scaleX;

      width /= scaleX;
      height /= scaleY;

      bottom = top + height;
      right = left + width;
    }
  }

  return {
    top,
    left,
    bottom,
    right,
    width,
    height
  };
}

export class AnimationManager {
  animating: boolean = false;
  animationCallbackId: any;
  states: Array<AnimationState> = [];

  capture(el: HTMLElement) {
    // 清空，重复调用，旧的不管了
    this.states = [];

    let children: Array<HTMLElement> = [].slice.call(el.children);
    children.forEach(child => {
      // 如果是 ghost
      if (child.classList.contains('is-ghost')) {
        return;
      }

      const rect = getRect(child)!;

      // 通常是隐藏节点
      if (!rect.width) {
        return;
      }

      const fromRect = {...rect};

      const state: AnimationState = {
        target: child,
        rect
      };

      // 还在动画中
      if ((child as any).thisAnimationDuration) {
        let childMatrix = matrix(child);

        if (childMatrix) {
          fromRect.top -= childMatrix.f;
          fromRect.left -= childMatrix.e;
        }
      }

      (child as any).fromRect = fromRect;
      this.states.push(state);
    });
  }

  animateAll(callback?: () => void) {
    this.animating = false;
    let animationTime = 0;

    this.states.forEach(state => {
      let time = 0,
        target = state.target,
        fromRect = (target as any).fromRect,
        toRect = {
          ...getRect(target)!
        },
        prevFromRect = (target as any).prevFromRect,
        prevToRect = (target as any).prevToRect,
        animatingRect = state.rect,
        targetMatrix = matrix(target);

      if (targetMatrix) {
        // Compensate for current animation
        toRect.top -= targetMatrix.f;
        toRect.left -= targetMatrix.e;
      }

      (target as any).toRect = toRect;

      if ((target as any).thisAnimationDuration) {
        // Could also check if animatingRect is between fromRect and toRect
        if (
          isRectEqual(prevFromRect, toRect) &&
          !isRectEqual(fromRect, toRect) &&
          // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) /
            (animatingRect.left - toRect.left) ===
            (fromRect.top - toRect.top) / (fromRect.left - toRect.left)
        ) {
          // If returning to same place as started from animation and on same axis
          time = calculateRealTime(animatingRect, prevFromRect, prevToRect);
        }
      }

      // if fromRect != toRect: animate
      if (!isRectEqual(toRect, fromRect)) {
        (target as any).prevFromRect = fromRect;
        (target as any).prevToRect = toRect;

        if (!time) {
          time = AnimationDuration;
        }
        this.animate(target, animatingRect, toRect, time);
      }

      if (time) {
        this.animating = true;
        animationTime = Math.max(animationTime, time);
        clearTimeout(target.animationResetTimer);
        target.animationResetTimer = setTimeout(function () {
          target.animationTime = 0;
          target.prevFromRect = null;
          target.fromRect = null;
          target.prevToRect = null;
          target.thisAnimationDuration = null;
        }, time);
        (target as any).thisAnimationDuration = time;
      }
    });

    clearTimeout(this.animationCallbackId);
    if (!this.animating) {
      typeof callback === 'function' && callback();
    } else {
      this.animationCallbackId = setTimeout(() => {
        this.animating = false;
        if (typeof callback === 'function') callback();
      }, animationTime);
    }
    this.states = [];
  }

  animate(
    // TODO 补充扩展类型
    target: HTMLElement & {animatingX?: boolean; animatingY?: boolean},
    currentRect: Rect,
    toRect: Rect,
    duration: number
  ) {
    if (duration) {
      let affectDisplay = false;
      css(target, 'transition', '');
      css(target, 'transform', '');
      let translateX = currentRect.left - toRect.left,
        translateY = currentRect.top - toRect.top;

      target.animatingX = !!translateX;
      target.animatingY = !!translateY;

      css(
        target,
        'transform',
        'translate3d(' + translateX + 'px,' + translateY + 'px,0)'
      );

      if (css(target, 'display') === 'inline') {
        affectDisplay = true;
        css(target, 'display', 'inline-block');
      }

      target.offsetWidth; // repaint

      css(
        target,
        'transition',
        'transform ' +
          duration +
          'ms' +
          (AnimationEasing ? ' ' + AnimationEasing : '')
      );
      css(target, 'transform', 'translate3d(0,0,0)');
      typeof (target as any).animated === 'number' &&
        clearTimeout((target as any).animated);
      (target as any).animated = setTimeout(function () {
        css(target, 'transition', '');
        css(target, 'transform', '');
        affectDisplay && css(target, 'display', '');
        (target as any).animated = false;

        (target as any).animatingX = false;
        (target as any).animatingY = false;
      }, duration);
    }
  }
}

export default new AnimationManager();
