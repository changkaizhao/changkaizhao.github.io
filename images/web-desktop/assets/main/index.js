window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Actor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d89acFiVh5LgYcGqOecMnQ7", "Actor");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Actor = function(_super) {
      __extends(Actor, _super);
      function Actor() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.speed = 30;
        return _this;
      }
      Actor.prototype.start = function() {
        var sp = this.node.getComponent(cc.Sprite).spriteFrame;
        console.log(sp);
        console.log(sp.getTexture().width, sp.getTexture().height);
      };
      Actor = __decorate([ ccclass ], Actor);
      return Actor;
    }(cc.Component);
    exports.default = Actor;
    cc._RF.pop();
  }, {} ],
  dragable_controller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "399a91W85JKkYaS/ahV5dYa", "dragable_controller");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DragableController = function(_super) {
      __extends(DragableController, _super);
      function DragableController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._initPos = null;
        _this._context = null;
        _this._slot = null;
        return _this;
      }
      DragableController.prototype.resetObj = function() {
        this.node.position = this._initPos;
        this.node.parent = this._context;
      };
      DragableController.prototype.onLoad = function() {
        this._initPos = this.node.position;
        this._context = this.node.parent;
        this._slot = this.node.parent.parent.getChildByName("slot");
      };
      DragableController.prototype._setFollowTouchPos = function(e) {
        var p = e.touch.getLocation();
        var moveLayer = cc.find("Canvas");
        var lp = moveLayer.convertToNodeSpaceAR(p);
        this.node.position = lp;
      };
      DragableController.prototype._testSlot = function(p) {
        var lp = this._slot.convertToNodeSpaceAR(p);
        return lp.x >= -this._slot.width / 2 && lp.x <= this._slot.width / 2 && lp.y >= -this._slot.height / 2 && lp.y <= this._slot.height / 2;
      };
      DragableController.prototype.onEnable = function() {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
          _this._setFollowTouchPos(e);
        });
        this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
          _this._setFollowTouchPos(e);
          var moveLayer = cc.find("Canvas");
          _this.node.parent = moveLayer;
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function(e) {
          _this._testSlot(e.touch.getLocation()) ? _this.node.parent = _this._slot : _this.resetObj();
        });
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {});
      };
      DragableController = __decorate([ ccclass ], DragableController);
      return DragableController;
    }(cc.Component);
    exports.default = DragableController;
    cc._RF.pop();
  }, {} ],
  main_controller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a845aVCG9NLg4lVD87aZLTy", "main_controller");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MainController = function(_super) {
      __extends(MainController, _super);
      function MainController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.background1 = null;
        _this.loading1 = null;
        _this.outline = null;
        _this.split = null;
        _this.grid = null;
        _this.showWindow = null;
        _this._curActiveNode = null;
        return _this;
      }
      MainController.prototype._show = function(name) {
        this._curActiveNode && (this._curActiveNode.active = false);
        this._curActiveNode = this.showWindow.getChildByName(name);
        this._curActiveNode.active = true;
      };
      MainController.prototype.onEnable = function() {
        var _this = this;
        this.background1.node.on("click", function() {
          _this._show(_this.background1.node.name);
        });
        this.loading1.node.on("click", function() {
          _this._show(_this.loading1.node.name);
        });
        this.outline.node.on("click", function() {
          _this._show(_this.outline.node.name);
        });
        this.split.node.on("click", function() {
          _this._show(_this.split.node.name);
        });
        this.grid.node.on("click", function() {
          _this._show(_this.grid.node.name);
        });
      };
      MainController.prototype.start = function() {};
      __decorate([ property(cc.Button) ], MainController.prototype, "background1", void 0);
      __decorate([ property(cc.Button) ], MainController.prototype, "loading1", void 0);
      __decorate([ property(cc.Button) ], MainController.prototype, "outline", void 0);
      __decorate([ property(cc.Button) ], MainController.prototype, "split", void 0);
      __decorate([ property(cc.Button) ], MainController.prototype, "grid", void 0);
      __decorate([ property(cc.Node) ], MainController.prototype, "showWindow", void 0);
      MainController = __decorate([ ccclass ], MainController);
      return MainController;
    }(cc.Component);
    exports.default = MainController;
    cc._RF.pop();
  }, {} ],
  outline_controller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c626naXqZEXpBEkTQ41CaW", "outline_controller");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OutlineController = function(_super) {
      __extends(OutlineController, _super);
      function OutlineController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dragableArea = null;
        return _this;
      }
      OutlineController.prototype.onEnable = function() {};
      __decorate([ property(cc.Node) ], OutlineController.prototype, "dragableArea", void 0);
      OutlineController = __decorate([ ccclass ], OutlineController);
      return OutlineController;
    }(cc.Component);
    exports.default = OutlineController;
    cc._RF.pop();
  }, {} ],
  shader_info: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d3d67cIZdxLfZnNbkz2CA27", "shader_info");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShaderInfoType;
    (function(ShaderInfoType) {
      ShaderInfoType["S_WINDOWSIZE"] = "s_windowSize";
      ShaderInfoType["S_OFFSET"] = "s_offset";
      ShaderInfoType["S_TIME"] = "s_time";
    })(ShaderInfoType || (ShaderInfoType = {}));
    var ShaderInfo = function(_super) {
      __extends(ShaderInfo, _super);
      function ShaderInfo() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.static_coordi = false;
        _this._render = null;
        _this._material = null;
        _this._canvasCenter = null;
        return _this;
      }
      ShaderInfo.prototype.onLoad = function() {
        this._render = this.getComponent(cc.RenderComponent);
        this._material = this._render.getMaterial(0);
        this._material.setProperty(ShaderInfoType.S_WINDOWSIZE, cc.v2(cc.winSize.width, cc.winSize.height));
        this._canvasCenter = cc.director.getScene().getChildByName("Canvas").convertToWorldSpaceAR(cc.v2(0, 0));
        console.log(cc.winSize.width, cc.winSize.height);
        var offset = this._calOffset();
        this._material.setProperty(ShaderInfoType.S_OFFSET, offset);
        this._render.setMaterial(0, this._material);
      };
      ShaderInfo.prototype._calOffset = function() {
        var curNodeCenter = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        return cc.v2(2 * (curNodeCenter.x - this._canvasCenter.x) / cc.winSize.width, 2 * (curNodeCenter.y - this._canvasCenter.y) / cc.winSize.height);
      };
      ShaderInfo.prototype.updateTime = function() {
        var t = cc.director.getTotalTime() / 1e3;
        this._material.setProperty(ShaderInfoType.S_TIME, t);
        if (!this.static_coordi) {
          var offset = this._calOffset();
          this._material.setProperty(ShaderInfoType.S_OFFSET, offset);
        }
      };
      ShaderInfo.prototype.update = function(dt) {
        this.updateTime();
      };
      __decorate([ property({
        type: cc.Boolean,
        tooltip: "\u662f\u5426\u662f\u9759\u6001\u5750\u6807"
      }) ], ShaderInfo.prototype, "static_coordi", void 0);
      ShaderInfo = __decorate([ ccclass ], ShaderInfo);
      return ShaderInfo;
    }(cc.Component);
    exports.default = ShaderInfo;
    cc._RF.pop();
  }, {} ],
  split: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a77fnQG1ZEGqnNb+l7MKhx", "split");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SplitCtr = function(_super) {
      __extends(SplitCtr, _super);
      function SplitCtr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.speed = 30;
        return _this;
      }
      SplitCtr.prototype.start = function() {
        var material = this.getComponent(cc.RenderComponent).getMaterial(0);
        var arr = new Float32Array(400);
        arr[0] = .25;
        arr[4] = .5;
        arr[8] = 1;
        material.setProperty("s_vertex", arr);
      };
      SplitCtr.prototype.update = function(dt) {
        this.node.position.x > 100 && (this.speed *= -1);
        this.node.position.x < -100 && (this.speed *= -1);
        this.node.position = cc.v3(this.node.position.x + dt * this.speed, 0, 0);
      };
      SplitCtr = __decorate([ ccclass ], SplitCtr);
      return SplitCtr;
    }(cc.Component);
    exports.default = SplitCtr;
    cc._RF.pop();
  }, {} ]
}, {}, [ "Actor", "main_controller", "dragable_controller", "outline_controller", "shader_info", "split" ]);