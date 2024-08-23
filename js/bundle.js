!(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  ((e = (function () {
    var e = 0;
    return function (t, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(t)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(t).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        void 0 !== document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : void 0 !== document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = e++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    };
  })()).prototype.activateADA = function () {
    this.$slideTrack
      .find(".slick-active")
      .attr({ "aria-hidden": "false" })
      .find("a, input, button, select")
      .attr({ tabindex: "0" });
  }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : !0 === o
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled
          ? !1 === s.options.vertical
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : !1 === s.cssTransitions
          ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    !1 === s.options.vertical
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                },
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            !1 === s.options.vertical
              ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor;
      return t && null !== t && (t = i(t).not(e.$slider)), t;
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this.getNavTarget();
      null !== t &&
        "object" == typeof t &&
        t.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      !1 === e.options.fade
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (!1 === i.options.infinite &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      !0 === e.options.arrows &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            !0 !== e.options.infinite &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (!0 === o.options.dots) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        !0 === e.options.draggable && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 1)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
          ? (n = d)
          : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (!1 === r.originalSettings.mobileFirst
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        (n = r.slideCount % r.options.slidesToScroll != 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t);
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e, t;
      if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var o in e) {
          if (i < e[o]) {
            i = t;
            break;
          }
          t = e[o];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility &&
          e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 1 &&
        ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      !1 === this.shouldClick &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]);
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      !1 === t.cssTransitions
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      !1 === e.cssTransitions
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick blur.slick", "*", function (t) {
          t.stopImmediatePropagation();
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              ((e.focussed = o.is(":focus")), e.autoPlay());
          }, 0);
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (!0 === i.options.centerMode) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : !0 === n.options.centerMode &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          !1 === n.options.vertical
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        return this.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        !1 === e.options.infinite
          ? (i = e.slideCount)
          : ((t = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o = this;
      return (
        (t =
          !0 === o.options.centerMode
            ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
            : 0),
        !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
              if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return (e = n), !1;
            }),
            Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
          : o.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (t) {
              var s = o.indexOf(t);
              i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1,
              }),
                -1 !== s &&
                  i(this).attr({
                    "aria-describedby":
                      "slick-slide-control" + e.instanceUid + s,
                  });
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.$slides.eq(s).attr("tabindex", 0);
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        !0 === i.options.accessibility &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      !0 === e.options.dots &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        !0 === e.options.accessibility &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots &&
          !0 === e.options.pauseOnDotsHover &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility &&
          e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && !0 === e.options.accessibility
          ? e.changeSlide({
              data: { message: !0 === e.options.rtl ? "next" : "previous" },
            })
          : 39 === i.keyCode &&
            !0 === e.options.accessibility &&
            e.changeSlide({
              data: { message: !0 === e.options.rtl ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            r = document.createElement("img");
          (r.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                n.$slider.trigger("lazyLoaded", [n, e, t]);
            });
          }),
            (r.onerror = function () {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                n.$slider.trigger("lazyLoadError", [n, e, t]);
            }),
            (r.src = t);
        });
      }
      var t,
        o,
        s,
        n = this;
      if (
        (!0 === n.options.centerMode
          ? !0 === n.options.infinite
            ? (s =
                (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                n.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                n.currentSlide - (n.options.slidesToShow / 2 + 1)
              )),
              (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((o = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (s = Math.ceil(o + n.options.slidesToShow)),
            !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
        (t = n.$slider.find(".slick-slide").slice(o, s)),
        "anticipated" === n.options.lazyLoad)
      )
        for (
          var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0;
          a < n.options.slidesToScroll;
          a++
        )
          r < 0 && (r = n.slideCount - 1),
            (t = (t = t.add(d.eq(r))).add(d.eq(l))),
            r--,
            l++;
      e(t),
        n.slideCount <= n.options.slidesToShow
          ? e(n.$slider.find(".slick-slide"))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
          ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
          : 0 === n.currentSlide &&
            e(
              n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)
            );
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      t.unslicked ||
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility &&
          (t.initADA(),
          t.options.focusOnChange &&
            i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          ((r = document.createElement("img")).onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        if (
          ((i =
            "boolean" == typeof i
              ? !0 === (e = i)
                ? 0
                : o.slideCount - 1
              : !0 === e
              ? --i
              : i),
          o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
        )
          return !1;
        o.unload(),
          !0 === t
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(i).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      !0 === o.options.rtl && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(s)
          : ((s = {}),
            !1 === o.cssTransitions
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      !1 === i.options.vertical
        ? !0 === i.options.centerMode &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          !0 === i.options.centerMode &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        !1 === i.options.vertical && !1 === i.options.variableWidth
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : !0 === i.options.variableWidth
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      !1 === i.options.variableWidth &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          !0 === t.options.rtl
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : void 0 !== arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === i.options.useCSS && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          !1 !== i.animType &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && !1 !== i.animType);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode)
      ) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          !0 === n.options.infinite &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center");
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite &&
          !1 === s.options.fade &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            !0 === s.options.centerMode
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this;
      i || e.autoPlay(), (e.interrupted = i);
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? t.slideHandler(s, !1, !0)
          : t.slideHandler(s);
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (!0 === a.animating && !0 === a.options.waitForAnimate) ||
          (!0 === a.options.fade && a.currentSlide === i)
        ))
      )
        if (
          (!1 === e && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          !1 === a.options.infinite &&
            !1 === a.options.centerMode &&
            (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else if (
          !1 === a.options.infinite &&
          !0 === a.options.centerMode &&
          (i < 0 || i > a.slideCount - a.options.slidesToScroll)
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else {
          if (
            (a.options.autoplay && clearInterval(a.autoPlayTimer),
            (s =
              o < 0
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                  : a.slideCount + o
                : o >= a.slideCount
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? 0
                  : o - a.slideCount
                : o),
            (a.animating = !0),
            a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
            (n = a.currentSlide),
            (a.currentSlide = s),
            a.setSlideClasses(a.currentSlide),
            a.options.asNavFor &&
              (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <=
                l.options.slidesToShow &&
              l.setSlideClasses(a.currentSlide),
            a.updateDots(),
            a.updateArrows(),
            !0 === a.options.fade)
          )
            return (
              !0 !== t
                ? (a.fadeSlideOut(n),
                  a.fadeSlide(s, function () {
                    a.postSlide(s);
                  }))
                : a.postSlide(s),
              void a.animateHeight()
            );
          !0 !== t
            ? a.animateSlide(d, function () {
                a.postSlide(s);
              })
            : a.postSlide(s);
        }
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o <= 360 && o >= 315
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? !1 === s.options.rtl
            ? "right"
            : "left"
          : !0 === s.options.verticalSwiping
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          !1 === e.options.swipe ||
          ("ontouchend" in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (!0 === l.options.verticalSwiping &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (!1 === l.options.rtl ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              !0 === l.options.verticalSwiping &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              !1 === l.options.infinite &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              !1 === l.options.vertical
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
              !0 !== l.options.fade &&
                !1 !== l.options.touchMove &&
                (!0 === l.animating
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      if (
        ((t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
          t.slideCount <= t.options.slidesToShow)
      )
        return (t.touchObject = {}), !1;
      void 0 !== i.originalEvent &&
        void 0 !== i.originalEvent.touches &&
        (e = i.originalEvent.touches[0]),
        (t.touchObject.startX = t.touchObject.curX =
          void 0 !== e ? e.pageX : i.clientX),
        (t.touchObject.startY = t.touchObject.curY =
          void 0 !== e ? e.pageY : i.clientY),
        (t.dragging = !0);
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      e.$slider.trigger("unslick", [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i = this;
      Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          !i.options.infinite &&
          (i.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          i.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === i.currentSlide
            ? (i.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - i.options.slidesToShow &&
              !1 === i.options.centerMode
            ? (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - 1 &&
              !0 === i.options.centerMode &&
              (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || void 0 === s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          void 0 !== t)
        )
          return t;
      return o;
    });
});

!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.AOS = t())
    : (e.AOS = t());
})(this, function () {
  return (function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var i = (n[o] = { exports: {}, id: o, loaded: !1 });
      return e[o].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = "dist/"), t(0);
  })([
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var i =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            }
            return e;
          },
        r = n(1),
        a = (o(r), n(6)),
        u = o(a),
        c = n(7),
        s = o(c),
        f = n(8),
        d = o(f),
        l = n(9),
        p = o(l),
        m = n(10),
        b = o(m),
        v = n(11),
        y = o(v),
        g = n(14),
        h = o(g),
        w = [],
        k = !1,
        x = {
          offset: 120,
          delay: 0,
          easing: "ease",
          duration: 400,
          disable: !1,
          once: !1,
          startEvent: "DOMContentLoaded",
          throttleDelay: 99,
          debounceDelay: 50,
          disableMutationObserver: !1,
        },
        j = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if ((e && (k = !0), k))
            return (w = (0, y.default)(w, x)), (0, b.default)(w, x.once), w;
        },
        O = function () {
          (w = (0, h.default)()), j();
        },
        M = function () {
          w.forEach(function (e, t) {
            e.node.removeAttribute("data-aos"),
              e.node.removeAttribute("data-aos-easing"),
              e.node.removeAttribute("data-aos-duration"),
              e.node.removeAttribute("data-aos-delay");
          });
        },
        S = function (e) {
          return (
            e === !0 ||
            ("mobile" === e && p.default.mobile()) ||
            ("phone" === e && p.default.phone()) ||
            ("tablet" === e && p.default.tablet()) ||
            ("function" == typeof e && e() === !0)
          );
        },
        _ = function (e) {
          (x = i(x, e)), (w = (0, h.default)());
          var t = document.all && !window.atob;
          return S(x.disable) || t
            ? M()
            : (x.disableMutationObserver ||
                d.default.isSupported() ||
                (console.info(
                  '\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '
                ),
                (x.disableMutationObserver = !0)),
              document
                .querySelector("body")
                .setAttribute("data-aos-easing", x.easing),
              document
                .querySelector("body")
                .setAttribute("data-aos-duration", x.duration),
              document
                .querySelector("body")
                .setAttribute("data-aos-delay", x.delay),
              "DOMContentLoaded" === x.startEvent &&
              ["complete", "interactive"].indexOf(document.readyState) > -1
                ? j(!0)
                : "load" === x.startEvent
                ? window.addEventListener(x.startEvent, function () {
                    j(!0);
                  })
                : document.addEventListener(x.startEvent, function () {
                    j(!0);
                  }),
              window.addEventListener(
                "resize",
                (0, s.default)(j, x.debounceDelay, !0)
              ),
              window.addEventListener(
                "orientationchange",
                (0, s.default)(j, x.debounceDelay, !0)
              ),
              window.addEventListener(
                "scroll",
                (0, u.default)(function () {
                  (0, b.default)(w, x.once);
                }, x.throttleDelay)
              ),
              x.disableMutationObserver || d.default.ready("[data-aos]", O),
              w);
        };
      e.exports = { init: _, refresh: j, refreshHard: O };
    },
    function (e, t) {},
    ,
    ,
    ,
    ,
    function (e, t) {
      (function (t) {
        "use strict";
        function n(e, t, n) {
          function o(t) {
            var n = b,
              o = v;
            return (b = v = void 0), (k = t), (g = e.apply(o, n));
          }
          function r(e) {
            return (k = e), (h = setTimeout(f, t)), M ? o(e) : g;
          }
          function a(e) {
            var n = e - w,
              o = e - k,
              i = t - n;
            return S ? j(i, y - o) : i;
          }
          function c(e) {
            var n = e - w,
              o = e - k;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }
          function f() {
            var e = O();
            return c(e) ? d(e) : void (h = setTimeout(f, a(e)));
          }
          function d(e) {
            return (h = void 0), _ && b ? o(e) : ((b = v = void 0), g);
          }
          function l() {
            void 0 !== h && clearTimeout(h), (k = 0), (b = w = v = h = void 0);
          }
          function p() {
            return void 0 === h ? g : d(O());
          }
          function m() {
            var e = O(),
              n = c(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(f, t)), o(w);
            }
            return void 0 === h && (h = setTimeout(f, t)), g;
          }
          var b,
            v,
            y,
            g,
            h,
            w,
            k = 0,
            M = !1,
            S = !1,
            _ = !0;
          if ("function" != typeof e) throw new TypeError(s);
          return (
            (t = u(t) || 0),
            i(n) &&
              ((M = !!n.leading),
              (S = "maxWait" in n),
              (y = S ? x(u(n.maxWait) || 0, t) : y),
              (_ = "trailing" in n ? !!n.trailing : _)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }
        function o(e, t, o) {
          var r = !0,
            a = !0;
          if ("function" != typeof e) throw new TypeError(s);
          return (
            i(o) &&
              ((r = "leading" in o ? !!o.leading : r),
              (a = "trailing" in o ? !!o.trailing : a)),
            n(e, t, { leading: r, maxWait: t, trailing: a })
          );
        }
        function i(e) {
          var t = "undefined" == typeof e ? "undefined" : c(e);
          return !!e && ("object" == t || "function" == t);
        }
        function r(e) {
          return (
            !!e && "object" == ("undefined" == typeof e ? "undefined" : c(e))
          );
        }
        function a(e) {
          return (
            "symbol" == ("undefined" == typeof e ? "undefined" : c(e)) ||
            (r(e) && k.call(e) == d)
          );
        }
        function u(e) {
          if ("number" == typeof e) return e;
          if (a(e)) return f;
          if (i(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = i(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(l, "");
          var n = m.test(e);
          return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? f : +e;
        }
        var c =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                },
          s = "Expected a function",
          f = NaN,
          d = "[object Symbol]",
          l = /^\s+|\s+$/g,
          p = /^[-+]0x[0-9a-f]+$/i,
          m = /^0b[01]+$/i,
          b = /^0o[0-7]+$/i,
          v = parseInt,
          y =
            "object" == ("undefined" == typeof t ? "undefined" : c(t)) &&
            t &&
            t.Object === Object &&
            t,
          g =
            "object" == ("undefined" == typeof self ? "undefined" : c(self)) &&
            self &&
            self.Object === Object &&
            self,
          h = y || g || Function("return this")(),
          w = Object.prototype,
          k = w.toString,
          x = Math.max,
          j = Math.min,
          O = function () {
            return h.Date.now();
          };
        e.exports = o;
      }).call(
        t,
        (function () {
          return this;
        })()
      );
    },
    function (e, t) {
      (function (t) {
        "use strict";
        function n(e, t, n) {
          function i(t) {
            var n = b,
              o = v;
            return (b = v = void 0), (O = t), (g = e.apply(o, n));
          }
          function r(e) {
            return (O = e), (h = setTimeout(f, t)), M ? i(e) : g;
          }
          function u(e) {
            var n = e - w,
              o = e - O,
              i = t - n;
            return S ? x(i, y - o) : i;
          }
          function s(e) {
            var n = e - w,
              o = e - O;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }
          function f() {
            var e = j();
            return s(e) ? d(e) : void (h = setTimeout(f, u(e)));
          }
          function d(e) {
            return (h = void 0), _ && b ? i(e) : ((b = v = void 0), g);
          }
          function l() {
            void 0 !== h && clearTimeout(h), (O = 0), (b = w = v = h = void 0);
          }
          function p() {
            return void 0 === h ? g : d(j());
          }
          function m() {
            var e = j(),
              n = s(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(f, t)), i(w);
            }
            return void 0 === h && (h = setTimeout(f, t)), g;
          }
          var b,
            v,
            y,
            g,
            h,
            w,
            O = 0,
            M = !1,
            S = !1,
            _ = !0;
          if ("function" != typeof e) throw new TypeError(c);
          return (
            (t = a(t) || 0),
            o(n) &&
              ((M = !!n.leading),
              (S = "maxWait" in n),
              (y = S ? k(a(n.maxWait) || 0, t) : y),
              (_ = "trailing" in n ? !!n.trailing : _)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }
        function o(e) {
          var t = "undefined" == typeof e ? "undefined" : u(e);
          return !!e && ("object" == t || "function" == t);
        }
        function i(e) {
          return (
            !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
          );
        }
        function r(e) {
          return (
            "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) ||
            (i(e) && w.call(e) == f)
          );
        }
        function a(e) {
          if ("number" == typeof e) return e;
          if (r(e)) return s;
          if (o(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = o(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(d, "");
          var n = p.test(e);
          return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? s : +e;
        }
        var u =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                },
          c = "Expected a function",
          s = NaN,
          f = "[object Symbol]",
          d = /^\s+|\s+$/g,
          l = /^[-+]0x[0-9a-f]+$/i,
          p = /^0b[01]+$/i,
          m = /^0o[0-7]+$/i,
          b = parseInt,
          v =
            "object" == ("undefined" == typeof t ? "undefined" : u(t)) &&
            t &&
            t.Object === Object &&
            t,
          y =
            "object" == ("undefined" == typeof self ? "undefined" : u(self)) &&
            self &&
            self.Object === Object &&
            self,
          g = v || y || Function("return this")(),
          h = Object.prototype,
          w = h.toString,
          k = Math.max,
          x = Math.min,
          j = function () {
            return g.Date.now();
          };
        e.exports = n;
      }).call(
        t,
        (function () {
          return this;
        })()
      );
    },
    function (e, t) {
      "use strict";
      function n(e) {
        var t = void 0,
          o = void 0,
          i = void 0;
        for (t = 0; t < e.length; t += 1) {
          if (((o = e[t]), o.dataset && o.dataset.aos)) return !0;
          if ((i = o.children && n(o.children))) return !0;
        }
        return !1;
      }
      function o() {
        return (
          window.MutationObserver ||
          window.WebKitMutationObserver ||
          window.MozMutationObserver
        );
      }
      function i() {
        return !!o();
      }
      function r(e, t) {
        var n = window.document,
          i = o(),
          r = new i(a);
        (u = t),
          r.observe(n.documentElement, {
            childList: !0,
            subtree: !0,
            removedNodes: !0,
          });
      }
      function a(e) {
        e &&
          e.forEach(function (e) {
            var t = Array.prototype.slice.call(e.addedNodes),
              o = Array.prototype.slice.call(e.removedNodes),
              i = t.concat(o);
            if (n(i)) return u();
          });
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = function () {};
      t.default = { isSupported: i, ready: r };
    },
    function (e, t) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function o() {
        return navigator.userAgent || navigator.vendor || window.opera || "";
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })(),
        r =
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        a =
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        u =
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
        c =
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        s = (function () {
          function e() {
            n(this, e);
          }
          return (
            i(e, [
              {
                key: "phone",
                value: function () {
                  var e = o();
                  return !(!r.test(e) && !a.test(e.substr(0, 4)));
                },
              },
              {
                key: "mobile",
                value: function () {
                  var e = o();
                  return !(!u.test(e) && !c.test(e.substr(0, 4)));
                },
              },
              {
                key: "tablet",
                value: function () {
                  return this.mobile() && !this.phone();
                },
              },
            ]),
            e
          );
        })();
      t.default = new s();
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e, t, n) {
          var o = e.node.getAttribute("data-aos-once");
          t > e.position
            ? e.node.classList.add("aos-animate")
            : "undefined" != typeof o &&
              ("false" === o || (!n && "true" !== o)) &&
              e.node.classList.remove("aos-animate");
        },
        o = function (e, t) {
          var o = window.pageYOffset,
            i = window.innerHeight;
          e.forEach(function (e, r) {
            n(e, i + o, t);
          });
        };
      t.default = o;
    },
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(12),
        r = o(i),
        a = function (e, t) {
          return (
            e.forEach(function (e, n) {
              e.node.classList.add("aos-init"),
                (e.position = (0, r.default)(e.node, t.offset));
            }),
            e
          );
        };
      t.default = a;
    },
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(13),
        r = o(i),
        a = function (e, t) {
          var n = 0,
            o = 0,
            i = window.innerHeight,
            a = {
              offset: e.getAttribute("data-aos-offset"),
              anchor: e.getAttribute("data-aos-anchor"),
              anchorPlacement: e.getAttribute("data-aos-anchor-placement"),
            };
          switch (
            (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)),
            a.anchor &&
              document.querySelectorAll(a.anchor) &&
              (e = document.querySelectorAll(a.anchor)[0]),
            (n = (0, r.default)(e).top),
            a.anchorPlacement)
          ) {
            case "top-bottom":
              break;
            case "center-bottom":
              n += e.offsetHeight / 2;
              break;
            case "bottom-bottom":
              n += e.offsetHeight;
              break;
            case "top-center":
              n += i / 2;
              break;
            case "bottom-center":
              n += i / 2 + e.offsetHeight;
              break;
            case "center-center":
              n += i / 2 + e.offsetHeight / 2;
              break;
            case "top-top":
              n += i;
              break;
            case "bottom-top":
              n += e.offsetHeight + i;
              break;
            case "center-top":
              n += e.offsetHeight / 2 + i;
          }
          return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o;
        };
      t.default = a;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e) {
        for (
          var t = 0, n = 0;
          e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);

        )
          (t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0)),
            (n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0)),
            (e = e.offsetParent);
        return { top: n, left: t };
      };
      t.default = n;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e) {
        return (
          (e = e || document.querySelectorAll("[data-aos]")),
          Array.prototype.map.call(e, function (e) {
            return { node: e };
          })
        );
      };
      t.default = n;
    },
  ]);
});
/*!
 * Bootstrap v4.3.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("jquery"), require("popper.js"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery", "popper.js"], e)
    : e(((t = t || self).bootstrap = {}), t.jQuery, t.Popper);
})(this, function (t, g, u) {
  "use strict";
  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  function s(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }
  function l(o) {
    for (var t = 1; t < arguments.length; t++) {
      var r = null != arguments[t] ? arguments[t] : {},
        e = Object.keys(r);
      "function" == typeof Object.getOwnPropertySymbols &&
        (e = e.concat(
          Object.getOwnPropertySymbols(r).filter(function (t) {
            return Object.getOwnPropertyDescriptor(r, t).enumerable;
          })
        )),
        e.forEach(function (t) {
          var e, n, i;
          (e = o),
            (i = r[(n = t)]),
            n in e
              ? Object.defineProperty(e, n, {
                  value: i,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[n] = i);
        });
    }
    return o;
  }
  (g = g && g.hasOwnProperty("default") ? g.default : g),
    (u = u && u.hasOwnProperty("default") ? u.default : u);
  var e = "transitionend";
  function n(t) {
    var e = this,
      n = !1;
    return (
      g(this).one(_.TRANSITION_END, function () {
        n = !0;
      }),
      setTimeout(function () {
        n || _.triggerTransitionEnd(e);
      }, t),
      this
    );
  }
  var _ = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function (t) {
      for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
      return t;
    },
    getSelectorFromElement: function (t) {
      var e = t.getAttribute("data-target");
      if (!e || "#" === e) {
        var n = t.getAttribute("href");
        e = n && "#" !== n ? n.trim() : "";
      }
      try {
        return document.querySelector(e) ? e : null;
      } catch (t) {
        return null;
      }
    },
    getTransitionDurationFromElement: function (t) {
      if (!t) return 0;
      var e = g(t).css("transition-duration"),
        n = g(t).css("transition-delay"),
        i = parseFloat(e),
        o = parseFloat(n);
      return i || o
        ? ((e = e.split(",")[0]),
          (n = n.split(",")[0]),
          1e3 * (parseFloat(e) + parseFloat(n)))
        : 0;
    },
    reflow: function (t) {
      return t.offsetHeight;
    },
    triggerTransitionEnd: function (t) {
      g(t).trigger(e);
    },
    supportsTransitionEnd: function () {
      return Boolean(e);
    },
    isElement: function (t) {
      return (t[0] || t).nodeType;
    },
    typeCheckConfig: function (t, e, n) {
      for (var i in n)
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          var o = n[i],
            r = e[i],
            s =
              r && _.isElement(r)
                ? "element"
                : ((a = r),
                  {}.toString
                    .call(a)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase());
          if (!new RegExp(o).test(s))
            throw new Error(
              t.toUpperCase() +
                ': Option "' +
                i +
                '" provided type "' +
                s +
                '" but expected type "' +
                o +
                '".'
            );
        }
      var a;
    },
    findShadowRoot: function (t) {
      if (!document.documentElement.attachShadow) return null;
      if ("function" != typeof t.getRootNode)
        return t instanceof ShadowRoot
          ? t
          : t.parentNode
          ? _.findShadowRoot(t.parentNode)
          : null;
      var e = t.getRootNode();
      return e instanceof ShadowRoot ? e : null;
    },
  };
  (g.fn.emulateTransitionEnd = n),
    (g.event.special[_.TRANSITION_END] = {
      bindType: e,
      delegateType: e,
      handle: function (t) {
        if (g(t.target).is(this))
          return t.handleObj.handler.apply(this, arguments);
      },
    });
  var o = "alert",
    r = "bs.alert",
    a = "." + r,
    c = g.fn[o],
    h = {
      CLOSE: "close" + a,
      CLOSED: "closed" + a,
      CLICK_DATA_API: "click" + a + ".data-api",
    },
    f = "alert",
    d = "fade",
    m = "show",
    p = (function () {
      function i(t) {
        this._element = t;
      }
      var t = i.prototype;
      return (
        (t.close = function (t) {
          var e = this._element;
          t && (e = this._getRootElement(t)),
            this._triggerCloseEvent(e).isDefaultPrevented() ||
              this._removeElement(e);
        }),
        (t.dispose = function () {
          g.removeData(this._element, r), (this._element = null);
        }),
        (t._getRootElement = function (t) {
          var e = _.getSelectorFromElement(t),
            n = !1;
          return (
            e && (n = document.querySelector(e)),
            n || (n = g(t).closest("." + f)[0]),
            n
          );
        }),
        (t._triggerCloseEvent = function (t) {
          var e = g.Event(h.CLOSE);
          return g(t).trigger(e), e;
        }),
        (t._removeElement = function (e) {
          var n = this;
          if ((g(e).removeClass(m), g(e).hasClass(d))) {
            var t = _.getTransitionDurationFromElement(e);
            g(e)
              .one(_.TRANSITION_END, function (t) {
                return n._destroyElement(e, t);
              })
              .emulateTransitionEnd(t);
          } else this._destroyElement(e);
        }),
        (t._destroyElement = function (t) {
          g(t).detach().trigger(h.CLOSED).remove();
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this),
              e = t.data(r);
            e || ((e = new i(this)), t.data(r, e)), "close" === n && e[n](this);
          });
        }),
        (i._handleDismiss = function (e) {
          return function (t) {
            t && t.preventDefault(), e.close(this);
          };
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.3.1";
            },
          },
        ]),
        i
      );
    })();
  g(document).on(
    h.CLICK_DATA_API,
    '[data-dismiss="alert"]',
    p._handleDismiss(new p())
  ),
    (g.fn[o] = p._jQueryInterface),
    (g.fn[o].Constructor = p),
    (g.fn[o].noConflict = function () {
      return (g.fn[o] = c), p._jQueryInterface;
    });
  var v = "button",
    y = "bs.button",
    E = "." + y,
    C = ".data-api",
    T = g.fn[v],
    S = "active",
    b = "btn",
    I = "focus",
    D = '[data-toggle^="button"]',
    w = '[data-toggle="buttons"]',
    A = 'input:not([type="hidden"])',
    N = ".active",
    O = ".btn",
    k = {
      CLICK_DATA_API: "click" + E + C,
      FOCUS_BLUR_DATA_API: "focus" + E + C + " blur" + E + C,
    },
    P = (function () {
      function n(t) {
        this._element = t;
      }
      var t = n.prototype;
      return (
        (t.toggle = function () {
          var t = !0,
            e = !0,
            n = g(this._element).closest(w)[0];
          if (n) {
            var i = this._element.querySelector(A);
            if (i) {
              if ("radio" === i.type)
                if (i.checked && this._element.classList.contains(S)) t = !1;
                else {
                  var o = n.querySelector(N);
                  o && g(o).removeClass(S);
                }
              if (t) {
                if (
                  i.hasAttribute("disabled") ||
                  n.hasAttribute("disabled") ||
                  i.classList.contains("disabled") ||
                  n.classList.contains("disabled")
                )
                  return;
                (i.checked = !this._element.classList.contains(S)),
                  g(i).trigger("change");
              }
              i.focus(), (e = !1);
            }
          }
          e &&
            this._element.setAttribute(
              "aria-pressed",
              !this._element.classList.contains(S)
            ),
            t && g(this._element).toggleClass(S);
        }),
        (t.dispose = function () {
          g.removeData(this._element, y), (this._element = null);
        }),
        (n._jQueryInterface = function (e) {
          return this.each(function () {
            var t = g(this).data(y);
            t || ((t = new n(this)), g(this).data(y, t)),
              "toggle" === e && t[e]();
          });
        }),
        s(n, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.3.1";
            },
          },
        ]),
        n
      );
    })();
  g(document)
    .on(k.CLICK_DATA_API, D, function (t) {
      t.preventDefault();
      var e = t.target;
      g(e).hasClass(b) || (e = g(e).closest(O)),
        P._jQueryInterface.call(g(e), "toggle");
    })
    .on(k.FOCUS_BLUR_DATA_API, D, function (t) {
      var e = g(t.target).closest(O)[0];
      g(e).toggleClass(I, /^focus(in)?$/.test(t.type));
    }),
    (g.fn[v] = P._jQueryInterface),
    (g.fn[v].Constructor = P),
    (g.fn[v].noConflict = function () {
      return (g.fn[v] = T), P._jQueryInterface;
    });
  var L = "carousel",
    j = "bs.carousel",
    H = "." + j,
    R = ".data-api",
    x = g.fn[L],
    F = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    U = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    W = "next",
    q = "prev",
    M = "left",
    K = "right",
    Q = {
      SLIDE: "slide" + H,
      SLID: "slid" + H,
      KEYDOWN: "keydown" + H,
      MOUSEENTER: "mouseenter" + H,
      MOUSELEAVE: "mouseleave" + H,
      TOUCHSTART: "touchstart" + H,
      TOUCHMOVE: "touchmove" + H,
      TOUCHEND: "touchend" + H,
      POINTERDOWN: "pointerdown" + H,
      POINTERUP: "pointerup" + H,
      DRAG_START: "dragstart" + H,
      LOAD_DATA_API: "load" + H + R,
      CLICK_DATA_API: "click" + H + R,
    },
    B = "carousel",
    V = "active",
    Y = "slide",
    z = "carousel-item-right",
    X = "carousel-item-left",
    $ = "carousel-item-next",
    G = "carousel-item-prev",
    J = "pointer-event",
    Z = ".active",
    tt = ".active.carousel-item",
    et = ".carousel-item",
    nt = ".carousel-item img",
    it = ".carousel-item-next, .carousel-item-prev",
    ot = ".carousel-indicators",
    rt = "[data-slide], [data-slide-to]",
    st = '[data-ride="carousel"]',
    at = { TOUCH: "touch", PEN: "pen" },
    lt = (function () {
      function r(t, e) {
        (this._items = null),
          (this._interval = null),
          (this._activeElement = null),
          (this._isPaused = !1),
          (this._isSliding = !1),
          (this.touchTimeout = null),
          (this.touchStartX = 0),
          (this.touchDeltaX = 0),
          (this._config = this._getConfig(e)),
          (this._element = t),
          (this._indicatorsElement = this._element.querySelector(ot)),
          (this._touchSupported =
            "ontouchstart" in document.documentElement ||
            0 < navigator.maxTouchPoints),
          (this._pointerEvent = Boolean(
            window.PointerEvent || window.MSPointerEvent
          )),
          this._addEventListeners();
      }
      var t = r.prototype;
      return (
        (t.next = function () {
          this._isSliding || this._slide(W);
        }),
        (t.nextWhenVisible = function () {
          !document.hidden &&
            g(this._element).is(":visible") &&
            "hidden" !== g(this._element).css("visibility") &&
            this.next();
        }),
        (t.prev = function () {
          this._isSliding || this._slide(q);
        }),
        (t.pause = function (t) {
          t || (this._isPaused = !0),
            this._element.querySelector(it) &&
              (_.triggerTransitionEnd(this._element), this.cycle(!0)),
            clearInterval(this._interval),
            (this._interval = null);
        }),
        (t.cycle = function (t) {
          t || (this._isPaused = !1),
            this._interval &&
              (clearInterval(this._interval), (this._interval = null)),
            this._config.interval &&
              !this._isPaused &&
              (this._interval = setInterval(
                (document.visibilityState
                  ? this.nextWhenVisible
                  : this.next
                ).bind(this),
                this._config.interval
              ));
        }),
        (t.to = function (t) {
          var e = this;
          this._activeElement = this._element.querySelector(tt);
          var n = this._getItemIndex(this._activeElement);
          if (!(t > this._items.length - 1 || t < 0))
            if (this._isSliding)
              g(this._element).one(Q.SLID, function () {
                return e.to(t);
              });
            else {
              if (n === t) return this.pause(), void this.cycle();
              var i = n < t ? W : q;
              this._slide(i, this._items[t]);
            }
        }),
        (t.dispose = function () {
          g(this._element).off(H),
            g.removeData(this._element, j),
            (this._items = null),
            (this._config = null),
            (this._element = null),
            (this._interval = null),
            (this._isPaused = null),
            (this._isSliding = null),
            (this._activeElement = null),
            (this._indicatorsElement = null);
        }),
        (t._getConfig = function (t) {
          return (t = l({}, F, t)), _.typeCheckConfig(L, t, U), t;
        }),
        (t._handleSwipe = function () {
          var t = Math.abs(this.touchDeltaX);
          if (!(t <= 40)) {
            var e = t / this.touchDeltaX;
            0 < e && this.prev(), e < 0 && this.next();
          }
        }),
        (t._addEventListeners = function () {
          var e = this;
          this._config.keyboard &&
            g(this._element).on(Q.KEYDOWN, function (t) {
              return e._keydown(t);
            }),
            "hover" === this._config.pause &&
              g(this._element)
                .on(Q.MOUSEENTER, function (t) {
                  return e.pause(t);
                })
                .on(Q.MOUSELEAVE, function (t) {
                  return e.cycle(t);
                }),
            this._config.touch && this._addTouchEventListeners();
        }),
        (t._addTouchEventListeners = function () {
          var n = this;
          if (this._touchSupported) {
            var e = function (t) {
                n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()]
                  ? (n.touchStartX = t.originalEvent.clientX)
                  : n._pointerEvent ||
                    (n.touchStartX = t.originalEvent.touches[0].clientX);
              },
              i = function (t) {
                n._pointerEvent &&
                  at[t.originalEvent.pointerType.toUpperCase()] &&
                  (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX),
                  n._handleSwipe(),
                  "hover" === n._config.pause &&
                    (n.pause(),
                    n.touchTimeout && clearTimeout(n.touchTimeout),
                    (n.touchTimeout = setTimeout(function (t) {
                      return n.cycle(t);
                    }, 500 + n._config.interval)));
              };
            g(this._element.querySelectorAll(nt)).on(
              Q.DRAG_START,
              function (t) {
                return t.preventDefault();
              }
            ),
              this._pointerEvent
                ? (g(this._element).on(Q.POINTERDOWN, function (t) {
                    return e(t);
                  }),
                  g(this._element).on(Q.POINTERUP, function (t) {
                    return i(t);
                  }),
                  this._element.classList.add(J))
                : (g(this._element).on(Q.TOUCHSTART, function (t) {
                    return e(t);
                  }),
                  g(this._element).on(Q.TOUCHMOVE, function (t) {
                    var e;
                    (e = t).originalEvent.touches &&
                    1 < e.originalEvent.touches.length
                      ? (n.touchDeltaX = 0)
                      : (n.touchDeltaX =
                          e.originalEvent.touches[0].clientX - n.touchStartX);
                  }),
                  g(this._element).on(Q.TOUCHEND, function (t) {
                    return i(t);
                  }));
          }
        }),
        (t._keydown = function (t) {
          if (!/input|textarea/i.test(t.target.tagName))
            switch (t.which) {
              case 37:
                t.preventDefault(), this.prev();
                break;
              case 39:
                t.preventDefault(), this.next();
            }
        }),
        (t._getItemIndex = function (t) {
          return (
            (this._items =
              t && t.parentNode
                ? [].slice.call(t.parentNode.querySelectorAll(et))
                : []),
            this._items.indexOf(t)
          );
        }),
        (t._getItemByDirection = function (t, e) {
          var n = t === W,
            i = t === q,
            o = this._getItemIndex(e),
            r = this._items.length - 1;
          if (((i && 0 === o) || (n && o === r)) && !this._config.wrap)
            return e;
          var s = (o + (t === q ? -1 : 1)) % this._items.length;
          return -1 === s
            ? this._items[this._items.length - 1]
            : this._items[s];
        }),
        (t._triggerSlideEvent = function (t, e) {
          var n = this._getItemIndex(t),
            i = this._getItemIndex(this._element.querySelector(tt)),
            o = g.Event(Q.SLIDE, {
              relatedTarget: t,
              direction: e,
              from: i,
              to: n,
            });
          return g(this._element).trigger(o), o;
        }),
        (t._setActiveIndicatorElement = function (t) {
          if (this._indicatorsElement) {
            var e = [].slice.call(this._indicatorsElement.querySelectorAll(Z));
            g(e).removeClass(V);
            var n = this._indicatorsElement.children[this._getItemIndex(t)];
            n && g(n).addClass(V);
          }
        }),
        (t._slide = function (t, e) {
          var n,
            i,
            o,
            r = this,
            s = this._element.querySelector(tt),
            a = this._getItemIndex(s),
            l = e || (s && this._getItemByDirection(t, s)),
            c = this._getItemIndex(l),
            h = Boolean(this._interval);
          if (
            ((o = t === W ? ((n = X), (i = $), M) : ((n = z), (i = G), K)),
            l && g(l).hasClass(V))
          )
            this._isSliding = !1;
          else if (
            !this._triggerSlideEvent(l, o).isDefaultPrevented() &&
            s &&
            l
          ) {
            (this._isSliding = !0),
              h && this.pause(),
              this._setActiveIndicatorElement(l);
            var u = g.Event(Q.SLID, {
              relatedTarget: l,
              direction: o,
              from: a,
              to: c,
            });
            if (g(this._element).hasClass(Y)) {
              g(l).addClass(i), _.reflow(l), g(s).addClass(n), g(l).addClass(n);
              var f = parseInt(l.getAttribute("data-interval"), 10);
              this._config.interval = f
                ? ((this._config.defaultInterval =
                    this._config.defaultInterval || this._config.interval),
                  f)
                : this._config.defaultInterval || this._config.interval;
              var d = _.getTransitionDurationFromElement(s);
              g(s)
                .one(_.TRANSITION_END, function () {
                  g(l)
                    .removeClass(n + " " + i)
                    .addClass(V),
                    g(s).removeClass(V + " " + i + " " + n),
                    (r._isSliding = !1),
                    setTimeout(function () {
                      return g(r._element).trigger(u);
                    }, 0);
                })
                .emulateTransitionEnd(d);
            } else
              g(s).removeClass(V),
                g(l).addClass(V),
                (this._isSliding = !1),
                g(this._element).trigger(u);
            h && this.cycle();
          }
        }),
        (r._jQueryInterface = function (i) {
          return this.each(function () {
            var t = g(this).data(j),
              e = l({}, F, g(this).data());
            "object" == typeof i && (e = l({}, e, i));
            var n = "string" == typeof i ? i : e.slide;
            if (
              (t || ((t = new r(this, e)), g(this).data(j, t)),
              "number" == typeof i)
            )
              t.to(i);
            else if ("string" == typeof n) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n]();
            } else e.interval && e.ride && (t.pause(), t.cycle());
          });
        }),
        (r._dataApiClickHandler = function (t) {
          var e = _.getSelectorFromElement(this);
          if (e) {
            var n = g(e)[0];
            if (n && g(n).hasClass(B)) {
              var i = l({}, g(n).data(), g(this).data()),
                o = this.getAttribute("data-slide-to");
              o && (i.interval = !1),
                r._jQueryInterface.call(g(n), i),
                o && g(n).data(j).to(o),
                t.preventDefault();
            }
          }
        }),
        s(r, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return F;
            },
          },
        ]),
        r
      );
    })();
  g(document).on(Q.CLICK_DATA_API, rt, lt._dataApiClickHandler),
    g(window).on(Q.LOAD_DATA_API, function () {
      for (
        var t = [].slice.call(document.querySelectorAll(st)),
          e = 0,
          n = t.length;
        e < n;
        e++
      ) {
        var i = g(t[e]);
        lt._jQueryInterface.call(i, i.data());
      }
    }),
    (g.fn[L] = lt._jQueryInterface),
    (g.fn[L].Constructor = lt),
    (g.fn[L].noConflict = function () {
      return (g.fn[L] = x), lt._jQueryInterface;
    });
  var ct = "collapse",
    ht = "bs.collapse",
    ut = "." + ht,
    ft = g.fn[ct],
    dt = { toggle: !0, parent: "" },
    gt = { toggle: "boolean", parent: "(string|element)" },
    _t = {
      SHOW: "show" + ut,
      SHOWN: "shown" + ut,
      HIDE: "hide" + ut,
      HIDDEN: "hidden" + ut,
      CLICK_DATA_API: "click" + ut + ".data-api",
    },
    mt = "show",
    pt = "collapse",
    vt = "collapsing",
    yt = "collapsed",
    Et = "width",
    Ct = "height",
    Tt = ".show, .collapsing",
    St = '[data-toggle="collapse"]',
    bt = (function () {
      function a(e, t) {
        (this._isTransitioning = !1),
          (this._element = e),
          (this._config = this._getConfig(t)),
          (this._triggerArray = [].slice.call(
            document.querySelectorAll(
              '[data-toggle="collapse"][href="#' +
                e.id +
                '"],[data-toggle="collapse"][data-target="#' +
                e.id +
                '"]'
            )
          ));
        for (
          var n = [].slice.call(document.querySelectorAll(St)),
            i = 0,
            o = n.length;
          i < o;
          i++
        ) {
          var r = n[i],
            s = _.getSelectorFromElement(r),
            a = [].slice
              .call(document.querySelectorAll(s))
              .filter(function (t) {
                return t === e;
              });
          null !== s &&
            0 < a.length &&
            ((this._selector = s), this._triggerArray.push(r));
        }
        (this._parent = this._config.parent ? this._getParent() : null),
          this._config.parent ||
            this._addAriaAndCollapsedClass(this._element, this._triggerArray),
          this._config.toggle && this.toggle();
      }
      var t = a.prototype;
      return (
        (t.toggle = function () {
          g(this._element).hasClass(mt) ? this.hide() : this.show();
        }),
        (t.show = function () {
          var t,
            e,
            n = this;
          if (
            !this._isTransitioning &&
            !g(this._element).hasClass(mt) &&
            (this._parent &&
              0 ===
                (t = [].slice
                  .call(this._parent.querySelectorAll(Tt))
                  .filter(function (t) {
                    return "string" == typeof n._config.parent
                      ? t.getAttribute("data-parent") === n._config.parent
                      : t.classList.contains(pt);
                  })).length &&
              (t = null),
            !(
              t &&
              (e = g(t).not(this._selector).data(ht)) &&
              e._isTransitioning
            ))
          ) {
            var i = g.Event(_t.SHOW);
            if ((g(this._element).trigger(i), !i.isDefaultPrevented())) {
              t &&
                (a._jQueryInterface.call(g(t).not(this._selector), "hide"),
                e || g(t).data(ht, null));
              var o = this._getDimension();
              g(this._element).removeClass(pt).addClass(vt),
                (this._element.style[o] = 0),
                this._triggerArray.length &&
                  g(this._triggerArray)
                    .removeClass(yt)
                    .attr("aria-expanded", !0),
                this.setTransitioning(!0);
              var r = "scroll" + (o[0].toUpperCase() + o.slice(1)),
                s = _.getTransitionDurationFromElement(this._element);
              g(this._element)
                .one(_.TRANSITION_END, function () {
                  g(n._element).removeClass(vt).addClass(pt).addClass(mt),
                    (n._element.style[o] = ""),
                    n.setTransitioning(!1),
                    g(n._element).trigger(_t.SHOWN);
                })
                .emulateTransitionEnd(s),
                (this._element.style[o] = this._element[r] + "px");
            }
          }
        }),
        (t.hide = function () {
          var t = this;
          if (!this._isTransitioning && g(this._element).hasClass(mt)) {
            var e = g.Event(_t.HIDE);
            if ((g(this._element).trigger(e), !e.isDefaultPrevented())) {
              var n = this._getDimension();
              (this._element.style[n] =
                this._element.getBoundingClientRect()[n] + "px"),
                _.reflow(this._element),
                g(this._element).addClass(vt).removeClass(pt).removeClass(mt);
              var i = this._triggerArray.length;
              if (0 < i)
                for (var o = 0; o < i; o++) {
                  var r = this._triggerArray[o],
                    s = _.getSelectorFromElement(r);
                  if (null !== s)
                    g([].slice.call(document.querySelectorAll(s))).hasClass(
                      mt
                    ) || g(r).addClass(yt).attr("aria-expanded", !1);
                }
              this.setTransitioning(!0);
              this._element.style[n] = "";
              var a = _.getTransitionDurationFromElement(this._element);
              g(this._element)
                .one(_.TRANSITION_END, function () {
                  t.setTransitioning(!1),
                    g(t._element)
                      .removeClass(vt)
                      .addClass(pt)
                      .trigger(_t.HIDDEN);
                })
                .emulateTransitionEnd(a);
            }
          }
        }),
        (t.setTransitioning = function (t) {
          this._isTransitioning = t;
        }),
        (t.dispose = function () {
          g.removeData(this._element, ht),
            (this._config = null),
            (this._parent = null),
            (this._element = null),
            (this._triggerArray = null),
            (this._isTransitioning = null);
        }),
        (t._getConfig = function (t) {
          return (
            ((t = l({}, dt, t)).toggle = Boolean(t.toggle)),
            _.typeCheckConfig(ct, t, gt),
            t
          );
        }),
        (t._getDimension = function () {
          return g(this._element).hasClass(Et) ? Et : Ct;
        }),
        (t._getParent = function () {
          var t,
            n = this;
          _.isElement(this._config.parent)
            ? ((t = this._config.parent),
              "undefined" != typeof this._config.parent.jquery &&
                (t = this._config.parent[0]))
            : (t = document.querySelector(this._config.parent));
          var e =
              '[data-toggle="collapse"][data-parent="' +
              this._config.parent +
              '"]',
            i = [].slice.call(t.querySelectorAll(e));
          return (
            g(i).each(function (t, e) {
              n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e]);
            }),
            t
          );
        }),
        (t._addAriaAndCollapsedClass = function (t, e) {
          var n = g(t).hasClass(mt);
          e.length && g(e).toggleClass(yt, !n).attr("aria-expanded", n);
        }),
        (a._getTargetFromElement = function (t) {
          var e = _.getSelectorFromElement(t);
          return e ? document.querySelector(e) : null;
        }),
        (a._jQueryInterface = function (i) {
          return this.each(function () {
            var t = g(this),
              e = t.data(ht),
              n = l({}, dt, t.data(), "object" == typeof i && i ? i : {});
            if (
              (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1),
              e || ((e = new a(this, n)), t.data(ht, e)),
              "string" == typeof i)
            ) {
              if ("undefined" == typeof e[i])
                throw new TypeError('No method named "' + i + '"');
              e[i]();
            }
          });
        }),
        s(a, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return dt;
            },
          },
        ]),
        a
      );
    })();
  g(document).on(_t.CLICK_DATA_API, St, function (t) {
    "A" === t.currentTarget.tagName && t.preventDefault();
    var n = g(this),
      e = _.getSelectorFromElement(this),
      i = [].slice.call(document.querySelectorAll(e));
    g(i).each(function () {
      var t = g(this),
        e = t.data(ht) ? "toggle" : n.data();
      bt._jQueryInterface.call(t, e);
    });
  }),
    (g.fn[ct] = bt._jQueryInterface),
    (g.fn[ct].Constructor = bt),
    (g.fn[ct].noConflict = function () {
      return (g.fn[ct] = ft), bt._jQueryInterface;
    });
  var It = "dropdown",
    Dt = "bs.dropdown",
    wt = "." + Dt,
    At = ".data-api",
    Nt = g.fn[It],
    Ot = new RegExp("38|40|27"),
    kt = {
      HIDE: "hide" + wt,
      HIDDEN: "hidden" + wt,
      SHOW: "show" + wt,
      SHOWN: "shown" + wt,
      CLICK: "click" + wt,
      CLICK_DATA_API: "click" + wt + At,
      KEYDOWN_DATA_API: "keydown" + wt + At,
      KEYUP_DATA_API: "keyup" + wt + At,
    },
    Pt = "disabled",
    Lt = "show",
    jt = "dropup",
    Ht = "dropright",
    Rt = "dropleft",
    xt = "dropdown-menu-right",
    Ft = "position-static",
    Ut = '[data-toggle="dropdown"]',
    Wt = ".dropdown form",
    qt = ".dropdown-menu",
    Mt = ".navbar-nav",
    Kt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
    Qt = "top-start",
    Bt = "top-end",
    Vt = "bottom-start",
    Yt = "bottom-end",
    zt = "right-start",
    Xt = "left-start",
    $t = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic",
    },
    Gt = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string",
    },
    Jt = (function () {
      function c(t, e) {
        (this._element = t),
          (this._popper = null),
          (this._config = this._getConfig(e)),
          (this._menu = this._getMenuElement()),
          (this._inNavbar = this._detectNavbar()),
          this._addEventListeners();
      }
      var t = c.prototype;
      return (
        (t.toggle = function () {
          if (!this._element.disabled && !g(this._element).hasClass(Pt)) {
            var t = c._getParentFromElement(this._element),
              e = g(this._menu).hasClass(Lt);
            if ((c._clearMenus(), !e)) {
              var n = { relatedTarget: this._element },
                i = g.Event(kt.SHOW, n);
              if ((g(t).trigger(i), !i.isDefaultPrevented())) {
                if (!this._inNavbar) {
                  if ("undefined" == typeof u)
                    throw new TypeError(
                      "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                    );
                  var o = this._element;
                  "parent" === this._config.reference
                    ? (o = t)
                    : _.isElement(this._config.reference) &&
                      ((o = this._config.reference),
                      "undefined" != typeof this._config.reference.jquery &&
                        (o = this._config.reference[0])),
                    "scrollParent" !== this._config.boundary &&
                      g(t).addClass(Ft),
                    (this._popper = new u(
                      o,
                      this._menu,
                      this._getPopperConfig()
                    ));
                }
                "ontouchstart" in document.documentElement &&
                  0 === g(t).closest(Mt).length &&
                  g(document.body).children().on("mouseover", null, g.noop),
                  this._element.focus(),
                  this._element.setAttribute("aria-expanded", !0),
                  g(this._menu).toggleClass(Lt),
                  g(t).toggleClass(Lt).trigger(g.Event(kt.SHOWN, n));
              }
            }
          }
        }),
        (t.show = function () {
          if (
            !(
              this._element.disabled ||
              g(this._element).hasClass(Pt) ||
              g(this._menu).hasClass(Lt)
            )
          ) {
            var t = { relatedTarget: this._element },
              e = g.Event(kt.SHOW, t),
              n = c._getParentFromElement(this._element);
            g(n).trigger(e),
              e.isDefaultPrevented() ||
                (g(this._menu).toggleClass(Lt),
                g(n).toggleClass(Lt).trigger(g.Event(kt.SHOWN, t)));
          }
        }),
        (t.hide = function () {
          if (
            !this._element.disabled &&
            !g(this._element).hasClass(Pt) &&
            g(this._menu).hasClass(Lt)
          ) {
            var t = { relatedTarget: this._element },
              e = g.Event(kt.HIDE, t),
              n = c._getParentFromElement(this._element);
            g(n).trigger(e),
              e.isDefaultPrevented() ||
                (g(this._menu).toggleClass(Lt),
                g(n).toggleClass(Lt).trigger(g.Event(kt.HIDDEN, t)));
          }
        }),
        (t.dispose = function () {
          g.removeData(this._element, Dt),
            g(this._element).off(wt),
            (this._element = null),
            (this._menu = null) !== this._popper &&
              (this._popper.destroy(), (this._popper = null));
        }),
        (t.update = function () {
          (this._inNavbar = this._detectNavbar()),
            null !== this._popper && this._popper.scheduleUpdate();
        }),
        (t._addEventListeners = function () {
          var e = this;
          g(this._element).on(kt.CLICK, function (t) {
            t.preventDefault(), t.stopPropagation(), e.toggle();
          });
        }),
        (t._getConfig = function (t) {
          return (
            (t = l({}, this.constructor.Default, g(this._element).data(), t)),
            _.typeCheckConfig(It, t, this.constructor.DefaultType),
            t
          );
        }),
        (t._getMenuElement = function () {
          if (!this._menu) {
            var t = c._getParentFromElement(this._element);
            t && (this._menu = t.querySelector(qt));
          }
          return this._menu;
        }),
        (t._getPlacement = function () {
          var t = g(this._element.parentNode),
            e = Vt;
          return (
            t.hasClass(jt)
              ? ((e = Qt), g(this._menu).hasClass(xt) && (e = Bt))
              : t.hasClass(Ht)
              ? (e = zt)
              : t.hasClass(Rt)
              ? (e = Xt)
              : g(this._menu).hasClass(xt) && (e = Yt),
            e
          );
        }),
        (t._detectNavbar = function () {
          return 0 < g(this._element).closest(".navbar").length;
        }),
        (t._getOffset = function () {
          var e = this,
            t = {};
          return (
            "function" == typeof this._config.offset
              ? (t.fn = function (t) {
                  return (
                    (t.offsets = l(
                      {},
                      t.offsets,
                      e._config.offset(t.offsets, e._element) || {}
                    )),
                    t
                  );
                })
              : (t.offset = this._config.offset),
            t
          );
        }),
        (t._getPopperConfig = function () {
          var t = {
            placement: this._getPlacement(),
            modifiers: {
              offset: this._getOffset(),
              flip: { enabled: this._config.flip },
              preventOverflow: { boundariesElement: this._config.boundary },
            },
          };
          return (
            "static" === this._config.display &&
              (t.modifiers.applyStyle = { enabled: !1 }),
            t
          );
        }),
        (c._jQueryInterface = function (e) {
          return this.each(function () {
            var t = g(this).data(Dt);
            if (
              (t ||
                ((t = new c(this, "object" == typeof e ? e : null)),
                g(this).data(Dt, t)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof t[e])
                throw new TypeError('No method named "' + e + '"');
              t[e]();
            }
          });
        }),
        (c._clearMenus = function (t) {
          if (!t || (3 !== t.which && ("keyup" !== t.type || 9 === t.which)))
            for (
              var e = [].slice.call(document.querySelectorAll(Ut)),
                n = 0,
                i = e.length;
              n < i;
              n++
            ) {
              var o = c._getParentFromElement(e[n]),
                r = g(e[n]).data(Dt),
                s = { relatedTarget: e[n] };
              if ((t && "click" === t.type && (s.clickEvent = t), r)) {
                var a = r._menu;
                if (
                  g(o).hasClass(Lt) &&
                  !(
                    t &&
                    (("click" === t.type &&
                      /input|textarea/i.test(t.target.tagName)) ||
                      ("keyup" === t.type && 9 === t.which)) &&
                    g.contains(o, t.target)
                  )
                ) {
                  var l = g.Event(kt.HIDE, s);
                  g(o).trigger(l),
                    l.isDefaultPrevented() ||
                      ("ontouchstart" in document.documentElement &&
                        g(document.body)
                          .children()
                          .off("mouseover", null, g.noop),
                      e[n].setAttribute("aria-expanded", "false"),
                      g(a).removeClass(Lt),
                      g(o).removeClass(Lt).trigger(g.Event(kt.HIDDEN, s)));
                }
              }
            }
        }),
        (c._getParentFromElement = function (t) {
          var e,
            n = _.getSelectorFromElement(t);
          return n && (e = document.querySelector(n)), e || t.parentNode;
        }),
        (c._dataApiKeydownHandler = function (t) {
          if (
            (/input|textarea/i.test(t.target.tagName)
              ? !(
                  32 === t.which ||
                  (27 !== t.which &&
                    ((40 !== t.which && 38 !== t.which) ||
                      g(t.target).closest(qt).length))
                )
              : Ot.test(t.which)) &&
            (t.preventDefault(),
            t.stopPropagation(),
            !this.disabled && !g(this).hasClass(Pt))
          ) {
            var e = c._getParentFromElement(this),
              n = g(e).hasClass(Lt);
            if (n && (!n || (27 !== t.which && 32 !== t.which))) {
              var i = [].slice.call(e.querySelectorAll(Kt));
              if (0 !== i.length) {
                var o = i.indexOf(t.target);
                38 === t.which && 0 < o && o--,
                  40 === t.which && o < i.length - 1 && o++,
                  o < 0 && (o = 0),
                  i[o].focus();
              }
            } else {
              if (27 === t.which) {
                var r = e.querySelector(Ut);
                g(r).trigger("focus");
              }
              g(this).trigger("click");
            }
          }
        }),
        s(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return $t;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Gt;
            },
          },
        ]),
        c
      );
    })();
  g(document)
    .on(kt.KEYDOWN_DATA_API, Ut, Jt._dataApiKeydownHandler)
    .on(kt.KEYDOWN_DATA_API, qt, Jt._dataApiKeydownHandler)
    .on(kt.CLICK_DATA_API + " " + kt.KEYUP_DATA_API, Jt._clearMenus)
    .on(kt.CLICK_DATA_API, Ut, function (t) {
      t.preventDefault(),
        t.stopPropagation(),
        Jt._jQueryInterface.call(g(this), "toggle");
    })
    .on(kt.CLICK_DATA_API, Wt, function (t) {
      t.stopPropagation();
    }),
    (g.fn[It] = Jt._jQueryInterface),
    (g.fn[It].Constructor = Jt),
    (g.fn[It].noConflict = function () {
      return (g.fn[It] = Nt), Jt._jQueryInterface;
    });
  var Zt = "modal",
    te = "bs.modal",
    ee = "." + te,
    ne = g.fn[Zt],
    ie = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
    oe = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean",
    },
    re = {
      HIDE: "hide" + ee,
      HIDDEN: "hidden" + ee,
      SHOW: "show" + ee,
      SHOWN: "shown" + ee,
      FOCUSIN: "focusin" + ee,
      RESIZE: "resize" + ee,
      CLICK_DISMISS: "click.dismiss" + ee,
      KEYDOWN_DISMISS: "keydown.dismiss" + ee,
      MOUSEUP_DISMISS: "mouseup.dismiss" + ee,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + ee,
      CLICK_DATA_API: "click" + ee + ".data-api",
    },
    se = "modal-dialog-scrollable",
    ae = "modal-scrollbar-measure",
    le = "modal-backdrop",
    ce = "modal-open",
    he = "fade",
    ue = "show",
    fe = ".modal-dialog",
    de = ".modal-body",
    ge = '[data-toggle="modal"]',
    _e = '[data-dismiss="modal"]',
    me = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    pe = ".sticky-top",
    ve = (function () {
      function o(t, e) {
        (this._config = this._getConfig(e)),
          (this._element = t),
          (this._dialog = t.querySelector(fe)),
          (this._backdrop = null),
          (this._isShown = !1),
          (this._isBodyOverflowing = !1),
          (this._ignoreBackdropClick = !1),
          (this._isTransitioning = !1),
          (this._scrollbarWidth = 0);
      }
      var t = o.prototype;
      return (
        (t.toggle = function (t) {
          return this._isShown ? this.hide() : this.show(t);
        }),
        (t.show = function (t) {
          var e = this;
          if (!this._isShown && !this._isTransitioning) {
            g(this._element).hasClass(he) && (this._isTransitioning = !0);
            var n = g.Event(re.SHOW, { relatedTarget: t });
            g(this._element).trigger(n),
              this._isShown ||
                n.isDefaultPrevented() ||
                ((this._isShown = !0),
                this._checkScrollbar(),
                this._setScrollbar(),
                this._adjustDialog(),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                g(this._element).on(re.CLICK_DISMISS, _e, function (t) {
                  return e.hide(t);
                }),
                g(this._dialog).on(re.MOUSEDOWN_DISMISS, function () {
                  g(e._element).one(re.MOUSEUP_DISMISS, function (t) {
                    g(t.target).is(e._element) && (e._ignoreBackdropClick = !0);
                  });
                }),
                this._showBackdrop(function () {
                  return e._showElement(t);
                }));
          }
        }),
        (t.hide = function (t) {
          var e = this;
          if (
            (t && t.preventDefault(), this._isShown && !this._isTransitioning)
          ) {
            var n = g.Event(re.HIDE);
            if (
              (g(this._element).trigger(n),
              this._isShown && !n.isDefaultPrevented())
            ) {
              this._isShown = !1;
              var i = g(this._element).hasClass(he);
              if (
                (i && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                g(document).off(re.FOCUSIN),
                g(this._element).removeClass(ue),
                g(this._element).off(re.CLICK_DISMISS),
                g(this._dialog).off(re.MOUSEDOWN_DISMISS),
                i)
              ) {
                var o = _.getTransitionDurationFromElement(this._element);
                g(this._element)
                  .one(_.TRANSITION_END, function (t) {
                    return e._hideModal(t);
                  })
                  .emulateTransitionEnd(o);
              } else this._hideModal();
            }
          }
        }),
        (t.dispose = function () {
          [window, this._element, this._dialog].forEach(function (t) {
            return g(t).off(ee);
          }),
            g(document).off(re.FOCUSIN),
            g.removeData(this._element, te),
            (this._config = null),
            (this._element = null),
            (this._dialog = null),
            (this._backdrop = null),
            (this._isShown = null),
            (this._isBodyOverflowing = null),
            (this._ignoreBackdropClick = null),
            (this._isTransitioning = null),
            (this._scrollbarWidth = null);
        }),
        (t.handleUpdate = function () {
          this._adjustDialog();
        }),
        (t._getConfig = function (t) {
          return (t = l({}, ie, t)), _.typeCheckConfig(Zt, t, oe), t;
        }),
        (t._showElement = function (t) {
          var e = this,
            n = g(this._element).hasClass(he);
          (this._element.parentNode &&
            this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
            document.body.appendChild(this._element),
            (this._element.style.display = "block"),
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            g(this._dialog).hasClass(se)
              ? (this._dialog.querySelector(de).scrollTop = 0)
              : (this._element.scrollTop = 0),
            n && _.reflow(this._element),
            g(this._element).addClass(ue),
            this._config.focus && this._enforceFocus();
          var i = g.Event(re.SHOWN, { relatedTarget: t }),
            o = function () {
              e._config.focus && e._element.focus(),
                (e._isTransitioning = !1),
                g(e._element).trigger(i);
            };
          if (n) {
            var r = _.getTransitionDurationFromElement(this._dialog);
            g(this._dialog).one(_.TRANSITION_END, o).emulateTransitionEnd(r);
          } else o();
        }),
        (t._enforceFocus = function () {
          var e = this;
          g(document)
            .off(re.FOCUSIN)
            .on(re.FOCUSIN, function (t) {
              document !== t.target &&
                e._element !== t.target &&
                0 === g(e._element).has(t.target).length &&
                e._element.focus();
            });
        }),
        (t._setEscapeEvent = function () {
          var e = this;
          this._isShown && this._config.keyboard
            ? g(this._element).on(re.KEYDOWN_DISMISS, function (t) {
                27 === t.which && (t.preventDefault(), e.hide());
              })
            : this._isShown || g(this._element).off(re.KEYDOWN_DISMISS);
        }),
        (t._setResizeEvent = function () {
          var e = this;
          this._isShown
            ? g(window).on(re.RESIZE, function (t) {
                return e.handleUpdate(t);
              })
            : g(window).off(re.RESIZE);
        }),
        (t._hideModal = function () {
          var t = this;
          (this._element.style.display = "none"),
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            (this._isTransitioning = !1),
            this._showBackdrop(function () {
              g(document.body).removeClass(ce),
                t._resetAdjustments(),
                t._resetScrollbar(),
                g(t._element).trigger(re.HIDDEN);
            });
        }),
        (t._removeBackdrop = function () {
          this._backdrop &&
            (g(this._backdrop).remove(), (this._backdrop = null));
        }),
        (t._showBackdrop = function (t) {
          var e = this,
            n = g(this._element).hasClass(he) ? he : "";
          if (this._isShown && this._config.backdrop) {
            if (
              ((this._backdrop = document.createElement("div")),
              (this._backdrop.className = le),
              n && this._backdrop.classList.add(n),
              g(this._backdrop).appendTo(document.body),
              g(this._element).on(re.CLICK_DISMISS, function (t) {
                e._ignoreBackdropClick
                  ? (e._ignoreBackdropClick = !1)
                  : t.target === t.currentTarget &&
                    ("static" === e._config.backdrop
                      ? e._element.focus()
                      : e.hide());
              }),
              n && _.reflow(this._backdrop),
              g(this._backdrop).addClass(ue),
              !t)
            )
              return;
            if (!n) return void t();
            var i = _.getTransitionDurationFromElement(this._backdrop);
            g(this._backdrop).one(_.TRANSITION_END, t).emulateTransitionEnd(i);
          } else if (!this._isShown && this._backdrop) {
            g(this._backdrop).removeClass(ue);
            var o = function () {
              e._removeBackdrop(), t && t();
            };
            if (g(this._element).hasClass(he)) {
              var r = _.getTransitionDurationFromElement(this._backdrop);
              g(this._backdrop)
                .one(_.TRANSITION_END, o)
                .emulateTransitionEnd(r);
            } else o();
          } else t && t();
        }),
        (t._adjustDialog = function () {
          var t =
            this._element.scrollHeight > document.documentElement.clientHeight;
          !this._isBodyOverflowing &&
            t &&
            (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
            this._isBodyOverflowing &&
              !t &&
              (this._element.style.paddingRight = this._scrollbarWidth + "px");
        }),
        (t._resetAdjustments = function () {
          (this._element.style.paddingLeft = ""),
            (this._element.style.paddingRight = "");
        }),
        (t._checkScrollbar = function () {
          var t = document.body.getBoundingClientRect();
          (this._isBodyOverflowing = t.left + t.right < window.innerWidth),
            (this._scrollbarWidth = this._getScrollbarWidth());
        }),
        (t._setScrollbar = function () {
          var o = this;
          if (this._isBodyOverflowing) {
            var t = [].slice.call(document.querySelectorAll(me)),
              e = [].slice.call(document.querySelectorAll(pe));
            g(t).each(function (t, e) {
              var n = e.style.paddingRight,
                i = g(e).css("padding-right");
              g(e)
                .data("padding-right", n)
                .css("padding-right", parseFloat(i) + o._scrollbarWidth + "px");
            }),
              g(e).each(function (t, e) {
                var n = e.style.marginRight,
                  i = g(e).css("margin-right");
                g(e)
                  .data("margin-right", n)
                  .css(
                    "margin-right",
                    parseFloat(i) - o._scrollbarWidth + "px"
                  );
              });
            var n = document.body.style.paddingRight,
              i = g(document.body).css("padding-right");
            g(document.body)
              .data("padding-right", n)
              .css(
                "padding-right",
                parseFloat(i) + this._scrollbarWidth + "px"
              );
          }
          g(document.body).addClass(ce);
        }),
        (t._resetScrollbar = function () {
          var t = [].slice.call(document.querySelectorAll(me));
          g(t).each(function (t, e) {
            var n = g(e).data("padding-right");
            g(e).removeData("padding-right"), (e.style.paddingRight = n || "");
          });
          var e = [].slice.call(document.querySelectorAll("" + pe));
          g(e).each(function (t, e) {
            var n = g(e).data("margin-right");
            "undefined" != typeof n &&
              g(e).css("margin-right", n).removeData("margin-right");
          });
          var n = g(document.body).data("padding-right");
          g(document.body).removeData("padding-right"),
            (document.body.style.paddingRight = n || "");
        }),
        (t._getScrollbarWidth = function () {
          var t = document.createElement("div");
          (t.className = ae), document.body.appendChild(t);
          var e = t.getBoundingClientRect().width - t.clientWidth;
          return document.body.removeChild(t), e;
        }),
        (o._jQueryInterface = function (n, i) {
          return this.each(function () {
            var t = g(this).data(te),
              e = l({}, ie, g(this).data(), "object" == typeof n && n ? n : {});
            if (
              (t || ((t = new o(this, e)), g(this).data(te, t)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n](i);
            } else e.show && t.show(i);
          });
        }),
        s(o, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return ie;
            },
          },
        ]),
        o
      );
    })();
  g(document).on(re.CLICK_DATA_API, ge, function (t) {
    var e,
      n = this,
      i = _.getSelectorFromElement(this);
    i && (e = document.querySelector(i));
    var o = g(e).data(te) ? "toggle" : l({}, g(e).data(), g(this).data());
    ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
    var r = g(e).one(re.SHOW, function (t) {
      t.isDefaultPrevented() ||
        r.one(re.HIDDEN, function () {
          g(n).is(":visible") && n.focus();
        });
    });
    ve._jQueryInterface.call(g(e), o, this);
  }),
    (g.fn[Zt] = ve._jQueryInterface),
    (g.fn[Zt].Constructor = ve),
    (g.fn[Zt].noConflict = function () {
      return (g.fn[Zt] = ne), ve._jQueryInterface;
    });
  var ye = [
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ],
    Ee = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
    },
    Ce = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
    Te =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
  function Se(t, s, e) {
    if (0 === t.length) return t;
    if (e && "function" == typeof e) return e(t);
    for (
      var n = new window.DOMParser().parseFromString(t, "text/html"),
        a = Object.keys(s),
        l = [].slice.call(n.body.querySelectorAll("*")),
        i = function (t, e) {
          var n = l[t],
            i = n.nodeName.toLowerCase();
          if (-1 === a.indexOf(n.nodeName.toLowerCase()))
            return n.parentNode.removeChild(n), "continue";
          var o = [].slice.call(n.attributes),
            r = [].concat(s["*"] || [], s[i] || []);
          o.forEach(function (t) {
            (function (t, e) {
              var n = t.nodeName.toLowerCase();
              if (-1 !== e.indexOf(n))
                return (
                  -1 === ye.indexOf(n) ||
                  Boolean(t.nodeValue.match(Ce) || t.nodeValue.match(Te))
                );
              for (
                var i = e.filter(function (t) {
                    return t instanceof RegExp;
                  }),
                  o = 0,
                  r = i.length;
                o < r;
                o++
              )
                if (n.match(i[o])) return !0;
              return !1;
            })(t, r) || n.removeAttribute(t.nodeName);
          });
        },
        o = 0,
        r = l.length;
      o < r;
      o++
    )
      i(o);
    return n.body.innerHTML;
  }
  var be = "tooltip",
    Ie = "bs.tooltip",
    De = "." + Ie,
    we = g.fn[be],
    Ae = "bs-tooltip",
    Ne = new RegExp("(^|\\s)" + Ae + "\\S+", "g"),
    Oe = ["sanitize", "whiteList", "sanitizeFn"],
    ke = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object",
    },
    Pe = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: "right",
      BOTTOM: "bottom",
      LEFT: "left",
    },
    Le = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: Ee,
    },
    je = "show",
    He = "out",
    Re = {
      HIDE: "hide" + De,
      HIDDEN: "hidden" + De,
      SHOW: "show" + De,
      SHOWN: "shown" + De,
      INSERTED: "inserted" + De,
      CLICK: "click" + De,
      FOCUSIN: "focusin" + De,
      FOCUSOUT: "focusout" + De,
      MOUSEENTER: "mouseenter" + De,
      MOUSELEAVE: "mouseleave" + De,
    },
    xe = "fade",
    Fe = "show",
    Ue = ".tooltip-inner",
    We = ".arrow",
    qe = "hover",
    Me = "focus",
    Ke = "click",
    Qe = "manual",
    Be = (function () {
      function i(t, e) {
        if ("undefined" == typeof u)
          throw new TypeError(
            "Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
          );
        (this._isEnabled = !0),
          (this._timeout = 0),
          (this._hoverState = ""),
          (this._activeTrigger = {}),
          (this._popper = null),
          (this.element = t),
          (this.config = this._getConfig(e)),
          (this.tip = null),
          this._setListeners();
      }
      var t = i.prototype;
      return (
        (t.enable = function () {
          this._isEnabled = !0;
        }),
        (t.disable = function () {
          this._isEnabled = !1;
        }),
        (t.toggleEnabled = function () {
          this._isEnabled = !this._isEnabled;
        }),
        (t.toggle = function (t) {
          if (this._isEnabled)
            if (t) {
              var e = this.constructor.DATA_KEY,
                n = g(t.currentTarget).data(e);
              n ||
                ((n = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                g(t.currentTarget).data(e, n)),
                (n._activeTrigger.click = !n._activeTrigger.click),
                n._isWithActiveTrigger()
                  ? n._enter(null, n)
                  : n._leave(null, n);
            } else {
              if (g(this.getTipElement()).hasClass(Fe))
                return void this._leave(null, this);
              this._enter(null, this);
            }
        }),
        (t.dispose = function () {
          clearTimeout(this._timeout),
            g.removeData(this.element, this.constructor.DATA_KEY),
            g(this.element).off(this.constructor.EVENT_KEY),
            g(this.element).closest(".modal").off("hide.bs.modal"),
            this.tip && g(this.tip).remove(),
            (this._isEnabled = null),
            (this._timeout = null),
            (this._hoverState = null),
            (this._activeTrigger = null) !== this._popper &&
              this._popper.destroy(),
            (this._popper = null),
            (this.element = null),
            (this.config = null),
            (this.tip = null);
        }),
        (t.show = function () {
          var e = this;
          if ("none" === g(this.element).css("display"))
            throw new Error("Please use show on visible elements");
          var t = g.Event(this.constructor.Event.SHOW);
          if (this.isWithContent() && this._isEnabled) {
            g(this.element).trigger(t);
            var n = _.findShadowRoot(this.element),
              i = g.contains(
                null !== n ? n : this.element.ownerDocument.documentElement,
                this.element
              );
            if (t.isDefaultPrevented() || !i) return;
            var o = this.getTipElement(),
              r = _.getUID(this.constructor.NAME);
            o.setAttribute("id", r),
              this.element.setAttribute("aria-describedby", r),
              this.setContent(),
              this.config.animation && g(o).addClass(xe);
            var s =
                "function" == typeof this.config.placement
                  ? this.config.placement.call(this, o, this.element)
                  : this.config.placement,
              a = this._getAttachment(s);
            this.addAttachmentClass(a);
            var l = this._getContainer();
            g(o).data(this.constructor.DATA_KEY, this),
              g.contains(
                this.element.ownerDocument.documentElement,
                this.tip
              ) || g(o).appendTo(l),
              g(this.element).trigger(this.constructor.Event.INSERTED),
              (this._popper = new u(this.element, o, {
                placement: a,
                modifiers: {
                  offset: this._getOffset(),
                  flip: { behavior: this.config.fallbackPlacement },
                  arrow: { element: We },
                  preventOverflow: { boundariesElement: this.config.boundary },
                },
                onCreate: function (t) {
                  t.originalPlacement !== t.placement &&
                    e._handlePopperPlacementChange(t);
                },
                onUpdate: function (t) {
                  return e._handlePopperPlacementChange(t);
                },
              })),
              g(o).addClass(Fe),
              "ontouchstart" in document.documentElement &&
                g(document.body).children().on("mouseover", null, g.noop);
            var c = function () {
              e.config.animation && e._fixTransition();
              var t = e._hoverState;
              (e._hoverState = null),
                g(e.element).trigger(e.constructor.Event.SHOWN),
                t === He && e._leave(null, e);
            };
            if (g(this.tip).hasClass(xe)) {
              var h = _.getTransitionDurationFromElement(this.tip);
              g(this.tip).one(_.TRANSITION_END, c).emulateTransitionEnd(h);
            } else c();
          }
        }),
        (t.hide = function (t) {
          var e = this,
            n = this.getTipElement(),
            i = g.Event(this.constructor.Event.HIDE),
            o = function () {
              e._hoverState !== je &&
                n.parentNode &&
                n.parentNode.removeChild(n),
                e._cleanTipClass(),
                e.element.removeAttribute("aria-describedby"),
                g(e.element).trigger(e.constructor.Event.HIDDEN),
                null !== e._popper && e._popper.destroy(),
                t && t();
            };
          if ((g(this.element).trigger(i), !i.isDefaultPrevented())) {
            if (
              (g(n).removeClass(Fe),
              "ontouchstart" in document.documentElement &&
                g(document.body).children().off("mouseover", null, g.noop),
              (this._activeTrigger[Ke] = !1),
              (this._activeTrigger[Me] = !1),
              (this._activeTrigger[qe] = !1),
              g(this.tip).hasClass(xe))
            ) {
              var r = _.getTransitionDurationFromElement(n);
              g(n).one(_.TRANSITION_END, o).emulateTransitionEnd(r);
            } else o();
            this._hoverState = "";
          }
        }),
        (t.update = function () {
          null !== this._popper && this._popper.scheduleUpdate();
        }),
        (t.isWithContent = function () {
          return Boolean(this.getTitle());
        }),
        (t.addAttachmentClass = function (t) {
          g(this.getTipElement()).addClass(Ae + "-" + t);
        }),
        (t.getTipElement = function () {
          return (this.tip = this.tip || g(this.config.template)[0]), this.tip;
        }),
        (t.setContent = function () {
          var t = this.getTipElement();
          this.setElementContent(g(t.querySelectorAll(Ue)), this.getTitle()),
            g(t).removeClass(xe + " " + Fe);
        }),
        (t.setElementContent = function (t, e) {
          "object" != typeof e || (!e.nodeType && !e.jquery)
            ? this.config.html
              ? (this.config.sanitize &&
                  (e = Se(e, this.config.whiteList, this.config.sanitizeFn)),
                t.html(e))
              : t.text(e)
            : this.config.html
            ? g(e).parent().is(t) || t.empty().append(e)
            : t.text(g(e).text());
        }),
        (t.getTitle = function () {
          var t = this.element.getAttribute("data-original-title");
          return (
            t ||
              (t =
                "function" == typeof this.config.title
                  ? this.config.title.call(this.element)
                  : this.config.title),
            t
          );
        }),
        (t._getOffset = function () {
          var e = this,
            t = {};
          return (
            "function" == typeof this.config.offset
              ? (t.fn = function (t) {
                  return (
                    (t.offsets = l(
                      {},
                      t.offsets,
                      e.config.offset(t.offsets, e.element) || {}
                    )),
                    t
                  );
                })
              : (t.offset = this.config.offset),
            t
          );
        }),
        (t._getContainer = function () {
          return !1 === this.config.container
            ? document.body
            : _.isElement(this.config.container)
            ? g(this.config.container)
            : g(document).find(this.config.container);
        }),
        (t._getAttachment = function (t) {
          return Pe[t.toUpperCase()];
        }),
        (t._setListeners = function () {
          var i = this;
          this.config.trigger.split(" ").forEach(function (t) {
            if ("click" === t)
              g(i.element).on(
                i.constructor.Event.CLICK,
                i.config.selector,
                function (t) {
                  return i.toggle(t);
                }
              );
            else if (t !== Qe) {
              var e =
                  t === qe
                    ? i.constructor.Event.MOUSEENTER
                    : i.constructor.Event.FOCUSIN,
                n =
                  t === qe
                    ? i.constructor.Event.MOUSELEAVE
                    : i.constructor.Event.FOCUSOUT;
              g(i.element)
                .on(e, i.config.selector, function (t) {
                  return i._enter(t);
                })
                .on(n, i.config.selector, function (t) {
                  return i._leave(t);
                });
            }
          }),
            g(this.element)
              .closest(".modal")
              .on("hide.bs.modal", function () {
                i.element && i.hide();
              }),
            this.config.selector
              ? (this.config = l({}, this.config, {
                  trigger: "manual",
                  selector: "",
                }))
              : this._fixTitle();
        }),
        (t._fixTitle = function () {
          var t = typeof this.element.getAttribute("data-original-title");
          (this.element.getAttribute("title") || "string" !== t) &&
            (this.element.setAttribute(
              "data-original-title",
              this.element.getAttribute("title") || ""
            ),
            this.element.setAttribute("title", ""));
        }),
        (t._enter = function (t, e) {
          var n = this.constructor.DATA_KEY;
          (e = e || g(t.currentTarget).data(n)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            g(t.currentTarget).data(n, e)),
            t && (e._activeTrigger["focusin" === t.type ? Me : qe] = !0),
            g(e.getTipElement()).hasClass(Fe) || e._hoverState === je
              ? (e._hoverState = je)
              : (clearTimeout(e._timeout),
                (e._hoverState = je),
                e.config.delay && e.config.delay.show
                  ? (e._timeout = setTimeout(function () {
                      e._hoverState === je && e.show();
                    }, e.config.delay.show))
                  : e.show());
        }),
        (t._leave = function (t, e) {
          var n = this.constructor.DATA_KEY;
          (e = e || g(t.currentTarget).data(n)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            g(t.currentTarget).data(n, e)),
            t && (e._activeTrigger["focusout" === t.type ? Me : qe] = !1),
            e._isWithActiveTrigger() ||
              (clearTimeout(e._timeout),
              (e._hoverState = He),
              e.config.delay && e.config.delay.hide
                ? (e._timeout = setTimeout(function () {
                    e._hoverState === He && e.hide();
                  }, e.config.delay.hide))
                : e.hide());
        }),
        (t._isWithActiveTrigger = function () {
          for (var t in this._activeTrigger)
            if (this._activeTrigger[t]) return !0;
          return !1;
        }),
        (t._getConfig = function (t) {
          var e = g(this.element).data();
          return (
            Object.keys(e).forEach(function (t) {
              -1 !== Oe.indexOf(t) && delete e[t];
            }),
            "number" ==
              typeof (t = l(
                {},
                this.constructor.Default,
                e,
                "object" == typeof t && t ? t : {}
              )).delay && (t.delay = { show: t.delay, hide: t.delay }),
            "number" == typeof t.title && (t.title = t.title.toString()),
            "number" == typeof t.content && (t.content = t.content.toString()),
            _.typeCheckConfig(be, t, this.constructor.DefaultType),
            t.sanitize &&
              (t.template = Se(t.template, t.whiteList, t.sanitizeFn)),
            t
          );
        }),
        (t._getDelegateConfig = function () {
          var t = {};
          if (this.config)
            for (var e in this.config)
              this.constructor.Default[e] !== this.config[e] &&
                (t[e] = this.config[e]);
          return t;
        }),
        (t._cleanTipClass = function () {
          var t = g(this.getTipElement()),
            e = t.attr("class").match(Ne);
          null !== e && e.length && t.removeClass(e.join(""));
        }),
        (t._handlePopperPlacementChange = function (t) {
          var e = t.instance;
          (this.tip = e.popper),
            this._cleanTipClass(),
            this.addAttachmentClass(this._getAttachment(t.placement));
        }),
        (t._fixTransition = function () {
          var t = this.getTipElement(),
            e = this.config.animation;
          null === t.getAttribute("x-placement") &&
            (g(t).removeClass(xe),
            (this.config.animation = !1),
            this.hide(),
            this.show(),
            (this.config.animation = e));
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this).data(Ie),
              e = "object" == typeof n && n;
            if (
              (t || !/dispose|hide/.test(n)) &&
              (t || ((t = new i(this, e)), g(this).data(Ie, t)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n]();
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return Le;
            },
          },
          {
            key: "NAME",
            get: function () {
              return be;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return Ie;
            },
          },
          {
            key: "Event",
            get: function () {
              return Re;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return De;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return ke;
            },
          },
        ]),
        i
      );
    })();
  (g.fn[be] = Be._jQueryInterface),
    (g.fn[be].Constructor = Be),
    (g.fn[be].noConflict = function () {
      return (g.fn[be] = we), Be._jQueryInterface;
    });
  var Ve = "popover",
    Ye = "bs.popover",
    ze = "." + Ye,
    Xe = g.fn[Ve],
    $e = "bs-popover",
    Ge = new RegExp("(^|\\s)" + $e + "\\S+", "g"),
    Je = l({}, Be.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    }),
    Ze = l({}, Be.DefaultType, { content: "(string|element|function)" }),
    tn = "fade",
    en = "show",
    nn = ".popover-header",
    on = ".popover-body",
    rn = {
      HIDE: "hide" + ze,
      HIDDEN: "hidden" + ze,
      SHOW: "show" + ze,
      SHOWN: "shown" + ze,
      INSERTED: "inserted" + ze,
      CLICK: "click" + ze,
      FOCUSIN: "focusin" + ze,
      FOCUSOUT: "focusout" + ze,
      MOUSEENTER: "mouseenter" + ze,
      MOUSELEAVE: "mouseleave" + ze,
    },
    sn = (function (t) {
      var e, n;
      function i() {
        return t.apply(this, arguments) || this;
      }
      (n = t),
        ((e = i).prototype = Object.create(n.prototype)),
        ((e.prototype.constructor = e).__proto__ = n);
      var o = i.prototype;
      return (
        (o.isWithContent = function () {
          return this.getTitle() || this._getContent();
        }),
        (o.addAttachmentClass = function (t) {
          g(this.getTipElement()).addClass($e + "-" + t);
        }),
        (o.getTipElement = function () {
          return (this.tip = this.tip || g(this.config.template)[0]), this.tip;
        }),
        (o.setContent = function () {
          var t = g(this.getTipElement());
          this.setElementContent(t.find(nn), this.getTitle());
          var e = this._getContent();
          "function" == typeof e && (e = e.call(this.element)),
            this.setElementContent(t.find(on), e),
            t.removeClass(tn + " " + en);
        }),
        (o._getContent = function () {
          return (
            this.element.getAttribute("data-content") || this.config.content
          );
        }),
        (o._cleanTipClass = function () {
          var t = g(this.getTipElement()),
            e = t.attr("class").match(Ge);
          null !== e && 0 < e.length && t.removeClass(e.join(""));
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this).data(Ye),
              e = "object" == typeof n ? n : null;
            if (
              (t || !/dispose|hide/.test(n)) &&
              (t || ((t = new i(this, e)), g(this).data(Ye, t)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n]();
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return Je;
            },
          },
          {
            key: "NAME",
            get: function () {
              return Ve;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return Ye;
            },
          },
          {
            key: "Event",
            get: function () {
              return rn;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return ze;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Ze;
            },
          },
        ]),
        i
      );
    })(Be);
  (g.fn[Ve] = sn._jQueryInterface),
    (g.fn[Ve].Constructor = sn),
    (g.fn[Ve].noConflict = function () {
      return (g.fn[Ve] = Xe), sn._jQueryInterface;
    });
  var an = "scrollspy",
    ln = "bs.scrollspy",
    cn = "." + ln,
    hn = g.fn[an],
    un = { offset: 10, method: "auto", target: "" },
    fn = { offset: "number", method: "string", target: "(string|element)" },
    dn = {
      ACTIVATE: "activate" + cn,
      SCROLL: "scroll" + cn,
      LOAD_DATA_API: "load" + cn + ".data-api",
    },
    gn = "dropdown-item",
    _n = "active",
    mn = '[data-spy="scroll"]',
    pn = ".nav, .list-group",
    vn = ".nav-link",
    yn = ".nav-item",
    En = ".list-group-item",
    Cn = ".dropdown",
    Tn = ".dropdown-item",
    Sn = ".dropdown-toggle",
    bn = "offset",
    In = "position",
    Dn = (function () {
      function n(t, e) {
        var n = this;
        (this._element = t),
          (this._scrollElement = "BODY" === t.tagName ? window : t),
          (this._config = this._getConfig(e)),
          (this._selector =
            this._config.target +
            " " +
            vn +
            "," +
            this._config.target +
            " " +
            En +
            "," +
            this._config.target +
            " " +
            Tn),
          (this._offsets = []),
          (this._targets = []),
          (this._activeTarget = null),
          (this._scrollHeight = 0),
          g(this._scrollElement).on(dn.SCROLL, function (t) {
            return n._process(t);
          }),
          this.refresh(),
          this._process();
      }
      var t = n.prototype;
      return (
        (t.refresh = function () {
          var e = this,
            t = this._scrollElement === this._scrollElement.window ? bn : In,
            o = "auto" === this._config.method ? t : this._config.method,
            r = o === In ? this._getScrollTop() : 0;
          (this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            [].slice
              .call(document.querySelectorAll(this._selector))
              .map(function (t) {
                var e,
                  n = _.getSelectorFromElement(t);
                if ((n && (e = document.querySelector(n)), e)) {
                  var i = e.getBoundingClientRect();
                  if (i.width || i.height) return [g(e)[o]().top + r, n];
                }
                return null;
              })
              .filter(function (t) {
                return t;
              })
              .sort(function (t, e) {
                return t[0] - e[0];
              })
              .forEach(function (t) {
                e._offsets.push(t[0]), e._targets.push(t[1]);
              });
        }),
        (t.dispose = function () {
          g.removeData(this._element, ln),
            g(this._scrollElement).off(cn),
            (this._element = null),
            (this._scrollElement = null),
            (this._config = null),
            (this._selector = null),
            (this._offsets = null),
            (this._targets = null),
            (this._activeTarget = null),
            (this._scrollHeight = null);
        }),
        (t._getConfig = function (t) {
          if (
            "string" !=
            typeof (t = l({}, un, "object" == typeof t && t ? t : {})).target
          ) {
            var e = g(t.target).attr("id");
            e || ((e = _.getUID(an)), g(t.target).attr("id", e)),
              (t.target = "#" + e);
          }
          return _.typeCheckConfig(an, t, fn), t;
        }),
        (t._getScrollTop = function () {
          return this._scrollElement === window
            ? this._scrollElement.pageYOffset
            : this._scrollElement.scrollTop;
        }),
        (t._getScrollHeight = function () {
          return (
            this._scrollElement.scrollHeight ||
            Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight
            )
          );
        }),
        (t._getOffsetHeight = function () {
          return this._scrollElement === window
            ? window.innerHeight
            : this._scrollElement.getBoundingClientRect().height;
        }),
        (t._process = function () {
          var t = this._getScrollTop() + this._config.offset,
            e = this._getScrollHeight(),
            n = this._config.offset + e - this._getOffsetHeight();
          if ((this._scrollHeight !== e && this.refresh(), n <= t)) {
            var i = this._targets[this._targets.length - 1];
            this._activeTarget !== i && this._activate(i);
          } else {
            if (
              this._activeTarget &&
              t < this._offsets[0] &&
              0 < this._offsets[0]
            )
              return (this._activeTarget = null), void this._clear();
            for (var o = this._offsets.length; o--; ) {
              this._activeTarget !== this._targets[o] &&
                t >= this._offsets[o] &&
                ("undefined" == typeof this._offsets[o + 1] ||
                  t < this._offsets[o + 1]) &&
                this._activate(this._targets[o]);
            }
          }
        }),
        (t._activate = function (e) {
          (this._activeTarget = e), this._clear();
          var t = this._selector.split(",").map(function (t) {
              return (
                t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
              );
            }),
            n = g([].slice.call(document.querySelectorAll(t.join(","))));
          n.hasClass(gn)
            ? (n.closest(Cn).find(Sn).addClass(_n), n.addClass(_n))
            : (n.addClass(_n),
              n
                .parents(pn)
                .prev(vn + ", " + En)
                .addClass(_n),
              n.parents(pn).prev(yn).children(vn).addClass(_n)),
            g(this._scrollElement).trigger(dn.ACTIVATE, { relatedTarget: e });
        }),
        (t._clear = function () {
          [].slice
            .call(document.querySelectorAll(this._selector))
            .filter(function (t) {
              return t.classList.contains(_n);
            })
            .forEach(function (t) {
              return t.classList.remove(_n);
            });
        }),
        (n._jQueryInterface = function (e) {
          return this.each(function () {
            var t = g(this).data(ln);
            if (
              (t ||
                ((t = new n(this, "object" == typeof e && e)),
                g(this).data(ln, t)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof t[e])
                throw new TypeError('No method named "' + e + '"');
              t[e]();
            }
          });
        }),
        s(n, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return un;
            },
          },
        ]),
        n
      );
    })();
  g(window).on(dn.LOAD_DATA_API, function () {
    for (
      var t = [].slice.call(document.querySelectorAll(mn)), e = t.length;
      e--;

    ) {
      var n = g(t[e]);
      Dn._jQueryInterface.call(n, n.data());
    }
  }),
    (g.fn[an] = Dn._jQueryInterface),
    (g.fn[an].Constructor = Dn),
    (g.fn[an].noConflict = function () {
      return (g.fn[an] = hn), Dn._jQueryInterface;
    });
  var wn = "bs.tab",
    An = "." + wn,
    Nn = g.fn.tab,
    On = {
      HIDE: "hide" + An,
      HIDDEN: "hidden" + An,
      SHOW: "show" + An,
      SHOWN: "shown" + An,
      CLICK_DATA_API: "click" + An + ".data-api",
    },
    kn = "dropdown-menu",
    Pn = "active",
    Ln = "disabled",
    jn = "fade",
    Hn = "show",
    Rn = ".dropdown",
    xn = ".nav, .list-group",
    Fn = ".active",
    Un = "> li > .active",
    Wn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    qn = ".dropdown-toggle",
    Mn = "> .dropdown-menu .active",
    Kn = (function () {
      function i(t) {
        this._element = t;
      }
      var t = i.prototype;
      return (
        (t.show = function () {
          var n = this;
          if (
            !(
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                g(this._element).hasClass(Pn)) ||
              g(this._element).hasClass(Ln)
            )
          ) {
            var t,
              i,
              e = g(this._element).closest(xn)[0],
              o = _.getSelectorFromElement(this._element);
            if (e) {
              var r = "UL" === e.nodeName || "OL" === e.nodeName ? Un : Fn;
              i = (i = g.makeArray(g(e).find(r)))[i.length - 1];
            }
            var s = g.Event(On.HIDE, { relatedTarget: this._element }),
              a = g.Event(On.SHOW, { relatedTarget: i });
            if (
              (i && g(i).trigger(s),
              g(this._element).trigger(a),
              !a.isDefaultPrevented() && !s.isDefaultPrevented())
            ) {
              o && (t = document.querySelector(o)),
                this._activate(this._element, e);
              var l = function () {
                var t = g.Event(On.HIDDEN, { relatedTarget: n._element }),
                  e = g.Event(On.SHOWN, { relatedTarget: i });
                g(i).trigger(t), g(n._element).trigger(e);
              };
              t ? this._activate(t, t.parentNode, l) : l();
            }
          }
        }),
        (t.dispose = function () {
          g.removeData(this._element, wn), (this._element = null);
        }),
        (t._activate = function (t, e, n) {
          var i = this,
            o = (
              !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
                ? g(e).children(Fn)
                : g(e).find(Un)
            )[0],
            r = n && o && g(o).hasClass(jn),
            s = function () {
              return i._transitionComplete(t, o, n);
            };
          if (o && r) {
            var a = _.getTransitionDurationFromElement(o);
            g(o)
              .removeClass(Hn)
              .one(_.TRANSITION_END, s)
              .emulateTransitionEnd(a);
          } else s();
        }),
        (t._transitionComplete = function (t, e, n) {
          if (e) {
            g(e).removeClass(Pn);
            var i = g(e.parentNode).find(Mn)[0];
            i && g(i).removeClass(Pn),
              "tab" === e.getAttribute("role") &&
                e.setAttribute("aria-selected", !1);
          }
          if (
            (g(t).addClass(Pn),
            "tab" === t.getAttribute("role") &&
              t.setAttribute("aria-selected", !0),
            _.reflow(t),
            t.classList.contains(jn) && t.classList.add(Hn),
            t.parentNode && g(t.parentNode).hasClass(kn))
          ) {
            var o = g(t).closest(Rn)[0];
            if (o) {
              var r = [].slice.call(o.querySelectorAll(qn));
              g(r).addClass(Pn);
            }
            t.setAttribute("aria-expanded", !0);
          }
          n && n();
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this),
              e = t.data(wn);
            if (
              (e || ((e = new i(this)), t.data(wn, e)), "string" == typeof n)
            ) {
              if ("undefined" == typeof e[n])
                throw new TypeError('No method named "' + n + '"');
              e[n]();
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.3.1";
            },
          },
        ]),
        i
      );
    })();
  g(document).on(On.CLICK_DATA_API, Wn, function (t) {
    t.preventDefault(), Kn._jQueryInterface.call(g(this), "show");
  }),
    (g.fn.tab = Kn._jQueryInterface),
    (g.fn.tab.Constructor = Kn),
    (g.fn.tab.noConflict = function () {
      return (g.fn.tab = Nn), Kn._jQueryInterface;
    });
  var Qn = "toast",
    Bn = "bs.toast",
    Vn = "." + Bn,
    Yn = g.fn[Qn],
    zn = {
      CLICK_DISMISS: "click.dismiss" + Vn,
      HIDE: "hide" + Vn,
      HIDDEN: "hidden" + Vn,
      SHOW: "show" + Vn,
      SHOWN: "shown" + Vn,
    },
    Xn = "fade",
    $n = "hide",
    Gn = "show",
    Jn = "showing",
    Zn = { animation: "boolean", autohide: "boolean", delay: "number" },
    ti = { animation: !0, autohide: !0, delay: 500 },
    ei = '[data-dismiss="toast"]',
    ni = (function () {
      function i(t, e) {
        (this._element = t),
          (this._config = this._getConfig(e)),
          (this._timeout = null),
          this._setListeners();
      }
      var t = i.prototype;
      return (
        (t.show = function () {
          var t = this;
          g(this._element).trigger(zn.SHOW),
            this._config.animation && this._element.classList.add(Xn);
          var e = function () {
            t._element.classList.remove(Jn),
              t._element.classList.add(Gn),
              g(t._element).trigger(zn.SHOWN),
              t._config.autohide && t.hide();
          };
          if (
            (this._element.classList.remove($n),
            this._element.classList.add(Jn),
            this._config.animation)
          ) {
            var n = _.getTransitionDurationFromElement(this._element);
            g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n);
          } else e();
        }),
        (t.hide = function (t) {
          var e = this;
          this._element.classList.contains(Gn) &&
            (g(this._element).trigger(zn.HIDE),
            t
              ? this._close()
              : (this._timeout = setTimeout(function () {
                  e._close();
                }, this._config.delay)));
        }),
        (t.dispose = function () {
          clearTimeout(this._timeout),
            (this._timeout = null),
            this._element.classList.contains(Gn) &&
              this._element.classList.remove(Gn),
            g(this._element).off(zn.CLICK_DISMISS),
            g.removeData(this._element, Bn),
            (this._element = null),
            (this._config = null);
        }),
        (t._getConfig = function (t) {
          return (
            (t = l(
              {},
              ti,
              g(this._element).data(),
              "object" == typeof t && t ? t : {}
            )),
            _.typeCheckConfig(Qn, t, this.constructor.DefaultType),
            t
          );
        }),
        (t._setListeners = function () {
          var t = this;
          g(this._element).on(zn.CLICK_DISMISS, ei, function () {
            return t.hide(!0);
          });
        }),
        (t._close = function () {
          var t = this,
            e = function () {
              t._element.classList.add($n), g(t._element).trigger(zn.HIDDEN);
            };
          if ((this._element.classList.remove(Gn), this._config.animation)) {
            var n = _.getTransitionDurationFromElement(this._element);
            g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n);
          } else e();
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this),
              e = t.data(Bn);
            if (
              (e ||
                ((e = new i(this, "object" == typeof n && n)), t.data(Bn, e)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof e[n])
                throw new TypeError('No method named "' + n + '"');
              e[n](this);
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.3.1";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Zn;
            },
          },
          {
            key: "Default",
            get: function () {
              return ti;
            },
          },
        ]),
        i
      );
    })();
  (g.fn[Qn] = ni._jQueryInterface),
    (g.fn[Qn].Constructor = ni),
    (g.fn[Qn].noConflict = function () {
      return (g.fn[Qn] = Yn), ni._jQueryInterface;
    }),
    (function () {
      if ("undefined" == typeof g)
        throw new TypeError(
          "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
        );
      var t = g.fn.jquery.split(" ")[0].split(".");
      if (
        (t[0] < 2 && t[1] < 9) ||
        (1 === t[0] && 9 === t[1] && t[2] < 1) ||
        4 <= t[0]
      )
        throw new Error(
          "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
        );
    })(),
    (t.Util = _),
    (t.Alert = p),
    (t.Button = P),
    (t.Carousel = lt),
    (t.Collapse = bt),
    (t.Dropdown = Jt),
    (t.Modal = ve),
    (t.Popover = sn),
    (t.Scrollspy = Dn),
    (t.Tab = Kn),
    (t.Toast = ni),
    (t.Tooltip = Be),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
//# sourceMappingURL=bootstrap.min.js.map
/*
 * jQuery Nestoria Slider
 *
 * Copyright 2014, Lokku Ltd.
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
  /*
   * These are used for user interaction. This plugin assumes the user can
   * interact with one control at a time. For this reason it's safe to keep
   * these global.
   */
  var _$current_slider;
  var _is_mousedown;
  var _original_mousex;

  // both for keyboard and mouse interaction
  var _is_left_grip;

  // for keyboard interaction only
  var _before_keydown_value;
  var _before_keydown_pixel;
  var _before_keyup_value;
  var _before_keyup_pixel;

  // a fixed configuration for the single bar slider, used to decide where to
  // place the naked bar.
  var _naked_bar_deltas; // see populateNakedBarDeltas

  var _methods = {
    /*
     * This method must be called once during initialization.
     * It sets the behaviour of the naked bar in case of one handle.
     */
    setNakedBarDelta: function (position, handleWidth) {
      if (position === "stickToSides") {
        _naked_bar_deltas = {
          toEndWidth: handleWidth,
          toBeginLeft: 0,
          toBeginWidth: handleWidth,
        };
      } else if (position === "middle") {
        // Position naked end of the bar at the middle value.
        _naked_bar_deltas = {
          toEndWidth: handleWidth / 2,
          toBeginLeft: handleWidth / 2,
          toBeginWidth: handleWidth / 2,
        };
      } else {
        throw new Error("unknown position of setNakedBarDelta: " + position);
      }
    },
    getSliderValuesAtPositionPx: function (leftPx, rightPx) {
      var $this = this,
        leftPxInValue,
        rightPxInValue,
        pixel_to_value_mapping_func = $this.data("pixel_to_value_mapping");

      if (typeof pixel_to_value_mapping_func !== "undefined") {
        leftPxInValue = pixel_to_value_mapping_func(leftPx);
        rightPxInValue = pixel_to_value_mapping_func(rightPx);
      } else {
        var w =
          _methods.getSliderWidthPx.call($this) - $this.data("left_grip_width");
        leftPxInValue = _methods.inverse_rangemap_0_to_n.call($this, leftPx, w);
        rightPxInValue = _methods.inverse_rangemap_0_to_n.call(
          $this,
          rightPx,
          w
        );
      }

      return [leftPxInValue, rightPxInValue];
    },
    /*
     *  Move slider grips to the specified position. This method is
     *  designed to run within the user interaction lifecycle. Only call
     *  this method if the user has interacted with the sliders
     *  actually...
     *
     *  First the desired positions are validated. If values are ok, the
     *  move is performed, otherwise it's just ignored because weird
     *  values have been passed.
     */
    validateAndMoveGripsToPx: function (
      nextLeftGripPositionPx,
      nextRightGripPositionPx
    ) {
      var $this = this;

      var draggableAreaLengthPx =
        _methods.getSliderWidthPx.call($this) - $this.data("left_grip_width");

      //
      // Validate & Move
      //
      if (
        nextRightGripPositionPx <= draggableAreaLengthPx &&
        nextLeftGripPositionPx >= 0 &&
        nextLeftGripPositionPx <= draggableAreaLengthPx &&
        (!$this.data("has_right_grip") ||
          nextLeftGripPositionPx <= nextRightGripPositionPx)
      ) {
        var prevMin = $this.data("cur_min"),
          prevMax = $this.data("cur_max");

        // note: also stores new cur_min, cur_max
        _methods.set_position_from_px.call(
          $this,
          nextLeftGripPositionPx,
          nextRightGripPositionPx
        );

        // set the style of the grips according to the highlighted range
        _methods.refresh_grips_style.call($this);

        _methods.notify_changed_implicit.call(
          $this,
          "drag_move",
          prevMin,
          prevMax
        );
      }

      return $this;
    },
    /*
     * Update aria attributes of the slider based on the current
     * configuration of the slider.
     */
    updateAriaAttributes: function () {
      var $this = this,
        settings = $this.data("settings"),
        $leftGrip = $this.find(settings.left_grip_selector);

      //
      // double grips sliders is probably the most common case...
      // ... also, the values to be set in the two cases are quite
      // different.
      //
      if ($this.data("has_right_grip")) {
        var $rightGrip = $this.find(settings.right_grip_selector);

        //
        // grips are mutually binding their max/min values when 2 grips
        // are present. For example, we should imagine the left grip as
        // being constrained between [ rangeMin, valueMax ]
        //
        $leftGrip
          .attr("aria-valuemin", $this.data("range_min"))
          .attr("aria-valuenow", methods.get_current_min_value.call($this))
          .attr("aria-valuemax", methods.get_current_max_value.call($this));

        $rightGrip
          .attr("aria-valuemin", methods.get_current_min_value.call($this))
          .attr("aria-valuenow", methods.get_current_max_value.call($this))
          .attr("aria-valuemax", $this.data("range_max"));
      } else {
        $leftGrip
          .attr("aria-valuemin", $this.data("range_min"))
          .attr("aria-valuenow", methods.get_current_min_value.call($this))
          .attr("aria-valuemax", $this.data("range_max"));
      }

      return $this;
    },
    /*
     * Return the width in pixels of the slider bar, i.e., the maximum
     * number of pixels the user can slide the slider over. This function
     * should always be used internally to obtain the width of the
     * slider in pixels!
     */
    getSliderWidthPx: function () {
      var $this = this;

      //
      // .width() can actually return a floating point number! see
      // jquery docs!
      //
      return Math.round($this.width());
    },
    /*
     * Return the position of a given grip in pixel in integer format.
     * Use this method internally if you are literally going to get the
     * left CSS property from the provided grip.
     *
     * This method assumes a certain grip exists and will have the left
     * property.
     *
     * This is generally safe for the left grip, because it is basically
     * guaranteed to exist. But for the right grip you should be really
     * using getRightGripPositionPx instead.
     *
     */
    getGripPositionPx: function ($grip) {
      return parseInt($grip.css("left").replace("px", ""), 10);
    },
    /*
     * Just the same as getGripPositionPx, but there is no need to provide
     * the $slider.
     */
    getLeftGripPositionPx: function () {
      var $this = this,
        settings = $this.data("settings"),
        $leftGrip = $this.find(settings.left_grip_selector);

      return _methods.getGripPositionPx.call($this, $leftGrip);
    },
    /*
     * Return the position of the right Grip if it exists or return the
     * current position if not. Even if the right grip doesn't exist, its
     * position should be defined, as it determines the position of the
     * bar.
     */
    getRightGripPositionPx: function () {
      var $this = this,
        settings = $this.data("settings");

      if ($this.data("has_right_grip")) {
        return _methods.getGripPositionPx.call(
          $this,
          $this.find(settings.right_grip_selector)
        );
      }

      // default
      var sliderWidthPx =
        _methods.getSliderWidthPx.call($this) - $this.data("left_grip_width");
      return _methods.rangemap_0_to_n.call(
        $this,
        $this.data("cur_max"),
        sliderWidthPx
      );
    },
    /*
     * Return the width of the left grip.  Like getSliderWidthPx, this
     * method deals with .width() returning a floating point number. All
     * the code in this plugin assumes an integer here!
     */
    getLeftGripWidth: function () {
      var $this = this,
        settings = $this.data("settings"),
        $leftGrip = $this.find(settings.left_grip_selector);

      return Math.round($leftGrip.outerWidth());
    },
    /*
     * Return the width of the right grip. The calling method should
     * check that the right grip actually exists. This method assumes it
     * does.
     */
    getRightGripWidth: function () {
      var $this = this,
        settings = $this.data("settings"),
        $rightGrip = $this.find(settings.right_grip_selector);

      return Math.round($rightGrip.outerWidth());
    },
    binarySearchValueToPxCompareFunc: function (s, a, i) {
      // Must return:
      //
      // s: element to search for
      // a: array we are looking in
      // i: position of the element we are looking for
      //
      // -1 (s < a[i])
      // 0  found (= a[i])
      // 1  (s > a[i])
      if (s === a[i]) {
        return 0;
      } // element found exactly
      if (s < a[i] && i === 0) {
        return 0;
      } // left extreme case e.g., a = [ 3, ... ], s = 1
      if (a[i - 1] <= s && s < a[i]) {
        return 0;
      } // s is between two elements, always return the rightmost
      if (s > a[i]) {
        return 1;
      }
      if (s <= a[i - 1]) {
        return -1;
      }
      $.error(
        "cannot compare s: " + s + " with a[" + i + "]. a is: " + a.join(",")
      );
    },
    /*
     * Perform binary search to find searchElement into a generic array.
     * It uses a customized compareFunc to perform the comparison between
     * two elements of the array and a getElement function to pick the
     * element from the array (e.g., in case we want to pick a field of an
     * array of objects)
     */
    binarySearch: function (array, searchElement, getElementFunc, compareFunc) {
      var minIndex = 0;
      var maxIndex = array.length - 1;
      var currentIndex;
      var currentElement;

      while (minIndex <= maxIndex) {
        currentIndex = ((minIndex + maxIndex) / 2) | 0;
        currentElement = getElementFunc(array, currentIndex);

        // lt = -1 (searchElement < currentElement)
        // eq = 0
        // gt = 1  (searchElement > currentElement)
        var lt_eq_gt = compareFunc(searchElement, array, currentIndex);

        if (lt_eq_gt > 0) {
          minIndex = currentIndex + 1;
        } else if (lt_eq_gt < 0) {
          maxIndex = currentIndex - 1;
        } else {
          return currentIndex;
        }
      }

      return -1;
    },
    /*
     * Returns true if this slider has limit, false otherwise. There can be
     * an upper limit and a lower limit for the sliders.
     * The lower/upper limits are values that are out of the slider range,
     * but that can be selected by the user when he moves a slider all the
     * way down the minimum and up to the maximum value.
     */
    haveLimits: function () {
      var $this = this,
        lowerLimit = $this.data("lower-limit"),
        upperLimit = $this.data("upper-limit"),
        haveLimits = false;

      if (
        typeof lowerLimit !== "undefined" &&
        typeof upperLimit !== "undefined"
      ) {
        haveLimits = true;
      }

      return haveLimits;
    },
    /*
     * This method is called whenever the style of the grips needs to get
     * updated.
     */
    refresh_grips_style: function () {
      var $this = this,
        settings = $this.data("settings");

      // Skip refreshing grips style if no hihglight is specified in
      // construction
      if (typeof settings.highlight === "undefined") {
        return;
      }

      var highlightedRangeMin = $this.data("highlightedRangeMin");

      if (typeof highlightedRangeMin === "undefined") {
        return;
      }

      var $leftGrip = $this.find(settings.left_grip_selector),
        $rightGrip = $this.find(settings.right_grip_selector),
        highlightedRangeMax = $this.data("highlightedRangeMax"),
        curMin = $this.data("cur_min"),
        curMax = $this.data("cur_max"),
        highlightGripClass = settings.highlight.grip_class;

      // curmin is within the highlighted range
      if (curMin < highlightedRangeMin || curMin > highlightedRangeMax) {
        // de-highlight grip
        $leftGrip.removeClass(highlightGripClass);
      } else {
        // highlight grip
        $leftGrip.addClass(highlightGripClass);
      }

      // time to highlight right grip
      if (curMax < highlightedRangeMin || curMax > highlightedRangeMax) {
        // de-highlight grip
        $rightGrip.removeClass(highlightGripClass);
      } else {
        // highlight grip
        $rightGrip.addClass(highlightGripClass);
      }
    },
    /*
     *  Set left and right handle at the right position on the screen (pixels)
     *  given the desired position in currency.
     *
     *  e.g., _methods.set_position_from_val.call($this, 10000, 100000);
     *
     *        may set the left handle at 100px and the right handle at
     *        200px;
     *
     */
    set_position_from_val: function (cur_min, cur_max) {
      var $this = this;
      //
      // We need to understand how much pixels cur_min and cur_max
      // correspond.
      //
      var range_min = $this.data("range_min"),
        range_max = $this.data("range_max");

      //
      // (safety) constrain the cur_min or the cur_max value between the
      // max/min ranges allowed for this slider.
      //
      if (cur_min < range_min) {
        cur_min = range_min;
      }
      if (cur_min > range_max) {
        cur_min = range_max;
      }

      if ($this.data("has_right_grip")) {
        if (cur_max > range_max) {
          cur_max = range_max;
        }
        if (cur_max < range_min) {
          cur_max = range_min;
        }
      } else {
        cur_max = $this.data("cur_max");
      }

      var leftPx = methods.value_to_px.call($this, cur_min),
        rightPx = methods.value_to_px.call($this, cur_max);

      _methods.set_handles_at_px.call($this, leftPx, rightPx);

      // save this position
      $this.data("cur_min", cur_min);

      if ($this.data("has_right_grip")) {
        $this.data("cur_max", cur_max);
      }

      return $this;
    },
    /*
     * Set the position of the handles at the specified pixel points (taking
     * the whole slider width as a maximum point).
     */
    set_position_from_px: function (leftPx, rightPx) {
      var $this = this;

      //
      // we need to find a value from the given value in pixels
      //

      // now set the position as requested...
      _methods.set_handles_at_px.call($this, leftPx, rightPx);

      var valueLeftRight = _methods.getSliderValuesAtPositionPx.call(
          $this,
          leftPx,
          rightPx
        ),
        leftPxInValue = valueLeftRight[0],
        rightPxInValue = valueLeftRight[1];

      // ... and save the one we've found.
      $this.data("cur_min", leftPxInValue);

      if ($this.data("has_right_grip")) {
        $this.data("cur_max", rightPxInValue);
      }

      return $this;
    },
    /*
     * Updates the CSS of grips and bar so that the left grip appears at
     * leftPx and the right grip appears at rightPx. Note: leftPx can be >
     * rightPx.
     */
    set_handles_at_px: function (leftPx, rightPx) {
      var $this = this;
      var settings = $this.data("settings");

      var left_grip_selector = settings.left_grip_selector,
        right_grip_selector = settings.right_grip_selector,
        value_bar_selector = settings.value_bar_selector;

      var handleWidth = $this.data("left_grip_width");

      // The left grip
      $this.find(left_grip_selector).css("left", leftPx + "px");

      // The right grip
      $this.find(right_grip_selector).css("left", rightPx + "px");

      // The value bar
      if ($this.data("has_right_grip")) {
        // If both the grips are there, the value bar must stick to
        // beginning and the end of the grips.
        $this
          .find(value_bar_selector)
          .css("left", leftPx + "px")
          .css("width", rightPx - leftPx + handleWidth + "px");
      } else {
        if (!_naked_bar_deltas) {
          _methods.populateNakedBarDeltas.call(
            $this,
            leftPx,
            rightPx,
            handleWidth
          );
        }

        if (rightPx > leftPx) {
          // The naked end of the bar is on the right of the grip
          $this
            .find(value_bar_selector)
            .css("left", leftPx + "px")
            .css(
              "width",
              rightPx - leftPx + _naked_bar_deltas.toEndWidth + "px"
            );
        } else {
          // The naked end of the bar is on the left of the grip
          // NOTE: leftPx and rightPx are to be read swapped here.
          $this
            .find(value_bar_selector)
            .css("left", rightPx + _naked_bar_deltas.toBeginLeft + "px")
            .css(
              "width",
              leftPx - rightPx + _naked_bar_deltas.toBeginWidth + "px"
            );
        }
      }

      return $this;
    },
    drag_start_func_touch: function (
      e,
      settings,
      $left_grip,
      $right_grip,
      is_touch
    ) {
      var $this = this,
        original_event = e.originalEvent,
        touch = original_event.touches[0];

      // for touch devices we need to make sure we allow the user to scroll
      // if the click was too far from the slider.
      var curY = touch.pageY,
        curX = touch.pageX;

      // is the user allowed to grab if he/she tapped too far from the
      // slider?
      var ydelta = Math.abs($this.offset().top - curY),
        slider_left = $this.offset().left,
        xldelta = slider_left - curX,
        xrdelta = curX - (slider_left + $this.width());

      if (
        ydelta > settings.touch_tolerance_value_bar_y ||
        xldelta > settings.touch_tolerance_value_bar_x ||
        xrdelta > settings.touch_tolerance_value_bar_x
      ) {
        return;
      }

      original_event.preventDefault();
      _original_mousex = touch.pageX;

      // true : is touch event
      _methods.drag_start_func.call(
        $this,
        touch,
        settings,
        $left_grip,
        $right_grip,
        is_touch
      );
    },
    drag_start_func: function (e, settings, $leftGrip, $rightGrip, is_touch) {
      var $this = this;

      $this
        .find(
          settings.left_grip_selector +
            "," +
            settings.value_bar_selector +
            "," +
            settings.right_grip_selector
        )
        .removeClass(settings.animating_css_class);

      if (!methods.is_enabled.call($this)) {
        return;
      }

      //
      // if the user used the finger, he/she is allowed to touch anywhere.
      // but if the mouse is used, we want to enable the logic only for
      // left grip, right grip, bar/panel elements.
      //
      var $target = $(e.target);

      // ... if the highlight range was enabled we should check wether
      // the user has tapped or clicked the highlight panel...
      var targetIsPanelSelector = false;
      if (typeof settings.highlight === "object") {
        targetIsPanelSelector = $target.is(settings.highlight.panel_selector);
      }

      if (
        is_touch === false &&
        !$target.is(settings.left_grip_selector) &&
        !$target.is(settings.right_grip_selector) &&
        !$target.is(settings.value_bar_selector) &&
        !targetIsPanelSelector &&
        !$target.is($this)
      ) {
        return;
      }

      // - - - -
      // the following logic finds the nearest slider grip and starts
      // dragging it.
      // - - - -

      _$current_slider = $this;

      var leftGripPositionPx = _methods.getGripPositionPx.call(
          $this,
          $leftGrip
        ),
        sliderWidthPx =
          _methods.getSliderWidthPx.call($this) - $this.data("left_grip_width"),
        lleft = $leftGrip.offset().left,
        rleft, // don't compute this yet (maybe not needed if 1 grip)
        curX,
        ldist,
        rdist,
        ldelta,
        rdelta;

      var rightGripPositionPx = _methods.getRightGripPositionPx.call($this);

      //
      // We need to do as if the click happened a bit more on the left.
      // That's because we will be setting the left CSS property at the
      // point where the click happened, meaning the slider grip will be
      // spanning to the right.
      //
      curX = Math.round(e.pageX) - $this.data("left_grip_width") / 2;

      // calculate deltas from left and right grip
      ldist = Math.abs(lleft - curX);
      ldelta = curX - lleft;

      if ($this.data("has_right_grip")) {
        rleft = $rightGrip.offset().left;
        rdist = Math.abs(rleft - curX);
        rdelta = curX - rleft;
      } else {
        // no right grip... we make the right slider
        // unreachable!
        rdist = ldist * 2;
        rdelta = ldelta * 2;
      }

      // notify the beginning of a dragging...
      settings.user_drag_start_callback.call($this, e);

      if (ldist === rdist) {
        if (curX < lleft) {
          // move the left grip
          leftGripPositionPx += ldelta;
          _is_left_grip = true;
        } else {
          // move the right grip
          rightGripPositionPx += rdelta;
          _is_left_grip = false;
        }
      } else if (ldist < rdist) {
        // move the left grip
        leftGripPositionPx += ldelta;
        _is_left_grip = true;
      } else {
        // move the right grip
        rightGripPositionPx += rdelta;
        _is_left_grip = false;
      }

      //
      // Limit the right grip to the maximum allowed - as the user can
      // actually click beyond it!
      //
      // ...............
      //               ^-- maximum clickable
      //              ^--- maximum allowed (i.e., sliderWidth - gripWidth)
      //
      // if user clicks at sliderWidth, we will be setting CSS left of
      // right handle having:
      //
      // ...............R  <-- out of bound :-(
      //               ^-- maximum clickable
      //              ^--- maximum allowed (i.e., sliderWidth - gripWidth)
      //
      // but we want:
      //
      // ..............R <-- within bound :-)
      //               ^-- maximum clickable
      //              ^--- maximum allowed (i.e., sliderWidth - gripWidth)
      //
      // Hence we limit.
      //

      if ($this.data("has_right_grip")) {
        // here we check the right handle only, because it should
        // always be the one that gets moved if the user clicks towards
        // the right extremity!
        if (rightGripPositionPx > sliderWidthPx) {
          rightGripPositionPx = sliderWidthPx;
        }
      } else {
        // in case we have one handle only, we will be moving the left
        // handle instead of the right one... hence we need to perform
        // this check on the left handle as well!
        if (leftGripPositionPx > sliderWidthPx) {
          leftGripPositionPx = sliderWidthPx;
        }
      }

      // this can happen because the user can click on the left handle!
      // (which is out of the left boundary)
      if (leftGripPositionPx < 0) {
        leftGripPositionPx = 0;
      }

      _is_mousedown = true;

      var prev_min = $this.data("cur_min"),
        prev_max = $this.data("cur_max");

      _methods.set_position_from_px.call(
        $this,
        leftGripPositionPx,
        rightGripPositionPx
      );

      // set the style of the grips according to the highlighted range
      _methods.refresh_grips_style.call($this);

      _methods.notify_changed_implicit.call(
        $this,
        "drag_start",
        prev_min,
        prev_max
      );

      // no need to call preventDefault on touch events, as we called
      // preventDefault on the original event already
      if (Object.prototype.toString.apply(e) !== "[object Touch]") {
        e.preventDefault();
      }
    },
    drag_move_func_touch: function (e) {
      if (_is_mousedown === true) {
        var original_event = e.originalEvent;
        original_event.preventDefault();
        var touch = original_event.touches[0];
        _methods.drag_move_func(touch);
      }
    },
    drag_move_func: function (e) {
      if (_is_mousedown) {
        // our slider element.
        var $this = _$current_slider,
          settings = $this.data("settings"),
          sliderWidthPx =
            _methods.getSliderWidthPx.call($this) -
            $this.data("left_grip_width"),
          leftGripPositionPx = _methods.getLeftGripPositionPx.call($this);

        var rightGripPositionPx = _methods.getRightGripPositionPx.call($this);

        //
        // Here we are going to set the position in pixels based on
        // where the user has moved the mouse cursor. We obtain the
        // position of the mouse cursors via e.pageX, which returns the
        // absolute position of the mouse on the screen.
        //
        var absoluteMousePosition = Math.round(e.pageX);

        //
        // Compute the delta (in px) for the slider movement. It is the
        // difference between the new position of the cursor and the
        // old position of the cursor.
        //
        // Based on the delta we decide how to move the dragged handle.
        //
        // 0 : no movement
        // -delta: move left
        // +delta: move right
        //
        var delta = absoluteMousePosition - _original_mousex;

        //
        // User cannot drag the handles outside the slider bar area.
        //

        // 1) calculate the area within which the movement is
        //    considered to be valid.
        var half_a_grip_width = $this.data("left_grip_width") / 2,
          drag_area_start =
            $this.offset().left +
            $this.data("left_grip_width") -
            half_a_grip_width,
          drag_area_end = drag_area_start + sliderWidthPx;

        if (
          settings.crossable_handles === false &&
          $this.data("has_right_grip")
        ) {
          // if handles are not crossable, we should define the left
          // and the right boundary of the movement.
          if (_is_left_grip) {
            drag_area_end = drag_area_start + rightGripPositionPx;
          } else {
            drag_area_start = drag_area_start + leftGripPositionPx;
          }
        }

        // 2) by default we accept to move the slider according to both
        // the deltas (i.e., left or right)
        var ignore_positive_delta = 0,
          ignore_negative_delta = 0;

        // 3) but if the user is moving the mouse beyond the draggable
        // area, we should only accept a movement in one direction.
        if (absoluteMousePosition < drag_area_start) {
          ignore_positive_delta = 1;
          ignore_negative_delta = 0;
        }
        if (absoluteMousePosition > drag_area_end) {
          ignore_negative_delta = 1;
          ignore_positive_delta = 0;
        }

        //
        // Here we decide whether to invert the grip being moved.
        //
        if (
          settings.crossable_handles === true &&
          $this.data("has_right_grip")
        ) {
          if (_is_left_grip) {
            // ... if we are using the left grip
            if (rightGripPositionPx <= sliderWidthPx) {
              // the inversion logic should only be active when the
              // slider is not at the extremity
              if (leftGripPositionPx + delta > rightGripPositionPx) {
                _is_left_grip = false;

                // TWEAK: keep the position of the left handle fixed
                // at the one of the right handle as the user may
                // have moved the mouse too fast, thus giving
                // leftGripPositionPx > rightGripPositionPx.
                //
                // Basically here we avoid:
                //
                // Initial State:
                //
                // ------L-R------  (leftGripPositionPx < rightGripPositionPx)
                //
                // Fast Mouse Move:
                //
                // --------R--L---  (leftGripPositionPx + delta)
                // --------R-L----  (leftGripPositionPx [ still > rightGripPositionPx! ])
                //
                // _is_left_grip becomes false (this code)
                //
                leftGripPositionPx = rightGripPositionPx;
              }
            }
          } else {
            // ... converse logic
            if (leftGripPositionPx >= 0) {
              if (rightGripPositionPx + delta < leftGripPositionPx) {
                // current_max = current_min;
                _is_left_grip = true;

                rightGripPositionPx = leftGripPositionPx;
              }
            }
          }
        }

        //
        // Decide the position of the new handles.
        //
        var nextLeftGripPositionPx = leftGripPositionPx,
          nextRightGripPositionPx = rightGripPositionPx;

        if (
          (delta > 0 && !ignore_positive_delta) ||
          (delta < 0 && !ignore_negative_delta)
        ) {
          if (_is_left_grip) {
            nextLeftGripPositionPx += delta;
          } else {
            nextRightGripPositionPx += delta;
          }
        }

        _methods.validateAndMoveGripsToPx.call(
          $this,
          nextLeftGripPositionPx,
          nextRightGripPositionPx
        );

        // prepare for next movement
        _original_mousex = absoluteMousePosition;

        // no need to call preventDefault on touch events, as we called
        // preventDefault on the original event already
        if (Object.prototype.toString.apply(e) !== "[object Touch]") {
          e.preventDefault();
        }
      }
    },
    drag_end_func_touch: function (e) {
      var original_event = e.originalEvent;
      original_event.preventDefault();
      var touch = original_event.touches[0];
      _methods.drag_end_func(touch);
    },
    drag_end_func: function (/* e */) {
      var $this = _$current_slider;
      if (typeof $this !== "undefined") {
        _is_mousedown = false;
        _original_mousex = undefined;

        _methods.notify_mouse_up_implicit.call($this, _is_left_grip);

        // require another click on a handler before going into here again!
        _$current_slider = undefined;

        // put back the class once user finished dragging
        var settings = $this.data("settings");
        $this
          .find(
            settings.left_grip_selector +
              "," +
              settings.value_bar_selector +
              "," +
              settings.right_grip_selector
          )
          .addClass(settings.animating_css_class);
      }
    },
    get_rounding_for_value: function (v) {
      var $this = this;
      var rounding = $this.data("rounding");
      var rounding_ranges = $this.data("rounding_ranges");

      if (typeof rounding_ranges === "object") {
        // then it means the rounding is not fixed, we should find the
        // value in the roundings_array.
        var roundingIdx = _methods.binarySearch.call(
          $this,
          rounding_ranges,
          v,
          // pick an element from the array
          function (array, index) {
            return array[index].range;
          },

          // compare search element with current element
          // < 0 search < current
          // 0   equals
          // > 0 search > current
          function (search, array, currentIdx) {
            // first check if this is our element

            // this is our element if the search value is:
            if (search < array[currentIdx].range) {
              // we can have a match or search in the left half
              if (currentIdx > 0) {
                if (search >= array[currentIdx - 1].range) {
                  return 0;
                } else {
                  // go left
                  return -1;
                }
              } else {
                return 0;
              }
            } else {
              // we must search in the next half
              return 1;
            }
          }
        );

        rounding = 1;
        if (roundingIdx > -1) {
          rounding = parseInt(rounding_ranges[roundingIdx].value, 10);
        } else {
          var lastIdx = rounding_ranges.length - 1;
          if (v >= rounding_ranges[lastIdx].range) {
            rounding = rounding_ranges[lastIdx].value;
          }
        }
      }
      return rounding;
    },
    /*
     * Calls the user mouseup callback with the right parameters. Relies on
     * $data('beforestart_min/max') in addition to the isLeftGrip parameter.
     *
     * NOTE: saves the new beforestart_min and begforestart_max as well.
     */
    notify_mouse_up_implicit: function (isLeftGrip) {
      var $this = this,
        current_min_value = methods.get_current_min_value.call($this),
        current_max_value = methods.get_current_max_value.call($this),
        didValuesChange = false;

      // check if we changed.
      if (
        $this.data("beforestart_min") !== current_min_value ||
        $this.data("beforestart_max") !== current_max_value
      ) {
        // values have changed!
        didValuesChange = true;

        // save the new values
        $this.data("beforestart_min", current_min_value);
        $this.data("beforestart_max", current_max_value);
      }

      var settings = $this.data("settings");

      settings.user_mouseup_callback.call(
        $this,
        methods.get_current_min_value.call($this),
        methods.get_current_max_value.call($this),
        isLeftGrip,
        didValuesChange
      );

      return $this;
    },
    /*
     * NOTE: this method may take the previous min/max value as input.
     *       if no arguments are provided the method blindly notifies.
     */
    notify_changed_implicit: function (cause, prevMin, prevMax) {
      var $this = this;

      var force = false;
      if (cause === "init" || cause === "refresh") {
        force = true;
      }

      var curMin = methods.get_current_min_value.call($this),
        curMax = methods.get_current_max_value.call($this);

      if (!force) {
        prevMin = methods.round_value_according_to_rounding.call(
          $this,
          prevMin
        );
        prevMax = methods.round_value_according_to_rounding.call(
          $this,
          prevMax
        );
      }

      if (force || curMin !== prevMin || curMax !== prevMax) {
        _methods.notify_changed_explicit.call(
          $this,
          cause,
          prevMin,
          prevMax,
          curMin,
          curMax
        );

        force = 1;
      }

      return force;
    },
    notify_changed_explicit: function (
      cause,
      prevMin,
      prevMax,
      curMin,
      curMax
    ) {
      var $this = this,
        settings = $this.data("settings");

      // maybe update aria attributes for accessibility
      if ($this.data("aria_enabled")) {
        _methods.updateAriaAttributes.call($this);
      }

      settings.value_changed_callback.call(
        $this,
        cause,
        curMin,
        curMax,
        prevMin,
        prevMax
      );

      return $this;
    },
    validate_params: function (settings) {
      var $this = this;
      var min_value = $this.data("range_min"),
        max_value = $this.data("range_max"),
        cur_min = $this.data("cur_min"),
        lower_limit = $this.data("lower-limit"),
        upper_limit = $this.data("upper-limit");

      var have_limits = _methods.haveLimits.call($this);

      if (typeof min_value === "undefined") {
        $.error("the data-range_min attribute was not defined");
      }
      if (typeof max_value === "undefined") {
        $.error("the data-range_max attribute was not defined");
      }
      if (typeof cur_min === "undefined") {
        $.error("the data-cur_min attribute must be defined");
      }
      if (min_value > max_value) {
        $.error("Invalid input parameter. must be min < max");
      }

      if (have_limits && lower_limit > upper_limit) {
        $.error("Invalid data-lower-limit or data-upper-limit");
      }
      if ($this.find(settings.left_grip_selector).length === 0) {
        $.error(
          "Cannot find element pointed by left_grip_selector: " +
            settings.left_grip_selector
        );
      }
      /*
       * NOTE: only validate right grip selector if it is not
       * undefined otherwise just assume that if it isn't
       * found isn't there. This is because we initialize the
       * slider at once and let the markup decide if the
       * slider is there or not.
       */
      if (typeof settings.right_grip_selector !== "undefined") {
        if ($this.find(settings.right_grip_selector).length === 0) {
          $.error(
            "Cannot find element pointed by right_grip_selector: " +
              settings.right_grip_selector
          );
        }
      }

      // same thing for the value bar selector
      if (typeof settings.value_bar_selector !== "undefined") {
        if ($this.find(settings.value_bar_selector).length === 0) {
          $.error(
            "Cannot find element pointed by value_bar_selector" +
              settings.value_bar_selector
          );
        }
      }
    },
    /*
     * Maps a value between [minRange -- maxRange] into [0 -- n].
     * The target range will be an integer number.
     */
    rangemap_0_to_n: function (val, n) {
      var $this = this;
      var rangeMin = $this.data("range_min");
      var rangeMax = $this.data("range_max");

      if (val <= rangeMin) {
        return 0;
      }
      if (val >= rangeMax) {
        return n;
      }

      return Math.floor((n * val - n * rangeMin) / (rangeMax - rangeMin));
    },
    /*
     * Maps a value between [0 -- max] back into [minRange -- maxRange].
     * The target range can be a floating point number.
     */
    inverse_rangemap_0_to_n: function (val, max) {
      var $this = this;
      var rangeMin = $this.data("range_min");
      var rangeMax = $this.data("range_max");

      if (val <= 0) {
        return rangeMin;
      }
      if (val >= max) {
        return rangeMax;
      }

      //
      // To do this we first map 0 -- max relatively withing [minRange
      // and maxRange], that is between [0 and (maxRange-minRange)].
      //
      var relativeMapping = ((rangeMax - rangeMin) * val) / max;

      // ... then we bring this to the actual value by adding rangeMin.
      return relativeMapping + rangeMin;
    },
  };
  var methods = {
    _m: function (m) {
      return _methods[m];
    }, // for test, removed by Grunt
    teardown: function () {
      var $this = this;

      // remove all data set with .data()
      $this.removeData();

      // unbind the document as well
      $(document).unbind("mousemove.nstSlider").unbind("mouseup.nstSlider");

      // unbind events bound to the container element
      $this
        .parent()
        .unbind("mousedown.nstSlider")
        .unbind("touchstart.nstSlider")
        .unbind("touchmove.nstSlider")
        .unbind("touchend.nstSlider");

      // unbind events bound to the current element
      $this.unbind("keydown.nstSlider").unbind("keyup.nstSlider");

      return $this;
    },
    init: function (options) {
      var settings = $.extend(
        {
          animating_css_class: "nst-animating",
          // this is the distance from the value bar by which we should
          // grab the left or the right handler.
          touch_tolerance_value_bar_y: 30, // px
          touch_tolerance_value_bar_x: 15, // px
          // where is the left grip?
          left_grip_selector: ".nst-slider-grip-left",
          // where is the right grip?
          // undefined = (only left grip bar)
          right_grip_selector: undefined,

          // Specify highlight like this if you want to highlight a range
          // in the slider.
          //
          // 'highlight' : {
          //     'grip_class' : '.nsti-slider-hi',
          //     'panel_selector' : '.nst-slider-highlight-panel'
          // },
          highlight: undefined,

          // Lets you specify the increment rounding for the slider handles
          // for when the user moves them.
          // It can be a string, indicating a fixed increment, or an object
          // indicating the increment based on the value to be rounded.
          //
          // This can be specified in the following form: {
          //    '1' : '100',
          //    '10' : '1000',  /* rounding = 10 for values in [100-999] */
          //    '50' : '10000',
          // }
          rounding: undefined,

          // if the bar is not wanted
          value_bar_selector: undefined,

          // Allow handles to cross each other while one of them is being
          // dragged. This option is ignored if just one handle is used.
          crossable_handles: true,

          value_changed_callback: function (/*cause, vmin, vmax*/) {
            return;
          },
          user_mouseup_callback: function (/*vmin, vmax, left_grip_moved*/) {
            return;
          },
          user_drag_start_callback: function () {
            return;
          },
        },
        options
      );

      //
      // we need to unbind events attached to the document,
      // as if we replace html elements and re-initialize, we
      // don't want to double-bind events!
      //
      var $document = $(document);

      // make sure only one event is bound to the document
      $document.unbind("mouseup.nstSlider");
      $document.unbind("mousemove.nstSlider");

      $document.bind("mousemove.nstSlider", _methods.drag_move_func);
      $document.bind("mouseup.nstSlider", _methods.drag_end_func);

      return this.each(function () {
        //
        // $this is like:
        //
        // <div class="outer-slider" data-... data-...>
        //     <div class="bar"></div>
        //     <div class="leftGrip"></div>
        //     <div class="rightGrip"></div>
        // </div>
        //
        // It is supposed to be enclosed in a container
        //
        var $this = $(this),
          $container = $this.parent();

        // enable: the user is able to move the grips of this slider.
        $this.data("enabled", true);

        // fix some values first
        var rangeMin = $this.data("range_min"),
          rangeMax = $this.data("range_max"),
          valueMin = $this.data("cur_min"),
          valueMax = $this.data("cur_max");

        // assume 0 if valueMax is not specified
        if (typeof valueMax === "undefined") {
          valueMax = valueMin;
        }

        if (rangeMin === "") {
          rangeMin = 0;
        }
        if (rangeMax === "") {
          rangeMax = 0;
        }
        if (valueMin === "") {
          valueMin = 0;
        }
        if (valueMax === "") {
          valueMax = 0;
        }

        $this.data("range_min", rangeMin);
        $this.data("range_max", rangeMax);
        $this.data("cur_min", valueMin);
        $this.data("cur_max", valueMax);

        // halt on error
        _methods.validate_params.call($this, settings);

        $this.data("settings", settings);

        // override rounding from markup if defined in configuration
        if (typeof settings.rounding !== "undefined") {
          methods.set_rounding.call($this, settings.rounding);
        } else if (typeof $this.data("rounding") !== "undefined") {
          methods.set_rounding.call($this, $this.data("rounding"));
        } else {
          methods.set_rounding.call($this, 1);
        }

        var left_grip = $this.find(settings.left_grip_selector)[0],
          $left_grip = $(left_grip),
          $right_grip = $($this.find(settings.right_grip_selector)[0]);

        // make sure left grip can be tabbed if the user hasn't
        // defined their own tab index
        if (typeof $left_grip.attr("tabindex") === "undefined") {
          $left_grip.attr("tabindex", 0);
        }

        // no right handler means single handler
        var has_right_grip = false;
        if ($this.find(settings.right_grip_selector).length > 0) {
          has_right_grip = true;

          // make sure right grip can be tabbed if the user hasn't
          // defined their own tab index
          if (typeof $right_grip.attr("tabindex") === "undefined") {
            $right_grip.attr("tabindex", 0);
          }
        }
        $this.data("has_right_grip", has_right_grip);

        // enable aria attributes update?
        if ($this.data("aria_enabled") === true) {
          // setup aria role attributes on each grip
          $left_grip.attr("role", "slider").attr("aria-disabled", "false");

          if (has_right_grip) {
            $right_grip.attr("role", "slider").attr("aria-disabled", "false");
          }
        }

        //
        // deal with keypresses here
        //
        $this.bind("keyup.nstSlider", function (e) {
          if ($this.data("enabled")) {
            switch (e.which) {
              case 37: // left
              case 38: // up
              case 39: // right
              case 40: // down
                if (_before_keydown_value === _before_keyup_value) {
                  // we should search for the next value change...
                  // ... in which direction? depends on whe

                  var searchUntil = _methods.getSliderWidthPx.call($this),
                    val,
                    i,
                    setAtPixel;

                  if (_before_keydown_pixel - _before_keyup_pixel < 0) {
                    // the grip was moved towards the right

                    for (i = _before_keyup_pixel; i <= searchUntil; i++) {
                      // if the value at pixel i is different than
                      // the current value then we are good to go.
                      //
                      val = methods.round_value_according_to_rounding.call(
                        $this,
                        _methods.getSliderValuesAtPositionPx.call(
                          $this,
                          i,
                          i
                        )[1]
                      );
                      if (val !== _before_keyup_value) {
                        setAtPixel = i;
                        break;
                      }
                    }
                  } else {
                    // the grip was moved towards the left

                    for (i = _before_keyup_pixel; i >= 0; i--) {
                      // if the value at pixel i is different than
                      // the current value then we are good to go.
                      //
                      val = methods.round_value_according_to_rounding.call(
                        $this,
                        _methods.getSliderValuesAtPositionPx.call(
                          $this,
                          i,
                          i
                        )[1]
                      );
                      if (val !== _before_keyup_value) {
                        setAtPixel = i;
                        break;
                      }
                    }
                  }

                  // we need to set the slider at this position
                  if (_is_left_grip) {
                    _methods.validateAndMoveGripsToPx.call(
                      $this,
                      setAtPixel,
                      _methods.getRightGripPositionPx.call($this)
                    );
                  } else {
                    _methods.validateAndMoveGripsToPx.call(
                      $this,
                      _methods.getLeftGripPositionPx.call($this),
                      setAtPixel
                    );
                  }

                  //
                  // call the mouseup callback when the key is up!
                  //
                  _methods.notify_mouse_up_implicit.call($this, _is_left_grip);
                }
            }

            // clear values
            _before_keydown_value = undefined;
            _before_keydown_pixel = undefined;
            _before_keyup_value = undefined;
            _before_keyup_pixel = undefined;
          }
        });
        $this.bind("keydown.nstSlider", function (evt) {
          if ($this.data("enabled")) {
            var moveHandleBasedOnKeysFunc = function ($grip, e) {
              var nextLeft = _methods.getLeftGripPositionPx.call($this),
                nextRight = _methods.getRightGripPositionPx.call($this);

              if (typeof _before_keydown_value === "undefined") {
                _before_keydown_pixel = _is_left_grip ? nextLeft : nextRight;

                _before_keydown_value = _is_left_grip
                  ? methods.get_current_min_value.call($this)
                  : methods.get_current_max_value.call($this);
              }

              switch (e.which) {
                case 37: // left
                case 40: // down
                  if (_is_left_grip) {
                    nextLeft--;
                  } else {
                    nextRight--;
                  }
                  e.preventDefault();
                  break;

                case 38: // up
                case 39: // right
                  if (_is_left_grip) {
                    nextLeft++;
                  } else {
                    nextRight++;
                  }

                  e.preventDefault();
                  break;
              }

              _before_keyup_pixel = _is_left_grip ? nextLeft : nextRight;

              // may write into cur_min, cur_max data...
              _methods.validateAndMoveGripsToPx.call(
                $this,
                nextLeft,
                nextRight
              );

              _before_keyup_value = _is_left_grip
                ? methods.get_current_min_value.call($this)
                : methods.get_current_max_value.call($this);
            };

            // default
            if (has_right_grip && $this.find(":focus").is($right_grip)) {
              _is_left_grip = false;
              moveHandleBasedOnKeysFunc.call($this, $right_grip, evt);
            } else {
              _is_left_grip = true;
              moveHandleBasedOnKeysFunc.call($this, $left_grip, evt);
            }
          }
        });

        // determine size of grips
        var left_grip_width = _methods.getLeftGripWidth.call($this),
          right_grip_width = has_right_grip
            ? _methods.getRightGripWidth.call($this)
            : left_grip_width;

        $this.data("left_grip_width", left_grip_width);
        $this.data("right_grip_width", right_grip_width);

        $this.data("value_bar_selector", settings.value_bar_selector);

        // set behaviour of naked bar in case of one handle
        if (!has_right_grip) {
          var bStickToSides = valueMax === rangeMax || valueMax === rangeMin;
          _methods.setNakedBarDelta.call(
            $this,
            bStickToSides ? "stickToSides" : "middle",
            left_grip_width
          );
        }

        // this will set the range to the right extreme in such a case.
        if (rangeMin === rangeMax || valueMin === valueMax) {
          methods.set_range.call($this, rangeMin, rangeMax);
        } else {
          // set the initial position
          _methods.set_position_from_val.call(
            $this,
            $this.data("cur_min"),
            $this.data("cur_max")
          );
        }

        _methods.notify_changed_implicit.call($this, "init");

        // handle mouse movement
        $this.data(
          "beforestart_min",
          methods.get_current_min_value.call($this)
        );
        $this.data(
          "beforestart_max",
          methods.get_current_max_value.call($this)
        );

        // pass a closure, so that 'this' will be the current slider bar,
        // not the container.
        $this.bind("mousedown.nstSlider", function (e) {
          _methods.drag_start_func.call(
            $this,
            e,
            settings,
            $left_grip,
            $right_grip,
            false
          );
        });

        $container.bind("touchstart.nstSlider", function (e) {
          _methods.drag_start_func_touch.call(
            $this,
            e,
            settings,
            $left_grip,
            $right_grip,
            true
          );
        });
        $container.bind("touchend.nstSlider", function (e) {
          _methods.drag_end_func_touch.call($this, e);
        });
        $container.bind("touchmove.nstSlider", function (e) {
          _methods.drag_move_func_touch.call($this, e);
        });

        // if the data-histogram attribute exists, then use this
        // histogram to set the step distribution
        var step_histogram = $this.data("histogram");
        if (typeof step_histogram !== "undefined") {
          methods.set_step_histogram.call($this, step_histogram);
        }
      }); // -- each slider
    },
    get_range_min: function () {
      var $this = this;
      return $this.data("range_min");
    },
    get_range_max: function () {
      var $this = this;
      return $this.data("range_max");
    },
    get_current_min_value: function () {
      var $this = $(this);

      var rangeMin = methods.get_range_min.call($this),
        rangeMax = methods.get_range_max.call($this);

      var currentMin = $this.data("cur_min");

      var min;
      if (rangeMin >= currentMin) {
        min = rangeMin;
      } else {
        min = methods.round_value_according_to_rounding.call($this, currentMin);
      }

      if (_methods.haveLimits.call($this)) {
        if (min <= rangeMin) {
          return $this.data("lower-limit");
        } else if (min >= rangeMax) {
          return $this.data("upper-limit");
        }
      } else {
        if (min <= rangeMin) {
          return rangeMin;
        } else if (min >= rangeMax) {
          return rangeMax;
        }
      }

      return min;
    },
    get_current_max_value: function () {
      var $this = $(this);

      var rangeMin = methods.get_range_min.call($this),
        rangeMax = methods.get_range_max.call($this);

      var currentMax = $this.data("cur_max");

      var max;
      if (rangeMax <= currentMax) {
        max = rangeMax;
      } else {
        max = methods.round_value_according_to_rounding.call($this, currentMax);
      }

      if (_methods.haveLimits.call($this)) {
        if (max >= rangeMax) {
          return $this.data("upper-limit");
        } else if (max <= rangeMin) {
          return $this.data("lower-limit");
        }
      } else {
        if (max >= rangeMax) {
          return rangeMax;
        } else if (max <= rangeMin) {
          return rangeMin;
        }
      }

      return max;
    },
    is_handle_to_left_extreme: function () {
      var $this = this;
      if (_methods.haveLimits.call($this)) {
        return (
          $this.data("lower-limit") ===
          methods.get_current_min_value.call($this)
        );
      } else {
        return (
          methods.get_range_min.call($this) ===
          methods.get_current_min_value.call($this)
        );
      }
    },
    is_handle_to_right_extreme: function () {
      var $this = this;
      if (_methods.haveLimits.call($this)) {
        return (
          $this.data("upper-limit") ===
          methods.get_current_max_value.call($this)
        );
      } else {
        return (
          methods.get_range_max.call($this) ===
          methods.get_current_max_value.call($this)
        );
      }
    },
    // just call set_position on the current values
    refresh: function () {
      var $this = this;

      // re-set the slider step if specified
      var lastStepHistogram = $this.data("last_step_histogram");
      if (typeof lastStepHistogram !== "undefined") {
        methods.set_step_histogram.call($this, lastStepHistogram);
      }

      // re-center given values
      _methods.set_position_from_val.call(
        $this,
        methods.get_current_min_value.call($this),
        methods.get_current_max_value.call($this)
      );

      // re-highlight the range
      var highlightRangeMin = $this.data("highlightedRangeMin");
      if (typeof highlightRangeMin === "number") {
        // a highlight range is present, we must update it
        var highlightRangeMax = $this.data("highlightedRangeMax");
        methods.highlight_range.call(
          $this,
          highlightRangeMin,
          highlightRangeMax
        );
      }

      _methods.notify_changed_implicit.call($this, "refresh");
      return $this;
    },
    disable: function () {
      var $this = this,
        settings = $this.data("settings");

      $this
        .data("enabled", false)
        .find(settings.left_grip_selector)
        .attr("aria-disabled", "true")
        .end()
        .find(settings.right_grip_selector)
        .attr("aria-disabled", "true");

      return $this;
    },
    enable: function () {
      var $this = this,
        settings = $this.data("settings");

      $this
        .data("enabled", true)
        .find(settings.left_grip_selector)
        .attr("aria-disabled", "false")
        .end()
        .find(settings.right_grip_selector)
        .attr("aria-disabled", "false");

      return $this;
    },
    is_enabled: function () {
      var $this = this;
      return $this.data("enabled");
    },
    /*
     * This one is the public method, called externally.
     * It sets the position and notifies in fact.
     */
    set_position: function (min, max) {
      var $this = this;

      var prev_min = $this.data("cur_min"),
        prev_max = $this.data("cur_max");

      if (min > max) {
        _methods.set_position_from_val.call($this, max, min);
      } else {
        _methods.set_position_from_val.call($this, min, max);
      }

      // set the style of the grips according to the highlighted range
      _methods.refresh_grips_style.call($this);

      _methods.notify_changed_implicit.call(
        $this,
        "set_position",
        prev_min,
        prev_max
      );

      // this is for the future, therefore "before the next
      // interaction starts"
      $this.data("beforestart_min", min);
      $this.data("beforestart_max", max);
    },
    /*
     * This tells the slider to increment its step non linearly over the
     * current range, based on the histogram on where results are.
     *
     * the input parameter 'histogram' identifies an empirical probability
     * density function (PDF).
     *
     */
    set_step_histogram: function (histogram) {
      var $this = this;

      $this.data("last_step_histogram", histogram);

      if (typeof histogram === "undefined") {
        $.error("got an undefined histogram in set_step_histogram");
        _methods.unset_step_histogram.call($this);
      }

      var sliderWidthPx =
          _methods.getSliderWidthPx.call($this) - $this.data("left_grip_width"),
        nbuckets = histogram.length;

      if (sliderWidthPx <= 0) {
        // that means the slider is not visible...
        return;
      }

      //
      // we need to transform this pdf into a cdf, and use it to obtain
      // two mappings: pixel to value and value to pixel.
      //
      // 1) normalize the pdf to sum to sliderWidthPx first
      var i;
      var histogram_sum = 0;
      for (i = 0; i < nbuckets; i++) {
        histogram_sum += histogram[i];
      }

      //
      // if the sum of the histogram is 0 it means that all is 0 in the
      // histogram! (i.e, flat histogram). In this case we already know
      // what's going to be the answer...
      //
      if (histogram_sum === 0) {
        // ... and the answer is: a linear scale between min_range and
        // max range!
        methods.unset_step_histogram.call($this);

        return $this;
      }

      // coefficient for normalization
      var coeff = parseFloat(histogram_sum) / sliderWidthPx;

      // go normalize the histogram using this coefficient!
      for (i = 0; i < nbuckets; i++) {
        histogram[i] = histogram[i] / coeff;
      }

      // 2) now that the histogram is normalized, extract the cumulative
      // distribution function (CDF). This is an always increasing function
      // that ranges between 0 and sliderWidthPx;
      //
      // We also build the inverted cdf, just the cdf read the other way
      // around.
      //
      var cdf = [histogram[0]]; // points to pixels
      for (i = 1; i < nbuckets; i++) {
        var cdf_x = cdf[i - 1] + histogram[i];
        cdf.push(cdf_x);
      }
      cdf.push(sliderWidthPx);

      // the first value here is always min_range as the cdf is supposed
      // to start from 0 (also first pixel = min_range)
      var pixel_to_value_lookup = [$this.data("range_min")];

      var last_filled = 0; // we've already filled 0

      // now stretch over the rest of the cdf
      var last_price_for_cdf_bucket = pixel_to_value_lookup[0];

      var cdf_bucket_count = 0;
      while (last_filled <= sliderWidthPx) {
        // do until all pixels are filled

        // get next item from cdf
        var fill_up_to_px = parseInt(cdf.shift(), 10);
        var price_for_cdf_bucket = _methods.inverse_rangemap_0_to_n.call(
          $this,
          cdf_bucket_count + 1,
          nbuckets + 1
        );

        cdf_bucket_count++;

        // how many pixels do we have to fill
        var fill_tot = fill_up_to_px - last_filled;

        // interpolate and fill
        var diff = price_for_cdf_bucket - last_price_for_cdf_bucket;
        for (i = last_filled; i < fill_up_to_px; i++) {
          var next_price_for_cdf_bucket =
            last_price_for_cdf_bucket +
            (diff * (i - last_filled + 1)) / fill_tot;

          pixel_to_value_lookup.push(next_price_for_cdf_bucket);

          last_filled++;

          last_price_for_cdf_bucket = next_price_for_cdf_bucket;
        }

        if (last_filled === sliderWidthPx) {
          break;
        }
      }
      pixel_to_value_lookup[pixel_to_value_lookup.length - 1] =
        $this.data("range_max");

      // 3) build lookup functions to extract pixels and values from the
      // cdf and the inverted cdf.
      //
      var pixel_to_value_mapping = function (pixel) {
        return pixel_to_value_lookup[parseInt(pixel, 10)];
      };

      var value_to_pixel_mapping = function (value) {
        //
        // Binary search into the array of pixels, returns always the
        // rightmost pixel if there is no exact match.
        //
        var suggestedPixel = _methods.binarySearch.call(
          $this,
          pixel_to_value_lookup,
          value,
          function (a, i) {
            return a[i];
          }, // access a value in the array
          _methods.binarySearchValueToPxCompareFunc
        );

        // exact match
        if (pixel_to_value_lookup[suggestedPixel] === value) {
          return suggestedPixel;
        }

        // approx match: we need to check if it's closer to the value
        // at suggestedPixel or the value at suggestedPixel-1
        if (
          Math.abs(pixel_to_value_lookup[suggestedPixel - 1] - value) <
          Math.abs(pixel_to_value_lookup[suggestedPixel] - value)
        ) {
          return suggestedPixel - 1;
        }
        return suggestedPixel;
      };

      //
      // these two functions will be stored and then used internally to
      // decide what value to display given a certain pixel, and what
      // pixel to put the slider on given a certain value.
      //
      $this.data("pixel_to_value_mapping", pixel_to_value_mapping);
      $this.data("value_to_pixel_mapping", value_to_pixel_mapping);

      return $this;
    },
    /*
     * Remove the pixel-to-value and the value-to-pixel mappings from the
     * slider so that the slider can follow a linear step over the current
     * range again.
     */
    unset_step_histogram: function () {
      var $this = this;

      $this.removeData("pixel_to_value_mapping");
      $this.removeData("value_to_pixel_mapping");
      $this.removeData("last_step_histogram");

      return $this;
    },
    set_range: function (rangeMin, rangeMax) {
      var $this = this;

      // get the current values
      var oldMin = methods.get_current_min_value.call($this),
        oldMax = methods.get_current_max_value.call($this);

      // set range
      $this.data("range_min", rangeMin);
      $this.data("range_max", rangeMax);

      // try to re-center old values in the new range.
      // NOTE: this may set different values!
      _methods.set_position_from_val.call($this, oldMin, oldMax);

      /*
       * Re-highlight ranges if any are defined.
       */
      // var highlightRangeMin = $this.data('highlightedRangeMin');
      // if (typeof rangeMin === 'number') {
      //     // a highlight range is present, we must update it
      //     var highlightRangeMax = $this.data('highlightedRangeMax');
      //     methods.highlight_range.call($this, highlightRangeMin, highlightRangeMax);
      // }

      // pass old min and max in the notify_changed_implicit method, so that we
      // notify if we need to
      _methods.notify_changed_implicit.call($this, "set_range", oldMin, oldMax);

      return $this;
    },
    /*
     * This method highlights the range of the slider apart from the
     * position of the slider grips.
     * To work well, the slider must have background color set to
     * transparent in the CSS or not set.
     */
    highlight_range: function (rangeMin, rangeMax) {
      var $this = this;
      var settings = $this.data("settings");

      if (typeof settings.highlight === "undefined") {
        $.error(
          'you cannot call highlight_range if you haven\' specified the "highlight" parameter in construction!'
        );
      }

      // avoid empty string
      if (!rangeMin) {
        rangeMin = 0;
      }
      if (!rangeMax) {
        rangeMax = 0;
      }

      // we need to map rangeMin and rangeMax into pixels.
      var leftPx = methods.value_to_px.call($this, rangeMin),
        rightPx = methods.value_to_px.call($this, rangeMax),
        barWidth = rightPx - leftPx + $this.data("left_grip_width");

      // set position
      var $highlightPanel = $this.find(settings.highlight.panel_selector);

      $highlightPanel.css("left", leftPx + "px");
      $highlightPanel.css("width", barWidth + "px");

      // keep the latest highlighted range, because if set_range is called
      // we must be able to update the highlighting.
      $this.data("highlightedRangeMin", rangeMin);
      $this.data("highlightedRangeMax", rangeMax);

      // now decide wether the handler should be highlight
      _methods.refresh_grips_style.call($this);

      return $this;
    },
    /*
     * Sets the increment rounding for the slider, see input parameters section
     * for more information.
     */
    set_rounding: function (rounding) {
      var $this = this;

      if (typeof rounding === "string" && rounding.indexOf("{") > -1) {
        // probably a json string
        rounding = $.parseJSON(rounding);
      }

      $this.data("rounding", rounding);

      // build an array of roundings and sort it by value to facilitate search
      // when the range is going to be set.
      var roundings_array = [];
      if (typeof rounding === "object") {
        // initial object has the form { value : range }
        var rounding_value;
        for (rounding_value in rounding) {
          // skip_javascript_test
          if (rounding.hasOwnProperty(rounding_value)) {
            var rounding_range = rounding[rounding_value];
            roundings_array.push({
              range: rounding_range,
              value: rounding_value,
            });
          }
        }

        // now sort it by rounding range
        roundings_array.sort(function (a, b) {
          return a.range - b.range;
        });

        $this.data("rounding_ranges", roundings_array);
      } else {
        $this.removeData("rounding_ranges");
      }

      return $this;
    },
    get_rounding: function () {
      var $this = this;
      return $this.data("rounding");
    },
    /*
     * This method rounds a given value to the closest integer defined
     * according to the rounding. Examples:
     * rounding: 10 v: 12.3    --> 10
     * rounding: 1 v: 12.3     --> 12
     * rounding: 10 v: 12.6    --> 13
     */
    round_value_according_to_rounding: function (v) {
      var $this = this;
      var rounding = _methods.get_rounding_for_value.call($this, v);

      if (rounding > 0) {
        // We bring ourselves in a space of unitary roundings. You can
        // imagine now that sliders range between a certain minimum and
        // maximum, and we always increase/decrease of one.
        var increment = v / rounding;

        // This is the proposed value.
        var increment_int = parseInt(increment, 10);

        // delta is a positive number between 0 and 1 that tells us how
        // close is the slider to integer + 1 (i.e., the next rounding).
        // 0 means the grip is exactly on integer
        // 1 means the grip is on integer + 1.
        var delta = increment - increment_int;

        // now use delta to modify or not the current value.
        if (delta > 0.5) {
          increment_int++;
        }

        // we now move the
        var rounded = increment_int * rounding;

        return rounded;
      } else {
        $.error("rounding must be > 0, got " + rounding + " instead");
      }
      return v;
    },
    /*
     * Utility function. Given a value within the range of the slider,
     * converts the value in pixels. If a value_to_pixel_mapping function
     * is defined it will be used, otherwise a linear mapping is used for
     * the conversion.
     */
    value_to_px: function (value) {
      var $this = this,
        value_to_pixel_mapping_func = $this.data("value_to_pixel_mapping");

      // try using non-linear mapping if it's there...
      if (typeof value_to_pixel_mapping_func !== "undefined") {
        return value_to_pixel_mapping_func(value);
      }

      // ... use linear mapping otherwise
      var w =
        _methods.getSliderWidthPx.call($this) - $this.data("left_grip_width");
      return _methods.rangemap_0_to_n.call($this, value, w);
    },
  };

  var __name__ = "nstSlider";

  $.fn[__name__] = function (method) {
    /*
     * Just a router for method calls
     */
    if (methods[method]) {
      if (this.data("initialized") === true) {
        // call a method
        return methods[method].apply(
          this,
          Array.prototype.slice.call(arguments, 1)
        );
      } else {
        throw new Error(
          "method " +
            method +
            " called on an uninitialized instance of " +
            __name__
        );
      }
    } else if (typeof method === "object" || !method) {
      // call init, user passed the settings as parameters
      this.data("initialized", true);
      return methods.init.apply(this, arguments);
    } else {
      $.error("Cannot call method " + method);
    }
  };
})(jQuery);

/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function (b, c, d, e) {
      var f = document.createElement("div");
      return (
        (f.className = "mfp-" + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function (c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace("%title%", b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function () {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function () {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ""),
        c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          "auto" === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x("bg").on("click" + p, function () {
            b.close();
          })),
          (b.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + p, function (a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x("container", b.wrap))),
        (b.contentContainer = x("content")),
        b.st.preloader &&
          (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
      }
      y("BeforeOpen"),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += " mfp-close-btn-in"))
            : b.wrap.append(z())),
        b.st.alignTop && (f += " mfp-align-top"),
        b.fixedContentPos
          ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY,
            })
          : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
        (b.st.fixedBgPos === !1 ||
          ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: "absolute" }),
        b.st.enableEscapeKey &&
          d.on("keyup" + p, function (a) {
            27 === a.keyCode && b.close();
          }),
        v.on("resize" + p, function () {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a("body, html").css("overflow", "hidden")
          : (n.overflow = "hidden"));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += " mfp-ie7"),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y("BuildControls"),
        a("html").css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on("focusin" + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function () {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function () {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + " "),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: "" };
        b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
          a("html").css(e);
      }
      d.off("keyup" + p + " focusin" + p),
        b.ev.off(p),
        b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        b.bgOverlay.attr("class", "mfp-bg"),
        b.container.attr("class", "mfp-container"),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f),
          f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y("AfterChange");
    },
    appendContent: function (a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find(".mfp-close").length || b.content.append(z())
            : (b.content = a)
          : (b.content = ""),
        y(k),
        b.container.addClass("mfp-" + c + "-holder"),
        b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr("data-mfp-src")),
          e.src || (e.src = e.el.attr("href"));
      }
      return (
        (e.type = d || b.st.type || "inline"),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y("ElementParse", e),
        b.items[c]
      );
    },
    addGroup: function (a, c) {
      var d = function (d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = "click.magnificPopup";
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (
        f ||
        !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
      ) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c),
          d || "loading" !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y("UpdateStatus", e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find("a").on("click", function (a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass("mfp-s-" + a),
          (c = a);
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass("mfp-close") ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function (c, d) {
          if (void 0 === d || d === !1) return !0;
          if (((e = c.split("_")), e.length > 1)) {
            var f = b.find(p + "-" + e[0]);
            if (f.length > 0) {
              var g = e[1];
              "replaceWith" === g
                ? f[0] !== d[0] && f.replaceWith(d)
                : "img" === g
                ? f.is("img")
                  ? f.attr("src", d)
                  : f.replaceWith(
                      a("<img>").attr("src", d).attr("class", f.attr("class"))
                    )
                : f.attr(e[1], d);
            }
          } else b.find(p + "-" + c).html(d);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        (a.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    },
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (a.fn.magnificPopup = function (c) {
      A();
      var d = a(this);
      if ("string" == typeof c)
        if ("open" === c) {
          var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = "inline",
    G = function () {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        b.types.push(F),
          w(h + "." + F, function () {
            G();
          });
      },
      getInline: function (c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
              (E = f.after(D).detach().removeClass(C))),
              b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      },
    },
  });
  var H,
    I = "ajax",
    J = function () {
      H && a(document.body).removeClass(H);
    },
    K = function () {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + "." + I, K),
          w("BeforeChange." + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend(
          {
            url: c.src,
            success: function (d, e, f) {
              var g = { data: d, xhr: f };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function () {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded");
            },
            error: function () {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  "error",
                  b.st.ajax.tError.replace("%url%", c.src)
                );
            },
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), "";
      },
    },
  });
  var L,
    M = function (c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"),
          w(m + d, function () {
            "image" === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off("resize" + p);
          }),
          w("Resize" + d, b.resizeImage),
          b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css("padding-top"), 10) +
              parseInt(a.img.css("padding-bottom"), 10)),
            a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y("ImageHasSize", a),
          a.imgHidden &&
            (b.content && b.content.removeClass("mfp-loading"),
            (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L),
              (L = setInterval(function () {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                      ? e(50)
                      : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c &&
              (c.img[0].complete
                ? (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus("ready")),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y("ImageLoadComplete"))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function () {
            c &&
              (c.img.off(".mfploader"),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus("error", h.tError.replace("%url%", c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          (j.className = "mfp-img"),
            c.el &&
              c.el.find("img").length &&
              (j.alt = c.el.find("img").attr("alt")),
            (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
            (j.src = c.src),
            i.is("img") && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass("mfp-loading"),
                  b.updateStatus("error", h.tError.replace("%url%", c.src)))
                : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
              d)
            : (b.updateStatus("loading"),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        );
      },
    },
  });
  var N,
    O = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var a,
          c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function (a) {
              var b = a
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function () {
              b.content.css("visibility", "visible");
            };
          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css("visibility", "hidden"),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function () {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function () {
                      k(),
                        setTimeout(function () {
                          f.remove(), (a = f = null), y("ZoomAnimationEnded");
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function () {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function () {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
        };
        return (
          O()
            ? (h["-moz-transform"] = h.transform =
                "translate(" + e.left + "px," + e.top + "px)")
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      },
    },
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        b.types.push(P),
          w("BeforeChange", function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + "." + P, function () {
            R();
          });
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  "string" == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace("%id%", e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus("ready"),
          d
        );
      },
    },
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = ".mfp-gallery";
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += " mfp-gallery"),
              w(m + e, function () {
                c.navigateByImgClick &&
                  b.wrap.on("click" + e, ".mfp-img", function () {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on("keydown" + e, function (a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w("UpdateStatus" + e, function (a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function (a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
              }),
              w("BuildControls" + e, function () {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(s));
                  e.click(function () {
                    b.prev();
                  }),
                    f.click(function () {
                      b.next();
                    }),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function () {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function () {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function () {
                d.off(e),
                  b.wrap.off("click" + e),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function () {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function (a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y("LazyLoad", d),
            "image" === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  d.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                })
                .attr("src", d.src)),
            (d.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w("ImageHasSize." + U, function (a, b) {
                b.img.css({
                  "max-width": b.img[0].naturalWidth / c,
                  width: "100%",
                });
              }),
              w("ElementParse." + U, function (b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      },
    },
  }),
    A();
});
/* perfect-scrollbar v0.6.10 */
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var l = (n[o] = { exports: {} });
      t[o][0].call(
        l.exports,
        function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function (require, module, exports) {
        "use strict";

        var ps = require("../main"),
          psInstances = require("../plugin/instances");

        function mountJQuery(jQuery) {
          jQuery.fn.perfectScrollbar = function (settingOrCommand) {
            return this.each(function () {
              if (
                typeof settingOrCommand === "object" ||
                typeof settingOrCommand === "undefined"
              ) {
                // If it's an object or none, initialize.
                var settings = settingOrCommand;

                if (!psInstances.get(this)) {
                  ps.initialize(this, settings);
                }
              } else {
                // Unless, it may be a command.
                var command = settingOrCommand;

                if (command === "update") {
                  ps.update(this);
                } else if (command === "destroy") {
                  ps.destroy(this);
                }
              }
              return jQuery(this);
            });
          };
        }

        if (typeof define === "function" && define.amd) {
          // AMD. Register as an anonymous module.
          define(["jquery"], mountJQuery);
        } else {
          var jq = window.jQuery ? window.jQuery : window.$;
          if (typeof jq !== "undefined") {
            mountJQuery(jq);
          }
        }

        module.exports = mountJQuery;
      },
      { "../main": 7, "../plugin/instances": 18 },
    ],
    2: [
      function (require, module, exports) {
        "use strict";

        function oldAdd(element, className) {
          var classes = element.className.split(" ");
          if (classes.indexOf(className) < 0) {
            classes.push(className);
          }
          element.className = classes.join(" ");
        }

        function oldRemove(element, className) {
          var classes = element.className.split(" ");
          var idx = classes.indexOf(className);
          if (idx >= 0) {
            classes.splice(idx, 1);
          }
          element.className = classes.join(" ");
        }

        exports.add = function (element, className) {
          if (element.classList) {
            element.classList.add(className);
          } else {
            oldAdd(element, className);
          }
        };

        exports.remove = function (element, className) {
          if (element.classList) {
            element.classList.remove(className);
          } else {
            oldRemove(element, className);
          }
        };

        exports.list = function (element) {
          if (element.classList) {
            return Array.prototype.slice.apply(element.classList);
          } else {
            return element.className.split(" ");
          }
        };
      },
      {},
    ],
    3: [
      function (require, module, exports) {
        "use strict";

        var DOM = {};

        DOM.e = function (tagName, className) {
          var element = document.createElement(tagName);
          element.className = className;
          return element;
        };

        DOM.appendTo = function (child, parent) {
          parent.appendChild(child);
          return child;
        };

        function cssGet(element, styleName) {
          return window.getComputedStyle(element)[styleName];
        }

        function cssSet(element, styleName, styleValue) {
          if (typeof styleValue === "number") {
            styleValue = styleValue.toString() + "px";
          }
          element.style[styleName] = styleValue;
          return element;
        }

        function cssMultiSet(element, obj) {
          for (var key in obj) {
            var val = obj[key];
            if (typeof val === "number") {
              val = val.toString() + "px";
            }
            element.style[key] = val;
          }
          return element;
        }

        DOM.css = function (element, styleNameOrObject, styleValue) {
          if (typeof styleNameOrObject === "object") {
            // multiple set with object
            return cssMultiSet(element, styleNameOrObject);
          } else {
            if (typeof styleValue === "undefined") {
              return cssGet(element, styleNameOrObject);
            } else {
              return cssSet(element, styleNameOrObject, styleValue);
            }
          }
        };

        DOM.matches = function (element, query) {
          if (typeof element.matches !== "undefined") {
            return element.matches(query);
          } else {
            if (typeof element.matchesSelector !== "undefined") {
              return element.matchesSelector(query);
            } else if (typeof element.webkitMatchesSelector !== "undefined") {
              return element.webkitMatchesSelector(query);
            } else if (typeof element.mozMatchesSelector !== "undefined") {
              return element.mozMatchesSelector(query);
            } else if (typeof element.msMatchesSelector !== "undefined") {
              return element.msMatchesSelector(query);
            }
          }
        };

        DOM.remove = function (element) {
          if (typeof element.remove !== "undefined") {
            element.remove();
          } else {
            if (element.parentNode) {
              element.parentNode.removeChild(element);
            }
          }
        };

        DOM.queryChildren = function (element, selector) {
          return Array.prototype.filter.call(
            element.childNodes,
            function (child) {
              return DOM.matches(child, selector);
            }
          );
        };

        module.exports = DOM;
      },
      {},
    ],
    4: [
      function (require, module, exports) {
        "use strict";

        var EventElement = function (element) {
          this.element = element;
          this.events = {};
        };

        EventElement.prototype.bind = function (eventName, handler) {
          if (typeof this.events[eventName] === "undefined") {
            this.events[eventName] = [];
          }
          this.events[eventName].push(handler);
          this.element.addEventListener(eventName, handler, false);
        };

        EventElement.prototype.unbind = function (eventName, handler) {
          var isHandlerProvided = typeof handler !== "undefined";
          this.events[eventName] = this.events[eventName].filter(function (
            hdlr
          ) {
            if (isHandlerProvided && hdlr !== handler) {
              return true;
            }
            this.element.removeEventListener(eventName, hdlr, false);
            return false;
          },
          this);
        };

        EventElement.prototype.unbindAll = function () {
          for (var name in this.events) {
            this.unbind(name);
          }
        };

        var EventManager = function () {
          this.eventElements = [];
        };

        EventManager.prototype.eventElement = function (element) {
          var ee = this.eventElements.filter(function (eventElement) {
            return eventElement.element === element;
          })[0];
          if (typeof ee === "undefined") {
            ee = new EventElement(element);
            this.eventElements.push(ee);
          }
          return ee;
        };

        EventManager.prototype.bind = function (element, eventName, handler) {
          this.eventElement(element).bind(eventName, handler);
        };

        EventManager.prototype.unbind = function (element, eventName, handler) {
          this.eventElement(element).unbind(eventName, handler);
        };

        EventManager.prototype.unbindAll = function () {
          for (var i = 0; i < this.eventElements.length; i++) {
            this.eventElements[i].unbindAll();
          }
        };

        EventManager.prototype.once = function (element, eventName, handler) {
          var ee = this.eventElement(element);
          var onceHandler = function (e) {
            ee.unbind(eventName, onceHandler);
            handler(e);
          };
          ee.bind(eventName, onceHandler);
        };

        module.exports = EventManager;
      },
      {},
    ],
    5: [
      function (require, module, exports) {
        "use strict";

        module.exports = (function () {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return function () {
            return (
              s4() +
              s4() +
              "-" +
              s4() +
              "-" +
              s4() +
              "-" +
              s4() +
              "-" +
              s4() +
              s4() +
              s4()
            );
          };
        })();
      },
      {},
    ],
    6: [
      function (require, module, exports) {
        "use strict";

        var cls = require("./class"),
          d = require("./dom");

        exports.toInt = function (x) {
          return parseInt(x, 10) || 0;
        };

        exports.clone = function (obj) {
          if (obj === null) {
            return null;
          } else if (typeof obj === "object") {
            var result = {};
            for (var key in obj) {
              result[key] = this.clone(obj[key]);
            }
            return result;
          } else {
            return obj;
          }
        };

        exports.extend = function (original, source) {
          var result = this.clone(original);
          for (var key in source) {
            result[key] = this.clone(source[key]);
          }
          return result;
        };

        exports.isEditable = function (el) {
          return (
            d.matches(el, "input,[contenteditable]") ||
            d.matches(el, "select,[contenteditable]") ||
            d.matches(el, "textarea,[contenteditable]") ||
            d.matches(el, "button,[contenteditable]")
          );
        };

        exports.removePsClasses = function (element) {
          var clsList = cls.list(element);
          for (var i = 0; i < clsList.length; i++) {
            var className = clsList[i];
            if (className.indexOf("ps-") === 0) {
              cls.remove(element, className);
            }
          }
        };

        exports.outerWidth = function (element) {
          return (
            this.toInt(d.css(element, "width")) +
            this.toInt(d.css(element, "paddingLeft")) +
            this.toInt(d.css(element, "paddingRight")) +
            this.toInt(d.css(element, "borderLeftWidth")) +
            this.toInt(d.css(element, "borderRightWidth"))
          );
        };

        exports.startScrolling = function (element, axis) {
          cls.add(element, "ps-in-scrolling");
          if (typeof axis !== "undefined") {
            cls.add(element, "ps-" + axis);
          } else {
            cls.add(element, "ps-x");
            cls.add(element, "ps-y");
          }
        };

        exports.stopScrolling = function (element, axis) {
          cls.remove(element, "ps-in-scrolling");
          if (typeof axis !== "undefined") {
            cls.remove(element, "ps-" + axis);
          } else {
            cls.remove(element, "ps-x");
            cls.remove(element, "ps-y");
          }
        };

        exports.env = {
          isWebKit: "WebkitAppearance" in document.documentElement.style,
          supportsTouch:
            "ontouchstart" in window ||
            (window.DocumentTouch && document instanceof window.DocumentTouch),
          supportsIePointer: window.navigator.msMaxTouchPoints !== null,
        };
      },
      { "./class": 2, "./dom": 3 },
    ],
    7: [
      function (require, module, exports) {
        "use strict";

        var destroy = require("./plugin/destroy"),
          initialize = require("./plugin/initialize"),
          update = require("./plugin/update");

        module.exports = {
          initialize: initialize,
          update: update,
          destroy: destroy,
        };
      },
      {
        "./plugin/destroy": 9,
        "./plugin/initialize": 17,
        "./plugin/update": 21,
      },
    ],
    8: [
      function (require, module, exports) {
        "use strict";

        module.exports = {
          maxScrollbarLength: null,
          minScrollbarLength: null,
          scrollXMarginOffset: 0,
          scrollYMarginOffset: 0,
          stopPropagationOnClick: true,
          suppressScrollX: false,
          suppressScrollY: false,
          swipePropagation: true,
          useBothWheelAxes: false,
          useKeyboard: true,
          useSelectionScroll: false,
          wheelPropagation: false,
          wheelSpeed: 1,
          theme: "default",
        };
      },
      {},
    ],
    9: [
      function (require, module, exports) {
        "use strict";

        var d = require("../lib/dom"),
          h = require("../lib/helper"),
          instances = require("./instances");

        module.exports = function (element) {
          var i = instances.get(element);

          if (!i) {
            return;
          }

          i.event.unbindAll();
          d.remove(i.scrollbarX);
          d.remove(i.scrollbarY);
          d.remove(i.scrollbarXRail);
          d.remove(i.scrollbarYRail);
          h.removePsClasses(element);

          instances.remove(element);
        };
      },
      { "../lib/dom": 3, "../lib/helper": 6, "./instances": 18 },
    ],
    10: [
      function (require, module, exports) {
        "use strict";

        var h = require("../../lib/helper"),
          instances = require("../instances"),
          updateGeometry = require("../update-geometry"),
          updateScroll = require("../update-scroll");

        function bindClickRailHandler(element, i) {
          function pageOffset(el) {
            return el.getBoundingClientRect();
          }
          var stopPropagation = window.Event.prototype.stopPropagation.bind;

          if (i.settings.stopPropagationOnClick) {
            i.event.bind(i.scrollbarY, "click", stopPropagation);
          }
          i.event.bind(i.scrollbarYRail, "click", function (e) {
            var halfOfScrollbarLength = h.toInt(i.scrollbarYHeight / 2);
            var positionTop =
              i.railYRatio *
              (e.pageY -
                window.pageYOffset -
                pageOffset(i.scrollbarYRail).top -
                halfOfScrollbarLength);
            var maxPositionTop =
              i.railYRatio * (i.railYHeight - i.scrollbarYHeight);
            var positionRatio = positionTop / maxPositionTop;

            if (positionRatio < 0) {
              positionRatio = 0;
            } else if (positionRatio > 1) {
              positionRatio = 1;
            }

            updateScroll(
              element,
              "top",
              (i.contentHeight - i.containerHeight) * positionRatio
            );
            updateGeometry(element);

            e.stopPropagation();
          });

          if (i.settings.stopPropagationOnClick) {
            i.event.bind(i.scrollbarX, "click", stopPropagation);
          }
          i.event.bind(i.scrollbarXRail, "click", function (e) {
            var halfOfScrollbarLength = h.toInt(i.scrollbarXWidth / 2);
            var positionLeft =
              i.railXRatio *
              (e.pageX -
                window.pageXOffset -
                pageOffset(i.scrollbarXRail).left -
                halfOfScrollbarLength);
            var maxPositionLeft =
              i.railXRatio * (i.railXWidth - i.scrollbarXWidth);
            var positionRatio = positionLeft / maxPositionLeft;

            if (positionRatio < 0) {
              positionRatio = 0;
            } else if (positionRatio > 1) {
              positionRatio = 1;
            }

            updateScroll(
              element,
              "left",
              (i.contentWidth - i.containerWidth) * positionRatio -
                i.negativeScrollAdjustment
            );
            updateGeometry(element);

            e.stopPropagation();
          });
        }

        module.exports = function (element) {
          var i = instances.get(element);
          bindClickRailHandler(element, i);
        };
      },
      {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20,
      },
    ],
    11: [
      function (require, module, exports) {
        "use strict";

        var d = require("../../lib/dom"),
          h = require("../../lib/helper"),
          instances = require("../instances"),
          updateGeometry = require("../update-geometry"),
          updateScroll = require("../update-scroll");

        function bindMouseScrollXHandler(element, i) {
          var currentLeft = null;
          var currentPageX = null;

          function updateScrollLeft(deltaX) {
            var newLeft = currentLeft + deltaX * i.railXRatio;
            var maxLeft =
              Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) +
              i.railXRatio * (i.railXWidth - i.scrollbarXWidth);

            if (newLeft < 0) {
              i.scrollbarXLeft = 0;
            } else if (newLeft > maxLeft) {
              i.scrollbarXLeft = maxLeft;
            } else {
              i.scrollbarXLeft = newLeft;
            }

            var scrollLeft =
              h.toInt(
                (i.scrollbarXLeft * (i.contentWidth - i.containerWidth)) /
                  (i.containerWidth - i.railXRatio * i.scrollbarXWidth)
              ) - i.negativeScrollAdjustment;
            updateScroll(element, "left", scrollLeft);
          }

          var mouseMoveHandler = function (e) {
            updateScrollLeft(e.pageX - currentPageX);
            updateGeometry(element);
            e.stopPropagation();
            e.preventDefault();
          };

          var mouseUpHandler = function () {
            h.stopScrolling(element, "x");
            i.event.unbind(i.ownerDocument, "mousemove", mouseMoveHandler);
          };

          i.event.bind(i.scrollbarX, "mousedown", function (e) {
            currentPageX = e.pageX;
            currentLeft = h.toInt(d.css(i.scrollbarX, "left")) * i.railXRatio;
            h.startScrolling(element, "x");

            i.event.bind(i.ownerDocument, "mousemove", mouseMoveHandler);
            i.event.once(i.ownerDocument, "mouseup", mouseUpHandler);

            e.stopPropagation();
            e.preventDefault();
          });
        }

        function bindMouseScrollYHandler(element, i) {
          var currentTop = null;
          var currentPageY = null;

          function updateScrollTop(deltaY) {
            var newTop = currentTop + deltaY * i.railYRatio;
            var maxTop =
              Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) +
              i.railYRatio * (i.railYHeight - i.scrollbarYHeight);

            if (newTop < 0) {
              i.scrollbarYTop = 0;
            } else if (newTop > maxTop) {
              i.scrollbarYTop = maxTop;
            } else {
              i.scrollbarYTop = newTop;
            }

            var scrollTop = h.toInt(
              (i.scrollbarYTop * (i.contentHeight - i.containerHeight)) /
                (i.containerHeight - i.railYRatio * i.scrollbarYHeight)
            );
            updateScroll(element, "top", scrollTop);
          }

          var mouseMoveHandler = function (e) {
            updateScrollTop(e.pageY - currentPageY);
            updateGeometry(element);
            e.stopPropagation();
            e.preventDefault();
          };

          var mouseUpHandler = function () {
            h.stopScrolling(element, "y");
            i.event.unbind(i.ownerDocument, "mousemove", mouseMoveHandler);
          };

          i.event.bind(i.scrollbarY, "mousedown", function (e) {
            currentPageY = e.pageY;
            currentTop = h.toInt(d.css(i.scrollbarY, "top")) * i.railYRatio;
            h.startScrolling(element, "y");

            i.event.bind(i.ownerDocument, "mousemove", mouseMoveHandler);
            i.event.once(i.ownerDocument, "mouseup", mouseUpHandler);

            e.stopPropagation();
            e.preventDefault();
          });
        }

        module.exports = function (element) {
          var i = instances.get(element);
          bindMouseScrollXHandler(element, i);
          bindMouseScrollYHandler(element, i);
        };
      },
      {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20,
      },
    ],
    12: [
      function (require, module, exports) {
        "use strict";

        var h = require("../../lib/helper"),
          d = require("../../lib/dom"),
          instances = require("../instances"),
          updateGeometry = require("../update-geometry"),
          updateScroll = require("../update-scroll");

        function bindKeyboardHandler(element, i) {
          var hovered = false;
          i.event.bind(element, "mouseenter", function () {
            hovered = true;
          });
          i.event.bind(element, "mouseleave", function () {
            hovered = false;
          });

          var shouldPrevent = false;
          function shouldPreventDefault(deltaX, deltaY) {
            var scrollTop = element.scrollTop;
            if (deltaX === 0) {
              if (!i.scrollbarYActive) {
                return false;
              }
              if (
                (scrollTop === 0 && deltaY > 0) ||
                (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
              ) {
                return !i.settings.wheelPropagation;
              }
            }

            var scrollLeft = element.scrollLeft;
            if (deltaY === 0) {
              if (!i.scrollbarXActive) {
                return false;
              }
              if (
                (scrollLeft === 0 && deltaX < 0) ||
                (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
              ) {
                return !i.settings.wheelPropagation;
              }
            }
            return true;
          }

          i.event.bind(i.ownerDocument, "keydown", function (e) {
            if (e.isDefaultPrevented && e.isDefaultPrevented()) {
              return;
            }

            var focused =
              d.matches(i.scrollbarX, ":focus") ||
              d.matches(i.scrollbarY, ":focus");

            if (!hovered && !focused) {
              return;
            }

            var activeElement = document.activeElement
              ? document.activeElement
              : i.ownerDocument.activeElement;
            if (activeElement) {
              // go deeper if element is a webcomponent
              while (activeElement.shadowRoot) {
                activeElement = activeElement.shadowRoot.activeElement;
              }
              if (h.isEditable(activeElement)) {
                return;
              }
            }

            var deltaX = 0;
            var deltaY = 0;

            switch (e.which) {
              case 37: // left
                deltaX = -30;
                break;
              case 38: // up
                deltaY = 30;
                break;
              case 39: // right
                deltaX = 30;
                break;
              case 40: // down
                deltaY = -30;
                break;
              case 33: // page up
                deltaY = 90;
                break;
              case 32: // space bar
                if (e.shiftKey) {
                  deltaY = 90;
                } else {
                  deltaY = -90;
                }
                break;
              case 34: // page down
                deltaY = -90;
                break;
              case 35: // end
                if (e.ctrlKey) {
                  deltaY = -i.contentHeight;
                } else {
                  deltaY = -i.containerHeight;
                }
                break;
              case 36: // home
                if (e.ctrlKey) {
                  deltaY = element.scrollTop;
                } else {
                  deltaY = i.containerHeight;
                }
                break;
              default:
                return;
            }

            updateScroll(element, "top", element.scrollTop - deltaY);
            updateScroll(element, "left", element.scrollLeft + deltaX);
            updateGeometry(element);

            shouldPrevent = shouldPreventDefault(deltaX, deltaY);
            if (shouldPrevent) {
              e.preventDefault();
            }
          });
        }

        module.exports = function (element) {
          var i = instances.get(element);
          bindKeyboardHandler(element, i);
        };
      },
      {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20,
      },
    ],
    13: [
      function (require, module, exports) {
        "use strict";

        var instances = require("../instances"),
          updateGeometry = require("../update-geometry"),
          updateScroll = require("../update-scroll");

        function bindMouseWheelHandler(element, i) {
          var shouldPrevent = false;

          function shouldPreventDefault(deltaX, deltaY) {
            var scrollTop = element.scrollTop;
            if (deltaX === 0) {
              if (!i.scrollbarYActive) {
                return false;
              }
              if (
                (scrollTop === 0 && deltaY > 0) ||
                (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
              ) {
                return !i.settings.wheelPropagation;
              }
            }

            var scrollLeft = element.scrollLeft;
            if (deltaY === 0) {
              if (!i.scrollbarXActive) {
                return false;
              }
              if (
                (scrollLeft === 0 && deltaX < 0) ||
                (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
              ) {
                return !i.settings.wheelPropagation;
              }
            }
            return true;
          }

          function getDeltaFromEvent(e) {
            var deltaX = e.deltaX;
            var deltaY = -1 * e.deltaY;

            if (
              typeof deltaX === "undefined" ||
              typeof deltaY === "undefined"
            ) {
              // OS X Safari
              deltaX = (-1 * e.wheelDeltaX) / 6;
              deltaY = e.wheelDeltaY / 6;
            }

            if (e.deltaMode && e.deltaMode === 1) {
              // Firefox in deltaMode 1: Line scrolling
              deltaX *= 10;
              deltaY *= 10;
            }

            if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
              // IE in some mouse drivers
              deltaX = 0;
              deltaY = e.wheelDelta;
            }

            return [deltaX, deltaY];
          }

          function shouldBeConsumedByTextarea(deltaX, deltaY) {
            var hoveredTextarea = element.querySelector("textarea:hover");
            if (hoveredTextarea) {
              var maxScrollTop =
                hoveredTextarea.scrollHeight - hoveredTextarea.clientHeight;
              if (maxScrollTop > 0) {
                if (
                  !(hoveredTextarea.scrollTop === 0 && deltaY > 0) &&
                  !(hoveredTextarea.scrollTop === maxScrollTop && deltaY < 0)
                ) {
                  return true;
                }
              }
              var maxScrollLeft =
                hoveredTextarea.scrollLeft - hoveredTextarea.clientWidth;
              if (maxScrollLeft > 0) {
                if (
                  !(hoveredTextarea.scrollLeft === 0 && deltaX < 0) &&
                  !(hoveredTextarea.scrollLeft === maxScrollLeft && deltaX > 0)
                ) {
                  return true;
                }
              }
            }
            return false;
          }

          function mousewheelHandler(e) {
            var delta = getDeltaFromEvent(e);

            var deltaX = delta[0];
            var deltaY = delta[1];

            if (shouldBeConsumedByTextarea(deltaX, deltaY)) {
              return;
            }

            shouldPrevent = false;
            if (!i.settings.useBothWheelAxes) {
              // deltaX will only be used for horizontal scrolling and deltaY will
              // only be used for vertical scrolling - this is the default
              updateScroll(
                element,
                "top",
                element.scrollTop - deltaY * i.settings.wheelSpeed
              );
              updateScroll(
                element,
                "left",
                element.scrollLeft + deltaX * i.settings.wheelSpeed
              );
            } else if (i.scrollbarYActive && !i.scrollbarXActive) {
              // only vertical scrollbar is active and useBothWheelAxes option is
              // active, so let's scroll vertical bar using both mouse wheel axes
              if (deltaY) {
                updateScroll(
                  element,
                  "top",
                  element.scrollTop - deltaY * i.settings.wheelSpeed
                );
              } else {
                updateScroll(
                  element,
                  "top",
                  element.scrollTop + deltaX * i.settings.wheelSpeed
                );
              }
              shouldPrevent = true;
            } else if (i.scrollbarXActive && !i.scrollbarYActive) {
              // useBothWheelAxes and only horizontal bar is active, so use both
              // wheel axes for horizontal bar
              if (deltaX) {
                updateScroll(
                  element,
                  "left",
                  element.scrollLeft + deltaX * i.settings.wheelSpeed
                );
              } else {
                updateScroll(
                  element,
                  "left",
                  element.scrollLeft - deltaY * i.settings.wheelSpeed
                );
              }
              shouldPrevent = true;
            }

            updateGeometry(element);

            shouldPrevent =
              shouldPrevent || shouldPreventDefault(deltaX, deltaY);
            if (shouldPrevent) {
              e.stopPropagation();
              e.preventDefault();
            }
          }

          if (typeof window.onwheel !== "undefined") {
            i.event.bind(element, "wheel", mousewheelHandler);
          } else if (typeof window.onmousewheel !== "undefined") {
            i.event.bind(element, "mousewheel", mousewheelHandler);
          }
        }

        module.exports = function (element) {
          var i = instances.get(element);
          bindMouseWheelHandler(element, i);
        };
      },
      { "../instances": 18, "../update-geometry": 19, "../update-scroll": 20 },
    ],
    14: [
      function (require, module, exports) {
        "use strict";

        var instances = require("../instances"),
          updateGeometry = require("../update-geometry");

        function bindNativeScrollHandler(element, i) {
          i.event.bind(element, "scroll", function () {
            updateGeometry(element);
          });
        }

        module.exports = function (element) {
          var i = instances.get(element);
          bindNativeScrollHandler(element, i);
        };
      },
      { "../instances": 18, "../update-geometry": 19 },
    ],
    15: [
      function (require, module, exports) {
        "use strict";

        var h = require("../../lib/helper"),
          instances = require("../instances"),
          updateGeometry = require("../update-geometry"),
          updateScroll = require("../update-scroll");

        function bindSelectionHandler(element, i) {
          function getRangeNode() {
            var selection = window.getSelection
              ? window.getSelection()
              : document.getSelection
              ? document.getSelection()
              : "";
            if (selection.toString().length === 0) {
              return null;
            } else {
              return selection.getRangeAt(0).commonAncestorContainer;
            }
          }

          var scrollingLoop = null;
          var scrollDiff = { top: 0, left: 0 };
          function startScrolling() {
            if (!scrollingLoop) {
              scrollingLoop = setInterval(function () {
                if (!instances.get(element)) {
                  clearInterval(scrollingLoop);
                  return;
                }

                updateScroll(
                  element,
                  "top",
                  element.scrollTop + scrollDiff.top
                );
                updateScroll(
                  element,
                  "left",
                  element.scrollLeft + scrollDiff.left
                );
                updateGeometry(element);
              }, 50); // every .1 sec
            }
          }
          function stopScrolling() {
            if (scrollingLoop) {
              clearInterval(scrollingLoop);
              scrollingLoop = null;
            }
            h.stopScrolling(element);
          }

          var isSelected = false;
          i.event.bind(i.ownerDocument, "selectionchange", function () {
            if (element.contains(getRangeNode())) {
              isSelected = true;
            } else {
              isSelected = false;
              stopScrolling();
            }
          });
          i.event.bind(window, "mouseup", function () {
            if (isSelected) {
              isSelected = false;
              stopScrolling();
            }
          });

          i.event.bind(window, "mousemove", function (e) {
            if (isSelected) {
              var mousePosition = { x: e.pageX, y: e.pageY };
              var containerGeometry = {
                left: element.offsetLeft,
                right: element.offsetLeft + element.offsetWidth,
                top: element.offsetTop,
                bottom: element.offsetTop + element.offsetHeight,
              };

              if (mousePosition.x < containerGeometry.left + 3) {
                scrollDiff.left = -5;
                h.startScrolling(element, "x");
              } else if (mousePosition.x > containerGeometry.right - 3) {
                scrollDiff.left = 5;
                h.startScrolling(element, "x");
              } else {
                scrollDiff.left = 0;
              }

              if (mousePosition.y < containerGeometry.top + 3) {
                if (containerGeometry.top + 3 - mousePosition.y < 5) {
                  scrollDiff.top = -5;
                } else {
                  scrollDiff.top = -20;
                }
                h.startScrolling(element, "y");
              } else if (mousePosition.y > containerGeometry.bottom - 3) {
                if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
                  scrollDiff.top = 5;
                } else {
                  scrollDiff.top = 20;
                }
                h.startScrolling(element, "y");
              } else {
                scrollDiff.top = 0;
              }

              if (scrollDiff.top === 0 && scrollDiff.left === 0) {
                stopScrolling();
              } else {
                startScrolling();
              }
            }
          });
        }

        module.exports = function (element) {
          var i = instances.get(element);
          bindSelectionHandler(element, i);
        };
      },
      {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20,
      },
    ],
    16: [
      function (require, module, exports) {
        "use strict";

        var instances = require("../instances"),
          updateGeometry = require("../update-geometry"),
          updateScroll = require("../update-scroll");

        function bindTouchHandler(
          element,
          i,
          supportsTouch,
          supportsIePointer
        ) {
          function shouldPreventDefault(deltaX, deltaY) {
            var scrollTop = element.scrollTop;
            var scrollLeft = element.scrollLeft;
            var magnitudeX = Math.abs(deltaX);
            var magnitudeY = Math.abs(deltaY);

            if (magnitudeY > magnitudeX) {
              // user is perhaps trying to swipe up/down the page

              if (
                (deltaY < 0 &&
                  scrollTop === i.contentHeight - i.containerHeight) ||
                (deltaY > 0 && scrollTop === 0)
              ) {
                return !i.settings.swipePropagation;
              }
            } else if (magnitudeX > magnitudeY) {
              // user is perhaps trying to swipe left/right across the page

              if (
                (deltaX < 0 &&
                  scrollLeft === i.contentWidth - i.containerWidth) ||
                (deltaX > 0 && scrollLeft === 0)
              ) {
                return !i.settings.swipePropagation;
              }
            }

            return true;
          }

          function applyTouchMove(differenceX, differenceY) {
            updateScroll(element, "top", element.scrollTop - differenceY);
            updateScroll(element, "left", element.scrollLeft - differenceX);

            updateGeometry(element);
          }

          var startOffset = {};
          var startTime = 0;
          var speed = {};
          var easingLoop = null;
          var inGlobalTouch = false;
          var inLocalTouch = false;

          function globalTouchStart() {
            inGlobalTouch = true;
          }
          function globalTouchEnd() {
            inGlobalTouch = false;
          }

          function getTouch(e) {
            if (e.targetTouches) {
              return e.targetTouches[0];
            } else {
              // Maybe IE pointer
              return e;
            }
          }
          function shouldHandle(e) {
            if (e.targetTouches && e.targetTouches.length === 1) {
              return true;
            }
            if (
              e.pointerType &&
              e.pointerType !== "mouse" &&
              e.pointerType !== e.MSPOINTER_TYPE_MOUSE
            ) {
              return true;
            }
            return false;
          }
          function touchStart(e) {
            if (shouldHandle(e)) {
              inLocalTouch = true;

              var touch = getTouch(e);

              startOffset.pageX = touch.pageX;
              startOffset.pageY = touch.pageY;

              startTime = new Date().getTime();

              if (easingLoop !== null) {
                clearInterval(easingLoop);
              }

              e.stopPropagation();
            }
          }
          function touchMove(e) {
            if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
              var touch = getTouch(e);

              var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

              var differenceX = currentOffset.pageX - startOffset.pageX;
              var differenceY = currentOffset.pageY - startOffset.pageY;

              applyTouchMove(differenceX, differenceY);
              startOffset = currentOffset;

              var currentTime = new Date().getTime();

              var timeGap = currentTime - startTime;
              if (timeGap > 0) {
                speed.x = differenceX / timeGap;
                speed.y = differenceY / timeGap;
                startTime = currentTime;
              }

              if (shouldPreventDefault(differenceX, differenceY)) {
                e.stopPropagation();
                e.preventDefault();
              }
            }
          }
          function touchEnd() {
            if (!inGlobalTouch && inLocalTouch) {
              inLocalTouch = false;

              clearInterval(easingLoop);
              easingLoop = setInterval(function () {
                if (!instances.get(element)) {
                  clearInterval(easingLoop);
                  return;
                }

                if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
                  clearInterval(easingLoop);
                  return;
                }

                applyTouchMove(speed.x * 30, speed.y * 30);

                speed.x *= 0.8;
                speed.y *= 0.8;
              }, 10);
            }
          }

          if (supportsTouch) {
            i.event.bind(window, "touchstart", globalTouchStart);
            i.event.bind(window, "touchend", globalTouchEnd);
            i.event.bind(element, "touchstart", touchStart);
            i.event.bind(element, "touchmove", touchMove);
            i.event.bind(element, "touchend", touchEnd);
          }

          if (supportsIePointer) {
            if (window.PointerEvent) {
              i.event.bind(window, "pointerdown", globalTouchStart);
              i.event.bind(window, "pointerup", globalTouchEnd);
              i.event.bind(element, "pointerdown", touchStart);
              i.event.bind(element, "pointermove", touchMove);
              i.event.bind(element, "pointerup", touchEnd);
            } else if (window.MSPointerEvent) {
              i.event.bind(window, "MSPointerDown", globalTouchStart);
              i.event.bind(window, "MSPointerUp", globalTouchEnd);
              i.event.bind(element, "MSPointerDown", touchStart);
              i.event.bind(element, "MSPointerMove", touchMove);
              i.event.bind(element, "MSPointerUp", touchEnd);
            }
          }
        }

        module.exports = function (element, supportsTouch, supportsIePointer) {
          var i = instances.get(element);
          bindTouchHandler(element, i, supportsTouch, supportsIePointer);
        };
      },
      { "../instances": 18, "../update-geometry": 19, "../update-scroll": 20 },
    ],
    17: [
      function (require, module, exports) {
        "use strict";

        var cls = require("../lib/class"),
          h = require("../lib/helper"),
          instances = require("./instances"),
          updateGeometry = require("./update-geometry");

        // Handlers
        var clickRailHandler = require("./handler/click-rail"),
          dragScrollbarHandler = require("./handler/drag-scrollbar"),
          keyboardHandler = require("./handler/keyboard"),
          mouseWheelHandler = require("./handler/mouse-wheel"),
          nativeScrollHandler = require("./handler/native-scroll"),
          selectionHandler = require("./handler/selection"),
          touchHandler = require("./handler/touch");

        module.exports = function (element, userSettings) {
          userSettings = typeof userSettings === "object" ? userSettings : {};

          cls.add(element, "ps-container");

          // Create a plugin instance.
          var i = instances.add(element);

          i.settings = h.extend(i.settings, userSettings);
          cls.add(element, "ps-theme-" + i.settings.theme);

          clickRailHandler(element);
          dragScrollbarHandler(element);
          mouseWheelHandler(element);
          nativeScrollHandler(element);

          if (i.settings.useSelectionScroll) {
            selectionHandler(element);
          }

          if (h.env.supportsTouch || h.env.supportsIePointer) {
            touchHandler(element, h.env.supportsTouch, h.env.supportsIePointer);
          }
          if (i.settings.useKeyboard) {
            keyboardHandler(element);
          }

          updateGeometry(element);
        };
      },
      {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19,
      },
    ],
    18: [
      function (require, module, exports) {
        "use strict";

        var cls = require("../lib/class"),
          d = require("../lib/dom"),
          defaultSettings = require("./default-setting"),
          EventManager = require("../lib/event-manager"),
          guid = require("../lib/guid"),
          h = require("../lib/helper");

        var instances = {};

        function Instance(element) {
          var i = this;

          i.settings = h.clone(defaultSettings);
          i.containerWidth = null;
          i.containerHeight = null;
          i.contentWidth = null;
          i.contentHeight = null;

          i.isRtl = d.css(element, "direction") === "rtl";
          i.isNegativeScroll = (function () {
            var originalScrollLeft = element.scrollLeft;
            var result = null;
            element.scrollLeft = -1;
            result = element.scrollLeft < 0;
            element.scrollLeft = originalScrollLeft;
            return result;
          })();
          i.negativeScrollAdjustment = i.isNegativeScroll
            ? element.scrollWidth - element.clientWidth
            : 0;
          i.event = new EventManager();
          i.ownerDocument = element.ownerDocument || document;

          function focus() {
            cls.add(element, "ps-focus");
          }

          function blur() {
            cls.remove(element, "ps-focus");
          }

          i.scrollbarXRail = d.appendTo(
            d.e("div", "ps-scrollbar-x-rail"),
            element
          );
          i.scrollbarX = d.appendTo(
            d.e("div", "ps-scrollbar-x"),
            i.scrollbarXRail
          );
          i.scrollbarX.setAttribute("tabindex", 0);
          i.event.bind(i.scrollbarX, "focus", focus);
          i.event.bind(i.scrollbarX, "blur", blur);
          i.scrollbarXActive = null;
          i.scrollbarXWidth = null;
          i.scrollbarXLeft = null;
          i.scrollbarXBottom = h.toInt(d.css(i.scrollbarXRail, "bottom"));
          i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
          i.scrollbarXTop = i.isScrollbarXUsingBottom
            ? null
            : h.toInt(d.css(i.scrollbarXRail, "top"));
          i.railBorderXWidth =
            h.toInt(d.css(i.scrollbarXRail, "borderLeftWidth")) +
            h.toInt(d.css(i.scrollbarXRail, "borderRightWidth"));
          // Set rail to display:block to calculate margins
          d.css(i.scrollbarXRail, "display", "block");
          i.railXMarginWidth =
            h.toInt(d.css(i.scrollbarXRail, "marginLeft")) +
            h.toInt(d.css(i.scrollbarXRail, "marginRight"));
          d.css(i.scrollbarXRail, "display", "");
          i.railXWidth = null;
          i.railXRatio = null;

          i.scrollbarYRail = d.appendTo(
            d.e("div", "ps-scrollbar-y-rail"),
            element
          );
          i.scrollbarY = d.appendTo(
            d.e("div", "ps-scrollbar-y"),
            i.scrollbarYRail
          );
          i.scrollbarY.setAttribute("tabindex", 0);
          i.event.bind(i.scrollbarY, "focus", focus);
          i.event.bind(i.scrollbarY, "blur", blur);
          i.scrollbarYActive = null;
          i.scrollbarYHeight = null;
          i.scrollbarYTop = null;
          i.scrollbarYRight = h.toInt(d.css(i.scrollbarYRail, "right"));
          i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
          i.scrollbarYLeft = i.isScrollbarYUsingRight
            ? null
            : h.toInt(d.css(i.scrollbarYRail, "left"));
          i.scrollbarYOuterWidth = i.isRtl ? h.outerWidth(i.scrollbarY) : null;
          i.railBorderYWidth =
            h.toInt(d.css(i.scrollbarYRail, "borderTopWidth")) +
            h.toInt(d.css(i.scrollbarYRail, "borderBottomWidth"));
          d.css(i.scrollbarYRail, "display", "block");
          i.railYMarginHeight =
            h.toInt(d.css(i.scrollbarYRail, "marginTop")) +
            h.toInt(d.css(i.scrollbarYRail, "marginBottom"));
          d.css(i.scrollbarYRail, "display", "");
          i.railYHeight = null;
          i.railYRatio = null;
        }

        function getId(element) {
          if (typeof element.dataset === "undefined") {
            return element.getAttribute("data-ps-id");
          } else {
            return element.dataset.psId;
          }
        }

        function setId(element, id) {
          if (typeof element.dataset === "undefined") {
            element.setAttribute("data-ps-id", id);
          } else {
            element.dataset.psId = id;
          }
        }

        function removeId(element) {
          if (typeof element.dataset === "undefined") {
            element.removeAttribute("data-ps-id");
          } else {
            delete element.dataset.psId;
          }
        }

        exports.add = function (element) {
          var newId = guid();
          setId(element, newId);
          instances[newId] = new Instance(element);
          return instances[newId];
        };

        exports.remove = function (element) {
          delete instances[getId(element)];
          removeId(element);
        };

        exports.get = function (element) {
          return instances[getId(element)];
        };
      },
      {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/event-manager": 4,
        "../lib/guid": 5,
        "../lib/helper": 6,
        "./default-setting": 8,
      },
    ],
    19: [
      function (require, module, exports) {
        "use strict";

        var cls = require("../lib/class"),
          d = require("../lib/dom"),
          h = require("../lib/helper"),
          instances = require("./instances"),
          updateScroll = require("./update-scroll");

        function getThumbSize(i, thumbSize) {
          if (i.settings.minScrollbarLength) {
            thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
          }
          if (i.settings.maxScrollbarLength) {
            thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
          }
          return thumbSize;
        }

        function updateCss(element, i) {
          var xRailOffset = { width: i.railXWidth };
          if (i.isRtl) {
            xRailOffset.left =
              i.negativeScrollAdjustment +
              element.scrollLeft +
              i.containerWidth -
              i.contentWidth;
          } else {
            xRailOffset.left = element.scrollLeft;
          }
          if (i.isScrollbarXUsingBottom) {
            xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
          } else {
            xRailOffset.top = i.scrollbarXTop + element.scrollTop;
          }
          d.css(i.scrollbarXRail, xRailOffset);

          var yRailOffset = { top: element.scrollTop, height: i.railYHeight };
          if (i.isScrollbarYUsingRight) {
            if (i.isRtl) {
              yRailOffset.right =
                i.contentWidth -
                (i.negativeScrollAdjustment + element.scrollLeft) -
                i.scrollbarYRight -
                i.scrollbarYOuterWidth;
            } else {
              yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
            }
          } else {
            if (i.isRtl) {
              yRailOffset.left =
                i.negativeScrollAdjustment +
                element.scrollLeft +
                i.containerWidth * 2 -
                i.contentWidth -
                i.scrollbarYLeft -
                i.scrollbarYOuterWidth;
            } else {
              yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
            }
          }
          d.css(i.scrollbarYRail, yRailOffset);

          d.css(i.scrollbarX, {
            left: i.scrollbarXLeft,
            width: i.scrollbarXWidth - i.railBorderXWidth,
          });
          d.css(i.scrollbarY, {
            top: i.scrollbarYTop,
            height: i.scrollbarYHeight - i.railBorderYWidth,
          });
        }

        module.exports = function (element) {
          var i = instances.get(element);

          i.containerWidth = element.clientWidth;
          i.containerHeight = element.clientHeight;
          i.contentWidth = element.scrollWidth;
          i.contentHeight = element.scrollHeight;

          var existingRails;
          if (!element.contains(i.scrollbarXRail)) {
            existingRails = d.queryChildren(element, ".ps-scrollbar-x-rail");
            if (existingRails.length > 0) {
              existingRails.forEach(function (rail) {
                d.remove(rail);
              });
            }
            d.appendTo(i.scrollbarXRail, element);
          }
          if (!element.contains(i.scrollbarYRail)) {
            existingRails = d.queryChildren(element, ".ps-scrollbar-y-rail");
            if (existingRails.length > 0) {
              existingRails.forEach(function (rail) {
                d.remove(rail);
              });
            }
            d.appendTo(i.scrollbarYRail, element);
          }

          if (
            !i.settings.suppressScrollX &&
            i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
          ) {
            i.scrollbarXActive = true;
            i.railXWidth = i.containerWidth - i.railXMarginWidth;
            i.railXRatio = i.containerWidth / i.railXWidth;
            i.scrollbarXWidth = getThumbSize(
              i,
              h.toInt((i.railXWidth * i.containerWidth) / i.contentWidth)
            );
            i.scrollbarXLeft = h.toInt(
              ((i.negativeScrollAdjustment + element.scrollLeft) *
                (i.railXWidth - i.scrollbarXWidth)) /
                (i.contentWidth - i.containerWidth)
            );
          } else {
            i.scrollbarXActive = false;
          }

          if (
            !i.settings.suppressScrollY &&
            i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
          ) {
            i.scrollbarYActive = true;
            i.railYHeight = i.containerHeight - i.railYMarginHeight;
            i.railYRatio = i.containerHeight / i.railYHeight;
            i.scrollbarYHeight = getThumbSize(
              i,
              h.toInt((i.railYHeight * i.containerHeight) / i.contentHeight)
            );
            i.scrollbarYTop = h.toInt(
              (element.scrollTop * (i.railYHeight - i.scrollbarYHeight)) /
                (i.contentHeight - i.containerHeight)
            );
          } else {
            i.scrollbarYActive = false;
          }

          if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
            i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
          }
          if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
            i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
          }

          updateCss(element, i);

          if (i.scrollbarXActive) {
            cls.add(element, "ps-active-x");
          } else {
            cls.remove(element, "ps-active-x");
            i.scrollbarXWidth = 0;
            i.scrollbarXLeft = 0;
            updateScroll(element, "left", 0);
          }
          if (i.scrollbarYActive) {
            cls.add(element, "ps-active-y");
          } else {
            cls.remove(element, "ps-active-y");
            i.scrollbarYHeight = 0;
            i.scrollbarYTop = 0;
            updateScroll(element, "top", 0);
          }
        };
      },
      {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-scroll": 20,
      },
    ],
    20: [
      function (require, module, exports) {
        "use strict";

        var instances = require("./instances");

        var upEvent = document.createEvent("Event"),
          downEvent = document.createEvent("Event"),
          leftEvent = document.createEvent("Event"),
          rightEvent = document.createEvent("Event"),
          yEvent = document.createEvent("Event"),
          xEvent = document.createEvent("Event"),
          xStartEvent = document.createEvent("Event"),
          xEndEvent = document.createEvent("Event"),
          yStartEvent = document.createEvent("Event"),
          yEndEvent = document.createEvent("Event"),
          lastTop,
          lastLeft;

        upEvent.initEvent("ps-scroll-up", true, true);
        downEvent.initEvent("ps-scroll-down", true, true);
        leftEvent.initEvent("ps-scroll-left", true, true);
        rightEvent.initEvent("ps-scroll-right", true, true);
        yEvent.initEvent("ps-scroll-y", true, true);
        xEvent.initEvent("ps-scroll-x", true, true);
        xStartEvent.initEvent("ps-x-reach-start", true, true);
        xEndEvent.initEvent("ps-x-reach-end", true, true);
        yStartEvent.initEvent("ps-y-reach-start", true, true);
        yEndEvent.initEvent("ps-y-reach-end", true, true);

        module.exports = function (element, axis, value) {
          if (typeof element === "undefined") {
            throw "You must provide an element to the update-scroll function";
          }

          if (typeof axis === "undefined") {
            throw "You must provide an axis to the update-scroll function";
          }

          if (typeof value === "undefined") {
            throw "You must provide a value to the update-scroll function";
          }

          if (axis === "top" && value <= 0) {
            element.scrollTop = value = 0; // don't allow negative scroll
            element.dispatchEvent(yStartEvent);
          }

          if (axis === "left" && value <= 0) {
            element.scrollLeft = value = 0; // don't allow negative scroll
            element.dispatchEvent(xStartEvent);
          }

          var i = instances.get(element);

          if (axis === "top" && value >= i.contentHeight - i.containerHeight) {
            element.scrollTop = value = i.contentHeight - i.containerHeight; // don't allow scroll past container
            element.dispatchEvent(yEndEvent);
          }

          if (axis === "left" && value >= i.contentWidth - i.containerWidth) {
            element.scrollLeft = value = i.contentWidth - i.containerWidth; // don't allow scroll past container
            element.dispatchEvent(xEndEvent);
          }

          if (!lastTop) {
            lastTop = element.scrollTop;
          }

          if (!lastLeft) {
            lastLeft = element.scrollLeft;
          }

          if (axis === "top" && value < lastTop) {
            element.dispatchEvent(upEvent);
          }

          if (axis === "top" && value > lastTop) {
            element.dispatchEvent(downEvent);
          }

          if (axis === "left" && value < lastLeft) {
            element.dispatchEvent(leftEvent);
          }

          if (axis === "left" && value > lastLeft) {
            element.dispatchEvent(rightEvent);
          }

          if (axis === "top") {
            element.scrollTop = lastTop = value;
            element.dispatchEvent(yEvent);
          }

          if (axis === "left") {
            element.scrollLeft = lastLeft = value;
            element.dispatchEvent(xEvent);
          }
        };
      },
      { "./instances": 18 },
    ],
    21: [
      function (require, module, exports) {
        "use strict";

        var d = require("../lib/dom"),
          h = require("../lib/helper"),
          instances = require("./instances"),
          updateGeometry = require("./update-geometry"),
          updateScroll = require("./update-scroll");

        module.exports = function (element) {
          var i = instances.get(element);

          if (!i) {
            return;
          }

          // Recalcuate negative scrollLeft adjustment
          i.negativeScrollAdjustment = i.isNegativeScroll
            ? element.scrollWidth - element.clientWidth
            : 0;

          // Recalculate rail margins
          d.css(i.scrollbarXRail, "display", "block");
          d.css(i.scrollbarYRail, "display", "block");
          i.railXMarginWidth =
            h.toInt(d.css(i.scrollbarXRail, "marginLeft")) +
            h.toInt(d.css(i.scrollbarXRail, "marginRight"));
          i.railYMarginHeight =
            h.toInt(d.css(i.scrollbarYRail, "marginTop")) +
            h.toInt(d.css(i.scrollbarYRail, "marginBottom"));

          // Hide scrollbars not to affect scrollWidth and scrollHeight
          d.css(i.scrollbarXRail, "display", "none");
          d.css(i.scrollbarYRail, "display", "none");

          updateGeometry(element);

          // Update top/left scroll to trigger events
          updateScroll(element, "top", element.scrollTop);
          updateScroll(element, "left", element.scrollLeft);

          d.css(i.scrollbarXRail, "display", "");
          d.css(i.scrollbarYRail, "display", "");
        };
      },
      {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-geometry": 19,
        "./update-scroll": 20,
      },
    ],
  },
  {},
  [1]
);
/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function () {
  function e() {}
  function t(e, t) {
    for (var n = e.length; n--; ) if (e[n].listener === t) return n;
    return -1;
  }
  function n(e) {
    return function () {
      return this[e].apply(this, arguments);
    };
  }
  var i = e.prototype,
    r = this,
    o = r.EventEmitter;
  (i.getListeners = function (e) {
    var t,
      n,
      i = this._getEvents();
    if ("object" == typeof e) {
      t = {};
      for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
    } else t = i[e] || (i[e] = []);
    return t;
  }),
    (i.flattenListeners = function (e) {
      var t,
        n = [];
      for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
      return n;
    }),
    (i.getListenersAsObject = function (e) {
      var t,
        n = this.getListeners(e);
      return n instanceof Array && ((t = {}), (t[e] = n)), t || n;
    }),
    (i.addListener = function (e, n) {
      var i,
        r = this.getListenersAsObject(e),
        o = "object" == typeof n;
      for (i in r)
        r.hasOwnProperty(i) &&
          -1 === t(r[i], n) &&
          r[i].push(o ? n : { listener: n, once: !1 });
      return this;
    }),
    (i.on = n("addListener")),
    (i.addOnceListener = function (e, t) {
      return this.addListener(e, { listener: t, once: !0 });
    }),
    (i.once = n("addOnceListener")),
    (i.defineEvent = function (e) {
      return this.getListeners(e), this;
    }),
    (i.defineEvents = function (e) {
      for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
      return this;
    }),
    (i.removeListener = function (e, n) {
      var i,
        r,
        o = this.getListenersAsObject(e);
      for (r in o)
        o.hasOwnProperty(r) &&
          ((i = t(o[r], n)), -1 !== i && o[r].splice(i, 1));
      return this;
    }),
    (i.off = n("removeListener")),
    (i.addListeners = function (e, t) {
      return this.manipulateListeners(!1, e, t);
    }),
    (i.removeListeners = function (e, t) {
      return this.manipulateListeners(!0, e, t);
    }),
    (i.manipulateListeners = function (e, t, n) {
      var i,
        r,
        o = e ? this.removeListener : this.addListener,
        s = e ? this.removeListeners : this.addListeners;
      if ("object" != typeof t || t instanceof RegExp)
        for (i = n.length; i--; ) o.call(this, t, n[i]);
      else
        for (i in t)
          t.hasOwnProperty(i) &&
            (r = t[i]) &&
            ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
      return this;
    }),
    (i.removeEvent = function (e) {
      var t,
        n = typeof e,
        i = this._getEvents();
      if ("string" === n) delete i[e];
      else if ("object" === n)
        for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
      else delete this._events;
      return this;
    }),
    (i.removeAllListeners = n("removeEvent")),
    (i.emitEvent = function (e, t) {
      var n,
        i,
        r,
        o,
        s = this.getListenersAsObject(e);
      for (r in s)
        if (s.hasOwnProperty(r))
          for (i = s[r].length; i--; )
            (n = s[r][i]),
              n.once === !0 && this.removeListener(e, n.listener),
              (o = n.listener.apply(this, t || [])),
              o === this._getOnceReturnValue() &&
                this.removeListener(e, n.listener);
      return this;
    }),
    (i.trigger = n("emitEvent")),
    (i.emit = function (e) {
      var t = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(e, t);
    }),
    (i.setOnceReturnValue = function (e) {
      return (this._onceReturnValue = e), this;
    }),
    (i._getOnceReturnValue = function () {
      return this.hasOwnProperty("_onceReturnValue")
        ? this._onceReturnValue
        : !0;
    }),
    (i._getEvents = function () {
      return this._events || (this._events = {});
    }),
    (e.noConflict = function () {
      return (r.EventEmitter = o), e;
    }),
    "function" == typeof define && define.amd
      ? define("eventEmitter/EventEmitter", [], function () {
          return e;
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e)
      : (this.EventEmitter = e);
}).call(this),
  (function (e) {
    function t(t) {
      var n = e.event;
      return (n.target = n.target || n.srcElement || t), n;
    }
    var n = document.documentElement,
      i = function () {};
    n.addEventListener
      ? (i = function (e, t, n) {
          e.addEventListener(t, n, !1);
        })
      : n.attachEvent &&
        (i = function (e, n, i) {
          (e[n + i] = i.handleEvent
            ? function () {
                var n = t(e);
                i.handleEvent.call(i, n);
              }
            : function () {
                var n = t(e);
                i.call(e, n);
              }),
            e.attachEvent("on" + n, e[n + i]);
        });
    var r = function () {};
    n.removeEventListener
      ? (r = function (e, t, n) {
          e.removeEventListener(t, n, !1);
        })
      : n.detachEvent &&
        (r = function (e, t, n) {
          e.detachEvent("on" + t, e[t + n]);
          try {
            delete e[t + n];
          } catch (i) {
            e[t + n] = void 0;
          }
        });
    var o = { bind: i, unbind: r };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", o)
      : (e.eventie = o);
  })(this),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define(
          ["eventEmitter/EventEmitter", "eventie/eventie"],
          function (n, i) {
            return t(e, n, i);
          }
        )
      : "object" == typeof exports
      ? (module.exports = t(
          e,
          require("wolfy87-eventemitter"),
          require("eventie")
        ))
      : (e.imagesLoaded = t(e, e.EventEmitter, e.eventie));
  })(window, function (e, t, n) {
    function i(e, t) {
      for (var n in t) e[n] = t[n];
      return e;
    }
    function r(e) {
      return "[object Array]" === d.call(e);
    }
    function o(e) {
      var t = [];
      if (r(e)) t = e;
      else if ("number" == typeof e.length)
        for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
      else t.push(e);
      return t;
    }
    function s(e, t, n) {
      if (!(this instanceof s)) return new s(e, t);
      "string" == typeof e && (e = document.querySelectorAll(e)),
        (this.elements = o(e)),
        (this.options = i({}, this.options)),
        "function" == typeof t ? (n = t) : i(this.options, t),
        n && this.on("always", n),
        this.getImages(),
        a && (this.jqDeferred = new a.Deferred());
      var r = this;
      setTimeout(function () {
        r.check();
      });
    }
    function f(e) {
      this.img = e;
    }
    function c(e) {
      (this.src = e), (v[e] = this);
    }
    var a = e.jQuery,
      u = e.console,
      h = u !== void 0,
      d = Object.prototype.toString;
    (s.prototype = new t()),
      (s.prototype.options = {}),
      (s.prototype.getImages = function () {
        this.images = [];
        for (var e = 0, t = this.elements.length; t > e; e++) {
          var n = this.elements[e];
          "IMG" === n.nodeName && this.addImage(n);
          var i = n.nodeType;
          if (i && (1 === i || 9 === i || 11 === i))
            for (
              var r = n.querySelectorAll("img"), o = 0, s = r.length;
              s > o;
              o++
            ) {
              var f = r[o];
              this.addImage(f);
            }
        }
      }),
      (s.prototype.addImage = function (e) {
        var t = new f(e);
        this.images.push(t);
      }),
      (s.prototype.check = function () {
        function e(e, r) {
          return (
            t.options.debug && h && u.log("confirm", e, r),
            t.progress(e),
            n++,
            n === i && t.complete(),
            !0
          );
        }
        var t = this,
          n = 0,
          i = this.images.length;
        if (((this.hasAnyBroken = !1), !i)) return this.complete(), void 0;
        for (var r = 0; i > r; r++) {
          var o = this.images[r];
          o.on("confirm", e), o.check();
        }
      }),
      (s.prototype.progress = function (e) {
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
        var t = this;
        setTimeout(function () {
          t.emit("progress", t, e),
            t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e);
        });
      }),
      (s.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var t = this;
        setTimeout(function () {
          if ((t.emit(e, t), t.emit("always", t), t.jqDeferred)) {
            var n = t.hasAnyBroken ? "reject" : "resolve";
            t.jqDeferred[n](t);
          }
        });
      }),
      a &&
        (a.fn.imagesLoaded = function (e, t) {
          var n = new s(this, e, t);
          return n.jqDeferred.promise(a(this));
        }),
      (f.prototype = new t()),
      (f.prototype.check = function () {
        var e = v[this.img.src] || new c(this.img.src);
        if (e.isConfirmed)
          return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
        if (this.img.complete && void 0 !== this.img.naturalWidth)
          return (
            this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0
          );
        var t = this;
        e.on("confirm", function (e, n) {
          return t.confirm(e.isLoaded, n), !0;
        }),
          e.check();
      }),
      (f.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emit("confirm", this, t);
      });
    var v = {};
    return (
      (c.prototype = new t()),
      (c.prototype.check = function () {
        if (!this.isChecked) {
          var e = new Image();
          n.bind(e, "load", this),
            n.bind(e, "error", this),
            (e.src = this.src),
            (this.isChecked = !0);
        }
      }),
      (c.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (c.prototype.onload = function (e) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(e);
      }),
      (c.prototype.onerror = function (e) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(e);
      }),
      (c.prototype.confirm = function (e, t) {
        (this.isConfirmed = !0),
          (this.isLoaded = e),
          this.emit("confirm", this, t);
      }),
      (c.prototype.unbindProxyEvents = function (e) {
        n.unbind(e.target, "load", this), n.unbind(e.target, "error", this);
      }),
      s
    );
  });
/*!
 * Isotope PACKAGED v3.0.5
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */

!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e(t, require("jquery")))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  "use strict";
  function i(i, s, a) {
    function u(t, e, o) {
      var n,
        s = "$()." + i + '("' + e + '")';
      return (
        t.each(function (t, u) {
          var h = a.data(u, i);
          if (!h)
            return void r(
              i + " not initialized. Cannot call methods, i.e. " + s
            );
          var d = h[e];
          if (!d || "_" == e.charAt(0))
            return void r(s + " is not a valid method");
          var l = d.apply(h, o);
          n = void 0 === n ? l : n;
        }),
        void 0 !== n ? n : t
      );
    }
    function h(t, e) {
      t.each(function (t, o) {
        var n = a.data(o, i);
        n ? (n.option(e), n._init()) : ((n = new s(o, e)), a.data(o, i, n));
      });
    }
    (a = a || e || t.jQuery),
      a &&
        (s.prototype.option ||
          (s.prototype.option = function (t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function (t) {
          if ("string" == typeof t) {
            var e = n.call(arguments, 1);
            return u(this, t, e);
          }
          return h(this, t), this;
        }),
        o(a));
  }
  function o(t) {
    !t || (t && t.bridget) || (t.bridget = i);
  }
  var n = Array.prototype.slice,
    s = t.console,
    r =
      "undefined" == typeof s
        ? function () {}
        : function (t) {
            s.error(t);
          };
  return o(e || t.jQuery), i;
}),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            o = (i[t] = i[t] || []);
          return o.indexOf(e) == -1 && o.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {}),
            o = (i[t] = i[t] || {});
          return (o[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var o = i.indexOf(e);
          return o != -1 && i.splice(o, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var o = this._onceEvents && this._onceEvents[t], n = 0;
            n < i.length;
            n++
          ) {
            var s = i[n],
              r = o && o[s];
            r && (this.off(t, s), delete o[s]), s.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("get-size/get-size", [], function () {
          return e();
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t),
        i = t.indexOf("%") == -1 && !isNaN(e);
      return i && e;
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        e < h;
        e++
      ) {
        var i = u[e];
        t[i] = 0;
      }
      return t;
    }
    function o(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          a(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
          ),
        e
      );
    }
    function n() {
      if (!d) {
        d = !0;
        var e = document.createElement("div");
        (e.style.width = "200px"),
          (e.style.padding = "1px 2px 3px 4px"),
          (e.style.borderStyle = "solid"),
          (e.style.borderWidth = "1px 2px 3px 4px"),
          (e.style.boxSizing = "border-box");
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var n = o(e);
        (s.isBoxSizeOuter = r = 200 == t(n.width)), i.removeChild(e);
      }
    }
    function s(e) {
      if (
        (n(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var s = o(e);
        if ("none" == s.display) return i();
        var a = {};
        (a.width = e.offsetWidth), (a.height = e.offsetHeight);
        for (
          var d = (a.isBorderBox = "border-box" == s.boxSizing), l = 0;
          l < h;
          l++
        ) {
          var f = u[l],
            c = s[f],
            m = parseFloat(c);
          a[f] = isNaN(m) ? 0 : m;
        }
        var p = a.paddingLeft + a.paddingRight,
          y = a.paddingTop + a.paddingBottom,
          g = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          I = a.borderTopWidth + a.borderBottomWidth,
          z = d && r,
          x = t(s.width);
        x !== !1 && (a.width = x + (z ? 0 : p + _));
        var S = t(s.height);
        return (
          S !== !1 && (a.height = S + (z ? 0 : y + I)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (y + I)),
          (a.outerWidth = a.width + g),
          (a.outerHeight = a.height + v),
          a
        );
      }
    }
    var r,
      a =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            },
      u = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      h = u.length,
      d = !1;
    return s;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var o = e[i],
          n = o + "MatchesSelector";
        if (t[n]) return n;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {};
    (i.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e;
      }),
      (i.makeArray = function (t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "object" == typeof t && "number" == typeof t.length)
          for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, o) {
        t = i.makeArray(t);
        var n = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!o) return void n.push(t);
              e(t, o) && n.push(t);
              for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++)
                n.push(i[s]);
            }
          }),
          n
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        var o = t.prototype[e],
          n = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[n];
          t && clearTimeout(t);
          var e = arguments,
            s = this;
          this[n] = setTimeout(function () {
            o.apply(s, e), delete s[n];
          }, i || 100);
        };
      }),
      (i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var o = t.console;
    return (
      (i.htmlInit = function (e, n) {
        i.docReady(function () {
          var s = i.toDashed(n),
            r = "data-" + s,
            a = document.querySelectorAll("[" + r + "]"),
            u = document.querySelectorAll(".js-" + s),
            h = i.makeArray(a).concat(i.makeArray(u)),
            d = r + "-options",
            l = t.jQuery;
          h.forEach(function (t) {
            var i,
              s = t.getAttribute(r) || t.getAttribute(d);
            try {
              i = s && JSON.parse(s);
            } catch (a) {
              return void (
                o &&
                o.error("Error parsing " + r + " on " + t.className + ": " + a)
              );
            }
            var u = new e(t, i);
            l && l.data(t, n, u);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          ["ev-emitter/ev-emitter", "get-size/get-size"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("ev-emitter"), require("get-size")))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function o(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function n(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    }
    var s = document.documentElement.style,
      r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
      u = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[r],
      h = {
        transform: a,
        transition: r,
        transitionDuration: r + "Duration",
        transitionProperty: r + "Property",
        transitionDelay: r + "Delay",
      },
      d = (o.prototype = Object.create(t.prototype));
    (d.constructor = o),
      (d._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (d.getSize = function () {
        this.size = e(this.element);
      }),
      (d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var o = h[i] || i;
          e[o] = t[i];
        }
      }),
      (d.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          o = t[e ? "left" : "right"],
          n = t[i ? "top" : "bottom"],
          s = this.layout.size,
          r =
            o.indexOf("%") != -1
              ? (parseFloat(o) / 100) * s.width
              : parseInt(o, 10),
          a =
            n.indexOf("%") != -1
              ? (parseFloat(n) / 100) * s.height
              : parseInt(n, 10);
        (r = isNaN(r) ? 0 : r),
          (a = isNaN(a) ? 0 : a),
          (r -= e ? s.paddingLeft : s.paddingRight),
          (a -= i ? s.paddingTop : s.paddingBottom),
          (this.position.x = r),
          (this.position.y = a);
      }),
      (d.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          o = this.layout._getOption("originTop"),
          n = i ? "paddingLeft" : "paddingRight",
          s = i ? "left" : "right",
          r = i ? "right" : "left",
          a = this.position.x + t[n];
        (e[s] = this.getXValue(a)), (e[r] = "");
        var u = o ? "paddingTop" : "paddingBottom",
          h = o ? "top" : "bottom",
          d = o ? "bottom" : "top",
          l = this.position.y + t[u];
        (e[h] = this.getYValue(l)),
          (e[d] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          o = this.position.y,
          n = parseInt(t, 10),
          s = parseInt(e, 10),
          r = n === this.position.x && s === this.position.y;
        if ((this.setPosition(t, e), r && !this.isTransitioning))
          return void this.layoutPosition();
        var a = t - i,
          u = e - o,
          h = {};
        (h.transform = this.getTranslate(a, u)),
          this.transition({
            to: h,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"),
          o = this.layout._getOption("originTop");
        return (
          (t = i ? t : -t),
          (e = o ? e : -e),
          "translate3d(" + t + "px, " + e + "px, 0)"
        );
      }),
      (d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (d.moveTo = d._transitionTo),
      (d.setPosition = function (t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var o = this.element.offsetHeight;
          o = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var l = "opacity," + n(a);
    (d.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        (t = "number" == typeof t ? t + "ms" : t),
          this.css({
            transitionProperty: l,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(u, this, !1);
      }
    }),
      (d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (d.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var f = { "-webkit-transform": "transform" };
    (d.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          o = f[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[o],
          i(e.ingProperties) && this.disableTransition(),
          o in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[o]),
          o in e.onEnd)
        ) {
          var n = e.onEnd[o];
          n.call(this), delete e.onEnd[o];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (d.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(u, this, !1),
          (this.isTransitioning = !1);
      }),
      (d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var c = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: "",
    };
    return (
      (d.removeTransitionStyles = function () {
        this.css(c);
      }),
      (d.stagger = function (t) {
        (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
      }),
      (d.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (d.remove = function () {
        return r && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (d.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (d.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (d.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      o
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "ev-emitter/ev-emitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, o, n, s) {
            return e(t, i, o, n, s);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, o, n) {
    "use strict";
    function s(t, e) {
      var i = o.getQueryElement(t);
      if (!i)
        return void (
          u &&
          u.error(
            "Bad element for " + this.constructor.namespace + ": " + (i || t)
          )
        );
      (this.element = i),
        h && (this.$element = h(this.element)),
        (this.options = o.extend({}, this.constructor.defaults)),
        this.option(e);
      var n = ++l;
      (this.element.outlayerGUID = n), (f[n] = this), this._create();
      var s = this._getOption("initLayout");
      s && this.layout();
    }
    function r(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    function a(t) {
      if ("number" == typeof t) return t;
      var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        o = e && e[2];
      if (!i.length) return 0;
      i = parseFloat(i);
      var n = m[o] || 1;
      return i * n;
    }
    var u = t.console,
      h = t.jQuery,
      d = function () {},
      l = 0,
      f = {};
    (s.namespace = "outlayer"),
      (s.Item = n),
      (s.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var c = s.prototype;
    o.extend(c, e.prototype),
      (c.option = function (t) {
        o.extend(this.options, t);
      }),
      (c._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (c._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
      }),
      (c.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (c._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            o = [],
            n = 0;
          n < e.length;
          n++
        ) {
          var s = e[n],
            r = new i(s, this);
          o.push(r);
        }
        return o;
      }),
      (c._filterFindItemElements = function (t) {
        return o.filterFindElements(t, this.options.itemSelector);
      }),
      (c.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (c.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (c._init = c.layout),
      (c._resetLayout = function () {
        this.getSize();
      }),
      (c.getSize = function () {
        this.size = i(this.element);
      }),
      (c._getMeasurement = function (t, e) {
        var o,
          n = this.options[t];
        n
          ? ("string" == typeof n
              ? (o = this.element.querySelector(n))
              : n instanceof HTMLElement && (o = n),
            (this[t] = o ? i(o)[e] : n))
          : (this[t] = 0);
      }),
      (c.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (c._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (c._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var o = this._getItemLayoutPosition(t);
            (o.item = t), (o.isInstant = e || t.isLayoutInstant), i.push(o);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (c._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (c._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
          }, this);
      }),
      (c.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t
          ? void (this.stagger = 0)
          : ((this.stagger = a(t)), this.stagger);
      }),
      (c._positionItem = function (t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i));
      }),
      (c._postLayout = function () {
        this.resizeContainer();
      }),
      (c.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
          var e = this._getContainerSize();
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1));
        }
      }),
      (c._getContainerSize = d),
      (c._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (c._emitCompleteOnItems = function (t, e) {
        function i() {
          n.dispatchEvent(t + "Complete", null, [e]);
        }
        function o() {
          r++, r == s && i();
        }
        var n = this,
          s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function (e) {
          e.once(t, o);
        });
      }),
      (c.dispatchEvent = function (t, e, i) {
        var o = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, o), h))
          if (((this.$element = this.$element || h(this.element)), e)) {
            var n = h.Event(e);
            (n.type = t), this.$element.trigger(n, i);
          } else this.$element.trigger(t, i);
      }),
      (c.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (c.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (c.stamp = function (t) {
        (t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
      }),
      (c.unstamp = function (t) {
        (t = this._find(t)),
          t &&
            t.forEach(function (t) {
              o.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
      }),
      (c._find = function (t) {
        if (t)
          return (
            "string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = o.makeArray(t))
          );
      }),
      (c._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (c._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (c._manageStamp = d),
      (c._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          o = this._boundingRect,
          n = i(t),
          s = {
            left: e.left - o.left - n.marginLeft,
            top: e.top - o.top - n.marginTop,
            right: o.right - e.right - n.marginRight,
            bottom: o.bottom - e.bottom - n.marginBottom,
          };
        return s;
      }),
      (c.handleEvent = o.handleEvent),
      (c.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (c.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (c.onresize = function () {
        this.resize();
      }),
      o.debounceMethod(s, "onresize", 100),
      (c.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (c.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (c.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (c.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (c.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (c.reveal = function (t) {
        if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal();
          });
        }
      }),
      (c.hide = function (t) {
        if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide();
          });
        }
      }),
      (c.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (c.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (c.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (c.getItems = function (t) {
        t = o.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (c.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), o.removeFrom(this.items, t);
            }, this);
      }),
      (c.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e],
          delete this.element.outlayerGUID,
          h && h.removeData(this.element, this.constructor.namespace);
      }),
      (s.data = function (t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e];
      }),
      (s.create = function (t, e) {
        var i = r(s);
        return (
          (i.defaults = o.extend({}, s.defaults)),
          o.extend(i.defaults, e),
          (i.compatOptions = o.extend({}, s.compatOptions)),
          (i.namespace = t),
          (i.data = s.data),
          (i.Item = r(n)),
          o.htmlInit(i, t),
          h && h.bridget && h.bridget(t, i),
          i
        );
      });
    var m = { ms: 1, s: 1e3 };
    return (s.Item = n), s;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/item", ["outlayer/outlayer"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer")))
      : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
  })(window, function (t) {
    "use strict";
    function e() {
      t.Item.apply(this, arguments);
    }
    var i = (e.prototype = Object.create(t.Item.prototype)),
      o = i._create;
    (i._create = function () {
      (this.id = this.layout.itemGUID++), o.call(this), (this.sortData = {});
    }),
      (i.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var t = this.layout.options.getSortData,
            e = this.layout._sorters;
          for (var i in t) {
            var o = e[i];
            this.sortData[i] = o(this.element, this);
          }
        }
      });
    var n = i.destroy;
    return (
      (i.destroy = function () {
        n.apply(this, arguments), this.css({ display: "" });
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope-layout/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("get-size"), require("outlayer")))
      : ((t.Isotope = t.Isotope || {}),
        (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      (this.isotope = t),
        t &&
          ((this.options = t.options[this.namespace]),
          (this.element = t.element),
          (this.items = t.filteredItems),
          (this.size = t.size));
    }
    var o = i.prototype,
      n = [
        "_resetLayout",
        "_getItemLayoutPosition",
        "_manageStamp",
        "_getContainerSize",
        "_getElementOffset",
        "needsResizeLayout",
        "_getOption",
      ];
    return (
      n.forEach(function (t) {
        o[t] = function () {
          return e.prototype[t].apply(this.isotope, arguments);
        };
      }),
      (o.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element),
          i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight;
      }),
      (o._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
      }),
      (o.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (o.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (o.getSegmentSize = function (t, e) {
        var i = t + e,
          o = "outer" + e;
        if ((this._getMeasurement(i, o), !this[i])) {
          var n = this.getFirstItemSize();
          this[i] = (n && n[o]) || this.isotope.size["inner" + e];
        }
      }),
      (o.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element);
      }),
      (o.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
      }),
      (o.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size);
      }),
      (i.modes = {}),
      (i.create = function (t, e) {
        function n() {
          i.apply(this, arguments);
        }
        return (
          (n.prototype = Object.create(o)),
          (n.prototype.constructor = n),
          e && (n.options = e),
          (n.prototype.namespace = t),
          (i.modes[t] = n),
          n
        );
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "masonry-layout/masonry",
          ["outlayer/outlayer", "get-size/get-size"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer"), require("get-size")))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return (
      (o._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        (this.maxY = 0), (this.horizontalColIndex = 0);
      }),
      (o.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var o = (this.columnWidth += this.gutter),
          n = this.containerWidth + this.gutter,
          s = n / o,
          r = o - (n % o),
          a = r && r < 1 ? "round" : "floor";
        (s = Math[a](s)), (this.cols = Math.max(s, 1));
      }),
      (o.getContainerWidth = function () {
        var t = this._getOption("fitWidth"),
          i = t ? this.element.parentNode : this.element,
          o = e(i);
        this.containerWidth = o && o.innerWidth;
      }),
      (o._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = e && e < 1 ? "round" : "ceil",
          o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (
          var n = this.options.horizontalOrder
              ? "_getHorizontalColPosition"
              : "_getTopColPosition",
            s = this[n](o, t),
            r = { x: this.columnWidth * s.col, y: s.y },
            a = s.y + t.size.outerHeight,
            u = o + s.col,
            h = s.col;
          h < u;
          h++
        )
          this.colYs[h] = a;
        return r;
      }),
      (o._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
          i = Math.min.apply(Math, e);
        return { col: e.indexOf(i), y: i };
      }),
      (o._getTopColGroup = function (t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++)
          e[o] = this._getColGroupY(o, t);
        return e;
      }),
      (o._getColGroupY = function (t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i);
      }),
      (o._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols,
          o = t > 1 && i + t > this.cols;
        i = o ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return (
          (this.horizontalColIndex = n ? i + t : this.horizontalColIndex),
          { col: i, y: this._getColGroupY(i, t) }
        );
      }),
      (o._manageStamp = function (t) {
        var i = e(t),
          o = this._getElementOffset(t),
          n = this._getOption("originLeft"),
          s = n ? o.left : o.right,
          r = s + i.outerWidth,
          a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        (u -= r % this.columnWidth ? 0 : 1), (u = Math.min(this.cols - 1, u));
        for (
          var h = this._getOption("originTop"),
            d = (h ? o.top : o.bottom) + i.outerHeight,
            l = a;
          l <= u;
          l++
        )
          this.colYs[l] = Math.max(d, this.colYs[l]);
      }),
      (o._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (o._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (o.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope-layout/js/layout-modes/masonry",
          ["../layout-mode", "masonry-layout/masonry"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          require("../layout-mode"),
          require("masonry-layout")
        ))
      : e(t.Isotope.LayoutMode, t.Masonry);
  })(window, function (t, e) {
    "use strict";
    var i = t.create("masonry"),
      o = i.prototype,
      n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function () {
      (this.items = this.isotope.filteredItems), r.call(this);
    };
    var a = o._getOption;
    return (
      (o._getOption = function (t) {
        return "fitWidth" == t
          ? void 0 !== this.options.isFitWidth
            ? this.options.isFitWidth
            : this.options.fitWidth
          : a.apply(this.isotope, arguments);
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("fitRows"),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        (this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement("gutter", "outerWidth");
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
          i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
        var o = { x: this.x, y: this.y };
        return (
          (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
          (this.x += e),
          o
        );
      }),
      (i._getContainerSize = function () {
        return { height: this.maxY };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("vertical", { horizontalAlignment: 0 }),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        this.y = 0;
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e =
            (this.isotope.size.innerWidth - t.size.outerWidth) *
            this.options.horizontalAlignment,
          i = this.y;
        return (this.y += t.size.outerHeight), { x: e, y: i };
      }),
      (i._getContainerSize = function () {
        return { height: this.y };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "desandro-matches-selector/matches-selector",
            "fizzy-ui-utils/utils",
            "isotope-layout/js/item",
            "isotope-layout/js/layout-mode",
            "isotope-layout/js/layout-modes/masonry",
            "isotope-layout/js/layout-modes/fit-rows",
            "isotope-layout/js/layout-modes/vertical",
          ],
          function (i, o, n, s, r, a) {
            return e(t, i, o, n, s, r, a);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("isotope-layout/js/item"),
          require("isotope-layout/js/layout-mode"),
          require("isotope-layout/js/layout-modes/masonry"),
          require("isotope-layout/js/layout-modes/fit-rows"),
          require("isotope-layout/js/layout-modes/vertical")
        ))
      : (t.Isotope = e(
          t,
          t.Outlayer,
          t.getSize,
          t.matchesSelector,
          t.fizzyUIUtils,
          t.Isotope.Item,
          t.Isotope.LayoutMode
        ));
  })(window, function (t, e, i, o, n, s, r) {
    function a(t, e) {
      return function (i, o) {
        for (var n = 0; n < t.length; n++) {
          var s = t[n],
            r = i.sortData[s],
            a = o.sortData[s];
          if (r > a || r < a) {
            var u = void 0 !== e[s] ? e[s] : e,
              h = u ? 1 : -1;
            return (r > a ? 1 : -1) * h;
          }
        }
        return 0;
      };
    }
    var u = t.jQuery,
      h = String.prototype.trim
        ? function (t) {
            return t.trim();
          }
        : function (t) {
            return t.replace(/^\s+|\s+$/g, "");
          },
      d = e.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (d.Item = s), (d.LayoutMode = r);
    var l = d.prototype;
    (l._create = function () {
      (this.itemGUID = 0),
        (this._sorters = {}),
        this._getSorters(),
        e.prototype._create.call(this),
        (this.modes = {}),
        (this.filteredItems = this.items),
        (this.sortHistory = ["original-order"]);
      for (var t in r.modes) this._initLayoutMode(t);
    }),
      (l.reloadItems = function () {
        (this.itemGUID = 0), e.prototype.reloadItems.call(this);
      }),
      (l._itemize = function () {
        for (
          var t = e.prototype._itemize.apply(this, arguments), i = 0;
          i < t.length;
          i++
        ) {
          var o = t[i];
          o.id = this.itemGUID++;
        }
        return this._updateItemsSortData(t), t;
      }),
      (l._initLayoutMode = function (t) {
        var e = r.modes[t],
          i = this.options[t] || {};
        (this.options[t] = e.options ? n.extend(e.options, i) : i),
          (this.modes[t] = new e(this));
      }),
      (l.layout = function () {
        return !this._isLayoutInited && this._getOption("initLayout")
          ? void this.arrange()
          : void this._layout();
      }),
      (l._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, t),
          (this._isLayoutInited = !0);
      }),
      (l.arrange = function (t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        (this.filteredItems = e.matches),
          this._bindArrangeComplete(),
          this._isInstant
            ? this._noTransition(this._hideReveal, [e])
            : this._hideReveal(e),
          this._sort(),
          this._layout();
      }),
      (l._init = l.arrange),
      (l._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide);
      }),
      (l._getIsInstant = function () {
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        return (this._isInstant = e), e;
      }),
      (l._bindArrangeComplete = function () {
        function t() {
          e &&
            i &&
            o &&
            n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
        }
        var e,
          i,
          o,
          n = this;
        this.once("layoutComplete", function () {
          (e = !0), t();
        }),
          this.once("hideComplete", function () {
            (i = !0), t();
          }),
          this.once("revealComplete", function () {
            (o = !0), t();
          });
      }),
      (l._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (
          var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0;
          r < t.length;
          r++
        ) {
          var a = t[r];
          if (!a.isIgnored) {
            var u = s(a);
            u && i.push(a),
              u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a);
          }
        }
        return { matches: i, needReveal: o, needHide: n };
      }),
      (l._getFilterTest = function (t) {
        return u && this.options.isJQueryFiltering
          ? function (e) {
              return u(e.element).is(t);
            }
          : "function" == typeof t
          ? function (e) {
              return t(e.element);
            }
          : function (e) {
              return o(e.element, t);
            };
      }),
      (l.updateSortData = function (t) {
        var e;
        t ? ((t = n.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
          this._getSorters(),
          this._updateItemsSortData(e);
      }),
      (l._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
          var i = t[e];
          this._sorters[e] = f(i);
        }
      }),
      (l._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
          var o = t[i];
          o.updateSortData();
        }
      });
    var f = (function () {
      function t(t) {
        if ("string" != typeof t) return t;
        var i = h(t).split(" "),
          o = i[0],
          n = o.match(/^\[(.+)\]$/),
          s = n && n[1],
          r = e(s, o),
          a = d.sortDataParsers[i[1]];
        return (t = a
          ? function (t) {
              return t && a(r(t));
            }
          : function (t) {
              return t && r(t);
            });
      }
      function e(t, e) {
        return t
          ? function (e) {
              return e.getAttribute(t);
            }
          : function (t) {
              var i = t.querySelector(e);
              return i && i.textContent;
            };
      }
      return t;
    })();
    (d.sortDataParsers = {
      parseInt: function (t) {
        return parseInt(t, 10);
      },
      parseFloat: function (t) {
        return parseFloat(t);
      },
    }),
      (l._sort = function () {
        if (this.options.sortBy) {
          var t = n.makeArray(this.options.sortBy);
          this._getIsSameSortBy(t) ||
            (this.sortHistory = t.concat(this.sortHistory));
          var e = a(this.sortHistory, this.options.sortAscending);
          this.filteredItems.sort(e);
        }
      }),
      (l._getIsSameSortBy = function (t) {
        for (var e = 0; e < t.length; e++)
          if (t[e] != this.sortHistory[e]) return !1;
        return !0;
      }),
      (l._mode = function () {
        var t = this.options.layoutMode,
          e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return (e.options = this.options[t]), e;
      }),
      (l._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (l._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t);
      }),
      (l._manageStamp = function (t) {
        this._mode()._manageStamp(t);
      }),
      (l._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (l.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (l.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i = this._filterRevealAdded(e);
          this.filteredItems = this.filteredItems.concat(i);
        }
      }),
      (l.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          this._resetLayout(), this._manageStamps();
          var i = this._filterRevealAdded(e);
          this.layoutItems(this.filteredItems),
            (this.filteredItems = i.concat(this.filteredItems)),
            (this.items = e.concat(this.items));
        }
      }),
      (l._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return (
          this.hide(e.needHide),
          this.reveal(e.matches),
          this.layoutItems(e.matches, !0),
          e.matches
        );
      }),
      (l.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i,
            o,
            n = e.length;
          for (i = 0; i < n; i++)
            (o = e[i]), this.element.appendChild(o.element);
          var s = this._filter(e).matches;
          for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
          for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
          this.reveal(s);
        }
      });
    var c = l.remove;
    return (
      (l.remove = function (t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
          var s = e[o];
          n.removeFrom(this.filteredItems, s);
        }
      }),
      (l.shuffle = function () {
        for (var t = 0; t < this.items.length; t++) {
          var e = this.items[t];
          e.sortData.random = Math.random();
        }
        (this.options.sortBy = "random"), this._sort(), this._layout();
      }),
      (l._noTransition = function (t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return (this.options.transitionDuration = i), o;
      }),
      (l.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
          return t.element;
        });
      }),
      d
    );
  });
// Generated by CoffeeScript 1.9.3
(function () {
  var e;
  (e = (function () {
    function e(e, t) {
      var n, r;
      this.options = {
        target: "instafeed",
        get: "popular",
        resolution: "thumbnail",
        sortBy: "none",
        links: !0,
        mock: !1,
        useHttp: !1,
      };
      if (typeof e == "object") for (n in e) (r = e[n]), (this.options[n] = r);
      (this.context = t != null ? t : this), (this.unique = this._genKey());
    }
    return (
      (e.prototype.hasNext = function () {
        return (
          typeof this.context.nextUrl == "string" &&
          this.context.nextUrl.length > 0
        );
      }),
      (e.prototype.next = function () {
        return this.hasNext() ? this.run(this.context.nextUrl) : !1;
      }),
      (e.prototype.run = function (t) {
        var n, r, i;
        if (
          typeof this.options.clientId != "string" &&
          typeof this.options.accessToken != "string"
        )
          throw new Error("Missing clientId or accessToken.");
        if (
          typeof this.options.accessToken != "string" &&
          typeof this.options.clientId != "string"
        )
          throw new Error("Missing clientId or accessToken.");
        return (
          this.options.before != null &&
            typeof this.options.before == "function" &&
            this.options.before.call(this),
          typeof document != "undefined" &&
            document !== null &&
            ((i = document.createElement("script")),
            (i.id = "instafeed-fetcher"),
            (i.src = t || this._buildUrl()),
            (n = document.getElementsByTagName("head")),
            n[0].appendChild(i),
            (r = "instafeedCache" + this.unique),
            (window[r] = new e(this.options, this)),
            (window[r].unique = this.unique)),
          !0
        );
      }),
      (e.prototype.parse = function (e) {
        var t,
          n,
          r,
          i,
          s,
          o,
          u,
          a,
          f,
          l,
          c,
          h,
          p,
          d,
          v,
          m,
          g,
          y,
          b,
          w,
          E,
          S,
          x,
          T,
          N,
          C,
          k,
          L,
          A,
          O,
          M,
          _,
          D;
        if (typeof e != "object") {
          if (
            this.options.error != null &&
            typeof this.options.error == "function"
          )
            return this.options.error.call(this, "Invalid JSON data"), !1;
          throw new Error("Invalid JSON response");
        }
        if (e.meta.code !== 200) {
          if (
            this.options.error != null &&
            typeof this.options.error == "function"
          )
            return this.options.error.call(this, e.meta.error_message), !1;
          throw new Error("Error from Instagram: " + e.meta.error_message);
        }
        if (e.data.length === 0) {
          if (
            this.options.error != null &&
            typeof this.options.error == "function"
          )
            return (
              this.options.error.call(
                this,
                "No images were returned from Instagram"
              ),
              !1
            );
          throw new Error("No images were returned from Instagram");
        }
        this.options.success != null &&
          typeof this.options.success == "function" &&
          this.options.success.call(this, e),
          (this.context.nextUrl = ""),
          e.pagination != null &&
            (this.context.nextUrl = e.pagination.next_url);
        if (this.options.sortBy !== "none") {
          this.options.sortBy === "random"
            ? (M = ["", "random"])
            : (M = this.options.sortBy.split("-")),
            (O = M[0] === "least" ? !0 : !1);
          switch (M[1]) {
            case "random":
              e.data.sort(function () {
                return 0.5 - Math.random();
              });
              break;
            case "recent":
              e.data = this._sortBy(e.data, "created_time", O);
              break;
            case "liked":
              e.data = this._sortBy(e.data, "likes.count", O);
              break;
            case "commented":
              e.data = this._sortBy(e.data, "comments.count", O);
              break;
            default:
              throw new Error(
                "Invalid option for sortBy: '" + this.options.sortBy + "'."
              );
          }
        }
        if (
          typeof document != "undefined" &&
          document !== null &&
          this.options.mock === !1
        ) {
          (m = e.data),
            (A = parseInt(this.options.limit, 10)),
            this.options.limit != null && m.length > A && (m = m.slice(0, A)),
            (u = document.createDocumentFragment()),
            this.options.filter != null &&
              typeof this.options.filter == "function" &&
              (m = this._filter(m, this.options.filter));
          if (
            this.options.template != null &&
            typeof this.options.template == "string"
          ) {
            (f = ""), (d = ""), (w = ""), (D = document.createElement("div"));
            for (c = 0, N = m.length; c < N; c++) {
              (h = m[c]), (p = h.images[this.options.resolution]);
              if (typeof p != "object")
                throw (
                  ((o =
                    "No image found for resolution: " +
                    this.options.resolution +
                    "."),
                  new Error(o))
                );
              (E = p.width),
                (y = p.height),
                (b = "square"),
                E > y && (b = "landscape"),
                E < y && (b = "portrait"),
                (v = p.url),
                (l = window.location.protocol.indexOf("http") >= 0),
                l &&
                  !this.options.useHttp &&
                  (v = v.replace(/https?:\/\//, "//")),
                (d = this._makeTemplate(this.options.template, {
                  model: h,
                  id: h.id,
                  link: h.link,
                  type: h.type,
                  image: v,
                  width: E,
                  height: y,
                  orientation: b,
                  caption: this._getObjectProperty(h, "caption.text"),
                  likes: h.likes.count,
                  comments: h.comments.count,
                  location: this._getObjectProperty(h, "location.name"),
                })),
                (f += d);
            }
            (D.innerHTML = f), (i = []), (r = 0), (n = D.childNodes.length);
            while (r < n) i.push(D.childNodes[r]), (r += 1);
            for (x = 0, C = i.length; x < C; x++) (L = i[x]), u.appendChild(L);
          } else
            for (T = 0, k = m.length; T < k; T++) {
              (h = m[T]),
                (g = document.createElement("img")),
                (p = h.images[this.options.resolution]);
              if (typeof p != "object")
                throw (
                  ((o =
                    "No image found for resolution: " +
                    this.options.resolution +
                    "."),
                  new Error(o))
                );
              (v = p.url),
                (l = window.location.protocol.indexOf("http") >= 0),
                l &&
                  !this.options.useHttp &&
                  (v = v.replace(/https?:\/\//, "//")),
                (g.src = v),
                this.options.links === !0
                  ? ((t = document.createElement("a")),
                    (t.href = h.link),
                    t.appendChild(g),
                    u.appendChild(t))
                  : u.appendChild(g);
            }
          (_ = this.options.target),
            typeof _ == "string" && (_ = document.getElementById(_));
          if (_ == null)
            throw (
              ((o =
                'No element with id="' + this.options.target + '" on page.'),
              new Error(o))
            );
          _.appendChild(u),
            (a = document.getElementsByTagName("head")[0]),
            a.removeChild(document.getElementById("instafeed-fetcher")),
            (S = "instafeedCache" + this.unique),
            (window[S] = void 0);
          try {
            delete window[S];
          } catch (P) {
            s = P;
          }
        }
        return (
          this.options.after != null &&
            typeof this.options.after == "function" &&
            this.options.after.call(this),
          !0
        );
      }),
      (e.prototype._buildUrl = function () {
        var e, t, n;
        e = "https://api.instagram.com/v1";
        switch (this.options.get) {
          case "popular":
            t = "media/popular";
            break;
          case "tagged":
            if (!this.options.tagName)
              throw new Error(
                "No tag name specified. Use the 'tagName' option."
              );
            t = "tags/" + this.options.tagName + "/media/recent";
            break;
          case "location":
            if (!this.options.locationId)
              throw new Error(
                "No location specified. Use the 'locationId' option."
              );
            t = "locations/" + this.options.locationId + "/media/recent";
            break;
          case "user":
            if (!this.options.userId)
              throw new Error("No user specified. Use the 'userId' option.");
            t = "users/" + this.options.userId + "/media/recent";
            break;
          default:
            throw new Error(
              "Invalid option for get: '" + this.options.get + "'."
            );
        }
        return (
          (n = e + "/" + t),
          this.options.accessToken != null
            ? (n += "?access_token=" + this.options.accessToken)
            : (n += "?client_id=" + this.options.clientId),
          this.options.limit != null && (n += "&count=" + this.options.limit),
          (n += "&callback=instafeedCache" + this.unique + ".parse"),
          n
        );
      }),
      (e.prototype._genKey = function () {
        var e;
        return (
          (e = function () {
            return (((1 + Math.random()) * 65536) | 0)
              .toString(16)
              .substring(1);
          }),
          "" + e() + e() + e() + e()
        );
      }),
      (e.prototype._makeTemplate = function (e, t) {
        var n, r, i, s, o;
        (r = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/), (n = e);
        while (r.test(n))
          (s = n.match(r)[1]),
            (o = (i = this._getObjectProperty(t, s)) != null ? i : ""),
            (n = n.replace(r, "" + o));
        return n;
      }),
      (e.prototype._getObjectProperty = function (e, t) {
        var n, r;
        (t = t.replace(/\[(\w+)\]/g, ".$1")), (r = t.split("."));
        while (r.length) {
          n = r.shift();
          if (!(e != null && n in e)) return null;
          e = e[n];
        }
        return e;
      }),
      (e.prototype._sortBy = function (e, t, n) {
        var r;
        return (
          (r = function (e, r) {
            var i, s;
            return (
              (i = this._getObjectProperty(e, t)),
              (s = this._getObjectProperty(r, t)),
              n ? (i > s ? 1 : -1) : i < s ? 1 : -1
            );
          }),
          e.sort(r.bind(this)),
          e
        );
      }),
      (e.prototype._filter = function (e, t) {
        var n, r, i, s, o;
        (n = []),
          (r = function (e) {
            if (t(e)) return n.push(e);
          });
        for (i = 0, o = e.length; i < o; i++) (s = e[i]), r(s);
        return n;
      }),
      e
    );
  })()),
    (function (e, t) {
      return typeof define == "function" && define.amd
        ? define([], t)
        : typeof module == "object" && module.exports
        ? (module.exports = t())
        : (e.Instafeed = t());
    })(this, function () {
      return e;
    });
}).call(this);
/*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by Hernán Sartorio  */
!(function (e) {
  e.fn.niceSelect = function (t) {
    function s(t) {
      t.after(
        e("<div></div>")
          .addClass("nice-select")
          .addClass(t.attr("class") || "")
          .addClass(t.attr("disabled") ? "disabled" : "")
          .attr("tabindex", t.attr("disabled") ? null : "0")
          .html('<span class="current"></span><ul class="list"></ul>')
      );
      var s = t.next(),
        n = t.find("option"),
        i = t.find("option:selected");
      s.find(".current").html(i.data("display") || i.text()),
        n.each(function (t) {
          var n = e(this),
            i = n.data("display");
          s.find("ul").append(
            e("<li></li>")
              .attr("data-value", n.val())
              .attr("data-display", i || null)
              .addClass(
                "option" +
                  (n.is(":selected") ? " selected" : "") +
                  (n.is(":disabled") ? " disabled" : "")
              )
              .html(n.text())
          );
        });
    }
    if ("string" == typeof t)
      return (
        "update" == t
          ? this.each(function () {
              var t = e(this),
                n = e(this).next(".nice-select"),
                i = n.hasClass("open");
              n.length && (n.remove(), s(t), i && t.next().trigger("click"));
            })
          : "destroy" == t
          ? (this.each(function () {
              var t = e(this),
                s = e(this).next(".nice-select");
              s.length && (s.remove(), t.css("display", ""));
            }),
            0 == e(".nice-select").length && e(document).off(".nice_select"))
          : console.log('Method "' + t + '" does not exist.'),
        this
      );
    this.hide(),
      this.each(function () {
        var t = e(this);
        t.next().hasClass("nice-select") || s(t);
      }),
      e(document).off(".nice_select"),
      e(document).on("click.nice_select", ".nice-select", function (t) {
        var s = e(this);
        e(".nice-select").not(s).removeClass("open"),
          s.toggleClass("open"),
          s.hasClass("open")
            ? (s.find(".option"),
              s.find(".focus").removeClass("focus"),
              s.find(".selected").addClass("focus"))
            : s.focus();
      }),
      e(document).on("click.nice_select", function (t) {
        0 === e(t.target).closest(".nice-select").length &&
          e(".nice-select").removeClass("open").find(".option");
      }),
      e(document).on(
        "click.nice_select",
        ".nice-select .option:not(.disabled)",
        function (t) {
          var s = e(this),
            n = s.closest(".nice-select");
          n.find(".selected").removeClass("selected"), s.addClass("selected");
          var i = s.data("display") || s.text();
          n.find(".current").text(i),
            n.prev("select").val(s.data("value")).trigger("change");
        }
      ),
      e(document).on("keydown.nice_select", ".nice-select", function (t) {
        var s = e(this),
          n = e(s.find(".focus") || s.find(".list .option.selected"));
        if (32 == t.keyCode || 13 == t.keyCode)
          return (
            s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1
          );
        if (40 == t.keyCode) {
          if (s.hasClass("open")) {
            var i = n.nextAll(".option:not(.disabled)").first();
            i.length > 0 &&
              (s.find(".focus").removeClass("focus"), i.addClass("focus"));
          } else s.trigger("click");
          return !1;
        }
        if (38 == t.keyCode) {
          if (s.hasClass("open")) {
            var l = n.prevAll(".option:not(.disabled)").first();
            l.length > 0 &&
              (s.find(".focus").removeClass("focus"), l.addClass("focus"));
          } else s.trigger("click");
          return !1;
        }
        if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
        else if (9 == t.keyCode && s.hasClass("open")) return !1;
      });
    var n = document.createElement("a").style;
    return (
      (n.cssText = "pointer-events:auto"),
      "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"),
      this
    );
  };
})(jQuery);
/*!
 * jQuery Form Plugin
 * version: 3.32.0-2013.04.09
 * @requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */
(function ($) {
  "use strict";

  /*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are mutually exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').on('submit', function(e) {
            e.preventDefault(); // <-- important
            $(this).ajaxSubmit({
                target: '#output'
            });
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
    form does not have to exist when you invoke ajaxForm:

    $('#myForm').ajaxForm({
        delegation: true,
        target: '#output'
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

  /**
   * Feature detection
   */
  var feature = {};
  feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
  feature.formdata = window.FormData !== undefined;

  var hasProp = !!$.fn.prop;

  // attr2 uses prop when it can but checks the return type for
  // an expected string.  this accounts for the case where a form
  // contains inputs with names like "action" or "method"; in those
  // cases "prop" returns the element
  $.fn.attr2 = function () {
    if (!hasProp) return this.attr.apply(this, arguments);
    var val = this.prop.apply(this, arguments);
    if ((val && val.jquery) || typeof val === "string") return val;
    return this.attr.apply(this, arguments);
  };

  /**
   * ajaxSubmit() provides a mechanism for immediately submitting
   * an HTML form using AJAX.
   */
  $.fn.ajaxSubmit = function (options) {
    /*jshint scripturl:true */

    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
      log("ajaxSubmit: skipping submit process - no element selected");
      return this;
    }

    var method,
      action,
      url,
      $form = this;

    if (typeof options == "function") {
      options = { success: options };
    }

    method = this.attr2("method");
    action = this.attr2("action");

    url = typeof action === "string" ? $.trim(action) : "";
    url = url || window.location.href || "";
    if (url) {
      // clean url (don't include hash vaue)
      url = (url.match(/^([^#]+)/) || [])[1];
    }

    options = $.extend(
      true,
      {
        url: url,
        success: $.ajaxSettings.success,
        type: method || "GET",
        iframeSrc: /^https/i.test(window.location.href || "")
          ? "javascript:false"
          : "about:blank",
      },
      options
    );

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger("form-pre-serialize", [this, options, veto]);
    if (veto.veto) {
      log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
      return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (
      options.beforeSerialize &&
      options.beforeSerialize(this, options) === false
    ) {
      log("ajaxSubmit: submit aborted via beforeSerialize callback");
      return this;
    }

    var traditional = options.traditional;
    if (traditional === undefined) {
      traditional = $.ajaxSettings.traditional;
    }

    var elements = [];
    var qx,
      a = this.formToArray(options.semantic, elements);
    if (options.data) {
      options.extraData = options.data;
      qx = $.param(options.data, traditional);
    }

    // give pre-submit callback an opportunity to abort the submit
    if (
      options.beforeSubmit &&
      options.beforeSubmit(a, this, options) === false
    ) {
      log("ajaxSubmit: submit aborted via beforeSubmit callback");
      return this;
    }

    // fire vetoable 'validate' event
    this.trigger("form-submit-validate", [a, this, options, veto]);
    if (veto.veto) {
      log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
      return this;
    }

    var q = $.param(a, traditional);
    if (qx) {
      q = q ? q + "&" + qx : qx;
    }
    if (options.type.toUpperCase() == "GET") {
      options.url += (options.url.indexOf("?") >= 0 ? "&" : "?") + q;
      options.data = null; // data is null for 'get'
    } else {
      options.data = q; // data is the query string for 'post'
    }

    var callbacks = [];
    if (options.resetForm) {
      callbacks.push(function () {
        $form.resetForm();
      });
    }
    if (options.clearForm) {
      callbacks.push(function () {
        $form.clearForm(options.includeHidden);
      });
    }

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
      var oldSuccess = options.success || function () {};
      callbacks.push(function (data) {
        var fn = options.replaceTarget ? "replaceWith" : "html";
        $(options.target)[fn](data).each(oldSuccess, arguments);
      });
    } else if (options.success) {
      callbacks.push(options.success);
    }

    options.success = function (data, status, xhr) {
      // jQuery 1.4+ passes xhr as 3rd arg
      var context = options.context || this; // jQuery 1.4+ supports scope context
      for (var i = 0, max = callbacks.length; i < max; i++) {
        callbacks[i].apply(context, [data, status, xhr || $form, $form]);
      }
    };

    // are there files to upload?

    // [value] (issue #113), also see comment:
    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
    var fileInputs = $('input[type=file]:enabled[value!=""]', this);

    var hasFileInputs = fileInputs.length > 0;
    var mp = "multipart/form-data";
    var multipart = $form.attr("enctype") == mp || $form.attr("encoding") == mp;

    var fileAPI = feature.fileapi && feature.formdata;
    log("fileAPI :" + fileAPI);
    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

    var jqxhr;

    // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected
    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
      // hack to fix Safari hang (thanks to Tim Molendijk for this)
      // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
      if (options.closeKeepAlive) {
        $.get(options.closeKeepAlive, function () {
          jqxhr = fileUploadIframe(a);
        });
      } else {
        jqxhr = fileUploadIframe(a);
      }
    } else if ((hasFileInputs || multipart) && fileAPI) {
      jqxhr = fileUploadXhr(a);
    } else {
      jqxhr = $.ajax(options);
    }

    $form.removeData("jqxhr").data("jqxhr", jqxhr);

    // clear element array
    for (var k = 0; k < elements.length; k++) elements[k] = null;

    // fire 'notify' event
    this.trigger("form-submit-notify", [this, options]);
    return this;

    // utility fn for deep serialization
    function deepSerialize(extraData) {
      var serialized = $.param(extraData).split("&");
      var len = serialized.length;
      var result = [];
      var i, part;
      for (i = 0; i < len; i++) {
        // #252; undo param space replacement
        serialized[i] = serialized[i].replace(/\+/g, " ");
        part = serialized[i].split("=");
        // #278; use array instead of object storage, favoring array serializations
        result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
      }
      return result;
    }

    // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
    function fileUploadXhr(a) {
      var formdata = new FormData();

      for (var i = 0; i < a.length; i++) {
        formdata.append(a[i].name, a[i].value);
      }

      if (options.extraData) {
        var serializedData = deepSerialize(options.extraData);
        for (i = 0; i < serializedData.length; i++)
          if (serializedData[i])
            formdata.append(serializedData[i][0], serializedData[i][1]);
      }

      options.data = null;

      var s = $.extend(true, {}, $.ajaxSettings, options, {
        contentType: false,
        processData: false,
        cache: false,
        type: method || "POST",
      });

      if (options.uploadProgress) {
        // workaround because jqXHR does not expose upload property
        s.xhr = function () {
          var xhr = jQuery.ajaxSettings.xhr();
          if (xhr.upload) {
            xhr.upload.addEventListener(
              "progress",
              function (event) {
                var percent = 0;
                var position =
                  event.loaded ||
                  event.position; /*event.position is deprecated*/
                var total = event.total;
                if (event.lengthComputable) {
                  percent = Math.ceil((position / total) * 100);
                }
                options.uploadProgress(event, position, total, percent);
              },
              false
            );
          }
          return xhr;
        };
      }

      s.data = null;
      var beforeSend = s.beforeSend;
      s.beforeSend = function (xhr, o) {
        o.data = formdata;
        if (beforeSend) beforeSend.call(this, xhr, o);
      };
      return $.ajax(s);
    }

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUploadIframe(a) {
      var form = $form[0],
        el,
        i,
        s,
        g,
        id,
        $io,
        io,
        xhr,
        sub,
        n,
        timedOut,
        timeoutHandle;
      var deferred = $.Deferred();

      if (a) {
        // ensure that every serialized input is still enabled
        for (i = 0; i < elements.length; i++) {
          el = $(elements[i]);
          if (hasProp) el.prop("disabled", false);
          else el.removeAttr("disabled");
        }
      }

      s = $.extend(true, {}, $.ajaxSettings, options);
      s.context = s.context || s;
      id = "jqFormIO" + new Date().getTime();
      if (s.iframeTarget) {
        $io = $(s.iframeTarget);
        n = $io.attr2("name");
        if (!n) $io.attr2("name", id);
        else id = n;
      } else {
        $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
        $io.css({ position: "absolute", top: "-1000px", left: "-1000px" });
      }
      io = $io[0];

      xhr = {
        // mock object
        aborted: 0,
        responseText: null,
        responseXML: null,
        status: 0,
        statusText: "n/a",
        getAllResponseHeaders: function () {},
        getResponseHeader: function () {},
        setRequestHeader: function () {},
        abort: function (status) {
          var e = status === "timeout" ? "timeout" : "aborted";
          log("aborting upload... " + e);
          this.aborted = 1;

          try {
            // #214, #257
            if (io.contentWindow.document.execCommand) {
              io.contentWindow.document.execCommand("Stop");
            }
          } catch (ignore) {}

          $io.attr("src", s.iframeSrc); // abort op in progress
          xhr.error = e;
          if (s.error) s.error.call(s.context, xhr, e, status);
          if (g) $.event.trigger("ajaxError", [xhr, s, e]);
          if (s.complete) s.complete.call(s.context, xhr, e);
        },
      };

      g = s.global;
      // trigger ajax global events so that activity/block indicators work like normal
      if (g && 0 === $.active++) {
        $.event.trigger("ajaxStart");
      }
      if (g) {
        $.event.trigger("ajaxSend", [xhr, s]);
      }

      if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
        if (s.global) {
          $.active--;
        }
        deferred.reject();
        return deferred;
      }
      if (xhr.aborted) {
        deferred.reject();
        return deferred;
      }

      // add submitting element to data if we know it
      sub = form.clk;
      if (sub) {
        n = sub.name;
        if (n && !sub.disabled) {
          s.extraData = s.extraData || {};
          s.extraData[n] = sub.value;
          if (sub.type == "image") {
            s.extraData[n + ".x"] = form.clk_x;
            s.extraData[n + ".y"] = form.clk_y;
          }
        }
      }

      var CLIENT_TIMEOUT_ABORT = 1;
      var SERVER_ABORT = 2;

      function getDoc(frame) {
        /* it looks like contentWindow or contentDocument do not
         * carry the protocol property in ie8, when running under ssl
         * frame.document is the only valid response document, since
         * the protocol is know but not on the other two objects. strange?
         * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
         */

        var doc = null;

        // IE8 cascading access check
        try {
          if (frame.contentWindow) {
            doc = frame.contentWindow.document;
          }
        } catch (err) {
          // IE8 access denied under ssl & missing protocol
          log("cannot get iframe.contentWindow document: " + err);
        }

        if (doc) {
          // successful getting content
          return doc;
        }

        try {
          // simply checking may throw in ie8 under ssl or mismatched protocol
          doc = frame.contentDocument ? frame.contentDocument : frame.document;
        } catch (err) {
          // last attempt
          log("cannot get iframe.contentDocument: " + err);
          doc = frame.document;
        }
        return doc;
      }

      // Rails CSRF hack (thanks to Yvan Barthelemy)
      var csrf_token = $("meta[name=csrf-token]").attr("content");
      var csrf_param = $("meta[name=csrf-param]").attr("content");
      if (csrf_param && csrf_token) {
        s.extraData = s.extraData || {};
        s.extraData[csrf_param] = csrf_token;
      }

      // take a breath so that pending repaints get some cpu time before the upload starts
      function doSubmit() {
        // make sure form attrs are set
        var t = $form.attr2("target"),
          a = $form.attr2("action");

        // update form attrs in IE friendly way
        form.setAttribute("target", id);
        if (!method) {
          form.setAttribute("method", "POST");
        }
        if (a != s.url) {
          form.setAttribute("action", s.url);
        }

        // ie borks in some cases when setting encoding
        if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
          $form.attr({
            encoding: "multipart/form-data",
            enctype: "multipart/form-data",
          });
        }

        // support timout
        if (s.timeout) {
          timeoutHandle = setTimeout(function () {
            timedOut = true;
            cb(CLIENT_TIMEOUT_ABORT);
          }, s.timeout);
        }

        // look for server aborts
        function checkState() {
          try {
            var state = getDoc(io).readyState;
            log("state = " + state);
            if (state && state.toLowerCase() == "uninitialized")
              setTimeout(checkState, 50);
          } catch (e) {
            log("Server abort: ", e, " (", e.name, ")");
            cb(SERVER_ABORT);
            if (timeoutHandle) clearTimeout(timeoutHandle);
            timeoutHandle = undefined;
          }
        }

        // add "extra" data to form if provided in options
        var extraInputs = [];
        try {
          if (s.extraData) {
            for (var n in s.extraData) {
              if (s.extraData.hasOwnProperty(n)) {
                // if using the $.param format that allows for multiple values with the same name
                if (
                  $.isPlainObject(s.extraData[n]) &&
                  s.extraData[n].hasOwnProperty("name") &&
                  s.extraData[n].hasOwnProperty("value")
                ) {
                  extraInputs.push(
                    $(
                      '<input type="hidden" name="' + s.extraData[n].name + '">'
                    )
                      .val(s.extraData[n].value)
                      .appendTo(form)[0]
                  );
                } else {
                  extraInputs.push(
                    $('<input type="hidden" name="' + n + '">')
                      .val(s.extraData[n])
                      .appendTo(form)[0]
                  );
                }
              }
            }
          }

          if (!s.iframeTarget) {
            // add iframe to doc and submit the form
            $io.appendTo("body");
            if (io.attachEvent) io.attachEvent("onload", cb);
            else io.addEventListener("load", cb, false);
          }
          setTimeout(checkState, 15);

          try {
            form.submit();
          } catch (err) {
            // just in case form has element with name/id of 'submit'
            var submitFn = document.createElement("form").submit;
            submitFn.apply(form);
          }
        } finally {
          // reset attrs and remove "extra" input elements
          form.setAttribute("action", a);
          if (t) {
            form.setAttribute("target", t);
          } else {
            $form.removeAttr("target");
          }
          $(extraInputs).remove();
        }
      }

      if (s.forceSync) {
        doSubmit();
      } else {
        setTimeout(doSubmit, 10); // this lets dom updates render
      }

      var data,
        doc,
        domCheckCount = 50,
        callbackProcessed;

      function cb(e) {
        if (xhr.aborted || callbackProcessed) {
          return;
        }

        doc = getDoc(io);
        if (!doc) {
          log("cannot access response document");
          e = SERVER_ABORT;
        }
        if (e === CLIENT_TIMEOUT_ABORT && xhr) {
          xhr.abort("timeout");
          deferred.reject(xhr, "timeout");
          return;
        } else if (e == SERVER_ABORT && xhr) {
          xhr.abort("server abort");
          deferred.reject(xhr, "error", "server abort");
          return;
        }

        if (!doc || doc.location.href == s.iframeSrc) {
          // response not received yet
          if (!timedOut) return;
        }
        if (io.detachEvent) io.detachEvent("onload", cb);
        else io.removeEventListener("load", cb, false);

        var status = "success",
          errMsg;
        try {
          if (timedOut) {
            throw "timeout";
          }

          var isXml = s.dataType == "xml" || doc.XMLDocument || $.isXMLDoc(doc);
          log("isXml=" + isXml);
          if (
            !isXml &&
            window.opera &&
            (doc.body === null || !doc.body.innerHTML)
          ) {
            if (--domCheckCount) {
              // in some browsers (Opera) the iframe DOM is not always traversable when
              // the onload callback fires, so we loop a bit to accommodate
              log("requeing onLoad callback, DOM not available");
              setTimeout(cb, 250);
              return;
            }
            // let this fall through because server response could be an empty document
            //log('Could not access iframe DOM after mutiple tries.');
            //throw 'DOMException: not available';
          }

          //log('response detected');
          var docRoot = doc.body ? doc.body : doc.documentElement;
          xhr.responseText = docRoot ? docRoot.innerHTML : null;
          xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
          if (isXml) s.dataType = "xml";
          xhr.getResponseHeader = function (header) {
            var headers = { "content-type": s.dataType };
            return headers[header];
          };
          // support for XHR 'status' & 'statusText' emulation :
          if (docRoot) {
            xhr.status = Number(docRoot.getAttribute("status")) || xhr.status;
            xhr.statusText =
              docRoot.getAttribute("statusText") || xhr.statusText;
          }

          var dt = (s.dataType || "").toLowerCase();
          var scr = /(json|script|text)/.test(dt);
          if (scr || s.textarea) {
            // see if user embedded response in textarea
            var ta = doc.getElementsByTagName("textarea")[0];
            if (ta) {
              xhr.responseText = ta.value;
              // support for XHR 'status' & 'statusText' emulation :
              xhr.status = Number(ta.getAttribute("status")) || xhr.status;
              xhr.statusText = ta.getAttribute("statusText") || xhr.statusText;
            } else if (scr) {
              // account for browsers injecting pre around json response
              var pre = doc.getElementsByTagName("pre")[0];
              var b = doc.getElementsByTagName("body")[0];
              if (pre) {
                xhr.responseText = pre.textContent
                  ? pre.textContent
                  : pre.innerText;
              } else if (b) {
                xhr.responseText = b.textContent ? b.textContent : b.innerText;
              }
            }
          } else if (dt == "xml" && !xhr.responseXML && xhr.responseText) {
            xhr.responseXML = toXml(xhr.responseText);
          }

          try {
            data = httpData(xhr, dt, s);
          } catch (err) {
            status = "parsererror";
            xhr.error = errMsg = err || status;
          }
        } catch (err) {
          log("error caught: ", err);
          status = "error";
          xhr.error = errMsg = err || status;
        }

        if (xhr.aborted) {
          log("upload aborted");
          status = null;
        }

        if (xhr.status) {
          // we've set xhr.status
          status =
            (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304
              ? "success"
              : "error";
        }

        // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
        if (status === "success") {
          if (s.success) s.success.call(s.context, data, "success", xhr);
          deferred.resolve(xhr.responseText, "success", xhr);
          if (g) $.event.trigger("ajaxSuccess", [xhr, s]);
        } else if (status) {
          if (errMsg === undefined) errMsg = xhr.statusText;
          if (s.error) s.error.call(s.context, xhr, status, errMsg);
          deferred.reject(xhr, "error", errMsg);
          if (g) $.event.trigger("ajaxError", [xhr, s, errMsg]);
        }

        if (g) $.event.trigger("ajaxComplete", [xhr, s]);

        if (g && !--$.active) {
          $.event.trigger("ajaxStop");
        }

        if (s.complete) s.complete.call(s.context, xhr, status);

        callbackProcessed = true;
        if (s.timeout) clearTimeout(timeoutHandle);

        // clean up
        setTimeout(function () {
          if (!s.iframeTarget) $io.remove();
          xhr.responseXML = null;
        }, 100);
      }

      var toXml =
        $.parseXML ||
        function (s, doc) {
          // use parseXML if available (jQuery 1.5+)
          if (window.ActiveXObject) {
            doc = new ActiveXObject("Microsoft.XMLDOM");
            doc.async = "false";
            doc.loadXML(s);
          } else {
            doc = new DOMParser().parseFromString(s, "text/xml");
          }
          return doc &&
            doc.documentElement &&
            doc.documentElement.nodeName != "parsererror"
            ? doc
            : null;
        };
      var parseJSON =
        $.parseJSON ||
        function (s) {
          /*jslint evil:true */
          return window["eval"]("(" + s + ")");
        };

      var httpData = function (xhr, type, s) {
        // mostly lifted from jq1.4.4

        var ct = xhr.getResponseHeader("content-type") || "",
          xml = type === "xml" || (!type && ct.indexOf("xml") >= 0),
          data = xml ? xhr.responseXML : xhr.responseText;

        if (xml && data.documentElement.nodeName === "parsererror") {
          if ($.error) $.error("parsererror");
        }
        if (s && s.dataFilter) {
          data = s.dataFilter(data, type);
        }
        if (typeof data === "string") {
          if (type === "json" || (!type && ct.indexOf("json") >= 0)) {
            data = parseJSON(data);
          } else if (
            type === "script" ||
            (!type && ct.indexOf("javascript") >= 0)
          ) {
            $.globalEval(data);
          }
        }
        return data;
      };

      return deferred;
    }
  };

  /**
   * ajaxForm() provides a mechanism for fully automating form submission.
   *
   * The advantages of using this method instead of ajaxSubmit() are:
   *
   * 1: This method will include coordinates for <input type="image" /> elements (if the element
   *    is used to submit the form).
   * 2. This method will include the submit element's name/value data (for the element that was
   *    used to submit the form).
   * 3. This method binds the submit() method to the form for you.
   *
   * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
   * passes the options argument along after properly binding events for submit elements and
   * the form itself.
   */
  $.fn.ajaxForm = function (options) {
    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on);

    // in jQuery 1.3+ we can fix mistakes with the ready state
    if (!options.delegation && this.length === 0) {
      var o = { s: this.selector, c: this.context };
      if (!$.isReady && o.s) {
        log("DOM not ready, queuing ajaxForm");
        $(function () {
          $(o.s, o.c).ajaxForm(options);
        });
        return this;
      }
      // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
      log(
        "terminating; zero elements found by selector" +
          ($.isReady ? "" : " (DOM not ready)")
      );
      return this;
    }

    if (options.delegation) {
      $(document)
        .off("submit.form-plugin", this.selector, doAjaxSubmit)
        .off("click.form-plugin", this.selector, captureSubmittingElement)
        .on("submit.form-plugin", this.selector, options, doAjaxSubmit)
        .on(
          "click.form-plugin",
          this.selector,
          options,
          captureSubmittingElement
        );
      return this;
    }

    return this.ajaxFormUnbind()
      .bind("submit.form-plugin", options, doAjaxSubmit)
      .bind("click.form-plugin", options, captureSubmittingElement);
  };

  // private event handlers
  function doAjaxSubmit(e) {
    /*jshint validthis:true */
    var options = e.data;
    if (!e.isDefaultPrevented()) {
      // if event has been canceled, don't proceed
      e.preventDefault();
      $(this).ajaxSubmit(options);
    }
  }

  function captureSubmittingElement(e) {
    /*jshint validthis:true */
    var target = e.target;
    var $el = $(target);
    if (!$el.is("[type=submit],[type=image]")) {
      // is this a child element of the submit el?  (ex: a span within a button)
      var t = $el.closest("[type=submit]");
      if (t.length === 0) {
        return;
      }
      target = t[0];
    }
    var form = this;
    form.clk = target;
    if (target.type == "image") {
      if (e.offsetX !== undefined) {
        form.clk_x = e.offsetX;
        form.clk_y = e.offsetY;
      } else if (typeof $.fn.offset == "function") {
        var offset = $el.offset();
        form.clk_x = e.pageX - offset.left;
        form.clk_y = e.pageY - offset.top;
      } else {
        form.clk_x = e.pageX - target.offsetLeft;
        form.clk_y = e.pageY - target.offsetTop;
      }
    }
    // clear form vars
    setTimeout(function () {
      form.clk = form.clk_x = form.clk_y = null;
    }, 100);
  }

  // ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
  $.fn.ajaxFormUnbind = function () {
    return this.unbind("submit.form-plugin click.form-plugin");
  };

  /**
   * formToArray() gathers form element data into an array of objects that can
   * be passed to any of the following ajax functions: $.get, $.post, or load.
   * Each object in the array has both a 'name' and 'value' property.  An example of
   * an array for a simple login form might be:
   *
   * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
   *
   * It is this array that is passed to pre-submit callback functions provided to the
   * ajaxSubmit() and ajaxForm() methods.
   */
  $.fn.formToArray = function (semantic, elements) {
    var a = [];
    if (this.length === 0) {
      return a;
    }

    var form = this[0];
    var els = semantic ? form.getElementsByTagName("*") : form.elements;
    if (!els) {
      return a;
    }

    var i, j, n, v, el, max, jmax;
    for (i = 0, max = els.length; i < max; i++) {
      el = els[i];
      n = el.name;
      if (!n || el.disabled) {
        continue;
      }

      if (semantic && form.clk && el.type == "image") {
        // handle image inputs on the fly when semantic == true
        if (form.clk == el) {
          a.push({ name: n, value: $(el).val(), type: el.type });
          a.push(
            { name: n + ".x", value: form.clk_x },
            { name: n + ".y", value: form.clk_y }
          );
        }
        continue;
      }

      v = $.fieldValue(el, true);
      if (v && v.constructor == Array) {
        if (elements) elements.push(el);
        for (j = 0, jmax = v.length; j < jmax; j++) {
          a.push({ name: n, value: v[j] });
        }
      } else if (feature.fileapi && el.type == "file") {
        if (elements) elements.push(el);
        var files = el.files;
        if (files.length) {
          for (j = 0; j < files.length; j++) {
            a.push({ name: n, value: files[j], type: el.type });
          }
        } else {
          // #180
          a.push({ name: n, value: "", type: el.type });
        }
      } else if (v !== null && typeof v != "undefined") {
        if (elements) elements.push(el);
        a.push({ name: n, value: v, type: el.type, required: el.required });
      }
    }

    if (!semantic && form.clk) {
      // input type=='image' are not found in elements array! handle it here
      var $input = $(form.clk),
        input = $input[0];
      n = input.name;
      if (n && !input.disabled && input.type == "image") {
        a.push({ name: n, value: $input.val() });
        a.push(
          { name: n + ".x", value: form.clk_x },
          { name: n + ".y", value: form.clk_y }
        );
      }
    }
    return a;
  };

  /**
   * Serializes form data into a 'submittable' string. This method will return a string
   * in the format: name1=value1&amp;name2=value2
   */
  $.fn.formSerialize = function (semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
  };

  /**
   * Serializes all field elements in the jQuery object into a query string.
   * This method will return a string in the format: name1=value1&amp;name2=value2
   */
  $.fn.fieldSerialize = function (successful) {
    var a = [];
    this.each(function () {
      var n = this.name;
      if (!n) {
        return;
      }
      var v = $.fieldValue(this, successful);
      if (v && v.constructor == Array) {
        for (var i = 0, max = v.length; i < max; i++) {
          a.push({ name: n, value: v[i] });
        }
      } else if (v !== null && typeof v != "undefined") {
        a.push({ name: this.name, value: v });
      }
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
  };

  /**
   * Returns the value(s) of the element in the matched set.  For example, consider the following form:
   *
   *  <form><fieldset>
   *      <input name="A" type="text" />
   *      <input name="A" type="text" />
   *      <input name="B" type="checkbox" value="B1" />
   *      <input name="B" type="checkbox" value="B2"/>
   *      <input name="C" type="radio" value="C1" />
   *      <input name="C" type="radio" value="C2" />
   *  </fieldset></form>
   *
   *  var v = $('input[type=text]').fieldValue();
   *  // if no values are entered into the text inputs
   *  v == ['','']
   *  // if values entered into the text inputs are 'foo' and 'bar'
   *  v == ['foo','bar']
   *
   *  var v = $('input[type=checkbox]').fieldValue();
   *  // if neither checkbox is checked
   *  v === undefined
   *  // if both checkboxes are checked
   *  v == ['B1', 'B2']
   *
   *  var v = $('input[type=radio]').fieldValue();
   *  // if neither radio is checked
   *  v === undefined
   *  // if first radio is checked
   *  v == ['C1']
   *
   * The successful argument controls whether or not the field element must be 'successful'
   * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
   * The default value of the successful argument is true.  If this value is false the value(s)
   * for each element is returned.
   *
   * Note: This method *always* returns an array.  If no valid value can be determined the
   *    array will be empty, otherwise it will contain one or more values.
   */
  $.fn.fieldValue = function (successful) {
    for (var val = [], i = 0, max = this.length; i < max; i++) {
      var el = this[i];
      var v = $.fieldValue(el, successful);
      if (
        v === null ||
        typeof v == "undefined" ||
        (v.constructor == Array && !v.length)
      ) {
        continue;
      }
      if (v.constructor == Array) $.merge(val, v);
      else val.push(v);
    }
    return val;
  };

  /**
   * Returns the value of the field element.
   */
  $.fieldValue = function (el, successful) {
    var n = el.name,
      t = el.type,
      tag = el.tagName.toLowerCase();
    if (successful === undefined) {
      successful = true;
    }

    if (
      successful &&
      (!n ||
        el.disabled ||
        t == "reset" ||
        t == "button" ||
        ((t == "checkbox" || t == "radio") && !el.checked) ||
        ((t == "submit" || t == "image") && el.form && el.form.clk != el) ||
        (tag == "select" && el.selectedIndex == -1))
    ) {
      return null;
    }

    if (tag == "select") {
      var index = el.selectedIndex;
      if (index < 0) {
        return null;
      }
      var a = [],
        ops = el.options;
      var one = t == "select-one";
      var max = one ? index + 1 : ops.length;
      for (var i = one ? index : 0; i < max; i++) {
        var op = ops[i];
        if (op.selected) {
          var v = op.value;
          if (!v) {
            // extra pain for IE...
            v =
              op.attributes &&
              op.attributes["value"] &&
              !op.attributes["value"].specified
                ? op.text
                : op.value;
          }
          if (one) {
            return v;
          }
          a.push(v);
        }
      }
      return a;
    }
    return $(el).val();
  };

  /**
   * Clears the form data.  Takes the following actions on the form's input fields:
   *  - input text fields will have their 'value' property set to the empty string
   *  - select elements will have their 'selectedIndex' property set to -1
   *  - checkbox and radio inputs will have their 'checked' property set to false
   *  - inputs of type submit, button, reset, and hidden will *not* be effected
   *  - button elements will *not* be effected
   */
  $.fn.clearForm = function (includeHidden) {
    return this.each(function () {
      $("input,select,textarea", this).clearFields(includeHidden);
    });
  };

  /**
   * Clears the selected form elements.
   */
  $.fn.clearFields = $.fn.clearInputs = function (includeHidden) {
    var re =
      /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function () {
      var t = this.type,
        tag = this.tagName.toLowerCase();
      if (re.test(t) || tag == "textarea") {
        this.value = "";
      } else if (t == "checkbox" || t == "radio") {
        this.checked = false;
      } else if (tag == "select") {
        this.selectedIndex = -1;
      } else if (t == "file") {
        if (/MSIE/.test(navigator.userAgent)) {
          $(this).replaceWith($(this).clone(true));
        } else {
          $(this).val("");
        }
      } else if (includeHidden) {
        // includeHidden can be the value true, or it can be a selector string
        // indicating a special test; for example:
        //  $('#myForm').clearForm('.special:hidden')
        // the above would clean hidden inputs that have the class of 'special'
        if (
          (includeHidden === true && /hidden/.test(t)) ||
          (typeof includeHidden == "string" && $(this).is(includeHidden))
        )
          this.value = "";
      }
    });
  };

  /**
   * Resets the form data.  Causes all form elements to be reset to their original value.
   */
  $.fn.resetForm = function () {
    return this.each(function () {
      // guard against an input with the name of 'reset'
      // note that IE reports the reset function as an 'object'
      if (
        typeof this.reset == "function" ||
        (typeof this.reset == "object" && !this.reset.nodeType)
      ) {
        this.reset();
      }
    });
  };

  /**
   * Enables or disables any matching elements.
   */
  $.fn.enable = function (b) {
    if (b === undefined) {
      b = true;
    }
    return this.each(function () {
      this.disabled = !b;
    });
  };

  /**
   * Checks/unchecks any matching checkboxes or radio buttons and
   * selects/deselects and matching option elements.
   */
  $.fn.selected = function (select) {
    if (select === undefined) {
      select = true;
    }
    return this.each(function () {
      var t = this.type;
      if (t == "checkbox" || t == "radio") {
        this.checked = select;
      } else if (this.tagName.toLowerCase() == "option") {
        var $sel = $(this).parent("select");
        if (select && $sel[0] && $sel[0].type == "select-one") {
          // deselect all other options
          $sel.find("option").selected(false);
        }
        this.selected = select;
      }
    });
  };

  // expose debug var
  $.fn.ajaxSubmit.debug = false;

  // helper fn for console logging
  function log() {
    if (!$.fn.ajaxSubmit.debug) return;
    var msg = "[jquery.form] " + Array.prototype.join.call(arguments, "");
    if (window.console && window.console.log) {
      window.console.log(msg);
    } else if (window.opera && window.opera.postError) {
      window.opera.postError(msg);
    }
  }
})(jQuery);

/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
 * Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */ (function (t) {
  t.extend(t.fn, {
    validate: function (e) {
      if (!this.length)
        return (
          e &&
            e.debug &&
            window.console &&
            console.warn(
              "Nothing selected, can't validate, returning nothing."
            ),
          void 0
        );
      var i = t.data(this[0], "validator");
      return i
        ? i
        : (this.attr("novalidate", "novalidate"),
          (i = new t.validator(e, this[0])),
          t.data(this[0], "validator", i),
          i.settings.onsubmit &&
            (this.validateDelegate(":submit", "click", function (e) {
              i.settings.submitHandler && (i.submitButton = e.target),
                t(e.target).hasClass("cancel") && (i.cancelSubmit = !0),
                void 0 !== t(e.target).attr("formnovalidate") &&
                  (i.cancelSubmit = !0);
            }),
            this.submit(function (e) {
              function s() {
                var s;
                return i.settings.submitHandler
                  ? (i.submitButton &&
                      (s = t("<input type='hidden'/>")
                        .attr("name", i.submitButton.name)
                        .val(t(i.submitButton).val())
                        .appendTo(i.currentForm)),
                    i.settings.submitHandler.call(i, i.currentForm, e),
                    i.submitButton && s.remove(),
                    !1)
                  : !0;
              }
              return (
                i.settings.debug && e.preventDefault(),
                i.cancelSubmit
                  ? ((i.cancelSubmit = !1), s())
                  : i.form()
                  ? i.pendingRequest
                    ? ((i.formSubmitted = !0), !1)
                    : s()
                  : (i.focusInvalid(), !1)
              );
            })),
          i);
    },
    valid: function () {
      if (t(this[0]).is("form")) return this.validate().form();
      var e = !0,
        i = t(this[0].form).validate();
      return (
        this.each(function () {
          e = e && i.element(this);
        }),
        e
      );
    },
    removeAttrs: function (e) {
      var i = {},
        s = this;
      return (
        t.each(e.split(/\s/), function (t, e) {
          (i[e] = s.attr(e)), s.removeAttr(e);
        }),
        i
      );
    },
    rules: function (e, i) {
      var s = this[0];
      if (e) {
        var r = t.data(s.form, "validator").settings,
          n = r.rules,
          a = t.validator.staticRules(s);
        switch (e) {
          case "add":
            t.extend(a, t.validator.normalizeRule(i)),
              delete a.messages,
              (n[s.name] = a),
              i.messages &&
                (r.messages[s.name] = t.extend(r.messages[s.name], i.messages));
            break;
          case "remove":
            if (!i) return delete n[s.name], a;
            var u = {};
            return (
              t.each(i.split(/\s/), function (t, e) {
                (u[e] = a[e]), delete a[e];
              }),
              u
            );
        }
      }
      var o = t.validator.normalizeRules(
        t.extend(
          {},
          t.validator.classRules(s),
          t.validator.attributeRules(s),
          t.validator.dataRules(s),
          t.validator.staticRules(s)
        ),
        s
      );
      if (o.required) {
        var l = o.required;
        delete o.required, (o = t.extend({ required: l }, o));
      }
      return o;
    },
  }),
    t.extend(t.expr[":"], {
      blank: function (e) {
        return !t.trim("" + t(e).val());
      },
      filled: function (e) {
        return !!t.trim("" + t(e).val());
      },
      unchecked: function (e) {
        return !t(e).prop("checked");
      },
    }),
    (t.validator = function (e, i) {
      (this.settings = t.extend(!0, {}, t.validator.defaults, e)),
        (this.currentForm = i),
        this.init();
    }),
    (t.validator.format = function (e, i) {
      return 1 === arguments.length
        ? function () {
            var i = t.makeArray(arguments);
            return i.unshift(e), t.validator.format.apply(this, i);
          }
        : (arguments.length > 2 &&
            i.constructor !== Array &&
            (i = t.makeArray(arguments).slice(1)),
          i.constructor !== Array && (i = [i]),
          t.each(i, function (t, i) {
            e = e.replace(RegExp("\\{" + t + "\\}", "g"), function () {
              return i;
            });
          }),
          e);
    }),
    t.extend(t.validator, {
      defaults: {
        messages: {},
        groups: {},
        rules: {},
        errorClass: "error",
        validClass: "valid",
        errorElement: "label",
        focusInvalid: !0,
        errorContainer: t([]),
        errorLabelContainer: t([]),
        onsubmit: !0,
        ignore: ":hidden",
        ignoreTitle: !1,
        onfocusin: function (t) {
          (this.lastActive = t),
            this.settings.focusCleanup &&
              !this.blockFocusCleanup &&
              (this.settings.unhighlight &&
                this.settings.unhighlight.call(
                  this,
                  t,
                  this.settings.errorClass,
                  this.settings.validClass
                ),
              this.addWrapper(this.errorsFor(t)).hide());
        },
        onfocusout: function (t) {
          this.checkable(t) ||
            (!(t.name in this.submitted) && this.optional(t)) ||
            this.element(t);
        },
        onkeyup: function (t, e) {
          (9 !== e.which || "" !== this.elementValue(t)) &&
            (t.name in this.submitted || t === this.lastElement) &&
            this.element(t);
        },
        onclick: function (t) {
          t.name in this.submitted
            ? this.element(t)
            : t.parentNode.name in this.submitted && this.element(t.parentNode);
        },
        highlight: function (e, i, s) {
          "radio" === e.type
            ? this.findByName(e.name).addClass(i).removeClass(s)
            : t(e).addClass(i).removeClass(s);
        },
        unhighlight: function (e, i, s) {
          "radio" === e.type
            ? this.findByName(e.name).removeClass(i).addClass(s)
            : t(e).removeClass(i).addClass(s);
        },
      },
      setDefaults: function (e) {
        t.extend(t.validator.defaults, e);
      },
      messages: {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        maxlength: t.validator.format(
          "Please enter no more than {0} characters."
        ),
        minlength: t.validator.format("Please enter at least {0} characters."),
        rangelength: t.validator.format(
          "Please enter a value between {0} and {1} characters long."
        ),
        range: t.validator.format("Please enter a value between {0} and {1}."),
        max: t.validator.format(
          "Please enter a value less than or equal to {0}."
        ),
        min: t.validator.format(
          "Please enter a value greater than or equal to {0}."
        ),
      },
      autoCreateRanges: !1,
      prototype: {
        init: function () {
          function e(e) {
            var i = t.data(this[0].form, "validator"),
              s = "on" + e.type.replace(/^validate/, "");
            i.settings[s] && i.settings[s].call(i, this[0], e);
          }
          (this.labelContainer = t(this.settings.errorLabelContainer)),
            (this.errorContext =
              (this.labelContainer.length && this.labelContainer) ||
              t(this.currentForm)),
            (this.containers = t(this.settings.errorContainer).add(
              this.settings.errorLabelContainer
            )),
            (this.submitted = {}),
            (this.valueCache = {}),
            (this.pendingRequest = 0),
            (this.pending = {}),
            (this.invalid = {}),
            this.reset();
          var i = (this.groups = {});
          t.each(this.settings.groups, function (e, s) {
            "string" == typeof s && (s = s.split(/\s/)),
              t.each(s, function (t, s) {
                i[s] = e;
              });
          });
          var s = this.settings.rules;
          t.each(s, function (e, i) {
            s[e] = t.validator.normalizeRule(i);
          }),
            t(this.currentForm)
              .validateDelegate(
                ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ",
                "focusin focusout keyup",
                e
              )
              .validateDelegate(
                "[type='radio'], [type='checkbox'], select, option",
                "click",
                e
              ),
            this.settings.invalidHandler &&
              t(this.currentForm).bind(
                "invalid-form.validate",
                this.settings.invalidHandler
              );
        },
        form: function () {
          return (
            this.checkForm(),
            t.extend(this.submitted, this.errorMap),
            (this.invalid = t.extend({}, this.errorMap)),
            this.valid() ||
              t(this.currentForm).triggerHandler("invalid-form", [this]),
            this.showErrors(),
            this.valid()
          );
        },
        checkForm: function () {
          this.prepareForm();
          for (
            var t = 0, e = (this.currentElements = this.elements());
            e[t];
            t++
          )
            this.check(e[t]);
          return this.valid();
        },
        element: function (e) {
          (e = this.validationTargetFor(this.clean(e))),
            (this.lastElement = e),
            this.prepareElement(e),
            (this.currentElements = t(e));
          var i = this.check(e) !== !1;
          return (
            i ? delete this.invalid[e.name] : (this.invalid[e.name] = !0),
            this.numberOfInvalids() ||
              (this.toHide = this.toHide.add(this.containers)),
            this.showErrors(),
            i
          );
        },
        showErrors: function (e) {
          if (e) {
            t.extend(this.errorMap, e), (this.errorList = []);
            for (var i in e)
              this.errorList.push({
                message: e[i],
                element: this.findByName(i)[0],
              });
            this.successList = t.grep(this.successList, function (t) {
              return !(t.name in e);
            });
          }
          this.settings.showErrors
            ? this.settings.showErrors.call(this, this.errorMap, this.errorList)
            : this.defaultShowErrors();
        },
        resetForm: function () {
          t.fn.resetForm && t(this.currentForm).resetForm(),
            (this.submitted = {}),
            (this.lastElement = null),
            this.prepareForm(),
            this.hideErrors(),
            this.elements()
              .removeClass(this.settings.errorClass)
              .removeData("previousValue");
        },
        numberOfInvalids: function () {
          return this.objectLength(this.invalid);
        },
        objectLength: function (t) {
          var e = 0;
          for (var i in t) e++;
          return e;
        },
        hideErrors: function () {
          this.addWrapper(this.toHide).hide();
        },
        valid: function () {
          return 0 === this.size();
        },
        size: function () {
          return this.errorList.length;
        },
        focusInvalid: function () {
          if (this.settings.focusInvalid)
            try {
              t(
                this.findLastActive() ||
                  (this.errorList.length && this.errorList[0].element) ||
                  []
              )
                .filter(":visible")
                .focus()
                .trigger("focusin");
            } catch (e) {}
        },
        findLastActive: function () {
          var e = this.lastActive;
          return (
            e &&
            1 ===
              t.grep(this.errorList, function (t) {
                return t.element.name === e.name;
              }).length &&
            e
          );
        },
        elements: function () {
          var e = this,
            i = {};
          return t(this.currentForm)
            .find("input, select, textarea")
            .not(":submit, :reset, :image, [disabled]")
            .not(this.settings.ignore)
            .filter(function () {
              return (
                !this.name &&
                  e.settings.debug &&
                  window.console &&
                  console.error("%o has no name assigned", this),
                this.name in i || !e.objectLength(t(this).rules())
                  ? !1
                  : ((i[this.name] = !0), !0)
              );
            });
        },
        clean: function (e) {
          return t(e)[0];
        },
        errors: function () {
          var e = this.settings.errorClass.replace(" ", ".");
          return t(this.settings.errorElement + "." + e, this.errorContext);
        },
        reset: function () {
          (this.successList = []),
            (this.errorList = []),
            (this.errorMap = {}),
            (this.toShow = t([])),
            (this.toHide = t([])),
            (this.currentElements = t([]));
        },
        prepareForm: function () {
          this.reset(), (this.toHide = this.errors().add(this.containers));
        },
        prepareElement: function (t) {
          this.reset(), (this.toHide = this.errorsFor(t));
        },
        elementValue: function (e) {
          var i = t(e).attr("type"),
            s = t(e).val();
          return "radio" === i || "checkbox" === i
            ? t("input[name='" + t(e).attr("name") + "']:checked").val()
            : "string" == typeof s
            ? s.replace(/\r/g, "")
            : s;
        },
        check: function (e) {
          e = this.validationTargetFor(this.clean(e));
          var i,
            s = t(e).rules(),
            r = !1,
            n = this.elementValue(e);
          for (var a in s) {
            var u = { method: a, parameters: s[a] };
            try {
              if (
                ((i = t.validator.methods[a].call(this, n, e, u.parameters)),
                "dependency-mismatch" === i)
              ) {
                r = !0;
                continue;
              }
              if (((r = !1), "pending" === i))
                return (
                  (this.toHide = this.toHide.not(this.errorsFor(e))), void 0
                );
              if (!i) return this.formatAndAdd(e, u), !1;
            } catch (o) {
              throw (
                (this.settings.debug &&
                  window.console &&
                  console.log(
                    "Exception occurred when checking element " +
                      e.id +
                      ", check the '" +
                      u.method +
                      "' method.",
                    o
                  ),
                o)
              );
            }
          }
          return r
            ? void 0
            : (this.objectLength(s) && this.successList.push(e), !0);
        },
        customDataMessage: function (e, i) {
          return (
            t(e).data("msg-" + i.toLowerCase()) ||
            (e.attributes && t(e).attr("data-msg-" + i.toLowerCase()))
          );
        },
        customMessage: function (t, e) {
          var i = this.settings.messages[t];
          return i && (i.constructor === String ? i : i[e]);
        },
        findDefined: function () {
          for (var t = 0; arguments.length > t; t++)
            if (void 0 !== arguments[t]) return arguments[t];
          return void 0;
        },
        defaultMessage: function (e, i) {
          return this.findDefined(
            this.customMessage(e.name, i),
            this.customDataMessage(e, i),
            (!this.settings.ignoreTitle && e.title) || void 0,
            t.validator.messages[i],
            "<strong>Warning: No message defined for " + e.name + "</strong>"
          );
        },
        formatAndAdd: function (e, i) {
          var s = this.defaultMessage(e, i.method),
            r = /\$?\{(\d+)\}/g;
          "function" == typeof s
            ? (s = s.call(this, i.parameters, e))
            : r.test(s) &&
              (s = t.validator.format(s.replace(r, "{$1}"), i.parameters)),
            this.errorList.push({ message: s, element: e }),
            (this.errorMap[e.name] = s),
            (this.submitted[e.name] = s);
        },
        addWrapper: function (t) {
          return (
            this.settings.wrapper &&
              (t = t.add(t.parent(this.settings.wrapper))),
            t
          );
        },
        defaultShowErrors: function () {
          var t, e;
          for (t = 0; this.errorList[t]; t++) {
            var i = this.errorList[t];
            this.settings.highlight &&
              this.settings.highlight.call(
                this,
                i.element,
                this.settings.errorClass,
                this.settings.validClass
              ),
              this.showLabel(i.element, i.message);
          }
          if (
            (this.errorList.length &&
              (this.toShow = this.toShow.add(this.containers)),
            this.settings.success)
          )
            for (t = 0; this.successList[t]; t++)
              this.showLabel(this.successList[t]);
          if (this.settings.unhighlight)
            for (t = 0, e = this.validElements(); e[t]; t++)
              this.settings.unhighlight.call(
                this,
                e[t],
                this.settings.errorClass,
                this.settings.validClass
              );
          (this.toHide = this.toHide.not(this.toShow)),
            this.hideErrors(),
            this.addWrapper(this.toShow).show();
        },
        validElements: function () {
          return this.currentElements.not(this.invalidElements());
        },
        invalidElements: function () {
          return t(this.errorList).map(function () {
            return this.element;
          });
        },
        showLabel: function (e, i) {
          var s = this.errorsFor(e);
          s.length
            ? (s
                .removeClass(this.settings.validClass)
                .addClass(this.settings.errorClass),
              s.html(i))
            : ((s = t("<" + this.settings.errorElement + ">")
                .attr("for", this.idOrName(e))
                .addClass(this.settings.errorClass)
                .html(i || "")),
              this.settings.wrapper &&
                (s = s
                  .hide()
                  .show()
                  .wrap("<" + this.settings.wrapper + "/>")
                  .parent()),
              this.labelContainer.append(s).length ||
                (this.settings.errorPlacement
                  ? this.settings.errorPlacement(s, t(e))
                  : s.insertAfter(e))),
            !i &&
              this.settings.success &&
              (s.text(""),
              "string" == typeof this.settings.success
                ? s.addClass(this.settings.success)
                : this.settings.success(s, e)),
            (this.toShow = this.toShow.add(s));
        },
        errorsFor: function (e) {
          var i = this.idOrName(e);
          return this.errors().filter(function () {
            return t(this).attr("for") === i;
          });
        },
        idOrName: function (t) {
          return (
            this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
          );
        },
        validationTargetFor: function (t) {
          return (
            this.checkable(t) &&
              (t = this.findByName(t.name).not(this.settings.ignore)[0]),
            t
          );
        },
        checkable: function (t) {
          return /radio|checkbox/i.test(t.type);
        },
        findByName: function (e) {
          return t(this.currentForm).find("[name='" + e + "']");
        },
        getLength: function (e, i) {
          switch (i.nodeName.toLowerCase()) {
            case "select":
              return t("option:selected", i).length;
            case "input":
              if (this.checkable(i))
                return this.findByName(i.name).filter(":checked").length;
          }
          return e.length;
        },
        depend: function (t, e) {
          return this.dependTypes[typeof t]
            ? this.dependTypes[typeof t](t, e)
            : !0;
        },
        dependTypes: {
          boolean: function (t) {
            return t;
          },
          string: function (e, i) {
            return !!t(e, i.form).length;
          },
          function: function (t, e) {
            return t(e);
          },
        },
        optional: function (e) {
          var i = this.elementValue(e);
          return (
            !t.validator.methods.required.call(this, i, e) &&
            "dependency-mismatch"
          );
        },
        startRequest: function (t) {
          this.pending[t.name] ||
            (this.pendingRequest++, (this.pending[t.name] = !0));
        },
        stopRequest: function (e, i) {
          this.pendingRequest--,
            0 > this.pendingRequest && (this.pendingRequest = 0),
            delete this.pending[e.name],
            i && 0 === this.pendingRequest && this.formSubmitted && this.form()
              ? (t(this.currentForm).submit(), (this.formSubmitted = !1))
              : !i &&
                0 === this.pendingRequest &&
                this.formSubmitted &&
                (t(this.currentForm).triggerHandler("invalid-form", [this]),
                (this.formSubmitted = !1));
        },
        previousValue: function (e) {
          return (
            t.data(e, "previousValue") ||
            t.data(e, "previousValue", {
              old: null,
              valid: !0,
              message: this.defaultMessage(e, "remote"),
            })
          );
        },
      },
      classRuleSettings: {
        required: { required: !0 },
        email: { email: !0 },
        url: { url: !0 },
        date: { date: !0 },
        dateISO: { dateISO: !0 },
        number: { number: !0 },
        digits: { digits: !0 },
        creditcard: { creditcard: !0 },
      },
      addClassRules: function (e, i) {
        e.constructor === String
          ? (this.classRuleSettings[e] = i)
          : t.extend(this.classRuleSettings, e);
      },
      classRules: function (e) {
        var i = {},
          s = t(e).attr("class");
        return (
          s &&
            t.each(s.split(" "), function () {
              this in t.validator.classRuleSettings &&
                t.extend(i, t.validator.classRuleSettings[this]);
            }),
          i
        );
      },
      attributeRules: function (e) {
        var i = {},
          s = t(e),
          r = s[0].getAttribute("type");
        for (var n in t.validator.methods) {
          var a;
          "required" === n
            ? ((a = s.get(0).getAttribute(n)), "" === a && (a = !0), (a = !!a))
            : (a = s.attr(n)),
            /min|max/.test(n) &&
              (null === r || /number|range|text/.test(r)) &&
              (a = Number(a)),
            a ? (i[n] = a) : r === n && "range" !== r && (i[n] = !0);
        }
        return (
          i.maxlength &&
            /-1|2147483647|524288/.test(i.maxlength) &&
            delete i.maxlength,
          i
        );
      },
      dataRules: function (e) {
        var i,
          s,
          r = {},
          n = t(e);
        for (i in t.validator.methods)
          (s = n.data("rule-" + i.toLowerCase())), void 0 !== s && (r[i] = s);
        return r;
      },
      staticRules: function (e) {
        var i = {},
          s = t.data(e.form, "validator");
        return (
          s.settings.rules &&
            (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}),
          i
        );
      },
      normalizeRules: function (e, i) {
        return (
          t.each(e, function (s, r) {
            if (r === !1) return delete e[s], void 0;
            if (r.param || r.depends) {
              var n = !0;
              switch (typeof r.depends) {
                case "string":
                  n = !!t(r.depends, i.form).length;
                  break;
                case "function":
                  n = r.depends.call(i, i);
              }
              n ? (e[s] = void 0 !== r.param ? r.param : !0) : delete e[s];
            }
          }),
          t.each(e, function (s, r) {
            e[s] = t.isFunction(r) ? r(i) : r;
          }),
          t.each(["minlength", "maxlength"], function () {
            e[this] && (e[this] = Number(e[this]));
          }),
          t.each(["rangelength", "range"], function () {
            var i;
            e[this] &&
              (t.isArray(e[this])
                ? (e[this] = [Number(e[this][0]), Number(e[this][1])])
                : "string" == typeof e[this] &&
                  ((i = e[this].split(/[\s,]+/)),
                  (e[this] = [Number(i[0]), Number(i[1])])));
          }),
          t.validator.autoCreateRanges &&
            (e.min &&
              e.max &&
              ((e.range = [e.min, e.max]), delete e.min, delete e.max),
            e.minlength &&
              e.maxlength &&
              ((e.rangelength = [e.minlength, e.maxlength]),
              delete e.minlength,
              delete e.maxlength)),
          e
        );
      },
      normalizeRule: function (e) {
        if ("string" == typeof e) {
          var i = {};
          t.each(e.split(/\s/), function () {
            i[this] = !0;
          }),
            (e = i);
        }
        return e;
      },
      addMethod: function (e, i, s) {
        (t.validator.methods[e] = i),
          (t.validator.messages[e] =
            void 0 !== s ? s : t.validator.messages[e]),
          3 > i.length &&
            t.validator.addClassRules(e, t.validator.normalizeRule(e));
      },
      methods: {
        required: function (e, i, s) {
          if (!this.depend(s, i)) return "dependency-mismatch";
          if ("select" === i.nodeName.toLowerCase()) {
            var r = t(i).val();
            return r && r.length > 0;
          }
          return this.checkable(i)
            ? this.getLength(e, i) > 0
            : t.trim(e).length > 0;
        },
        email: function (t, e) {
          return (
            this.optional(e) ||
            /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(
              t
            )
          );
        },
        url: function (t, e) {
          return (
            this.optional(e) ||
            /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
              t
            )
          );
        },
        date: function (t, e) {
          return this.optional(e) || !/Invalid|NaN/.test("" + new Date(t));
        },
        dateISO: function (t, e) {
          return (
            this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
          );
        },
        number: function (t, e) {
          return (
            this.optional(e) ||
            /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
          );
        },
        digits: function (t, e) {
          return this.optional(e) || /^\d+$/.test(t);
        },
        creditcard: function (t, e) {
          if (this.optional(e)) return "dependency-mismatch";
          if (/[^0-9 \-]+/.test(t)) return !1;
          var i = 0,
            s = 0,
            r = !1;
          t = t.replace(/\D/g, "");
          for (var n = t.length - 1; n >= 0; n--) {
            var a = t.charAt(n);
            (s = parseInt(a, 10)),
              r && (s *= 2) > 9 && (s -= 9),
              (i += s),
              (r = !r);
          }
          return 0 === i % 10;
        },
        minlength: function (e, i, s) {
          var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
          return this.optional(i) || r >= s;
        },
        maxlength: function (e, i, s) {
          var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
          return this.optional(i) || s >= r;
        },
        rangelength: function (e, i, s) {
          var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
          return this.optional(i) || (r >= s[0] && s[1] >= r);
        },
        min: function (t, e, i) {
          return this.optional(e) || t >= i;
        },
        max: function (t, e, i) {
          return this.optional(e) || i >= t;
        },
        range: function (t, e, i) {
          return this.optional(e) || (t >= i[0] && i[1] >= t);
        },
        equalTo: function (e, i, s) {
          var r = t(s);
          return (
            this.settings.onfocusout &&
              r
                .unbind(".validate-equalTo")
                .bind("blur.validate-equalTo", function () {
                  t(i).valid();
                }),
            e === r.val()
          );
        },
        remote: function (e, i, s) {
          if (this.optional(i)) return "dependency-mismatch";
          var r = this.previousValue(i);
          if (
            (this.settings.messages[i.name] ||
              (this.settings.messages[i.name] = {}),
            (r.originalMessage = this.settings.messages[i.name].remote),
            (this.settings.messages[i.name].remote = r.message),
            (s = ("string" == typeof s && { url: s }) || s),
            r.old === e)
          )
            return r.valid;
          r.old = e;
          var n = this;
          this.startRequest(i);
          var a = {};
          return (
            (a[i.name] = e),
            t.ajax(
              t.extend(
                !0,
                {
                  url: s,
                  mode: "abort",
                  port: "validate" + i.name,
                  dataType: "json",
                  data: a,
                  success: function (s) {
                    n.settings.messages[i.name].remote = r.originalMessage;
                    var a = s === !0 || "true" === s;
                    if (a) {
                      var u = n.formSubmitted;
                      n.prepareElement(i),
                        (n.formSubmitted = u),
                        n.successList.push(i),
                        delete n.invalid[i.name],
                        n.showErrors();
                    } else {
                      var o = {},
                        l = s || n.defaultMessage(i, "remote");
                      (o[i.name] = r.message = t.isFunction(l) ? l(e) : l),
                        (n.invalid[i.name] = !0),
                        n.showErrors(o);
                    }
                    (r.valid = a), n.stopRequest(i, a);
                  },
                },
                s
              )
            ),
            "pending"
          );
        },
      },
    }),
    (t.format = t.validator.format);
})(jQuery),
  (function (t) {
    var e = {};
    if (t.ajaxPrefilter)
      t.ajaxPrefilter(function (t, i, s) {
        var r = t.port;
        "abort" === t.mode && (e[r] && e[r].abort(), (e[r] = s));
      });
    else {
      var i = t.ajax;
      t.ajax = function (s) {
        var r = ("mode" in s ? s : t.ajaxSettings).mode,
          n = ("port" in s ? s : t.ajaxSettings).port;
        return "abort" === r
          ? (e[n] && e[n].abort(), (e[n] = i.apply(this, arguments)), e[n])
          : i.apply(this, arguments);
      };
    }
  })(jQuery),
  (function (t) {
    t.extend(t.fn, {
      validateDelegate: function (e, i, s) {
        return this.bind(i, function (i) {
          var r = t(i.target);
          return r.is(e) ? s.apply(r, arguments) : void 0;
        });
      },
    });
  })(jQuery);
jQuery(function ($) {
  $("#contactform").validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      message: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Por favor ingresa tu nombre",
        minlength: "Tu nombre debe contener almenos 2 letras",
      },
      email: {
        required: "Por favor ingresa tu correo",
      },
      message: {
        required: "Por favor ingresa tu mensaje",
      },
    },
    submitHandler: function (form) {
      $(form).ajaxSubmit({
        type: "POST",
        data: $(form).serialize(),
        url: "external/form/contact-form.php",
        success: function () {
          $("#success").fadeIn();
          $("#contactform").each(function () {
            this.reset();
          });
          $("#contactform .form-group").each(function () {
            if ($(this).hasClass("focused")) {
              $(this).removeClass("focused");
            }
          });
        },
        error: function () {
          $("#contactform").fadeTo("slow", 1, function () {
            $("#error").fadeIn();
          });
        },
      });
    },
  });
  $("#contactform02").validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      message: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Por favor ingresa tu nombre",
        minlength: "Tu nombre debe contener almenos 2 letras",
      },
      email: {
        required: "Por favor ingresa tu correo",
      },
      message: {
        required: "Por favor ingresa tu mensaje",
      },
    },
    submitHandler: function (form) {
      $(form).ajaxSubmit({
        type: "POST",
        data: $(form).serialize(),
        url: "external/form/contact-form02.php",
        success: function () {
          $("#success").fadeIn();
          $("#contactform02").each(function () {
            this.reset();
          });
          $("#contactform02 .form-group").each(function () {
            if ($(this).hasClass("focused")) {
              $(this).removeClass("focused");
            }
          });
        },
        error: function () {
          $("#contactform02").fadeTo("slow", 1, function () {
            $("#error").fadeIn();
          });
        },
      });
    },
  });
  $("#newsletter-01").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    submitHandler: function (form) {
      $(form).ajaxSubmit({
        type: "POST",
        data: $(form).serialize(),
        url: "external/form/newsletter-form.php",
        success: function () {
          $("#success").fadeIn();
          $("#newsletterform-01").each(function () {
            this.reset();
          });
        },
        error: function () {
          $("#newsletter-01").fadeTo("slow", 1, function () {
            $("#error").fadeIn();
          });
        },
      });
    },
  });
});
/*
	Accordeon
*/
(function ($) {
  var methods = {
    init: function (options) {
      return this.each(function () {
        var object = $(this),
          objectOpen = object.find(".accordeon__item.is-open"),
          objectItemTitle = object.find(".accordeon__item .accordeon__title");

        objectOpen.find(".accordeon__content").slideToggle(100);

        objectItemTitle.on("click", function () {
          $(this).next().slideToggle(200).parent().toggleClass("is-open");
        });
      });
    },
  };
  $.fn.accordeon = function (action) {
    if (methods[action]) {
      return methods[action].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof action === "object" || !action) {
      return methods.init.apply(this, arguments);
    } else {
      console.info("Action " + action + "not found this plugin");
      return this;
    }
  };
  var jsAccordeon = $("#mainContent .js-accordeon");
  if (!jsAccordeon.length) return;
  jsAccordeon.accordeon();
})(jQuery);

(function ($) {
  var methods = {
    init: function (options) {
      return this.each(function () {
        var $this = $(this);
        methods.alignmen(options, $this);
      });
    },
    alignmen: function (options, $this) {
      var arrow = $this.find(".slick-arrow"),
        arrowHeight = arrow.findHeight(),
        obj = $this.find("." + options.centeringObject),
        objHeight = obj.findHeight();

      arrow
        .css({
          top: objHeight - arrowHeight,
          "margin-top": "0px",
        })
        .animate({ opacity: 1 });
    },
  };
  $.fn.alignment = function (action) {
    if (methods[action]) {
      return methods[action].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof action === "object" || !action) {
      return methods.init.apply(this, arguments);
    } else {
      console.info("Action " + action + "not found this plugin");
      return this;
    }
  };
  $.fn.findHeight = function () {
    var $box = $(this),
      maxH = $box.eq(0).innerHeight();

    $box.each(function () {
      maxH = $(this).innerHeight() > maxH ? $(this).innerHeight() : maxH;
    });

    return maxH / 2;
  };
  $(window)
    .resize(function (e) {
      setTimeout(function () {
        $("#mainContent .js-align-arrow-award").imagesLoaded().alignment({
          centeringObject: "award__img",
        });
      }, 500);
    })
    .resize();
  function debouncer(func, timeout) {
    var timeoutID,
      timeout = timeout || 500;
    return function () {
      var scope = this,
        args = arguments;
      clearTimeout(timeoutID);
      timeoutID = setTimeout(function () {
        func.apply(scope, Array.prototype.slice.call(args));
      }, timeout);
    };
  }
})(jQuery);

/*
	Animation Number
*/
(function ($) {
  var time = 1,
    cc = 1,
    $mainContent = $("#mainContent"),
    $section = $mainContent.find(".section");

  $(window).on("scroll", function () {
    $section.each(function () {
      var cPos = $(this).offset().top,
        topWindow = $(window).scrollTop();
      if (cPos < topWindow + 300) {
        if (cc < 2) {
          $(".animate-number")
            .addClass("viz")
            .each(function () {
              var i = 1,
                num = $(this).data("num"),
                step = (500 * time) / num,
                that = $(this),
                int = setInterval(function () {
                  if (i <= num) {
                    that.html(i);
                  } else {
                    cc = cc + 2;
                    clearInterval(int);
                  }
                  i++;
                }, step);
            });
        }
      }
    });
  });
})(jQuery);

/*
	Carusel News
*/
(function ($) {
  var $jsCarouselProducts = $("#mainContent .js-carousel-products");
  if ($jsCarouselProducts.length) {
    $jsCarouselProducts.slick({
      dots: false,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }
})(jQuery);

/*
	Carusel Award
*/
(function ($) {
  var $sliderInit = $("#mainContent .js-award-carusel");
  if (!$sliderInit.length) return;
  $sliderInit.slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
})(jQuery);

/*
	Carusel Blockquote
*/
(function ($) {
  var $sliderInit = $("#mainContent .js-carusel-blockquote"),
    $slickArrow = $sliderInit.closest("section").find(".slick-arrow-external"),
    $sliderArrowLeft = $slickArrow.find(".slick-prev"),
    $sliderArrowRight = $slickArrow.find(".slick-next");

  if (!$sliderInit.length) return;

  $sliderInit.slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  });
  if ($sliderArrowRight.length) {
    $sliderArrowRight.on("click", function (e) {
      $sliderInit.slick("slickNext");
      return false;
    });
  }
  if ($sliderArrowLeft.length) {
    $sliderArrowLeft.on("click", function (e) {
      $sliderInit.slick("slickPrev");
      return false;
    });
  }
})(jQuery);

/*
	Slider External Block
*/
(function ($) {
  var $sliderInit = $("#mainContent .js-carusel-external-box"),
    $sliderArrow = $("#mainContent .layout-external-box .col-nav-slider");

  if (!$sliderInit.length) return;
  $sliderInit.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  });
  if ($sliderArrow.length) {
    $sliderArrow.on("click", function () {
      $sliderInit.slick("slickNext");
    });
  }
})(jQuery);

/*
	Carusel News
*/
(function ($) {
  var $sliderInit = $("#mainContent .js-carusel-news"),
    $slickArrow = $sliderInit
      .closest("section")
      .find(".slick-arrow-extraright"),
    $sliderArrowLeft = $slickArrow.find(".slick-prev"),
    $sliderArrowRight = $slickArrow.find(".slick-next");

  if (!$sliderInit.length) return;

  $sliderInit.slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  if ($sliderArrowRight.length && $sliderArrowLeft.length) {
    $sliderArrowRight.on("click", function (e) {
      $sliderInit.slick("slickNext");
      return false;
    });
    $sliderArrowLeft.on("click", function (e) {
      $sliderInit.slick("slickPrev");
      return false;
    });
  }
})(jQuery);

/*
	Carusel Partners
*/
(function ($) {
  var $sliderInit = $("#mainContent .js-carusel-partners"),
    $slickArrowExtraLeft = $(
      " #mainContent .wrapper-carusel-partners .slick-slick-arrow"
    ),
    $sliderArrowLeft = $slickArrowExtraLeft.find(".slick-prev"),
    $sliderArrowRight = $slickArrowExtraLeft.find(".slick-next");

  if (!$sliderInit.length) return;

  $sliderInit.slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 791,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
  if ($sliderArrowRight.length && $sliderArrowLeft.length) {
    $sliderArrowRight.on("click", function () {
      $sliderInit.slick("slickNext");
    });
    $sliderArrowLeft.on("click", function () {
      $sliderInit.slick("slickPrev");
    });
  }
})(jQuery);

/*
	Carusel Partners
*/
(function ($) {
  var $sliderInit = $("#mainContent .js-presentation-projects"),
    $slickArrowExtraLeft = $(
      " #mainContent .presentation-projects .slick-slick-arrow"
    ),
    $sliderArrowLeft = $slickArrowExtraLeft.find(".slick-prev"),
    $sliderArrowRight = $slickArrowExtraLeft.find(".slick-next");

  if (!$sliderInit.length) return;

  $sliderInit.slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  });
  function contentСentering() {
    setTimeout(function () {
      var $imgHeight = $sliderInit.find("picture img").height();
      $(".col-link-wrapper").height($imgHeight);
    }, 310);
  }
  contentСentering();
  $(window).resize(function (e) {
    contentСentering();
  });
  if ($sliderArrowRight.length && $sliderArrowLeft.length) {
    $sliderArrowRight.on("click", function () {
      $sliderInit.slick("slickNext");
    });
    $sliderArrowLeft.on("click", function () {
      $sliderInit.slick("slickPrev");
    });
  }
})(jQuery);

/*
	Carusel Partners
*/
(function ($) {
  var $sliderInit = $("#mainContent .js-carusel-twocol-fullwidth"),
    $slickArrowExtraLeft = $(
      " #mainContent .wrapper-carusel-partners .slick-slick-arrow"
    ),
    $sliderArrowLeft = $slickArrowExtraLeft.find(".slick-prev"),
    $sliderArrowRight = $slickArrowExtraLeft.find(".slick-next");

  if (!$sliderInit.length) return;

  $sliderInit.slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
  if ($sliderArrowRight.length && $sliderArrowLeft.length) {
    $sliderArrowRight.on("click", function () {
      $sliderInit.slick("slickNext");
    });
    $sliderArrowLeft.on("click", function () {
      $sliderInit.slick("slickPrev");
    });
  }
})(jQuery);

/*
	Slider External Block
*/
(function ($) {
  var $sliderInit = $(
      "#mainContent .wrapper-carusel-two-col .js-carusel-two-col"
    ),
    $slickArrowExtraLeft = $(
      " #mainContent .wrapper-carusel-two-col .slick-arrow-extraleft"
    ),
    $sliderArrowLeft = $slickArrowExtraLeft.find(".slick-prev"),
    $sliderArrowRight = $slickArrowExtraLeft.find(".slick-next");

  if (!$sliderInit.length) return;
  $sliderInit.slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 791,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  if ($sliderArrowRight.length && $sliderArrowLeft.length) {
    $sliderArrowRight.on("click", function () {
      $sliderInit.slick("slickNext");
    });
    $sliderArrowLeft.on("click", function () {
      $sliderInit.slick("slickPrev");
    });
  }
})(jQuery);

/*
	Slider External Block
*/
(function ($) {
  var $sliderInit = $("#mainContent .js-caruser-custom");
  if (!$sliderInit.length) return;
  $sliderInit.slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: true,
    customPaging: function (slider, i) {
      return "<span>" + "0" + (i + 1) + "</span>";
    },
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
})(jQuery);

/*
	Slider External Block
*/
(function ($) {
  const init = {
    autoplay: false,
    infinite: false,
    arrows: false,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  $(() => {
    const win = $(window);
    const slider = $("#mainContent .js-mobile-slider");

    win.on("load resize", () => {
      if (win.width() < 790) {
        slider.not(".slick-initialized").slick(init);
      } else if (slider.hasClass("slick-initialized")) {
        slider.slick("unslick");
      }
    });
  });
})(jQuery);

/*
	Debouncer
*/
function debouncer(func, timeout) {
  var timeoutID,
    timeout = timeout || 300;
  return function () {
    var scope = this,
      args = arguments;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function () {
      func.apply(scope, Array.prototype.slice.call(args));
    }, timeout);
  };
}
/*
	Definition of touch devices
*/
(function ($) {
  function isTouchDevice() {
    return typeof window.ontouchstart !== "undefined";
  }
  if (isTouchDevice()) {
    $("body")
      .addClass("touch")
      .one("click", "#mainContent .block-once", function (event) {
        event.preventDefault();
      });
  }
})(jQuery);

/*
	Footer mobile collapse
*/
(function ($) {
  "use strict";

  var footerMobileCollapse = $("#footer .collapse-title:not(.no-collapse)"),
    $window = $(window);
  if (footerMobileCollapse.length) {
    ptFooterCollapse();
  }
  function ptFooterCollapse() {
    footerMobileCollapse.on("click", function (e) {
      e.preventDefault;
      var ptlayout = $(this).next(),
        ptwindowWidth = window.innerWidth || $window.width();

      $(this).toggleClass("is-open");
      if (ptlayout.css("display") == "none" && ptwindowWidth <= 790) {
        ptlayout.animate({ height: "show" }, 300);
      } else if (ptlayout.css("display") == "block" && ptwindowWidth <= 790) {
        ptlayout.animate({ height: "hide" }, 300);
      }
    });
  }
  $window.resize(
    debouncer(function (e) {
      if (
        (footerMobileCollapse.length && window.innerWidth) ||
        $window.width() <= 790
      ) {
        footerMobileCollapse.removeClass("is-open").next().removeAttr("style");
      }
    })
  );
})(jQuery);

/*
	Slick init
*/
(function ($) {
  var $formDefault = $("#mainContent .form-default .form-control:not(select)");
  if ($formDefault.length) {
    $formDefault.focus(function () {
      $(this).parents(".form-group").addClass("focused");
    });

    $formDefault.blur(function () {
      var inputValue = $(this).val();
      if (inputValue == "") {
        $(this).removeClass("filled");
        $(this).parents(".form-group").removeClass("focused");
      } else {
        $(this).addClass("filled");
      }
    });
  }
})(jQuery);

/*
	Form Init Select
*/
(function ($) {
  "use strict";
  var objSelect = $("#mainContent .js-init-select");
  if (!objSelect.length) return;
  objSelect.niceSelect();
})(jQuery);

/*
	Gallery
*/
(function ($) {
  var $window = $(window),
    $ttPageContent = $("#mainContent"),
    gallery = $ttPageContent.find(".galley-masonry");

  $window.on("load", function () {
    var ttwindowWidth = window.innerWidth || $window.width();

    if (gallery.length) {
      initGallery();
      initGalleyPopup();
    }
  });
  function initGallery() {
    var $grid = gallery.find(".tt-portfolio-content").isotope({
      itemSelector: ".element-item",
      layoutMode: "masonry",
    });
    $grid.imagesLoaded().progress(function () {
      $grid.isotope("layout").addClass("tt-show");
    });
    var ttFilterNav = gallery.find(".filter-nav");
    if (ttFilterNav.length) {
      var filterFns = {
        ium: function () {
          var name = $(this).find(".name").text();
          return name.match(/ium$/);
        },
      };
      ttFilterNav.on("click", ".button", function () {
        var filterValue = $(this).attr("data-filter");
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({
          filter: filterValue,
        });
        $(this).addClass("active").siblings().removeClass("active");
      });
    }
  }
  function initGalleyPopup() {
    var objZoom = $ttPageContent.find(".galley-masonry .btn-zomm");
    objZoom.magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
  }
})(jQuery);

/*
	Header Stuck
*/
(function ($) {
  var $topBar = $("#top-bar"),
    $window = $(window);

  var scroll = $window.scrollTop();
  if (scroll > 20) {
    $topBar.addClass("stuck");
  }

  $window.on("scroll", function () {
    var scroll = $window.scrollTop();
    if (scroll > 20) {
      $topBar.addClass("stuck");
    } else {
      $topBar.removeClass("stuck");
    }
  });
})(jQuery);

/*
	Header Stuck
*/
(function ($) {
  var subpageHeaderBg = $(".subpage-header__bg");

  if (!subpageHeaderBg.length) return;

  scrollSubpage();
  $(window).resize(function () {
    scrollSubpage();
  });

  function scrollSubpage() {
    if (window.innerWidth > 791) {
      $(window).on("scroll", function () {
        var yPos = +($(window).scrollTop() / 4),
          coords = "center " + yPos + "px";
        subpageHeaderBg.css({ backgroundPosition: coords });
      });
    }
  }
})(jQuery);

/*
	AOS init
*/
AOS.init({
  offset: 100,
  duration: 900,
  easing: "ease-out",
  delay: 100,
  once: true,
  disable: "mobile",
});

(function ($) {
  function map() {
    var map = $("#mainContent .googlemap");

    if (map.length > 0) {
      var apiKey = map.attr("data-api-key"),
        apiURL;

      if (apiKey) {
        apiURL =
          "https://maps.google.com/maps/api/js?key=" +
          apiKey +
          " &sensor=false";
      } else {
        apiURL = "https://maps.google.com/maps/api/js?sensor=false";
      }

      $.getScript(apiURL, function (data, textStatus, jqxhr) {
        map.each(function () {
          var current_map = $(this),
            latlng = new google.maps.LatLng(
              current_map.attr("data-longitude"),

              current_map.attr("data-latitude")
            ),
            point = current_map.attr("data-marker"),
            center = {
              lat: 40.73061,
              lng: -73.935242,
            },
            markerPos = {
              lat: 40.73061,
              lng: -73.935242,
            },
            myOptions = {
              zoom: 14,
              center: center,
              disableDefaultUI: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: false,
              scrollwheel: false,
              draggable: true,
              panControl: false,
              zoomControl: false,
              disableDefaultUI: true,
              styles: [
                {
                  featureType: "administrative",
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#212326",
                    },
                  ],
                },
                {
                  featureType: "administrative.locality",
                  elementType: "labels.text.fill",
                  stylers: [
                    {
                      color: "#464646",
                    },
                  ],
                },
                {
                  featureType: "landscape",
                  elementType: "all",
                  stylers: [
                    {
                      color: "#F8F8F9",
                    },
                  ],
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "off",
                    },
                  ],
                },
                {
                  featureType: "road",
                  elementType: "all",
                  stylers: [
                    {
                      saturation: -100,
                    },
                    {
                      lightness: 45,
                    },
                  ],
                },
                {
                  featureType: "road",
                  elementType: "labels",
                  stylers: [
                    {
                      visibility: "on",
                    },
                  ],
                },
                {
                  featureType: "road",
                  elementType: "labels.icon",
                  stylers: [
                    {
                      visibility: "on",
                    },
                  ],
                },
                {
                  featureType: "transit",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "on",
                    },
                  ],
                },
                {
                  featureType: "road.highway",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "on",
                    },
                  ],
                },
                {
                  featureType: "road.arterial",
                  elementType: "labels.icon",
                  stylers: [
                    {
                      visibility: "on",
                    },
                  ],
                },
                {
                  featureType: "transit",
                  elementType: "all",
                  stylers: [
                    {
                      visibility: "on",
                    },
                  ],
                },
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: [
                    {
                      color: "#E2E3E7",
                    },
                    {
                      visibility: "on",
                    },
                  ],
                },
              ],
            };

          var map = new google.maps.Map(current_map[0], myOptions);

          var marker = new google.maps.Marker({
            map: map,
            icon: {
              size: new google.maps.Size(59, 69),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(0, 69),
              url: point,
            },
            position: markerPos,
          });

          google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
          });
        });
      });
    }
  }

  map();
})(jQuery);
/*
	Masonry
*/
(function ($) {
  var $mainContent = $("#mainContent"),
    masonryLayout01 = $mainContent.find(".masonry-layout-01"),
    $window = $(window),
    $body = $("body"),
    $html = $("html");

  $window.on("load", function () {
    var ptwindowWidth = window.innerWidth || $window.width();
    if (masonryLayout01.length) {
      masonry();
    }
  });

  function masonry() {
    var $grid = masonryLayout01.find(".masonry-layout-01-init").isotope({
      itemSelector: ".element-item",
      layoutMode: "masonry",
    });
    $grid.imagesLoaded().progress(function () {
      $grid.isotope("layout").addClass("pt-show");
    });
  }
})(jQuery);

/*
	Slick init
*/
(function ($) {
  var videoPopup = $(".video-popup");
  if (!videoPopup.length) return;
  videoPopup.each(function () {
    $(this).magnificPopup({
      type: "iframe",
      iframe: {
        patterns: {
          dailymotion: {
            index: "dailymotion.com",
            id: function (url) {
              var m = url.match(
                /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/
              );
              if (m !== null) {
                if (m[4] !== undefined) {
                  return m[4];
                }
                return m[2];
              }
              return null;
            },
            src: "https://www.dailymotion.com/embed/video/%id%",
          },
        },
      },
    });
  });
})(jQuery);

(function ($) {
  $.fn.instafeed = function (new_object) {
    var $this = $(this),
      $accessToken = $(this).attr("data-accessToken"),
      $clientId = $(this).attr("data-clientId"),
      $userId = $(this).attr("data-userId"),
      $limitImg = $(this).attr("data-limitImg");

    if (!$this.length) return;
    var new_object = new_object || {},
      set_object = {
        get: "user",
        userId: $userId,
        clientId: $clientId,
        limit: $limitImg,
        sortBy: "most-liked",
        resolution: "standard_resolution",
        accessToken: $accessToken,
        template:
          '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>',
      };
    $.extend(set_object, new_object);
    var feed = new Instafeed(set_object);
    feed.run();
  };
  $("#instafeed").each(function () {
    $(this).instafeed();
  });
})(jQuery);

(function ($) {
  var jsScrollDown = $("#js-scroll-down"),
    scrollDownAnchor = $("#scroll-down-anchor"),
    $window = $(window);

  if (jsScrollDown.length && scrollDownAnchor.length) {
    initbacktotop();
  }
  function initbacktotop() {
    jsScrollDown.on("click", function (e) {
      $("html, body").animate(
        {
          scrollTop: scrollDownAnchor.offset().top,
        },
        1000
      );
      return false;
    });
    $window.scroll(function () {
      $window.scrollTop() > 500
        ? jsScrollDown.stop(true.false).addClass("show")
        : jsScrollDown.stop(true.false).removeClass("show");
    });
  }
})(jQuery);

(function ($) {
  var ptBackToTop = $("#js-back-to-top"),
    $window = $(window);

  if (ptBackToTop.length) {
    ptBackToTop.on("click", function (e) {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        500
      );
      return false;
    });
    $window.scroll(function () {
      $window.scrollTop() > 750
        ? ptBackToTop.stop(true.false).addClass("show")
        : ptBackToTop.stop(true.false).removeClass("show");
    });
  }
})(jQuery);

/*
	Main Slider
*/
(function ($) {
  dataBg("[data-bg]");
  function dataBg(el) {
    $(el).each(function () {
      var $this = $(this),
        bg = $this.attr("data-bg");
      $this.css({
        "background-image": "url(" + bg + ")",
      });
    });
  }
  var mainSlider = $(".mainSlider");
  if (mainSlider.length) {
    mainslider();
  }
  function mainslider() {
    var $obj = mainSlider;
    $obj
      .find(".slide")
      .first()
      .imagesLoaded(
        {
          background: true,
        },
        function () {
          setTimeout(function () {
            $obj.parent().find(".loading-content").addClass("disable");
          }, 100);
        }
      );
    $obj.on("init", function (e, slick) {
      var $firstAnimatingElements = $("div.slide:first-child").find(
        "[data-animation]"
      );
      runAnimation($firstAnimatingElements);
    });
    $obj.on("beforeChange", function (e, slick, currentSlide, nextSlide) {
      var $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]');
      var $animatingElements = $currentSlide.find("[data-animation]");
      runAnimation($animatingElements);
    });
    var dataArrow = $obj.data("arrow"),
      dataDots = $obj.data("dots");
    $obj.slick({
      arrows: dataArrow || false,
      dots: dataDots || false,
      autoplay: true,
      autoplaySpeed: 5500,
      fade: true,
      speed: 1000,
      pauseOnHover: false,
      pauseOnDotsHover: true,
      customPaging: function (slider, i) {
        return "<span>" + "0" + (i + 1) + "</span>";
      },
    });
  }
  function runAnimation(elements) {
    var animationEndEvents =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    elements.each(function () {
      var $this = $(this),
        $animationType = "animated " + $this.data("animation"),
        $animationDelay = $this.data("animation-delay");
      $this.css({
        "animation-delay": $animationDelay,
        "-webkit-animation-delay": $animationDelay,
      });
      $this.addClass($animationType).one(animationEndEvents, function () {
        $this.removeClass($animationType);
      });
      if ($this.hasClass("animate")) {
        $this.removeClass("animation");
      }
    });
  }

  var $allVideos = $(
      "iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com'], object, embed"
    ),
    $fluidEl = $("figure");

  $allVideos.each(function () {
    $(this)
      // jQuery .data does not work on object/embed elements
      .attr("data-aspectRatio", this.height / this.width)
      .removeAttr("height")
      .removeAttr("width");
  });

  $(window)
    .resize(function () {
      var newWidth = $fluidEl.width();
      $allVideos.each(function () {
        var $el = $(this);
        $el.width(newWidth).height(newWidth * $el.attr("data-aspectRatio"));
      });
    })
    .resize();
})(jQuery);

/*
	Desktop Menu
*/
(function ($) {
  var location = window.location.href,
    $desctopMenu = $("#top-bar__navigation");

  if (!$desctopMenu) return;

  $desctopMenu.find("li").each(function () {
    var link = $(this).find("a").attr("href");

    if (location.indexOf(link) !== -1) {
      $(this).addClass("active").closest(".is-submenu").addClass("active");
    }
    if ($(this).is(":has(ul)")) {
      $(this).addClass("is-submenu");
    }
  });

  $desctopMenu
    .find("ul li")
    .on("mouseenter", function () {
      var $ul = $(this).find("ul:first");
      $(this).find("a:first").addClass("is-hover");
      if ($ul.length) {
        var windW = window.innerWidth,
          ulW = parseInt($ul.css("width"), 10) + 20,
          thisR = this.getBoundingClientRect().right,
          thisL = this.getBoundingClientRect().left;

        if (windW - thisR < ulW) {
          $ul.addClass("right-popup");
        } else if (thisL < ulW) {
          $ul.removeClass("right-popup");
        }
      }
    })
    .on("mouseleave", function () {
      $(this).find("a:first").removeClass("is-hover");
    });
})(jQuery);

/*
	Mobile Menu
*/
(function ($) {
  var $mobileMenu = $("#nav-aside_menu"),
    $topBarNavigation = $("#top-bar__navigation > ul");

  if (!$mobileMenu && !$topBarNavigation) return;

  var $objBarNavigation = $topBarNavigation.clone();
  $mobileMenu.append($objBarNavigation);
  $mobileMenu.find("li").each(function () {
    if ($(this).is(":has(ul)")) {
      $(this).addClass("is-submenu");
    }
  });
  $(document).on("click", "#nav-aside_menu li.is-submenu > a", function (e) {
    $(this).parent("#nav-aside_menu li.is-submenu").toggleClass("is-open");
    return false;
  });
})(jQuery);

/*
	Navigation Toggler
*/
(function ($) {
  var btnToggle = $("#top-bar__navigation-toggler");
  if (btnToggle.length) {
    var $html = $("html"),
      $body = $("body"),
      $navigationAside = $("#nav-aside"),
      $btnClose = $navigationAside.find(".nav-aside__close");

    btnToggle.on("click", function (e) {
      e.preventDefault();
      var ttScrollValue = $body.scrollTop() || $html.scrollTop();
      $navigationAside.toggleClass("aside-open").perfectScrollbar();
      $body
        .css("top", -ttScrollValue)
        .addClass("no-scroll")
        .append('<div class="nav-aside-background"></div>');
      var modalFilter = $(".nav-aside-background").fadeTo("fast", 1);
      if (modalFilter.length) {
        modalFilter.on("click", function () {
          $btnClose.trigger("click");
        });
      }
      return false;
    });
    $btnClose.on("click", function (e) {
      e.preventDefault();
      $navigationAside.removeClass("aside-open").perfectScrollbar("destroy");
      var top = parseInt($body.css("top").replace("px", ""), 10) * -1;
      $body.removeAttr("style").removeClass("no-scroll").scrollTop(top);
      $html.removeAttr("style").scrollTop(top);
      $(".nav-aside-background").off().remove();
    });
  }
})(jQuery);

/*
	Promobox03 Hover
*/
(function ($) {
  var $object = $("#mainContent .promobox03");
  if ($object.length) {
    $object.find(".promobox03__show").slideUp("0");
    $("body .promobox03").hover(
      function () {
        $(this).find(".promobox03__show").stop().delay(100).slideDown("200");
      },
      function () {
        $(this)
          .find(".promobox03__show")
          .stop()
          .delay(100)
          .slideUp()
          .removeAttr("style");
      }
    );
  }
})(jQuery);

(function ($) {
  "use strict";

  var $colAside = $("#js-aside-col"),
    $collapseAside = $colAside.find(".collapse-aside .collapse-aside__title");

  if (!$colAside && !$collapseAside) return;

  (function toggleColAside() {
    $collapseAside.on("click", this, function (e) {
      var ptlayout = $(this).next();

      $(this).toggleClass("is-open");
      if (ptlayout.css("display") == "none") {
        ptlayout.slideToggle(200);
      } else if (ptlayout.css("display") == "block") {
        ptlayout.slideToggle(200);
      }
    });
  })();
})(jQuery);

(function ($) {
  "use strict";

  var $colorSwitcher = $("#mainContent .menu-aside li");

  if (!$colorSwitcher) return;

  (function asideMenu() {
    $colorSwitcher.on("click", this, function (e) {
      $(this).addClass("active").siblings().removeClass("active");
      return false;
    });
  })();
})(jQuery);

/*
	Slider Price (shop aside)
*/
(function ($) {
  var $priceSlider = $("#price-slider");
  if ($priceSlider.length) {
    $priceSlider.find(".nstSlider").nstSlider({
      left_grip_selector: ".leftGrip",
      right_grip_selector: ".rightGrip",
      value_bar_selector: ".bar",
      value_changed_callback: function (cause, leftValue, rightValue) {
        $(this).parent().find(".leftLabel").text(leftValue);
        $(this).parent().find(".rightLabel").text(rightValue);
      },
    });
  }
})(jQuery);

(function ($) {
  "use strict";

  var $colorSwitcher = $("#mainContent .js-color-switcher");

  if (!$colorSwitcher) return;

  (function switcherList() {
    $colorSwitcher.find("li").on("click", this, function (e) {
      $(this).addClass("active").siblings().removeClass("active");
      return false;
    });
  })();
})(jQuery);

(function ($) {
  var $body = $("body"),
    $html = $("html"),
    $colAside = $("#js-aside-col"),
    $btnToggleAside = $("#js-toggle-aside");

  if (!$colAside && !$btnToggleAside) return;

  (function toggleColAside() {
    var $btnCloseAside = $colAside.find(".btn-asidecol-close");
    $btnToggleAside.on("click", function (e) {
      e.preventDefault();
      var ptScrollValue = $body.scrollTop() || $html.scrollTop();
      $colAside.toggleClass("is-open").perfectScrollbar();
      $body
        .css("top", -ptScrollValue)
        .addClass("no-scroll")
        .append('<div class="filter-bg"></div>');
      var modalFilter = $(".filter-bg").fadeTo("fast", 1);
      if (modalFilter.length) {
        modalFilter.on("click", function () {
          $btnCloseAside.trigger("click");
        });
      }
      return false;
    });
    $btnCloseAside.on("click", function (e) {
      e.preventDefault();
      $colAside.removeClass("is-open").perfectScrollbar("destroy");
      var top = parseInt($body.css("top").replace("px", ""), 10) * -1;
      $body.removeAttr("style").removeClass("no-scroll").scrollTop(top);
      $html.removeAttr("style").scrollTop(top);
      $(".filter-bg").off().remove();
    });
  })();
})(jQuery);

(function ($) {
  "use strict";

  var $counterItem = $("#mainContent .js-counter-item");

  if (!$counterItem.length) return;

  $counterItem.on("click", ".minus-btn, .plus-btn", function () {
    var $this = $(this),
      $count = $this.siblings(".count"),
      delta = $this.hasClass("plus-btn") ? 1 : -1;
    $count.val(Math.max(0, parseInt($count.val()) + delta));
  });
})(jQuery);

/*
	Tabs Default
*/
(function ($) {
  var $navTabs = $("#mainContent .nav-tabs");
  if ($navTabs.length) {
    $("body").on("click", "#mainContent .nav-tabs", function (e) {
      e.preventDefault();
      $(this).tab("show");
    });
  }
})(jQuery);

/*
	Shop Slider Product
*/
(function ($) {
  var sliderProduct = $("#mainContent .slider-product");
  if (sliderProduct.length) {
    $("body").on("click", ".slider-product .img-small a", function (e) {
      e.preventDefault();
      var imgLarge = $(this).closest(".slider-product").find(".img-large img");
      $(this)
        .closest(".item")
        .addClass("active")
        .siblings()
        .removeClass("active");
      imgLarge.hide().attr("src", $(this).attr("href"));
      imgLarge.fadeIn(300);
    });
  }
})(jQuery);

/*
	Slick init
*/
(function ($) {
  $("#mainContent [data-slick]").each(function (index, element) {
    if ($(element).hasClass("slick-initialized")) return;
    $(element).slick();
  });
  var $jsCaruselTwoCol = $("#mainContent .js-carusel-two-col");
  if ($jsCaruselTwoCol.length) return;
  $jsCaruselTwoCol.slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
  });
})(jQuery);
