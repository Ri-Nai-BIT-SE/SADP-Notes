好的，我们就从**单例模式 (Singleton Pattern)** 开始。

基于您提供的课件（特别是 `7.Singleton.pdf`），单例模式的核心目的是**确保一个类只有一个实例，并提供一个全局访问点**。

课件中非常形象地把它比作“入场券”（独一无二的），并使用了一个**巧克力工厂锅炉控制器 (ChocolateBoiler)** 的案例来贯穿讲解。

以下是单例模式的演进过程及对应代码实现：

---

### 1. 为什么需要单例？
在软件系统中，有些对象只需要一个实例，如果存在多个实例会造成混乱或资源浪费。
*   **常见场景**：线程池 (ThreadPool)、缓存 (Cache)、日志对象、打印机驱动、显卡驱动等。
*   **课件案例**：**巧克力锅炉**。
    *   如果不使用单例，可能会导致创建两个锅炉控制器。
    *   后果：一个控制器在注水，另一个控制器以为水是空的还在加热，导致空烧或溢出，这就是严重的逻辑错误。

---

### 2. 经典实现（懒汉式 - 非线程安全）
这是最基础的写法。所谓“懒汉”，是指“只有在需要的时候才去创建实例”。

*   **关键点**：
    1.  **构造函数私有化** (`private`)：防止外部通过 `new` 随意创建。
    2.  **静态变量**：保存唯一的实例。
    3.  **静态方法**：提供全局访问点。

```java
public class ChocolateBoiler {
    private boolean empty;
    private boolean boiled;
    
    // 1. 利用静态变量来记录ChocolateBoiler的唯一实例
    private static ChocolateBoiler uniqueInstance;

    // 2. 把构造器声明为私有，只有ChocolateBoiler类内才可以调用
    private ChocolateBoiler() {
        empty = true;
        boiled = false;
    }

    // 3. 用getInstance()方法实例化对象，并返回这个实例
    public static ChocolateBoiler getInstance() {
        // 如果实例为空，表示还没有创建过，则创建一个
        if (uniqueInstance == null) {
            uniqueInstance = new ChocolateBoiler();
        }
        // 如果已经存在，直接返回
        return uniqueInstance;
    }

    public void fill() {
        if (isEmpty()) {
            empty = false;
            boiled = false;
            // 在锅炉内填满巧克力和牛奶的混合物
        }
    }
    
    // ... 其他业务方法 (drain, boil, isEmpty, isBoiled) 省略
    public boolean isEmpty() { return empty; }
    public boolean isBoiled() { return boiled; }
}
```

*   **问题**：这种写法在**多线程**环境下是不安全的。如果线程A和线程B同时进入 `if (uniqueInstance == null)`，它们都会创建一个实例，导致单例失效。

---

### 3. 解决办法一：急切创建（饿汉式）
如果不考虑延迟加载带来的资源节约，可以直接在类加载时就创建实例。

*   **特点**：JVM在加载这个类时马上创建唯一的单例实例。保证了线程安全。

```java
public class Singleton {
    // 在静态初始化器中创建单例，保证了线程安全
    private static Singleton uniqueInstance = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        // 直接返回早已创建好的实例
        return uniqueInstance;
    }
}
```

---

### 4. 解决办法二：同步方法（虽然安全但性能差）
为了解决懒汉式的线程安全问题，最暴力的办法是给 `getInstance` 方法加锁。

*   **代码**：添加 `synchronized` 关键字。

```java
public class Singleton {
    private static Singleton uniqueInstance;

    private Singleton() {}

    // 添加 synchronized 关键字，迫使每个线程在进入这个方法前，要先等候别的线程离开
    public static synchronized Singleton getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Singleton();
        }
        return uniqueInstance;
    }
}
```

*   **问题**：**性能下降严重**。实际上只有第一次执行时才需要同步（防止产生多个实例），一旦实例创建完成，后续的同步都是不必要的累赘，会拖慢程序速度（课件中提到甚至可能下降100倍）。

---

### 5. 解决办法三：双重检查加锁 (Double-Checked Locking)
这是课件中推荐的最终解决方案。它既实现了延迟加载（懒汉），又保证了线程安全，且性能较高。

*   **关键点**：
    1.  `volatile` 关键字：确保当 `uniqueInstance` 变量被初始化成 `Singleton` 实例时，多个线程能正确处理 `uniqueInstance` 变量（防止指令重排）。
    2.  两次 `if` 检查：只有在第一次创建时才同步。

```java
public class Singleton {
    // 必须使用 volatile 关键字
    private volatile static Singleton uniqueInstance;

    private Singleton() {}

    public static Singleton getInstance() {
        // 第一次检查：如果实例已经存在，就直接跳过同步块，提高性能
        if (uniqueInstance == null) {
            // 只有在第一次才彻底执行这里的代码
            synchronized (Singleton.class) {
                // 第二次检查：进入同步块后再次检查，防止在上锁期间有其他线程已经创建了实例
                if (uniqueInstance == null) {
                    uniqueInstance = new Singleton();
                }
            }
        }
        return uniqueInstance;
    }
}
```

### 总结
课件通过这四步展示了单例模式的思考过程：
1.  **定义**：为了解决资源独占和全局访问问题。
2.  **实现**：私有构造 + 静态变量 + 静态方法。
3.  **挑战**：多线程环境下的竞态条件。
4.  **优化**：从简单的 `synchronized` 到高效的 `Double-Checked Locking`。