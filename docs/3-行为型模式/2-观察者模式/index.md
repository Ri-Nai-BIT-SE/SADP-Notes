# 观察者模式 (Observer Pattern)

## 1. 场景：Weather-O-Rama 气象站

假设我们要为"Weather-O-Rama"公司开发气象站系统。

- **WeatherData 对象**：负责从物理传感器获取数据（温度、湿度、气压）。
- **布告板 (Display Elements)**：有三个布告板，分别显示"当前状况"、"气象统计"和"天气预报"。
- **需求**：一旦 `WeatherData` 获取到最新的测量数据，这三个布告板必须**实时更新**。而且未来可能会有第三方开发者加入新的布告板。

**错误的实现：**

```java
public class WeatherData {
    public void measurementsChanged() {
        float temp = getTemperature();
        float humidity = getHumidity();
        float pressure = getPressure();

        // 错误：针对实现编程，而非针对接口
        // 如果以后要增加第4个布告板，就必须修改这行代码
        currentConditionsDisplay.update(temp, humidity, pressure);
        statisticsDisplay.update(temp, humidity, pressure);
        forecastDisplay.update(temp, humidity, pressure);
    }
}
```

这种写法违反了**开闭原则**，也导致了`WeatherData`与具体的布告板**紧耦合**。

## 2. 核心定义

> **观察者模式**：定义了对象之间的一对多依赖，这样一来，当一个对象改变状态时，它的所有依赖者都会收到通知并自动更新。

- **主题 (Subject)**：即"出版者"，拥有数据的人（`WeatherData`）。
- **观察者 (Observer)**：即"订阅者"，需要数据的人（各种布告板）。

## 3. 代码实现

### A. 定义接口

```java
// 主题接口：管理观察者的注册和移除，以及通知功能
public interface Subject {
    void registerObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}

// 观察者接口：所有布告板都必须实现这个接口，以便接收更新
public interface Observer {
    // 这里采用的是"推(Push)"模式，主题把数据直接推给观察者
    void update(float temp, float humidity, float pressure);
}

// 显示接口（可选，为了代码整洁）
public interface DisplayElement {
    void display();
}
```

### B. 实现主题 (Concrete Subject)

```java
import java.util.ArrayList;

public class WeatherData implements Subject {
    // 关键点：用一个列表记录所有的观察者
    private ArrayList<Observer> observers;
    private float temperature;
    private float humidity;
    private float pressure;

    public WeatherData() {
        observers = new ArrayList<Observer>();
    }

    // 注册观察者
    public void registerObserver(Observer o) {
        observers.add(o);
    }

    // 移除观察者
    public void removeObserver(Observer o) {
        int i = observers.indexOf(o);
        if (i >= 0) {
            observers.remove(i);
        }
    }

    // 通知所有观察者
    public void notifyObservers() {
        for (Observer observer : observers) {
            // 遍历列表，逐个调用 update
            observer.update(temperature, humidity, pressure);
        }
    }

    // 当从传感器获取到新数据时调用此方法
    public void measurementsChanged() {
        notifyObservers();
    }

    // 模拟设置测量数据（用于测试）
    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();
    }
}
```

### C. 实现观察者 (Concrete Observer)

以"当前状况布告板"为例：

```java
public class CurrentConditionsDisplay implements Observer, DisplayElement {
    private float temperature;
    private float humidity;
    private Subject weatherData; // 持有主题的引用，方便以后取消注册

    public CurrentConditionsDisplay(Subject weatherData) {
        this.weatherData = weatherData;
        // 构造时把自己注册给主题
        weatherData.registerObserver(this);
    }

    // 实现接口方法，接收数据更新
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        display();
    }

    public void display() {
        System.out.println("Current conditions: " + temperature 
                           + "F degrees and " + humidity + "% humidity");
    }
}
```

### D. 客户端测试

```java
public class WeatherStation {
    public static void main(String[] args) {
        // 1. 创建主题
        WeatherData weatherData = new WeatherData();

        // 2. 创建布告板（观察者），并自动注册到主题中
        CurrentConditionsDisplay currentDisplay = 
            new CurrentConditionsDisplay(weatherData);
        // 假设还有其他布告板...
        // StatisticsDisplay statisticsDisplay = new StatisticsDisplay(weatherData);

        // 3. 模拟气象数据变化
        // 主题会根据新数据自动通知所有布告板更新
        weatherData.setMeasurements(80, 65, 30.4f);
        weatherData.setMeasurements(82, 70, 29.2f);
    }
}
```

