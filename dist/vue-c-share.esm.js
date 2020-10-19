/*!
 * vue-c-share.js v0.2.0
 * https://github.com/ycs77/vue-c-share
 *
 * Copyright 2020 Lucas Yang
 * Released under the MIT license
 *
 * Date: 2020-10-19T07:45:54.631Z
 */

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLine, faWeibo, faTwitter, faTumblr, faPinterestP } from '@fortawesome/free-brands-svg-icons';

//
library.add(faCircle);
library.add(faEnvelope);
library.add(faFacebookF);
library.add(faLine);
library.add(faWeibo);
library.add(faTwitter);
library.add(faTumblr);
library.add(faPinterestP);
var script = {
  name: 'CShare',
  components: {
    fa: FontAwesomeIcon,
    faLayers: FontAwesomeLayers,
    faLayersText: FontAwesomeLayersText
  },
  props: {
    description: String,
    showButtons: {
      type: Array,
      default: () => ['line', 'fb', 'twitter']
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
        line: {
          fa: ['fab', 'line'],
          name: 'Line',
          href: url => `https://social-plugins.line.me/lineit/share?url=${url}`,
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
    href: () => encodeURIComponent(location.href.replace(/#\w/, '')),
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
    inject("data-v-875ee68a_0", { source: "\na[data-v-875ee68a] {\n  display: inline-block;\n  text-decoration: none;\n  -webkit-transition:\n    -webkit-transform .2s,\n    -ms-transform .2s,\n    transform .2s;\n  -moz-transition:\n    -webkit-transform .2s,\n    -ms-transform .2s,\n    transform .2s;\n  transition:\n    -webkit-transform .2s,\n    -ms-transform .2s,\n    transform .2s;\n}\na[data-v-875ee68a]:hover {\n  -webkit-transform: translateY(-4px);\n  -ms-transform: translateY(-4px);\n  transform: translateY(-4px);\n}\n.icon-fb[data-v-875ee68a] {\n  color: #3B5998;\n}\n.fa-line[data-v-875ee68a]  {\n  color: #00c300;\n}\n.icon-plurk[data-v-875ee68a] {\n  color: #cf682f;\n}\n.icon-plurk ~ .fa-layers-text[data-v-875ee68a] {\n  color: #ffffff;\n  font-family: arial;\n  font-style: normal;\n  font-weight: bold;\n}\n.icon-weibo[data-v-875ee68a] {\n  color: #F5CA59;\n}\n.icon-twitter[data-v-875ee68a] {\n  color: #2ba9e1;\n}\n.icon-tumblr[data-v-875ee68a] {\n  color: #35465d;\n}\n.icon-pinterest[data-v-875ee68a] {\n  color: #EA1514;\n}\n.icon-email[data-v-875ee68a] {\n  color: #939598;\n}\n", map: {"version":3,"sources":["D:\\dev\\packages\\vue-c-share\\src\\CShare.vue"],"names":[],"mappings":";AAwJA;EACA,qBAAA;EACA,qBAAA;EACA;;;iBAGA;EACA;;;iBAGA;EACA;;;iBAGA;AACA;AACA;EACA,mCAAA;EACA,+BAAA;EACA,2BAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;EACA,kBAAA;EACA,kBAAA;EACA,iBAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA,cAAA;AACA","file":"CShare.vue","sourcesContent":["<template>\n  <div>\n    <a\n      v-for=\"btnId in showButtons\"\n      :key=\"btnId\"\n      :href=\"buttons[btnId].href.call(null, href, description)\"\n      :title=\"`${shareToText} ${buttons[btnId].name}`\"\n      target=\"_blank\"\n      :style=\"linkStyle\"\n      @click=\"clickLink($event, buttons[btnId].href.call(null, href, description))\"\n    >\n      <fa-layers class=\"fa-2x\">\n        <fa icon=\"circle\" :class=\"`icon-${btnId}`\" v-if=\"!buttons[btnId].hideWrapper\"></fa>\n        <fa-layers-text\n          v-if=\"buttons[btnId].text\"\n          :transform=\"buttons[btnId].transform\"\n          :value=\"buttons[btnId].text\"\n        ></fa-layers-text>\n        <fa\n          v-else\n          :icon=\"buttons[btnId].fa\"\n          :transform=\"buttons[btnId].transform\"\n          :inverse=\"!buttons[btnId].hideWrapper\"\n        ></fa>\n      </fa-layers>\n    </a>\n  </div>\n</template>\n\n<script>\nimport {\n  FontAwesomeIcon as fa,\n  FontAwesomeLayers as faLayers,\n  FontAwesomeLayersText as faLayersText\n} from '@fortawesome/vue-fontawesome'\nimport { library } from '@fortawesome/fontawesome-svg-core'\nimport { faCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'\nimport {\n  faFacebookF,\n  faLine,\n  faWeibo,\n  faTwitter,\n  faTumblr,\n  faPinterestP\n} from '@fortawesome/free-brands-svg-icons'\n\nlibrary.add(faCircle)\nlibrary.add(faEnvelope)\nlibrary.add(faFacebookF)\nlibrary.add(faLine)\nlibrary.add(faWeibo)\nlibrary.add(faTwitter)\nlibrary.add(faTumblr)\nlibrary.add(faPinterestP)\n\nexport default {\n  name: 'CShare',\n  components: {\n    fa,\n    faLayers,\n    faLayersText\n  },\n  props: {\n    description: String,\n    showButtons: {\n      type: Array,\n      default: () => ['line', 'fb', 'twitter']\n    },\n    buttons: {\n      type: Object,\n      default: () => ({\n        fb: {\n          fa: ['fab', 'facebook-f'],\n          name: 'Fb',\n          href: url => `https://www.facebook.com/sharer.php?u=${url}`,\n          transform: 'shrink-9'\n        },\n        line: {\n          fa: ['fab', 'line'],\n          name: 'Line',\n          href: url => `https://social-plugins.line.me/lineit/share?url=${url}`,\n          transform: '',\n          hideWrapper: true\n        },\n        plurk: {\n          name: 'Plurk',\n          href: (url, description) => `http://www.plurk.com/?qualifier=shares&status=${description} ${url}`,\n          transform: 'shrink-9',\n          text: 'P'\n        },\n        weibo: {\n          fa: ['fab', 'weibo'],\n          name: '微博',\n          href: (url, description) => `http://service.weibo.com/share/share.php?title=${description}&url=${url}`,\n          transform: 'shrink-9'\n        },\n        twitter: {\n          fa: ['fab', 'twitter'],\n          name: 'Twitter',\n          href: (url, description) => `https://twitter.com/intent/tweet?original_referer=${url}&url=${url}&text=${description}`,\n          transform: 'shrink-9'\n        },\n        tumblr: {\n          fa: ['fab', 'tumblr'],\n          name: 'Tumblr',\n          href: (url, description) => `http://www.tumblr.com/share/link?name=${description} ${url}&url=${url}`,\n          transform: 'shrink-9'\n        },\n        pinterest: {\n          fa: ['fab', 'pinterest-p'],\n          name: 'Pinterest',\n          href: (url, description) => `http://pinterest.com/pin/create/button/?url=${url}&description=${description} ${url}`,\n          transform: 'shrink-9'\n        },\n        email: {\n          fa: ['fas', 'envelope'],\n          name: 'E-mail',\n          href: (url, description) => `mailto:?subject=${description}&body=${description} ${url}`,\n          transform: 'shrink-9'\n        }\n      })\n    },\n    spacing: {\n      type: Number,\n      default: 6\n    },\n    shareToText: {\n      type: String,\n      default: 'Share to'\n    }\n  },\n  computed: {\n    href: () => encodeURIComponent(location.href.replace(/#\\w/, '')),\n    mobile: () => navigator.userAgent.match(/(mobile|android|pad)/i),\n    linkStyle() {\n      return {\n        margin: `auto ${Number(this.spacing) / 2}px`\n      }\n    }\n  },\n  methods: {\n    clickLink(e, href) {\n      if (!this.mobile) {\n        e.preventDefault()\n        window.open(href, '_blank', 'height=600,width=500')\n      }\n    }\n  }\n}\n</script>\n\n<style scoped>\na {\n  display: inline-block;\n  text-decoration: none;\n  -webkit-transition:\n    -webkit-transform .2s,\n    -ms-transform .2s,\n    transform .2s;\n  -moz-transition:\n    -webkit-transform .2s,\n    -ms-transform .2s,\n    transform .2s;\n  transition:\n    -webkit-transform .2s,\n    -ms-transform .2s,\n    transform .2s;\n}\na:hover {\n  -webkit-transform: translateY(-4px);\n  -ms-transform: translateY(-4px);\n  transform: translateY(-4px);\n}\n.icon-fb {\n  color: #3B5998;\n}\n.fa-line  {\n  color: #00c300;\n}\n.icon-plurk {\n  color: #cf682f;\n}\n.icon-plurk ~ .fa-layers-text {\n  color: #ffffff;\n  font-family: arial;\n  font-style: normal;\n  font-weight: bold;\n}\n.icon-weibo {\n  color: #F5CA59;\n}\n.icon-twitter {\n  color: #2ba9e1;\n}\n.icon-tumblr {\n  color: #35465d;\n}\n.icon-pinterest {\n  color: #EA1514;\n}\n.icon-email {\n  color: #939598;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-875ee68a";
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

export default __vue_component__;
export { install };
