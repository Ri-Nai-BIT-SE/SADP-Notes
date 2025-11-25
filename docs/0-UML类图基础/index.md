# UML 类图关系详解

UML（统一建模语言）类图是设计模式通用的"世界语"。要看懂标准类图，核心就在于辨识**箭头的形状**和**线条的虚实**。

这直接决定了代码中类与类是**继承**、**实现**、**持有（字段）**还是**临时使用（局部变量）**的关系。

以下是 6 种最常见的 UML 关系，按照**耦合度从强到弱**排序：

---

## 1. 泛化 (Generalization) —— "继承"

这是最强的关系，表示"它就是它"。

### 核心特征

*   **含义：** 继承关系 (Is-a)
*   **图形：** **实线** + **空心三角形**箭头
*   **代码对应：** `extends`
*   **耦合度：** 最强

### 代码示例

```java
public class CheesePizza extends Pizza {
    // CheesePizza 就是 Pizza 的一种
}
```

**UML 图示：** `CheesePizza ──▷ Pizza`

### 使用场景

当一个类是另一个类的特化版本时使用。例如：`CheesePizza` 是 `Pizza` 的一种具体类型。

---

## 2. 实现 (Realization) —— "接口实现"

### 核心特征

*   **含义：** 类实现了接口
*   **图形：** **虚线** + **空心三角形**箭头
*   **代码对应：** `implements`
*   **耦合度：** 强（仅次于泛化）

### 代码示例

```java
public class Dog implements Animal {
    // Dog 实现了 Animal 接口
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}
```

**UML 图示：** `Dog - - ▷ Animal`

### 使用场景

当一个类需要实现某个接口定义的行为契约时使用。例如：`Dog` 实现了 `Animal` 接口。

---

## 3. 组合 (Composition) —— "生死与共"

这是一种非常强的"拥有"关系，体现了严格的部分与整体关系。

### 核心特征

*   **含义：** 部分不能脱离整体而存在。如果整体（人）没了，部分（心脏）也就没了
*   **图形：** **实线** + **实心菱形**（菱形在整体那头）
*   **代码对应：** 成员变量，通常在构造函数中直接 `new` 出来，不让外部修改，生命周期绑定
*   **耦合度：** 很强

### 代码示例

```java
public class Person {
    // 人生下来就有心脏，人死心脏停
    // 心脏的生命周期完全绑定在 Person 上
    private Heart heart = new Heart();
    
    public Person() {
        // 心脏在 Person 创建时就被创建
        // 不能从外部传入，因为心脏是 Person 的一部分
    }
}
```

**UML 图示：** `Person ◆── Heart`

### 使用场景

当部分对象不能独立于整体对象存在时使用。例如：人和心脏、汽车和发动机。

---

## 4. 聚合 (Aggregation) —— "聚是一团火"

这也是"拥有"关系，但比组合松散。

### 核心特征

*   **含义：** 整体和部分可以分开。比如"班级"解散了，"学生"还在
*   **图形：** **实线** + **空心菱形**（菱形在整体那头）
*   **代码对应：** 成员变量，通常通过构造函数**传参**进来（Setter 注入）
*   **耦合度：** 中等偏强

### 代码示例

```java
public class Class {
    private Student student;
    
    // 学生是从外面来的，班级没了学生去别处
    public Class(Student student) {
        this.student = student;
    }
    
    // 或者通过 Setter 注入
    public void setStudent(Student student) {
        this.student = student;
    }
}
```

**UML 图示：** `Class ◇── Student`

### 使用场景

当整体和部分可以独立存在时使用。例如：班级和学生、公司和员工。

### 组合 vs 聚合的区别

| 特征 | 组合 (Composition) | 聚合 (Aggregation) |
|:---|:---|:---|
| **生命周期** | 部分随整体创建/销毁 | 部分可独立存在 |
| **代码表现** | 内部 `new`，构造函数中创建 | 外部传入，通过参数或 Setter |
| **关系强度** | 更强（生死与共） | 较弱（可以分离） |
| **示例** | 人-心脏 | 班级-学生 |

---

## 5. 关联 (Association) —— "长期持有"

这是最常见的关系，表示两个类之间有长期的联系。

### 核心特征

*   **含义：** 我"有"你的引用，我会经常找你办事
*   **图形：** **实线** + **普通箭头**（或者无箭头，表示双向关联）
*   **代码对应：** **成员变量 (Field)**
*   **耦合度：** 中等

### 代码示例

```java
public class PizzaStore {
    // 长期持有，作为字段存在
    // PizzaStore 会经常使用 factory 来创建 Pizza
    SimplePizzaFactory factory;
    
    public PizzaStore(SimplePizzaFactory factory) {
        this.factory = factory;
    }
    
    public Pizza orderPizza(String type) {
        // 使用持有的 factory 来创建 Pizza
        return factory.createPizza(type);
    }
}
```

**UML 图示：** `PizzaStore ──> SimplePizzaFactory`

### 使用场景

当一个类需要长期持有另一个类的引用，并经常使用它时。例如：`PizzaStore` 持有 `SimplePizzaFactory` 的引用。

