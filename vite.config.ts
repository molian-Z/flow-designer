import {
  createSvgIconsPlugin
} from 'vite-plugin-svg-icons'
import {
  defineConfig
} from 'vite'
import {
  resolve
} from 'path'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), 'src/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
      '#': resolve(__dirname, 'src/types'),
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: id => {
          // 将 node_modules 中的代码单独打包成一个 JS 文件
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})