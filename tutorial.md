# React + TypeScript + Vite TodoList 教学项目

本项目是一个用于教学 `useReducer` 和 Vite 配置的前端示例，使用 React 18 + TypeScript + Ant Design 构建了一个简单的 TodoList 应用。

---

## 目录

1. [项目初始化](#1-项目初始化)
2. [Vite 配置详解](#2-vite-配置详解)
3. [安装 Ant Design](#3-安装-ant-design)
4. [useReducer 核心概念](#4-usereducer-核心概念)
5. [TodoList 实现步骤](#5-todolist-实现步骤)
6. [运行项目](#6-运行项目)

---

## 1. 项目初始化

Vite 是下一代前端构建工具，具有极速的冷启动和热更新（HMR）。

### 使用 npm create vite 创建项目

```bash
npm create vite@latest todolist-app -- --template react-ts
```

参数说明：
- `todolist-app`：项目名称
- `--template react-ts`：使用 React + TypeScript 模板

创建完成后，进入项目目录并安装依赖：

```bash
cd todolist-app
npm install
```

### 项目目录结构

```
todolist-app/
├── public/              # 静态资源
├── src/
│   ├── assets/          # 图片等资源
│   ├── App.tsx          # 根组件
│   ├── main.tsx         # 入口文件
│   ├── index.css        # 全局样式
│   └── vite-env.d.ts    # Vite 类型声明
├── index.html           # HTML 模板
├── package.json
├── tsconfig.json        # TypeScript 配置
├── tsconfig.app.json    # 应用 TS 配置
├── tsconfig.node.json   # Node 端 TS 配置
└── vite.config.ts       # Vite 配置文件
```

---

## 2. Vite 配置详解

Vite 的核心配置文件是 `vite.config.ts`。初始化后的默认配置如下：

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
```

### 常用配置项扩展

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // 路径别名，简化模块导入
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
  },
  // 构建输出配置
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

### 配置项说明

| 配置项 | 作用 |
|--------|------|
| `plugins` | 加载 Vite 插件，如 `@vitejs/plugin-react` 提供 React 支持 |
| `resolve.alias` | 设置路径别名，`@/components` 指向 `./src/components` |
| `server.port` | 开发服务器端口，默认 5173 |
| `server.open` | 启动时自动打开浏览器 |
| `build.outDir` | 构建产物输出目录，默认 `dist` |
| `build.sourcemap` | 生成 source map 便于调试 |

---

## 3. 安装 Ant Design

Ant Design（antd）是 React 生态中最流行的 UI 组件库之一。

```bash
npm install antd
```

在 `main.tsx` 中引入样式（可选，Vite 会自动处理 CSS）：

```tsx
import 'antd/dist/reset.css'; // v5 版本使用 CSS-in-JS，通常无需手动引入
```

本示例使用了以下 antd 组件：
- `Card`：卡片容器
- `Input`：输入框
- `Button`：按钮
- `List`：列表
- `Checkbox`：复选框
- `Typography`：排版
- `Space`：间距
- `Popconfirm`：确认气泡
- `Empty`：空状态
- `Tag`：标签
- `Divider`：分割线
- `ConfigProvider`：全局配置（用于设置中文语言包）

---

## 4. useReducer 核心概念

`useReducer` 是 React 提供的一个 Hook，用于管理**复杂的状态逻辑**。当状态更新逻辑涉及多个子值，或者下一个状态依赖于之前的状态时，`useReducer` 比 `useState` 更合适。

### 基本语法

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- `state`：当前状态
- `dispatch`：发送 action 的函数
- `reducer`：纯函数，接收当前状态和 action，返回新状态
- `initialState`：初始状态

### 三大核心要素

#### 1. State（状态）

```typescript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const initialTodos: Todo[] = [
  { id: 1, text: '学习 React useReducer', completed: false },
];
```

#### 2. Action（动作）

Action 是一个描述发生了什么的普通对象，必须包含 `type` 字段。

```typescript
type TodoAction =
  | { type: 'ADD'; payload: string }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'DELETE'; payload: number }
  | { type: 'EDIT'; payload: { id: number; text: string } };
```

#### 3. Reducer（纯函数）

Reducer 接收当前状态和一个 action，返回新的状态。**永远不要直接修改原状态**，而是返回一个新对象。

```typescript
function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.payload);
    case 'EDIT':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo,
      );
    default:
      return state;
  }
}
```

### useReducer vs useState

| 场景 | 推荐方案 |
|------|---------|
| 简单状态（字符串、数字、布尔值） | `useState` |
| 复杂状态（对象、数组，多字段联动） | `useReducer` |
| 状态更新逻辑复杂，涉及多个子操作 | `useReducer` |
| 需要集中管理状态更新逻辑 | `useReducer` |
| 需要可预测的状态流转（便于测试） | `useReducer` |

---

## 5. TodoList 实现步骤

### 步骤 1：定义类型（types.ts）

将类型定义独立出来，提高代码可维护性：

```typescript
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type TodoAction =
  | { type: 'ADD'; payload: string }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'DELETE'; payload: number }
  | { type: 'EDIT'; payload: { id: number; text: string } };
```

### 步骤 2：编写 Reducer（reducer.ts）

```typescript
import { Todo, TodoAction } from './types';

export const initialTodos: Todo[] = [
  { id: 1, text: '学习 React useReducer', completed: false },
  { id: 2, text: '搭建 Vite 项目', completed: true },
  { id: 3, text: '使用 Ant Design 组件库', completed: false },
];

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.payload);
    case 'EDIT':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    default:
      return state;
  }
}
```

### 步骤 3：构建 UI 组件（TodoList.tsx）

核心 Hook 使用：

```tsx
const [todos, dispatch] = useReducer(todoReducer, initialTodos);
```

添加待办：

```tsx
dispatch({ type: 'ADD', payload: '新事项' });
```

切换完成状态：

```tsx
dispatch({ type: 'TOGGLE', payload: todoId });
```

删除待办：

```tsx
dispatch({ type: 'DELETE', payload: todoId });
```

编辑待办：

```tsx
dispatch({ type: 'EDIT', payload: { id: todoId, text: '新内容' } });
```

### 步骤 4：组装 App（App.tsx）

使用 `ConfigProvider` 包裹应用，设置中文语言包：

```tsx
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import TodoList from './TodoList';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <TodoList />
    </ConfigProvider>
  );
}
```

---

## 6. 运行项目

### 开发模式

```bash
npm run dev
```

Vite 启动极快，默认监听 `http://localhost:5173`。

### 构建生产版本

```bash
npm run build
```

产物输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

---

## 总结

本项目演示了：

1. **Vite 项目初始化**：一行命令搭建 React + TypeScript 项目
2. **Vite 配置**：通过 `vite.config.ts` 自定义路径别名、端口等
3. **useReducer 使用**：用 Reducer 模式管理列表状态，代码更清晰、易于测试
4. **Ant Design 集成**：使用成熟的 UI 组件快速构建界面

`useReducer` 的核心思想是：**将所有状态变更逻辑集中到 Reducer 函数中**，组件只需通过 `dispatch` 发送意图，不用关心状态如何计算。这种模式在大型应用中尤为重要，配合 Context API 可以实现全局状态管理。
