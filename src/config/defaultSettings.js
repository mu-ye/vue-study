export default {
  navTheme: 'dark',
  primaryColor: '#1890FF',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: false
  },
  title: 'vue-demo',
  pwa: false,
  iconfontUrl: '',
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}
