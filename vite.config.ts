import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'
import svgLoader from 'vite-svg-loader'
import legacyPlugin from '@vitejs/plugin-legacy'

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    resolve: {
      alias: {
        '/@': resolve(__dirname, 'src'),
        '/cpns': resolve(__dirname, 'src/components'),
      },
      extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    build: {
      minify: false,
      target: 'esnext',
    },
    server: {
      proxy: {
        // 使用 proxy 实例
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      vue({
        // 默认开启响应性语法糖
        reactivityTransform: true,
      }),
      legacyPlugin({
        targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向IE11时需要此插件
      }),
      //开启gzip
      viteCompression(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // Auto import svg components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        // 自定引入 Vue VueRouter API,如果还需要其他的可以自行引入
        imports: ['vue', 'vue-router'],
        // 调整自动引入的文件位置
        dts: 'src/type/auto-import.d.ts',
        // 解决自动引入eslint报错问题 需要在eslintrc的extend选项中引入
        eslintrc: {
          enabled: true,
          // 配置文件的位置
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        resolvers: [
          ElementPlusResolver(), // Auto register svg components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
        dts: 'src/type/components.d.ts',
      }),
      Icons({
        autoInstall: true,
      }),
      // 配置mock
      viteMockServe({
        mockPath: '/mock',
        localEnabled: true,
      }),
      //svg解析器
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'cleanupIDs',
              params: {
                prefix: {
                  // 避免不同 svg 内部的 filter id 相同导致样式错乱
                  // https://github.com/svg/svgo/issues/674#issuecomment-328774019
                  toString() {
                    let count: number = this.count ?? 0
                    count++
                    this.count = count
                    return `svg-random-${count.toString(36)}-`
                  },
                } as string,
              },
            },
          ],
        },
      }),
    ],
    css: {},
  }
})
