/*!
 * vue-c-share.js v0.2.0
 * https://github.com/ycs77/vue-c-share
 *
 * Copyright 2020 Lucas Yang
 * Released under the MIT license
 *
 * Date: 2020-07-19T09:56:22.501Z
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vueFontawesome = require('@fortawesome/vue-fontawesome');
var fontawesomeSvgCore = require('@fortawesome/fontawesome-svg-core');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var freeBrandsSvgIcons = require('@fortawesome/free-brands-svg-icons');

//
fontawesomeSvgCore.library.add(freeSolidSvgIcons.faCircle);
fontawesomeSvgCore.library.add(freeSolidSvgIcons.faEnvelope);
fontawesomeSvgCore.library.add(freeBrandsSvgIcons.faFacebookF);
fontawesomeSvgCore.library.add(freeBrandsSvgIcons.faGooglePlusG);
fontawesomeSvgCore.library.add(freeBrandsSvgIcons.faLine);
fontawesomeSvgCore.library.add(freeBrandsSvgIcons.faWeibo);
fontawesomeSvgCore.library.add(freeBrandsSvgIcons.faTwitter);
fontawesomeSvgCore.library.add(freeBrandsSvgIcons.faTumblr);
fontawesomeSvgCore.library.add(freeBrandsSvgIcons.faPinterestP);
var script = {
  name: 'CShare',
  components: {
    fa: vueFontawesome.FontAwesomeIcon,
    faLayers: vueFontawesome.FontAwesomeLayers,
    faLayersText: vueFontawesome.FontAwesomeLayersText
  },
  props: {
    description: String,
    showButtons: {
      type: Array,
      default: () => ['fb', 'gPlus']
    },
    buttons: {
      type: Object,
      default: () => ({
        fb: {
          fa: ['fab', 'facebook-f'],
          name: 'Fb',
          href: url => `https://www.facebook.com/sharer.php?u=${url}`,
          transform: 'shrink-9'
        },
        gPlus: {
          fa: ['fab', 'google-plus-g'],
          name: 'Google+',
          href: url => `https://plus.google.com/share?url=${url}`,
          transform: 'shrink-9 left-1'
        },
        line: {
          fa: ['fab', 'line'],
          name: 'Line',
          href: url => `https://lineit.line.me/share/ui?url=${url}`,
          transform: '',
          hideWrapper: true
        },
        plurk: {
          name: 'Plurk',
          href: (url, description) => `http://www.plurk.com/?qualifier=shares&status=${description} ${url}`,
          transform: 'shrink-9',
          text: 'P'
        },
        weibo: {
          fa: ['fab', 'weibo'],
          name: '微博',
          href: (url, description) => `http://service.weibo.com/share/share.php?title=${description}&url=${url}`,
          transform: 'shrink-9'
        },
        twitter: {
          fa: ['fab', 'twitter'],
          name: 'Twitter',
          href: (url, description) => `https://twitter.com/intent/tweet?original_referer=${url}&url=${url}&text=${description}`,
          transform: 'shrink-9'
        },
        tumblr: {
          fa: ['fab', 'tumblr'],
          name: 'Tumblr',
          href: (url, description) => `http://www.tumblr.com/share/link?name=${description} ${url}&url=${url}`,
          transform: 'shrink-9'
        },
        pinterest: {
          fa: ['fab', 'pinterest-p'],
          name: 'Pinterest',
          href: (url, description) => `http://pinterest.com/pin/create/button/?url=${url}&description=${description} ${url}`,
          transform: 'shrink-9'
        },
        email: {
          fa: ['fas', 'envelope'],
          name: 'E-mail',
          href: (url, description) => `mailto:?subject=${description}&body=${description} ${url}`,
          transform: 'shrink-9'
        }
      })
    },
    spacing: {
      type: Number,
      default: 6
    },
    shareToText: {
      type: String,
      default: 'Share to'
    }
  },
  computed: {
    href: () => location.href.replace(/#\w/, ''),
    mobile: () => navigator.userAgent.match(/(mobile|android|pad)/i),

    linkStyle() {
      return {
        margin: `auto ${Number(this.spacing) / 2}px`
      };
    }

  },
  methods: {
    clickLink(e, href) {
      if (!this.mobile) {
        e.preventDefault();
        window.open(href, '_blank', 'height=600,width=500');
      }
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    _vm._l(_vm.showButtons, function(btnId) {
      return _c(
        "a",
        {
          key: btnId,
          style: _vm.linkStyle,
          attrs: {
            href: _vm.buttons[btnId].href.call(null, _vm.href, _vm.description),
            title: _vm.shareToText + " " + _vm.buttons[btnId].name,
            target: "_blank"
          },
          on: {
            click: function($event) {
              _vm.clickLink(
                $event,
                _vm.buttons[btnId].href.call(null, _vm.href, _vm.description)
              );
            }
          }
        },
        [
          _c(
            "fa-layers",
            { staticClass: "fa-2x" },
            [
              !_vm.buttons[btnId].hideWrapper
                ? _c("fa", {
                    class: "icon-" + btnId,
                    attrs: { icon: "circle" }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.buttons[btnId].text
                ? _c("fa-layers-text", {
                    attrs: {
                      transform: _vm.buttons[btnId].transform,
                      value: _vm.buttons[btnId].text
                    }
                  })
                : _c("fa", {
                    attrs: {
                      icon: _vm.buttons[btnId].fa,
                      transform: _vm.buttons[btnId].transform,
                      inverse: !_vm.buttons[btnId].hideWrapper
                    }
                  })
            ],
            1
          )
        ],
        1
      )
    }),
    0
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-027746ff_0", { source: "\na[data-v-027746ff] {\r\n  display: inline-block;\r\n  text-decoration: none;\r\n  -webkit-transition:\r\n    -webkit-transform .2s,\r\n    -ms-transform .2s,\r\n    transform .2s;\r\n  -moz-transition:\r\n    -webkit-transform .2s,\r\n    -ms-transform .2s,\r\n    transform .2s;\r\n  transition:\r\n    -webkit-transform .2s,\r\n    -ms-transform .2s,\r\n    transform .2s;\n}\na[data-v-027746ff]:hover {\r\n  -webkit-transform: translateY(-4px);\r\n  -ms-transform: translateY(-4px);\r\n  transform: translateY(-4px);\n}\n.icon-fb[data-v-027746ff] {\r\n  color: #3B5998;\n}\n.icon-gPlus[data-v-027746ff] {\r\n  color: #d73d32;\n}\n.fa-line[data-v-027746ff]  {\r\n  color: #00c300;\n}\n.icon-plurk[data-v-027746ff] {\r\n  color: #cf682f;\n}\n.icon-plurk ~ .fa-layers-text[data-v-027746ff] {\r\n  color: #ffffff;\r\n  font-family: arial;\r\n  font-style: normal;\r\n  font-weight: bold;\n}\n.icon-weibo[data-v-027746ff] {\r\n  color: #F5CA59;\n}\n.icon-twitter[data-v-027746ff] {\r\n  color: #2ba9e1;\n}\n.icon-tumblr[data-v-027746ff] {\r\n  color: #35465d;\n}\n.icon-pinterest[data-v-027746ff] {\r\n  color: #EA1514;\n}\n.icon-email[data-v-027746ff] {\r\n  color: #939598;\n}\r\n", map: {"version":3,"sources":["D:\\dev\\packages\\vue-c-share\\src\\CShare.vue"],"names":[],"mappings":";AAmKA;EACA,qBAAA;EACA,qBAAA;EACA;;;iBAGA;EACA;;;iBAGA;EACA;;;iBAGA;AACA;AACA;EACA,mCAAA;EACA,+BAAA;EACA,2BAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;EACA,kBAAA;EACA,kBAAA;EACA,iBAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA","file":"CShare.vue","sourcesContent":["<template>\r\n  <div>\r\n    <a\r\n      v-for=\"btnId in showButtons\"\r\n      :key=\"btnId\"\r\n      :href=\"buttons[btnId].href.call(null, href, description)\"\r\n      :title=\"`${shareToText} ${buttons[btnId].name}`\"\r\n      target=\"_blank\"\r\n      :style=\"linkStyle\"\r\n      @click=\"clickLink($event, buttons[btnId].href.call(null, href, description))\"\r\n    >\r\n      <fa-layers class=\"fa-2x\">\r\n        <fa icon=\"circle\" :class=\"`icon-${btnId}`\" v-if=\"!buttons[btnId].hideWrapper\"></fa>\r\n        <fa-layers-text\r\n          v-if=\"buttons[btnId].text\"\r\n          :transform=\"buttons[btnId].transform\"\r\n          :value=\"buttons[btnId].text\"\r\n        ></fa-layers-text>\r\n        <fa\r\n          v-else\r\n          :icon=\"buttons[btnId].fa\"\r\n          :transform=\"buttons[btnId].transform\"\r\n          :inverse=\"!buttons[btnId].hideWrapper\"\r\n        ></fa>\r\n      </fa-layers>\r\n    </a>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {\r\n  FontAwesomeIcon as fa,\r\n  FontAwesomeLayers as faLayers,\r\n  FontAwesomeLayersText as faLayersText\r\n} from '@fortawesome/vue-fontawesome'\r\nimport { library } from '@fortawesome/fontawesome-svg-core'\r\nimport { faCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'\r\nimport {\r\n  faFacebookF,\r\n  faGooglePlusG,\r\n  faLine,\r\n  faWeibo,\r\n  faTwitter,\r\n  faTumblr,\r\n  faPinterestP\r\n} from '@fortawesome/free-brands-svg-icons'\r\n\r\nlibrary.add(faCircle)\r\nlibrary.add(faEnvelope)\r\nlibrary.add(faFacebookF)\r\nlibrary.add(faGooglePlusG)\r\nlibrary.add(faLine)\r\nlibrary.add(faWeibo)\r\nlibrary.add(faTwitter)\r\nlibrary.add(faTumblr)\r\nlibrary.add(faPinterestP)\r\n\r\nexport default {\r\n  name: 'CShare',\r\n  components: {\r\n    fa,\r\n    faLayers,\r\n    faLayersText\r\n  },\r\n  props: {\r\n    description: String,\r\n    showButtons: {\r\n      type: Array,\r\n      default: () => [\r\n        'fb',\r\n        'gPlus'\r\n      ]\r\n    },\r\n    buttons: {\r\n      type: Object,\r\n      default: () => ({\r\n        fb: {\r\n          fa: ['fab', 'facebook-f'],\r\n          name: 'Fb',\r\n          href: url => `https://www.facebook.com/sharer.php?u=${url}`,\r\n          transform: 'shrink-9'\r\n        },\r\n        gPlus: {\r\n          fa: ['fab', 'google-plus-g'],\r\n          name: 'Google+',\r\n          href: url => `https://plus.google.com/share?url=${url}`,\r\n          transform: 'shrink-9 left-1'\r\n        },\r\n        line: {\r\n          fa: ['fab', 'line'],\r\n          name: 'Line',\r\n          href: url => `https://lineit.line.me/share/ui?url=${url}`,\r\n          transform: '',\r\n          hideWrapper: true\r\n        },\r\n        plurk: {\r\n          name: 'Plurk',\r\n          href: (url, description) => `http://www.plurk.com/?qualifier=shares&status=${description} ${url}`,\r\n          transform: 'shrink-9',\r\n          text: 'P'\r\n        },\r\n        weibo: {\r\n          fa: ['fab', 'weibo'],\r\n          name: '微博',\r\n          href: (url, description) => `http://service.weibo.com/share/share.php?title=${description}&url=${url}`,\r\n          transform: 'shrink-9'\r\n        },\r\n        twitter: {\r\n          fa: ['fab', 'twitter'],\r\n          name: 'Twitter',\r\n          href: (url, description) => `https://twitter.com/intent/tweet?original_referer=${url}&url=${url}&text=${description}`,\r\n          transform: 'shrink-9'\r\n        },\r\n        tumblr: {\r\n          fa: ['fab', 'tumblr'],\r\n          name: 'Tumblr',\r\n          href: (url, description) => `http://www.tumblr.com/share/link?name=${description} ${url}&url=${url}`,\r\n          transform: 'shrink-9'\r\n        },\r\n        pinterest: {\r\n          fa: ['fab', 'pinterest-p'],\r\n          name: 'Pinterest',\r\n          href: (url, description) => `http://pinterest.com/pin/create/button/?url=${url}&description=${description} ${url}`,\r\n          transform: 'shrink-9'\r\n        },\r\n        email: {\r\n          fa: ['fas', 'envelope'],\r\n          name: 'E-mail',\r\n          href: (url, description) => `mailto:?subject=${description}&body=${description} ${url}`,\r\n          transform: 'shrink-9'\r\n        }\r\n      })\r\n    },\r\n    spacing: {\r\n      type: Number,\r\n      default: 6\r\n    },\r\n    shareToText: {\r\n      type: String,\r\n      default: 'Share to'\r\n    }\r\n  },\r\n  computed: {\r\n    href: () => location.href.replace(/#\\w/, ''),\r\n    mobile: () => navigator.userAgent.match(/(mobile|android|pad)/i),\r\n    linkStyle() {\r\n      return {\r\n        margin: `auto ${Number(this.spacing) / 2}px`\r\n      }\r\n    }\r\n  },\r\n  methods: {\r\n    clickLink(e, href) {\r\n      if (!this.mobile) {\r\n        e.preventDefault()\r\n        window.open(href, '_blank', 'height=600,width=500')\r\n      }\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\na {\r\n  display: inline-block;\r\n  text-decoration: none;\r\n  -webkit-transition:\r\n    -webkit-transform .2s,\r\n    -ms-transform .2s,\r\n    transform .2s;\r\n  -moz-transition:\r\n    -webkit-transform .2s,\r\n    -ms-transform .2s,\r\n    transform .2s;\r\n  transition:\r\n    -webkit-transform .2s,\r\n    -ms-transform .2s,\r\n    transform .2s;\r\n}\r\na:hover {\r\n  -webkit-transform: translateY(-4px);\r\n  -ms-transform: translateY(-4px);\r\n  transform: translateY(-4px);\r\n}\r\n.icon-fb {\r\n  color: #3B5998;\r\n}\r\n.icon-gPlus {\r\n  color: #d73d32;\r\n}\r\n.fa-line  {\r\n  color: #00c300;\r\n}\r\n.icon-plurk {\r\n  color: #cf682f;\r\n}\r\n.icon-plurk ~ .fa-layers-text {\r\n  color: #ffffff;\r\n  font-family: arial;\r\n  font-style: normal;\r\n  font-weight: bold;\r\n}\r\n.icon-weibo {\r\n  color: #F5CA59;\r\n}\r\n.icon-twitter {\r\n  color: #2ba9e1;\r\n}\r\n.icon-tumblr {\r\n  color: #35465d;\r\n}\r\n.icon-pinterest {\r\n  color: #EA1514;\r\n}\r\n.icon-email {\r\n  color: #939598;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-027746ff";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

function install(Vue) {
  if (install.installed) {
    return;
  }

  install.installed = true;
  Vue.component(__vue_component__.name, __vue_component__);
}
let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  // eslint-disable-next-line no-undef
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use({
    install
  });
}

__vue_component__.install = install;

exports.default = __vue_component__;
exports.install = install;
