## 客户-服务器模型 (Client-Server Model)

- **客户端 (Client)**：请求服务的应用程序
- **服务器 (Server)**：提供服务的应用程序
- **通信方式**：通过网络进行通信，通常使用 RPC（远程过程调用）或 REST API

**核心特点**：
- **分离关注点**：客户端负责用户界面和交互，服务器负责业务逻辑和数据存储
- **集中管理**：服务器集中管理资源和数据
- **可扩展性**：可以支持多个客户端同时访问

### 架构图

```
┌─────────────┐        网络          ┌─────────────┐
│  客户端 1   │ ◄─────────────────► │             │
└─────────────┘                     │             │
┌─────────────┐                     │   服务器    │
│  客户端 2   │ ◄─────────────────► │             │
└─────────────┘                     │             │
┌─────────────┐                     │             │
│  客户端 3   │ ◄─────────────────► │             │
└─────────────┘                     └─────────────┘
```

### 典型示例

#### 1. Camelot 系统

**Camelot** 是一个基于客户-服务器模型的分布式系统。

**系统特点**：
- 利用**本地过程调用 (LPC)** 和**远程过程调用 (RPC)** 在应用程序和服务器之间提供通信
- 客户端应用程序通过 RPC 调用服务器提供的服务
- 服务器处理业务逻辑和数据管理

**通信流程**：

```
客户端应用程序
    ↓ 发起 RPC 调用
本地 RPC 存根 (Stub)
    ↓ 网络传输
服务器 RPC 骨架 (Skeleton)
    ↓ 调用实际服务
服务器应用程序
    ↓ 返回结果
```

**代码示例**（简化版）：

```java
// 服务器端：定义服务接口
public interface DataService {
    String getData(String key);
    void setData(String key, String value);
}

// 服务器端：实现服务
public class DataServiceImpl implements DataService {
    private Map<String, String> dataStore = new HashMap<>();
    
    public String getData(String key) {
        return dataStore.get(key);
    }
    
    public void setData(String key, String value) {
        dataStore.put(key, value);
    }
}

// 客户端：通过 RPC 调用服务器
public class Client {
    private DataService dataService; // RPC 代理
    
    public void fetchData() {
        // 客户端调用看起来像本地调用，实际通过网络执行
        String value = dataService.getData("key1");
        System.out.println("Received: " + value);
    }
}
```

#### 2. Web 应用（HTTP 客户-服务器）

最常见的客户-服务器模型应用：

```
浏览器 (客户端)
    ↓ HTTP 请求
Web 服务器 (服务器)
    ↓ 处理请求
数据库
    ↓ 返回响应
浏览器 (显示结果)
```

**示例**：访问网页

1. **客户端**：浏览器发送 HTTP GET 请求
   ```
   GET /index.html HTTP/1.1
   Host: www.example.com
   ```

2. **服务器**：Web 服务器处理请求，返回 HTML 页面
   ```
   HTTP/1.1 200 OK
   Content-Type: text/html
   <html>...</html>
   ```

3. **客户端**：浏览器渲染 HTML 页面

#### 3. 数据库系统

```
应用程序 (客户端)
    ↓ SQL 查询
数据库服务器 (服务器)
    ↓ 执行查询
数据库
    ↓ 返回结果集
应用程序
```

### 客户-服务器模型的优势

1. **集中管理**：数据和业务逻辑集中在服务器，便于管理和维护
2. **安全性**：服务器可以集中实施安全策略
3. **可扩展性**：可以支持大量客户端
4. **资源共享**：多个客户端共享服务器资源

### 客户-服务器模型的挑战

1. **单点故障**：服务器故障会影响所有客户端
2. **网络依赖**：客户端依赖网络连接
3. **性能瓶颈**：服务器可能成为性能瓶颈
4. **可扩展性限制**：服务器需要处理所有客户端请求

### 变体：多层客户-服务器架构

为了克服单层客户-服务器的限制，发展出多层架构：

```
客户端 (表示层)
    ↓
应用服务器 (业务逻辑层)
    ↓
数据库服务器 (数据层)
```

这种架构将业务逻辑从客户端和数据库服务器中分离出来，提高了系统的可维护性和可扩展性。

