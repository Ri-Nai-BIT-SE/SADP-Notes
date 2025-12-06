# 题目七：消除庞大的条件分支（状态模式）

## 情景描述：智能物流订单管理系统 (Order Management System)

您正在设计一个电商订单系统的核心逻辑 `OrderContext`。一个订单可能会经历以下关键状态：**未支付 (Pending)**、**已发货 (Shipped)** 和 **已完成 (Delivered)**。对订单执行的操作（例如 `Cancel()` 取消操作）必须根据其当前状态做出不同的反应。如果订单处于 `Delivered` 状态，`Cancel()` 应该拒绝；如果处于 `Pending` 状态，则可以成功取消并转为 `Closed` 状态。

您决定采用**状态模式 (State Pattern)** 来替换传统的 `if/else` 或 `switch` 语句，将每种状态的行为封装到独立的类中。

**任务要求：**

1.  **简答题：** 请说明**状态模式**相比于使用大量条件判断语句的主要**优势**是什么？（主要在可维护性和可扩展性上）。

2.  **代码补全题：** 请补全 `PendingState`（未支付状态）中实现 `Cancel()` 操作的关键逻辑，并体现状态转换。

**【代码模板 7-2】请在注释处填写完整的 Java 代码**

```java
// 状态接口
public interface OrderState {
    void pay(OrderContext context);
    void cancel(OrderContext context);
    // ... 其他操作
}

// 上下文类 (Context)
public class OrderContext {
    private OrderState currentState;
    // 假设这是 Closed 状态的实例
    private final OrderState closedState = new ClosedState();

    public OrderContext(OrderState initialState) {
        this.currentState = initialState;
    }

    public void setState(OrderState newState) {
        this.currentState = newState;
    }

    public void cancelOrder() {
        currentState.cancel(this); // 委托给当前状态对象
    }
}

// TODO 7-1: 实现 PendingState (未支付状态) 的 Cancel 方法
public class PendingState implements OrderState {
    @Override
    public void cancel(OrderContext context) {
        System.out.println("订单取消成功，状态转为关闭.");
        // TODO 7-2: 将 OrderContext 的状态设置为 ClosedState
        // 提示：访问 Context 的 ClosedState 字段并设置它为当前状态
        // context.setState(__________________________);
    }
    
    // 省略 pay() 方法实现
    // ...
}
```

**参考答案：**

1. **简答题答案：**
   - **主要优势**：
     - **可维护性**：消除了庞大的条件分支语句（`if/else` 或 `switch`），将每个状态的行为封装到独立的类中，代码结构更清晰。
     - **可扩展性**：当需要添加新状态时，只需创建新的状态类并实现状态接口，无需修改现有代码，符合**开闭原则**。
     - **状态转换显式化**：状态转换逻辑集中在状态类内部，通过 `setState()` 方法显式切换，更容易理解和维护。
     - **避免状态相关的错误**：每个状态只处理自己相关的操作，避免了在条件判断中遗漏某些状态组合的情况。

2. **代码补全答案：**
   ```java
   // TODO 7-2:
   context.setState(context.closedState);
   // 或者如果 closedState 是 public 的：
   // context.setState(new ClosedState());
   ```
   - **解释**：状态模式的核心是状态转换。当 `PendingState` 处理 `cancel()` 操作时，需要将 `OrderContext` 的状态从 `PendingState` 切换到 `ClosedState`。通过调用 `context.setState()` 方法实现状态转换，体现了状态模式中"状态对象自己知道下一个状态"的特点。

---

## 场景二：自动售货机状态管理

**情景描述：**

你正在开发一个自动售货机系统。售货机有多个状态：`NoMoneyState`（未投币）、`HasMoneyState`（已投币）、`SoldState`（已售出）、`SoldOutState`（售罄）。不同状态下，用户的操作（如投币、选择商品、退币）会有不同的行为。

**任务要求：**

1. **画图题：** 请画出状态模式在自动售货机系统中的 UML 类图，包含 `VendingMachineState`（状态接口）、`VendingMachine`（上下文）以及至少三个具体状态类。

2. **代码补全题：** 实现自动售货机的状态管理：

