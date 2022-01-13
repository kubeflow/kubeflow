import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import memoize from 'lodash.memoize';
import { ResizeObserver } from '@juggle/resize-observer';
import canUseDOM from 'can-use-dom';
import scrollbarWidth from './scrollbar-width';
import { getElementWindow, getElementDocument } from './helpers';

export default class SimpleBar {
  constructor(element, options) {
    this.el = element;
    this.minScrollbarWidth = 20;
    this.options = { ...SimpleBar.defaultOptions, ...options };
    this.classNames = {
      ...SimpleBar.defaultOptions.classNames,
      ...this.options.classNames
    };
    this.axis = {
      x: {
        scrollOffsetAttr: 'scrollLeft',
        sizeAttr: 'width',
        scrollSizeAttr: 'scrollWidth',
        offsetSizeAttr: 'offsetWidth',
        offsetAttr: 'left',
        overflowAttr: 'overflowX',
        dragOffset: 0,
        isOverflowing: true,
        isVisible: false,
        forceVisible: false,
        track: {},
        scrollbar: {}
      },
      y: {
        scrollOffsetAttr: 'scrollTop',
        sizeAttr: 'height',
        scrollSizeAttr: 'scrollHeight',
        offsetSizeAttr: 'offsetHeight',
        offsetAttr: 'top',
        overflowAttr: 'overflowY',
        dragOffset: 0,
        isOverflowing: true,
        isVisible: false,
        forceVisible: false,
        track: {},
        scrollbar: {}
      }
    };
    this.removePreventClickId = null;

    // Don't re-instantiate over an existing one
    if (SimpleBar.instances.has(this.el)) {
      return;
    }

    this.recalculate = throttle(this.recalculate.bind(this), 64);
    this.onMouseMove = throttle(this.onMouseMove.bind(this), 64);
    this.hideScrollbars = debounce(
      this.hideScrollbars.bind(this),
      this.options.timeout
    );
    this.onWindowResize = debounce(this.onWindowResize.bind(this), 64, {
      leading: true
    });

    SimpleBar.getRtlHelpers = memoize(SimpleBar.getRtlHelpers);

    this.init();
  }

  /**
   * Static properties
   */

  /**
   * Helper to fix browsers inconsistency on RTL:
   *  - Firefox inverts the scrollbar initial position
   *  - IE11 inverts both scrollbar position and scrolling offset
   * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
   */
  static getRtlHelpers() {
    const dummyDiv = document.createElement('div');
    dummyDiv.innerHTML =
      '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
    const scrollbarDummyEl = dummyDiv.firstElementChild;
    document.body.appendChild(scrollbarDummyEl);
    const dummyContainerChild = scrollbarDummyEl.firstElementChild;
    scrollbarDummyEl.scrollLeft = 0;
    const dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
    const dummyContainerChildOffset = SimpleBar.getOffset(dummyContainerChild);
    scrollbarDummyEl.scrollLeft = 999;
    const dummyContainerScrollOffsetAfterScroll = SimpleBar.getOffset(
      dummyContainerChild
    );

    return {
      // determines if the scrolling is responding with negative values
      isRtlScrollingInverted:
        dummyContainerOffset.left !== dummyContainerChildOffset.left &&
        dummyContainerChildOffset.left -
          dummyContainerScrollOffsetAfterScroll.left !==
          0,
      // determines if the origin scrollbar position is inverted or not (positioned on left or right)
      isRtlScrollbarInverted:
        dummyContainerOffset.left !== dummyContainerChildOffset.left
    };
  }

  static defaultOptions = {
    autoHide: true,
    forceVisible: false,
    clickOnTrack: true,
    clickOnTrackSpeed: 40,
    classNames: {
      contentEl: 'simplebar-content',
      contentWrapper: 'simplebar-content-wrapper',
      offset: 'simplebar-offset',
      mask: 'simplebar-mask',
      wrapper: 'simplebar-wrapper',
      placeholder: 'simplebar-placeholder',
      scrollbar: 'simplebar-scrollbar',
      track: 'simplebar-track',
      heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
      heightAutoObserverEl: 'simplebar-height-auto-observer',
      visible: 'simplebar-visible',
      horizontal: 'simplebar-horizontal',
      vertical: 'simplebar-vertical',
      hover: 'simplebar-hover',
      dragging: 'simplebar-dragging'
    },
    scrollbarMinSize: 25,
    scrollbarMaxSize: 0,
    timeout: 1000
  };

