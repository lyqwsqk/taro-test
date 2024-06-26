const path = require('path')

const config = {
  projectName: 'blended-taro-component-vue3',
  date: '2022-9-2',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    path.join(process.cwd(), '/plugin-mv/index.js'),
    '@tarojs/plugin-html'
  ],
  sass: {
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  },
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false
    }
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  alias: {
    '@/stores':
      process.env.NODE_ENV === 'production'
      ? // 生产环境路径计算：
        // Webpack 编译发生在 taro-project 下，假设编译后的 taro-project/dist 会被移到到 miniapp/taro。
        // path.resolve(__dirname, '..') 为 taro-project。taro-project/dist 之于 taro-project，相当于 miniapp/taro 之于 miniapp。
        // 再根据 miniapp/utils 与 miniapp 的相对路径，得出 path.resolve(__dirname, '../utils')
        path.resolve(__dirname, '../stores')
      : // 开发环境直接引用原生项目下的依赖，方便开发
        path.resolve(__dirname, '../../h5/src/stores'),
  },
  h5: {
    webpackChain(chain) {
      chain.merge({
        externals: [
          (context, request, callback) => {
            const externalDirs = ['@/stores']
            const externalDir = externalDirs.find((dir) => request.startsWith(dir))

            if (process.env.NODE_ENV === 'production' && externalDir) {
              const externalDirPath = config.alias[externalDir]
              const res = request.replace('@/stores', path.relative(context, externalDirPath))

              return callback(null, `commonjs ${res}`)
            }

            callback()
          },
        ],
        output: {
          libraryTarget: 'umd',
          library: 'NativeComponent',
          chunkLoadingGlobal: 'NativeComponentJsonp',
        },
      })
    },
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
