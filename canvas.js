/**
 * @param {Object} canvas
 * @return {?}
 */
var Canvas = function(canvas) {
  if (!(this instanceof Canvas)) {
    return new Canvas(canvas);
  }
  var m;
  for (m in this) {
    if (this.hasOwnProperty(m)) {
      this[m] = this[m];
      var o;
      for (o in this[m]) {
        if (this[m].hasOwnProperty(o)) {
          this[m][o].core = this;
        }
      }
    }
  }
  /** @type {Array} */
  this.objects = [];
  /** @type {Array} */
  this.scenes = [];
  if (canvas instanceof Node && canvas.getContext) {
    /** @type {Object} */
    this.canvas = canvas;
  } else {
    if (canvas instanceof String) {
      /** @type {(Element|null)} */
      this.canvas = document.querySelector(canvas);
    } else {
      /** @type {(Node|null)} */
      this.canvas = document.body.appendChild(document.createElement("canvas"));
    }
  }
  this.graphics = this.canvas.getContext("2d");
};
/**
 * @return {?}
 */
Canvas.prototype.add = function() {
  /** @type {number} */
  var o = 0;
  for (;o < arguments.length;o += 1) {
    if (arguments[o].constructor === Array) {
      /** @type {number} */
      var _o = 0;
      for (;_o < arguments[o].length;_o += 1) {
        this.objects.push(arguments[o][_o]);
      }
    } else {
      this.objects.push(arguments[o]);
    }
  }
  return this;
};
/**
 * @return {?}
 */
