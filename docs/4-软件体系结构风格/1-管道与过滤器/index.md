## 管道与过滤器 (Pipe and Filter)

- **过滤器 (Filter)**：处理数据的组件，有输入和输出
- **管道 (Pipe)**：连接过滤器，传递数据流

**特点**：过滤器独立、可复用、可并行

**示例**：Unix 命令 `cat file.txt | grep "error" | sort | uniq`

