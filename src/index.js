import CShare from './CShare.vue'

export function install(Vue) {
	if (install.installed) {
    return
  }

  install.installed = true

	Vue.component(CShare.name, CShare)
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  // eslint-disable-next-line no-undef
	GlobalVue = global.Vue
}

if (GlobalVue) {
	GlobalVue.use({
    install
  })
}

CShare.install = install

export default CShare
