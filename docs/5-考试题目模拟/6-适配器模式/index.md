# 题目六：系统集成与接口转换（适配器模式）

## 情景描述

您需要将一个遗留的 `Tiger` 类（只有 `paint()` 方法）集成到一个图形编辑器（要求所有对象实现 `draw()` 接口）。您决定使用**对象适配器模式**来解决接口不兼容问题。

## 任务要求

1.  **画图题/关系描述：** 请描述**对象适配器模式**中，Adapter（适配器）类与 Target（目标接口）之间是哪种 UML 关系？与 Adaptee（被适配者）之间是哪种关系？

2.  **代码补全题：** 请补全实现对象适配器的关键代码。

**【代码模板 6-2】请补全 Object Adapter 的核心逻辑**

```java
// 目标接口 (Target)
public interface Toolkit {
    public void draw();
}

// 被适配者 (Adaptee)
public class Tiger {
    public void paint() {
        System.out.println("Tiger is painting itself.");
    }
}

// TODO 6-1: 实现对象适配器 (TigerAdaptor)
public class TigerAdaptor implements Toolkit {
    
    // TODO 6-2: 内部组合被适配者 (Adaptee) 的引用
    // __________________________________;
    
    // 构造函数，接受被适配者实例
    public TigerAdaptor(Tiger t) {
        // TODO 6-3: 赋值操作
        // __________________________________;
    }
    
    // 适配目标方法 (Target.draw)
    @Override
    public void draw() {
        // TODO 6-4: 委托给被适配者的方法
        // __________________________________;
    }
}
```

**参考答案：**

1. **UML 关系描述：**
   - **Adapter 与 Target 之间**：**实现关系**（Realization），在 UML 中用**虚线空心三角形箭头**表示（箭头指向接口）。在代码中对应 `implements` 关键字。
   - **Adapter 与 Adaptee 之间**：**组合关系**（Composition），在 UML 中用**实线箭头**表示（箭头指向被适配者），表示"has-a"关系。适配器通过**组合**方式持有被适配者的引用。

2. **代码补全答案：**
   ```java
   // TODO 6-2:
   private Tiger tiger;
   
   // TODO 6-3:
   this.tiger = t;
   
   // TODO 6-4:
   tiger.paint();
   ```
   - **解释**：对象适配器通过组合方式持有被适配者的引用，在实现目标接口方法时，将调用委托给被适配者的方法。这种方式比类适配器（继承）更灵活，符合"多用组合，少用继承"的设计原则。

---

## 场景二：第三方支付接口适配

**情景描述：**

你的电商系统原本使用 `AlipayPayment`（支付宝支付）接口，现在需要集成 `WeChatPay`（微信支付）系统。但是 `WeChatPay` 的接口方法名是 `pay()`，而你的系统期望的是 `processPayment()` 方法。

你决定使用**适配器模式**来适配微信支付的接口，使其能够无缝集成到现有系统中。

**任务要求：**

1. **画图题：** 请画出适配器模式在此场景中的 UML 类图，展示 `PaymentProcessor`（目标接口）、`WeChatPayAdapter`（适配器）和 `WeChatPay`（被适配者）之间的关系。

2. **代码补全题：** 实现支付接口适配器：

```java
// 目标接口：支付处理器
public interface PaymentProcessor {
    void processPayment(double amount);
}

// 被适配者：微信支付（第三方类，无法修改）
public class WeChatPay {
    public void pay(double amount) {
        System.out.println("微信支付: " + amount + " 元");
    }
}

// 适配器：微信支付适配器
public class WeChatPayAdapter implements PaymentProcessor {
    // ① 补全代码：持有被适配者的引用
    // __________________________________;
    
    public WeChatPayAdapter(WeChatPay weChatPay) {
        // ② 补全代码：初始化被适配者引用
        // __________________________________;
    }
    
    @Override
    public void processPayment(double amount) {
        // ③ 补全代码：将目标方法调用委托给被适配者的方法
        // __________________________________;
    }
}

// 客户端使用
public class PaymentTest {
    public static void main(String[] args) {
        WeChatPay weChatPay = new WeChatPay();
        PaymentProcessor processor = new WeChatPayAdapter(weChatPay);
        processor.processPayment(100.0);
    }
}
```

**参考答案：**

```java
// ①
private WeChatPay weChatPay;

// ②
this.weChatPay = weChatPay;

// ③
weChatPay.pay(amount);
```

---

## 场景三：媒体播放器适配器

**情景描述：**

你正在开发一个媒体播放器，支持播放 `MP3` 和 `VLC` 格式的音频。但是系统中已经存在一个 `AdvancedMediaPlayer` 接口，它支持 `VLC` 和 `MP4` 格式。你需要让现有的 `MediaPlayer` 接口能够播放 `MP4` 格式，但 `MediaPlayer` 只支持 `MP3`。

你决定使用适配器模式，创建一个适配器让 `AdvancedMediaPlayer` 适配到 `MediaPlayer` 接口。

**任务要求：**

1. **简答题：** 请说明适配器模式在此场景中的作用，以及适配器模式与装饰者模式的区别。

2. **代码补全题：** 实现媒体播放器适配器：

```java
// 目标接口：媒体播放器
public interface MediaPlayer {
    void play(String audioType, String fileName);
}

// 被适配者接口：高级媒体播放器
public interface AdvancedMediaPlayer {
    void playVlc(String fileName);
    void playMp4(String fileName);
}

// 被适配者实现：VLC播放器
public class VlcPlayer implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String fileName) {
        System.out.println("播放 VLC 文件: " + fileName);
    }
    
    @Override
    public void playMp4(String fileName) {
        // VLC不支持MP4
    }
}

// 被适配者实现：MP4播放器
public class Mp4Player implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String fileName) {
        // MP4播放器不支持VLC
    }
    
    @Override
    public void playMp4(String fileName) {
        System.out.println("播放 MP4 文件: " + fileName);
    }
}

// 适配器：媒体适配器
public class MediaAdapter implements MediaPlayer {
    // ① 补全代码：持有高级媒体播放器引用
    // __________________________________;
    
    public MediaAdapter(String audioType) {
        if (audioType.equalsIgnoreCase("vlc")) {
            // ② 补全代码：创建VLC播放器
            // advancedPlayer = ________________;
        } else if (audioType.equalsIgnoreCase("mp4")) {
            // ③ 补全代码：创建MP4播放器
            // advancedPlayer = ________________;
        }
    }
    
    @Override
    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("vlc")) {
            // ④ 补全代码：调用VLC播放方法
            // advancedPlayer.________________;
        } else if (audioType.equalsIgnoreCase("mp4")) {
            // ⑤ 补全代码：调用MP4播放方法
            // advancedPlayer.________________;
        }
    }
}
```

**参考答案：**

1. **简答题答案：**
   - **适配器的作用**：让不兼容的接口能够协同工作，将 `AdvancedMediaPlayer` 的接口适配到 `MediaPlayer` 接口，使客户端可以统一使用 `MediaPlayer` 接口播放不同格式的媒体。
   - **与装饰者模式的区别**：
     - **适配器模式**：改变接口，让不兼容的接口能够协同工作，目的是接口转换。
     - **装饰者模式**：不改变接口，动态添加职责，目的是功能增强。

2. **代码补全答案：**
   ```java
   // ①
   private AdvancedMediaPlayer advancedPlayer;
   
   // ②
   advancedPlayer = new VlcPlayer();
   
   // ③
   advancedPlayer = new Mp4Player();
   
   // ④
   advancedPlayer.playVlc(fileName);
   
   // ⑤
   advancedPlayer.playMp4(fileName);
   ```

