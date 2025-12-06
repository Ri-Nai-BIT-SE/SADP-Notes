# 题目一：行为的封装与动态替换（策略模式）

## 场景一：在线支付系统

**情景描述：**

你正在开发一个电商平台的在线支付系统。系统需要支持多种支付方式，包括支付宝（Alipay）、微信支付（WeChatPay）和信用卡支付（CreditCard）。每种支付方式都有不同的支付处理逻辑，而且未来可能会增加新的支付方式（如数字人民币、Apple Pay 等）。

如果使用传统的 `if-else` 或 `switch` 语句来处理不同的支付方式，会导致：
1. **违反开闭原则**：每次新增支付方式都需要修改核心支付处理代码
2. **代码耦合**：支付处理逻辑与具体的支付方式实现紧耦合
3. **难以测试**：无法独立测试不同的支付策略

为了解决这个问题，你决定采用**策略模式 (Strategy Pattern)**，将不同的支付处理算法封装成独立的策略类，并使用**组合**来代替条件分支。

**新需求：** 系统需要支持用户在结账时动态切换支付方式。例如，用户最初选择了支付宝，但在支付过程中可以切换到微信支付。

**任务要求：**

1.  **画图题：** 请画出**策略模式**的核心 **UML 类图**，展示 `PaymentProcessor` 类（Context，上下文）、`PaymentStrategy` 接口（Strategy，抽象策略）和至少两个具体支付策略（Concrete Strategy）之间的关系。

2.  **代码补全题：** 请补全 `PaymentProcessor` 类和客户端测试代码，以实现以下功能：

    *   `PaymentProcessor` 初始设置为支付宝支付 (`AlipayStrategy`)。
    *   在运行时，通过调用 `setPaymentStrategy` 方法，将支付方式动态切换为微信支付 (`WeChatPayStrategy`)。

```java
// 策略接口定义
public interface PaymentStrategy {
    void pay(double amount);
}

// 具体策略：支付宝支付
public class AlipayStrategy implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("使用支付宝支付：" + amount + " 元");
    }
}

// 具体策略：微信支付
public class WeChatPayStrategy implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("使用微信支付：" + amount + " 元");
    }
}

// 上下文类 (Context)
public class PaymentProcessor {
    // ① 补全代码：持有抽象策略的引用
    // __________________________________;
    
    // ② 补全代码：动态设置策略的方法
    public void setPaymentStrategy(PaymentStrategy strategy) {
        // __________________________________;
    }
    
    // 执行支付，委托给当前策略
    public void executePayment(double amount) {
        if (paymentStrategy == null) {
            throw new IllegalStateException("请先设置支付方式！");
        }
        // ③ 补全代码：调用策略的支付方法
        // __________________________________;
    }
}

// 客户端测试代码
public class PaymentTest {
    public static void main(String[] args) {
        PaymentProcessor processor = new PaymentProcessor();
        
        // 初始设置为支付宝
        processor.setPaymentStrategy(new AlipayStrategy());
        System.out.print("初始支付方式：");
        processor.executePayment(100.0);
        
        // ④ 补全代码：在运行时切换为微信支付
        // processor.setPaymentStrategy(____________________________);
        
        System.out.print("切换后支付方式：");
        processor.executePayment(100.0);
    }
}
```

---

## 场景二：电商平台购物车结算系统

**情景描述：**

你正在为一家大型电商平台设计其**购物车结算系统**。该系统中的一个核心功能是计算订单的最终运费。平台与多家物流公司合作，支持多种配送方式，且每种配送方式的**运费计算规则（算法）**各不相同，并且这些规则（例如定价、折扣模型）会随着市场变化而频繁更新。

如果将所有计算逻辑（例如大量的 `if-else` 或 `switch` 语句）都写在 `CheckoutService` 类中，将导致：

1. **违反开闭原则（OCP）**：每增加一种新的物流方式，都需要修改 `CheckoutService` 的核心代码。
2. **代码重复与耦合**：不同的业务流程（如计算预估运费、计算最终运费）可能会重复实现部分计算逻辑。

为了解决这个问题，你决定采用**策略模式 (Strategy Pattern)**，将运费计算逻辑抽象化并从核心业务流程中分离出来。

**现有需求中的运费计算策略（部分）：**

