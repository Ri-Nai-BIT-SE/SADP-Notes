import fs from 'node:fs'
import path from 'node:path'

const DOCS_ROOT = path.join(process.cwd(), 'docs')
const OUTPUT_DIR = path.join(process.cwd(), 'output/flattened-md')

// 排除的目录
const EXCLUDED_DIRS = new Set(['.git', '.github', '.vitepress', 'node_modules', 'public', 'images', 'docker_support'])

/**
 * 检查是否为目录
 */
function isDirectory(p) {
  return fs.existsSync(p) && fs.statSync(p).isDirectory()
}

/**
 * 检查是否为 Markdown 文件
 */
function isMarkdown(p) {
  return fs.existsSync(p) && fs.statSync(p).isFile() && path.extname(p).toLowerCase() === '.md'
}

/**
 * 递归查找所有 Markdown 文件
 */
function findAllMarkdownFiles(dir, relativePath = '', files = []) {
  const entries = fs.readdirSync(dir)
  
  for (const entry of entries) {
    const entryPath = path.join(dir, entry)
    const lowerEntry = entry.toLowerCase()
    
    // 跳过排除的目录
    if (isDirectory(entryPath) && EXCLUDED_DIRS.has(entry)) {
      continue
    }
    
    // 跳过隐藏文件/目录
    if (entry.startsWith('.')) {
      continue
    }
    
    if (isDirectory(entryPath)) {
      // 递归处理子目录
      const newRelativePath = relativePath ? `${relativePath}-${entry}` : entry
      findAllMarkdownFiles(entryPath, newRelativePath, files)
    } else if (isMarkdown(entryPath)) {
      // 收集 Markdown 文件
      // 如果 relativePath 存在，则组合路径和文件名；否则直接使用文件名
      const fileName = relativePath ? `${relativePath}-${entry}` : entry
      files.push({
        sourcePath: entryPath,
        relativePath: fileName,
        originalName: entry
      })
    }
  }
  
  return files
}

/**
 * 生成扁平化的文件名
 */
function generateFlatFileName(fileInfo) {
  // relativePath 已经包含了完整的路径信息（章节-子章节-文件名）
  // 直接使用 relativePath 作为文件名
  return fileInfo.relativePath
}

/**
 * 确保输出目录存在
 */
function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    console.log(`[flatten-md] 创建输出目录: ${OUTPUT_DIR}`)
  }
}

/**
 * 主函数
 */
function main() {
  console.log('[flatten-md] 开始收集 Markdown 文件...')
  
  // 确保输出目录存在
  ensureOutputDir()
  
  // 查找所有 Markdown 文件
  const files = findAllMarkdownFiles(DOCS_ROOT)
  
  console.log(`[flatten-md] 找到 ${files.length} 个 Markdown 文件`)
  
  let copied = 0
  let skipped = 0
  const nameMap = new Map() // 用于处理重名文件
  
  for (const fileInfo of files) {
    const flatFileName = generateFlatFileName(fileInfo)
    
    // 处理重名文件
    let finalFileName = flatFileName
    if (nameMap.has(flatFileName)) {
      // 如果文件名已存在，添加序号
      const count = nameMap.get(flatFileName)
      nameMap.set(flatFileName, count + 1)
      const ext = path.extname(flatFileName)
      const nameWithoutExt = path.basename(flatFileName, ext)
      finalFileName = `${nameWithoutExt}_${count}${ext}`
    } else {
      nameMap.set(flatFileName, 1)
    }
    
    const destPath = path.join(OUTPUT_DIR, finalFileName)
    
    try {
      // 复制文件
      fs.copyFileSync(fileInfo.sourcePath, destPath)
      console.log(`[flatten-md] ✓ ${finalFileName}`)
      copied++
    } catch (error) {
      console.error(`[flatten-md] ✗ 复制失败: ${fileInfo.sourcePath} -> ${destPath}`)
      console.error(`[flatten-md]   错误: ${error.message}`)
      skipped++
    }
  }
  
  console.log(`[flatten-md] 完成！`)
  console.log(`[flatten-md] 成功复制: ${copied} 个文件`)
  if (skipped > 0) {
    console.log(`[flatten-md] 跳过: ${skipped} 个文件`)
  }
  console.log(`[flatten-md] 输出目录: ${OUTPUT_DIR}`)
}

main()

