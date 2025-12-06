# 题目十：跨平台图形用户界面组件族生成（抽象工厂模式）

## 一、情景描述

你正在开发一个名为 **Uni-UI** 的跨平台 GUI 框架。该框架的目标是允许应用程序在 Windows、macOS 和 Linux 等不同操作系统上运行，并且 **必须使用对应平台原生的界面风格和组件族**。

这意味着，如果用户选择了 **Windows 风格**，那么所有生成的组件（如按钮、文本框、菜单）都必须是 Windows 风格的；如果用户选择了 **macOS 风格**，则所有组件必须是 macOS 风格的。系统需要确保组件在整个产品族内的 **配套性和一致性**。

如果使用工厂方法模式，我们只能创建单一的产品（例如一个 Button），但现在我们需要创建 **一整套相关或依赖的对象家族**（即 Windows Component Family 或 macOS Component Family），并且在运行时根据配置动态切换整个产品族。为此，你决定采用 **抽象工厂模式**。

**核心产品族（Abstract Products）：**

1.  **Button** (按钮)
2.  **TextField** (文本输入框)

**具体产品族（Concrete Product Families）：**

*   **Windows Family**：WinButton, WinTextField
*   **MacOS Family**：MacButton, MacTextField

## 二、任务要求

请根据上述情景和抽象工厂模式的设计思想，完成以下任务：

1.  **画图题（UML 类图）：**

    请画出 **抽象工厂模式** 在此场景中的核心 **UML 类图**。图中必须包含以下角色，并使用正确的 UML 符号和关系表示：

    *   **Abstract Factory（抽象工厂）**：`UIFactory`
    *   至少两个 **Concrete Factory（具体工厂）**：`WinFactory` 和 `MacFactory`
    *   至少两个 **Abstract Product（抽象产品）**：`Button` 和 `TextField`
    *   至少两个 **Concrete Product（具体产品）**：`WinButton` 和 `MacButton`（只需画出其中一个具体产品族）。

2.  **代码补全题（核心代码实现）：**

    请以 Java/伪代码风格补全以下关键接口和类的定义，以体现抽象工厂模式的核心机制：

    *   定义 **抽象工厂** 接口 `UIFactory`，它必须包含创建所有抽象产品的方法。
    *   实现 **具体工厂** 类 `WinFactory`，展示其如何创建并返回 Windows 风格的产品族。

---

## 参考答案

### 1. UML 类图（抽象工厂模式）

您的类图应体现出两个平行的继承/实现层次结构：**工厂的层次结构** 和 **产品的层次结构**。

**关键关系表示：**

*   **实现/泛化**：`WinFactory` 实现了 `UIFactory` (虚线空心三角)；`WinButton` 继承/实现 `Button` (实线/虚线空心三角)。
*   **关联**：抽象工厂 `UIFactory` 引用了所有的抽象产品 (`Button`, `TextField`)。`Concrete Factory` 引用了其对应的 `Concrete Product`。

| 模式角色 | 对应类/接口 | 关系描述 |
| :--- | :--- | :--- |
| **Abstract Factory** | `<<interface>> UIFactory` | 定义创建 `Button` 和 `TextField` 的方法组。 |
| **Concrete Factory** | `WinFactory`, `MacFactory` | 实现 `UIFactory` 接口，生产对应的组件族。 |
| **Abstract Product** | `<<interface>> Button`, `<<interface>> TextField` | 定义产品族中的每个产品标准。 |
| **Concrete Product** | `WinButton`, `MacTextField` 等 | 实现抽象产品接口，提供具体风格的组件。 |

（在您手绘的图中，Client/Application 将只依赖于 `UIFactory` 和 `Button`/`TextField` 抽象接口，不与任何具体的 `WinFactory` 或 `MacButton` 产生连线。）

### 2. 代码补全题（核心代码实现）

#### A. 抽象产品（Abstract Products）

```java
// 抽象产品 A
public interface Button {
    void render();
}

// 抽象产品 B
public interface TextField {
    void input(String text);
}
```

#### B. 抽象工厂（Abstract Factory）

```java
/**
 * 抽象工厂：提供创建产品族（Button, TextField）的接口。
 * 注意：工厂方法中返回的必须是抽象产品类型。
 */
public interface UIFactory {
    
    // 1. 创建抽象产品 A
    Button createButton();
    
    // 2. 创建抽象产品 B
    TextField createTextField();
    
    // ... 如果有新的产品类型，应在此处增加方法
}
```

