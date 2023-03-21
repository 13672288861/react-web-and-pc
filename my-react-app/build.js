import { build } from 'vite'
import path from 'path'
// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url));
(async() => {
  await build({
    configFile: path.resolve(__dirname, './vite.config.ts')
  })
})()