  static getOffset(el) {
    const rect = el.getBoundingClientRect();
    const elDocument = getElementDocument(el);
    const elWindow = getElementWindow(el);

    return {
      top:
        rect.top +
        (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
      left:
        rect.left +
        (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
    };
  }

  static instances = new WeakMap();

  init() {
    // Save a reference to the instance, so we know this DOM node has already been instancied
    SimpleBar.instances.set(this.el, this);

    // We stop here on server-side
    if (canUseDOM) {
      this.initDOM();

      this.scrollbarWidth = this.getScrollbarWidth();

      this.recalculate();

      this.initListeners();
    }
  }

  initDOM() {
    // make sure this element doesn't have the elements yet
    if (
      Array.prototype.filter.call(this.el.children, child =>
        child.classList.contains(this.classNames.wrapper)
      ).length
    ) {
      // assume that element has his DOM already initiated
      this.wrapperEl = this.el.querySelector(`.${this.classNames.wrapper}`);
      this.contentWrapperEl =
        this.options.scrollableNode ||
        this.el.querySelector(`.${this.classNames.contentWrapper}`);
      this.contentEl =
        this.options.contentNode ||
        this.el.querySelector(`.${this.classNames.contentEl}`);

      this.offsetEl = this.el.querySelector(`.${this.classNames.offset}`);
      this.maskEl = this.el.querySelector(`.${this.classNames.mask}`);

      this.placeholderEl = this.findChild(
        this.wrapperEl,
        `.${this.classNames.placeholder}`
      );
      this.heightAutoObserverWrapperEl = this.el.querySelector(
        `.${this.classNames.heightAutoObserverWrapperEl}`
      );
      this.heightAutoObserverEl = this.el.querySelector(
        `.${this.classNames.heightAutoObserverEl}`
      );
      this.axis.x.track.el = this.findChild(
        this.el,
        `.${this.classNames.track}.${this.classNames.horizontal}`
      );
      this.axis.y.track.el = this.findChild(
        this.el,
        `.${this.classNames.track}.${this.classNames.vertical}`
      );
    } else {
      // Prepare DOM
      this.wrapperEl = document.createElement('div');
      this.contentWrapperEl = document.createElement('div');
      this.offsetEl = document.createElement('div');
      this.maskEl = document.createElement('div');
      this.contentEl = document.createElement('div');
      this.placeholderEl = document.createElement('div');
      this.heightAutoObserverWrapperEl = document.createElement('div');
      this.heightAutoObserverEl = document.createElement('div');

      this.wrapperEl.classList.add(this.classNames.wrapper);
      this.contentWrapperEl.classList.add(this.classNames.contentWrapper);
      this.offsetEl.classList.add(this.classNames.offset);
      this.maskEl.classList.add(this.classNames.mask);
      this.contentEl.classList.add(this.classNames.contentEl);
      this.placeholderEl.classList.add(this.classNames.placeholder);
      this.heightAutoObserverWrapperEl.classList.add(
        this.classNames.heightAutoObserverWrapperEl
      );
      this.heightAutoObserverEl.classList.add(
        this.classNames.heightAutoObserverEl
      );

      while (this.el.firstChild) {
        this.contentEl.appendChild(this.el.firstChild);
      }

      this.contentWrapperEl.appendChild(this.contentEl);
      this.offsetEl.appendChild(this.contentWrapperEl);
      this.maskEl.appendChild(this.offsetEl);
      this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
      this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
      this.wrapperEl.appendChild(this.maskEl);
      this.wrapperEl.appendChild(this.placeholderEl);
      this.el.appendChild(this.wrapperEl);
    }

    if (!this.axis.x.track.el || !this.axis.y.track.el) {
      const track = document.createElement('div');
      const scrollbar = document.createElement('div');

      track.classList.add(this.classNames.track);
      scrollbar.classList.add(this.classNames.scrollbar);

      track.appendChild(scrollbar);

      this.axis.x.track.el = track.cloneNode(true);
      this.axis.x.track.el.classList.add(this.classNames.horizontal);

      this.axis.y.track.el = track.cloneNode(true);
      this.axis.y.track.el.classList.add(this.classNames.vertical);

      this.el.appendChild(this.axis.x.track.el);
      this.el.appendChild(this.axis.y.track.el);
    }

    this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(
      `.${this.classNames.scrollbar}`
    );
    this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(
      `.${this.classNames.scrollbar}`
    );

    if (!this.options.autoHide) {
      this.axis.x.scrollbar.el.classList.add(this.classNames.visible);
      this.axis.y.scrollbar.el.classList.add(this.classNames.visible);
    }

    this.el.setAttribute('data-simplebar', 'init');
  }

  initListeners() {
    const elWindow = getElementWindow(this.el);
    // Event listeners
    if (this.options.autoHide) {
      this.el.addEventListener('mouseenter', this.onMouseEnter);
    }

    ['mousedown', 'click', 'dblclick'].forEach(e => {
      this.el.addEventListener(e, this.onPointerEvent, true);
    });

    ['touchstart', 'touchend', 'touchmove'].forEach(e => {
      this.el.addEventListener(e, this.onPointerEvent, {
        capture: true,
        passive: true
      });
    });

    this.el.addEventListener('mousemove', this.onMouseMove);
    this.el.addEventListener('mouseleave', this.onMouseLeave);

    this.contentWrapperEl.addEventListener('scroll', this.onScroll);

    // Browser zoom triggers a window resize
    elWindow.addEventListener('resize', this.onWindowResize);

    // Hack for https://github.com/WICG/ResizeObserver/issues/38
    let resizeObserverStarted = false;
    const resizeObserver = elWindow.ResizeObserver || ResizeObserver;
    this.resizeObserver = new resizeObserver(() => {
      if (!resizeObserverStarted) return;
      this.recalculate();
    });

    this.resizeObserver.observe(this.el);
    this.resizeObserver.observe(this.contentEl);

    elWindow.requestAnimationFrame(() => {
      resizeObserverStarted = true;
    });

    // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.
    this.mutationObserver = new elWindow.MutationObserver(this.recalculate);

    this.mutationObserver.observe(this.contentEl, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  recalculate() {
    const elWindow = getElementWindow(this.el);
    this.elStyles = elWindow.getComputedStyle(this.el);
    this.isRtl = this.elStyles.direction === 'rtl';

    const isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
    const isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1;
    const contentElOffsetWidth = this.contentEl.offsetWidth;

    const contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;

    const elOverflowX = this.elStyles.overflowX;
    const elOverflowY = this.elStyles.overflowY;

    this.contentEl.style.padding = `${this.elStyles.paddingTop} ${this.elStyles.paddingRight} ${this.elStyles.paddingBottom} ${this.elStyles.paddingLeft}`;
    this.wrapperEl.style.margin = `-${this.elStyles.paddingTop} -${this.elStyles.paddingRight} -${this.elStyles.paddingBottom} -${this.elStyles.paddingLeft}`;

    const contentElScrollHeight = this.contentEl.scrollHeight;
    const contentElScrollWidth = this.contentEl.scrollWidth;

    this.contentWrapperEl.style.height = isHeightAuto ? 'auto' : '100%';

    // Determine placeholder size
    this.placeholderEl.style.width = isWidthAuto
      ? `${contentElOffsetWidth}px`
      : 'auto';
    this.placeholderEl.style.height = `${contentElScrollHeight}px`;

    const contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;

    this.axis.x.isOverflowing = contentElScrollWidth > contentElOffsetWidth;
    this.axis.y.isOverflowing =
      contentElScrollHeight > contentWrapperElOffsetHeight;

    // Set isOverflowing to false if user explicitely set hidden overflow
    this.axis.x.isOverflowing =
      elOverflowX === 'hidden' ? false : this.axis.x.isOverflowing;
    this.axis.y.isOverflowing =
      elOverflowY === 'hidden' ? false : this.axis.y.isOverflowing;

    this.axis.x.forceVisible =
      this.options.forceVisible === 'x' || this.options.forceVisible === true;
    this.axis.y.forceVisible =
      this.options.forceVisible === 'y' || this.options.forceVisible === true;

    this.hideNativeScrollbar();

    // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)
    let offsetForXScrollbar = this.axis.x.isOverflowing
      ? this.scrollbarWidth
      : 0;
    let offsetForYScrollbar = this.axis.y.isOverflowing
      ? this.scrollbarWidth
      : 0;

    this.axis.x.isOverflowing =
      this.axis.x.isOverflowing &&
      contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
    this.axis.y.isOverflowing =
      this.axis.y.isOverflowing &&
      contentElScrollHeight >
        contentWrapperElOffsetHeight - offsetForXScrollbar;

    this.axis.x.scrollbar.size = this.getScrollbarSize('x');
    this.axis.y.scrollbar.size = this.getScrollbarSize('y');

    this.axis.x.scrollbar.el.style.width = `${this.axis.x.scrollbar.size}px`;
    this.axis.y.scrollbar.el.style.height = `${this.axis.y.scrollbar.size}px`;

    this.positionScrollbar('x');
    this.positionScrollbar('y');

    this.toggleTrackVisibility('x');
    this.toggleTrackVisibility('y');
  }

  /**
   * Calculate scrollbar size
   */
  getScrollbarSize(axis = 'y') {
    if (!this.axis[axis].isOverflowing) {
      return 0;
    }

    const contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
    const trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
    let scrollbarSize;

    let scrollbarRatio = trackSize / contentSize;

    // Calculate new height/position of drag handle.
    scrollbarSize = Math.max(
      ~~(scrollbarRatio * trackSize),
      this.options.scrollbarMinSize
    );

    if (this.options.scrollbarMaxSize) {
      scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
    }

    return scrollbarSize;
  }

  positionScrollbar(axis = 'y') {
    if (!this.axis[axis].isOverflowing) {
      return;
    }

    const contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
    const trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
    const hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
    const scrollbar = this.axis[axis].scrollbar;

    let scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
    scrollOffset =
      axis === 'x' &&
      this.isRtl &&
      SimpleBar.getRtlHelpers().isRtlScrollingInverted
        ? -scrollOffset
        : scrollOffset;
    let scrollPourcent = scrollOffset / (contentSize - hostSize);

    let handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
    handleOffset =
      axis === 'x' &&
      this.isRtl &&
      SimpleBar.getRtlHelpers().isRtlScrollbarInverted
        ? handleOffset + (trackSize - scrollbar.size)
        : handleOffset;

    scrollbar.el.style.transform =
      axis === 'x'
        ? `translate3d(${handleOffset}px, 0, 0)`
        : `translate3d(0, ${handleOffset}px, 0)`;
  }

  toggleTrackVisibility(axis = 'y') {
    const track = this.axis[axis].track.el;
    const scrollbar = this.axis[axis].scrollbar.el;

    if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
      track.style.visibility = 'visible';
      this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'scroll';
    } else {
      track.style.visibility = 'hidden';
      this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'hidden';
    }

    // Even if forceVisible is enabled, scrollbar itself should be hidden
    if (this.axis[axis].isOverflowing) {
      scrollbar.style.display = 'block';
    } else {
      scrollbar.style.display = 'none';
    }
  }

  hideNativeScrollbar() {
    this.offsetEl.style[this.isRtl ? 'left' : 'right'] =
      this.axis.y.isOverflowing || this.axis.y.forceVisible
        ? `-${this.scrollbarWidth}px`
        : 0;
    this.offsetEl.style.bottom =
      this.axis.x.isOverflowing || this.axis.x.forceVisible
        ? `-${this.scrollbarWidth}px`
        : 0;
  }

  /**
   * On scroll event handling
   */
  onScroll = () => {
    const elWindow = getElementWindow(this.el);
    if (!this.scrollXTicking) {
      elWindow.requestAnimationFrame(this.scrollX);
      this.scrollXTicking = true;
    }

    if (!this.scrollYTicking) {
      elWindow.requestAnimationFrame(this.scrollY);
      this.scrollYTicking = true;
    }
  };

  scrollX = () => {
    if (this.axis.x.isOverflowing) {
      this.showScrollbar('x');
      this.positionScrollbar('x');
    }

    this.scrollXTicking = false;
  };

  scrollY = () => {
    if (this.axis.y.isOverflowing) {
      this.showScrollbar('y');
      this.positionScrollbar('y');
    }

    this.scrollYTicking = false;
  };

  onMouseEnter = () => {
    this.showScrollbar('x');
    this.showScrollbar('y');
  };

  onMouseMove = e => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
      this.onMouseMoveForAxis('x');
    }

    if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
      this.onMouseMoveForAxis('y');
    }
  };