#### C. 具体产品（Concrete Products）

```java
// Windows 风格的具体产品 A
public class WinButton implements Button {
    @Override
    public void render() {
        System.out.println("渲染 Windows 风格的按钮。");
    }
}

// Windows 风格的具体产品 B
public class WinTextField implements TextField {
    @Override
    public void input(String text) {
        System.out.println("Windows 文本框输入: " + text);
    }
}
```

#### D. 具体工厂（Concrete Factory）

```java
/**
 * 具体工厂：负责创建 Windows 风格的产品族。
 * 它确保了所有创建的产品都是配套的（即 Win 家族）。
 */
public class WinFactory implements UIFactory {
    
    @Override
    public Button createButton() {
        // 返回 Windows 风格的具体产品
        return new WinButton();
    }
    
    @Override
    public TextField createTextField() {
        // 返回 Windows 风格的具体产品
        return new WinTextField();
    }
}
```

#### E. 客户端使用（Client / Application）

客户端代码只通过抽象工厂 `UIFactory` 来获取产品，它不需要知道自己使用的是 `WinFactory` 还是 `MacFactory`，从而实现了 **解耦**。

```java
public class Application {
    
    private UIFactory factory;
    
    // 客户端依赖于抽象工厂接口，不依赖于具体实现
    public Application(UIFactory factory) {
        this.factory = factory;
    }
    
    public void createUI() {
        // 使用抽象工厂创建产品族中的所有产品
        Button okButton = factory.createButton();
        TextField nameField = factory.createTextField();
        
        // 使用产品
        okButton.render();
        nameField.input("请输入用户名");
    }
}

// 客户端测试代码
public class Client {
    public static void main(String[] args) {
        
        // 场景一：使用 Windows 风格的产品族
        UIFactory winFactory = new WinFactory();
        Application winApp = new Application(winFactory);
        System.out.println("--- 运行 Windows 应用 ---");
        winApp.createUI(); // 自动生成 WinButton 和 WinTextField
        
        // 场景二：轻松切换整个产品族到 macOS 风格
        // (假设 MacFactory 已经实现)
        // UIFactory macFactory = new MacFactory();
        // Application macApp = new Application(macFactory);
        // System.out.println("\n--- 运行 macOS 应用 ---");
        // macApp.createUI(); // 自动生成 MacButton 和 MacTextField
    }
}
```

---

## 场景二：跨平台主题系统

**情景描述：**

你正在开发一个跨平台应用程序，需要支持不同的主题风格：`LightTheme`（浅色主题）和 `DarkTheme`（深色主题）。每个主题需要提供一套配套的 UI 组件，包括 `Button`（按钮）、`TextField`（文本框）、`Menu`（菜单）等。系统需要确保同一主题下的所有组件风格一致。

**任务要求：**

1. **画图题：** 请画出抽象工厂模式在主题系统中的 UML 类图，包含 `ThemeFactory`（抽象工厂）、`LightThemeFactory` 和 `DarkThemeFactory`（具体工厂），以及对应的产品层次结构。

2. **代码补全题：** 实现主题系统的抽象工厂模式：

```java
// 抽象产品：按钮
public interface Button {
    void render();
}

// 抽象产品：文本框
public interface TextField {
    void input(String text);
}

// 具体产品：浅色主题按钮
public class LightButton implements Button {
    @Override
    public void render() {
        System.out.println("渲染浅色主题按钮");
    }
}

// 具体产品：深色主题按钮
public class DarkButton implements Button {
    @Override
    public void render() {
        System.out.println("渲染深色主题按钮");
    }
}

// 具体产品：浅色主题文本框
public class LightTextField implements TextField {
    @Override
    public void input(String text) {
        System.out.println("浅色主题文本框输入: " + text);
    }
}

// 具体产品：深色主题文本框
public class DarkTextField implements TextField {
    @Override
    public void input(String text) {
        System.out.println("深色主题文本框输入: " + text);
    }
}

// 抽象工厂：主题工厂
public interface ThemeFactory {
    // ① 补全代码：创建按钮的方法
    // ________________ createButton();
    
    // ② 补全代码：创建文本框的方法
    // ________________ createTextField();
}

// 具体工厂：浅色主题工厂
public class LightThemeFactory implements ThemeFactory {
    @Override
    public Button createButton() {
        // ③ 补全代码：返回浅色主题按钮
        // return ________________;
    }
    
    @Override
    public TextField createTextField() {
        // ④ 补全代码：返回浅色主题文本框
        // return ________________;
    }
}

// 具体工厂：深色主题工厂
public class DarkThemeFactory implements ThemeFactory {
    @Override
    public Button createButton() {
        return new DarkButton();
    }
    
    @Override
    public TextField createTextField() {
        return new DarkTextField();
    }
}
```