Canvas.prototype.remove = function() {
  /** @type {number} */
  var o = 0;
  for (;o < arguments.length;o += 1) {
    this.objects.splice(this.objects.indexOf(arguments[o]), 1);
  }
  return this;
};
Canvas.prototype = {
  display : {
    /**
     * @param {?} options
     * @return {undefined}
     */
    Base : function(options) {
      var core = Canvas.prototype.display.Base.core;
      var extend = core.utility.extend;
      var defaults = {
        x : 0,
        y : 0,
        angularVelocity : 0,
        fill : "#505050",
        _velocity : true,
        rotation : 0,
        _angular : true,
        scale : {
          x : 1,
          y : 1
        },
        angularAcceleration : 0,
        forces : {
          gravity : {
            operation : "+",
            type : {
              y : true
            },
            by : 0.05
          },
          friction : {
            operation : "*",
            type : {
              x : true,
              y : true
            },
            by : 0.99999
          }
        },
        _force : true,
        group : false,
        opacity : 1,
        velocity : {
          x : 0,
          y : 0
        },
        _check : false,
        mass : 1,
        _collision : true,
        parent : {},
        restitution : -0.5,
        _walls : true
      };
      extend(this, extend(defaults, options));
      this.velocity = Canvas.prototype.physics.vector(this.velocity.x, this.velocity.y);
    }
  },
  scene : {
    /**
     * @return {?}
     */
    add : function() {
      var core = this.create.core;
      /** @type {Array.<?>} */
      var args = Array.prototype.slice.call(arguments);
      core.scenes.push.apply(core.scenes, args);
      return core;
    },
    /**
     * @param {?} id
     * @return {?}
     */
    get : function(id) {
      var core = this.get.core;
      var scene = core.scenes.find(function($scene) {
        return $scene.id === id;
      });
      return scene;
    },
    /**
     * @param {Array} scenes
     * @return {?}
     */
    remove : function(scenes) {
      var core = this.remove.core;
      /** @type {number} */
      var s = 0;
      for (;s < arguments.length;s += 1) {
        core.scenes.splice(core.scenes.indexOf(this.get(scenes[s]), 1));
      }
      return core;
    }
  },
  animation : {
    defaults : {
      easing : {
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        linear : function(t, b, c, d) {
          return c * t / d + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInQuad : function(t, b, c, d) {
          t /= d;
          return c * t * t + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {?} c
         * @param {number} d
         * @return {?}
         */
        easeOutQuad : function(t, b, c, d) {
          t /= d;
          return-c * t * (t - 2) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInOutQuad : function(t, b, c, d) {
          t /= d / 2;
          if (t < 1) {
            return c / 2 * t * t + b;
          }
          t--;
          return-c / 2 * (t * (t - 2) - 1) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInCubic : function(t, b, c, d) {
          t /= d;
          return c * t * t * t + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeOutCubic : function(t, b, c, d) {
          t /= d;
          t--;
          return c * (t * t * t + 1) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInOutCubic : function(t, b, c, d) {
          t /= d / 2;
          if (t < 1) {
            return c / 2 * t * t * t + b;
          }
          t -= 2;
          return c / 2 * (t * t * t + 2) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInQuCanvas : function(t, b, c, d) {
          t /= d;
          return c * t * t * t * t + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {?} c
         * @param {number} d
         * @return {?}
         */
        easeOutQuCanvas : function(t, b, c, d) {
          t /= d;
          t--;
          return-c * (t * t * t * t - 1) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInOutQuCanvas : function(t, b, c, d) {
          t /= d / 2;
          if (t < 1) {
            return c / 2 * t * t * t * t + b;
          }
          t -= 2;
          return-c / 2 * (t * t * t * t - 2) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInQuint : function(t, b, c, d) {
          t /= d;
          return c * t * t * t * t * t + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeOutQuint : function(t, b, c, d) {
          t /= d;
          t--;
          return c * (t * t * t * t * t + 1) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInOutQuint : function(t, b, c, d) {
          t /= d / 2;
          if (t < 1) {
            return c / 2 * t * t * t * t * t + b;
          }
          t -= 2;
          return c / 2 * (t * t * t * t * t + 2) + b;
        },
        /**
         * @param {number} t
         * @param {?} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInSine : function(t, b, c, d) {
          return-c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeOutSine : function(t, b, c, d) {
          return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {?} c
         * @param {number} d
         * @return {?}
         */
        easeInOutSine : function(t, b, c, d) {
          return-c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInExpo : function(t, b, c, d) {
          return c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeOutExpo : function(t, b, c, d) {
          return c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInOutExpo : function(t, b, c, d) {
          t /= d / 2;
          if (t < 1) {
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
          }
          t--;
          return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {?} c
         * @param {number} d
         * @return {?}
         */
        easeInCirc : function(t, b, c, d) {
          t /= d;
          return-c * (Math.sqrt(1 - t * t) - 1) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeOutCirc : function(t, b, c, d) {
          t /= d;
          t--;
          return c * Math.sqrt(1 - t * t) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInOutCirc : function(t, b, c, d) {
          t /= d / 2;
          if (t < 1) {
            return-c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
          }
          t -= 2;
          return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInBounce : function(t, b, c, d) {
          return c - this.easing.easeOutBounce(d - t, 0, c, d) + b;
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeOutBounce : function(t, b, c, d) {
          if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
          } else {
            if (t < 2 / 2.75) {
              return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
            } else {
              if (t < 2.5 / 2.75) {
                return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
              } else {
                return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
              }
            }
          }
        },
        /**
         * @param {number} t
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {?}
         */
        easeInOutBounce : function(t, b, c, d) {
          if (t < d / 2) {
            return this.easing.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
          }
          return this.easing.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
      },
      durations : {
        short : 500,
        normal : 1E3,
        long : 2E3
      }
    },
    /**
     * @param {Object} options
     * @return {?}
     */
    animate : function(options) {
      if (!options.properties.fill && !options.properties.stroke) {
        var object = options.object || this;
        var defaults = Canvas.prototype.animation.defaults;
        var easing = typeof options.easing === "function" ? options.easing : defaults.easing[options.easing] || (defaults.easing[Canvas.prototype.utility.toCamelCase(options.easing)] || defaults.easing.linear);
        var duration = typeof options.duration === "number" ? options.duration : defaults.durations[options.duration] || defaults.durations.normal;
        var stCanvas = performance.now();
        var total = stCanvas + duration;
        var properties = options.properties;
        var old = {};
        var id;
        var p;
        for (p in options.properties) {
          if (options.properties.hasOwnProperty(p)) {
            old[p] = object[p];
          }
        }
        if (options.loop) {
          /**
           * @return {undefined}
           */
          var animate = function() {
            var p;
            for (p in options.properties) {
              if (options.properties.hasOwnProperty(p)) {
                object[p] = old[p];
              }
            }
            Canvas.prototype.animation.animate({
              object : object,
              properties : properties,
              easing : easing,
              duration : duration,
              /** @type {function (): undefined} */
              callback : animate
            });
          };
          /** @type {function (): undefined} */
          options.callback = animate;
        }
        (function update() {
          var now = performance.now();
          /** @type {number} */
          var progress = Math.min((duration - (total - now)) / duration, 1);
          var i;
          for (i in options.properties) {
            if (options.properties.hasOwnProperty(i)) {
              object[i] = easing(now - stCanvas, old[i], options.properties[i] - old[i], duration);
            }
          }
          if (progress < 1) {
            /** @type {number} */
            id = requestAnimationFrame(update);
          } else {
            id = cancelAnimationFrame(id);
            if (options.callback) {
              options.callback();
            }
          }
        })();
        return object;
      } else {
        var _object = options.object || this;
        var _properties = options.properties || {};
        var _id;
        var fill = _properties.fill;
        var stroke = _properties.stroke;
        var increment = options.increment || 1;
        var loop = options.loop;
        var callback = options.callback;
        var oldF = _object.fill;
        var oldS = _object.stroke;
        if (fill) {
          var infoF = Canvas.prototype.utility.hslaInformation(_object.fill);
          var currF = infoF;
          var f;
          for (f in infoF) {
            if (infoF.hasOwnProperty(f)) {
              if (f === "alpha") {
                continue;
              }
              /** @type {number} */
              infoF[f] = Number(String(currF[f] instanceof Number ? currF[f] : infoF[f]).replace("%", ""));
            }
          }
        }
        if (stroke) {
          var infoS = Canvas.prototype.utility.hslaInformation(_object.stroke);
          var currS = infoS;
          var s;
          for (s in infoS) {
            if (infoS.hasOwnProperty(s)) {
              /** @type {number} */
              infoS[s] = Number(String(currS[s] instanceof Number ? currS[s] : infoS[s]).replace("%", ""));
            }
          }
        }
        if (loop) {
          /**
           * @return {undefined}
           */
          var _animate = function() {
            _object.fill = oldF;
            _object.stroke = oldS;
            Canvas.prototype.animation.animate({
              object : _object,
              properties : _properties,
              /** @type {function (): undefined} */
              callback : _animate,
              increment : increment
            });
          };
          /** @type {function (): undefined} */
          callback = _animate;
        }
        /**
         * @param {Object} a
         * @param {Object} b
         * @param {number} by
         * @return {?}
         */
        var equals = function(a, b, by) {
          var result;
          var key;
          for (key in a) {
            if (a.hasOwnProperty(key)) {
              /** @type {boolean} */
              result = a[key] - b[key] < (by || 0.1);
            }
          }
          return result;
        };
        (function update() {
          var p;
          for (p in _properties) {
            if (_properties.hasOwnProperty(p)) {
              if (p === "fill") {
                var _f;
                for (_f in _properties[p]) {
                  if (_properties[p].hasOwnProperty(_f)) {
                    currF[_f] = _properties[p][_f] > currF[_f] ? currF[_f] + increment : currF[_f] - increment;
                  }
                }
                _object[p] = Canvas.prototype.utility.color({
                  hue : Number(String(currF.hue instanceof Number ? currF.hue : infoF.hue).replace("%", "")),
                  saturation : Number(String(currF.saturation instanceof Number ? currF.saturation : infoF.saturation).replace("%", "")),
                  light : Number(String(currF.light instanceof Number ? currF.light : infoF.light).replace("%", "")),
                  alpha : Number(String(currF.alpha instanceof Number ? currF.alpha : infoF.alpha))
                });
              } else {
                if (p === "stroke") {
                  var _s;
                  for (_s in _properties[p]) {
                    if (_properties[p].hasOwnProperty(_s)) {
                      currS[_s] = _properties[p][_s] > currS[_s] ? currS[_s] + increment : currS[_s] - increment;
                    }
                  }
                  _object[p] = Canvas.prototype.utility.color({
                    hue : Number(String(currS.hue instanceof Number ? currS.hue : infoS.hue).replace("%", "")),
                    saturation : Number(String(currS.saturation instanceof Number ? currS.saturation : infoS.saturation).replace("%", "")),
                    light : Number(String(currS.light instanceof Number ? currS.light : infoS.light).replace("%", "")),
                    alpha : Number(String(currS.hue instanceof Number ? currS.hue : infoS.hue))
                  });
                }
              }
            }
          }
          if (fill && stroke) {
            if (!equals(fill, currF, fill.alpha ? 0 : NaN) && !equals(stroke, currS, fill.alpha ? 0 : NaN)) {
              /** @type {number} */
              _id = requestAnimationFrame(update);
            } else {
              _id = cancelAnimationFrame(_id);
              if (callback instanceof Function) {
                callback.call(object, object);
              }
            }
          } else {
            if (fill) {
              if (!equals(fill, currF, fill.alpha ? 0 : NaN)) {
                /** @type {number} */
                _id = requestAnimationFrame(update);
              } else {
                _id = cancelAnimationFrame(_id);
                if (callback instanceof Function) {
                  callback.call(object, object);
                }
              }
            } else {
              if (!equals(stroke, currS, fill.alpha ? 0 : NaN)) {
                /** @type {number} */
                _id = requestAnimationFrame(update);
              } else {
                _id = cancelAnimationFrame(_id);
                if (callback instanceof Function) {
                  callback.call(object, object);
                }
              }
            }
          }
        })();
        return _object;
      }
    }
  },
  physics : {
    /**
     * @param {Object} a
     * @param {Object} b
     * @return {?}
     */
    aabb : function(a, b) {
      return a.x < b.x + b.width && (a.x + a.width > b.x && (a.y < b.y + b.height && a.height + a.y > b.y));
    },
    /**
     * @param {Object} a
     * @param {Object} b
     * @return {?}
     */
    intersection : function(a, b) {
      if (this.aabb(a, b)) {
        var x;
        var y;
        var width;
        var height;
        /** @type {number} */
        x = Math.max(a.x, b.x);
        /** @type {number} */
        y = Math.max(a.y, b.y);
        /** @type {number} */
        width = Math.min(a.x + a.width, b.width + b.height) - x;
        /** @type {number} */
        height = Math.min(a.y + a.height, b.y + b.height) - y;
        return[x, y, width, height];
      } else {
        return[0, 0, 0, 0];
      }
    },
    /**
     * @param {Object} a
     * @param {Object} b
     * @return {?}
     */
    collision : function(a, b) {
      if (!a.group && !b.group) {
        if (a.radius && b.radius) {
          return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)) < a.radius + b.radius;
        } else {
          return this.aabb(a.boundaries(), b.boundaries());
        }
      } else {
        if (a.group && b.group) {
          var result;
          /** @type {number} */
          var c = 0;
          for (;c < a.children.length;c += 1) {
            /** @type {number} */
            var _c = c + 1;
            for (;_c < b.children.length;_c += 1) {
              var _a = Canvas.prototype.utility.extend({}, a.children[c]);
              var _b = Canvas.prototype.utility.extend({}, b.children[_c]);
              _a.x += _a.parent.x;
              _a.y += _a.parent.y;
              _b.x += _b.parent.x;
              _b.y += _b.parent.y;
              _a.velocity = _a.parent.velocity;
              _b.velocity = _b.parent.velocity;
              if (_a.radius && _b.radius) {
                /** @type {boolean} */
                result = Math.sqrt(Math.pow(_b.x - _a.x, 2) + Math.pow(_b.y - _a.y, 2)) < _a.radius + _b.radius;
              } else {
                result = this.aabb(_a.boundaries(), _b.boundaries());
              }
              if (result) {
                return{
                  collision : result,
                  pCanvas : [_a, _b]
                };
              }
            }
          }
        } else {
          if (a.group) {
            var _result;
            /** @type {number} */
            var x = 0;
            for (;x < a.children.length;x += 1) {
              var y = Canvas.prototype.utility.extend({}, a.children[x]);
              y.x += y.parent.x;
              y.y += y.parent.y;
              y.velocity = y.parent.velocity;
              if (y.radius && b.radius) {
                /** @type {boolean} */
                _result = Math.sqrt(Math.pow(b.x - y.x, 2) + Math.pow(b.y - y.y, 2)) < y.radius + b.radius;
              } else {
                _result = this.aabb(y.boundaries(), b.boundaries());
              }
              if (_result) {
                return{
                  collision : _result,
                  pCanvas : y
                };
              }
            }
          } else {
            var $result;
            /** @type {number} */
            var _x = 0;
            for (;_x < b.children.length;_x += 1) {
              var z = Canvas.prototype.utility.extend({}, b.children[_x]);
              z.x += z.parent.x;
              z.y += z.parent.y;
              z.velocity = z.parent.velocity;
              if (a.radius && z.radius) {
                /** @type {boolean} */
                $result = Math.sqrt(Math.pow(z.x - a.x, 2) + Math.pow(z.y.y - a.y, 2)) < a.radius + z.radius;
              } else {
                $result = this.aabb(a.boundaries(), z.boundaries());
              }
              if ($result) {
                return{
                  collision : $result,
                  pCanvas : z
                };
              }
            }
          }
        }
      }
      return this.collision.core;
    },
    /**
     * @param {Object} options
     * @return {?}
     */
    force : function(options) {
      var object = options.object || this;
      var operation = options.operation || "+";
      var by = options.by || "5";
      var type = options.type || {
        x : true,
        y : true
      };
      /** @type {*} */
      object.velocity.x = type.x ? eval(object.velocity.x = object.velocity.x + operation + by) : object.velocity.x;
      /** @type {*} */
      object.velocity.y = type.y ? eval(object.velocity.y = object.velocity.y + operation + by) : object.velocity.y;
      return object;
    }
  },
  ticker : {
    request : function() {
      /** @type {number} */
      var last = 0;
      /** @type {Array} */
      var vendors = ["webkit", "moz"];
      var rAF;
      var v;
      /** @type {function (this:Window, function (number): ?, (Element|null)=): number} */
      rAF = window.requestAnimationFrame;
      for (;v < vendors.length && !rAF;v += 1) {
        rAF = window[vendors[v] + "RequestAnimationFrame"];
      }
      if (!rAF) {
        /**
         * @param {?} callback
         * @return {?}
         */
        rAF = function(callback) {
          var curr = performance.now();
          /** @type {number} */
          var time = Math.max(0, 16 - (curr - last));
          /** @type {number} */
          var id = window.setTimeout(function() {
            callback(curr + time);
          }, time);
          last = curr + time;
          return id;
        };
      }
      return rAF;
    }().bind(window)
  },
  utility : {
    /**
     * @param {?} destination
     * @param {?} source
     * @return {?}
     */
    extend : function(destination, source) {
      var o;
      for (o in source) {
        if (o) {
          destination[o] = source[o];
        }
      }
      return destination;
    }
  }
};
/**
 * @param {?} options
 * @return {?}
 */
Canvas.prototype.display.Base.extend = function(options) {
  var id = options.id;
  var constructor;
  var Supers = options.Supers || [];
  var statics = options.statics || {};
  /**
   * @return {undefined}
   */
  constructor = function() {
    Canvas.prototype.display.Base.apply(this, arguments);
    /** @type {number} */
    var s = 0;
    for (;s < Supers.length;s += 1) {
      Supers[s].apply(this, arguments);
    }
    options.constructor.apply(this, arguments);
  };
  var prototype = constructor.prototype;
  /** @type {function (?, ?): ?} */
  var extend = Canvas.prototype.utility.extend;
  var p;
  for (p in options) {
    if (p !== "constructor" && (p !== "id" && (p !== "Supers" && p !== "statics"))) {
      if (Object.prototype.toString.call(options[p]) === "[object Object]") {
        extend(constructor.prototype, options[p]);
      } else {
        constructor.prototype[p] = options[p];
      }
    }
  }
  extend(prototype, extend(options.constructor.prototype, Canvas.prototype.display.Base.prototype));
  /** @type {number} */
  var s = 0;
  for (;s < Supers.length;s += 1) {
    extend(prototype, Supers[s].prototype);
  }
  constructor.prototype = prototype;
  if (Object.keys(statics).length > 0) {
    extend(constructor, statics);
  }
  /**
   * @return {?}
   */
  var $constructor = function() {
    /** @type {Object} */
    var self = Object.create(constructor.prototype);
    constructor.apply(self, arguments);
    return self;
  };
  return id ? Canvas.prototype.display[id] = $constructor : $constructor;
};
/**
 * @param {Object} options
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.animate = function(options) {
  var modules = Canvas.prototype;
  var animation = modules.animation.animate({
    object : this,
    properties : options.properties,
    easing : options.easing,
    duration : options.duration,
    callback : options.callback,
    loop : options.loop,
    increment : options.increment
  });
  return animation;
};
/**
 * @param {?} options
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.clone = function(options) {
  var self = new Canvas.prototype.display.Base;
  /** @type {function (?, ?): ?} */
  var extend = Canvas.prototype.utility.extend;
  extend(self, this);
  extend(self, options);
  return self;
};
/**
 * @param {?} options
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.path = function(options) {
  return Canvas.prototype.animation.path(Canvas.prototype.utility.extend({
    object : this
  }, options));
};
/**
 * @param {?} options
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.move = function(options) {
  if (this._velocity) {
    this.velocity.x += options.x || 0;
    this.velocity.y += options.y || 0;
  }
  return this;
};
/**
 * @param {number} options
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.moveTo = function(options) {
  this.x = options.x;
  this.y = options.y;
  return this;
};
/**
 * @param {number} rotation
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.rotate = function(rotation) {
  this.rotation += rotation;
  return this;
};
/**
 * @param {?} angle
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.rotateTo = function(angle) {
  this.rotate(angle - this.rotation);
  return this;
};
/**
 * @param {Object} b
 * @param {Function} callback
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.collides = function(b, callback) {
  if (this._collision && b._collision) {
    var result = Canvas.prototype.physics.collision(this, b);
    if (result) {
      if (callback) {
        callback.call(this, this, b);
      } else {
        return result;
      }
    } else {
      return result;
    }
  }
};
/**
 * @param {string} type
 * @param {Object} options
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.force = function(type, options) {
  if (type === "add") {
    this.forces[options.id] = {
      operation : options.operation,
      by : options.by,
      type : options.type,
      object : this
    };
  } else {
    if (type === "remove") {
      var f;
      for (f in this.forces) {
        if (this.forces.hasOwnProperty(f)) {
          if (f === options) {
            delete this.forces[f];
          }
        }
      }
    }
  }
  return this;
};
/**
 * @param {Function} callback
 * @return {undefined}
 */
Canvas.prototype.display.Base.prototype.dragAndDrop = function(callback) {
  var old = this.velocity;
  var canvas = Canvas.prototype.display.Base.core.canvas;
  var object = this;
  var _velocity = object._velocity;
  var _force = object._force;
  callback = callback || function(event, object) {
    /** @type {boolean} */
    object._velocity = false;
    /** @type {boolean} */
    object._force = false;
    object.x = event.clientX;
    object.y = event.clientY;
  };
  /**
   * @param {?} event
   * @return {undefined}
   */
  var onMouseMove = function(event) {
    callback.call(object, event, object);
  };
  /**
   * @return {undefined}
   */
  var onMouseUp = function() {
    /** @type {boolean} */
    object.dragging = false;
    object._velocity = _velocity;
    object._force = _force;
    if (!callback) {
      /** @type {number} */
      object.velocity.x = object.x - old.x;
      /** @type {number} */
      object.velocity.y = object.y - old.y;
    }
    canvas.removeEventListener("mousemove", onMouseMove, false);
    canvas.removeEventListener("mouseup", onMouseUp, false);
  };
  canvas.addEventListener("mousedown", function(event) {
    if (Canvas.prototype.utility.containsPoint(event, object.boundaries())) {
      /** @type {boolean} */
      object.dragging = true;
      if (!callback) {
        old = object.velocity;
      }
      canvas.addEventListener("mousemove", onMouseMove, false);
      canvas.addEventListener("mouseup", onMouseUp, false);
    }
  }, false);
};
/**
 * @param {?} options
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.walls = function(options) {
  if (this._walls) {
    return Canvas.prototype.physics.walls(Canvas.prototype.utility.extend({
      object : this
    }, options));
  }
};
/**
 * @param {?} object
 * @param {number} spring
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.spring = function(object, spring) {
  spring = spring || 0.1;
  this.velocity.x += (object.x - this.x) * spring;
  this.velocity.y += (object.y - this.y) * spring;
  return this;
};
/**
 * @param {Object} bodyB
 * @return {?}
 */
Canvas.prototype.display.Base.prototype.gravitate = function(bodyB) {
  /** @type {number} */
  var dx = bodyB.x - this.x;
  var dy = bodyB.y = this.y;
  /** @type {number} */
  var squaredDistance = dx * dx + dy * dy;
  /** @type {number} */
  var distance = Math.sqrt(squaredDistance);
  /** @type {number} */
  var force = this.mass * bodyB.mass / squaredDistance;
  /** @type {number} */
  var ax = force * dx / distance;
  /** @type {number} */
  var ay = force * dy / distance;
  this.velocity.x += ax / this.mass;
  this.velocity.x += ay / this.mass;
  bodyB.velocity.x -= ax / bodyB.mass;
  bodyB.velocity.y -= ay / bodyB.mass;
  return this;
};
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {undefined}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      radius : 25
    };
    extend(this, extend(defaults, options));
  },
  id : "circle",
  /**
   * @return {?}
   */
  draw : function() {
    var g = Canvas.prototype.display.circle.core.graphics;
    var t = this;
    g.save();
    g.translate(t.x, t.y);
    g.rotate(t.rotation);
    g.globalAlpha = t.opacity === "super" ? t.parent.opacity : t.opacity;
    g.lineWidth = t.lineWidth === "super" ? t.parent.lineWidth : t.lineWidth;
    g.fillStyle = t.fill === "super" ? t.parent.fill : t.fill;
    g.strokeStyle = t.stroke === "super" ? t.parent.stroke : t.stroke;
    g.beginPath();
    g.arc(0, 0, t.radius, 0, Math.PI * 2, false);
    g.closePath();
    if (t.fill) {
      g.fill();
    }
    if (t.stroke) {
      g.stroke();
    }
    g.restore();
    return this;
  },
  /**
   * @return {?}
   */
  boundaries : function() {
    return{
      x : this.x - this.radius,
      y : this.y - this.radius,
      width : this.radius * 2,
      height : this.radius * 2
    };
  },
  /**
   * @return {?}
   */
  momentOfInertia : function() {
    return this.mass * this.radius * this.radius / 2;
  }
});
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {undefined}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      radius : {
        x : 50,
        y : 25
      }
    };
    extend(this, extend(defaults, options));
  },
  id : "ellipse",
  /**
   * @return {?}
   */
  draw : function() {
    var t = this;
    var g = Canvas.prototype.display.Base.core.graphics;
    g.save();
    g.scale(t.scale.x, t.scale.y);
    g.globalAlpha = t.opacity === "super" ? t.parent.opacity : t.opacity;
    g.lineWidth = t.lineWidth === "super" ? t.parent.lineWidth : t.lineWidth;
    g.fillStyle = t.fill === "super" ? t.parent.fill : t.fill;
    g.strokeStyle = t.stroke === "super" ? t.parent.stroke : t.stroke;
    g.beginPath();
    g.ellipse(t.x, t.y, t.radius.x, t.radius.y, t.rotation, 0, Math.PI * 2, false);
    g.closePath();
    if (t.fill) {
      g.fill();
    }
    if (t.stroke) {
      g.stroke();
    }
    g.restore();
    return this;
  },
  /**
   * @return {?}
   */
  boundaries : function() {
    return{
      x : this.x - this.radius.x,
      y : this.y - this.radius.y,
      width : this.radius.x * 2,
      height : this.radius.y * 2
    };
  },
  /**
   * @return {?}
   */
  momentOfInertia : function() {
    /** @type {number} */
    var averageRadius = (this.radius.x + this.radius.y) / 2;
    return this.mass * averageRadius * averageRadius / 2;
  }
});
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {undefined}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      width : 50,
      height : 25
    };
    extend(this, extend(defaults, options));
  },
  id : "rectangle",
  /**
   * @return {?}
   */
  draw : function() {
    var g = Canvas.prototype.display.rectangle.core.graphics;
    var t = this;
    g.save();
    g.translate(t.x, t.y);
    g.rotate(t.rotation);
    g.scale(t.scale.x, t.scale.y);
    g.globalAlpha = t.opacity === "super" ? t.parent.opacity : t.opacity;
    g.lineWidth = t.lineWidth === "super" ? t.parent.lineWidth : t.lineWidth;
    g.fillStyle = t.fill === "super" ? t.parent.fill : t.fill;
    g.strokeStyle = t.stroke === "super" ? t.parent.stroke : t.stroke;
    g.beginPath();
    g.rect(t.width / -2, t.height / -2, t.width, t.height);
    g.closePath();
    if (t.fill) {
      g.fill();
    }
    if (t.stroke) {
      g.stroke();
    }
    g.restore();
    return this;
  },
  /**
   * @return {?}
   */
  boundaries : function() {
    if (!this.rotation) {
      return{
        x : this.x - this.width / 2,
        y : this.y - this.height / 2,
        width : this.width,
        height : this.height
      };
    }
    var cx = this.x;
    var cy = this.y;
    var angle = this.rotation;
    /** @type {function (number, number, number, number, number): ?} */
    var corner = Canvas.prototype.physics.corner;
    var a = corner(cx, cy, cx - this.width / 2, cy - this.height / 2, angle);
    var b = corner(cx, cy, cx + this.width / 2, cy, angle);
    var c = corner(cx, cy, cx + this.width / 2, cy + this.height / 2, angle);
    var d = corner(cx, cy, cx, cy + this.height / 2, angle);
    /** @type {number} */
    var x = Math.min(a.x, b.x, c.x, d.x);
    /** @type {number} */
    var y = Math.min(a.y, b.y, c.y, d.y);
    /** @type {number} */
    var _x = Math.max(a.x, b.x, c.x, d.x);
    /** @type {number} */
    var _y = Math.max(a.y, b.y, c.y, d.y);
    return{
      x : x,
      y : y,
      width : _x - x,
      height : _y - y
    };
  },
  /**
   * @return {?}
   */
  momentOfInertia : function() {
    return(this.width * this.width + this.height * this.height) * this.mass / 12;
  }
});
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {undefined}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      width : 25,
      height : 25,
      radius : 5
    };
    extend(this, extend(defaults, options));
  },
  id : "squircle",
  /**
   * @return {?}
   */
  draw : function() {
    var t = this;
    var g = Canvas.prototype.display.squircle.core.graphics;
    g.save();
    g.translate(t.x, t.y);
    g.rotate(t.rotation);
    g.fillStyle = t.fill === "super" ? t.parent.fill : t.fill;
    g.strokeStyle = t.stroke === "super" ? t.parent.stroke : t.stroke;
    g.lineWidth = t.lineWidth === "super" ? t.parent.lineWidth : t.lineWidth;
    g.globalAlpha = t.opacity === "super" ? t.parent.opacity : t.opacity;
    g.scale(t.scale.x, t.scale.y);
    g.beginPath();
    g.moveTo(t.radius, 0);
    g.lineTo(t.width - t.radius, 0);
    g.quadraticCurveTo(t.width, 0, t.width, t.radius);
    g.lineTo(t.width, t.height - t.radius);
    g.quadraticCurveTo(t.width, t.height, t.width - t.radius, t.height);
    g.lineTo(t.radius, t.height);
    g.quadraticCurveTo(0, t.height, 0, t.height - t.radius);
    g.lineTo(0, t.radius);
    g.quadraticCurveTo(0, 0, t.radius, 0);
    g.closePath();
    if (t.fill) {
      g.fill();
    }
    if (t.stroke) {
      g.stroke();
    }
    g.restore();
    return this;
  },
  /**
   * @return {?}
   */
  boundaries : function() {
    return this;
  },
  /**
   * @return {?}
   */
  momentOfInertia : function() {
    return(this.width * this.width + this.height * this.height) * this.mass / 12;
  }
});
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {undefined}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      sides : 3,
      length : 10,
      angle : Math.PI * 2 / this.sides,
      rotation : -Math.PI / 2
    };
    extend(this, extend(defaults, options));
  },
  id : "polygon",
  /**
   * @return {?}
   */
  draw : function() {
    var g = Canvas.prototype.display.polygon.core.graphics;
    var t = this;
    /** @type {number} */
    t.angle = Math.PI * 2 / t.sides;
    g.save();
    g.translate(t.x, t.y);
    g.rotate(t.rotation);
    g.scale(t.scale.x, t.scale.y);
    g.globalAlpha = t.opacity === "super" ? t.parent.opacity : t.opacity;
    g.lineWidth = t.lineWidth === "super" ? t.parent.lineWidth : t.lineWidth;
    g.fillStyle = t.fill === "super" ? t.parent.fill : t.fill;
    g.strokeStyle = t.stroke === "super" ? t.parent.stroke : t.stroke;
    g.beginPath();
    g.moveTo(t.length, 0);
    /** @type {number} */
    var s = 1;
    for (;s < t.sides;s += 1) {
      g.lineTo(t.length * Math.cos(t.angle * s), t.length * Math.sin(t.angle * s));
    }
    g.closePath();
    if (t.fill) {
      g.fill();
    }
    if (t.stroke) {
      g.stroke();
    }
    g.restore();
    return this;
  },
  /**
   * @param {?} options
   * @return {?}
   */
  boundaries : function(options) {
    return{
      x : this.x - this.length,
      y : this.y - this.length,
      width : this.length * 2,
      height : this.length * 2
    };
  },
  /**
   * @return {?}
   */
  momentOfInertia : function() {
    return(new Canvas.prototype.display.rectangle).momentOfInertia.call(this.boundaries());
  }
});
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {?}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      text : "Hello, world.",
      font : "normal 20px Helvetica"
    };
    extend(this, extend(defaults, options));
    return this;
  },
  id : "text",
  /**
   * @return {?}
   */
  draw : function() {
    var g = Canvas.prototype.display.text.core.graphics;
    var t = this;
    g.save();
    g.translate(t.x, t.y);
    g.rotate(t.rotation);
    g.scale(t.scale.x, t.scale.y);
    g.globalAlpha = t.opacity === "super" ? t.parent.opacity : t.opacity;
    g.lineWidth = t.lineWidth === "super" ? t.parent.lineWidth : t.lineWidth;
    g.fillStyle = t.fill === "super" ? t.parent.fill : t.fill;
    g.strokeStyle = t.stroke === "super" ? t.parent.stroke : t.stroke;
    g.font = t.font;
    g.beginPath();
    if (t.fill) {
      g.fillText(t.text, 0, 0);
    }
    if (t.stroke) {
      g.strokeText(t.text, 0, 0);
    }
    g.closePath();
    g.restore();
    return this;
  },
  /**
   * @return {?}
   */
  boundaries : function() {
    return{
      x : this.x,
      y : this.y,
      width : Canvas.prototype.display.text.core.graphics.measureText(this.text).width,
      height : (new Canvas.prototype.display.graph).textHeight(this.font)
    };
  },
  /**
   * @return {?}
   */
  momentOfInertia : function() {
    return(new Canvas.prototype.display.rectangle).momentOfInertia.call(this.boundaries());
  }
});
/**
 * @param {Function} path
 * @return {?}
 */
