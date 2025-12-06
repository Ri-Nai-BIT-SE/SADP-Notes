# 题目五：创建对象的封装与分化（工厂方法模式与 UML）

## 情景描述

您的 Pizza 店需要保持统一的订单流程（`orderPizza`），但允许纽约店（NYPizzaStore）和芝加哥店（ChicagoPizzaStore）各自生产本地风味的 Pizza。您决定使用**工厂方法模式**实现**创建**职责的推迟。

## 任务要求

1.  **UML 关系分析：** 在**工厂方法模式**中，`NYPizzaStore`（具体创建者）和 `PizzaStore`（抽象创建者）之间是哪种 UML 关系？这种关系在代码中对应哪个关键字？

2.  **模式对比：** **抽象工厂模式**（用于 Pizza **原料族**）和**工厂方法模式**（用于创建 **Pizza 产品**）的主要区别在于，前者创建的是 **\_\_\_\_\_\_\_\_**，而后者创建的是 **\_\_\_\_\_\_\_\_**。

**参考答案：**

1. **UML 关系分析：**
   - `NYPizzaStore` 和 `PizzaStore` 之间是**继承关系**（泛化关系，Generalization）。
   - 在 UML 类图中用**实线空心三角形箭头**表示（箭头指向父类）。
   - 在代码中对应 `extends` 关键字（Java 中）或 `:` 关键字（C++ 中）。

2. **模式对比：**
   - **抽象工厂模式**创建的是**产品族**（Product Family），例如一套配套的 Pizza 原料（面团、酱料、芝士等）。
   - **工厂方法模式**创建的是**产品**（Product），例如一个具体的 Pizza 对象。

---

## 场景二：文档编辑器工厂

**情景描述：**

你正在开发一个文档编辑器，需要支持创建不同类型的文档，如 `WordDocument`（Word文档）、`PDFDocument`（PDF文档）、`ExcelDocument`（Excel文档）等。不同的编辑器（如 `WordEditor`、`PDFEditor`）需要创建对应类型的文档。

你决定使用**工厂方法模式**，让每个编辑器负责创建自己类型的文档。

**任务要求：**

1. **画图题：** 请画出工厂方法模式在文档编辑器场景中的 UML 类图，包含 `DocumentEditor`（抽象创建者）、`Document`（抽象产品）以及至少两个具体创建者和具体产品。

2. **代码补全题：** 补全工厂方法模式的核心实现：

```java
// 抽象产品：文档
public abstract class Document {
    public abstract void open();
    public abstract void save();
}

// 具体产品：Word文档
public class WordDocument extends Document {
    @Override
    public void open() {
        System.out.println("打开 Word 文档");
    }
    
    @Override
    public void save() {
        System.out.println("保存 Word 文档");
    }
}

// 具体产品：PDF文档
public class PDFDocument extends Document {
    @Override
    public void open() {
        System.out.println("打开 PDF 文档");
    }
    
    @Override
    public void save() {
        System.out.println("保存 PDF 文档");
    }
}

// 抽象创建者：文档编辑器
public abstract class DocumentEditor {
    // 工厂方法：创建文档
    public abstract Document createDocument();
    
    // 模板方法：使用文档
    public void newDocument() {
        // ① 补全代码：调用工厂方法创建文档
        Document doc = ________________;
        doc.open();
    }
}

// 具体创建者：Word编辑器
public class WordEditor extends DocumentEditor {
    // ② 补全代码：实现工厂方法，返回Word文档
    @Override
    public Document createDocument() {
        // __________________________________;
    }
}

// 具体创建者：PDF编辑器
public class PDFEditor extends DocumentEditor {
    @Override
    public Document createDocument() {
        return new PDFDocument();
    }
}
```

**参考答案：**

```java
// ①
Document doc = createDocument();

// ②
return new WordDocument();
```

---

## 场景三：数据库连接工厂

**情景描述：**

你正在开发一个数据库访问框架，需要支持多种数据库类型，如 MySQL、Oracle、PostgreSQL。不同的数据库需要创建不同类型的连接对象，但连接的使用流程是相同的。

**任务要求：**

1. **简答题：** 工厂方法模式如何帮助实现"数据库类型可扩展"这个需求？请说明工厂方法模式与简单工厂模式的区别。

2. **代码补全题：** 实现数据库连接的工厂方法模式：

```java
// 抽象产品：数据库连接
public abstract class DatabaseConnection {
    public abstract void connect();
    public abstract void executeQuery(String sql);
    public abstract void close();
}

// 具体产品：MySQL连接
public class MySQLConnection extends DatabaseConnection {
    @Override
    public void connect() {
        System.out.println("连接到 MySQL 数据库");
    }
    
    @Override
    public void executeQuery(String sql) {
        System.out.println("MySQL 执行查询: " + sql);
    }
    
    @Override
    public void close() {
        System.out.println("关闭 MySQL 连接");
    }
}

// 具体产品：Oracle连接
public class OracleConnection extends DatabaseConnection {
    @Override
    public void connect() {
        System.out.println("连接到 Oracle 数据库");
    }
    
    @Override
    public void executeQuery(String sql) {
        System.out.println("Oracle 执行查询: " + sql);
    }
    
    @Override
    public void close() {
        System.out.println("关闭 Oracle 连接");
    }
}

// 抽象创建者：数据库工厂
public abstract class DatabaseFactory {
    // 工厂方法
    public abstract DatabaseConnection createConnection();
    
    // 模板方法
    public void execute(String sql) {
        // ① 补全代码：创建连接并执行查询
        DatabaseConnection conn = ________________;
        conn.connect();
        conn.executeQuery(sql);
        conn.close();
    }
}

// 具体创建者：MySQL工厂
public class MySQLFactory extends DatabaseFactory {
    // ② 补全代码：实现工厂方法
    @Override
    public DatabaseConnection createConnection() {
        // __________________________________;
    }
}
```

**参考答案：**

1. **简答题答案：**
   - **可扩展性**：添加新的数据库类型（如 PostgreSQL）只需创建新的具体工厂和具体产品类，无需修改现有代码，符合开闭原则。
   - **与简单工厂的区别**：
     - **简单工厂**：一个工厂类负责创建所有产品，使用 `if-else` 或 `switch` 判断类型，违反开闭原则。
     - **工厂方法**：每个具体工厂只负责创建一种产品，通过继承和多态实现，符合开闭原则。

2. **代码补全答案：**
   ```java
   // ①
   DatabaseConnection conn = createConnection();
   
   // ②
   return new MySQLConnection();
   ```

