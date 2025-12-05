## 面向对象组织 (Object-Oriented Organization)

- **对象 (Object)**：封装数据和操作数据的函数
- **类 (Class)**：定义对象的模板
- **封装 (Encapsulation)**：对象包含数据及对数据的操作

**核心特点**：
- **封装**：数据和方法封装在对象内部
- **信息隐藏**：对象内部实现对外部不可见
- **消息传递**：对象之间通过消息（方法调用）进行交互

### 核心概念

#### 1. 封装 (Encapsulation)

封装是面向对象的基础，将数据和对数据的操作封装在一起：

```
┌─────────────────────┐
│      对象            │
│  ┌───────────────┐   │
│  │   数据        │   │
│  │  (私有)       │   │
│  └───────────────┘   │
│  ┌───────────────┐   │
│  │   方法        │   │
│  │  (公开接口)   │   │
│  └───────────────┘   │
└─────────────────────┘
```

**优势**：
- 数据保护：外部不能直接访问内部数据
- 接口稳定：可以修改内部实现而不影响外部调用
- 模块化：每个对象是独立的模块

#### 2. 抽象数据类型 (ADT - Abstract Data Type)

面向对象组织强调使用抽象数据类型：

- **ADT**：定义了数据类型和可执行的操作，隐藏了实现细节
- **接口**：定义了对象可以做什么，而不是如何做

**示例**：栈 (Stack) ADT

```java
// 栈的接口定义（ADT）
public interface Stack<T> {
    void push(T item);    // 入栈
    T pop();              // 出栈
    T peek();             // 查看栈顶
    boolean isEmpty();    // 是否为空
    int size();           // 大小
}

// 具体实现（隐藏实现细节）
public class ArrayStack<T> implements Stack<T> {
    private T[] items;      // 内部数据（私有）
    private int top;        // 栈顶指针（私有）
    
    public ArrayStack(int capacity) {
        items = (T[]) new Object[capacity];
        top = -1;
    }
    
    public void push(T item) {
        if (top >= items.length - 1) {
            throw new StackOverflowException();
        }
        items[++top] = item;
    }
    
    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return items[top--];
    }
    
    // ... 其他方法
}
```

### 架构示例

#### 对象交互图

```
┌──────────────┐        消息调用        ┌──────────────┐
│   Manager    │ ◄───────────────────── │  Proc Call   │
│   (对象)     │                        │   (对象)     │
└──────────────┘                        └──────────────┘
       │                                        │
       │ 管理                                  │ 处理
       ↓                                        ↓
┌──────────────┐                        ┌──────────────┐
│   Object 1   │                        │   Object 2   │
└──────────────┘                        └──────────────┘
```

**说明**：
- **Manager 对象**：管理其他对象，协调系统行为
- **Proc Call 对象**：处理过程调用
- **对象间交互**：通过消息传递（方法调用）进行通信

#### 代码示例：对象组织

```java
// 管理器对象
public class ProcessManager {
    private List<Process> processes;
    
    public ProcessManager() {
        processes = new ArrayList<>();
    }
    
    // 创建新进程
    public Process createProcess(String name) {
        Process proc = new Process(name);
        processes.add(proc);
        return proc;
    }
    
    // 管理进程
    public void manageProcesses() {
        for (Process proc : processes) {
            proc.execute(); // 向进程对象发送消息
        }
    }
}

// 进程对象
public class Process {
    private String name;
    private ProcessState state;
    
    public Process(String name) {
        this.name = name;
        this.state = ProcessState.READY;
    }
    
    // 执行进程（封装了进程的执行逻辑）
    public void execute() {
        state = ProcessState.RUNNING;
        // 执行进程逻辑
        state = ProcessState.COMPLETED;
    }
    
    public ProcessState getState() {
        return state; // 通过方法访问状态（封装）
    }
}

// 进程调用对象
public class ProcessCall {
    private ProcessManager manager;
    
    public ProcessCall(ProcessManager manager) {
        this.manager = manager;
    }
    
    // 处理进程调用请求
    public void handleCall(String processName) {
        Process proc = manager.createProcess(processName);
        proc.execute(); // 对象间消息传递
    }
}
```

### 面向对象组织的优势

1. **模块化**：每个对象是独立的模块，易于理解和维护
2. **可复用性**：类可以实例化为多个对象，代码可复用
3. **可扩展性**：通过继承和多态扩展功能
4. **信息隐藏**：内部实现细节被隐藏，接口稳定
5. **自然建模**：对象可以直观地表示现实世界中的实体

### 面向对象组织的挑战

1. **性能开销**：对象创建和方法调用可能带来性能开销
2. **设计复杂性**：需要合理设计类和对象关系
3. **过度设计**：可能为了面向对象而过度设计
4. **理解成本**：需要理解继承、多态等概念

### 与其他架构风格的关系

- **与分层架构**：面向对象可以在各层中使用，每层由对象组成
- **与客户-服务器**：客户端和服务器都可以用面向对象方式组织
- **与事件系统**：对象可以作为事件源或事件处理器

### 设计原则

面向对象组织遵循以下设计原则：

1. **单一职责原则**：每个类应该只有一个改变的理由
2. **开闭原则**：对扩展开放，对修改关闭
3. **里氏替换原则**：子类应该可以替换父类
4. **接口隔离原则**：客户端不应该依赖它不需要的接口
5. **依赖倒置原则**：依赖抽象而不是具体实现

这些原则在[设计模式](../1-创造型模式/index.md)中有具体体现和应用。