## 4. 类图

```mermaid
classDiagram
    class Subject {
        <<interface>>
        +registerObserver(Observer o)
        +removeObserver(Observer o)
        +notifyObservers()
    }

    class Observer {
        <<interface>>
        +update(float temp, float humidity, float pressure)
    }

    class DisplayElement {
        <<interface>>
        +display()
    }

    class WeatherData {
        -ArrayList~Observer~ observers
        -float temperature
        -float humidity
        -float pressure
        +registerObserver(Observer o)
        +removeObserver(Observer o)
        +notifyObservers()
        +measurementsChanged()
        +setMeasurements(float t, float h, float p)
    }

    class CurrentConditionsDisplay {
        -float temperature
        -float humidity
        -Subject weatherData
        +update(float t, float h, float p)
        +display()
    }

    WeatherData ..|> Subject : implements
    CurrentConditionsDisplay ..|> Observer : implements
    CurrentConditionsDisplay ..|> DisplayElement : implements
    WeatherData --> Observer : notifies
    CurrentConditionsDisplay --> Subject : registers with
```

## 5. 核心设计原则

> **为了交互对象之间的松耦合设计而努力 (Strive for loosely coupled design between objects that interact)。**

- **松耦合**：`WeatherData` 只知道观察者实现了 `Observer` 接口，不需要知道观察者具体是谁、做了什么。这使得我们可以随时增加新的布告板，而不需要修改 `WeatherData` 的代码。

## 6. 推(Push) vs 拉(Pull)

| 模式 | 说明 | 优缺点 |
| :--- | :--- | :--- |
| **推 (Push)** | 主题主动发送具体数据，`update(temp, humidity, pressure)` | 观察者可以直接用；但可能收到不需要的数据 |
| **拉 (Pull)** | 主题只通知"数据更新了"，`update()` 无参数，观察者自己调用 `getTemperature()` 等方法获取 | 更灵活，观察者按需获取 |

## 7. 观察者模式在 MVC 架构中的应用

**MVC (Model-View-Controller)** 是经典的软件架构模式，而观察者模式是 MVC 架构的核心机制之一。

### MVC 架构概述

- **Model（模型）**：负责数据和业务逻辑，对应观察者模式中的**主题 (Subject)**
- **View（视图）**：负责用户界面展示，对应观察者模式中的**观察者 (Observer)**
- **Controller（控制器）**：负责处理用户输入，协调 Model 和 View

### MVC 中的观察者模式

在 MVC 架构中，观察者模式实现了 Model 和 View 之间的解耦：

1. **Model 作为主题**：当数据发生变化时，通知所有注册的 View
2. **View 作为观察者**：订阅 Model 的变化，自动更新界面显示
3. **Controller 协调**：处理用户输入，修改 Model，触发更新流程

### 代码示例：MVC 实现

```java
// Model（主题）
public class WeatherModel implements Subject {
    private ArrayList<Observer> observers;
    private float temperature;
    private float humidity;
    private float pressure;

    public WeatherModel() {
        observers = new ArrayList<>();
    }

    public void registerObserver(Observer o) {
        observers.add(o);
    }

    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature, humidity, pressure);
        }
    }

    // 数据变化时通知所有视图
    public void setMeasurements(float temp, float humidity, float pressure) {
        this.temperature = temp;
        this.humidity = humidity;
        this.pressure = pressure;
        notifyObservers(); // 关键：通知所有观察者
    }
}

// View（观察者）
public class WeatherView implements Observer, DisplayElement {
    private float temperature;
    private float humidity;
    private Subject weatherModel;

    public WeatherView(Subject weatherModel) {
        this.weatherModel = weatherModel;
        weatherModel.registerObserver(this);
    }

    public void update(float temp, float humidity, float pressure) {
        this.temperature = temp;
        this.humidity = humidity;
        display(); // 自动更新界面
    }

    public void display() {
        // 更新UI显示
        System.out.println("View Updated: " + temperature + "F, " + humidity + "%");
    }
}

// Controller（控制器）
public class WeatherController {
    private WeatherModel model;

    public WeatherController(WeatherModel model) {
        this.model = model;
    }

    // 处理用户输入，修改模型
    public void handleUserInput(float temp, float humidity, float pressure) {
        // Controller 修改 Model，Model 会自动通知所有 View
        model.setMeasurements(temp, humidity, pressure);
    }
}
```