Canvas.prototype.display.path = function(path) {
  if (!(this instanceof Canvas.prototype.display.path)) {
    return new Canvas.prototype.display.path(path);
  }
  Canvas.prototype.utility.extend(this, {
    /** @type {Function} */
    path : path
  });
};
/**
 * @return {?}
 */
Canvas.prototype.display.path.prototype.draw = function() {
  var path = this.path;
  var graphics = Canvas.prototype.display.path.core.graphics;
  graphics.beginPath();
  path.call(graphics, graphics);
  graphics.closePath();
  return this;
};
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {undefined}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      points : [],
      tension : 0.5,
      closed : false
    };
    extend(this, extend(defaults, options));
  },
  id : "curve",
  /**
   * @return {?}
   */
  draw : function() {
    var t = this;
    var g = Canvas.prototype.display.curve.core.graphics;
    var spline = Canvas.prototype.display.curve.spline(t.points, t.tension, t.segments, t.closed);
    g.strokeStyle = t.stroke === "super" ? t.parent.stroke : t.stroke;
    g.lineWidth = t.lineWidth === "super" ? t.parent.lineWidth : t.lineWidth;
    g.globalAlpha = t.opacity === "super" ? t.parent.opacity : t.opacity;
    g.beginPath();
    g.moveTo(spline[0], spline[1]);
    /** @type {number} */
    var p = 2;
    for (;p < spline.length;p += 2) {
      g.lineTo(spline[p], spline[p + 1]);
    }
    g.stroke();
    return this;
  }
});
/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @return {?}
 */
