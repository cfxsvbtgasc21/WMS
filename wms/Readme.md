
# WMS-后端项目结构说明

## 一、Maven 构建命令（生成 Target 及依赖）

### 1. 清理项目
```
mvn clean
```

### 2. 编译主代码
```
mvn compile
```

### 3. 打包项目（生成可执行 JAR，含所有依赖）
```
mvn package
```
### 4. 运行 Spring Boot 项目（直接启动，无需打包）
```
mvn spring-boot:run
```
### 5. 安装到本地 Maven 仓库（供其他模块引用）
```
mvn install
```
## 二、Spring Boot 框架结构

### 项目目录结构
```
wms/
├── .mvn/                
├── src/
│   ├── main/
│   │   ├── java/        # 主代码
│   │   │   └── com/wms/ # 根包
│   │   │       ├── common/     # 公共工具
│   │   │       ├── config/     # 配置类
│   │   │       ├── controller/ # 控制器
│   │   │       ├── entity/     # 实体类
│   │   │       ├── mapper/     # 数据访问层
│   │   │       ├── service/    # 服务层
│   │   │       └── WmsApplication.java # 启动类
│   │   ├── resources/   # 资源文件
│   │   │   ├── mapper/   # MyBatis XML 映射文件
│   │   │   ├── static/   # 静态资源
│   │   │   ├── templates/ # 模板文件
│   │   │   └── application.yml # 主配置文件（YAML 格式，配置服务器、数据库等）
│   ├── test/            # 测试代码
│   └── sql/             # 数据库脚本
├── target/              # 构建输出
└── pom.xml              # Maven 配置
```

### 各目录功能说明

#### 1. `src/main/java/com/wms` 包
- **common**：复用代码（工具类）。  
- **config**：配置类。  
- **controller**：暴露 API 接口（`@GetMapping`/`@PostMapping`，调用 service 层）。  
- **entity**：数据库表映射。  
- **mapper**：数据访问。  
- **service**：业务逻辑。  
- **WmsApplication**：启动类，通过 `SpringApplication.run()` 加载 Spring 上下文。

#### 2. `src/main/resources` 目录
- **mapper**：MyBatis SQL 映射文件。  
- **static**：静态资源。  
- **templates**：模板引擎文件。  
- **application.yml**：核心配置（注意要根据自己数据库配置信息修改）：  
```
server:
  port: 8090
  address: 0.0.0.0
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/wms02?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 123456
mybatis-plus:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.wms.entity
  global-config:
    db-config:
      id-type: auto
Logging:
  level:
    com.wms: debug
```

#### 3. `src/test` 目录
- 编写单元测试和集成测试。

#### 4. `sql` 目录
- 存放建表语句在构建时初始化数据库。
