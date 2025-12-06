# 题目二：对象间的一对多通信（观察者模式）

## 情景描述：股票价格监控系统

你正在开发一个股票交易平台的价格监控系统。系统的核心是 `StockPrice` 对象，它负责实时获取某只股票的最新价格和交易量数据。系统要求一旦股票价格发生变化，所有订阅了该股票的投资者（Investor）和交易机器人（TradingBot）必须立即收到通知并自动更新。

如果使用传统的直接调用方式，会导致：
1. **紧耦合**：`StockPrice` 需要知道所有具体的投资者和交易机器人类型
2. **违反开闭原则**：每次新增订阅者类型都需要修改 `StockPrice` 的代码
3. **难以维护**：订阅者的增加和移除变得困难

你决定使用**观察者模式 (Observer Pattern)** 来实现 `StockPrice`（主题/Subject）和订阅者（观察者/Observer）之间的松耦合通信。

**任务要求：**

1.  **画图题：** 请画出**观察者模式**在股票价格监控系统中的核心 **UML 类图**，至少包含以下元素：`Subject` 接口、`Observer` 接口、`StockPrice` 类、`Investor` 类。使用正确的 UML 符号表示它们之间的关系（例如，使用实线空心三角形表示继承或实现，使用实线箭头表示关联）。

    *   **提示 UML 关系：** `StockPrice` 和 `Investor` 都会实现相应的接口。`StockPrice` 需要长期持有所有 `Observer` 的引用（关联关系）。

2.  **代码补全题：** 补全 `StockPrice` 类中用于通知所有观察者的关键方法 `notifyObservers()`，该方法是实现"一对多"自动更新的核心。

```java
// 接口定义
public interface Subject {
    void registerObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}

public interface Observer {
    void update(String stockSymbol, double price, int volume);
}

// 主题实现类
public class StockPrice implements Subject {
    private ArrayList<Observer> observers;
    private String stockSymbol;
    private double price;
    private int volume;
    
    public StockPrice(String stockSymbol) {
        this.stockSymbol = stockSymbol;
        this.observers = new ArrayList<Observer>();
    }
    
    // 注册观察者（已省略实现）
    public void registerObserver(Observer o) {
        observers.add(o);
    }
    
    // 移除观察者（已省略实现）
    public void removeObserver(Observer o) {
        observers.remove(o);
    }
    
    // ① 补全代码：通知所有观察者
    public void notifyObservers() {
        for (Observer observer : observers) {
            // ② 补全代码：调用观察者的更新方法，传入当前股票数据
            // observer.update(________________, ________________, ________________);
        }
    }
    
    // 当股票价格变化时调用此方法
    public void priceChanged(double newPrice, int newVolume) {
        this.price = newPrice;
        this.volume = newVolume;
        notifyObservers(); // 状态变化时调用通知方法
    }
    
    // ... 其他获取和设置价格的方法已省略 ...
}

// 具体观察者：投资者
public class Investor implements Observer {
    private String name;
    
    public Investor(String name) {
        this.name = name;
    }
    
    @Override
    public void update(String stockSymbol, double price, int volume) {
        System.out.println(name + " 收到通知：" + stockSymbol + 
                         " 最新价格 " + price + " 元，成交量 " + volume);
    }
}

---

## 场景二：新闻订阅系统

**情景描述：**

你正在开发一个新闻发布系统。`NewsPublisher`（新闻发布者）发布新闻时，需要通知所有订阅者，包括 `EmailSubscriber`（邮件订阅者）和 `SMSSubscriber`（短信订阅者）。订阅者可以随时订阅或取消订阅新闻。

如果使用传统的直接调用方式，会导致发布者与订阅者紧耦合。你决定使用**观察者模式**来实现松耦合的通知机制。

**任务要求：**

1. **画图题：** 请画出观察者模式在新闻订阅系统中的 UML 类图，包含 `Subject` 接口、`Observer` 接口、`NewsPublisher` 类以及至少两个具体观察者类。

2. **代码补全题：** 补全 `NewsPublisher` 类中的关键方法：

```java
// 观察者接口
public interface Observer {
    void update(String newsTitle, String newsContent);
}

// 主题接口
public interface Subject {
    void registerObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}

// 具体主题：新闻发布者
public class NewsPublisher implements Subject {
    private List<Observer> observers;
    private String newsTitle;
    private String newsContent;
    