Canvas.prototype.display.curve.distance = function(a, b, c, d) {
  /** @type {number} */
  var dx = c - a;
  /** @type {number} */
  var dy = d - b;
  return Math.sqrt(dx * dx + dy * dy);
};
/**
 * @param {Array} points
 * @param {number} position
 * @return {?}
 */
Canvas.prototype.display.curve.coordinates = function(points, position) {
  /** @type {number} */
  var length = 0;
  var _final;
  var i;
  var l = points.length;
  /** @type {number} */
  i = 2;
  for (;i < l;i += 2) {
    _final = Canvas.prototype.display.curve.distance(points[i], points[i + 1], points[i - 2], points[i - 1]);
    length += _final;
    if (position < length && _final) {
      length -= _final;
      position -= length;
      return{
        x : points[i - 2] + (points[i] - points[i - 2]) * (position / _final),
        y : points[i - 1] + (points[i + 1] - points[i - 1]) * (position / _final)
      };
    }
  }
};
/**
 * @param {Array} points
 * @return {?}
 */
Canvas.prototype.display.curve._length = function(points) {
  /** @type {number} */
  var length = 0;
  /** @type {number} */
  var i = 0;
  for (;i < points.length - 2;i += 2) {
    length += Canvas.prototype.display.curve.distance(points[i + 2], points[i + 3], points[i], points[i + 1]);
  }
  return length;
};
/**
 * @param {Array} points
 * @param {number} tension
 * @param {number} segments
 * @param {boolean} closed
 * @return {?}
 */
