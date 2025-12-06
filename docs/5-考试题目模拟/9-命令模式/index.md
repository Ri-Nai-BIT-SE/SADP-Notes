# 题目九：请求的封装与解耦（命令模式）

## 情景描述：多媒体编辑器的事务日志

您正在为一款视频编辑器设计一个宏命令系统。用户可以在时间轴上执行多种操作，如 `Resize()` 调整图层大小、`Rotate()` 旋转图层、`Move()` 移动图层。为了实现**撤销 (Undo)** 和**日志记录**功能，您决定采用**命令模式 (Command Pattern)**。

**模式角色对应：**

*   **Layer (图层对象)**：是执行请求的**接收者 (Receiver)**。
*   **ResizeCommand, RotateCommand**：是具体的**命令 (Concrete Command)**。
*   **MacroRecorder (宏录制器)**：是调用命令的**调用者 (Invoker)**。

**任务要求：**

1.  **简答题：** 命令模式在实现"撤销 (Undo)"机制时，是如何提供支持的？这种模式主要符合了课程中哪种设计原则（请用中文描述）？

2.  **代码补全题：** 请补全 `ResizeCommand` 类的构造函数和 `execute()` 方法，确保命令对象持有接收者（Layer）的引用，并封装了具体操作。

**【代码模板 9-2】请在注释处填写完整的 Java 代码**

```java
// 接收者 (Receiver)
public class Layer {
    public void resize(double newSize) {
        System.out.println("Layer resized to: " + newSize);
    }
    // ... 其他方法如 rotate()，move()
}

// 抽象命令接口 (Command)
public interface EditorCommand {
    void execute(); // 执行操作
    void undo();    // 撤销操作
}

// TODO 9-1: 实现 ResizeCommand
public class ResizeCommand implements EditorCommand {
    private Layer layer; // 接收者引用
    private double newSize; // 参数，或称之为状态

    // TODO 9-2: 构造函数，接受接收者和参数
    public ResizeCommand(Layer layer, double newSize) {
        // __________________________________;
        // __________________________________;
    }

    // TODO 9-3: 实现 execute 方法，将请求委托给接收者
    @Override
    public void execute() {
        // layer.__________________________(newSize);
    }

    @Override
    public void undo() {
        // 在实际系统中，这里会使用 Memento 模式保存旧状态并恢复
        System.out.println("Resize command undone.");
    }
}
```

**参考答案：**

1. **简答题答案：**
   - **撤销机制的支持**：
     - 命令模式将请求封装成对象，每个命令对象不仅包含执行操作的信息（接收者和参数），还可以保存执行前的状态。
     - 通过维护一个命令历史栈（Command History），系统可以记录所有执行过的命令。
     - 当需要撤销时，调用命令对象的 `undo()` 方法，该方法可以恢复之前保存的状态，或者执行反向操作。
     - 例如，`ResizeCommand` 在执行 `execute()` 前可以保存旧的尺寸，在 `undo()` 时恢复旧尺寸。
   - **符合的设计原则**：
     - **开闭原则 (Open-Closed Principle)**：可以添加新的命令类型（如 `RotateCommand`）而无需修改现有代码。
     - **单一职责原则 (Single Responsibility Principle)**：命令对象只负责封装一个请求，接收者只负责执行具体操作，调用者只负责调用命令。
     - **依赖倒置原则 (Dependency Inversion Principle)**：调用者依赖于抽象的 `EditorCommand` 接口，而不是具体的命令实现。

2. **代码补全答案：**
   ```java
   // TODO 9-2:
   this.layer = layer;
   this.newSize = newSize;
   
   // TODO 9-3:
   layer.resize(newSize);
   ```
   - **解释**：命令模式的核心是将请求封装成对象。`ResizeCommand` 通过构造函数接收接收者（`Layer`）和操作参数（`newSize`），并将它们保存为实例变量。在 `execute()` 方法中，命令对象将请求委托给接收者的 `resize()` 方法执行。这样，请求的发起者（调用者）与请求的执行者（接收者）之间实现了**解耦**，调用者不需要知道具体的操作细节，只需要调用命令对象的 `execute()` 方法即可。

---

## 场景二：智能家居遥控器

**情景描述：**

你正在开发一个智能家居系统的遥控器。遥控器可以控制多种设备，如 `Light`（灯）、`Fan`（风扇）、`TV`（电视）等。每个设备有不同的操作（如开/关、调亮度、调速度等）。遥控器需要支持**撤销（Undo）**功能，可以撤销最后一次操作。

**任务要求：**

1. **画图题：** 请画出命令模式在智能家居遥控器系统中的 UML 类图，包含 `Command`（命令接口）、`RemoteControl`（调用者）、具体命令类以及接收者类。

2. **代码补全题：** 实现智能家居遥控器的命令模式：

