---
layout: home
title: 软件体系结构与设计模式
description: 软件体系结构与设计模式课程笔记 - 涵盖创建型、结构型、行为型设计模式以及软件体系结构风格
hero:
  name: 软件体系结构与设计模式
  text: SADP-Notes
  tagline: 课程笔记
  actions:
    - theme: brand
      text: 开始阅读
      link: /1-创造型模式/
    - theme: alt
      text: 查看源码
      link: https://github.com/Ri-Nai-BIT-SE/SADP-Notes
features:
  - title: 设计模式
    details: 涵盖 GoF 23 种设计模式中的核心模式，包括创建型、结构型和行为型模式
    link: /创造型模式/
  - title: 软件体系结构风格
    details: 深入理解管道与过滤器、分层架构、事件系统等经典架构风格
    link: /4-软件体系结构风格/
  - title: 实战案例
    details: 每个模式都配有详细的课件案例和实现探讨，案例主要来自《Head First 设计模式》
    link: /1-创造型模式/1-单例模式/
---
根据您提供的五份PDF课件内容，以下是课程中涵盖的**设计模式（Design Patterns）**以及**软件体系结构风格（Architectural Styles）**的详细总结：

### 一、 设计模式 (Design Patterns)

这些模式主要出自《设计模式：可复用面向对象软件的基础》（GoF）一书，课件中按照创建型、结构型和行为型进行了分类讲解。

> **📚 参考书目说明：** 本课程中的设计模式案例和示例主要来源于《Head First 设计模式》（Head First Design Patterns）一书。该书以生动有趣的案例（如巧克力工厂、Pizza店、星巴克咖啡、鸭子模拟器等）深入浅出地讲解设计模式，是学习设计模式的优秀入门教材。

#### 1. 创建型模式 (Creational Patterns)
*   **[单例模式 (Singleton Pattern)](/1-创造型模式/1-单例模式/)**
    *   **核心概念：** 确保一个类只有一个实例，并提供一个全局访问点。
    *   **课件案例：** 巧克力工厂的锅炉控制（ChocolateBoiler）。
    *   **实现探讨：** 懒汉式、饿汉式（急切创建）、同步方法（synchronized）、双重检查加锁（Double-Checked Locking）。
*   **[简单工厂 (Simple Factory)](/1-创造型模式/2-简单工厂/)**
    *   **核心概念：** 由一个工厂对象决定创建出哪一种产品类的实例（通常作为工厂模式的入门介绍）。
    *   **课件案例：** Pizza店根据类型（Cheese, Greek, Pepperoni）创建Pizza对象。
*   **[工厂方法模式 (Factory Method)](/1-创造型模式/3-工厂方法模式/)**
    *   **核心概念：** 定义一个创建对象的接口，但由子类决定要实例化的类是哪一个。将实例化推迟到子类。
    *   **课件案例：** 纽约风味Pizza店（NYStylePizzaStore）和芝加哥风味Pizza店，各自实现创建不同口味的Pizza。
*   **[抽象工厂模式 (Abstract Factory)](/1-创造型模式/4-抽象工厂模式/)**
    *   **核心概念：** 提供一个接口，用于创建相关或依赖对象的家族，而不需要明确指定具体类。
    *   **课件案例：** Pizza原料工厂（创建面团、酱料、芝士等一系列原料族）；生产电脑配件（鼠标、键盘）的工厂。

#### 2. 结构型模式 (Structural Patterns)
*   **[装饰者模式 (Decorator Pattern)](/2-结构型模式/1-装饰者模式/)**
    *   **核心概念：** 动态地将责任附加到对象上。若要扩展功能，装饰者提供了比继承更有弹性的替代方案。
    *   **课件案例：** 星巴克咖啡（Beverage），通过加入调料（Mocha, Milk, Soy, Whip）来计算价格和描述；Java I/O流的设计。
*   **[适配器模式 (Adapter Pattern)](/2-结构型模式/2-适配器模式/)**
    *   **核心概念：** 将一个类的接口转换成客户期望的另一个接口。让原本接口不兼容的类可以合作。
    *   **课件案例：** 动物图形编辑器，将 `Tiger` 类的接口适配成 `Toolkit` 期望的接口；对象适配器与类适配器的对比。