    public NewsPublisher() {
        this.observers = new ArrayList<>();
    }
    
    // 注册观察者
    public void registerObserver(Observer o) {
        // ① 补全代码：添加观察者到列表
        // __________________________________;
    }
    
    // 移除观察者
    public void removeObserver(Observer o) {
        // ② 补全代码：从列表中移除观察者
        // __________________________________;
    }
    
    // 通知所有观察者
    public void notifyObservers() {
        // ③ 补全代码：遍历观察者列表并调用更新方法
        // __________________________________;
    }
    
    // 发布新闻
    public void publishNews(String title, String content) {
        this.newsTitle = title;
        this.newsContent = content;
        notifyObservers();
    }
}

// 具体观察者：邮件订阅者
public class EmailSubscriber implements Observer {
    private String email;
    
    public EmailSubscriber(String email) {
        this.email = email;
    }
    
    @Override
    public void update(String newsTitle, String newsContent) {
        System.out.println("发送邮件到 " + email + ": " + newsTitle);
    }
}
```

**参考答案：**

```java
// ①
observers.add(o);

// ②
observers.remove(o);

// ③
for (Observer observer : observers) {
    observer.update(newsTitle, newsContent);
}
```

---

## 场景三：股票价格预警系统

**情景描述：**

你正在开发一个股票价格预警系统。当股票价格达到预设的阈值时，系统需要通知所有设置了预警的投资者。不同的投资者可能设置了不同的预警条件（如价格上限、价格下限），系统需要根据每个投资者的条件进行个性化通知。

**任务要求：**

1. **简答题：** 观察者模式如何支持"个性化通知"这个需求？请说明观察者模式在推送-拉取两种通知方式中的区别。

2. **代码补全题：** 补全 `StockAlert` 类，实现带条件的观察者：

```java
// 观察者接口
public interface StockObserver {
    void update(double currentPrice);
}

// 主题接口
public interface StockSubject {
    void registerObserver(StockObserver o);
    void removeObserver(StockObserver o);
    void notifyObservers();
}

// 股票价格主题
public class StockPrice implements StockSubject {
    private List<StockObserver> observers;
    private String symbol;
    private double price;
    
    public StockPrice(String symbol) {
        this.symbol = symbol;
        this.observers = new ArrayList<>();
    }
    
    public void setPrice(double newPrice) {
        this.price = newPrice;
        notifyObservers();
    }
    
    public void registerObserver(StockObserver o) {
        observers.add(o);
    }
    
    public void removeObserver(StockObserver o) {
        observers.remove(o);
    }
    
    public void notifyObservers() {
        // ① 补全代码：通知所有观察者
        // __________________________________;
    }
}

// 带条件的观察者：价格预警
public class StockAlert implements StockObserver {
    private String investorName;
    private double alertThreshold; // 预警阈值
    private boolean isUpperLimit;  // true表示上限，false表示下限
    
    public StockAlert(String name, double threshold, boolean isUpper) {
        this.investorName = name;
        this.alertThreshold = threshold;
        this.isUpperLimit = isUpper;
    }
    
    @Override
    public void update(double currentPrice) {
        // ② 补全代码：判断是否触发预警
        // 如果是上限预警且价格超过阈值，或下限预警且价格低于阈值
        if ((isUpperLimit && currentPrice >= alertThreshold) || 
            (!isUpperLimit && currentPrice <= alertThreshold)) {
            System.out.println(investorName + " 预警：价格 " + currentPrice + 
                             (isUpperLimit ? " 超过上限 " : " 低于下限 ") + alertThreshold);
        }
    }
}
```

**参考答案：**

1. **简答题答案：**
   - **个性化通知**：观察者模式支持每个观察者维护自己的状态（如预警阈值），在 `update()` 方法中根据自身条件决定是否响应通知，实现个性化处理。
   - **推送方式（Push）**：主题在通知时直接传递所有数据给观察者，观察者被动接收。优点是高效，缺点是可能传递不必要的数据。
   - **拉取方式（Pull）**：主题只通知观察者"有变化"，观察者主动从主题获取需要的数据。优点是观察者可以按需获取，缺点是增加了观察者与主题的耦合。

2. **代码补全答案：**
   ```java
   // ①
   for (StockObserver observer : observers) {
       observer.update(price);
   }
   
   // ② 代码已在题目中给出，无需补全
   ```
```

