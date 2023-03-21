import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import babel from '@rollup/plugin-babel'
// import postCssPxToRem from 'postcss-pxtorem'
// import { createStyleImportPlugin } from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite'
import autoprefixer from 'autoprefixer'
import DSConfig, { hospHostReplace } from './scripts/build-config'
const guid = () => {
  return 'xxxx-4xxx-yxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 10) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// import eslintPlugin from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@pageI': resolve(__dirname, 'apps/GuideJdWebApp')
    }
  },
  plugins: [
    hospHostReplace(),
    react(),
    // createStyleImportPlugin({
    //   resolves: [AntdMobileResolve()],
    // }),
    AutoImport({
      // 自动导入 react 相关函数，
      imports: ['react', 'react-router-dom', 'ahooks'],
      dirs: ['apps/GuideJdWebApp/api'],
      eslintrc: {
        enabled: false, // 若没此json文件，先开启，生成后在关闭
        filepath: './.eslintrc-auto-import.json', // 设置eslintrc-auto-import.json生成路径 Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    babel({
      extensions: ['.tsx', '.ts'],
      babelHelpers: 'bundled',
      plugins: [
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        ['@babel/plugin-proposal-class-properties', { 'loose': true }]
      ]
    })
  ],
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName(name: string) {
        if (name.match(/-warpper$/)) {
          return name + `-${guid()}`
        } else {
          return name
        }
      }
    },
    postcss: {
      plugins: [
        // 袋鼠pc端
        ...DSConfig.css_result_plugin,
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            '> 1%'
          ],
          grid: true
        })
      ]
    }
  },
  build: {
    target: 'modules',
    // process.argv.includes('staging')
    sourcemap: process.env.NODE_ENV === 'development',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 1024,
    rollupOptions: {
      // 多页面入口
      input: {
        index: resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    open: true,
    proxy: {
      // eslint-disable-next-line no-useless-escape
      '^/api\/*': {
        target: 'http://10.0.200.46:4000',
        secure: true,
        ws: true,
        changeOrigin: true
      }
    }
  }
})
