# 管道与过滤器 (Pipe and Filter)

## 概述

- **过滤器 (Filter)**：处理数据的组件，有输入和输出
- **管道 (Pipe)**：连接过滤器，传递数据流

**特点**：过滤器独立、可复用、可并行

## 核心概念

- **过滤器**：每个过滤器独立处理数据，不知道上下游是谁
- **管道**：连接过滤器，传递数据流（可以是字节流、字符流等）
- **数据驱动**：数据从管道流入，经过过滤器处理，再流入下一个管道

## 典型示例

### 1. Unix 命令行

```bash
cat file.txt | grep "error" | sort | uniq
```

这个命令展示了典型的管道与过滤器模式：
- `cat`：读取文件（过滤器）
- `grep`：过滤包含 "error" 的行（过滤器）
- `sort`：排序（过滤器）
- `uniq`：去重（过滤器）
- `|`：管道，连接各个过滤器

### 2. 编译器 (Compiler)

编译器是管道与过滤器模式的经典应用：

**数据流**：
```
程序文本 (Program text)
    ↓
扫描器 (Scanner) - 词法分析
    ↓
解析器 (Parser) - 语法分析
    ↓
语义检查器 (Semantic checker) - 语义分析
    ↓
字节码生成器 (Bytecode generator) - 代码生成
    ↓
程序 (Program)
```

**各阶段说明**：

1. **扫描器 (Scanner/词法分析器)**
   - 输入：源代码文本
   - 输出：词法单元（Token）流
   - 功能：识别关键字、标识符、运算符等

2. **解析器 (Parser/语法分析器)**
   - 输入：Token 流
   - 输出：抽象语法树（AST）
   - 功能：检查语法正确性，构建语法树

3. **语义检查器 (Semantic Checker)**
   - 输入：AST
   - 输出：带类型信息的 AST
   - 功能：类型检查、作用域分析等

4. **代码生成器 (Code Generator)**
   - 输入：带类型信息的 AST
   - 输出：目标代码（字节码、机器码等）
   - 功能：生成可执行代码

**代码示例**（简化版）：

```java
// 过滤器接口
public interface Filter {
    void process(InputStream input, OutputStream output);
}

// 扫描器过滤器
public class ScannerFilter implements Filter {
    public void process(InputStream input, OutputStream output) {
        // 从 input 读取源代码，进行词法分析
        // 将 Token 写入 output
    }
}

// 解析器过滤器
public class ParserFilter implements Filter {
    public void process(InputStream input, OutputStream output) {
        // 从 input 读取 Token 流，进行语法分析
        // 将 AST 写入 output
    }
}

// 管道连接示例
public class Compiler {
    public void compile(String sourceCode) {
        // 创建管道和过滤器
        ScannerFilter scanner = new ScannerFilter();
        ParserFilter parser = new ParserFilter();
        SemanticCheckerFilter checker = new SemanticCheckerFilter();
        CodeGeneratorFilter generator = new CodeGeneratorFilter();
        
        // 通过管道连接（简化表示）
        // sourceCode → scanner → parser → checker → generator → bytecode
    }
}
```

**管道与过滤器的优势**：

1. **模块化**：每个阶段独立，易于维护和测试
2. **可复用**：过滤器可以在不同编译器间复用
3. **可并行**：多个过滤器可以并行处理不同数据
4. **灵活性**：可以轻松添加新的处理阶段（如优化器）

## 与其他模式的区别

- **批处理序列**：批处理是整体传递数据，管道是流式传递
- **主程序-子程序**：管道过滤器是数据驱动，主程序-子程序是控制流驱动



