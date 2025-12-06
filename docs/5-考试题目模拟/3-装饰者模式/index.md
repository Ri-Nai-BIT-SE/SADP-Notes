# 题目三：运行时添加职责（装饰者模式）

## 情景描述：游戏角色装备系统

你正在开发一款 RPG 游戏的装备系统。游戏中的角色（Character）可以装备各种装备（Equipment），如武器（Weapon）、护甲（Armor）、饰品（Accessory）等。每种装备都会增加角色的攻击力（Attack）和防御力（Defense），并且可以叠加。

如果使用继承来处理所有可能的装备组合（如"战士+长剑+重甲+护腕"），将导致类爆炸（需要为每种组合创建一个类）。

你决定采用**装饰者模式 (Decorator Pattern)**，将装备作为装饰者，动态地将属性（攻击力和防御力）附加到角色对象上，形成一种"俄罗斯套娃"式的包装结构。

**任务要求：**

1.  **画图题：** 请画出**装饰者模式**在游戏装备系统中的核心 **UML 类图**，展示 `Character`（抽象组件）、`Warrior`（具体组件）以及 `EquipmentDecorator`（抽象装饰者）和具体装饰者（如 `Sword`、`Armor`）之间的关系。

    *   **提示 UML 关系：** 抽象装饰者必须**继承**抽象组件（为了类型匹配），并且必须**持有**一个抽象组件的引用（为了包装）。请使用正确的 UML 符号表示继承关系（实线空心三角）和组合关系（实心菱形实线）。

2.  **代码补全题：** 补全客户端代码，模拟一个角色装备装备的流程，并展示装饰者模式如何层层封装对象。

```java
// 抽象组件：角色
public abstract class Character {
    protected int attack;
    protected int defense;
    protected String description;
    
    public abstract int getAttack();
    public abstract int getDefense();
    public abstract String getDescription();
}

// 具体组件：战士
public class Warrior extends Character {
    public Warrior() {
        this.attack = 10;
        this.defense = 5;
        this.description = "战士";
    }
    
    @Override
    public int getAttack() { return attack; }
    
    @Override
    public int getDefense() { return defense; }
    
    @Override
    public String getDescription() { return description; }
}

// 抽象装饰者：装备
public abstract class EquipmentDecorator extends Character {
    protected Character character;
    
    public EquipmentDecorator(Character character) {
        this.character = character;
    }
}

// 具体装饰者：长剑
public class Sword extends EquipmentDecorator {
    public Sword(Character character) {
        super(character);
    }
    
    @Override
    public int getAttack() {
        return character.getAttack() + 15; // 增加15点攻击力
    }
    
    @Override
    public int getDefense() {
        return character.getDefense();
    }
    
    @Override
    public String getDescription() {
        return character.getDescription() + " + 长剑";
    }
}

// 具体装饰者：重甲
public class Armor extends EquipmentDecorator {
    public Armor(Character character) {
        super(character);
    }
    
    @Override
    public int getAttack() {
        return character.getAttack();
    }
    
    @Override
    public int getDefense() {
        return character.getDefense() + 20; // 增加20点防御力
    }
    
    @Override
    public String getDescription() {
        return character.getDescription() + " + 重甲";
    }
}

// 客户端测试代码
public class GameTest {
    public static void main(String[] args) {
        // 创建一个战士
        Character warrior = new Warrior();
        
        // ① 补全代码：为战士装备长剑
        // warrior = new Sword(warrior);
        
        // ② 补全代码：再装备重甲
        // warrior = ____________________;
        
        System.out.println("角色描述：" + warrior.getDescription());
        System.out.println("攻击力：" + warrior.getAttack());
        System.out.println("防御力：" + warrior.getDefense());
    }
}
```

---

## 场景二：文本编辑器格式化系统

**情景描述：**

你正在开发一个文本编辑器，需要支持多种文本格式化功能，如加粗（Bold）、斜体（Italic）、下划线（Underline）等。这些格式化功能可以叠加使用，例如文本可以同时是"加粗+斜体+下划线"。

如果使用继承来处理所有可能的组合，会导致类爆炸。你决定采用**装饰者模式**，将格式化功能作为装饰者动态地附加到文本对象上。

**任务要求：**

1. **画图题：** 请画出装饰者模式在文本格式化系统中的 UML 类图，包含 `TextComponent`（抽象组件）、`PlainText`（具体组件）、`TextDecorator`（抽象装饰者）和至少两个具体装饰者类。

