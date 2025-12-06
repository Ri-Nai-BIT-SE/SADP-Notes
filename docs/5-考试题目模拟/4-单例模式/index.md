# 题目四：独一无二的资源与并发控制（单例模式）

## 情景描述

您的系统需要一个唯一的**数据库连接池管理器 (ConnectionPoolManager)** 实例，以统一管理数据库连接资源，避免多线程环境下创建多个连接池导致资源浪费和连接冲突。您决定使用**双重检查加锁 (Double-Checked Locking, DCL)** 机制来实现线程安全的懒汉式单例。

## 任务要求

1.  **简答题：** 单例模式在多线程环境中的**"懒汉式"**实现存在什么**核心问题**？课件中推荐的**高效且线程安全**的解决方案是**双重检查加锁**。

2.  **代码补全题：** 请补全 `ConnectionPoolManager` 类的核心结构，以实现 DCL 机制。

**【代码模板】请在注释处填写完整的 Java 代码**

```java
public class ConnectionPoolManager {
    private int maxConnections;
    private int currentConnections;

    // TODO 4-1: 请使用正确的关键字声明静态实例变量，防止指令重排
    // 提示：应使用 private、static 关键字，以及防止指令重排的关键字
    // __________________________________;
    
    // 私有构造函数，防止外部实例化
    private ConnectionPoolManager() {
        this.maxConnections = 10;
        this.currentConnections = 0;
    }
    
    // TODO 4-2: 补全获取实例的方法，实现双重检查加锁
    public static ConnectionPoolManager getInstance() {
        // 第一次检查
        if (uniqueInstance == null) { 
            // 进入同步代码块
            synchronized (ConnectionPoolManager.class) {
                // 第二次检查
                if (uniqueInstance == null) {
                    // 创建实例
                    uniqueInstance = new ConnectionPoolManager();
                }
            }
        }
        return uniqueInstance;
    }
    
    // 获取数据库连接（业务方法示例）
    public void getConnection() {
        if (currentConnections < maxConnections) {
            currentConnections++;
            System.out.println("获取连接，当前连接数：" + currentConnections);
        } else {
            System.out.println("连接池已满，无法获取新连接");
        }
    }
    
    // 释放数据库连接（业务方法示例）
    public void releaseConnection() {
        if (currentConnections > 0) {
            currentConnections--;
            System.out.println("释放连接，当前连接数：" + currentConnections);
        }
    }
}
```

**参考答案：**

1. **简答题答案：**
   - **核心问题**：懒汉式在多线程环境中存在**竞态条件（race condition）**问题。多个线程可能同时通过 `if (uniqueInstance == null)` 检查，导致创建多个实例，破坏了单例的唯一性。
   - **解决方案**：使用**双重检查加锁 (Double-Checked Locking, DCL)** 机制，结合 `volatile` 关键字防止指令重排，既实现了延迟加载（懒汉），又保证了线程安全，且性能较高。

2. **代码补全答案：**
   ```java
   // TODO 4-1: 
   private volatile static ConnectionPoolManager uniqueInstance;
   ```
   - **解释**：`volatile` 关键字确保当 `uniqueInstance` 变量被初始化成 `ConnectionPoolManager` 实例时，多个线程能正确处理该变量，防止指令重排导致的线程安全问题。

---

## 场景二：系统配置管理器

**情景描述：**

你的应用程序需要一个全局的配置管理器（`ConfigManager`），用于读取和管理系统配置信息。整个应用程序中只能有一个配置管理器实例，且需要在多线程环境下安全地访问。

你决定使用**饿汉式单例模式**来实现，因为配置信息在应用启动时就需要加载。

**任务要求：**

1. **简答题：** 请比较**饿汉式单例**和**懒汉式单例**的优缺点，并说明在什么场景下应该使用饿汉式。

2. **代码补全题：** 实现饿汉式单例模式的 `ConfigManager` 类：

```java
public class ConfigManager {
    private String configPath;
    private Map<String, String> configs;
    
    // TODO 2-1: 声明静态实例变量，使用饿汉式（在类加载时创建）
    // __________________________________;
    
    // 私有构造函数
    private ConfigManager() {
        this.configPath = "config.properties";
        this.configs = new HashMap<>();
        loadConfig();
    }
    
    // TODO 2-2: 实现获取实例的方法（饿汉式无需同步）
    public static ConfigManager getInstance() {
        // __________________________________;
    }
    
    private void loadConfig() {
        System.out.println("加载配置文件: " + configPath);
        // 实际加载逻辑省略
    }
    
    public String getConfig(String key) {
        return configs.get(key);
    }
}
```

**参考答案：**

1. **简答题答案：**
   - **饿汉式优点**：实现简单，线程安全（由类加载机制保证），无需同步，性能好。
   - **饿汉式缺点**：即使不使用也会创建实例，占用内存；如果初始化耗时，会延长应用启动时间。
   - **懒汉式优点**：延迟加载，节省内存；只有在需要时才创建实例。
   - **懒汉式缺点**：需要同步机制保证线程安全，实现复杂（如DCL）。
   - **使用场景**：饿汉式适用于实例创建开销小、应用启动时就需要使用的场景（如配置管理器、日志管理器）。

2. **代码补全答案：**
   ```java
   // TODO 2-1:
   private static final ConfigManager instance = new ConfigManager();
   
   // TODO 2-2:
   return instance;
   ```

---

## 场景三：日志管理器（枚举单例）

**情景描述：**

你需要实现一个线程安全的日志管理器（`LoggerManager`），用于记录应用程序的日志。你了解到 Java 中可以使用**枚举（Enum）**来实现单例模式，这是最简洁且线程安全的方式。

**任务要求：**

1. **简答题：** 为什么使用枚举实现单例模式是"最安全"的方式？请说明枚举单例相比 DCL 的优势。

2. **代码补全题：** 使用枚举实现单例模式的日志管理器：

```java
// TODO 3-1: 使用枚举实现单例
public enum LoggerManager {
    // ① 补全代码：声明枚举实例
    // ________________;
    
    private String logFile;
    
    // 枚举构造函数（自动私有）
    LoggerManager() {
        this.logFile = "application.log";
        initializeLogger();
    }
    
    private void initializeLogger() {
        System.out.println("初始化日志管理器: " + logFile);
    }
    
    // 业务方法
    public void log(String message) {
        System.out.println("[" + logFile + "] " + message);
    }
}

// 客户端使用
public class LoggerTest {
    public static void main(String[] args) {
        // ② 补全代码：获取单例实例
        // LoggerManager logger = ________________;
        logger.log("应用程序启动");
    }
}
```

**参考答案：**

1. **简答题答案：**
   - **线程安全**：枚举的实例创建由 JVM 保证线程安全，且只会创建一次。
   - **防止反射攻击**：枚举类型不允许通过反射创建实例，而普通单例可能被反射破坏。
   - **防止序列化问题**：枚举的序列化机制保证反序列化时不会创建新实例。
   - **代码简洁**：无需编写复杂的同步代码，实现简单。
   - **相比 DCL 的优势**：DCL 需要 `volatile` 关键字和双重检查，代码复杂；枚举单例天然线程安全，无需额外同步。

2. **代码补全答案：**
   ```java
   // ①
   INSTANCE;
   
   // ②
   LoggerManager logger = LoggerManager.INSTANCE;
   ```

