import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  createSvgIconsPlugin
} from 'vite-plugin-svg-icons'
import {
  resolve
} from 'path'
import commonjs from '@rollup/plugin-commonjs'
import visualizer from 'rollup-plugin-visualizer'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    commonjs({
      requireReturnsDefault: true
    }),
    visualizer(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), 'src/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    dts()
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
    extensions: ['.js', '.vue', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },

  optimizeDeps: {
    include: [],
  },

  css: {
    preprocessorOptions: {
      scss: {
        /* 自动引入全局scss文件 */
        additionalData: '@import "./src/styles/index.scss";'
      }
    }
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'install.ts'),
      name: 'work-flow',
      fileName: (format) => `dist/index.${format}.js`
    },
    brotliSize: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        exports: 'named',
        format: 'umd',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
        assetFileNames: 'dist/index.css',
      }
    },
  },

})