Canvas.prototype.display.curve.spline = function(points, tension, segments, closed) {
  /** @type {number} */
  tension = typeof tension === "number" ? tension : 0.5;
  /** @type {number} */
  segments = typeof segments === "number" ? segments : 25;
  var _points;
  /** @type {number} */
  var i = 1;
  var l = points.length;
  /** @type {number} */
  var _position = 0;
  /** @type {number} */
  var rLen = (l - 2) * segments + 2 + (closed ? 2 * segments : 0);
  /** @type {Float32Array} */
  var _spline = new Float32Array(rLen);
  /** @type {Float32Array} */
  var cache = new Float32Array((segments + 2) * 4);
  /** @type {number} */
  var _c = 4;
  _points = points.slice(0);
  /**
   * @param {(Array|Element)} _points
   * @param {(Array|Int8Array|Uint8Array)} cache
   * @param {number} l
   * @param {number} tension
   * @return {undefined}
   */
  var parse = function(_points, cache, l, tension) {
    /** @type {number} */
    var i = 2;
    var t;
    for (;i < l;i += 2) {
      var _a = _points[i];
      var _b = _points[i + 1];
      var _d = _points[i + 2];
      var _e = _points[i + 3];
      /** @type {number} */
      var $a = (_d - _points[i - 2]) * tension;
      /** @type {number} */
      var $aa = (_e - _points[i - 1]) * tension;
      /** @type {number} */
      var $b = (_points[i + 4] - _a) * tension;
      /** @type {number} */
      var $bb = (_points[i + 5] - _b) * tension;
      /** @type {number} */
      var c = 0;
      var x;
      var y;
      var z;
      var $z;
      /** @type {number} */
      t = 0;
      for (;t < segments;t++) {
        x = cache[c++];
        y = cache[c++];
        z = cache[c++];
        $z = cache[c++];
        /** @type {number} */
        _spline[_position++] = x * _a + y * _d + z * $a + $z * $b;
        /** @type {number} */
        _spline[_position++] = x * _b + y * _e + z * $aa + $z * $bb;
      }
    }
  };
  if (closed) {
    _points.unshift(points[l - 1]);
    _points.unshift(points[l - 2]);
    _points.push(points[0], points[1]);
  } else {
    _points.unshift(points[1]);
    _points.unshift(points[0]);
    _points.push(points[l - 2], points[l - 1]);
  }
  /** @type {number} */
  cache[0] = 1;
  for (;i < segments;i++) {
    /** @type {number} */
    var a = i / segments;
    /** @type {number} */
    var b = a * a;
    /** @type {number} */
    var c = b * a;
    /** @type {number} */
    var d = c * 2;
    /** @type {number} */
    var e = b * 3;
    /** @type {number} */
    cache[_c++] = d - e + 1;
    /** @type {number} */
    cache[_c++] = e - d;
    /** @type {number} */
    cache[_c++] = c - 2 * b + a;
    /** @type {number} */
    cache[_c++] = c - b;
  }
  /** @type {number} */
  cache[++_c] = 1;
  parse(_points, cache, l, tension);
  if (closed) {
    /** @type {Array} */
    _points = [];
    _points.push(points[l - 4], points[l - 3], points[l - 2], points[l - 1], points[0], points[1], points[2], points[3]);
    parse(_points, cache, 4, tension);
  }
  /** @type {number} */
  l = closed ? 0 : points.length - 2;
  _spline[_position++] = points[l++];
  _spline[_position] = points[l];
  return _spline;
};
/**
 * @param {Object} options
 * @return {?}
 */
