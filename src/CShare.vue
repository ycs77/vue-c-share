<template>
  <div>
    <a
      v-for="btnId in showButtons"
      :key="btnId"
      :href="buttons[btnId].href.call(null, href, description)"
      :title="`${shareToText} ${buttons[btnId].name}`"
      target="_blank"
      :style="linkStyle"
      @click="clickLink($event, buttons[btnId].href.call(null, href, description))"
    >
      <fa-layers class="fa-2x">
        <fa icon="circle" :class="`icon-${btnId}`" v-if="!buttons[btnId].hideWrapper"></fa>
        <fa-layers-text
          v-if="buttons[btnId].text"
          :transform="buttons[btnId].transform"
          :value="buttons[btnId].text"
        ></fa-layers-text>
        <fa
          v-else
          :icon="buttons[btnId].fa"
          :transform="buttons[btnId].transform"
          :inverse="!buttons[btnId].hideWrapper"
        ></fa>
      </fa-layers>
    </a>
  </div>
</template>

<script>
import {
  FontAwesomeIcon as fa,
  FontAwesomeLayers as faLayers,
  FontAwesomeLayersText as faLayersText
} from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faLine,
  faWeibo,
  faTwitter,
  faTumblr
} from '@fortawesome/free-brands-svg-icons'

library.add(faCircle)
library.add(faEnvelope)
library.add(faFacebookF)
library.add(faLine)
library.add(faWeibo)
library.add(faTwitter)
library.add(faTumblr)

export default {
  name: 'CShare',
  components: {
    fa,
    faLayers,
    faLayersText
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
      }
    }
  },
  methods: {
    clickLink(e, href) {
      if (!this.mobile) {
        e.preventDefault()
        window.open(href, '_blank', 'noopener,width=500,height=600')
      }
    }
  }
}
</script>

<style scoped>
a {
  display: inline-block;
  text-decoration: none;
  -webkit-transition:
    -webkit-transform .2s,
    -ms-transform .2s,
    transform .2s;
  -moz-transition:
    -webkit-transform .2s,
    -ms-transform .2s,
    transform .2s;
  transition:
    -webkit-transform .2s,
    -ms-transform .2s,
    transform .2s;
}
a:hover {
  -webkit-transform: translateY(-4px);
  -ms-transform: translateY(-4px);
  transform: translateY(-4px);
}
.icon-fb {
  color: #3B5998;
}
.fa-line  {
  color: #00c300;
}
.icon-plurk {
  color: #cf682f;
}
.icon-plurk ~ .fa-layers-text {
  color: #ffffff;
  font-family: arial;
  font-style: normal;
  font-weight: bold;
}
.icon-weibo {
  color: #F5CA59;
}
.icon-twitter {
  color: #2ba9e1;
}
.icon-tumblr {
  color: #35465d;
}
.icon-email {
  color: #939598;
}
</style>