2. **代码补全题：** 补全文本格式化系统的核心代码：

```java
// 抽象组件：文本
public abstract class TextComponent {
    public abstract String format();
}

// 具体组件：纯文本
public class PlainText extends TextComponent {
    private String content;
    
    public PlainText(String content) {
        this.content = content;
    }
    
    @Override
    public String format() {
        return content;
    }
}

// 抽象装饰者
public abstract class TextDecorator extends TextComponent {
    protected TextComponent text;
    
    public TextDecorator(TextComponent text) {
        this.text = text;
    }
}

// 具体装饰者：加粗
public class BoldDecorator extends TextDecorator {
    public BoldDecorator(TextComponent text) {
        super(text);
    }
    
    @Override
    public String format() {
        // ① 补全代码：在原有格式基础上添加加粗标记
        // return "**" + ________________ + "**";
    }
}

// 具体装饰者：斜体
public class ItalicDecorator extends TextDecorator {
    public ItalicDecorator(TextComponent text) {
        super(text);
    }
    
    @Override
    public String format() {
        // ② 补全代码：在原有格式基础上添加斜体标记
        // return "*" + ________________ + "*";
    }
}

// 客户端测试
public class TextEditorTest {
    public static void main(String[] args) {
        TextComponent text = new PlainText("Hello World");
        
        // ③ 补全代码：添加加粗装饰
        // text = new BoldDecorator(text);
        
        // ④ 补全代码：再添加斜体装饰
        // text = new ItalicDecorator(text);
        
        System.out.println(text.format()); // 输出: * **Hello World** *
    }
}
```

**参考答案：**

```java
// ①
return "**" + text.format() + "**";

// ②
return "*" + text.format() + "*";

// ③
text = new BoldDecorator(text);

// ④
text = new ItalicDecorator(text);
```

---

## 场景三：咖啡订单系统（经典案例扩展）

**情景描述：**

你正在开发一个咖啡店的订单系统。基础咖啡有 `Espresso`（浓缩咖啡）和 `HouseBlend`（混合咖啡）。可以添加的调料包括 `Milk`（牛奶）、`Mocha`（摩卡）、`Whip`（奶泡）等，每种调料都会增加成本和描述。

**任务要求：**

1. **代码补全题：** 补全咖啡订单系统的完整实现：

```java
// 抽象组件：饮料
public abstract class Beverage {
    protected String description = "未知饮料";
    
    public String getDescription() {
        return description;
    }
    
    public abstract double cost();
}

// 具体组件：浓缩咖啡
public class Espresso extends Beverage {
    public Espresso() {
        description = "浓缩咖啡";
    }
    
    @Override
    public double cost() {
        return 1.99;
    }
}

// 抽象装饰者：调料
public abstract class CondimentDecorator extends Beverage {
    protected Beverage beverage;
    
    public CondimentDecorator(Beverage beverage) {
        this.beverage = beverage;
    }
    
    public abstract String getDescription();
}

// 具体装饰者：牛奶
public class Milk extends CondimentDecorator {
    public Milk(Beverage beverage) {
        super(beverage);
    }
    
    @Override
    public String getDescription() {
        // ① 补全代码：在原有描述基础上添加"牛奶"
        // return beverage.getDescription() + ________________;
    }
    
    @Override
    public double cost() {
        // ② 补全代码：在原有价格基础上增加0.10
        // return beverage.cost() + ________________;
    }
}

// 具体装饰者：摩卡
public class Mocha extends CondimentDecorator {
    public Mocha(Beverage beverage) {
        super(beverage);
    }
    
    @Override
    public String getDescription() {
        return beverage.getDescription() + ", 摩卡";
    }
    
    @Override
    public double cost() {
        return beverage.cost() + 0.20;
    }
}

// 客户端测试
public class CoffeeTest {
    public static void main(String[] args) {
        // ③ 补全代码：创建一杯浓缩咖啡
        Beverage beverage = new Espresso();
        
        // ④ 补全代码：添加牛奶
        // beverage = new Milk(beverage);
        
        // ⑤ 补全代码：再添加摩卡
        // beverage = new Mocha(beverage);
        
        System.out.println(beverage.getDescription() + " ￥" + beverage.cost());
    }
}
```

**参考答案：**

```java
// ①
return beverage.getDescription() + ", 牛奶";

// ②
return beverage.cost() + 0.10;

// ③
Beverage beverage = new Espresso();

// ④
beverage = new Milk(beverage);

// ⑤
beverage = new Mocha(beverage);
```