Canvas.prototype.animation.path = function(options) {
  var _spline = Canvas.prototype.display.curve.spline(options.points, options.tension, options.segments, options.closed);
  var _length = Canvas.prototype.display.curve._length(_spline);
  /** @type {number} */
  var t = 0;
  var speed = options.speed;
  var object = options.object || this;
  var position;
  (function update() {
    Canvas.prototype.ticker.request(update);
    t += speed;
    if (t < 0 || t >= _length) {
      speed *= -1;
    }
    position = Canvas.prototype.display.curve.coordinates(_spline, t);
    object.x = position.x || object.x;
    object.y = position.y || object.y;
  })();
  return object;
};
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {undefined}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      width : 250,
      margin : {
        x : 15,
        y : 15
      },
      height : 250,
      data : [["Jan", 0], ["Feb", 50], ["Mar", 100]],
      title : "Test",
      labels : {
        x : "Foo",
        y : "Bar"
      }
    };
    extend(this, extend(defaults, options));
  },
  id : "graph",
  /**
   * @param {string} font
   * @return {?}
   */
  textHeight : function(font) {
    /** @type {(HTMLElement|null)} */
    var body = document.body;
    /** @type {Element} */
    var dummy = document.createElement("div");
    /** @type {Text} */
    var text = document.createTextNode("M");
    var result;
    dummy.appendChild(text);
    dummy.setAttribute("style", font);
    body.appendChild(dummy);
    result = dummy.offsetHeight;
    body.removeChild(dummy);
    return result;
  },
  /**
   * @return {?}
   */
  draw : function() {
    var t = this;
    var g = Canvas.prototype.display.Base.core.graphics;
    g.save();
    g.translate(t.x, t.y);
    g.rotate(t.rotation);
    g.scale(t.scale.x, t.scale.y);
    g.globalAlpha = t.opacity === "super" ? t.parent.opacity : t.opacity;
    g.lineWidth = t.lineWidth === "super" ? t.parent.lineWidth : t.lineWidth;
    g.fillStyle = t.fill === "super" ? t.parent.fill : t.fill;
    g.strokeStyle = t.stroke === "super" ? t.parent.stroke : t.stroke;
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(t.width, 0);
    g.moveTo(0, 2);
    g.lineTo(0, -t.height);
    /** @type {string} */
    g.font = "15px Helvetica";
    g.fillText(t.labels.x, t.width / 2 - g.measureText(t.labels.x).width / 2, 40);
    g.translate(0, -t.height / 2);
    g.rotate(-Math.PI / 2);
    g.fillText(t.labels.y, -g.measureText(t.labels.y).width / 2, -40);
    g.rotate(Math.PI / 2);
    g.translate(0, t.height / 2);
    /** @type {number} */
    var d = 0;
    for (;d < t.data.length;d += 1) {
      g.fillText(t.data[d][0], d * (g.measureText(t.data[d][0]).width + t.margin.x), 20);
    }
    g.rotate(-Math.PI / 2);
    /** @type {number} */
    var $d = 0;
    for (;$d < t.data.length;$d += 1) {
      g.fillText(t.data[$d][1], $d * (t.textHeight("font: " + g.font + ";") + t.margin.y), -10);
    }
    g.moveTo(0, t.data[0][1]);
    /** @type {number} */
    var _d = 1;
    for (;_d < t.data.length;_d += 1) {
      g.lineTo(_d * (g.measureText(t.data[_d][0]).width + t.margin.x), t.data[_d][1]);
    }
    g.rotate(Math.PI / 2);
    /** @type {string} */
    g.font = "25px Helvetica";
    g.fillText(t.title, t.width / 2, -t.height - 10);
    /** @type {string} */
    g.font = "15px Helvetica";
    g.rotate(-Math.PI / 2);
    g.closePath();
    g.stroke();
    /** @type {string} */
    g.fillStyle = "#505050";
    g.beginPath();
    /** @type {number} */
    var __d = 0;
    for (;__d < t.data.length;__d += 1) {
      g.arc(__d * (g.measureText(t.data[__d][0]).width + t.margin.x), t.data[__d][1], 5, 0, Math.PI * 2, false);
    }
    g.closePath();
    g.fill();
    g.restore();
    return this;
  },
  /**
   * @return {?}
   */
  boundaries : function() {
    return{
      x : this.x,
      y : this.y - this.height,
      width : this.width,
      height : this.height
    };
  }
});
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {undefined}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      colors : [],
      data : [60, 60, 60, 60, 60, 60],
      labels : ["A", "B", "C", "D", "E", "F"],
      radius : 50
    };
    /** @type {number} */
    var d = 0;
    for (;d < defaults.data.length;d += 1) {
      defaults.colors.push(Canvas.prototype.utility.color({
        hue : Math.random() * 360
      }));
    }
    extend(this, extend(defaults, options));
  },
  id : "chCanvas",
  /**
   * @return {?}
   */
  draw : function() {
    var t = this;
    var g = Canvas.prototype.display.Base.core.graphics;
    /** @type {number} */
    var last = 0;
    /** @type {number} */
    var total = 0;
    /** @type {Array} */
    var pieData = [];
    /** @type {number} */
    var d = 0;
    for (;d < t.data.length;d += 1) {
      total += t.data[d];
    }
    /** @type {number} */
    var $d = 0;
    for (;$d < t.data.length;$d += 1) {
      /** @type {Array} */
      pieData[$d] = [];
      pieData[$d].value = t.data[$d];
      /** @type {number} */
      pieData[$d].stCanvas = 2 * Math.PI * last;
      /** @type {number} */
      pieData[$d].end = 2 * Math.PI * (last + t.data[$d] / total);
      last += t.data[$d] / total;
    }
    g.save();
    g.translate(t.x, t.y);
    g.rotate(t.rotation);
    g.scale(t.scale.x, t.scale.y);
    g.globalAlpha = t.opacity === "super" ? t.parent.opacity : t.opacity;
    g.lineWidth = t.lineWidth === "super" ? t.parent.lineWidth : t.lineWidth;
    /** @type {string} */
    g.font = "20px Helvetica";
    /** @type {number} */
    var _d = 0;
    for (;_d < t.data.length;_d += 1) {
      g.fillStyle = g.strokeStyle = t.colors[_d];
      g.beginPath();
      g.moveTo(0, 0);
      g.arc(0, 0, t.radius, pieData[_d].stCanvas, pieData[_d].end, false);
      g.lineTo(0, 0);
      if (t.fill) {
        g.fill();
      }
      if (t.stroke) {
        g.stroke();
      }
      g.closePath();
      last += Math.PI * 2 * (t.data[$d] / total);
    }
    g.restore();
    return this;
  },
  /**
   * @return {?}
   */
  boundaries : function() {
    return{
      x : this.x - this.radius,
      y : this.y - this.radius,
      width : this.radius * 2,
      height : this.radius * 2
    };
  },
  /**
   * @return {?}
   */
  momentOfInertia : function() {
    return this.mass * this.radius * this.radius / 2;
  }
});
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {undefined}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      rows : 5,
      columns : 5,
      width : 500,
      height : 500,
      each : {
        width : null,
        height : null
      }
    };
    /** @type {number} */
    defaults.each.width = defaults.rows;
    /** @type {number} */
    defaults.each.height = defaults.columns;
    extend(this, extend(defaults, options));
  },
  id : "table",
  /**
   * @return {?}
   */
  draw : function() {
    var t = this;
    var g = Canvas.prototype.display.Base.core.graphics;
    g.save();
    g.translate(t.x, t.y);
    g.rotate(t.rotation);
    g.scale(t.scale.x, t.scale.y);
    g.globalAlpha = t.opacity === "super" ? t.parent.opacity : t.opacity;
    g.lineWidth = t.lineWidth === "super" ? t.parent.lineWidth : t.lineWidth;
    g.fillStyle = t.fill === "super" ? t.parent.fill : t.fill;
    g.strokeStyle = t.stroke === "super" ? t.parent.stroke : t.stroke;
    g.beginPath();
    /** @type {number} */
    var offset = g.lineWidth / 2;
    /** @type {number} */
    var x = 0;
    for (;x < t.width;x += t.height / t.each.width) {
      g.moveTo(x, 0);
      g.lineTo(x, t.height + offset);
    }
    /** @type {number} */
    var y = 0;
    for (;y < t.height;y += t.height / t.each.height) {
      g.moveTo(-offset, y);
      g.lineTo(t.width + offset, y);
    }
    g.moveTo(t.width, 0);
    g.lineTo(t.width, t.height);
    g.moveTo(0, t.height);
    g.lineTo(t.width + offset, t.height);
    g.closePath();
    g.stroke();
    g.restore();
    return this;
  },
  /**
   * @return {?}
   */
  boundaries : function() {
    return this;
  }
});
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {undefined}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      spikes : 5,
      radius : {
        outer : 30,
        inner : 15
      }
    };
    extend(this, extend(defaults, options));
  },
  id : "star",
  /**
   * @return {?}
   */
  draw : function() {
    var t = this;
    var g = Canvas.prototype.display.star.core.graphics;
    /** @type {number} */
    var rotation = Math.PI / 2 * 3;
    /** @type {number} */
    var step = Math.PI / t.spikes;
    /** @type {number} */
    var s = 0;
    g.save();
    g.translate(t.x, t.y);
    g.rotate(t.rotation);
    g.strokeStyle = t.stroke === "super" ? t.parent.stroke : t.stroke;
    g.fillStyle = t.fill === "super" ? t.parent.fill : t.fill;
    g.globalAlpha = t.opacity === "super" ? t.parent.opacity : t.opacity;
    g.lineWidth = t.lineWidth === "super" ? t.parent.lineWidth : t.lineWidth;
    g.scale(t.scale.x, t.scale.y);
    g.beginPath();
    g.moveTo(0, -t.radius.outer);
    for (;s < t.spikes;s++) {
      g.lineTo(Math.cos(rotation) * t.radius.outer, Math.sin(rotation) * t.radius.outer);
      rotation += step;
      g.lineTo(Math.cos(rotation) * t.radius.inner, Math.sin(rotation) * t.radius.inner);
      rotation += step;
    }
    g.lineTo(0, -t.radius.outer);
    g.closePath();
    if (t.fill) {
      g.fill();
    }
    if (t.stroke) {
      g.stroke();
    }
    g.restore();
    return t;
  },
  /**
   * @return {?}
   */
  boundaries : function() {
    return{
      x : this.x,
      y : this.y,
      width : this.radius.outer,
      height : this.radius.inner
    };
  }
});
Canvas.prototype.display.Base.extend({
  /**
   * @param {?} options
   * @return {undefined}
   */
  constructor : function(options) {
    /** @type {function (?, ?): ?} */
    var extend = Canvas.prototype.utility.extend;
    var defaults = {
      children : [],
      group : true
    };
    extend(this, extend(defaults, options));
    /** @type {number} */
    var c = 0;
    for (;c < this.children.length;c += 1) {
      this.children[c].parent = this;
    }
  },
  id : "group",
  /**
   * @return {?}
   */
  draw : function() {
    var t = this;
    var g = Canvas.prototype.display.group.core.graphics;
    /** @type {number} */
    var c = 0;
    g.save();
    g.translate(t.x, t.y);
    g.rotate(t.rotation);
    g.scale(t.scale.x, t.scale.y);
    for (;c < t.children.length;c += 1) {
      t.children[c].draw();
    }
    g.restore();
    return this;
  },
  /**
   * @return {?}
   */
  boundaries : function() {
    var aabb;
    var child;
    var result;
    /** @type {Array} */
    var x = [];
    /** @type {Array} */
    var y = [];
    /** @type {number} */
    var c = 0;
    var length = this.children.length;
    for (;c < length;c += 1) {
      child = this.children[c];
      aabb = child.boundaries();
      aabb.x += this.x;
      aabb.y += this.y;
      result = result ? Canvas.prototype.physics.aabb2(result, aabb, true) : aabb;
      var _b;
      for (_b in aabb) {
        if (_b === "x") {
          x.push(aabb[_b]);
        } else {
          if (_b === "y") {
            y.push(aabb[_b]);
          }
        }
      }
    }
    var min = {
      x : Math.min.apply(null, x),
      y : Math.min.apply(null, y)
    };
    /** @type {number} */
    result.x = min.x;
    /** @type {number} */
    result.y = min.y;
    return result;
  },
  /**
   * @return {?}
   */
  momentOfInertia : function() {
    var c;
    /** @type {number} */
    var mOI = 0;
    for (;c < this.children.length;c += 1) {
      mOI += this.children[c].momentOfInertia();
    }
    return this.children[0].momentOfInertia() / 12E3;
  }
});
/**
 * @param {?} x
 * @param {?} y
 * @return {?}
 */
