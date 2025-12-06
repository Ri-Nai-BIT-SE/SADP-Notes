# 题目八：统一管理部分与整体（组合模式）

## 情景描述：企业组织结构与成本计算

某公司需要维护其组织结构，包括**员工 (Employee)** 和**部门 (Department)**。部门可以包含员工，也可以包含其他子部门，形成递归的树形结构。您需要设计一个系统，允许对任意一个部门（或单个员工）执行统一的 `calculateAnnualCost()` 操作。

您决定使用**组合模式 (Composite Pattern)** 来确保客户端代码可以**一致地**对待单个对象和对象的组合（即部门）。

**任务要求：**

1.  **UML 关系分析：** 在此情景中，`Department`（组合节点）和 `Employee`（叶子节点）都实现了共同的接口 `OrganizationComponent`（抽象组件）。请使用 UML 关系术语准确描述：

    *   `Department`（组合节点）与 `OrganizationComponent`（抽象组件）之间是何种关系？（继承和拥有）

    *   这种"部分包含整体"的关系体现了 UML 中的哪种拥有关系？

2.  **代码补全题：** 补全 `Department` 类中的 `calculateAnnualCost()` 方法，体现组合模式的核心：递归委托。

**【代码模板 8-2】请在注释处填写完整的 Java 代码**

```java
// 抽象组件接口 (Component)
public interface OrganizationComponent {
    double calculateAnnualCost(); // 计算年总成本
}

// 叶子节点 (Leaf) - 员工
public class Employee implements OrganizationComponent {
    private double salary = 50000.0;

    @Override
    public double calculateAnnualCost() {
        return salary;
    }
}

// 组合节点 (Composite) - 部门
public class Department implements OrganizationComponent {
    private String name;
    // 存储子节点（员工或子部门）
    private List<OrganizationComponent> children = new ArrayList<>(); 

    public Department(String name) {
        this.name = name;
    }

    public void add(OrganizationComponent component) {
        children.add(component);
    }
    
    // TODO 8-1: 实现 Department 的 calculateAnnualCost 方法
    // 核心逻辑：遍历所有子节点，将它们的成本累加起来
    @Override
    public double calculateAnnualCost() {
        double totalCost = 0;
        // TODO 8-2: 遍历 children 列表并累加它们的年成本
        // __________________________________;
        return totalCost;
    }
}
```

**参考答案：**

1. **UML 关系分析：**
   - **`Department` 与 `OrganizationComponent` 之间的关系**：
     - **实现关系 (Realization)**：`Department` 实现了 `OrganizationComponent` 接口，在 UML 中用**虚线 + 空心三角形箭头**表示，代码中对应 `implements` 关键字。
     - **组合关系 (Composition)**：`Department` 通过 `List<OrganizationComponent> children` 字段持有子组件的引用，体现了"部分包含整体"的关系。在 UML 中用**实线 + 实心菱形**表示（菱形在 `Department` 端），表示强拥有关系，子组件的生命周期与父部门紧密相关。
   - **这种"部分包含整体"的关系**：体现了 UML 中的**组合关系 (Composition)**，这是一种比普通关联更强的拥有关系，表示部分不能脱离整体而独立存在。

2. **代码补全答案：**
   ```java
   // TODO 8-2:
   for (OrganizationComponent component : children) {
       totalCost += component.calculateAnnualCost();
   }
   ```
   - **解释**：组合模式的核心是**递归委托**。`Department` 的 `calculateAnnualCost()` 方法遍历所有子节点（可能是 `Employee` 或子 `Department`），调用每个子节点的 `calculateAnnualCost()` 方法，并将结果累加。如果子节点是另一个 `Department`，它会递归地计算其子节点的成本，最终形成树形结构的递归计算。这体现了组合模式"统一对待单个对象和对象组合"的核心思想。

---

## 场景二：文件系统目录结构

**情景描述：**

你正在开发一个文件系统，需要表示文件和目录的层次结构。目录可以包含文件，也可以包含子目录，形成树形结构。你需要实现对文件和目录的统一操作，如 `getSize()`（获取大小）和 `display()`（显示）。

**任务要求：**

1. **画图题：** 请画出组合模式在文件系统中的 UML 类图，包含 `FileSystemComponent`（抽象组件）、`File`（叶子节点）、`Directory`（组合节点）以及它们之间的关系。

2. **代码补全题：** 实现文件系统的组合模式：