```java
// 接收者：灯
public class Light {
    private boolean isOn = false;
    private int brightness = 50;
    
    public void turnOn() {
        isOn = true;
        System.out.println("灯已打开");
    }
    
    public void turnOff() {
        isOn = false;
        System.out.println("灯已关闭");
    }
    
    public void setBrightness(int level) {
        brightness = level;
        System.out.println("亮度设置为: " + level);
    }
    
    public boolean isOn() {
        return isOn;
    }
    
    public int getBrightness() {
        return brightness;
    }
}

// 命令接口
public interface Command {
    void execute();
    void undo();
}

// 具体命令：开灯命令
public class LightOnCommand implements Command {
    private Light light;
    
    public LightOnCommand(Light light) {
        this.light = light;
    }
    
    @Override
    public void execute() {
        light.turnOn();
    }
    
    @Override
    public void undo() {
        // ① 补全代码：撤销开灯操作
        // light.________________;
    }
}

// 具体命令：调亮度命令
public class LightBrightnessCommand implements Command {
    private Light light;
    private int previousBrightness;
    private int newBrightness;
    
    public LightBrightnessCommand(Light light, int brightness) {
        this.light = light;
        this.newBrightness = brightness;
    }
    
    @Override
    public void execute() {
        // ② 补全代码：保存当前亮度
        // previousBrightness = light.________________;
        light.setBrightness(newBrightness);
    }
    
    @Override
    public void undo() {
        // ③ 补全代码：恢复之前的亮度
        // light.setBrightness(________________);
    }
}

// 调用者：遥控器
public class RemoteControl {
    private Command lastCommand;
    
    public void setCommand(Command command) {
        this.lastCommand = command;
    }
    
    public void pressButton() {
        if (lastCommand != null) {
            lastCommand.execute();
        }
    }
    
    public void pressUndo() {
        if (lastCommand != null) {
            // ④ 补全代码：执行撤销操作
            // lastCommand.________________;
        }
    }
}
```

**参考答案：**

```java
// ①
light.turnOff();

// ②
previousBrightness = light.getBrightness();

// ③
light.setBrightness(previousBrightness);

// ④
lastCommand.undo();
```

---

## 场景三：任务队列系统

**情景描述：**

你正在开发一个任务调度系统，需要支持将任务封装成命令对象，放入队列中延迟执行，并支持任务的撤销和重做。

**任务要求：**

1. **简答题：** 命令模式如何支持"任务队列"和"宏命令"（Macro Command）？请说明命令模式在实现这些功能时的优势。

2. **代码补全题：** 实现任务队列和宏命令：

```java
// 命令接口
public interface TaskCommand {
    void execute();
    void undo();
}

// 接收者：数据库
public class Database {
    public void insert(String data) {
        System.out.println("插入数据: " + data);
    }
    
    public void delete(String data) {
        System.out.println("删除数据: " + data);
    }
}

// 具体命令：插入命令
public class InsertCommand implements TaskCommand {
    private Database database;
    private String data;
    
    public InsertCommand(Database database, String data) {
        this.database = database;
        this.data = data;
    }
    
    @Override
    public void execute() {
        database.insert(data);
    }
    
    @Override
    public void undo() {
        database.delete(data);
    }
}

// 宏命令：执行多个命令
public class MacroCommand implements TaskCommand {
    private List<TaskCommand> commands = new ArrayList<>();
    
    public void addCommand(TaskCommand command) {
        commands.add(command);
    }
    
    @Override
    public void execute() {
        // ① 补全代码：执行所有命令
        // __________________________________;
    }
    
    @Override
    public void undo() {
        // ② 补全代码：按相反顺序撤销所有命令
        // __________________________________;
    }
}

// 任务队列
public class TaskQueue {
    private Queue<TaskCommand> queue = new LinkedList<>();
    
    public void addTask(TaskCommand command) {
        queue.offer(command);
    }
    
    public void processTasks() {
        // ③ 补全代码：处理队列中的所有任务
        // __________________________________;
    }
}
```

**参考答案：**

1. **简答题答案：**
   - **任务队列**：命令对象可以存储请求的所有信息，可以放入队列中延迟执行，支持异步处理和任务调度。
   - **宏命令**：可以将多个命令组合成一个宏命令，一次性执行多个操作，支持批量操作和事务处理。
   - **优势**：
     - **请求的封装**：命令对象封装了请求的所有信息，可以像普通对象一样存储、传递和操作。
     - **支持撤销/重做**：通过维护命令历史，可以轻松实现撤销和重做功能。
     - **支持日志和审计**：可以记录所有执行的命令，用于日志记录和系统审计。
     - **支持事务**：可以将多个命令组合成事务，要么全部成功，要么全部回滚。

2. **代码补全答案：**
   ```java
   // ①
   for (TaskCommand command : commands) {
       command.execute();
   }
   
   // ②
   Collections.reverse(commands);
   for (TaskCommand command : commands) {
       command.undo();
   }
   Collections.reverse(commands); // 恢复原顺序
   
   // ③
   while (!queue.isEmpty()) {
       TaskCommand command = queue.poll();
       command.execute();
   }
   ```

