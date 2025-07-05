# 仓库管理系统-Vue前端

## 项目依赖安装
```
npm install
```
### 开发模式运行（带热重载）
```
npm run serve
```
### 生产环境构建（代码压缩优化）
```
npm run build
```
### 代码规范检查与自动修复
```
npm run lint
```
# 前端项目结构

## 目录结构说明

### 核心目录
- **src/** - 项目主要源代码
  - `assets/` - 存放图片、字体等静态资源
  - `components/` - 可复用的UI组件
  - `router/` - 路由配置和
  - `stores/` - 状态管理模块
### 配置文件
- **构建配置**
  - `package.json` - 依赖管理和NPM脚本
### 特殊文件
- `public/` - 直接复制到构建输出的静态资源
- `App.vue` - Vue应用根组件
- `main.js` - 应用初始化入口文件