*   **[代理模式 (Proxy Pattern)](/2-结构型模式/3-代理模式/)**
    *   **核心概念：** 为另一个对象提供一个替身或占位符以控制对这个对象的访问。
    *   **课件案例：** 图像加载（ImageProxy），在图片实际加载完成前显示占位，加载完成后显示真实图片。

#### 3. 行为型模式 (Behavioral Patterns)
*   **[策略模式 (Strategy Pattern)](/3-行为型模式/1-策略模式/)**
    *   **核心概念：** 定义算法族，分别封装起来，让他们之间可以互相替换，让算法的变化独立于使用算法的客户。
    *   **课件案例：** 鸭子模拟器（SimUDuck）。将"飞行行为"（FlyBehavior）和"叫声行为"（QuackBehavior）封装成接口，鸭子类通过组合（Composition）而非继承来使用这些行为。
*   **[观察者模式 (Observer Pattern)](/3-行为型模式/2-观察者模式/)**
    *   **核心概念：** 定义对象间的一对多依赖，当一个对象改变状态时，所有依赖者都会收到通知并自动更新。
    *   **课件案例：** 气象站（WeatherStation）。WeatherData 是主题（Subject），目前的状况、统计数据、天气预报板是观察者（Observer）。
*   **[状态模式 (State Pattern)](/3-行为型模式/3-状态模式/)**
    *   **核心概念：** 允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类。
    *   **课件案例：** TCP连接（TCPConnection）。根据状态（Established, Listening, Closed）对 Open、Close 等请求做出不同反应。
*   **[解释器模式 (Interpreter Pattern)](/3-行为型模式/4-解释器模式/)**
    *   **核心概念：** 给定一个语言，定义它的文法表示，并定义一个解释器，使用该表示来解释语言中的句子。
    *   **课件案例：** 正则表达式的解释、布尔表达式求值。

---

### 二、 软件体系结构风格 (Software Architectural Styles)

课件专门有一部分（第5个PDF）讨论了比设计模式更高层面的架构风格，主要通过 **KWIC（KeyWord In Context）** 索引系统作为案例来对比不同风格。

1.  **[管道与过滤器 (Pipes and Filters)](/4-软件体系结构风格/1-管道与过滤器/)**
    *   **特点：** 数据流驱动，组件作为过滤器处理数据流，通过管道连接。
    *   **案例：** 编译器架构（词法分析->语法分析->语义分析...）、Unix Shell 命令。
2.  **[主程序/子程序 (Main Program and Subroutine)](/4-软件体系结构风格/2-主程序-子程序/)**
    *   **特点：** 典型的层次化分解，单线程控制，通过调用/返回机制交互。
    *   **变体：** 面向对象风格（Object-Oriented Organization），强调数据封装和对象交互。
3.  **[分层架构 (Layered Architecture)](/4-软件体系结构风格/3-分层架构/)**
    *   **特点：** 系统被组织成层次结构，每层只为上层提供服务。
    *   **案例：** TCP/IP 协议栈、Java 虚拟机 (JVM)、3层 C/S 架构（表现层、业务逻辑层、数据层）。
4.  **[事件系统 (Event Systems) / 隐式调用 (Implicit Invocation)](/4-软件体系结构风格/4-事件系统/)**
    *   **特点：** 组件广播事件，其他组件注册感兴趣的事件，通过事件分发器进行交互，降低耦合。
    *   **案例：** 现代IDE环境、GUI系统。
5.  **[数据中心/仓库风格 (Data-centered / Repository)](/4-软件体系结构风格/5-数据中心-仓库风格/)**
    *   **特点：** 中央数据结构被多个独立构件访问。
    *   **案例：** 共享数据的KWIC实现方案。
6.  **[批处理序列 (Batch Sequential)](/4-软件体系结构风格/6-批处理序列/)**
    *   **特点：** 每一步完全结束后，下一步才开始，数据作为一个整体传递。

### 总结核心设计原则 (课件中反复强调)
*   **封装变化 (Encapsulate what varies)**
*   **多用组合，少用继承 (Favor composition over inheritance)**
*   **针对接口编程，不针对实现编程 (Program to an interface, not an implementation)**
*   **为了交互对象之间的松耦合设计而努力 (Strive for loosely coupled design between objects that interact)**