```java
// 状态接口
public interface VendingMachineState {
    void insertMoney(VendingMachine machine);
    void selectProduct(VendingMachine machine);
    void ejectMoney(VendingMachine machine);
}

// 上下文：自动售货机
public class VendingMachine {
    private VendingMachineState currentState;
    private int productCount;
    
    public final VendingMachineState noMoneyState = new NoMoneyState();
    public final VendingMachineState hasMoneyState = new HasMoneyState();
    public final VendingMachineState soldState = new SoldState();
    public final VendingMachineState soldOutState = new SoldOutState();
    
    public VendingMachine(int productCount) {
        this.productCount = productCount;
        this.currentState = noMoneyState;
    }
    
    public void setState(VendingMachineState state) {
        this.currentState = state;
    }
    
    public void insertMoney() {
        currentState.insertMoney(this);
    }
    
    public void selectProduct() {
        currentState.selectProduct(this);
    }
    
    public void ejectMoney() {
        currentState.ejectMoney(this);
    }
    
    public int getProductCount() {
        return productCount;
    }
    
    public void releaseProduct() {
        if (productCount > 0) {
            productCount--;
            System.out.println("商品已售出，剩余: " + productCount);
        }
    }
}

// 具体状态：未投币状态
public class NoMoneyState implements VendingMachineState {
    @Override
    public void insertMoney(VendingMachine machine) {
        System.out.println("已投币");
        // ① 补全代码：切换到已投币状态
        // machine.setState(________________);
    }
    
    @Override
    public void selectProduct(VendingMachine machine) {
        System.out.println("请先投币");
    }
    
    @Override
    public void ejectMoney(VendingMachine machine) {
        System.out.println("未投币，无法退币");
    }
}

// 具体状态：已投币状态
public class HasMoneyState implements VendingMachineState {
    @Override
    public void insertMoney(VendingMachine machine) {
        System.out.println("已投币，请勿重复投币");
    }
    
    @Override
    public void selectProduct(VendingMachine machine) {
        if (machine.getProductCount() > 0) {
            // ② 补全代码：切换到已售出状态
            // machine.setState(________________);
            machine.releaseProduct();
        } else {
            System.out.println("商品已售罄");
            machine.setState(machine.soldOutState);
        }
    }
    
    @Override
    public void ejectMoney(VendingMachine machine) {
        System.out.println("退币成功");
        // ③ 补全代码：切换回未投币状态
        // machine.setState(________________);
    }
}

// 具体状态：已售出状态
public class SoldState implements VendingMachineState {
    @Override
    public void insertMoney(VendingMachine machine) {
        System.out.println("请稍候，商品正在发放");
    }
    
    @Override
    public void selectProduct(VendingMachine machine) {
        System.out.println("商品正在发放，请勿重复选择");
    }
    
    @Override
    public void ejectMoney(VendingMachine machine) {
        System.out.println("商品已售出，无法退币");
    }
}
```

**参考答案：**

```java
// ①
machine.setState(machine.hasMoneyState);

// ②
machine.setState(machine.soldState);

// ③
machine.setState(machine.noMoneyState);
```

---

## 场景三：线程状态管理

**情景描述：**

你正在模拟一个线程的状态管理系统。线程有多个状态：`New`（新建）、`Runnable`（可运行）、`Running`（运行中）、`Blocked`（阻塞）、`Terminated`（终止）。不同状态下，线程可以执行的操作不同。

**任务要求：**

1. **简答题：** 状态模式如何帮助管理复杂的线程状态转换？请说明状态模式相比状态机（State Machine）的优势。

2. **代码补全题：** 实现线程状态管理（简化版）：

```java
// 状态接口
public interface ThreadState {
    void start(ThreadContext context);
    void run(ThreadContext context);
    void block(ThreadContext context);
    void terminate(ThreadContext context);
}

// 上下文：线程
public class ThreadContext {
    private ThreadState currentState;
    
    public final ThreadState newState = new NewState();
    public final ThreadState runnableState = new RunnableState();
    public final ThreadState runningState = new RunningState();
    public final ThreadState blockedState = new BlockedState();
    public final ThreadState terminatedState = new TerminatedState();
    
    public ThreadContext() {
        this.currentState = newState;
    }
    
    public void setState(ThreadState state) {
        this.currentState = state;
    }
    
    public void start() {
        currentState.start(this);
    }
    
    public void run() {
        currentState.run(this);
    }
}

// 具体状态：新建状态
public class NewState implements ThreadState {
    @Override
    public void start(ThreadContext context) {
        System.out.println("线程启动，进入可运行状态");
        // ① 补全代码：切换到可运行状态
        // context.setState(________________);
    }
    
    @Override
    public void run(ThreadContext context) {
        System.out.println("线程尚未启动，无法运行");
    }
    
    @Override
    public void block(ThreadContext context) {
        System.out.println("线程尚未启动，无法阻塞");
    }
    
    @Override
    public void terminate(ThreadContext context) {
        System.out.println("线程尚未启动，无法终止");
    }
}

// 具体状态：可运行状态
public class RunnableState implements ThreadState {
    @Override
    public void start(ThreadContext context) {
        System.out.println("线程已在可运行状态");
    }
    
    @Override
    public void run(ThreadContext context) {
        System.out.println("线程开始运行");
        // ② 补全代码：切换到运行状态
        // context.setState(________________);
    }
    
    @Override
    public void block(ThreadContext context) {
        System.out.println("线程阻塞");
        context.setState(context.blockedState);
    }
    
    @Override
    public void terminate(ThreadContext context) {
        System.out.println("线程终止");
        context.setState(context.terminatedState);
    }
}
```

**参考答案：**

1. **简答题答案：**
   - **状态管理**：每个状态类封装了该状态下允许的操作和状态转换逻辑，使状态转换规则清晰明确。
   - **相比状态机的优势**：
     - **面向对象**：状态是对象，可以封装状态相关的数据和行为。
     - **可扩展性**：添加新状态只需创建新的状态类，无需修改现有代码。
     - **代码组织**：每个状态的行为集中在一个类中，易于理解和维护。
     - **多态性**：利用多态实现不同状态下的不同行为，消除条件分支。

2. **代码补全答案：**
   ```java
   // ①
   context.setState(context.runnableState);
   
   // ②
   context.setState(context.runningState);
   ```