1. **StandardShippingStrategy**：标准运输，固定收取**10 元**的运费。
2. **ExpressShippingStrategy**：快递运输，根据订单的**总重量（Weight）**动态计算，每公斤收取**5 元**。

**任务要求：**

1. **画图题（UML 类图）：**

   请画出**策略模式**在此场景中的核心**UML 类图**。图中必须包含以下元素，并使用正确的 UML 符号和关系表示：

   * **Context（上下文）**：`CheckoutService`（购物车结算服务）。
   * **Strategy 接口（抽象策略）**：`ShippingCostStrategy`（运费计算策略）。
   * 至少两个**Concrete Strategy（具体策略）**：`StandardShippingStrategy` 和 `ExpressShippingStrategy`。
   * `CheckoutService` 和 `ShippingCostStrategy` 之间的**关联关系**（关联/聚合）。

2. **代码补全题（核心代码实现）：**

   请补全 `ShippingCostStrategy` 接口和 `CheckoutService` 类的关键部分，以展示策略模式的实现：

   * `ShippingCostStrategy` 接口定义。
   * `StandardShippingStrategy` 和 `ExpressShippingStrategy` 类的实现。
   * `CheckoutService` 类中如何**持有**策略，以及实现**动态设置**策略的方法。

**【代码模板】请在注释处填写完整的 Java 代码**

```java
// TODO: 定义策略接口
public interface ShippingCostStrategy {
    // _________________________________________________________;
}

// 订单类（用于传递给策略的上下文数据）
public class Order {
    private double totalWeight; // 订单总重量（单位：公斤）
    
    public double getTotalWeight() { 
        return totalWeight; 
    }
    
    public Order(double weight) { 
        this.totalWeight = weight; 
    }
}

// TODO: 实现标准运输策略（固定费用 10 元）
public class StandardShippingStrategy implements ShippingCostStrategy {
    @Override
    public double calculate(Order order) {
        // _________________________________________________________;
    }
}

// TODO: 实现快递运输策略（根据重量计算，5 元/公斤）
public class ExpressShippingStrategy implements ShippingCostStrategy {
    @Override
    public double calculate(Order order) {
        // _________________________________________________________;
    }
}

// TODO: 实现上下文类 CheckoutService
public class CheckoutService {
    // 1. 组合：持有抽象策略的引用
    // _________________________________________________________;
    
    // 2. 动态设置策略的方法
    public void setShippingStrategy(ShippingCostStrategy strategy) {
        // _________________________________________________________;
    }
    
    // 3. 业务方法：委托给当前策略执行
    public double calculateShippingFee(Order order) {
        if (shippingStrategy == null) {
            throw new IllegalStateException("请先设置运费计算策略！");
        }
        // _________________________________________________________;
    }
}
```

**参考答案：**

### 场景二 UML 类图（策略模式）

| 模式角色 | 对应类/接口 | UML 关系说明 |
| :--- | :--- | :--- |
| **Context** (上下文) | `CheckoutService` (结算服务) | 持有一个 `ShippingCostStrategy` 引用（关联/聚合），并委托其执行 `calculate()`。|
| **Strategy** (抽象策略) | `<<interface>> ShippingCostStrategy` | 定义所有运费计算算法的公共接口。 |
| **Concrete Strategy** (具体策略) | `StandardShippingStrategy`, `ExpressShippingStrategy` | 实现 `ShippingCostStrategy` 接口，包含具体的运费计算算法。 |

**UML 图示中应体现的关键关系：**

* `StandardShippingStrategy` 和 `ExpressShippingStrategy`**实现**`ShippingCostStrategy`（虚线空心三角形）。
* `CheckoutService`**关联**`ShippingCostStrategy`（实线箭头或实线空心菱形表示聚合）。

### 场景二代码补全答案