Canvas.prototype.physics.vector = function(x, y) {
  if (!(this instanceof Canvas.prototype.physics.vector)) {
    return new Canvas.prototype.physics.vector(x, y);
  }
  this.x = x;
  this.y = y;
};
/**
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype.clone = function() {
  return Canvas.prototype.physics.vector(this.x, this.y);
};
/**
 * @param {Object} vector
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype.dot = function(vector) {
  return this.x * vector.x + this.y * vector.y;
};
/**
 * @param {?} vector
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype.vCross = function(vector) {
  return this.x * vector.y - this.y * vector.x;
};
/**
 * @param {?} scalar
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype.sCross = function(scalar) {
  return Canvas.prototype.physics.vector(scalar * this.y, -scalar * this.x);
};
/**
 * @param {?} scalar
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype._sCross = function(scalar) {
  return Canvas.prototype.physics.vector(-scalar * this.y, scalar * this.x);
};
/**
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
/**
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype.normalize = function() {
  /** @type {number} */
  var scalar = 1 / this.length();
  this.x *= scalar;
  this.y *= scalar;
  return this;
};
/**
 * @param {number} angle
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype.rotate = function(angle) {
  /** @type {number} */
  this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
  /** @type {number} */
  this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
  return this;
};
/**
 * @param {?} vector
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
  return this;
};
/**
 * @param {?} vector
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype.subtract = function(vector) {
  this.x -= vector.x;
  this.y -= vector.y;
  return this;
};
/**
 * @param {number} scalar
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype.multiply = function(scalar) {
  return Canvas.prototype.physics.vector(this.x * scalar, this.y * scalar);
};
/**
 * @param {?} scalar
 * @return {?}
 */
Canvas.prototype.physics.vector.prototype.divide = function(scalar) {
  return Canvas.prototype.physics.vector(this.x / scalar, this.y / scalar);
};
/**
 * @param {Object} bodyA
 * @param {Object} bodyB
 * @return {?}
 */
Canvas.prototype.physics.response = function(bodyA, bodyB) {
  var v;
  var vDelta;
  var lh;
  var rh;
  var x;
  var distance;
  var direction = this.vector(bodyA.x - bodyB.x, bodyA.y - bodyB.y);
  var d;
  /** @type {boolean} */
  var isCircle = false;
  if (bodyA.radius && bodyB.radius) {
    d = bodyA.radius + bodyB.radius;
    /** @type {boolean} */
    isCircle = true;
  } else {
    var boundsA = bodyA.boundaries();
    var boundsB = bodyB.boundaries();
    /** @type {number} */
    d = boundsA.width / 2 + boundsB.width / 2;
  }
  var f = direction.length();
  if (f > d) {
    return;
  }
  distance = bodyA.mass + bodyB.mass;
  direction.normalize();
  v = this.vector(direction.y, -direction.x);
  vDelta = direction.multiply((isCircle ? bodyA.radius + bodyB.radius : boundsA.width / 2 + boundsB.width / 2) - f);
  var cacheA = vDelta.multiply(bodyB.mass / distance);
  bodyA.x += cacheA.x;
  bodyA.y += cacheA.y;
  var cacheB = vDelta.multiply(-bodyA.mass / distance);
  bodyB.x += cacheB.x;
  bodyB.y += cacheB.y;
  /** @type {number} */
  x = -bodyA.restitution * -bodyB.restitution;
  lh = direction.multiply(bodyA.velocity.dot(direction)).length();
  rh = direction.multiply(bodyB.velocity.dot(direction)).length();
  bodyA.velocity = v.multiply(bodyA.velocity.dot(v));
  var _cacheA = direction.multiply((x * bodyB.mass * (rh - lh) + bodyA.mass * lh + bodyB.mass * rh) / distance);
  bodyA.velocity.x += _cacheA.x;
  bodyA.velocity.y += _cacheA.y;
  bodyB.velocity = v.multiply(bodyB.velocity.dot(v));
  var _cacheB = direction.multiply((x * bodyA.mass * (lh - rh) + bodyB.mass * rh + bodyA.mass * lh) / distance);
  bodyB.velocity.x += _cacheB.x;
  bodyB.velocity.y += _cacheB.y;
  var pivotA = this.vector(bodyA.x, bodyA.y);
  /** @type {number} */
  bodyA.angularVelocity = 1 * 0.2 * (bodyA.angularVelocity / Math.abs(bodyA.angularVelocity)) * pivotA.subtract(isCircle ? pivotA.add(bodyA.radius) : {
    x : pivotA.x + boundsA.width,
    y : pivotA.y + boundsA.height
  }).vCross(bodyA.velocity);
  var pivotB = this.vector(bodyB.x, bodyB.y);
  /** @type {number} */
  bodyB.angularVelocity = 1 * 0.2 * (bodyB.angularVelocity / Math.abs(bodyB.angularVelocity)) * pivotB.subtract(isCircle ? pivotB.add(bodyB.radius) : {
    x : pivotB.x + boundsB.width,
    y : pivotB.y + boundsB.height
  }).vCross(bodyB.velocity);
  return this.response.core;
};
/**
 * @param {Object} options
 * @return {?}
 */
Canvas.prototype.physics.walls = function(options) {
  var canvas = this.walls.core.canvas;
  var object = options.object || this;
  var bounce = options.restitution || (object.restitution || -0.5);
  var offset = {};
  var walls = {
    left : canvas.left || 0,
    right : canvas.right || canvas.width,
    top : canvas.top || 0,
    bottom : canvas.bottom || canvas.height
  };
  if (!object.group) {
    if (object.radius) {
      offset.x = offset.y = object.radius;
    } else {
      var boundaries = object.boundaries();
      /** @type {number} */
      offset.x = boundaries.width / 2;
      /** @type {number} */
      offset.y = boundaries.height / 2;
    }
    var callback = options.callback || {
      /**
       * @return {undefined}
       */
      left : function() {
        object.x = offset.x;
        object.velocity.x *= bounce;
      },
      /**
       * @return {undefined}
       */
      right : function() {
        /** @type {number} */
        object.x = walls.right - offset.x;
        object.velocity.x *= bounce;
      },
      /**
       * @return {undefined}
       */
      top : function() {
        object.y = offset.y;
        object.velocity.y *= bounce;
      },
      /**
       * @return {undefined}
       */
      bottom : function() {
        /** @type {number} */
        object.y = walls.bottom - offset.y;
        object.velocity.y *= object.velocity.y < 0.5 ? 0 : bounce;
      }
    };
    if (object.x - offset.x < walls.left) {
      if (typeof callback === "function") {
        callback.call(object, object, walls);
      } else {
        if (callback.left) {
          callback.left.call(object, object, walls);
        }
      }
    } else {
      if (object.x + offset.x > walls.right) {
        if (typeof callback === "function") {
          callback.call(object, object, walls);
        } else {
          if (callback.right) {
            callback.right.call(object, object, walls);
          }
        }
      }
    }
    if (object.y - offset.y < walls.top) {
      if (typeof callback === "function") {
        callback.call(object, object, walls);
      } else {
        if (callback.top) {
          callback.top.call(object, object, walls);
        }
      }
    } else {
      if (object.y + offset.y > walls.bottom) {
        if (typeof callback === "function") {
          callback.call(object, object, walls);
        } else {
          if (callback.bottom) {
            callback.bottom.call(object, object, walls);
          }
        }
      }
    }
  } else {
    /** @type {number} */
    var o = 0;
    for (;o < object.children.length;o += 1) {
      var child = Canvas.prototype.utility.extend({}, object.children[o]);
      var _offset = {};
      child.x += object.x;
      child.y += object.y;
      if (child.radius) {
        _offset.x = _offset.y = child.radius;
      } else {
        var _boundaries = child.boundaries();
        /** @type {number} */
        _offset.x = _boundaries.width / 2;
        /** @type {number} */
        _offset.y = _boundaries.height / 2;
      }
      var _callback = options.callback || {
        /**
         * @return {undefined}
         */
        left : function() {
          child.x = _offset.x;
          child.velocity.x *= bounce;
        },
        /**
         * @return {undefined}
         */
        right : function() {
          /** @type {number} */
          child.x = walls.right - _offset.x;
          child.velocity.x *= bounce;
        },
        /**
         * @return {undefined}
         */
        top : function() {
          child.y = _offset.y;
          child.velocity.y *= bounce;
        },
        /**
         * @return {undefined}
         */
        bottom : function() {
          if (object.velocity.y > 0.5) {
            object.velocity.y *= bounce;
          }
        }
      };
      if (child.x - offset.x < walls.left) {
        if (typeof _callback === "function") {
          _callback.call(child, child, walls);
        } else {
          if (_callback.left) {
            _callback.left.call(child, child, walls);
          }
        }
      } else {
        if (child.x + _offset.x > walls.right) {
          if (typeof _callback === "function") {
            _callback.call(child, child, walls);
          } else {
            if (_callback.right) {
              _callback.right.call(child, child, walls);
            }
          }
        }
      }
      if (child.y - _offset.y < walls.top) {
        if (typeof _callback === "function") {
          _callback.call(child, child, walls);
        } else {
          if (_callback.top) {
            _callback.top.call(child, child, walls);
          }
        }
      } else {
        if (child.y + _offset.y > walls.bottom) {
          if (typeof _callback === "function") {
            _callback.call(child, child, walls);
          } else {
            if (_callback.bottom) {
              _callback.bottom.call(child, child, walls);
            }
          }
        }
      }
    }
  }
  return object;
};
/**
 * @param {Object} aabb1
 * @param {Object} aabb2
 * @param {boolean} modify
 * @return {?}
 */