---

## 6. 依赖 (Dependency) —— "临时使用"

这是最弱的关系。

### 核心特征

*   **含义：** 我"用"到了你，但我不用把你存在家里（不存为字段）。用完就扔
*   **图形：** **虚线** + **普通箭头**
*   **代码对应：** 
    1.  **方法参数**
    2.  **局部变量**
    3.  **静态方法调用**
*   **耦合度：** 最弱

### 代码示例

```java
public class Driver {
    // Driver 不需要拥有一辆车才能活
    // 他只是在 drive 的时候用一下车
    public void drive(Car car) {  // Car 作为参数传入
        car.move();
        car.turn();
    }
    
    // 或者作为局部变量
    public void rentAndDrive() {
        Car rentalCar = new Car();  // 临时创建
        rentalCar.move();
        // rentalCar 用完就销毁了
    }
}
```

**UML 图示：** `Driver - - > Car`

### 使用场景

当一个类只是临时使用另一个类，不需要长期持有时。例如：司机开车、工厂创建产品。

---

## 总结对比表

| 关系 | 线条样式 | 箭头/端点 | 核心代码特征 | 语义 | 耦合度 |
|:---|:---|:---|:---|:---|:---|
| **泛化** | 实线 | 空心三角 | `extends` | 继承 (Is-a) | 最强 |
| **实现** | 虚线 | 空心三角 | `implements` | 实现接口 | 强 |
| **组合** | 实线 | **实心**菱形 | 成员变量 (内部 new) | 强拥有 (生死与共) | 很强 |
| **聚合** | 实线 | **空心**菱形 | 成员变量 (外部传入) | 弱拥有 (包含关系) | 中等偏强 |
| **关联** | **实线** | 普通箭头 | **成员变量** | 长期持有 (Has-a) | 中等 |
| **依赖** | **虚线** | 普通箭头 | **局部变量 / 参数** | 临时使用 (Uses-a) | 最弱 |

---

## 快速记忆技巧

### 按线条区分

1. **实线 + 空心三角** = 继承/实现（Is-a 关系）
2. **实线 + 菱形** = 拥有关系（Has-a 关系）
   - 实心菱形 = 组合（强拥有）
   - 空心菱形 = 聚合（弱拥有）
3. **实线 + 普通箭头** = 关联（长期持有）
4. **虚线 + 普通箭头** = 依赖（临时使用）

### 按代码特征区分

*   **字段（成员变量）** → 关联、聚合、组合
*   **参数/局部变量** → 依赖
*   **extends** → 泛化
*   **implements** → 实现

---

## 实际应用：简单工厂模式类图解读

回到简单工厂模式的类图，让我们用这些知识来解读：

```
PizzaStore ──> SimplePizzaFactory  (实线箭头)
SimplePizzaFactory - - > Pizza      (虚线箭头)
CheesePizza ──▷ Pizza               (实线空心三角)
```

### 关系解析

1. **`PizzaStore -> SimplePizzaFactory` (实线箭头)**
   - 这是**关联**关系
   - `PizzaStore` 持有 `factory` 作为成员变量
   - 代码：`SimplePizzaFactory factory;`

2. **`SimplePizzaFactory -> Pizza` (虚线箭头)**
   - 这是**依赖**关系
   - 工厂在 `createPizza` 方法中临时创建 `Pizza` 对象
   - 代码：`return new CheesePizza();`（局部变量）

3. **`CheesePizza -> Pizza` (实线空心三角)**
   - 这是**泛化**关系
   - `CheesePizza` 继承自 `Pizza`
   - 代码：`public class CheesePizza extends Pizza`

### 设计模式的核心

**最关键的是：** `PizzaStore` 不认识 `CheesePizza`（它们之间没有连线）。这就是设计模式的威力——通过工厂将具体产品类与客户端隔离开来，实现了**解耦**。

---

## 注意事项

### 工程实践中的灵活性

在非学术论文的工程交流中，混用关联（实线）和依赖（虚线）的情况非常普遍。通常只要看到箭头指向谁，就知道"谁依赖谁"了。

例如，有些设计图中：
- `Factory -> Pizza` 可能画成实线（关联），强调"生产出的产品必然是 Pizza 类型"这种强联系
- 这在工程实践中是可以接受的，只要团队内部理解一致即可

### 标准 vs 实用

*   **学术标准：** 严格区分实线（关联）和虚线（依赖）
*   **工程实践：** 更关注"谁认识谁"，箭头方向比线条虚实更重要

---

## 延伸阅读

理解 UML 类图关系是学习设计模式的基础。建议在学习每个设计模式时，都尝试用这些关系来解读类图，加深理解。

*   [简单工厂模式](/1-创造型模式/2-简单工厂/) - 包含关联和依赖关系的实际应用
*   [工厂方法模式](/1-创造型模式/3-工厂方法模式/) - 更多关于继承和实现的应用
*   [装饰者模式](/2-结构型模式/1-装饰者模式/) - 组合关系的典型应用

