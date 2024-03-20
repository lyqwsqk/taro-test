// @ts-ignore
const components =[
  'components/picker/index',
]

export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  components: components,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