```java
// TODO: 定义策略接口
public interface ShippingCostStrategy {
    double calculate(Order order); 
}

// TODO: 实现标准运输策略（固定费用 10 元）
public class StandardShippingStrategy implements ShippingCostStrategy {
    @Override
    public double calculate(Order order) {
        return 10.0;
    }
}

// TODO: 实现快递运输策略（根据重量计算，5 元/公斤）
public class ExpressShippingStrategy implements ShippingCostStrategy {
    @Override
    public double calculate(Order order) {
        return order.getTotalWeight() * 5.0;
    }
}

// TODO: 实现上下文类 CheckoutService
public class CheckoutService {
    // 1. 组合：持有抽象策略的引用
    private ShippingCostStrategy shippingStrategy;
    
    // 2. 动态设置策略的方法
    public void setShippingStrategy(ShippingCostStrategy strategy) {
        this.shippingStrategy = strategy;
    }
    
    // 3. 业务方法：委托给当前策略执行
    public double calculateShippingFee(Order order) {
        if (shippingStrategy == null) {
            throw new IllegalStateException("请先设置运费计算策略！");
        }
        return this.shippingStrategy.calculate(order);
    }
}
```

**代码解释：**

* **策略接口**：`ShippingCostStrategy` 定义了所有运费计算策略的统一接口，包含 `calculate(Order order)` 方法。这体现了**针对接口编程，而不是针对实现编程**的原则。

* **具体策略**：
  * `StandardShippingStrategy` 实现固定运费算法（10 元）。
  * `ExpressShippingStrategy` 实现基于重量的动态计算算法（重量 × 5 元/公斤）。

* **上下文类**：
  * `CheckoutService` 通过**组合**（持有策略接口的引用）来实现对不同算法的委托。
  * `setShippingStrategy()` 方法允许在运行时动态切换策略，体现了策略模式的灵活性。
  * `calculateShippingFee()` 方法将实际计算工作委托给当前持有的策略对象，这体现了**多用组合，少用继承**的设计原则。

**客户端测试示例：**

```java
public class ShippingSimulator {
    public static void main(String[] args) {
        CheckoutService service = new CheckoutService();
        Order heavyOrder = new Order(5.0); // 5 公斤订单
        Order lightOrder = new Order(1.0); // 1 公斤订单

        // 步骤 1: 设置标准运输策略
        service.setShippingStrategy(new StandardShippingStrategy());
        double fee1 = service.calculateShippingFee(heavyOrder);
        System.out.println("标准运输 (5kg) 运费: " + fee1 + " 元"); // 输出: 10.0 元
        
        // 步骤 2: 动态切换为快递策略
        service.setShippingStrategy(new ExpressShippingStrategy());
        double fee2 = service.calculateShippingFee(heavyOrder);
        System.out.println("快递运输 (5kg) 运费: " + fee2 + " 元"); // 输出: 25.0 元 (5 * 5)
        
        // 步骤 3: 新增策略，无需修改 CheckoutService
        // 如果新增了 EconomyShippingStrategy，只需实例化即可。
    }
}
```

**设计模式优势：**

1. **符合开闭原则（OCP）**：添加新的运费计算策略（如 `EconomyShippingStrategy`）时，无需修改 `CheckoutService` 的代码，只需实现 `ShippingCostStrategy` 接口即可。

2. **消除条件分支**：避免了在 `CheckoutService` 中使用大量的 `if-else` 或 `switch` 语句来判断不同的物流方式。

3. **提高代码复用性**：不同的业务场景（如计算预估运费、计算最终运费）可以复用相同的策略对象。

4. **运行时动态切换**：可以根据订单属性、用户选择等因素，在运行时动态选择最合适的运费计算策略。

---

## 场景三：数据压缩算法选择系统

**情景描述：**

你正在开发一个文件压缩工具，需要支持多种压缩算法，包括 ZIP、RAR 和 7Z。不同的压缩算法有不同的压缩率和速度，用户可以根据文件类型和需求选择合适的压缩策略。系统需要支持在运行时动态切换压缩算法。

如果使用传统的条件分支，会导致代码难以维护和扩展。你决定采用**策略模式**来封装不同的压缩算法。

**任务要求：**

1. **画图题：** 请画出策略模式在此场景中的 UML 类图，包含 `CompressionContext`（上下文）、`CompressionStrategy`（抽象策略）和至少两个具体策略类。

2. **代码补全题：** 补全以下代码，实现压缩算法的动态切换：

