/*! p5.js v0.4.2 February 16, 2015 */ 
! function(a, b) {
  "function" == typeof define && define.amd ? define("p5", [], function() {
    return a.returnExportsGlobal = b()
  }) : "object" == typeof exports ? module.exports = b() : a.p5 = b()
}(this, function() {
  var amdclean = {};
  return amdclean.shim = function() {
    window.requestDraw = function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
        window.setTimeout(a, 1e3 / 60)
      }
    }()
  }({}), amdclean.constants = function() {
    var a = Math.PI;
    return {
      ARROW: "default",
      CROSS: "crosshair",
      HAND: "pointer",
      MOVE: "move",
      TEXT: "text",
      WAIT: "wait",
      HALF_PI: a / 2,
      PI: a,
      QUARTER_PI: a / 4,
      TAU: 2 * a,
      TWO_PI: 2 * a,
      DEGREES: "degrees",
      RADIANS: "radians",
      CORNER: "corner",
      CORNERS: "corners",
      RADIUS: "radius",
      RIGHT: "right",
      LEFT: "left",
      CENTER: "center",
      TOP: "top",
      BOTTOM: "bottom",
      BASELINE: "alphabetic",
      POINTS: "points",
      LINES: "lines",
      TRIANGLES: "triangles",
      TRIANGLE_FAN: "triangles_fan",
      TRIANGLE_STRIP: "triangles_strip",
      QUADS: "quads",
      QUAD_STRIP: "quad_strip",
      CLOSE: "close",
      OPEN: "open",
      CHORD: "chord",
      PIE: "pie",
      PROJECT: "square",
      SQUARE: "butt",
      ROUND: "round",
      BEVEL: "bevel",
      MITER: "miter",
      RGB: "rgb",
      HSB: "hsb",
      AUTO: "auto",
      ALT: 18,
      BACKSPACE: 8,
      CONTROL: 17,
      DELETE: 46,
      DOWN_ARROW: 40,
      ENTER: 13,
      ESCAPE: 27,
      LEFT_ARROW: 37,
      OPTION: 18,
      RETURN: 13,
      RIGHT_ARROW: 39,
      SHIFT: 16,
      TAB: 9,
      UP_ARROW: 38,
      BLEND: "normal",
      ADD: "lighter",
      DARKEST: "darken",
      LIGHTEST: "lighten",
      DIFFERENCE: "difference",
      EXCLUSION: "exclusion",
      MULTIPLY: "multiply",
      SCREEN: "screen",
      REPLACE: "source-over",
      OVERLAY: "overlay",
      HARD_LIGHT: "hard-light",
      SOFT_LIGHT: "soft-light",
      DODGE: "color-dodge",
      BURN: "color-burn",
      NORMAL: "normal",
      ITALIC: "italic",
      BOLD: "bold",
      LINEAR: "linear",
      QUADRATIC: "quadratic",
      BEZIER: "bezier",
      CURVE: "curve"
    }
  }({}), amdclean.core = function(a, b, c) {
    "use strict";
    var c = c,
      d = function(a, b, e) {
        2 === arguments.length && "boolean" == typeof b && (e = b, b = void 0), this._setupDone = !1, this._pixelDensity = window.devicePixelRatio || 1, this._startTime = (new Date).getTime(), this._userNode = b, this._curElement = null, this._elements = [], this._preloadCount = 0, this._updateInterval = 0, this._isGlobal = !1, this._loop = !0, this._styles = [], this._defaultCanvasSize = {
          width: 100,
          height: 100
        }, this._events = {
          mousemove: null,
          mousedown: null,
          mouseup: null,
          click: null,
          mousewheel: null,
          mouseover: null,
          mouseout: null,
          keydown: null,
          keyup: null,
          keypress: null,
          touchstart: null,
          touchmove: null,
          touchend: null,
          resize: null,
          blur: null
        }, this._loadingScreenId = "p5_loading", this._start = function() {
          if (this._userNode && "string" == typeof this._userNode && (this._userNode = document.getElementById(this._userNode)), this._loadingScreen = document.getElementById(this._loadingScreenId), !this._loadingScreen) {
            this._loadingScreen = document.createElement("loadingDiv"), 
            this._loadingScreen.innerHTML = "please wait, the project is loading", 
            //this._loadingScreen.style.position = "absolute";
            this._loadingScreen.style.color = "#FFF",
            this._loadingScreen.style.display = "block",
            this._loadingScreen.style.width = "100vw",
            this._loadingScreen.style.height = "100vh",
            this._loadingScreen.style.textAlign = "center",
            this._loadingScreen.style.paddingTop = "48vh",
            this._loadingScreen.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, Verdana, Tahoma, Geneva, sans-serif",
            this._loadingScreen.style.fontWeight = "100",
            this._loadingScreen.style.fontSize = "3em",
            this._loadingScreen.style.backgroundColor = "#333";
            //this._loadingScreen.style.border = "1px solid red";
            var a = this._userNode || document.body;
            a.appendChild(this._loadingScreen)
          }
          this.createCanvas(this._defaultCanvasSize.width, this._defaultCanvasSize.height, !0);
          var b = this.preload || window.preload,
            c = this._isGlobal ? window : this;
          b ? (this._preloadMethods.forEach(function(a) {
            c[a] = function() {
              var b = Array.prototype.slice.call(arguments);
              return c._preload(a, b)
            }
          }), b(), 0 === this._preloadCount && (this._setup(), this._runFrames(), this._draw())) : (this._setup(), this._runFrames(), this._draw())
        }.bind(this), this._preload = function(a, b) {
          var c = this._isGlobal ? window : this;
          c._setProperty("_preloadCount", c._preloadCount + 1);
          var e = function() {
            c._setProperty("_preloadCount", c._preloadCount - 1), 0 === c._preloadCount && (c._setup(), c._runFrames(), c._draw())
          };
          return b.push(e), d.prototype[a].apply(c, b)
        }.bind(this), this._setup = function() {
          var a = this._isGlobal ? window : this;
          "function" == typeof a.preload && this._preloadMethods.forEach(function(b) {
            a[b] = d.prototype[b]
          }), "function" == typeof a.setup && a.setup(), this.canvas.style.visibility = "", this.canvas.className = this.canvas.className.replace("p5_hidden", ""), this._setupDone = !0, this._loadingScreen.parentNode.removeChild(this._loadingScreen)
        }.bind(this), this._draw = function() {
          var a = (new Date).getTime();
          this._frameRate = 1e3 / (a - this._lastFrameTime), this._lastFrameTime = a, this._setProperty("frameCount", this.frameCount + 1), this._loop && (this._drawInterval && clearInterval(this._drawInterval), this._drawInterval = setTimeout(function() {
            window.requestDraw(this._draw.bind(this))
          }.bind(this), 1e3 / this._targetFrameRate)), this.redraw(), this._updatePMouseCoords(), this._updatePTouchCoords()
        }.bind(this), this._runFrames = function() {
          this._updateInterval && clearInterval(this._updateInterval)
        }.bind(this), this._setProperty = function(a, b) {
          this[a] = b, this._isGlobal && (window[a] = b)
        }.bind(this), this.remove = function() {
          if (this._curElement) {
            this._loop = !1, this._drawInterval && clearTimeout(this._drawInterval), this._updateInterval && clearTimeout(this._updateInterval);
            for (var a in this._events) window.removeEventListener(a, this._events[a]);
            for (var b = 0; b < this._elements.length; b++) {
              var c = this._elements[b];
              c.elt.parentNode && c.elt.parentNode.removeChild(c.elt);
              for (var e in c._events) c.elt.removeEventListener(e, c._events[e])
            }
            var f = this;
            if (this._registeredMethods.remove.forEach(function(a) {
                "undefined" != typeof a && a.call(f)
              }), this._isGlobal) {
              for (var g in d.prototype) try {
                delete window[g]
              } catch (h) {
                window[g] = void 0
              }
              for (var i in this)
                if (this.hasOwnProperty(i)) try {
                  delete window[i]
                } catch (h) {
                  window[i] = void 0
                }
            }
          }
        }.bind(this);
        for (var f in c) d.prototype[f] = c[f];
        if (a) a(this);
        else {
          this._isGlobal = !0;
          for (var g in d.prototype)
            if ("function" == typeof d.prototype[g]) {
              var h = g.substring(2);
              this._events.hasOwnProperty(h) || (window[g] = d.prototype[g].bind(this))
            } else window[g] = d.prototype[g];
          for (var i in this) this.hasOwnProperty(i) && (window[i] = this[i])
        }
        for (var j in this._events) {
          var k = this["on" + j];
          if (k) {
            var l = k.bind(this);
            window.addEventListener(j, l), this._events[j] = l
          }
        }
        var m = this;
        window.addEventListener("focus", function() {
          m._setProperty("focused", !0)
        }), window.addEventListener("blur", function() {
          m._setProperty("focused", !1)
        }), e ? this._start() : "complete" === document.readyState ? this._start() : window.addEventListener("load", this._start.bind(this), !1)
      };
    return d.prototype._preloadMethods = ["loadJSON", "loadImage", "loadStrings", "loadXML", "loadShape", "loadTable"], d.prototype._registeredMethods = {
      pre: [],
      post: [],
      remove: []
    }, d.prototype.registerPreloadMethod = function(a) {
      d.prototype._preloadMethods.push(a)
    }.bind(this), d.prototype.registerMethod = function(a, b) {
      d.prototype._registeredMethods.hasOwnProperty(a) || (d.prototype._registeredMethods[a] = []), d.prototype._registeredMethods[a].push(b)
    }.bind(this), d
  }({}, amdclean.shim, amdclean.constants), amdclean.utilscolor_utils = function(a, b) {
    var c = b;
    return c.ColorUtils = {}, c.ColorUtils.hsbaToRGBA = function(a) {
      var b = a[0],
        c = a[1],
        d = a[2];
      b /= 255, c /= 255, d /= 255;
      var e = [];
      if (0 === c) e = [Math.round(255 * d), Math.round(255 * d), Math.round(255 * d), a[3]];
      else {
        var f = 6 * b;
        6 === f && (f = 0);
        var g, h, i, j = Math.floor(f),
          k = d * (1 - c),
          l = d * (1 - c * (f - j)),
          m = d * (1 - c * (1 - (f - j)));
        0 === j ? (g = d, h = m, i = k) : 1 === j ? (g = l, h = d, i = k) : 2 === j ? (g = k, h = d, i = m) : 3 === j ? (g = k, h = l, i = d) : 4 === j ? (g = m, h = k, i = d) : (g = d, h = k, i = l), e = [Math.round(255 * g), Math.round(255 * h), Math.round(255 * i), a[3]]
      }
      return e
    }, c.ColorUtils.rgbaToHSBA = function(a) {
      var b, c, d = a[0] / 255,
        e = a[1] / 255,
        f = a[2] / 255,
        g = Math.min(d, e, f),
        h = Math.max(d, e, f),
        i = h - g,
        j = h;
      if (0 === i) b = 0, c = 0;
      else {
        c = i / h;
        var k = ((h - d) / 6 + i / 2) / i,
          l = ((h - e) / 6 + i / 2) / i,
          m = ((h - f) / 6 + i / 2) / i;
        d === h ? b = m - l : e === h ? b = 1 / 3 + k - m : f === h && (b = 2 / 3 + l - k), 0 > b && (b += 1), b > 1 && (b -= 1)
      }
      return [Math.round(255 * b), Math.round(255 * c), Math.round(255 * j), a[3]]
    }, c.ColorUtils
  }({}, amdclean.core), amdclean.p5Color = function(a, b, c, d) {
    var e = b,
      f = c,
      d = d;
    return e.Color = function(a, b) {
      return this.color_array = e.Color._getFormattedColor.apply(a, b), this._normalizeColorArray(a), a._colorMode === d.HSB ? (this.hsba = this.color_array, this.rgba = f.hsbaToRGBA(this.hsba)) : (this.rgba = this.color_array, this.hsba = f.rgbaToHSBA(this.rgba)), this
    }, e.Color.prototype._normalizeColorArray = function(a) {
      var b = a._colorMode === d.RGB,
        c = b ? a._maxRGB : a._maxHSB,
        e = this.color_array;
      return e[0] *= 255 / c[0], e[1] *= 255 / c[1], e[2] *= 255 / c[2], e[3] *= 255 / c[3], e
    }, e.Color.prototype.getHue = function() {
      return this.hsba[0]
    }, e.Color.prototype.getSaturation = function() {
      return this.hsba[1]
    }, e.Color.prototype.getBrightness = function() {
      return this.hsba[2]
    }, e.Color.prototype.getRed = function() {
      return this.rgba[0]
    }, e.Color.prototype.getGreen = function() {
      return this.rgba[1]
    }, e.Color.prototype.getBlue = function() {
      return this.rgba[2]
    }, e.Color.prototype.getAlpha = function() {
      return this.rgba[3]
    }, e.Color.prototype.toString = function() {
      for (var a = this.rgba, b = 0; 3 > b; b++) a[b] = Math.floor(a[b]);
      var c = "undefined" != typeof a[3] ? a[3] / 255 : 1;
      return "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + c + ")"
    }, e.Color._getFormattedColor = function() {
      var a, b, c, e;
      return arguments.length >= 3 ? (a = arguments[0], b = arguments[1], c = arguments[2], e = "number" == typeof arguments[3] ? arguments[3] : 255) : (this._colorMode === d.RGB ? a = b = c = arguments[0] : (a = c = arguments[0], b = 0), e = "number" == typeof arguments[1] ? arguments[1] : 255), [a, b, c, e]
    }, e.Color
  }({}, amdclean.core, amdclean.utilscolor_utils, amdclean.constants), amdclean.p5Element = function(a, b) {
    function c(a, b, c) {
      var d = b.bind(c);
      c.elt.addEventListener(a, d, !1), c._events[a] = d
    }
    var d = b;
    return d.Element = function(a, b) {
      this.elt = a, this._pInst = b, this._events = {}, this.width = this.elt.offsetWidth, this.height = this.elt.offsetHeight
    }, d.Element.prototype.parent = function(a) {
      return "string" == typeof a ? a = document.getElementById(a) : a instanceof d.Element && (a = a.elt), a.appendChild(this.elt), this
    }, d.Element.prototype.id = function(a) {
      return this.elt.id = a, this
    }, d.Element.prototype["class"] = function(a) {
      return this.elt.className += " " + a, this
    }, d.Element.prototype.mousePressed = function(a) {
      return c("mousedown", a, this), c("touchstart", a, this), this
    }, d.Element.prototype.mouseWheel = function(a) {
      return c("mousewheel", a, this), this
    }, d.Element.prototype.mouseReleased = function(a) {
      return c("mouseup", a, this), c("touchend", a, this), this
    }, d.Element.prototype.mouseClicked = function(a) {
      return c("click", a, this), this
    }, d.Element.prototype.mouseMoved = function(a) {
      return c("mousemove", a, this), c("touchmove", a, this), this
    }, d.Element.prototype.mouseOver = function(a) {
      return c("mouseover", a, this), this
    }, d.Element.prototype.mouseOut = function(a) {
      return c("mouseout", a, this), this
    }, d.Element.prototype.touchStarted = function(a) {
      return c("touchstart", a, this), c("mousedown", a, this), this
    }, d.Element.prototype.touchMoved = function(a) {
      return c("touchmove", a, this), c("mousemove", a, this), this
    }, d.Element.prototype.touchEnded = function(a) {
      return c("touchend", a, this), c("mouseup", a, this), this
    }, d.Element.prototype.dragOver = function(a) {
      return c("dragover", a, this), this
    }, d.Element.prototype.dragLeave = function(a) {
      return c("dragleave", a, this), this
    }, d.Element.prototype.drop = function(a, b) {
      function e(b) {
        var c = new d.File(b);
        return function(b) {
          c.data = b.target.result, a(c)
        }
      }
      return window.File && window.FileReader && window.FileList && window.Blob ? (c("dragover", function(a) {
        a.stopPropagation(), a.preventDefault()
      }, this), c("dragleave", function(a) {
        a.stopPropagation(), a.preventDefault()
      }, this), arguments.length > 1 && c("drop", b, this), c("drop", function(a) {
        a.stopPropagation(), a.preventDefault();
        for (var b = a.dataTransfer.files, c = 0; c < b.length; c++) {
          var d = b[c],
            f = new FileReader;
          f.onload = e(d), "text" === d.type ? f.readAsText(d) : f.readAsDataURL(d)
        }
      }, this)) : console.log("The File APIs are not fully supported in this browser."), this
    }, d.Element.prototype._setProperty = function(a, b) {
      this[a] = b
    }, d.Element
  }({}, amdclean.core), amdclean.p5Graphics = function(a, b, c) {
    var d = b,
      c = c;
    return d.Graphics = function(a, b, c) {
      d.Element.call(this, a, b), this.canvas = a, this.drawingContext = this.canvas.getContext("2d"), this._pInst = b, c ? (this._isMainCanvas = !0, this._pInst._setProperty("_curElement", this), this._pInst._setProperty("canvas", this.canvas), this._pInst._setProperty("drawingContext", this.drawingContext), this._pInst._setProperty("width", this.width), this._pInst._setProperty("height", this.height)) : (this.canvas.style.display = "none", this._styles = [])
    }, d.Graphics.prototype = Object.create(d.Element.prototype), d.Graphics.prototype._applyDefaults = function() {
      this.drawingContext.fillStyle = "#FFFFFF", this.drawingContext.strokeStyle = "#000000", this.drawingContext.lineCap = c.ROUND, this.drawingContext.font = "normal 12px sans-serif"
    }, d.Graphics.prototype.resize = function(a, b) {
      this.width = a, this.height = b, this.elt.width = a * this._pInst._pixelDensity, this.elt.height = b * this._pInst._pixelDensity, this.elt.style.width = a + "px", this.elt.style.height = b + "px", this._isMainCanvas && (this._pInst._setProperty("width", this.width), this._pInst._setProperty("height", this.height)), this.drawingContext.scale(this._pInst._pixelDensity, this._pInst._pixelDensity)
    }, d.Graphics
  }({}, amdclean.core, amdclean.constants), amdclean.filters = function() {
    "use strict";

    function a(a) {
      var b = 3.5 * a | 0;
      if (b = 1 > b ? 1 : 248 > b ? b : 248, d !== b) {
        d = b, e = 1 + d << 1, f = new Int32Array(e), g = new Array(e);
        for (var c = 0; e > c; c++) g[c] = new Int32Array(256);
        for (var h, i, j, k, l = 1, m = b - 1; b > l; l++) {
          f[b + l] = f[m] = i = m * m, j = g[b + l], k = g[m--];
          for (var n = 0; 256 > n; n++) j[n] = k[n] = i * n
        }
        h = f[b] = b * b, j = g[b];
        for (var o = 0; 256 > o; o++) j[o] = h * o
      }
    }

    function b(b, h) {
      for (var i = c._toPixels(b), j = b.width, k = b.height, l = j * k, m = new Int32Array(l), n = 0; l > n; n++) m[n] = c._getARGB(i, n);
      var o, p, q, r, s, t, u, v, w, x, y = new Int32Array(l),
        z = new Int32Array(l),
        A = new Int32Array(l),
        B = new Int32Array(l),
        C = 0;
      a(h);
      var D, E, F, G;
      for (E = 0; k > E; E++) {
        for (D = 0; j > D; D++) {
          if (r = q = p = s = o = 0, t = D - d, 0 > t) x = -t, t = 0;
          else {
            if (t >= j) break;
            x = 0
          }
          for (F = x; e > F && !(t >= j); F++) {
            var H = m[t + C];
            G = g[F], s += G[(-16777216 & H) >>> 24], p += G[(16711680 & H) >> 16], q += G[(65280 & H) >> 8], r += G[255 & H], o += f[F], t++
          }
          u = C + D, y[u] = s / o, z[u] = p / o, A[u] = q / o, B[u] = r / o
        }
        C += j
      }
      for (C = 0, v = -d, w = v * j, E = 0; k > E; E++) {
        for (D = 0; j > D; D++) {
          if (r = q = p = s = o = 0, 0 > v) x = u = -v, t = D;
          else {
            if (v >= k) break;
            x = 0, u = v, t = D + w
          }
          for (F = x; e > F && !(u >= k); F++) G = g[F], s += G[y[t]], p += G[z[t]], q += G[A[t]], r += G[B[t]], o += f[F], u++, t += j;
          m[D + C] = s / o << 24 | p / o << 16 | q / o << 8 | r / o
        }
        C += j, w += j, v++
      }
      c._setPixels(i, m)
    }
    var c = {};
    c._toPixels = function(a) {
      return a instanceof ImageData ? a.data : a.getContext("2d").getImageData(0, 0, a.width, a.height).data
    }, c._getARGB = function(a, b) {
      var c = 4 * b;
      return a[c + 3] << 24 & 4278190080 | a[c] << 16 & 16711680 | a[c + 1] << 8 & 65280 | 255 & a[c + 2]
    }, c._setPixels = function(a, b) {
      for (var c = 0, d = 0, e = a.length; e > d; d++) c = 4 * d, a[c + 0] = (16711680 & b[d]) >>> 16, a[c + 1] = (65280 & b[d]) >>> 8, a[c + 2] = 255 & b[d], a[c + 3] = (4278190080 & b[d]) >>> 24
    }, c._toImageData = function(a) {
      return a instanceof ImageData ? a : a.getContext("2d").getImageData(0, 0, a.width, a.height)
    }, c._createImageData = function(a, b) {
      return c._tmpCanvas = document.createElement("canvas"), c._tmpCtx = c._tmpCanvas.getContext("2d"), this._tmpCtx.createImageData(a, b)
    }, c.apply = function(a, b, c) {
      var d = a.getContext("2d"),
        e = d.getImageData(0, 0, a.width, a.height),
        f = b(e, c);
      f instanceof ImageData ? d.putImageData(f, 0, 0, 0, 0, a.width, a.height) : d.putImageData(e, 0, 0, 0, 0, a.width, a.height)
    }, c.threshold = function(a, b) {
      var d = c._toPixels(a);
      void 0 === b && (b = .5);
      for (var e = Math.floor(255 * b), f = 0; f < d.length; f += 4) {
        var g, h = d[f],
          i = d[f + 1],
          j = d[f + 2],
          k = .2126 * h + .7152 * i + .0722 * j;
        g = k >= e ? 255 : 0, d[f] = d[f + 1] = d[f + 2] = g
      }
    }, c.gray = function(a) {
      for (var b = c._toPixels(a), d = 0; d < b.length; d += 4) {
        var e = b[d],
          f = b[d + 1],
          g = b[d + 2],
          h = .2126 * e + .7152 * f + .0722 * g;
        b[d] = b[d + 1] = b[d + 2] = h
      }
    }, c.opaque = function(a) {
      for (var b = c._toPixels(a), d = 0; d < b.length; d += 4) b[d + 3] = 255;
      return b
    }, c.invert = function(a) {
      for (var b = c._toPixels(a), d = 0; d < b.length; d += 4) b[d] = 255 - b[d], b[d + 1] = 255 - b[d + 1], b[d + 2] = 255 - b[d + 2]
    }, c.posterize = function(a, b) {
      var d = c._toPixels(a);
      if (2 > b || b > 255) throw new Error("Level must be greater than 2 and less than 255 for posterize");
      for (var e = b - 1, f = 0; f < d.length; f += 4) {
        var g = d[f],
          h = d[f + 1],
          i = d[f + 2];
        d[f] = 255 * (g * b >> 8) / e, d[f + 1] = 255 * (h * b >> 8) / e, d[f + 2] = 255 * (i * b >> 8) / e
      }
    }, c.dilate = function(a) {
      for (var b, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t = c._toPixels(a), u = 0, v = t.length ? t.length / 4 : 0, w = new Int32Array(v); v > u;)
        for (b = u, d = u + a.width; d > u;) e = f = c._getARGB(t, u), i = u - 1, h = u + 1, j = u - a.width, k = u + a.width, b > i && (i = u), h >= d && (h = u), 0 > j && (j = 0), k >= v && (k = u), n = c._getARGB(t, j), m = c._getARGB(t, i), o = c._getARGB(t, k), l = c._getARGB(t, h), g = 77 * (e >> 16 & 255) + 151 * (e >> 8 & 255) + 28 * (255 & e), q = 77 * (m >> 16 & 255) + 151 * (m >> 8 & 255) + 28 * (255 & m), p = 77 * (l >> 16 & 255) + 151 * (l >> 8 & 255) + 28 * (255 & l), r = 77 * (n >> 16 & 255) + 151 * (n >> 8 & 255) + 28 * (255 & n), s = 77 * (o >> 16 & 255) + 151 * (o >> 8 & 255) + 28 * (255 & o), q > g && (f = m, g = q), p > g && (f = l, g = p), r > g && (f = n, g = r), s > g && (f = o, g = s), w[u++] = f;
      c._setPixels(t, w)
    }, c.erode = function(a) {
      for (var b, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t = c._toPixels(a), u = 0, v = t.length ? t.length / 4 : 0, w = new Int32Array(v); v > u;)
        for (b = u, d = u + a.width; d > u;) e = f = c._getARGB(t, u), i = u - 1, h = u + 1, j = u - a.width, k = u + a.width, b > i && (i = u), h >= d && (h = u), 0 > j && (j = 0), k >= v && (k = u), n = c._getARGB(t, j), m = c._getARGB(t, i), o = c._getARGB(t, k), l = c._getARGB(t, h), g = 77 * (e >> 16 & 255) + 151 * (e >> 8 & 255) + 28 * (255 & e), q = 77 * (m >> 16 & 255) + 151 * (m >> 8 & 255) + 28 * (255 & m), p = 77 * (l >> 16 & 255) + 151 * (l >> 8 & 255) + 28 * (255 & l), r = 77 * (n >> 16 & 255) + 151 * (n >> 8 & 255) + 28 * (255 & n), s = 77 * (o >> 16 & 255) + 151 * (o >> 8 & 255) + 28 * (255 & o), g > q && (f = m, g = q), g > p && (f = l, g = p), g > r && (f = n, g = r), g > s && (f = o, g = s), w[u++] = f;
      c._setPixels(t, w)
    };
    var d, e, f, g;
    return c.blur = function(a, c) {
      b(a, c)
    }, c
  }({}), amdclean.p5Image = function(a, b, c) {
    "use strict";
    var d = b,
      e = c;
    return d.Image = function(a, b) {
      this.width = a, this.height = b, this.canvas = document.createElement("canvas"), this.canvas.width = this.width, this.canvas.height = this.height, this.drawingContext = this.canvas.getContext("2d"), this.pixels = []
    }, d.Image.prototype._setProperty = function(a, b) {
      this[a] = b
    }, d.Image.prototype.loadPixels = function() {
      d.prototype.loadPixels.call(this)
    }, d.Image.prototype.updatePixels = function(a, b, c, e) {
      d.prototype.updatePixels.call(this, a, b, c, e)
    }, d.Image.prototype.get = function(a, b, c, e) {
      return d.prototype.get.call(this, a, b, c, e)
    }, d.Image.prototype.set = function(a, b, c) {
      d.prototype.set.call(this, a, b, c)
    }, d.Image.prototype.resize = function(a, b) {
      a = a || this.canvas.width, b = b || this.canvas.height;
      var c = document.createElement("canvas");
      c.width = a, c.height = b, c.getContext("2d").drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, c.width, c.height), this.canvas.width = this.width = a, this.canvas.height = this.height = b, this.drawingContext.drawImage(c, 0, 0, a, b, 0, 0, a, b), this.pixels.length > 0 && this.loadPixels()
    }, d.Image.prototype.copy = function() {
      d.prototype.copy.apply(this, arguments)
    }, d.Image.prototype.mask = function(a) {
      void 0 === a && (a = this);
      var b = this.drawingContext.globalCompositeOperation,
        c = 1;
      a instanceof d.Graphics && (c = a._pInst._pixelDensity);
      var e = [a, 0, 0, c * a.width, c * a.height, 0, 0, this.width, this.height];
      this.drawingContext.globalCompositeOperation = "destination-in", this.copy.apply(this, e), this.drawingContext.globalCompositeOperation = b
    }, d.Image.prototype.filter = function(a, b) {
      e.apply(this.canvas, e[a.toLowerCase()], b)
    }, d.Image.prototype.blend = function() {
      d.prototype.blend.apply(this, arguments)
    }, d.Image.prototype.save = function(a, b) {
      var c;
      if (b) switch (b.toLowerCase()) {
        case "png":
          c = "image/png";
          break;
        case "jpeg":
          c = "image/jpeg";
          break;
        case "jpg":
          c = "image/jpeg";
          break;
        default:
          c = "image/png"
      } else b = "png", c = "image/png";
      var e = "image/octet-stream",
        f = this.canvas.toDataURL(c);
      f = f.replace(c, e), d.prototype.downloadFile(f, a, b)
    }, d.Image
  }({}, amdclean.core, amdclean.filters), amdclean.p5File = function(a, b) {
    var c = b;
    return c.File = function(a, b) {
      this.file = a, this._pInst = b;
      var c = a.type.split("/");
      this.type = c[0], this.subtype = c[1], this.name = a.name, this.size = a.size, this.data = void 0
    }, c.File
  }({}, amdclean.core), amdclean.polargeometry = function() {
    return {
      degreesToRadians: function(a) {
        return 2 * Math.PI * a / 360
      },
      radiansToDegrees: function(a) {
        return 360 * a / (2 * Math.PI)
      }
    }
  }({}), amdclean.p5Vector = function(a, b, c, d) {
    "use strict";
    var e = b,
      f = c,
      d = d;
    return e.Vector = function() {
      var a, b, c;
      arguments[0] instanceof e ? (this.p5 = arguments[0], a = arguments[1][0] || 0, b = arguments[1][1] || 0, c = arguments[1][2] || 0) : (a = arguments[0] || 0, b = arguments[1] || 0, c = arguments[2] || 0), this.x = a, this.y = b, this.z = c
    }, e.Vector.prototype.set = function(a, b, c) {
      return a instanceof e.Vector ? (this.x = a.x || 0, this.y = a.y || 0, this.z = a.z || 0, this) : a instanceof Array ? (this.x = a[0] || 0, this.y = a[1] || 0, this.z = a[2] || 0, this) : (this.x = a || 0, this.y = b || 0, this.z = c || 0, this)
    }, e.Vector.prototype.copy = function() {
      return this.p5 ? new e.Vector(this.p5, [this.x, this.y, this.z]) : new e.Vector(this.x, this.y, this.z)
    }, e.Vector.prototype.add = function(a, b, c) {
      return a instanceof e.Vector ? (this.x += a.x || 0, this.y += a.y || 0, this.z += a.z || 0, this) : a instanceof Array ? (this.x += a[0] || 0, this.y += a[1] || 0, this.z += a[2] || 0, this) : (this.x += a || 0, this.y += b || 0, this.z += c || 0, this)
    }, e.Vector.prototype.sub = function(a, b, c) {
      return a instanceof e.Vector ? (this.x -= a.x || 0, this.y -= a.y || 0, this.z -= a.z || 0, this) : a instanceof Array ? (this.x -= a[0] || 0, this.y -= a[1] || 0, this.z -= a[2] || 0, this) : (this.x -= a || 0, this.y -= b || 0, this.z -= c || 0, this)
    }, e.Vector.prototype.mult = function(a) {
      return this.x *= a || 0, this.y *= a || 0, this.z *= a || 0, this
    }, e.Vector.prototype.div = function(a) {
      return this.x /= a, this.y /= a, this.z /= a, this
    }, e.Vector.prototype.mag = function() {
      return Math.sqrt(this.magSq())
    }, e.Vector.prototype.magSq = function() {
      var a = this.x,
        b = this.y,
        c = this.z;
      return a * a + b * b + c * c
    }, e.Vector.prototype.dot = function(a, b, c) {
      return a instanceof e.Vector ? this.dot(a.x, a.y, a.z) : this.x * (a || 0) + this.y * (b || 0) + this.z * (c || 0)
    }, e.Vector.prototype.cross = function(a) {
      var b = this.y * a.z - this.z * a.y,
        c = this.z * a.x - this.x * a.z,
        d = this.x * a.y - this.y * a.x;
      return this.p5 ? new e.Vector(this.p5, [b, c, d]) : new e.Vector(b, c, d)
    }, e.Vector.prototype.dist = function(a) {
      var b = a.copy().sub(this);
      return b.mag()
    }, e.Vector.prototype.normalize = function() {
      return this.div(this.mag())
    }, e.Vector.prototype.limit = function(a) {
      var b = this.magSq();
      return b > a * a && (this.div(Math.sqrt(b)), this.mult(a)), this
    }, e.Vector.prototype.setMag = function(a) {
      return this.normalize().mult(a)
    }, e.Vector.prototype.heading = function() {
      var a = Math.atan2(this.y, this.x);
      return this.p5 ? this.p5._angleMode === d.RADIANS ? a : f.radiansToDegrees(a) : a
    }, e.Vector.prototype.rotate = function(a) {
      this.p5 && this.p5._angleMode === d.DEGREES && (a = f.degreesToRadians(a));
      var b = this.heading() + a,
        c = this.mag();
      return this.x = Math.cos(b) * c, this.y = Math.sin(b) * c, this
    }, e.Vector.prototype.lerp = function(a, b, c, d) {
      return a instanceof e.Vector ? this.lerp(a.x, a.y, a.z, b) : (this.x += (a - this.x) * d || 0, this.y += (b - this.y) * d || 0, this.z += (c - this.z) * d || 0, this)
    }, e.Vector.prototype.array = function() {
      return [this.x || 0, this.y || 0, this.z || 0]
    }, e.Vector.fromAngle = function(a) {
      return this.p5 && this.p5._angleMode === d.DEGREES && (a = f.degreesToRadians(a)), this.p5 ? new e.Vector(this.p5, [Math.cos(a), Math.sin(a), 0]) : new e.Vector(Math.cos(a), Math.sin(a), 0)
    }, e.Vector.random2D = function() {
      var a;
      return a = this.p5 ? this.p5.random(this.p5._angleMode === d.DEGREES ? 360 : d.TWO_PI) : Math.random() * Math.PI * 2, this.fromAngle(a)
    }, e.Vector.random3D = function() {
      var a, b;
      this.p5 ? (a = this.p5.random(0, d.TWO_PI), b = this.p5.random(-1, 1)) : (a = Math.random() * Math.PI * 2, b = 2 * Math.random() - 1);
      var c = Math.sqrt(1 - b * b) * Math.cos(a),
        f = Math.sqrt(1 - b * b) * Math.sin(a);
      return this.p5 ? new e.Vector(this.p5, [c, f, b]) : new e.Vector(c, f, b)
    }, e.Vector.add = function(a, b, c) {
      return c ? c.set(a) : c = a.copy(), c.add(b), c
    }, e.Vector.sub = function(a, b, c) {
      return c ? c.set(a) : c = a.copy(), c.sub(b), c
    }, e.Vector.mult = function(a, b, c) {
      return c ? c.set(a) : c = a.copy(), c.mult(b), c
    }, e.Vector.div = function(a, b, c) {
      return c ? c.set(a) : c = a.copy(), c.div(b), c
    }, e.Vector.dot = function(a, b) {
      return a.dot(b)
    }, e.Vector.cross = function(a, b) {
      return a.cross(b)
    }, e.Vector.dist = function(a, b) {
      return a.dist(b)
    }, e.Vector.lerp = function(a, b, c, d) {
      return d ? d.set(a) : d = a.copy(), d.lerp(b, c), d
    }, e.Vector.angleBetween = function(a, b) {
      var c = Math.acos(a.dot(b) / (a.mag() * b.mag()));
      return this.p5 && this.p5._angleMode === d.DEGREES && (c = f.radiansToDegrees(c)), c
    }, e.Vector
  }({}, amdclean.core, amdclean.polargeometry, amdclean.constants), amdclean.p5TableRow = function(a, b) {
    "use strict";
    var c = b;
    return c.TableRow = function(a, b) {
      var c = [],
        d = {};
      a && (b = b || ",", c = a.split(b));
      for (var e = 0; e < c.length; e++) {
        var f = e,
          g = c[e];
        d[f] = g
      }
      this.arr = c, this.obj = d, this.table = null
    }, c.TableRow.prototype.set = function(a, b) {
      if ("string" == typeof a) {
        var c = this.table.columns.indexOf(a);
        if (!(c >= 0)) throw 'This table has no column named "' + a + '"';
        this.obj[a] = b, this.arr[c] = b
      } else {
        if (!(a < this.table.columns.length)) throw "Column #" + a + " is out of the range of this table";
        this.arr[a] = b;
        var d = this.table.columns[a];
        this.obj[d] = b
      }
    }, c.TableRow.prototype.setNum = function(a, b) {
      var c = parseFloat(b, 10);
      this.set(a, c)
    }, c.TableRow.prototype.setString = function(a, b) {
      var c = b.toString();
      this.set(a, c)
    }, c.TableRow.prototype.get = function(a) {
      return "string" == typeof a ? this.obj[a] : this.arr[a]
    }, c.TableRow.prototype.getNum = function(a) {
      var b;
      if (b = "string" == typeof a ? parseFloat(this.obj[a], 10) : parseFloat(this.arr[a], 10), "NaN" === b.toString()) throw "Error: " + this.obj[a] + " is NaN (Not a Number)";
      return b
    }, c.TableRow.prototype.getString = function(a) {
      return "string" == typeof a ? this.obj[a].toString() : this.arr[a].toString()
    }, c.TableRow
  }({}, amdclean.core), amdclean.p5Table = function(a, b) {
    "use strict";
    var c = b;
    return c.Table = function() {
      this.columns = [], this.rows = []
    }, c.Table.prototype.addRow = function(a) {
      var b = a || new c.TableRow;
      if ("undefined" == typeof b.arr || "undefined" == typeof b.obj) throw "invalid TableRow: " + b;
      return b.table = this, this.rows.push(b), b
    }, c.Table.prototype.removeRow = function(a) {
      this.rows[a].table = null;
      var b = this.rows.splice(a + 1, this.rows.length);
      this.rows.pop(), this.rows = this.rows.concat(b)
    }, c.Table.prototype.getRow = function(a) {
      return this.rows[a]
    }, c.Table.prototype.getRows = function() {
      return this.rows
    }, c.Table.prototype.findRow = function(a, b) {
      if ("string" == typeof b) {
        for (var c = 0; c < this.rows.length; c++)
          if (this.rows[c].obj[b] === a) return this.rows[c]
      } else
        for (var d = 0; d < this.rows.length; d++)
          if (this.rows[d].arr[b] === a) return this.rows[d]; return null
    }, c.Table.prototype.findRows = function(a, b) {
      var c = [];
      if ("string" == typeof b)
        for (var d = 0; d < this.rows.length; d++) this.rows[d].obj[b] === a && c.push(this.rows[d]);
      else
        for (var e = 0; e < this.rows.length; e++) this.rows[e].arr[b] === a && c.push(this.rows[e]);
      return c
    }, c.Table.prototype.matchRow = function(a, b) {
      if ("number" == typeof b) {
        for (var c = 0; c < this.rows.length; c++)
          if (this.rows[c].arr[b].match(a)) return this.rows[c]
      } else
        for (var d = 0; d < this.rows.length; d++)
          if (this.rows[d].obj[b].match(a)) return this.rows[d]; return null
    }, c.Table.prototype.matchRows = function(a, b) {
      var c = [];
      if ("number" == typeof b)
        for (var d = 0; d < this.rows.length; d++) this.rows[d].arr[b].match(a) && c.push(this.rows[d]);
      else
        for (var e = 0; e < this.rows.length; e++) this.rows[e].obj[b].match(a) && c.push(this.rows[e]);
      return c
    }, c.Table.prototype.getColumn = function(a) {
      var b = [];
      if ("string" == typeof a)
        for (var c = 0; c < this.rows.length; c++) b.push(this.rows[c].obj[a]);
      else
        for (var d = 0; d < this.rows.length; d++) b.push(this.rows[d].arr[a]);
      return b
    }, c.Table.prototype.clearRows = function() {
      delete this.rows, this.rows = []
    }, c.Table.prototype.addColumn = function(a) {
      var b = a || null;
      this.columns.push(b)
    }, c.Table.prototype.getColumnCount = function() {
      return this.columns.length
    }, c.Table.prototype.getRowCount = function() {
      return this.rows.length
    }, c.Table.prototype.removeTokens = function(a, b) {
      for (var c = function(a) {
          return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }, d = [], e = 0; e < a.length; e++) d.push(c(a.charAt(e)));
      var f = new RegExp(d.join("|"), "g");
      if ("undefined" == typeof b)
        for (var g = 0; g < this.columns.length; g++)
          for (var h = 0; h < this.rows.length; h++) {
            var i = this.rows[h].arr[g];
            i = i.replace(f, ""), this.rows[h].arr[g] = i, this.rows[h].obj[this.columns[g]] = i
          } else if ("string" == typeof b)
            for (var j = 0; j < this.rows.length; j++) {
              var k = this.rows[j].obj[b];
              k = k.replace(f, ""), this.rows[j].obj[b] = k;
              var l = this.columns.indexOf(b);
              this.rows[j].arr[l] = k
            } else
              for (var m = 0; m < this.rows.length; m++) {
                var n = this.rows[m].arr[b];
                n = n.replace(f, ""), this.rows[m].arr[b] = n, this.rows[m].obj[this.columns[b]] = n
              }
    }, c.Table.prototype.trim = function(a) {
      var b = new RegExp(" ", "g");
      if ("undefined" == typeof a)
        for (var c = 0; c < this.columns.length; c++)
          for (var d = 0; d < this.rows.length; d++) {
            var e = this.rows[d].arr[c];
            e = e.replace(b, ""), this.rows[d].arr[c] = e, this.rows[d].obj[this.columns[c]] = e
          } else if ("string" == typeof a)
            for (var f = 0; f < this.rows.length; f++) {
              var g = this.rows[f].obj[a];
              g = g.replace(b, ""), this.rows[f].obj[a] = g;
              var h = this.columns.indexOf(a);
              this.rows[f].arr[h] = g
            } else
              for (var i = 0; i < this.rows.length; i++) {
                var j = this.rows[i].arr[a];
                j = j.replace(b, ""), this.rows[i].arr[a] = j, this.rows[i].obj[this.columns[a]] = j
              }
    }, c.Table.prototype.removeColumn = function(a) {
      var b, c;
      "string" == typeof a ? (b = a, c = this.columns.indexOf(a), console.log("string")) : (c = a, b = this.columns[a]);
      var d = this.columns.splice(c + 1, this.columns.length);
      this.columns.pop(), this.columns = this.columns.concat(d);
      for (var e = 0; e < this.rows.length; e++) {
        var f = this.rows[e].arr,
          g = f.splice(c + 1, f.length);
        f.pop(), this.rows[e].arr = f.concat(g), delete this.rows[e].obj[b]
      }
    }, c.Table
  }({}, amdclean.core), amdclean.colorcreating_reading = function(a, b) {
    "use strict";
    var c = b;
    return c.prototype.alpha = function(a) {
      if (a instanceof c.Color || a instanceof Array) return this.color(a).getAlpha();
      throw new Error("Needs p5.Color or pixel array as argument.")
    }, c.prototype.blue = function(a) {
      if (a instanceof c.Color || a instanceof Array) return this.color(a).getBlue();
      throw new Error("Needs p5.Color or pixel array as argument.")
    }, c.prototype.brightness = function(a) {
      if (!a instanceof c.Color) throw new Error("Needs p5.Color as argument.");
      return a.getBrightness()
    }, c.prototype.color = function() {
      if (arguments[0] instanceof c.Color) return arguments[0];
      if (arguments[0] instanceof Array) return new c.Color(this, arguments[0]);
      var a = Array.prototype.slice.call(arguments);
      return new c.Color(this, a)
    }, c.prototype.green = function(a) {
      if (a instanceof c.Color || a instanceof Array) return this.color(a).getGreen();
      throw new Error("Needs p5.Color or pixel array as argument.")
    }, c.prototype.hue = function(a) {
      if (!a instanceof c.Color) throw new Error("Needs p5.Color as argument.");
      return a.getHue()
    }, c.prototype.lerpColor = function(a, b, d) {
      if (a instanceof Array) {
        for (var e = [], f = 0; f < a.length; f++) e.push(c.prototype.lerp(a[f], b[f], d));
        return e
      }
      if (a instanceof c.Color) {
        for (var g = [], h = 0; 4 > h; h++) g.push(c.prototype.lerp(a.rgba[h], b.rgba[h], d));
        return new c.Color(this, g)
      }
      return c.prototype.lerp(a, b, d)
    }, c.prototype.red = function(a) {
      if (a instanceof c.Color || a instanceof Array) return this.color(a).getRed();
      throw new Error("Needs p5.Color or pixel array as argument.")
    }, c.prototype.saturation = function(a) {
      if (!a instanceof c.Color) throw new Error("Needs p5.Color as argument.");
      return a.getSaturation()
    }, c
  }({}, amdclean.core, amdclean.p5Color), amdclean.colorsetting = function(a, b, c) {
    "use strict";
    var d = b,
      c = c;
    return d.prototype._doStroke = !0, d.prototype._doFill = !0, d.prototype._colorMode = c.RGB, d.prototype._maxRGB = [255, 255, 255, 255], d.prototype._maxHSB = [255, 255, 255, 255], d.prototype.background = function() {
      if (this.drawingContext.save(), this.drawingContext.setTransform(1, 0, 0, 1, 0, 0), this.drawingContext.scale(this._pixelDensity, this._pixelDensity), arguments[0] instanceof d.Image) this.image(arguments[0], 0, 0, this.width, this.height);
      else {
        var a = this.drawingContext.fillStyle,
          b = this.color.apply(this, arguments),
          c = b.toString();
        this.drawingContext.fillStyle = c, this.drawingContext.fillRect(0, 0, this.width, this.height), this.drawingContext.fillStyle = a
      }
      this.drawingContext.restore()
    }, d.prototype.clear = function() {
      this.drawingContext.clearRect(0, 0, this.width, this.height)
    }, d.prototype.colorMode = function() {
      if (arguments[0] === c.RGB || arguments[0] === c.HSB) {
        this._colorMode = arguments[0];
        var a = this._colorMode === c.RGB,
          b = a ? this._maxRGB : this._maxHSB;
        2 === arguments.length ? (b[0] = arguments[1], b[1] = arguments[1], b[2] = arguments[1], b[3] = arguments[1]) : arguments.length > 2 && (b[0] = arguments[1], b[1] = arguments[2], b[2] = arguments[3]), 5 === arguments.length && (b[3] = arguments[4])
      }
    }, d.prototype.fill = function() {
      this._setProperty("_doFill", !0);
      var a = this.drawingContext,
        b = this.color.apply(this, arguments);
      a.fillStyle = b.toString()
    }, d.prototype.noFill = function() {
      this._setProperty("_doFill", !1)
    }, d.prototype.noStroke = function() {
      this._setProperty("_doStroke", !1)
    }, d.prototype.stroke = function() {
      this._setProperty("_doStroke", !0);
      var a = this.drawingContext,
        b = this.color.apply(this, arguments);
      a.strokeStyle = b.toString()
    }, d
  }({}, amdclean.core, amdclean.constants, amdclean.p5Color), amdclean.dataconversion = function(a, b) {
    "use strict";
    var c = b;
    return c.prototype["float"] = function(a) {
      return parseFloat(a)
    }, c.prototype["int"] = function(a, b) {
      return "string" == typeof a ? (b = b || 10, parseInt(a, b)) : "number" == typeof a ? 0 | a : "boolean" == typeof a ? a ? 1 : 0 : a instanceof Array ? a.map(c.prototype["int"]) : void 0
    }, c
  }({}, amdclean.core), amdclean.dataarray_functions = function(a, b) {
    "use strict";
    var c = b;
    return c.prototype.append = function(a, b) {
      return a.push(b), a
    }, c.prototype.arrayCopy = function(a, b, c, d, e) {
      var f, g;
      "undefined" != typeof e ? (g = Math.min(e, a.length), f = d, a = a.slice(b, g + b)) : ("undefined" != typeof c ? (g = c, g = Math.min(g, a.length)) : g = a.length, f = 0, c = b, a = a.slice(0, g)), Array.prototype.splice.apply(c, [f, g].concat(a))
    }, c.prototype.concat = function(a, b) {
      return a.concat(b)
    }, c.prototype.reverse = function(a) {
      return a.reverse()
    }, c.prototype.shorten = function(a) {
      return a.pop(), a
    }, c.prototype.sort = function(a, b) {
      var c = b ? a.slice(0, Math.min(b, a.length)) : a,
        d = b ? a.slice(Math.min(b, a.length)) : [];
      return c = "string" == typeof c[0] ? c.sort() : c.sort(function(a, b) {
        return a - b
      }), c.concat(d)
    }, c.prototype.splice = function(a, b, c) {
      return Array.prototype.splice.apply(a, [c, 0].concat(b)), a
    }, c.prototype.subset = function(a, b, c) {
      return "undefined" != typeof c ? a.slice(b, b + c) : a.slice(b, a.length)
    }, c
  }({}, amdclean.core), amdclean.datastring_functions = function(a, b) {
    "use strict";

    function c() {
      var a = arguments[0],
        b = 0 > a,
        c = b ? a.toString().substring(1) : a.toString(),
        d = c.indexOf("."),
        e = -1 !== d ? c.substring(0, d) : c,
        f = -1 !== d ? c.substring(d + 1) : "",
        g = b ? "-" : "";
      if (3 === arguments.length) {
        for (var h = 0; h < arguments[1] - e.length; h++) g += "0";
        g += e, g += ".", g += f;
        for (var i = 0; i < arguments[2] - f.length; i++) g += "0";
        return g
      }
      for (var j = 0; j < Math.max(arguments[1] - e.length, 0); j++) g += "0";
      return g += c
    }

    function d() {
      var a = arguments[0].toString(),
        b = a.indexOf("."),
        c = -1 !== b ? a.substring(b) : "",
        d = -1 !== b ? a.substring(0, b) : a;
      return d = d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 0 === arguments[1] && (c = ""), arguments.length > 1 && (c = c.substring(0, arguments[1] + 1)), d + c
    }

    function e() {
      return parseFloat(arguments[0]) > 0 ? "+" + arguments[0].toString() : arguments[0].toString()
    }

    function f() {
      return parseFloat(arguments[0]) > 0 ? " " + arguments[0].toString() : arguments[0].toString()
    }
    var g = b;
    return g.prototype.join = function(a, b) {
      return a.join(b)
    }, g.prototype.match = function(a, b) {
      return a.match(b)
    }, g.prototype.matchAll = function(a, b) {
      for (var c = new RegExp(b, "g"), d = c.exec(a), e = []; null !== d;) e.push(d), d = c.exec(a);
      return e
    }, g.prototype.nf = function() {
      if (arguments[0] instanceof Array) {
        var a = arguments[1],
          b = arguments[2];
        return arguments[0].map(function(d) {
          return c(d, a, b)
        })
      }
      return c.apply(this, arguments)
    }, g.prototype.nfc = function() {
      if (arguments[0] instanceof Array) {
        var a = arguments[1];
        return arguments[0].map(function(b) {
          return d(b, a)
        })
      }
      return d.apply(this, arguments)
    }, g.prototype.nfp = function() {
      var a = this.nf(arguments);
      return a instanceof Array ? a.map(e) : e(a)
    }, g.prototype.nfs = function() {
      var a = this.nf(arguments);
      return a instanceof Array ? a.map(f) : f(a)
    }, g.prototype.split = function(a, b) {
      return a.split(b)
    }, g.prototype.splitTokens = function() {
      var a = arguments.length > 0 ? arguments[1] : /\s/g;
      return arguments[0].split(a).filter(function(a) {
        return a
      })
    }, g.prototype.trim = function(a) {
      return a instanceof Array ? a.map(this.trim) : a.trim()
    }, g
  }({}, amdclean.core), amdclean.environment = function(a, b, c) {
    "use strict";

    function d(a) {
      var b = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
      if (!b) throw new Error("Fullscreen not enabled in this browser.");
      a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.msRequestFullscreen && a.msRequestFullscreen()
    }

    function e() {
      document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
    }
    var f = b,
      g = c,
      h = [g.ARROW, g.CROSS, g.HAND, g.MOVE, g.TEXT, g.WAIT];
    return f.prototype._frameRate = 0, f.prototype._lastFrameTime = (new Date).getTime(), f.prototype._targetFrameRate = 60, f.prototype.frameCount = 0, f.prototype.focused = !0, f.prototype.cursor = function(a, b, c) {
      var d = "auto",
        e = this._curElement.elt;
      if (h.indexOf(a) > -1) d = a;
      else if ("string" == typeof a) {
        var f = "";
        b && c && "number" == typeof b && "number" == typeof c && (f = b + " " + c), d = "http://" !== a.substring(0, 6) ? "url(" + a + ") " + f + ", auto" : /\.(cur|jpg|jpeg|gif|png|CUR|JPG|JPEG|GIF|PNG)$/.test(a) ? "url(" + a + ") " + f + ", auto" : a
      }
      e.style.cursor = d
    }, f.prototype.frameRate = function(a) {
      return "undefined" == typeof a ? this._frameRate : (this._setProperty("_targetFrameRate", a), this._runFrames(), this)
    }, f.prototype.getFrameRate = function() {
      return this.frameRate()
    }, f.prototype.setFrameRate = function(a) {
      return this.frameRate(a)
    }, f.prototype.noCursor = function() {
      this._curElement.elt.style.cursor = "none"
    }, f.prototype.displayWidth = screen.width, f.prototype.displayHeight = screen.height, f.prototype.windowWidth = window.innerWidth, f.prototype.windowHeight = window.innerHeight, f.prototype.onresize = function(a) {
      this._setProperty("windowWidth", window.innerWidth), this._setProperty("windowHeight", window.innerHeight);
      var b, c = this._isGlobal ? window : this;
      "function" == typeof c.windowResized && (b = c.windowResized(a), void 0 === b || b || a.preventDefault())
    }, f.prototype.width = 0, f.prototype.height = 0, f.prototype.fullscreen = function(a) {
      return "undefined" == typeof a ? document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement : void(a ? d(document.documentElement) : e())
    }, f.prototype.devicePixelScaling = function(a) {
      this._pixelDensity = a ? window.devicePixelRatio || 1 : 1, this.resizeCanvas(this.width, this.height, !0)
    }, f.prototype.getURL = function() {
      return location.href
    }, f.prototype.getURLPath = function() {
      return location.pathname.split("/").filter(function(a) {
        return "" !== a
      })
    }, f.prototype.getURLParams = function() {
      for (var a, b = /[?&]([^&=]+)(?:[&=])([^&=]+)/gim, c = {}; null != (a = b.exec(location.search));) a.index === b.lastIndex && b.lastIndex++, c[a[1]] = a[2];
      return c
    }, f
  }({}, amdclean.core, amdclean.constants), amdclean.imageimage = function(a, b, c) {
    "use strict";
    var d = b,
      c = c;
    return d.prototype._imageMode = c.CORNER, d.prototype._tint = null, d.prototype.createImage = function(a, b) {
      return new d.Image(a, b)
    }, d
  }({}, amdclean.core, amdclean.constants), amdclean.canvas = function(a, b) {
    var b = b;
    return {
      modeAdjust: function(a, c, d, e, f) {
        return f === b.CORNER ? {
          x: a,
          y: c,
          w: d,
          h: e
        } : f === b.CORNERS ? {
          x: a,
          y: c,
          w: d - a,
          h: e - c
        } : f === b.RADIUS ? {
          x: a - d,
          y: c - e,
          w: 2 * d,
          h: 2 * e
        } : f === b.CENTER ? {
          x: a - .5 * d,
          y: c - .5 * e,
          w: d,
          h: e
        } : void 0
      },
      arcModeAdjust: function(a, c, d, e, f) {
        return f === b.CORNER ? {
          x: a + .5 * d,
          y: c + .5 * e,
          w: d,
          h: e
        } : f === b.CORNERS ? {
          x: a,
          y: c,
          w: d + a,
          h: e + c
        } : f === b.RADIUS ? {
          x: a,
          y: c,
          w: 2 * d,
          h: 2 * e
        } : f === b.CENTER ? {
          x: a,
          y: c,
          w: d,
          h: e
        } : void 0
      }
    }
  }({}, amdclean.constants), amdclean.imageloading_displaying = function(a, b, c, d, e) {
    "use strict";
    var f = b,
      g = c,
      d = d,
      e = e;
    return f.prototype.loadImage = function(a, b, c) {
      var d = new Image,
        e = new f.Image(1, 1, this);
      return d.onload = function() {
        e.width = e.canvas.width = d.width, e.height = e.canvas.height = d.height, e.canvas.getContext("2d").drawImage(d, 0, 0), "function" == typeof b && b(e)
      }, d.onerror = function(a) {
        "function" == typeof c && c(a)
      }, 0 !== a.indexOf("data:image/") && (d.crossOrigin = "Anonymous"), d.src = a, e
    }, f.prototype.image = function(a, b, c, e, f) {
      var g = a.canvas || a.elt;
      b = b || 0, c = c || 0, e = e || a.width, f = f || a.height;
      var h = d.modeAdjust(b, c, e, f, this._imageMode);
      try {
        this._tint && a.canvas ? this.drawingContext.drawImage(this._getTintedImageCanvas(a), h.x, h.y, h.w, h.h) : this.drawingContext.drawImage(g, h.x, h.y, h.w, h.h)
      } catch (i) {
        if ("NS_ERROR_NOT_AVAILABLE" !== i.name) throw i
      }
    }, f.prototype.tint = function() {
      var a = this.color.apply(this, arguments);
      this._tint = a.rgba
    }, f.prototype.noTint = function() {
      this._tint = null
    }, f.prototype._getTintedImageCanvas = function(a) {
      if (!a.canvas) return a;
      var b = g._toPixels(a.canvas),
        c = document.createElement("canvas");
      c.width = a.canvas.width, c.height = a.canvas.height;
      for (var d = c.getContext("2d"), e = d.createImageData(a.canvas.width, a.canvas.height), f = e.data, h = 0; h < b.length; h += 4) {
        var i = b[h],
          j = b[h + 1],
          k = b[h + 2],
          l = b[h + 3];
        f[h] = i * this._tint[0] / 255, f[h + 1] = j * this._tint[1] / 255, f[h + 2] = k * this._tint[2] / 255, f[h + 3] = l * this._tint[3] / 255
      }
      return d.putImageData(e, 0, 0), c
    }, f.prototype.imageMode = function(a) {
      (a === e.CORNER || a === e.CORNERS || a === e.CENTER) && (this._imageMode = a)
    }, f
  }({}, amdclean.core, amdclean.filters, amdclean.canvas, amdclean.constants), amdclean.imagepixels = function(a, b, c) {
    "use strict";
    var d = b,
      e = c;
    return d.prototype.pixels = [], d.prototype.blend = function() {
      var a = this.drawingContext.globalCompositeOperation,
        b = arguments[arguments.length - 1],
        c = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
      this.drawingContext.globalCompositeOperation = b, this.copy.apply(this, c), this.drawingContext.globalCompositeOperation = a
    }, d.prototype.copy = function() {
      var a, b, c, d, e, f, g, h, i;
      if (9 === arguments.length) a = arguments[0], b = arguments[1], c = arguments[2], d = arguments[3], e = arguments[4], f = arguments[5], g = arguments[6], h = arguments[7], i = arguments[8];
      else {
        if (8 !== arguments.length) throw new Error("Signature not supported");
        b = arguments[0], c = arguments[1], d = arguments[2], e = arguments[3], f = arguments[4], g = arguments[5], h = arguments[6], i = arguments[7], a = this
      }
      var j = a.canvas.width / a.width;
      this.drawingContext.drawImage(a.canvas, j * b, j * c, j * d, j * e, f, g, h, i)
    }, d.prototype.filter = function(a, b) {
      e.apply(this.canvas, e[a.toLowerCase()], b)
    }, d.prototype.get = function(a, b, c, e) {
      if (void 0 === a && void 0 === b && void 0 === c && void 0 === e ? (a = 0, b = 0, c = this.width, e = this.height) : void 0 === c && void 0 === e && (c = 1, e = 1), a > this.width || b > this.height || 0 > a || 0 > b) return [0, 0, 0, 255];
      var f = this.drawingContext.getImageData(a, b, c, e),
        g = f.data;
      if (1 === c && 1 === e) {
        for (var h = [], i = 0; i < g.length; i += 4) h.push(g[i], g[i + 1], g[i + 2], g[i + 3]);
        return h
      }
      c = Math.min(c, this.width), e = Math.min(e, this.height);
      var j = new d.Image(c, e);
      return j.canvas.getContext("2d").putImageData(f, 0, 0, 0, 0, c, e), j
    }, d.prototype.loadPixels = function() {
      var a = this.width,
        b = this.height,
        c = this.drawingContext.getImageData(0, 0, a, b);
      this._setProperty("imageData", c), this._setProperty("pixels", c.data)
    }, d.prototype.set = function(a, b, c) {
      if (c instanceof d.Image) this.drawingContext.save(), this.drawingContext.setTransform(1, 0, 0, 1, 0, 0), this.drawingContext.scale(this._pixelDensity, this._pixelDensity), this.drawingContext.drawImage(c.canvas, a, b), this.loadPixels.call(this), this.drawingContext.restore();
      else {
        var e = 4 * (b * this.width + a);
        if (this.imageData || this.loadPixels.call(this), "number" == typeof c) e < this.pixels.length && (this.pixels[e] = c, this.pixels[e + 1] = c, this.pixels[e + 2] = c, this.pixels[e + 3] = 255);
        else if (c instanceof Array) {
          if (c.length < 4) throw new Error("pixel array must be of the form [R, G, B, A]");
          e < this.pixels.length && (this.pixels[e] = c[0], this.pixels[e + 1] = c[1], this.pixels[e + 2] = c[2], this.pixels[e + 3] = c[3])
        } else c instanceof d.Color && e < this.pixels.length && (this.pixels[e] = c.rgba[0], this.pixels[e + 1] = c.rgba[1], this.pixels[e + 2] = c.rgba[2], this.pixels[e + 3] = c.rgba[3])
      }
    }, d.prototype.updatePixels = function(a, b, c, d) {
      void 0 === a && void 0 === b && void 0 === c && void 0 === d && (a = 0, b = 0, c = this.width, d = this.height), this.drawingContext.putImageData(this.imageData, a, b, 0, 0, c, d)
    }, d
  }({}, amdclean.core, amdclean.filters, amdclean.p5Color), ! function(a, b, c) {
    "undefined" != typeof module && module.exports ? module.exports = c() : "function" == typeof define && define.amd ? define("reqwest", c) : b[a] = c()
  }("reqwest", amdclean, function() {
    function handleReadyState(a, b, c) {
      return function() {
        return a._aborted ? c(a.request) : void(a.request && 4 == a.request[readyState] && (a.request.onreadystatechange = noop, twoHundo.test(a.request.status) ? b(a.request) : c(a.request)))
      }
    }

    function setHeaders(a, b) {
      var c, d = b.headers || {};
      d.Accept = d.Accept || defaultHeaders.accept[b.type] || defaultHeaders.accept["*"], b.crossOrigin || d[requestedWith] || (d[requestedWith] = defaultHeaders.requestedWith), d[contentType] || (d[contentType] = b.contentType || defaultHeaders.contentType);
      for (c in d) d.hasOwnProperty(c) && "setRequestHeader" in a && a.setRequestHeader(c, d[c])
    }

    function setCredentials(a, b) {
      "undefined" != typeof b.withCredentials && "undefined" != typeof a.withCredentials && (a.withCredentials = !!b.withCredentials)
    }

    function generalCallback(a) {
      lastValue = a
    }

    function urlappend(a, b) {
      return a + (/\?/.test(a) ? "&" : "?") + b
    }

    function handleJsonp(a, b, c, d) {
      var e = uniqid++,
        f = a.jsonpCallback || "callback",
        g = a.jsonpCallbackName || reqwest.getcallbackPrefix(e),
        h = new RegExp("((^|\\?|&)" + f + ")=([^&]+)"),
        i = d.match(h),
        j = doc.createElement("script"),
        k = 0,
        l = -1 !== navigator.userAgent.indexOf("MSIE 10.0");
      return i ? "?" === i[3] ? d = d.replace(h, "$1=" + g) : g = i[3] : d = urlappend(d, f + "=" + g), win[g] = generalCallback, j.type = "text/javascript", j.src = d, j.async = !0, "undefined" == typeof j.onreadystatechange || l || (j.event = "onclick", j.htmlFor = j.id = "_reqwest_" + e), j.onload = j.onreadystatechange = function() {
        return j[readyState] && "complete" !== j[readyState] && "loaded" !== j[readyState] || k ? !1 : (j.onload = j.onreadystatechange = null, j.onclick && j.onclick(), b(lastValue), lastValue = void 0, head.removeChild(j), void(k = 1))
      }, head.appendChild(j), {
        abort: function() {
          j.onload = j.onreadystatechange = null, c({}, "Request is aborted: timeout", {}), lastValue = void 0, head.removeChild(j), k = 1
        }
      }
    }

    function getRequest(a, b) {
      var c, d = this.o,
        e = (d.method || "GET").toUpperCase(),
        f = "string" == typeof d ? d : d.url,
        g = d.processData !== !1 && d.data && "string" != typeof d.data ? reqwest.toQueryString(d.data) : d.data || null,
        h = !1;
      return "jsonp" != d.type && "GET" != e || !g || (f = urlappend(f, g), g = null), "jsonp" == d.type ? handleJsonp(d, a, b, f) : (c = d.xhr && d.xhr(d) || xhr(d), c.open(e, f, d.async === !1 ? !1 : !0), setHeaders(c, d), setCredentials(c, d), win[xDomainRequest] && c instanceof win[xDomainRequest] ? (c.onload = a, c.onerror = b, c.onprogress = function() {}, h = !0) : c.onreadystatechange = handleReadyState(this, a, b), d.before && d.before(c), h ? setTimeout(function() {
        c.send(g)
      }, 200) : c.send(g), c)
    }

    function Reqwest(a, b) {
      this.o = a, this.fn = b, init.apply(this, arguments)
    }

    function setType(a) {
      var b = a.match(/\.(json|jsonp|html|xml)(\?|$)/);
      return b ? b[1] : "js"
    }

    function init(o, fn) {
      function complete(a) {
        for (o.timeout && clearTimeout(self.timeout), self.timeout = null; self._completeHandlers.length > 0;) self._completeHandlers.shift()(a)
      }

      function success(resp) {
        resp = "jsonp" !== type ? self.request : resp;
        var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type),
          r = filteredResponse;
        try {
          resp.responseText = r
        } catch (e) {}
        if (r) switch (type) {
          case "json":
            try {
              resp = win.JSON ? win.JSON.parse(r) : eval("(" + r + ")")
            } catch (err) {
              return error(resp, "Could not parse JSON in response", err)
            }
            break;
          case "js":
            resp = eval(r);
            break;
          case "html":
            resp = r;
            break;
          case "xml":
            resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML
        }
        for (self._responseArgs.resp = resp, self._fulfilled = !0, fn(resp), self._successHandler(resp); self._fulfillmentHandlers.length > 0;) resp = self._fulfillmentHandlers.shift()(resp);
        complete(resp)
      }

      function error(a, b, c) {
        for (a = self.request, self._responseArgs.resp = a, self._responseArgs.msg = b, self._responseArgs.t = c, self._erred = !0; self._errorHandlers.length > 0;) self._errorHandlers.shift()(a, b, c);
        complete(a)
      }
      this.url = "string" == typeof o ? o : o.url, this.timeout = null, this._fulfilled = !1, this._successHandler = function() {}, this._fulfillmentHandlers = [], this._errorHandlers = [], this._completeHandlers = [], this._erred = !1, this._responseArgs = {};
      var self = this,
        type = o.type || setType(this.url);
      fn = fn || function() {}, o.timeout && (this.timeout = setTimeout(function() {
        self.abort()
      }, o.timeout)), o.success && (this._successHandler = function() {
        o.success.apply(o, arguments)
      }), o.error && this._errorHandlers.push(function() {
        o.error.apply(o, arguments)
      }), o.complete && this._completeHandlers.push(function() {
        o.complete.apply(o, arguments)
      }), this.request = getRequest.call(this, success, error)
    }

    function reqwest(a, b) {
      return new Reqwest(a, b)
    }

    function normalize(a) {
      return a ? a.replace(/\r?\n/g, "\r\n") : ""
    }

    function serial(a, b) {
      var c, d, e, f, g = a.name,
        h = a.tagName.toLowerCase(),
        i = function(a) {
          a && !a.disabled && b(g, normalize(a.attributes.value && a.attributes.value.specified ? a.value : a.text))
        };
      if (!a.disabled && g) switch (h) {
        case "input":
          /reset|button|image|file/i.test(a.type) || (c = /checkbox/i.test(a.type), d = /radio/i.test(a.type), e = a.value, (!(c || d) || a.checked) && b(g, normalize(c && "" === e ? "on" : e)));
          break;
        case "textarea":
          b(g, normalize(a.value));
          break;
        case "select":
          if ("select-one" === a.type.toLowerCase()) i(a.selectedIndex >= 0 ? a.options[a.selectedIndex] : null);
          else
            for (f = 0; a.length && f < a.length; f++) a.options[f].selected && i(a.options[f])
      }
    }

    function eachFormElement() {
      var a, b, c = this,
        d = function(a, b) {
          var d, e, f;
          for (d = 0; d < b.length; d++)
            for (f = a[byTag](b[d]), e = 0; e < f.length; e++) serial(f[e], c)
        };
      for (b = 0; b < arguments.length; b++) a = arguments[b], /input|select|textarea/i.test(a.tagName) && serial(a, c), d(a, ["input", "select", "textarea"])
    }

    function serializeQueryString() {
      return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
    }

    function serializeHash() {
      var a = {};
      return eachFormElement.apply(function(b, c) {
        b in a ? (a[b] && !isArray(a[b]) && (a[b] = [a[b]]), a[b].push(c)) : a[b] = c
      }, arguments), a
    }

    function buildParams(a, b, c, d) {
      var e, f, g, h = /\[\]$/;
      if (isArray(b))
        for (f = 0; b && f < b.length; f++) g = b[f], c || h.test(a) ? d(a, g) : buildParams(a + "[" + ("object" == typeof g ? f : "") + "]", g, c, d);
      else if (b && "[object Object]" === b.toString())
        for (e in b) buildParams(a + "[" + e + "]", b[e], c, d);
      else d(a, b)
    }
    var win = window,
      doc = document,
      twoHundo = /^(20\d|1223)$/,
      byTag = "getElementsByTagName",
      readyState = "readyState",
      contentType = "Content-Type",
      requestedWith = "X-Requested-With",
      head = doc[byTag]("head")[0],
      uniqid = 0,
      callbackPrefix = "reqwest_" + +new Date,
      lastValue, xmlHttpRequest = "XMLHttpRequest",
      xDomainRequest = "XDomainRequest",
      noop = function() {},
      isArray = "function" == typeof Array.isArray ? Array.isArray : function(a) {
        return a instanceof Array
      },
      defaultHeaders = {
        contentType: "application/x-www-form-urlencoded",
        requestedWith: xmlHttpRequest,
        accept: {
          "*": "text/javascript, text/html, application/xml, text/xml, */*",
          xml: "application/xml, text/xml",
          html: "text/html",
          text: "text/plain",
          json: "application/json, text/javascript",
          js: "application/javascript, text/javascript"
        }
      },
      xhr = function(a) {
        if (a.crossOrigin === !0) {
          var b = win[xmlHttpRequest] ? new XMLHttpRequest : null;
          if (b && "withCredentials" in b) return b;
          if (win[xDomainRequest]) return new XDomainRequest;
          throw new Error("Browser does not support cross-origin requests")
        }
        return win[xmlHttpRequest] ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")
      },
      globalSetupOptions = {
        dataFilter: function(a) {
          return a
        }
      };
    return Reqwest.prototype = {
      abort: function() {
        this._aborted = !0, this.request.abort()
      },
      retry: function() {
        init.call(this, this.o, this.fn)
      },
      then: function(a, b) {
        return a = a || function() {}, b = b || function() {}, this._fulfilled ? this._responseArgs.resp = a(this._responseArgs.resp) : this._erred ? b(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : (this._fulfillmentHandlers.push(a), this._errorHandlers.push(b)), this
      },
      always: function(a) {
        return this._fulfilled || this._erred ? a(this._responseArgs.resp) : this._completeHandlers.push(a), this
      },
      fail: function(a) {
        return this._erred ? a(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : this._errorHandlers.push(a), this
      }
    }, reqwest.serializeArray = function() {
      var a = [];
      return eachFormElement.apply(function(b, c) {
        a.push({
          name: b,
          value: c
        })
      }, arguments), a
    }, reqwest.serialize = function() {
      if (0 === arguments.length) return "";
      var a, b, c = Array.prototype.slice.call(arguments, 0);
      return a = c.pop(), a && a.nodeType && c.push(a) && (a = null), a && (a = a.type), b = "map" == a ? serializeHash : "array" == a ? reqwest.serializeArray : serializeQueryString, b.apply(null, c)
    }, reqwest.toQueryString = function(a, b) {
      var c, d, e = b || !1,
        f = [],
        g = encodeURIComponent,
        h = function(a, b) {
          b = "function" == typeof b ? b() : null == b ? "" : b, f[f.length] = g(a) + "=" + g(b)
        };
      if (isArray(a))
        for (d = 0; a && d < a.length; d++) h(a[d].name, a[d].value);
      else
        for (c in a) a.hasOwnProperty(c) && buildParams(c, a[c], e, h);
      return f.join("&").replace(/%20/g, "+")
    }, reqwest.getcallbackPrefix = function() {
      return callbackPrefix
    }, reqwest.compat = function(a, b) {
      return a && (a.type && (a.method = a.type) && delete a.type, a.dataType && (a.type = a.dataType), a.jsonpCallback && (a.jsonpCallbackName = a.jsonpCallback) && delete a.jsonpCallback, a.jsonp && (a.jsonpCallback = a.jsonp)), new Reqwest(a, b)
    }, reqwest.ajaxSetup = function(a) {
      a = a || {};
      for (var b in a) globalSetupOptions[b] = a[b]
    }, reqwest
  }), amdclean.inputfiles = function(a, b, c) {
    "use strict";

    function d(a, b) {
      var c = {};
      if (b = b || [], "undefined" == typeof b)
        for (var d = 0; d < a.length; d++) b[d.toString()] = d;
      for (var e = 0; e < b.length; e++) {
        var f = b[e],
          g = a[e];
        c[f] = g
      }
      return c
    }
    var e = b,
      c = c;
    return e.prototype.createInput = function() {
      throw "not yet implemented"
    }, e.prototype.createReader = function() {
      throw "not yet implemented"
    }, e.prototype.loadBytes = function() {
      throw "not yet implemented"
    }, e.prototype.loadJSON = function() {
      var a = arguments[0],
        b = arguments[1],
        d = [],
        e = "json";
      return "string" == typeof arguments[2] && ("jsonp" === arguments[2] || "json" === arguments[2]) && (e = arguments[2]), c({
        url: a,
        type: e,
        crossOrigin: !0
      }).then(function(a) {
        for (var c in a) d[c] = a[c];
        "undefined" != typeof b && b(a)
      }), d
    }, e.prototype.loadStrings = function(a, b) {
      var c = [],
        d = new XMLHttpRequest;
      return d.open("GET", a, !0), d.onreadystatechange = function() {
        if (4 === d.readyState && (200 === d.status || 0 === d.status)) {
          var a = d.responseText.match(/[^\r\n]+/g);
          for (var e in a) c[e] = a[e];
          "undefined" != typeof b && b(c)
        }
      }, d.send(null), c
    }, e.prototype.loadTable = function(a) {
      for (var b = null, c = [], f = !1, g = ",", h = 1; h < arguments.length; h++) "function" == typeof arguments[h] ? b = arguments[h] : "string" == typeof arguments[h] && (c.push(arguments[h]), "header" === arguments[h] && (f = !0), "csv" === arguments[h] ? g = "," : "tsv" === arguments[h] && (g = "	"));
      var i = [],
        j = new e.Table,
        k = new XMLHttpRequest;
      return k.open("GET", a, !0), k.onreadystatechange = function() {
        if (4 === k.readyState && (200 === k.status || 0 === k.status)) {
          var a = k.responseText.match(/[^\r\n]+/g);
          for (var c in a) i[c] = a[c];
          if ("undefined" != typeof b) {
            var h, l;
            if (f)
              for (j.columns = new e.TableRow(i[0]).arr, h = 1; h < i.length; h++) l = new e.TableRow(i[h], g), l.obj = d(l.arr, j.columns), j.addRow(l);
            else {
              for (h = 0; h < i[0].split(g).length; h++) j.columns[h] = h.toString();
              for (h = 0; h < i.length; h++) l = new e.TableRow(i[h], g), j.addRow(l)
            }
            b(j)
          }
        }
      }, k.send(null), j
    }, e.prototype.loadXML = function(a, b) {
      var d = [];
      return c({
        url: a,
        type: "xml",
        crossOrigin: !0
      }).then(function(a) {
        b(a)
      }), d
    }, e.prototype.parseXML = function() {
      throw "not yet implemented"
    }, e.prototype.selectFolder = function() {
      throw "not yet implemented"
    }, e.prototype.selectInput = function() {
      throw "not yet implemented"
    }, e.prototype.httpGet = function() {
      var a = Array.prototype.slice.call(arguments);
      a.push("GET"), e.prototype.httpDo.apply(this, a)
    }, e.prototype.httpPost = function() {
      var a = Array.prototype.slice.call(arguments);
      a.push("POST"), e.prototype.httpDo.apply(this, a)
    }, e.prototype.httpDo = function() {
      for (var a, b = "GET", d = arguments[0], e = {}, f = "", g = 1; g < arguments.length; g++) {
        var h = arguments[g];
        "string" == typeof h ? "GET" === h || "POST" === h || "PUT" === h ? b = h : f = h : "object" == typeof h ? e = h : "function" == typeof h && (a = h)
      }
      "" === f && (f = -1 !== d.indexOf("json") ? "json" : -1 !== d.indexOf("xml") ? "xml" : "text"), c({
        url: d,
        method: b,
        data: e,
        type: f,
        crossOrigin: !0,
        success: function(b) {
          "undefined" != typeof a && a("text" === f ? b.response : b)
        }
      })
    }, e
  }({}, amdclean.core, amdclean.reqwest), amdclean.inputkeyboard = function(a, b) {
    "use strict";
    var c = b,
      d = {};
    return c.prototype.isKeyPressed = !1, c.prototype.keyIsPressed = !1, c.prototype.key = "", c.prototype.keyCode = 0, c.prototype.onkeydown = function(a) {
      this._setProperty("isKeyPressed", !0), this._setProperty("keyIsPressed", !0), this._setProperty("keyCode", a.which), d[a.which] = !0;
      var b = String.fromCharCode(a.which);
      b || (b = a.which), this._setProperty("key", b);
      var c = this.keyPressed || window.keyPressed;
      if ("function" == typeof c && !a.charCode) {
        var e = c(a);
        e === !1 && a.preventDefault()
      }
    }, c.prototype.onkeyup = function(a) {
      var b = this.keyReleased || window.keyReleased;
      this._setProperty("isKeyPressed", !1), this._setProperty("keyIsPressed", !1), d[a.which] = !1;
      var c = String.fromCharCode(a.which);
      if (c || (c = a.which), this._setProperty("key", c), this._setProperty("keyCode", a.which), "function" == typeof b) {
        var e = b(a);
        e === !1 && a.preventDefault()
      }
    }, c.prototype.onkeypress = function(a) {
      this._setProperty("keyCode", a.which), this._setProperty("key", String.fromCharCode(a.which));
      var b = this.keyTyped || window.keyTyped;
      if ("function" == typeof b) {
        var c = b(a);
        c === !1 && a.preventDefault()
      }
    }, c.prototype.onblur = function() {
      d = {}
    }, c.prototype.keyIsDown = function(a) {
      return d[a]
    }, c
  }({}, amdclean.core), amdclean.inputmouse = function(a, b, c) {
    "use strict";

    function d(a, b) {
      var c = a.getBoundingClientRect();
      return {
        x: b.clientX - c.left,
        y: b.clientY - c.top
      }
    }
    var e = b,
      c = c;
    return e.prototype.mouseX = 0, e.prototype.mouseY = 0, e.prototype.pmouseX = 0, e.prototype.pmouseY = 0, e.prototype.winMouseX = 0, e.prototype.winMouseY = 0, e.prototype.pwinMouseX = 0, e.prototype.pwinMouseY = 0, e.prototype.mouseButton = 0, e.prototype.mouseIsPressed = !1, e.prototype.isMousePressed = !1, e.prototype._updateMouseCoords = function(a) {
      if ("touchstart" === a.type || "touchmove" === a.type || "touchend" === a.type) this._setProperty("mouseX", this.touchX), this._setProperty("mouseY", this.touchY);
      else if (null !== this._curElement) {
        var b = d(this._curElement.elt, a);
        this._setProperty("mouseX", b.x), this._setProperty("mouseY", b.y)
      }
      this._setProperty("winMouseX", a.pageX), this._setProperty("winMouseY", a.pageY)
    }, e.prototype._updatePMouseCoords = function() {
      this._setProperty("pmouseX", this.mouseX), this._setProperty("pmouseY", this.mouseY), this._setProperty("pwinMouseX", this.winMouseX), this._setProperty("pwinMouseY", this.winMouseY)
    }, e.prototype._setMouseButton = function(a) {
      1 === a.button ? this._setProperty("mouseButton", c.CENTER) : 2 === a.button ? this._setProperty("mouseButton", c.RIGHT) : (this._setProperty("mouseButton", c.LEFT), ("touchstart" === a.type || "touchmove" === a.type) && (this._setProperty("mouseX", this.touchX), this._setProperty("mouseY", this.touchY)))
    }, e.prototype.onmousemove = function(a) {
      var b, c = this._isGlobal ? window : this;
      this._updateMouseCoords(a), this.isMousePressed ? "function" == typeof c.mouseDragged ? (b = c.mouseDragged(a), b === !1 && a.preventDefault()) : "function" == typeof c.touchMoved && (b = c.touchMoved(a), b === !1 && a.preventDefault(), this._updateTouchCoords(a)) : "function" == typeof c.mouseMoved && (b = c.mouseMoved(a), b === !1 && a.preventDefault())
    }, e.prototype.onmousedown = function(a) {
      var b, c = this._isGlobal ? window : this;
      this._setProperty("isMousePressed", !0), this._setProperty("mouseIsPressed", !0), this._setMouseButton(a), this._updateMouseCoords(a), "function" == typeof c.mousePressed ? (b = c.mousePressed(a), b === !1 && a.preventDefault()) : "function" == typeof c.touchStarted && (b = c.touchStarted(a), b === !1 && a.preventDefault(), this._updateTouchCoords(a))
    }, e.prototype.onmouseup = function(a) {
      var b, c = this._isGlobal ? window : this;
      this._setProperty("isMousePressed", !1), this._setProperty("mouseIsPressed", !1), "function" == typeof c.mouseReleased ? (b = c.mouseReleased(a), b === !1 && a.preventDefault()) : "function" == typeof c.touchEnded && (b = c.touchEnded(a), b === !1 && a.preventDefault(), this._updateTouchCoords(a))
    }, e.prototype.onclick = function(a) {
      var b = this._isGlobal ? window : this;
      if ("function" == typeof b.mouseClicked) {
        var c = b.mouseClicked(a);
        c === !1 && a.preventDefault()
      }
    }, e.prototype.onmousewheel = function(a) {
      var b = this._isGlobal ? window : this;
      if ("function" == typeof b.mouseWheel) {
        var c = b.mouseWheel(a);
        c === !1 && a.preventDefault()
      }
    }, e
  }({}, amdclean.core, amdclean.constants), amdclean.inputtime_date = function(a, b) {
    "use strict";
    var c = b;
    return c.prototype.day = function() {
      return (new Date).getDate()
    }, c.prototype.hour = function() {
      return (new Date).getHours()
    }, c.prototype.minute = function() {
      return (new Date).getMinutes()
    }, c.prototype.millis = function() {
      return (new Date).getTime() - this._startTime
    }, c.prototype.month = function() {
      return (new Date).getMonth() + 1
    }, c.prototype.second = function() {
      return (new Date).getSeconds()
    }, c.prototype.year = function() {
      return (new Date).getFullYear()
    }, c
  }({}, amdclean.core), amdclean.inputtouch = function(a, b) {
    "use strict";

    function c(a, b, c) {
      c = c || 0;
      var d = a.getBoundingClientRect();
      return {
        x: b.changedTouches[c].pageX - d.left,
        y: b.changedTouches[c].pageY - d.top
      }
    }
    var d = b;
    return d.prototype.touchX = 0, d.prototype.touchY = 0, d.prototype.ptouchX = 0, d.prototype.ptouchY = 0, d.prototype.touches = [], d.prototype.touchIsDown = !1, d.prototype._updateTouchCoords = function(a) {
      if ("mousedown" === a.type || "mousemove" === a.type || "mouseup" === a.type) this._setProperty("touchX", this.mouseX), this._setProperty("touchY", this.mouseY);
      else {
        var b = c(this._curElement.elt, a, 0);
        this._setProperty("touchX", b.x), this._setProperty("touchY", b.y);
        for (var d = [], e = 0; e < a.changedTouches.length; e++) {
          var f = c(this._curElement.elt, a, e);
          d[e] = {
            x: f.x,
            y: f.y
          }
        }
        this._setProperty("touches", d)
      }
    }, d.prototype._updatePTouchCoords = function() {
      this._setProperty("ptouchX", this.touchX), this._setProperty("ptouchY", this.touchY)
    }, d.prototype.ontouchstart = function(a) {
      var b, c = this._isGlobal ? window : this;
      this._updateTouchCoords(a), this._setProperty("touchIsDown", !0), "function" == typeof c.touchStarted ? (b = c.touchStarted(a), b === !1 && a.preventDefault()) : "function" == typeof c.mousePressed && (b = c.mousePressed(a), b === !1 && a.preventDefault())
    }, d.prototype.ontouchmove = function(a) {
      var b, c = this._isGlobal ? window : this;
      this._updateTouchCoords(a), "function" == typeof c.touchMoved ? (b = c.touchMoved(a), b === !1 && a.preventDefault()) : "function" == typeof c.mouseDragged && (b = c.mouseDragged(a), b === !1 && a.preventDefault(), this._updateMouseCoords(a))
    }, d.prototype.ontouchend = function(a) {
      this._updateTouchCoords(a), 0 === this.touches.length && this._setProperty("touchIsDown", !1);
      var b, c = this._isGlobal ? window : this;
      "function" == typeof c.touchEnded ? (b = c.touchEnded(a), b === !1 && a.preventDefault()) : "function" == typeof c.mouseReleased && (b = c.mouseReleased(a), b === !1 && a.preventDefault(), this._updateMouseCoords(a))
    }, d
  }({}, amdclean.core), amdclean.mathmath = function(a, b) {
    "use strict";
    var c = b;
    return c.prototype.createVector = function(a, b, d) {
      return this instanceof c ? new c.Vector(this, arguments) : new c.Vector(a, b, d)
    }, c
  }({}, amdclean.core), amdclean.mathcalculation = function(a, b) {
    "use strict";
    var c = b;
    return c.prototype.abs = Math.abs, c.prototype.ceil = Math.ceil, c.prototype.constrain = function(a, b, c) {
      return Math.max(Math.min(a, c), b)
    }, c.prototype.dist = function(a, b, c, d) {
      return Math.sqrt((c - a) * (c - a) + (d - b) * (d - b))
    }, c.prototype.exp = Math.exp, c.prototype.floor = Math.floor, c.prototype.lerp = function(a, b, c) {
      return c * (b - a) + a
    }, c.prototype.log = Math.log, c.prototype.mag = function(a, b) {
      return Math.sqrt(a * a + b * b)
    }, c.prototype.map = function(a, b, c, d, e) {
      return (a - b) / (c - b) * (e - d) + d
    }, c.prototype.max = function() {
      return arguments[0] instanceof Array ? Math.max.apply(null, arguments[0]) : Math.max.apply(null, arguments)
    }, c.prototype.min = function() {
      return arguments[0] instanceof Array ? Math.min.apply(null, arguments[0]) : Math.min.apply(null, arguments)
    }, c.prototype.norm = function(a, b, c) {
      return this.map(a, b, c, 0, 1)
    }, c.prototype.pow = Math.pow, c.prototype.round = Math.round, c.prototype.sq = function(a) {
      return a * a
    }, c.prototype.sqrt = Math.sqrt, c
  }({}, amdclean.core), amdclean.mathrandom = function(a, b) {
    "use strict";
    var c = b,
      d = !1,
      e = function() {
        var a, b, c = 4294967296,
          d = 1664525,
          e = 1013904223;
        return {
          setSeed: function(d) {
            b = a = (null == d ? Math.random() * c : d) >>> 0
          },
          getSeed: function() {
            return a
          },
          rand: function() {
            return b = (d * b + e) % c, b / c
          }
        }
      }();
    c.prototype.randomSeed = function(a) {
      e.setSeed(a), d = !0
    }, c.prototype.random = function(a, b) {
      var c;
      if (c = d ? e.rand() : Math.random(), 0 === arguments.length) return c;
      if (1 === arguments.length) return c * a;
      if (a > b) {
        var f = a;
        a = b, b = f
      }
      return c * (b - a) + a
    };
    var f, g = !1;
    return c.prototype.randomGaussian = function(a, b) {
      var c, d, e, h;
      if (g) c = f, g = !1;
      else {
        do d = this.random(2) - 1, e = this.random(2) - 1, h = d * d + e * e; while (h >= 1);
        h = Math.sqrt(-2 * Math.log(h) / h), c = d * h, f = e * h, g = !0
      }
      var i = a || 0,
        j = b || 1;
      return c * j + i
    }, c
  }({}, amdclean.core), amdclean.mathnoise = function(a, b) {
    "use strict";
    for (var c = b, d = 4, e = 1 << d, f = 8, g = 1 << f, h = 4095, i = 4, j = .5, k = .5, l = Math.floor(360 / k), m = new Array(l), n = new Array(l), o = Math.PI / 180, p = 0; l > p; p++) m[p] = Math.sin(p * o * k), n[p] = Math.cos(p * o * k);
    var q = l;
    q >>= 1;
    var r;
    return c.prototype.noise = function(a, b, c) {
      if (b = b || 0, c = c || 0, null == r) {
        r = new Array(h + 1);
        for (var k = 0; h + 1 > k; k++) r[k] = Math.random()
      }
      0 > a && (a = -a), 0 > b && (b = -b), 0 > c && (c = -c);
      for (var m, o, p, s, t, u = Math.floor(a), v = Math.floor(b), w = Math.floor(c), x = a - u, y = b - v, z = c - w, A = 0, B = .5, C = function(a) {
          return .5 * (1 - n[Math.floor(a * q) % l])
        }, D = 0; i > D; D++) {
        var E = u + (v << d) + (w << f);
        m = C(x), o = C(y), p = r[E & h], p += m * (r[E + 1 & h] - p), s = r[E + e & h], s += m * (r[E + e + 1 & h] - s), p += o * (s - p), E += g, s = r[E & h], s += m * (r[E + 1 & h] - s), t = r[E + e & h], t += m * (r[E + e + 1 & h] - t), s += o * (t - s), p += C(z) * (s - p), A += p * B, B *= j, u <<= 1, x *= 2, v <<= 1, y *= 2, w <<= 1, z *= 2, x >= 1 && (u++, x--), y >= 1 && (v++, y--), z >= 1 && (w++, z--)
      }
      return A
    }, c.prototype.noiseDetail = function(a, b) {
      a > 0 && (i = a), b > 0 && (j = b)
    }, c.prototype.noiseSeed = function(a) {
      var b = function() {
        var a, b, c = 4294967296,
          d = 1664525,
          e = 1013904223;
        return {
          setSeed: function(d) {
            b = a = (null == d ? Math.random() * c : d) >>> 0
          },
          getSeed: function() {
            return a
          },
          rand: function() {
            return b = (d * b + e) % c, b / c
          }
        }
      }();
      b.setSeed(a), r = new Array(h + 1);
      for (var c = 0; h + 1 > c; c++) r[c] = b.rand()
    }, c
  }({}, amdclean.core), amdclean.mathtrigonometry = function(a, b, c, d) {
    "use strict";
    var e = b,
      f = c,
      d = d;
    return e.prototype._angleMode = d.RADIANS, e.prototype.acos = function(a) {
      return this._angleMode === d.RADIANS ? Math.acos(a) : f.radiansToDegrees(Math.acos(a))
    }, e.prototype.asin = function(a) {
      return this._angleMode === d.RADIANS ? Math.asin(a) : f.radiansToDegrees(Math.asin(a))
    }, e.prototype.atan = function(a) {
      return this._angleMode === d.RADIANS ? Math.atan(a) : f.radiansToDegrees(Math.atan(a))
    }, e.prototype.atan2 = function(a, b) {
      return this._angleMode === d.RADIANS ? Math.atan2(a, b) : f.radiansToDegrees(Math.atan2(a, b))
    }, e.prototype.cos = function(a) {
      return Math.cos(this._angleMode === d.RADIANS ? a : this.radians(a))
    }, e.prototype.sin = function(a) {
      return Math.sin(this._angleMode === d.RADIANS ? a : this.radians(a))
    }, e.prototype.tan = function(a) {
      return Math.tan(this._angleMode === d.RADIANS ? a : this.radians(a))
    }, e.prototype.degrees = function(a) {
      return f.radiansToDegrees(a)
    }, e.prototype.radians = function(a) {
      return f.degreesToRadians(a)
    }, e.prototype.angleMode = function(a) {
      (a === d.DEGREES || a === d.RADIANS) && (this._angleMode = a)
    }, e
  }({}, amdclean.core, amdclean.polargeometry, amdclean.constants), amdclean.outputfiles = function(a, b) {
    "use strict";

    function c(a, b) {
      b || (b = ""), a || (a = "untitled");
      var c = "";
      return a && a.indexOf(".") > -1 && (c = a.split(".").pop()), b && c !== b && (c = b, a = a + "." + c), [a, c]
    }

    function d(a) {
      document.body.removeChild(a.target)
    }
    var e = b;
    window.URL = window.URL || window.webkitURL, e.prototype._pWriters = [], e.prototype.beginRaw = function() {
      throw "not yet implemented"
    }, e.prototype.beginRecord = function() {
      throw "not yet implemented"
    }, e.prototype.createOutput = function() {
      throw "not yet implemented"
    }, e.prototype.createWriter = function(a, b) {
      var c;
      for (var d in e.prototype._pWriters)
        if (e.prototype._pWriters[d].name === a) return c = new e.PrintWriter(a + window.millis(), b), e.prototype._pWriters.push(c), c;
      return c = new e.PrintWriter(a, b), e.prototype._pWriters.push(c), c
    }, e.prototype.endRaw = function() {
      throw "not yet implemented"
    }, e.prototype.endRecord = function() {
      throw "not yet implemented"
    }, e.PrintWriter = function(a, b) {
      var c = this;
      this.name = a, this.content = "", this.print = function(a) {
        this.content += a
      }, this.println = function(a) {
        this.content += a + "\n"
      }, this.flush = function() {
        this.content = ""
      }, this.close = function() {
        var d = [];
        d.push(this.content), e.prototype.writeFile(d, a, b);
        for (var f in e.prototype._pWriters) e.prototype._pWriters[f].name === this.name && e.prototype._pWriters.splice(f, 1);
        c.flush(), c = {}
      }
    }, e.prototype.saveBytes = function() {
      throw "not yet implemented"
    }, e.prototype.save = function() {
      var a = arguments,
        b = this._curElement.elt;
      if (0 === a.length) return void e.prototype.saveCanvas(b);
      if (a[0] instanceof e.Graphics) return void e.prototype.saveCanvas(a[0].elt, a[1], a[2]);
      if ("string" == typeof a[0]) e.prototype.saveCanvas(b, a[0]);
      else {
        var d = c(a[1], a[2])[1];
        switch (d) {
          case "json":
            e.prototype.saveJSON(a[0], a[1], a[2]);
            break;
          case "txt":
            e.prototype.saveStrings(a[0], a[1], a[2]);
            break;
          default:
            a[0] instanceof Array ? e.prototype.saveStrings(a[0], a[1], a[2]) : a[0] instanceof e.Table ? e.prototype.saveTable(a[0], a[1], a[2], a[3]) : a[0] instanceof e.Image ? e.prototype.saveCanvas(a[0].canvas, a[1]) : a[0] instanceof e.SoundFile ? e.prototype.saveSound(a[0], a[1], a[2], a[3]) : a[0] instanceof Object && e.prototype.saveJSON(a[0], a[1], a[2])
        }
      }
    }, e.prototype.saveJSON = function(a, b, c) {
      var d;
      d = c ? JSON.stringify(a) : JSON.stringify(a, void 0, 2), this.saveStrings(d.split("\n"), b, "json")
    }, e.prototype.saveJSONObject = e.prototype.saveJSON, e.prototype.saveJSONArray = e.prototype.saveJSON, e.prototype.saveStream = function() {
      throw "not yet implemented"
    }, e.prototype.saveStrings = function(a, b, c) {
      var d = c || "txt",
        e = this.createWriter(b, d);
      for (var f in a) f < a.length - 1 ? e.println(a[f]) : e.print(a[f]);
      e.close(), e.flush()
    }, e.prototype.saveXML = function() {
      throw "not yet implemented"
    }, e.prototype.selectOutput = function() {
      throw "not yet implemented"
    }, e.prototype.saveTable = function(a, b, c) {
      var d = this.createWriter(b, c),
        e = a.columns,
        g = ",";
      if ("tsv" === c && (g = "	"), "html" !== c) {
        if ("0" !== e[0])
          for (var h = 0; h < e.length; h++) h < e.length - 1 ? d.print(e[h] + g) : d.println(e[h]);
        for (var i = 0; i < a.rows.length; i++) {
          var j;
          for (j = 0; j < a.rows[i].arr.length; j++) j < a.rows[i].arr.length - 1 ? d.print(a.rows[i].arr[j] + g) : i < a.rows.length - 1 ? d.println(a.rows[i].arr[j]) : d.print(a.rows[i].arr[j])
        }
      } else {
        d.println("<html>"), d.println("<head>");
        var k = '  <meta http-equiv="content-type" content';
        if (k += '="text/html;charset=utf-8" />', d.println(k), d.println("</head>"), d.println("<body>"), d.println("  <table>"), "0" !== e[0]) {
          d.println("    <tr>");
          for (var l = 0; l < e.length; l++) {
            var m = f(e[l]);
            d.println("      <td>" + m), d.println("      </td>")
          }
          d.println("    </tr>")
        }
        for (var n = 0; n < a.rows.length; n++) {
          d.println("    <tr>");
          for (var o = 0; o < a.columns.length; o++) {
            var p = a.rows[n].getString(o),
              q = f(p);
            d.println("      <td>" + q), d.println("      </td>")
          }
          d.println("    </tr>")
        }
        d.println("  </table>"), d.println("</body>"), d.print("</html>")
      }
      d.close(), d.flush()
    };
    var f = function(a) {
      return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
    };
    return e.prototype.writeFile = function(a, b, c) {
      var d = "application/octet-stream";
      e.prototype._isSafari() && (d = "text/plain");
      var f = new Blob(a, {
          type: d
        }),
        g = window.URL.createObjectURL(f);
      e.prototype.downloadFile(g, b, c)
    }, e.prototype.downloadFile = function(a, b, f) {
      var g = c(b, f),
        h = g[0],
        i = g[1],
        j = document.createElement("a");
      if (j.href = a, j.download = h, j.onclick = d, j.style.display = "none", document.body.appendChild(j), e.prototype._isSafari()) {
        var k = "Hello, Safari user! To download this file...\n";
        k += "1. Go to File --> Save As.\n", k += '2. Choose "Page Source" as the Format.\n', k += '3. Name it with this extension: ."' + i + '"', alert(k)
      }
      j.click(), a = null
    }, e.prototype._checkFileExtension = c, e.prototype._isSafari = function() {
      var a = Object.prototype.toString.call(window.HTMLElement);
      return a.indexOf("Constructor") > 0
    }, e
  }({}, amdclean.core), amdclean.outputimage = function(a, b) {
    "use strict";
    var c = b,
      d = [];
    return c.prototype.saveCanvas = function(a, b, d) {
      d || (d = c.prototype._checkFileExtension(b, d)[1], "" === d && (d = "png"));
      var e;
      if (a ? e = a : this._curElement && this._curElement.elt && (e = this._curElement.elt), c.prototype._isSafari()) {
        var f = "Hello, Safari user!\n";
        f += "Now capturing a screenshot...\n", f += "To save this image,\n", f += "go to File --> Save As.\n", alert(f), window.location.href = e.toDataURL()
      } else {
        var g;
        if ("undefined" == typeof d) d = "png", g = "image/png";
        else switch (d) {
          case "png":
            g = "image/png";
            break;
          case "jpeg":
            g = "image/jpeg";
            break;
          case "jpg":
            g = "image/jpeg";
            break;
          default:
            g = "image/png"
        }
        var h = "image/octet-stream",
          i = e.toDataURL(g);
        i = i.replace(g, h), c.prototype.downloadFile(i, b, d)
      }
    }, c.prototype.saveFrames = function(a, b, e, f, g) {
      var h = e || 3;
      h = c.prototype.constrain(h, 0, 15), h = 1e3 * h;
      var i = f || 15;
      i = c.prototype.constrain(i, 0, 22);
      var j = 0,
        k = c.prototype._makeFrame,
        l = this._curElement.elt,
        m = setInterval(function() {
          k(a + j, b, l), j++
        }, 1e3 / i);
      setTimeout(function() {
        if (clearInterval(m), g) g(d);
        else
          for (var a = 0; a < d.length; a++) {
            var b = d[a];
            c.prototype.downloadFile(b.imageData, b.filename, b.ext)
          }
        d = []
      }, h + .01)
    }, c.prototype._makeFrame = function(a, b, c) {
      var e;
      e = this ? this._curElement.elt : c;
      var f;
      if (b) switch (b.toLowerCase()) {
        case "png":
          f = "image/png";
          break;
        case "jpeg":
          f = "image/jpeg";
          break;
        case "jpg":
          f = "image/jpeg";
          break;
        default:
          f = "image/png"
      } else b = "png", f = "image/png";
      var g = "image/octet-stream",
        h = e.toDataURL(f);
      h = h.replace(f, g);
      var i = {};
      i.imageData = h, i.filename = a, i.ext = b, d.push(i)
    }, c
  }({}, amdclean.core), amdclean.outputtext_area = function(a, b) {
    "use strict";
    var c = b;
    return c.prototype.print = window.console && console.log ? console.log.bind(console) : function() {}, c.prototype.println = c.prototype.print, c
  }({}, amdclean.core), amdclean.renderingrendering = function(a, b, c) {
    var d = b,
      c = c;
    return d.prototype.createCanvas = function(a, b, c) {
      var e;
      return c ? (e = document.createElement("canvas"), e.id = "defaultCanvas") : e = this.canvas, this._setupDone || (e.className += " p5_hidden", e.style.visibility = "hidden"), this._userNode ? this._userNode.appendChild(e) : document.body.appendChild(e), this._defaultGraphics || (this._defaultGraphics = new d.Graphics(e, this, !0), this._elements.push(this._defaultGraphics)), this._defaultGraphics.resize(a, b), this._defaultGraphics._applyDefaults(), this._defaultGraphics
    }, d.prototype.resizeCanvas = function(a, b, c) {
      this._defaultGraphics && (this._defaultGraphics.resize(a, b), this._defaultGraphics._applyDefaults(), c || this.redraw())
    }, d.prototype.noCanvas = function() {
      this.canvas && this.canvas.parentNode.removeChild(this.canvas)
    }, d.prototype.createGraphics = function(a, b) {
      var c = document.createElement("canvas"),
        e = this._userNode || document.body;
      e.appendChild(c);
      var f = new d.Graphics(c, this, !1);
      this._elements.push(f);
      for (var g in d.prototype) f.hasOwnProperty(g) || (f[g] = "function" == typeof d.prototype[g] ? d.prototype[g].bind(f) : d.prototype[g]);
      return f.resize(a, b), f._applyDefaults(), f
    }, d.prototype.blendMode = function(a) {
      if (a !== c.BLEND && a !== c.DARKEST && a !== c.LIGHTEST && a !== c.DIFFERENCE && a !== c.MULTIPLY && a !== c.EXCLUSION && a !== c.SCREEN && a !== c.REPLACE && a !== c.OVERLAY && a !== c.HARD_LIGHT && a !== c.SOFT_LIGHT && a !== c.DODGE && a !== c.BURN && a !== c.ADD && a !== c.NORMAL) throw new Error("Mode " + a + " not recognized.");
      this.drawingContext.globalCompositeOperation = a
    }, d
  }({}, amdclean.core, amdclean.constants), amdclean.shape2d_primitives = function(a, b, c, d) {
    "use strict";

    function e(a, b, c) {
      for (var d = 2 * Math.PI, e = [], g = Math.PI / 2, i = c > b ? 1 : -1, j = b, k = Math.min(d, Math.abs(c - b)); k > h;) {
        var l = j + i * Math.min(k, g);
        e.push(f(a, j, l)), k -= Math.abs(l - j), j = l
      }
      return e
    }

    function f(a, b, c) {
      var d = (c - b) / 2,
        e = a * Math.cos(d),
        f = a * Math.sin(d),
        g = e,
        h = -f,
        i = .5522847498,
        j = i * Math.tan(d),
        k = g + j * f,
        l = h + j * e,
        m = k,
        n = -l,
        o = d + b,
        p = Math.cos(o),
        q = Math.sin(o);
      return {
        x1: a * Math.cos(b),
        y1: a * Math.sin(b),
        x2: k * p - l * q,
        y2: k * q + l * p,
        x3: m * p - n * q,
        y3: m * q + n * p,
        x4: a * Math.cos(c),
        y4: a * Math.sin(c)
      }
    }
    var g = b,
      c = c,
      d = d,
      h = 1e-5;
    return g.prototype.arc = function(a, b, f, g, h, i, j) {
      if (this._doStroke || this._doFill) {
        this._angleMode === d.DEGREES && (h = this.radians(h), i = this.radians(i));
        var k = this.drawingContext,
          l = c.arcModeAdjust(a, b, f, g, this._ellipseMode),
          m = e(1, h, i),
          n = l.w / 2,
          o = l.h / 2;
        return k.beginPath(), m.forEach(function(a, b) {
          0 === b && k.moveTo(l.x + a.x1 * n, l.y + a.y1 * o), k.bezierCurveTo(l.x + a.x2 * n, l.y + a.y2 * o, l.x + a.x3 * n, l.y + a.y3 * o, l.x + a.x4 * n, l.y + a.y4 * o)
        }), this._doFill && ((j === d.PIE || null == j) && k.lineTo(l.x, l.y), k.closePath(), k.fill(), this._doStroke && (j === d.CHORD || j === d.PIE)) ? (k.stroke(), this) : (this._doStroke && (j === d.OPEN || null == j) && (k.beginPath(), m.forEach(function(a, b) {
          0 === b && k.moveTo(l.x + a.x1 * n, l.y + a.y1 * o), k.bezierCurveTo(l.x + a.x2 * n, l.y + a.y2 * o, l.x + a.x3 * n, l.y + a.y3 * o, l.x + a.x4 * n, l.y + a.y4 * o)
        }), k.stroke()), this)
      }
    }, g.prototype.ellipse = function(a, b, d, e) {
      if (this._doStroke || this._doFill) {
        d = Math.abs(d), e = Math.abs(e);
        var f = this.drawingContext,
          g = c.modeAdjust(a, b, d, e, this._ellipseMode);
        if (f.beginPath(), d === e) f.arc(g.x + g.w / 2, g.y + g.w / 2, g.w / 2, 0, 2 * Math.PI, !1);
        else {
          var h = .5522848,
            i = g.w / 2 * h,
            j = g.h / 2 * h,
            k = g.x + g.w,
            l = g.y + g.h,
            m = g.x + g.w / 2,
            n = g.y + g.h / 2;
          f.moveTo(g.x, n), f.bezierCurveTo(g.x, n - j, m - i, g.y, m, g.y), f.bezierCurveTo(m + i, g.y, k, n - j, k, n), f.bezierCurveTo(k, n + j, m + i, l, m, l), f.bezierCurveTo(m - i, l, g.x, n + j, g.x, n), f.closePath()
        }
        return this._doFill && f.fill(), this._doStroke && f.stroke(), this
      }
    }, g.prototype.line = function(a, b, c, d) {
      if (this._doStroke) {
        var e = this.drawingContext;
        if ("rgba(0,0,0,0)" !== e.strokeStyle) return e.beginPath(), e.moveTo(a, b), e.lineTo(c, d), e.stroke(), this
      }
    }, g.prototype.point = function(a, b) {
      if (this._doStroke) {
        var c = this.drawingContext,
          e = c.strokeStyle,
          f = c.fillStyle;
        if ("rgba(0,0,0,0)" !== e) return a = Math.round(a), b = Math.round(b), c.fillStyle = e, c.lineWidth > 1 ? (c.beginPath(), c.arc(a, b, c.lineWidth / 2, 0, d.TWO_PI, !1), c.fill()) : c.fillRect(a, b, 1, 1), c.fillStyle = f, this
      }
    }, g.prototype.quad = function(a, b, c, d, e, f, g, h) {
      if (this._doStroke || this._doFill) {
        var i = this.drawingContext;
        return i.beginPath(), i.moveTo(a, b), i.lineTo(c, d), i.lineTo(e, f), i.lineTo(g, h), i.closePath(), this._doFill && i.fill(), this._doStroke && i.stroke(), this
      }
    }, g.prototype.rect = function(a, b, d, e) {
      if (this._doStroke || this._doFill) {
        var f = c.modeAdjust(a, b, d, e, this._rectMode),
          g = this.drawingContext;
        return this._doStroke && g.lineWidth % 2 === 1 && g.translate(.5, .5), g.beginPath(), g.rect(f.x, f.y, f.w, f.h), this._doFill && g.fill(), this._doStroke && g.stroke(), this._doStroke && g.lineWidth % 2 === 1 && g.translate(-.5, -.5), this
      }
    }, g.prototype.triangle = function(a, b, c, d, e, f) {
      if (this._doStroke || this._doFill) {
        var g = this.drawingContext;
        return g.beginPath(), g.moveTo(a, b), g.lineTo(c, d), g.lineTo(e, f), g.closePath(), this._doFill && g.fill(), this._doStroke && g.stroke(), this
      }
    }, g
  }({}, amdclean.core, amdclean.canvas, amdclean.constants), amdclean.shapeattributes = function(a, b, c) {
    "use strict";
    var d = b,
      c = c;
    return d.prototype._rectMode = c.CORNER, d.prototype._ellipseMode = c.CENTER, d.prototype.ellipseMode = function(a) {
      return (a === c.CORNER || a === c.CORNERS || a === c.RADIUS || a === c.CENTER) && (this._ellipseMode = a), this
    }, d.prototype.noSmooth = function() {
      return this.drawingContext.mozImageSmoothingEnabled = !1, this.drawingContext.webkitImageSmoothingEnabled = !1, this
    }, d.prototype.rectMode = function(a) {
      return (a === c.CORNER || a === c.CORNERS || a === c.RADIUS || a === c.CENTER) && (this._rectMode = a), this
    }, d.prototype.smooth = function() {
      return this.drawingContext.mozImageSmoothingEnabled = !0, this.drawingContext.webkitImageSmoothingEnabled = !0, this
    }, d.prototype.strokeCap = function(a) {
      return (a === c.ROUND || a === c.SQUARE || a === c.PROJECT) && (this.drawingContext.lineCap = a), this
    }, d.prototype.strokeJoin = function(a) {
      return (a === c.ROUND || a === c.BEVEL || a === c.MITER) && (this.drawingContext.lineJoin = a), this
    }, d.prototype.strokeWeight = function(a) {
      return this.drawingContext.lineWidth = "undefined" == typeof a || 0 === a ? 1e-4 : a, this
    }, d
  }({}, amdclean.core, amdclean.constants), amdclean.shapecurves = function(a, b) {
    "use strict";
    var c = b,
      d = 20,
      e = 20;
    return c.prototype._curveTightness = 0, c.prototype.bezier = function(a, b, c, d, e, f, g, h) {
      return this._doStroke ? (this.beginShape(), this.vertex(a, b), this.bezierVertex(c, d, e, f, g, h), this.endShape(), this.stroke(), this) : void 0
    }, c.prototype.bezierDetail = function(a) {
      return d = a, this
    }, c.prototype.bezierPoint = function(a, b, c, d, e) {
      var f = 1 - e;
      return Math.pow(f, 3) * a + 3 * Math.pow(f, 2) * e * b + 3 * f * Math.pow(e, 2) * c + Math.pow(e, 3) * d
    }, c.prototype.bezierTangent = function(a, b, c, d, e) {
      var f = 1 - e;
      return 3 * d * Math.pow(e, 2) - 3 * c * Math.pow(e, 2) + 6 * c * f * e - 6 * b * f * e + 3 * b * Math.pow(f, 2) - 3 * a * Math.pow(f, 2)
    }, c.prototype.curve = function(a, b, c, d, e, f, g, h) {
      return this._doStroke ? (this.beginShape(), this.curveVertex(a, b), this.curveVertex(c, d), this.curveVertex(e, f), this.curveVertex(g, h), this.endShape(), this.stroke(), this) : void 0
    }, c.prototype.curveDetail = function(a) {
      return e = a, this
    }, c.prototype.curveTightness = function(a) {
      this._setProperty("_curveTightness", a)
    }, c.prototype.curvePoint = function(a, b, c, d, e) {
      var f = e * e * e,
        g = e * e,
        h = -.5 * f + g - .5 * e,
        i = 1.5 * f - 2.5 * g + 1,
        j = -1.5 * f + 2 * g + .5 * e,
        k = .5 * f - .5 * g;
      return a * h + b * i + c * j + d * k
    }, c.prototype.curveTangent = function(a, b, c, d, e) {
      var f = e * e,
        g = -3 * f / 2 + 2 * e - .5,
        h = 9 * f / 2 - 5 * e,
        i = -9 * f / 2 + 4 * e + .5,
        j = 3 * f / 2 - e;
      return a * g + b * h + c * i + d * j
    }, c.prototype.curveTightness = function() {
      throw "not yet implemented"
    }, c
  }({}, amdclean.core), amdclean.shapevertex = function(a, b, c) {
    "use strict";
    var d = b,
      c = c,
      e = null,
      f = [],
      g = [],
      h = !1,
      i = !1,
      j = !1,
      k = !1;
    return d.prototype._doFillStrokeClose = function() {
      this._doFill && this.drawingContext.fill(), this._doStroke && this.drawingContext.stroke(), this.drawingContext.closePath()
    }, d.prototype.beginContour = function() {
      return g = [], k = !0, this
    }, d.prototype.beginShape = function(a) {
      return e = a === c.POINTS || a === c.LINES || a === c.TRIANGLES || a === c.TRIANGLE_FAN || a === c.TRIANGLE_STRIP || a === c.QUADS || a === c.QUAD_STRIP ? a : null, f = [], g = [], this
    }, d.prototype.bezierVertex = function() {
      if (0 === f.length) throw "vertex() must be used once before calling bezierVertex()";
      h = !0;
      for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
      return a.isVert = !1, k ? g.push(a) : f.push(a), this
    }, d.prototype.curveVertex = function(a, b) {
      return i = !0, this.vertex(a, b), this
    }, d.prototype.endContour = function() {
      var a = g[0].slice();
      a.isVert = g[0].isVert, a.moveTo = !1, g.push(a), f.push(f[0]);
      for (var b = 0; b < g.length; b++) f.push(g[b]);
      return this
    }, d.prototype.endShape = function(a) {
      if (0 === f.length) return this;
      if (!this._doStroke && !this._doFill) return this;
      var b, d = a === c.CLOSE;
      d && !k && f.push(f[0]);
      var g, l, m = f.length;
      if (!i || e !== c.POLYGON && null !== e)
        if (!h || e !== c.POLYGON && null !== e)
          if (!j || e !== c.POLYGON && null !== e)
            if (e === c.POINTS)
              for (g = 0; m > g; g++) b = f[g], this._doStroke && this.stroke(b[6]), this.point(b[0], b[1]);
            else if (e === c.LINES)
        for (g = 0; m > g + 1; g += 2) b = f[g], this._doStroke && this.stroke(f[g + 1][6]), this.line(b[0], b[1], f[g + 1][0], f[g + 1][1]);
      else if (e === c.TRIANGLES)
        for (g = 0; m > g + 2; g += 3) b = f[g], this.drawingContext.beginPath(), this.drawingContext.moveTo(b[0], b[1]), this.drawingContext.lineTo(f[g + 1][0], f[g + 1][1]), this.drawingContext.lineTo(f[g + 2][0], f[g + 2][1]), this.drawingContext.lineTo(b[0], b[1]), this._doFill && (this.fill(f[g + 2][5]), this.drawingContext.fill()), this._doStroke && (this.stroke(f[g + 2][6]), this.drawingContext.stroke()), this.drawingContext.closePath();
      else if (e === c.TRIANGLE_STRIP)
        for (g = 0; m > g + 1; g++) b = f[g], this.drawingContext.beginPath(), this.drawingContext.moveTo(f[g + 1][0], f[g + 1][1]), this.drawingContext.lineTo(b[0], b[1]), this._doStroke && this.stroke(f[g + 1][6]), this._doFill && this.fill(f[g + 1][5]), m > g + 2 && (this.drawingContext.lineTo(f[g + 2][0], f[g + 2][1]), this._doStroke && this.stroke(f[g + 2][6]), this._doFill && this.fill(f[g + 2][5])), this._doFillStrokeClose();
      else if (e === c.TRIANGLE_FAN) {
        if (m > 2)
          for (this.drawingContext.beginPath(), this.drawingContext.moveTo(f[0][0], f[0][1]), this.drawingContext.lineTo(f[1][0], f[1][1]), this.drawingContext.lineTo(f[2][0], f[2][1]), this._doFill && this.fill(f[2][5]), this._doStroke && this.stroke(f[2][6]), this._doFillStrokeClose(), g = 3; m > g; g++) b = f[g], this.drawingContext.beginPath(), this.drawingContext.moveTo(f[0][0], f[0][1]), this.drawingContext.lineTo(f[g - 1][0], f[g - 1][1]), this.drawingContext.lineTo(b[0], b[1]), this._doFill && this.fill(b[5]), this._doStroke && this.stroke(b[6]), this._doFillStrokeClose()
      } else if (e === c.QUADS)
        for (g = 0; m > g + 3; g += 4) {
          for (b = f[g], this.drawingContext.beginPath(), this.drawingContext.moveTo(b[0], b[1]), l = 1; 4 > l; l++) this.drawingContext.lineTo(f[g + l][0], f[g + l][1]);
          this.drawingContext.lineTo(b[0], b[1]), this._doFill && this.fill(f[g + 3][5]), this._doStroke && this.stroke(f[g + 3][6]), this._doFillStrokeClose()
        } else if (e === c.QUAD_STRIP) {
          if (m > 3)
            for (g = 0; m > g + 1; g += 2) b = f[g], this.drawingContext.beginPath(), m > g + 3 ? (this.drawingContext.moveTo(f[g + 2][0], f[g + 2][1]), this.drawingContext.lineTo(b[0], b[1]), this.drawingContext.lineTo(f[g + 1][0], f[g + 1][1]), this.drawingContext.lineTo(f[g + 3][0], f[g + 3][1]), this._doFill && this.fill(f[g + 3][5]), this._doStroke && this.stroke(f[g + 3][6])) : (this.drawingContext.moveTo(b[0], b[1]), this.drawingContext.lineTo(f[g + 1][0], f[g + 1][1])), this._doFillStrokeClose()
        } else {
          for (this.drawingContext.beginPath(), this.drawingContext.moveTo(f[0][0], f[0][1]), g = 1; m > g; g++) b = f[g], b.isVert && (b.moveTo ? this.drawingContext.moveTo(b[0], b[1]) : this.drawingContext.lineTo(b[0], b[1]));
          this._doFillStrokeClose()
        }
      else {
        for (this.drawingContext.beginPath(), g = 0; m > g; g++) f[g].isVert ? f[g].moveTo ? this.drawingContext.moveTo([0], f[g][1]) : this.drawingContext.lineTo(f[g][0], f[g][1]) : this.drawingContext.quadraticCurveTo(f[g][0], f[g][1], f[g][2], f[g][3]);
        this._doFillStrokeClose()
      } else {
        for (this.drawingContext.beginPath(), g = 0; m > g; g++) f[g].isVert ? f[g].moveTo ? this.drawingContext.moveTo(f[g][0], f[g][1]) : this.drawingContext.lineTo(f[g][0], f[g][1]) : this.drawingContext.bezierCurveTo(f[g][0], f[g][1], f[g][2], f[g][3], f[g][4], f[g][5]);
        this._doFillStrokeClose()
      } else if (m > 3) {
        var n = [],
          o = 1 - this._curveTightness;
        for (this.drawingContext.beginPath(), this.drawingContext.moveTo(f[1][0], f[1][1]), g = 1; m > g + 2; g++) b = f[g], n[0] = [b[0], b[1]], n[1] = [b[0] + (o * f[g + 1][0] - o * f[g - 1][0]) / 6, b[1] + (o * f[g + 1][1] - o * f[g - 1][1]) / 6], n[2] = [f[g + 1][0] + (o * f[g][0] - o * f[g + 2][0]) / 6, f[g + 1][1] + (o * f[g][1] - o * f[g + 2][1]) / 6], n[3] = [f[g + 1][0], f[g + 1][1]], this.drawingContext.bezierCurveTo(n[1][0], n[1][1], n[2][0], n[2][1], n[3][0], n[3][1]);
        d && this.drawingContext.lineTo(f[g + 1][0], f[g + 1][1]), this._doFillStrokeClose()
      }
      return i = !1, h = !1, j = !1, k = !1, d && f.pop(), this
    }, d.prototype.quadraticVertex = function(a, b, d, e) {
      if (this._contourInited) {
        var h = {};
        return h.x = a, h.y = b, h.x3 = d, h.y3 = e, h.type = c.QUADRATIC, this._contourVertices.push(h), this
      }
      if (!(f.length > 0)) throw "vertex() must be used once before calling quadraticVertex()";
      j = !0;
      for (var i = [], l = 0; l < arguments.length; l++) i[l] = arguments[l];
      return i.isVert = !1, k ? g.push(i) : f.push(i), this
    }, d.prototype.vertex = function(a, b, c) {
      var d = [];
      return d.isVert = !0, d[0] = a, d[1] = b, d[2] = 0, d[3] = 0, d[4] = 0, d[5] = this.drawingContext.fillStyle, d[6] = this.drawingContext.strokeStyle, c && (d.moveTo = c), k ? (0 === g.length && (d.moveTo = !0), g.push(d)) : f.push(d), this
    }, d
  }({}, amdclean.core, amdclean.constants), amdclean.structure = function(a, b) {
    "use strict";
    var c = b;
    return c.prototype.exit = function() {
      throw "exit() not implemented, see remove()"
    }, c.prototype.noLoop = function() {
      this._loop = !1, this._drawInterval && clearInterval(this._drawInterval)
    }, c.prototype.loop = function() {
      this._loop = !0, this._draw()
    }, c.prototype.push = function() {
      this.drawingContext.save(), this._styles.push({
        doStroke: this._doStroke,
        doFill: this._doFill,
        tint: this._tint,
        imageMode: this._imageMode,
        rectMode: this._rectMode,
        ellipseMode: this._ellipseMode,
        colorMode: this._colorMode,
        textFont: this.textFont,
        textLeading: this.textLeading,
        textSize: this.textSize,
        textStyle: this.textStyle
      })
    }, c.prototype.pop = function() {
      this.drawingContext.restore();
      var a = this._styles.pop();
      this._doStroke = a.doStroke, this._doFill = a.doFill, this._tint = a.tint, this._imageMode = a.imageMode, this._rectMode = a.rectMode, this._ellipseMode = a.ellipseMode, this._colorMode = a.colorMode, this.textFont = a.textFont, this.textLeading = a.textLeading, this.textSize = a.textSize, this.textStyle = a.textStyle
    }, c.prototype.pushStyle = function() {
      throw new Error("pushStyle() not used, see push()")
    }, c.prototype.popStyle = function() {
      throw new Error("popStyle() not used, see pop()")
    }, c.prototype.redraw = function() {
      var a = this.setup || window.setup,
        b = this.draw || window.draw;
      "function" == typeof b && (this.push(), "undefined" == typeof a && this.scale(this._pixelDensity, this._pixelDensity), this._registeredMethods.pre.forEach(function(a) {
        a.call(this)
      }), b(), this._registeredMethods.post.forEach(function(a) {
        a.call(this)
      }), this.pop())
    }, c.prototype.size = function() {
      throw "size() not implemented, see createCanvas()"
    }, c
  }({}, amdclean.core), amdclean.transform = function(a, b, c) {
    "use strict";
    var d = b,
      c = c;
    return d.prototype.applyMatrix = function(a, b, c, d, e, f) {
      return this.drawingContext.transform(a, b, c, d, e, f), this
    }, d.prototype.popMatrix = function() {
      throw new Error("popMatrix() not used, see pop()")
    }, d.prototype.printMatrix = function() {
      throw new Error("printMatrix() not implemented")
    }, d.prototype.pushMatrix = function() {
      throw new Error("pushMatrix() not used, see push()")
    }, d.prototype.resetMatrix = function() {
      return this.drawingContext.setTransform(1, 0, 0, 1, 0, 0), this
    }, d.prototype.rotate = function(a) {
      return this._angleMode === c.DEGREES && (a = this.radians(a)), this.drawingContext.rotate(a), this
    }, d.prototype.rotateX = function() {
      throw "not yet implemented"
    }, d.prototype.rotateY = function() {
      throw "not yet implemented"
    }, d.prototype.scale = function() {
      var a = 1,
        b = 1;
      return 1 === arguments.length ? a = b = arguments[0] : (a = arguments[0], b = arguments[1]), this.drawingContext.scale(a, b), this
    }, d.prototype.shearX = function(a) {
      return this._angleMode === c.DEGREES && (a = this.radians(a)), this.drawingContext.transform(1, 0, this.tan(a), 1, 0, 0), this
    }, d.prototype.shearY = function(a) {
      return this._angleMode === c.DEGREES && (a = this.radians(a)), this.drawingContext.transform(1, this.tan(a), 0, 1, 0, 0), this
    }, d.prototype.translate = function(a, b) {
      return this.drawingContext.translate(a, b), this
    }, d
  }({}, amdclean.core, amdclean.constants, amdclean.outputtext_area), amdclean.typographyattributes = function(a, b, c) {
    "use strict";
    var d = b,
      c = c;
    return d.prototype._textLeading = 15, d.prototype._textFont = "sans-serif", d.prototype._textSize = 12, d.prototype._textStyle = c.NORMAL, d.prototype._textAscent = null, d.prototype._textDescent = null, d.prototype.textAlign = function(a, b) {
      (a === c.LEFT || a === c.RIGHT || a === c.CENTER) && (this.drawingContext.textAlign = a), (b === c.TOP || b === c.BOTTOM || b === c.CENTER || b === c.BASELINE) && (this.drawingContext.textBaseline = b)
    }, d.prototype.textLeading = function(a) {
      this._setProperty("_textLeading", a)
    }, d.prototype.textSize = function(a) {
      this._setProperty("_textSize", a), this._setProperty("_textLeading", 1.25 * a), this._applyTextProperties()
    }, d.prototype.textStyle = function(a) {
      (a === c.NORMAL || a === c.ITALIC || a === c.BOLD) && (this._setProperty("_textStyle", a), this._applyTextProperties())
    }, d.prototype.textWidth = function(a) {
      return this.drawingContext.measureText(a).width
    }, d.prototype.textAscent = function() {
      return null == this._textAscent && this._updateTextMetrics(), this._textAscent
    }, d.prototype.textDescent = function() {
      return null == this._textDescent && this._updateTextMetrics(), this._textDescent
    }, d.prototype._applyTextProperties = function() {
      this._setProperty("_textAscent", null), this._setProperty("_textDescent", null);
      var a = this._textStyle + " " + this._textSize + "px " + this._textFont;
      this.drawingContext.font = a
    }, d.prototype._updateTextMetrics = function() {
      var a = document.createElement("span");
      a.style.fontFamily = this._textFont, a.style.fontSize = this._textSize + "px", a.innerHTML = "ABCjgq|";
      var b = document.createElement("div");
      b.style.display = "inline-block", b.style.width = "1px", b.style.height = "0px";
      var c = document.createElement("div");
      c.appendChild(a), c.appendChild(b), c.style.height = "0px", c.style.overflow = "hidden", document.body.appendChild(c), b.style.verticalAlign = "baseline";
      var d = this._calculateOffset(b),
        e = this._calculateOffset(a),
        f = d[1] - e[1];
      b.style.verticalAlign = "bottom", d = this._calculateOffset(b), e = this._calculateOffset(a);
      var g = d[1] - e[1],
        h = g - f;
      document.body.removeChild(c), this._setProperty("_textAscent", f), this._setProperty("_textDescent", h)
    }, d.prototype._calculateOffset = function(a) {
      var b = 0,
        c = 0;
      if (a.offsetParent) {
        do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent)
      } else b += a.offsetLeft, c += a.offsetTop;
      return [b, c]
    }, d
  }({}, amdclean.core, amdclean.constants), amdclean.typographyloading_displaying = function(a, b) {
    "use strict";
    var c = b;
    return c.prototype.text = function(a, b, c, d, e) {
      if ("number" == typeof a && (a = a.toString()), "string" == typeof a) {
        "undefined" != typeof d && (c += this._textLeading, e += c), a = a.replace(/(\t)/g, "  ");
        for (var f = a.split("\n"), g = 0; g < f.length; g++) {
          for (var h = "", i = f[g].split(" "), j = 0; j < i.length; j++)
            if (c + this._textLeading <= e || "undefined" == typeof e) {
              var k = h + i[j] + " ",
                l = this.drawingContext.measureText(k),
                m = l.width;
              "undefined" != typeof d && m > d ? (this._doFill && this.drawingContext.fillText(h, b, c), this._doStroke && this.drawingContext.strokeText(h, b, c), h = i[j] + " ", c += this._textLeading) : h = k
            }
          this._doFill && this.drawingContext.fillText(h, b, c), this._doStroke && this.drawingContext.strokeText(h, b, c), c += this._textLeading
        }
      }
    }, c.prototype.textFont = function(a) {
      this._setProperty("_textFont", a), this._applyTextProperties()
    }, c
  }({}, amdclean.core), amdclean.src_app = function(a, b) {
    "use strict";
    var c = b,
      d = function() {
        window.PHANTOMJS || window.mocha || (window.setup && "function" == typeof window.setup || window.draw && "function" == typeof window.draw) && new c
      };
    return "complete" === document.readyState ? d() : window.addEventListener("load", d, !1), c
  }({}, amdclean.core, amdclean.p5Color, amdclean.p5Element, amdclean.p5Graphics, amdclean.p5Image, amdclean.p5File, amdclean.p5Vector, amdclean.p5TableRow, amdclean.p5Table, amdclean.colorcreating_reading, amdclean.colorsetting, amdclean.constants, amdclean.dataconversion, amdclean.dataarray_functions, amdclean.datastring_functions, amdclean.environment, amdclean.imageimage, amdclean.imageloading_displaying, amdclean.imagepixels, amdclean.inputfiles, amdclean.inputkeyboard, amdclean.inputmouse, amdclean.inputtime_date, amdclean.inputtouch, amdclean.mathmath, amdclean.mathcalculation, amdclean.mathrandom, amdclean.mathnoise, amdclean.mathtrigonometry, amdclean.outputfiles, amdclean.outputimage, amdclean.outputtext_area, amdclean.renderingrendering, amdclean.shape2d_primitives, amdclean.shapeattributes, amdclean.shapecurves, amdclean.shapevertex, amdclean.structure, amdclean.transform, amdclean.typographyattributes, amdclean.typographyloading_displaying), amdclean.src_app
});