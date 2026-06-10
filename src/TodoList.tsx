import { useReducer, useState } from 'react';
import { Card, List, Typography, Empty, Divider } from 'antd';
import { todoReducer, initialTodos } from './reducer';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import TodoStats from './components/TodoStats';

const { Title, Text } = Typography;

export default function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    dispatch({ type: 'ADD', payload: trimmed });
    setInputValue('');
  };

  const handleToggle = (id: number) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditValue(text);
  };

  const confirmEdit = () => {
    if (editingId === null) return;
    const trimmed = editValue.trim();
    if (!trimmed) return;
    dispatch({ type: 'EDIT', payload: { id: editingId, text: trimmed } });
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <Card style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        TodoList
      </Title>

      <TodoInput value={inputValue} onChange={setInputValue} onAdd={handleAdd} />

      <Divider />

      {todos.length === 0 ? (
        <Empty description="暂无待办事项" />
      ) : (
        <List
          dataSource={todos}
          renderItem={(todo) => (
            <TodoItem
              todo={todo}
              editing={editingId === todo.id}
              editValue={editValue}
              onToggle={handleToggle}
              onStartEdit={startEdit}
              onEditValueChange={setEditValue}
              onConfirmEdit={confirmEdit}
              onCancelEdit={cancelEdit}
              onDelete={handleDelete}
            />
          )}
        />
      )}

      <Divider />

      <TodoStats totalCount={totalCount} completedCount={completedCount} />
    </Card>
  );
}