```java
// 抽象组件：文件系统组件
public abstract class FileSystemComponent {
    protected String name;
    
    public FileSystemComponent(String name) {
        this.name = name;
    }
    
    public abstract long getSize();
    public abstract void display(String indent);
    
    // 组合节点需要的方法（叶子节点可以抛出异常或空实现）
    public void add(FileSystemComponent component) {
        throw new UnsupportedOperationException();
    }
    
    public void remove(FileSystemComponent component) {
        throw new UnsupportedOperationException();
    }
}

// 叶子节点：文件
public class File extends FileSystemComponent {
    private long size;
    
    public File(String name, long size) {
        super(name);
        this.size = size;
    }
    
    @Override
    public long getSize() {
        return size;
    }
    
    @Override
    public void display(String indent) {
        System.out.println(indent + "文件: " + name + " (" + size + " 字节)");
    }
}

// 组合节点：目录
public class Directory extends FileSystemComponent {
    private List<FileSystemComponent> children = new ArrayList<>();
    
    public Directory(String name) {
        super(name);
    }
    
    @Override
    public void add(FileSystemComponent component) {
        children.add(component);
    }
    
    @Override
    public void remove(FileSystemComponent component) {
        children.remove(component);
    }
    
    @Override
    public long getSize() {
        long totalSize = 0;
        // ① 补全代码：递归计算所有子组件的大小
        // __________________________________;
        return totalSize;
    }
    
    @Override
    public void display(String indent) {
        System.out.println(indent + "目录: " + name);
        // ② 补全代码：递归显示所有子组件
        // __________________________________;
    }
}
```

**参考答案：**

```java
// ①
for (FileSystemComponent component : children) {
    totalSize += component.getSize();
}

// ②
for (FileSystemComponent component : children) {
    component.display(indent + "  ");
}
```

---

## 场景三：菜单系统（透明组合模式）

**情景描述：**

你正在开发一个餐厅菜单系统。菜单可以包含菜单项（MenuItem，叶子节点）和子菜单（Menu，组合节点）。你需要实现对菜单和菜单项的统一操作，如 `print()`（打印）和 `getPrice()`（获取价格）。

**任务要求：**

1. **简答题：** 请说明**透明组合模式**和**安全组合模式**的区别，并说明在此场景中应该使用哪种模式。

2. **代码补全题：** 实现菜单系统的透明组合模式：

```java
// 抽象组件：菜单组件（透明模式：所有方法都在抽象类中）
public abstract class MenuComponent {
    public void add(MenuComponent component) {
        throw new UnsupportedOperationException();
    }
    
    public void remove(MenuComponent component) {
        throw new UnsupportedOperationException();
    }
    
    public MenuComponent getChild(int index) {
        throw new UnsupportedOperationException();
    }
    
    public String getName() {
        throw new UnsupportedOperationException();
    }
    
    public double getPrice() {
        throw new UnsupportedOperationException();
    }
    
    public void print() {
        throw new UnsupportedOperationException();
    }
}

// 叶子节点：菜单项
public class MenuItem extends MenuComponent {
    private String name;
    private double price;
    
    public MenuItem(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    @Override
    public String getName() {
        return name;
    }
    
    @Override
    public double getPrice() {
        return price;
    }
    
    @Override
    public void print() {
        System.out.println("  " + name + ", ￥" + price);
    }
}

// 组合节点：菜单
public class Menu extends MenuComponent {
    private String name;
    private List<MenuComponent> children = new ArrayList<>();
    
    public Menu(String name) {
        this.name = name;
    }
    
    @Override
    public void add(MenuComponent component) {
        children.add(component);
    }
    
    @Override
    public void remove(MenuComponent component) {
        children.remove(component);
    }
    
    @Override
    public MenuComponent getChild(int index) {
        return children.get(index);
    }
    
    @Override
    public String getName() {
        return name;
    }
    
    @Override
    public double getPrice() {
        double totalPrice = 0;
        // ① 补全代码：递归计算所有子组件的价格
        // __________________________________;
        return totalPrice;
    }
    
    @Override
    public void print() {
        System.out.println(name);
        // ② 补全代码：递归打印所有子组件
        // __________________________________;
    }
}
```

**参考答案：**

1. **简答题答案：**
   - **透明组合模式**：在抽象组件中定义所有方法（包括 `add()`、`remove()` 等管理子组件的方法），叶子节点和组合节点都实现这些方法，但叶子节点在调用管理方法时抛出异常。客户端可以统一对待所有组件。
   - **安全组合模式**：只在组合节点中定义管理子组件的方法，叶子节点不实现这些方法。客户端需要判断组件类型。
   - **在此场景中**：应该使用**透明组合模式**，因为客户端需要统一调用 `print()` 和 `getPrice()` 方法，不需要区分是菜单还是菜单项。

2. **代码补全答案：**
   ```java
   // ①
   for (MenuComponent component : children) {
       totalPrice += component.getPrice();
   }
   
   // ②
   for (MenuComponent component : children) {
       component.print();
   }
   ```