  onMouseMoveForAxis(axis = 'y') {
    this.axis[axis].track.rect = this.axis[
      axis
    ].track.el.getBoundingClientRect();
    this.axis[axis].scrollbar.rect = this.axis[
      axis
    ].scrollbar.el.getBoundingClientRect();

    const isWithinScrollbarBoundsX = this.isWithinBounds(
      this.axis[axis].scrollbar.rect
    );

    if (isWithinScrollbarBoundsX) {
      this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
    } else {
      this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
    }

    if (this.isWithinBounds(this.axis[axis].track.rect)) {
      this.showScrollbar(axis);
      this.axis[axis].track.el.classList.add(this.classNames.hover);
    } else {
      this.axis[axis].track.el.classList.remove(this.classNames.hover);
    }
  }

  onMouseLeave = () => {
    this.onMouseMove.cancel();

    if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
      this.onMouseLeaveForAxis('x');
    }

    if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
      this.onMouseLeaveForAxis('y');
    }

    this.mouseX = -1;
    this.mouseY = -1;
  };

  onMouseLeaveForAxis(axis = 'y') {
    this.axis[axis].track.el.classList.remove(this.classNames.hover);
    this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
  }

  onWindowResize = () => {
    // Recalculate scrollbarWidth in case it's a zoom
    this.scrollbarWidth = this.getScrollbarWidth();

    this.hideNativeScrollbar();
  };

  /**
   * Show scrollbar
   */
  showScrollbar(axis = 'y') {
    let scrollbar = this.axis[axis].scrollbar.el;

    if (!this.axis[axis].isVisible) {
      scrollbar.classList.add(this.classNames.visible);
      this.axis[axis].isVisible = true;
    }

    if (this.options.autoHide) {
      this.hideScrollbars();
    }
  }

  /**
   * Hide Scrollbar
   */
  hideScrollbars = () => {
    this.axis.x.track.rect = this.axis.x.track.el.getBoundingClientRect();
    this.axis.y.track.rect = this.axis.y.track.el.getBoundingClientRect();

    if (!this.isWithinBounds(this.axis.y.track.rect)) {
      this.axis.y.scrollbar.el.classList.remove(this.classNames.visible);
      this.axis.y.isVisible = false;
    }

    if (!this.isWithinBounds(this.axis.x.track.rect)) {
      this.axis.x.scrollbar.el.classList.remove(this.classNames.visible);
      this.axis.x.isVisible = false;
    }
  };

  onPointerEvent = e => {
    let isWithinTrackXBounds, isWithinTrackYBounds;

    this.axis.x.track.rect = this.axis.x.track.el.getBoundingClientRect();
    this.axis.y.track.rect = this.axis.y.track.el.getBoundingClientRect();

    if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
      isWithinTrackXBounds = this.isWithinBounds(this.axis.x.track.rect);
    }

    if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
      isWithinTrackYBounds = this.isWithinBounds(this.axis.y.track.rect);
    }

    // If any pointer event is called on the scrollbar
    if (isWithinTrackXBounds || isWithinTrackYBounds) {
      // Preventing the event's default action stops text being
      // selectable during the drag.
      e.preventDefault();
      // Prevent event leaking
      e.stopPropagation();

      if (e.type === 'mousedown') {
        if (isWithinTrackXBounds) {
          this.axis.x.scrollbar.rect = this.axis.x.scrollbar.el.getBoundingClientRect();

          if (this.isWithinBounds(this.axis.x.scrollbar.rect)) {
            this.onDragStart(e, 'x');
          } else {
            this.onTrackClick(e, 'x');
          }
        }

        if (isWithinTrackYBounds) {
          this.axis.y.scrollbar.rect = this.axis.y.scrollbar.el.getBoundingClientRect();

          if (this.isWithinBounds(this.axis.y.scrollbar.rect)) {
            this.onDragStart(e, 'y');
          } else {
            this.onTrackClick(e, 'y');
          }
        }
      }
    }
  };

  /**
   * on scrollbar handle drag movement starts
   */
  onDragStart(e, axis = 'y') {
    const elDocument = getElementDocument(this.el);
    const elWindow = getElementWindow(this.el);
    const scrollbar = this.axis[axis].scrollbar;

    // Measure how far the user's mouse is from the top of the scrollbar drag handle.
    const eventOffset = axis === 'y' ? e.pageY : e.pageX;
    this.axis[axis].dragOffset =
      eventOffset - scrollbar.rect[this.axis[axis].offsetAttr];
    this.draggedAxis = axis;

    this.el.classList.add(this.classNames.dragging);

    elDocument.addEventListener('mousemove', this.drag, true);
    elDocument.addEventListener('mouseup', this.onEndDrag, true);
    if (this.removePreventClickId === null) {
      elDocument.addEventListener('click', this.preventClick, true);
      elDocument.addEventListener('dblclick', this.preventClick, true);
    } else {
      elWindow.clearTimeout(this.removePreventClickId);
      this.removePreventClickId = null;
    }
  }

  /**
   * Drag scrollbar handle
   */
  drag = e => {
    let eventOffset;
    const track = this.axis[this.draggedAxis].track;
    const trackSize = track.rect[this.axis[this.draggedAxis].sizeAttr];
    const scrollbar = this.axis[this.draggedAxis].scrollbar;
    const contentSize = this.contentWrapperEl[
      this.axis[this.draggedAxis].scrollSizeAttr
    ];
    const hostSize = parseInt(
      this.elStyles[this.axis[this.draggedAxis].sizeAttr],
      10
    );

    e.preventDefault();
    e.stopPropagation();

    if (this.draggedAxis === 'y') {
      eventOffset = e.pageY;
    } else {
      eventOffset = e.pageX;
    }

    // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
    let dragPos =
      eventOffset -
      track.rect[this.axis[this.draggedAxis].offsetAttr] -
      this.axis[this.draggedAxis].dragOffset;
    // Convert the mouse position into a percentage of the scrollbar height/width.
    let dragPerc = dragPos / (trackSize - scrollbar.size);

    // Scroll the content by the same percentage.
    let scrollPos = dragPerc * (contentSize - hostSize);

    // Fix browsers inconsistency on RTL
    if (this.draggedAxis === 'x') {
      scrollPos =
        this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted
          ? scrollPos - (trackSize + scrollbar.size)
          : scrollPos;
      scrollPos =
        this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted
          ? -scrollPos
          : scrollPos;
    }

    this.contentWrapperEl[
      this.axis[this.draggedAxis].scrollOffsetAttr
    ] = scrollPos;
  };

  /**
   * End scroll handle drag
   */
  onEndDrag = e => {
    const elDocument = getElementDocument(this.el);
    const elWindow = getElementWindow(this.el);
    e.preventDefault();
    e.stopPropagation();

    this.el.classList.remove(this.classNames.dragging);

    elDocument.removeEventListener('mousemove', this.drag, true);
    elDocument.removeEventListener('mouseup', this.onEndDrag, true);
    this.removePreventClickId = elWindow.setTimeout(() => {
      // Remove these asynchronously so we still suppress click events
      // generated simultaneously with mouseup.
      elDocument.removeEventListener('click', this.preventClick, true);
      elDocument.removeEventListener('dblclick', this.preventClick, true);
      this.removePreventClickId = null;
    });
  };

  /**
   * Handler to ignore click events during drag
   */
  preventClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  onTrackClick(e, axis = 'y') {
    if (!this.options.clickOnTrack) return;

    const elWindow = getElementWindow(this.el);
    this.axis[axis].scrollbar.rect = this.axis[
      axis
    ].scrollbar.el.getBoundingClientRect();
    const scrollbar = this.axis[axis].scrollbar;
    const scrollbarOffset = scrollbar.rect[this.axis[axis].offsetAttr];
    const hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
    let scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
    const t =
      axis === 'y'
        ? this.mouseY - scrollbarOffset
        : this.mouseX - scrollbarOffset;
    const dir = t < 0 ? -1 : 1;
    const scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;

    const scrollTo = () => {
      if (dir === -1) {
        if (scrolled > scrollSize) {
          scrolled -= this.options.clickOnTrackSpeed;
          this.contentWrapperEl.scrollTo({
            [this.axis[axis].offsetAttr]: scrolled
          });
          elWindow.requestAnimationFrame(scrollTo);
        }
      } else {
        if (scrolled < scrollSize) {
          scrolled += this.options.clickOnTrackSpeed;
          this.contentWrapperEl.scrollTo({
            [this.axis[axis].offsetAttr]: scrolled
          });
          elWindow.requestAnimationFrame(scrollTo);
        }
      }
    };

    scrollTo();
  }

  /**
   * Getter for content element
   */
  getContentElement() {
    return this.contentEl;
  }

  /**
   * Getter for original scrolling element
   */
  getScrollElement() {
    return this.contentWrapperEl;
  }

  getScrollbarWidth() {
    // Try/catch for FF 56 throwing on undefined computedStyles
    try {
      // Detect browsers supporting CSS scrollbar styling and do not calculate
      if (
        getComputedStyle(this.contentWrapperEl, '::-webkit-scrollbar')
          .display === 'none' ||
        'scrollbarWidth' in document.documentElement.style ||
        '-ms-overflow-style' in document.documentElement.style
      ) {
        return 0;
      } else {
        return scrollbarWidth(this.el);
      }
    } catch (e) {
      return scrollbarWidth(this.el);
    }
  }

  removeListeners() {
    const elWindow = getElementWindow(this.el);
    // Event listeners
    if (this.options.autoHide) {
      this.el.removeEventListener('mouseenter', this.onMouseEnter);
    }

    ['mousedown', 'click', 'dblclick'].forEach(e => {
      this.el.removeEventListener(e, this.onPointerEvent, true);
    });

    ['touchstart', 'touchend', 'touchmove'].forEach(e => {
      this.el.removeEventListener(e, this.onPointerEvent, {
        capture: true,
        passive: true
      });
    });

    this.el.removeEventListener('mousemove', this.onMouseMove);
    this.el.removeEventListener('mouseleave', this.onMouseLeave);

    if (this.contentWrapperEl) {
      this.contentWrapperEl.removeEventListener('scroll', this.onScroll);
    }

    elWindow.removeEventListener('resize', this.onWindowResize);

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    // Cancel all debounced functions
    this.recalculate.cancel();
    this.onMouseMove.cancel();
    this.hideScrollbars.cancel();
    this.onWindowResize.cancel();
  }

  /**
   * UnMount mutation observer and delete SimpleBar instance from DOM element
   */
  unMount() {
    this.removeListeners();
    SimpleBar.instances.delete(this.el);
  }

  /**
   * Check if mouse is within bounds
   */
  isWithinBounds(bbox) {
    return (
      this.mouseX >= bbox.left &&
      this.mouseX <= bbox.left + bbox.width &&
      this.mouseY >= bbox.top &&
      this.mouseY <= bbox.top + bbox.height
    );
  }

  /**
   * Find element children matches query
   */
  findChild(el, query) {
    const matches =
      el.matches ||
      el.webkitMatchesSelector ||
      el.mozMatchesSelector ||
      el.msMatchesSelector;
    return Array.prototype.filter.call(el.children, child =>
      matches.call(child, query)
    )[0];
  }
}