Canvas.prototype.physics.aabb2 = function(aabb1, aabb2, modify) {
  var result = modify === true ? aabb1 : {};
  /** @type {number} */
  var maxX = Math.max(aabb1.x + aabb1.width / 2, aabb2.x + aabb2.width / 2);
  /** @type {number} */
  var maxY = Math.max(aabb1.y + aabb1.height / 2, aabb2.y + aabb2.height / 2);
  /** @type {number} */
  var minX = Math.min(aabb1.x - aabb1.width / 2, aabb2.x - aabb2.width / 2);
  /** @type {number} */
  var minY = Math.min(aabb1.y - aabb1.height / 2, aabb2.y - aabb2.height / 2);
  /** @type {number} */
  result.width = Math.abs(maxX - minX) * 0.5 * 2;
  /** @type {number} */
  result.height = Math.abs(maxY - minY) * 0.5 * 2;
  /** @type {number} */
  result.x = (maxX + minX) * 0.5;
  /** @type {number} */
  result.y = (maxY + minY) * 0.5;
  return result;
};
/**
 * @param {number} x
 * @param {number} y
 * @param {number} _x
 * @param {number} _y
 * @param {number} rotation
 * @return {?}
 */
Canvas.prototype.physics.corner = function(x, y, _x, _y, rotation) {
  var a;
  var b;
  var dx;
  var dy;
  var distance;
  /** @type {number} */
  dx = _x - x;
  /** @type {number} */
  dy = _y - y;
  /** @type {number} */
  distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  rotation += Math.atan2(dy, dx);
  a = x + distance * Math.cos(rotation);
  b = y + distance * Math.sin(rotation);
  return{
    x : a,
    y : b
  };
};
Canvas.prototype.ticker.fps = function() {
  var last = performance.now();
  /** @type {number} */
  var count = 1;
  /** @type {number} */
  var fps = 0;
  return function() {
    /** @type {number} */
    var current = (new Date).getMilliseconds();
    if (last > current) {
      fps = count;
      /** @type {number} */
      count = 1;
    } else {
      count += 1;
    }
    /** @type {number} */
    last = current;
    return fps;
  };
}();
/**
 * @return {undefined}
 */
Canvas.prototype.ticker.clear = function() {
  var core = this.clear.core;
  var graphics = core.graphics;
  var canvas = core.canvas;
  graphics.clearRect(0, 0, canvas.width, canvas.height);
};
/**
 * @return {?}
 */
Canvas.prototype.ticker.update = function() {
  var core = this.update.core;
  /** @type {number} */
  var o = 0;
  var _o;
  var length = core.objects.length;
  for (;o < length;o += 1) {
    core.objects[o].draw();
    core.objects[o].x += core.objects[o].velocity.x;
    core.objects[o].y += core.objects[o].velocity.y;
    /** @type {number} */
    _o = o + 1;
    for (;_o < length;_o += 1) {
      var result = core.objects[o].collides(core.objects[_o]);
      if (typeof result !== "undefined" && (result.collision === true || result === true)) {
        if (!core.objects[o].group && !core.objects[_o].group) {
          core.physics.response(core.objects[o], core.objects[_o]);
        } else {
          if (core.objects[o].group && core.objects[_o].group) {
            core.physics.response(result.pCanvas[0], result.pCanvas[1]);
          } else {
            if (core.objects[o].group) {
              core.physics.response(result.pCanvas, core.objects[_o]);
            } else {
              core.physics.response(core.objects[o], result.pCanvas);
            }
          }
        }
      }
    }
    if (core.objects[o]._force) {
      var f;
      for (f in core.objects[o].forces) {
        if (core.objects[o].forces.hasOwnProperty(f)) {
          core.physics.force(core.utility.extend({
            object : core.objects[o]
          }, core.objects[o].forces[f]));
        }
      }
      if (core.objects[o]._angular) {
        /** @type {number} */
        var torque = 0;
        torque += core.objects[o].angularVelocity * -1;
        /** @type {number} */
        core.objects[o].angularAcceleration = torque / core.objects[o].momentOfInertia();
        core.objects[o].angularVelocity += core.objects[o].angularAcceleration;
        core.objects[o].rotation += core.objects[o].angularVelocity;
      }
    }
    core.objects[o].walls();
  }
  return core;
};
/**
 * @param {?} callback
 * @return {?}
 */
Canvas.prototype.ticker.loop = function(callback) {
  var id;
  var self = this;
  (function update() {
    id = self.request(update);
    self.clear();
    self.update();
    callback();
  })();
  return id;
};
/**
 * @param {?} options
 * @return {?}
 */
Canvas.prototype.utility.random = function(options) {
  var defaults = {
    minimum : 0,
    maximum : 100
  };
  this.extend(defaults, options);
  return Math.floor(Math.random() * (defaults.maximum - defaults.minimum + 1)) + defaults.minimum;
};
/**
 * @param {string} string
 * @return {?}
 */
Canvas.prototype.utility.toCamelCase = function(string) {
  return string.replace(/(\-[a-z])/g, function(x) {
    return x.toUpperCase().replace("-", "");
  });
};
/**
 * @param {Object} point
 * @param {Object} rectangle
 * @return {?}
 */
Canvas.prototype.utility.containsPoint = function(point, rectangle) {
  return point.x > rectangle.x && (point.x < rectangle.x + rectangle.width && (point.y > rectangle.y && point.y < rectangle.y + rectangle.height));
};
/**
 * @param {?} options
 * @return {?}
 */
Canvas.prototype.utility.color = function(options) {
  var defaults = {
    hue : 180,
    saturation : 50,
    light : 50,
    alpha : 50
  };
  this.extend(defaults, options);
  return "hsla(" + defaults.hue + ", " + defaults.saturation + "%, " + defaults.light + "%, " + defaults.alpha + ")";
};
/**
 * @param {Object} options
 * @return {?}
 */
Canvas.prototype.utility.plugin = function(options) {
  options.plugin = options.plugin.bind(this.plugin.core);
  if (options.module === "display") {
    var display = {
      constructor : options.plugin,
      id : options.id
    };
    var p;
    for (p in options) {
      if (options.hasOwnProperty(p)) {
        if (p !== "plugin" && (p !== "module" && p !== "id")) {
          display[p] = options[p];
        }
      }
    }
    Canvas.prototype.display.Base.extend(display);
  } else {
    Canvas.prototype[options.module][options.id] = options.plugin;
  }
  return this.plugin.core;
};
/**
 * @return {?}
 */
Canvas.prototype.utility.pointer = function() {
  var pointer = {};
  var element = this.pointer.core.canvas;
  var x;
  var y;
  element.addEventListener("mousemove", function(event) {
    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= element.offsetLeft;
    y -= element.offsetTop;
    pointer.x = x;
    pointer.y = y;
  }, false);
  element.addEventListener("touchstCanvas", function() {
    /** @type {boolean} */
    pointer.pressed = true;
  });
  element.addEventListener("touchmove", function(event) {
    var x;
    var y;
    var _touch = event.touches[0];
    if (_touch.pageX && _touch.pageY) {
      x = _touch.pageX;
      y = _touch.pageY;
    } else {
      x = _touch.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = _touch.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    pointer.x = x;
    pointer.y = y;
  });
  return pointer;
};
/**
 * @param {Object} options
 * @return {?}
 */
Canvas.prototype.utility.resize = function(options) {
  var core = this.resize.core;
  var defaults = {
    width : window.innerWidth,
    height : window.innerHeight
  };
  core.canvas.width = options.width || defaults.width;
  core.canvas.height = options.height || defaults.height;
  if (options.listen) {
    (function(canvas, options, defaults) {
      window.addEventListener("resize", function() {
        canvas.width = options.width || defaults.width;
        canvas.height = options.height || defaults.height;
      });
    })(core.canvas, options, defaults);
  }
  return core;
};
/**
 * @param {string} hsla
 * @return {?}
 */
Canvas.prototype.utility.hslaInformation = function(hsla) {
  var information = hsla.slice(5, hsla.length - 1).split(", ");
  var result = {
    hue : information[0],
    saturation : information[1],
    light : information[2],
    alpha : information[3]
  };
  return result;
};
/**
 * @param {Object} options
 * @return {?}
 */
Canvas.prototype.utility.style = function(options) {
  var s;
  for (s in options) {
    if (options.hasOwnProperty(s)) {
      this.style.core.canvas.style[s] = options[s];
    }
  }
  return this.style.core;
};
/**
 * @param {Object} options
 * @return {?}
 */
Canvas.prototype.utility.populate = function(options) {
  /** @type {number} */
  var o = 0;
  for (;o <= options.amount;o += 1) {
    options.stack.push(options.factory.call(o, o));
  }
  return options.stack;
};
Canvas.prototype.utility.scratch = {
  types : {},
  pools : {},
  /**
   * @param {string} id
   * @param {Function} factory
   * @return {?}
   */
  register : function(id, factory) {
    /** @type {Function} */
    this.types[id] = factory;
    /** @type {Array} */
    this.pools[id] = [];
    return factory;
  },
  /**
   * @param {?} id
   * @return {?}
   */
  get : function(id) {
    var pool = this.pools[id];
    if (pool.length !== 0) {
      return pool.pop();
    } else {
      return new this.types[id];
    }
  },
  /**
   * @param {?} id
   * @param {?} object
   * @param {?} result
   * @return {?}
   */
  free : function(id, object, result) {
    this.pools[id].push(object);
    return result;
  }
};
Canvas.prototype.utility.scratch.register("vector", Canvas.prototype.physics.vector);