```java
// 策略接口
public interface CompressionStrategy {
    void compress(String filePath);
    String getAlgorithmName();
}

// 具体策略：ZIP压缩
public class ZipStrategy implements CompressionStrategy {
    @Override
    public void compress(String filePath) {
        System.out.println("使用 ZIP 算法压缩文件: " + filePath);
    }
    
    @Override
    public String getAlgorithmName() {
        return "ZIP";
    }
}

// 具体策略：RAR压缩
public class RarStrategy implements CompressionStrategy {
    @Override
    public void compress(String filePath) {
        System.out.println("使用 RAR 算法压缩文件: " + filePath);
    }
    
    @Override
    public String getAlgorithmName() {
        return "RAR";
    }
}

// 上下文类
public class CompressionContext {
    // ① 补全代码：持有策略引用
    // __________________________________;
    
    // ② 补全代码：设置策略方法
    public void setStrategy(CompressionStrategy strategy) {
        // __________________________________;
    }
    
    // 执行压缩
    public void executeCompression(String filePath) {
        if (strategy == null) {
            throw new IllegalStateException("请先选择压缩算法！");
        }
        // ③ 补全代码：调用策略方法
        // __________________________________;
    }
    
    // 获取当前算法名称
    public String getCurrentAlgorithm() {
        return strategy != null ? strategy.getAlgorithmName() : "未设置";
    }
}
```

**参考答案：**

```java
// ①
private CompressionStrategy strategy;

// ②
this.strategy = strategy;

// ③
strategy.compress(filePath);
```

---

## 场景四：排序算法选择器

**情景描述：**

你正在开发一个数据处理系统，需要对大量数据进行排序。不同的数据规模和数据特征适合不同的排序算法：
- 小规模数据：使用**冒泡排序**（简单但效率低）
- 中等规模数据：使用**快速排序**（效率高）
- 大规模数据：使用**归并排序**（稳定且适合大数据）

系统需要根据数据规模自动选择最优的排序策略，也允许用户手动指定排序算法。

**任务要求：**

1. **简答题：** 策略模式如何帮助解决"根据数据规模自动选择排序算法"这个需求？请说明策略模式在此场景中的优势。

2. **代码补全题：** 补全 `SortContext` 类，实现排序策略的动态切换和自动选择：

```java
// 排序策略接口
public interface SortStrategy {
    void sort(int[] array);
    String getName();
}

// 具体策略：冒泡排序
public class BubbleSortStrategy implements SortStrategy {
    @Override
    public void sort(int[] array) {
        System.out.println("使用冒泡排序算法");
        // 实际排序逻辑省略
    }
    
    @Override
    public String getName() {
        return "冒泡排序";
    }
}

// 具体策略：快速排序
public class QuickSortStrategy implements SortStrategy {
    @Override
    public void sort(int[] array) {
        System.out.println("使用快速排序算法");
        // 实际排序逻辑省略
    }
    
    @Override
    public String getName() {
        return "快速排序";
    }
}

// 上下文类
public class SortContext {
    private SortStrategy strategy;
    
    // 设置策略
    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }
    
    // 根据数据规模自动选择策略
    public void autoSelectStrategy(int[] array) {
        int size = array.length;
        if (size < 100) {
            // ① 补全代码：小规模数据使用冒泡排序
            // __________________________________;
        } else if (size < 10000) {
            // ② 补全代码：中等规模使用快速排序
            // __________________________________;
        } else {
            // 大规模使用归并排序（假设已实现）
            // setStrategy(new MergeSortStrategy());
        }
    }
    
    // 执行排序
    public void executeSort(int[] array) {
        if (strategy == null) {
            throw new IllegalStateException("请先设置排序策略！");
        }
        // ③ 补全代码：调用策略的排序方法
        // __________________________________;
    }
}
```

**参考答案：**

1. **简答题答案：**
   - 策略模式将不同的排序算法封装成独立的策略类，使得算法选择逻辑与具体算法实现解耦。
   - 通过 `autoSelectStrategy()` 方法，可以根据数据规模动态选择合适的策略，无需修改核心代码。
   - 符合开闭原则：添加新的排序算法（如堆排序）只需实现 `SortStrategy` 接口，无需修改现有代码。
   - 提高了代码的可测试性：每个排序策略可以独立测试。

2. **代码补全答案：**
   ```java
   // ①
   setStrategy(new BubbleSortStrategy());
   
   // ②
   setStrategy(new QuickSortStrategy());
   
   // ③
   strategy.sort(array);
   ```

