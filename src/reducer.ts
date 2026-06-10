import type { Todo, TodoAction } from './types';

export const initialTodos: Todo[] = [
  { id: 1, text: '学习 React useReducer', completed: false },
  { id: 2, text: '搭建 Vite 项目', completed: true },
  { id: 3, text: '使用 Ant Design 组件库', completed: false },
];

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
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