### MVC 架构图

```mermaid
classDiagram
    class Model {
        <<Subject>>
        +registerObserver(Observer)
        +removeObserver(Observer)
        +notifyObservers()
        +setMeasurements()
    }

    class View {
        <<Observer>>
        +update()
        +display()
    }

    class Controller {
        +handleUserInput()
    }

    Model --> Observer : notifies
    View ..|> Observer : implements
    Controller --> Model : modifies
    View --> Model : observes
```

**MVC 的优势：**
- **解耦**：Model 和 View 通过观察者模式解耦，可以独立变化
- **可扩展**：可以轻松添加新的 View（观察者），而不修改 Model
- **可复用**：同一个 Model 可以被多个 View 观察

## 8. 时序图 (Sequence Diagram)

时序图展示了观察者模式中对象之间的交互流程。

### 注册观察者时序图

```mermaid
sequenceDiagram
    participant Client
    participant WeatherData as WeatherData (Subject)
    participant Display as CurrentConditionsDisplay (Observer)

    Note over Client: 初始化阶段

    Client->>WeatherData: new WeatherData()
    activate WeatherData

    Client->>Display: new CurrentConditionsDisplay(weatherData)
    activate Display

    Display->>WeatherData: registerObserver(this)
    activate WeatherData
    Note right of WeatherData: 将观察者添加到列表
    WeatherData-->>Display: 注册成功
    deactivate WeatherData

    deactivate Display
    deactivate WeatherData
```

### 数据更新通知时序图

```mermaid
sequenceDiagram
    participant Client
    participant WeatherData as WeatherData (Subject)
    participant Display1 as CurrentConditionsDisplay
    participant Display2 as StatisticsDisplay
    participant Display3 as ForecastDisplay

    Note over Client: 数据变化触发更新

    Client->>WeatherData: setMeasurements(80, 65, 30.4f)
    activate WeatherData

    WeatherData->>WeatherData: measurementsChanged()
    WeatherData->>WeatherData: notifyObservers()
    
    Note over WeatherData: 遍历所有观察者并通知

    WeatherData->>Display1: update(80, 65, 30.4f)
    activate Display1
    Display1->>Display1: display()
    Note right of Display1: 更新当前状况显示
    Display1-->>WeatherData: 完成
    deactivate Display1

    WeatherData->>Display2: update(80, 65, 30.4f)
    activate Display2
    Display2->>Display2: display()
    Note right of Display2: 更新统计信息显示
    Display2-->>WeatherData: 完成
    deactivate Display2

    WeatherData->>Display3: update(80, 65, 30.4f)
    activate Display3
    Display3->>Display3: display()
    Note right of Display3: 更新天气预报显示
    Display3-->>WeatherData: 完成
    deactivate Display3

    WeatherData-->>Client: 所有观察者已更新
    deactivate WeatherData
```

### MVC 架构中的时序图

```mermaid
sequenceDiagram
    participant User
    participant Controller
    participant Model as WeatherModel (Subject)
    participant View1 as WeatherView1 (Observer)
    participant View2 as WeatherView2 (Observer)

    Note over User,View2: MVC 架构中的观察者模式

    User->>Controller: 输入新数据 (80, 65, 30.4)
    activate Controller

    Controller->>Model: setMeasurements(80, 65, 30.4f)
    activate Model

    Model->>Model: notifyObservers()
    
    Model->>View1: update(80, 65, 30.4f)
    activate View1
    View1->>View1: display()
    Note right of View1: 更新界面1
    View1-->>Model: 完成
    deactivate View1

    Model->>View2: update(80, 65, 30.4f)
    activate View2
    View2->>View2: display()
    Note right of View2: 更新界面2
    View2-->>Model: 完成
    deactivate View2

    Model-->>Controller: 更新完成
    deactivate Model

    Controller-->>User: 界面已更新
    deactivate Controller
```

**时序图的关键点：**
1. **注册阶段**：观察者向主题注册，建立订阅关系
2. **通知阶段**：主题状态变化时，遍历所有观察者并调用 `update()` 方法
3. **更新阶段**：每个观察者独立处理更新，互不影响
4. **解耦**：主题不需要知道观察者的具体实现，只需要调用接口方法