**参考答案：**

```java
// ①
Button createButton();

// ②
TextField createTextField();

// ③
return new LightButton();

// ④
return new LightTextField();
```

---

## 场景三：数据库访问抽象工厂

**情景描述：**

你正在开发一个数据库访问框架，需要支持多种数据库类型（MySQL、Oracle、PostgreSQL）。每种数据库需要提供一套配套的组件，包括 `Connection`（连接）、`Statement`（语句）、`ResultSet`（结果集）等。系统需要确保同一数据库类型下的所有组件能够正确协同工作。

**任务要求：**

1. **简答题：** 抽象工厂模式如何保证"同一数据库类型下的所有组件能够正确协同工作"？请说明抽象工厂模式与工厂方法模式在此场景中的区别。

2. **代码补全题：** 实现数据库访问的抽象工厂模式：

```java
// 抽象产品：数据库连接
public interface DBConnection {
    void connect();
    void close();
}

// 抽象产品：数据库语句
public interface DBStatement {
    void execute(String sql);
}

// 具体产品：MySQL连接
public class MySQLConnection implements DBConnection {
    @Override
    public void connect() {
        System.out.println("连接到 MySQL 数据库");
    }
    
    @Override
    public void close() {
        System.out.println("关闭 MySQL 连接");
    }
}

// 具体产品：MySQL语句
public class MySQLStatement implements DBStatement {
    @Override
    public void execute(String sql) {
        System.out.println("MySQL 执行: " + sql);
    }
}

// 具体产品：Oracle连接
public class OracleConnection implements DBConnection {
    @Override
    public void connect() {
        System.out.println("连接到 Oracle 数据库");
    }
    
    @Override
    public void close() {
        System.out.println("关闭 Oracle 连接");
    }
}

// 具体产品：Oracle语句
public class OracleStatement implements DBStatement {
    @Override
    public void execute(String sql) {
        System.out.println("Oracle 执行: " + sql);
    }
}

// 抽象工厂：数据库工厂
public interface DatabaseFactory {
    DBConnection createConnection();
    DBStatement createStatement();
}

// 具体工厂：MySQL工厂
public class MySQLFactory implements DatabaseFactory {
    @Override
    public DBConnection createConnection() {
        // ① 补全代码：返回MySQL连接
        // return ________________;
    }
    
    @Override
    public DBStatement createStatement() {
        // ② 补全代码：返回MySQL语句
        // return ________________;
    }
}

// 具体工厂：Oracle工厂
public class OracleFactory implements DatabaseFactory {
    @Override
    public DBConnection createConnection() {
        return new OracleConnection();
    }
    
    @Override
    public DBStatement createStatement() {
        return new OracleStatement();
    }
}

// 客户端使用
public class DatabaseClient {
    private DatabaseFactory factory;
    
    public DatabaseClient(DatabaseFactory factory) {
        this.factory = factory;
    }
    
    public void executeQuery(String sql) {
        // ③ 补全代码：使用工厂创建连接和语句
        DBConnection conn = factory.________________;
        DBStatement stmt = factory.________________;
        
        conn.connect();
        stmt.execute(sql);
        conn.close();
    }
}
```

**参考答案：**

1. **简答题答案：**
   - **组件协同工作**：抽象工厂确保同一工厂创建的所有产品属于同一个产品族，它们设计时就是配套的，能够正确协同工作。例如，`MySQLFactory` 创建的 `MySQLConnection` 和 `MySQLStatement` 是配套的，不会出现 MySQL 连接与 Oracle 语句混用的情况。
   - **与工厂方法模式的区别**：
     - **工厂方法模式**：一个工厂只创建一种产品，关注的是单个产品的创建。
     - **抽象工厂模式**：一个工厂创建一套相关的产品族，关注的是产品族的创建和一致性保证。

2. **代码补全答案：**
   ```java
   // ①
   return new MySQLConnection();
   
   // ②
   return new MySQLStatement();
   
   // ③
   DBConnection conn = factory.createConnection();
   DBStatement stmt = factory.createStatement();
   ```

