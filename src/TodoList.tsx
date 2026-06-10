import { useReducer, useState } from 'react';
import {
  Card,
  Input,
  Button,
  List,
  Checkbox,
  Typography,
  Space,
  Popconfirm,
  Empty,
  Tag,
  Divider,
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { todoReducer, initialTodos } from './reducer';

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

      <Space.Compact style={{ width: '100%', marginBottom: 24 }}>
        <Input
          placeholder="输入待办事项..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleAdd}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加
        </Button>
      </Space.Compact>

      <Divider />

      {todos.length === 0 ? (
        <Empty description="暂无待办事项" />
      ) : (
        <List
          dataSource={todos}
          renderItem={(todo) => (
            <List.Item
              actions={
                editingId === todo.id
                  ? [
                      <Button
                        type="text"
                        icon={<CheckOutlined />}
                        onClick={confirmEdit}
                        key="save"
                      />,
                      <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={cancelEdit}
                        key="cancel"
                      />,
                    ]
                  : [
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => startEdit(todo.id, todo.text)}
                        key="edit"
                      />,
                      <Popconfirm
                        title="确认删除"
                        description="确定要删除这条待办吗？"
                        onConfirm={() => handleDelete(todo.id)}
                        okText="删除"
                        cancelText="取消"
                        key="delete"
                      >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                      </Popconfirm>,
                    ]
              }
            >
              <List.Item.Meta
                avatar={
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                  />
                }
                title={
                  editingId === todo.id ? (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onPressEnter={confirmEdit}
                      autoFocus
                    />
                  ) : (
                    <Text
                      delete={todo.completed}
                      type={todo.completed ? 'secondary' : undefined}
                      style={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                      }}
                    >
                      {todo.text}
                    </Text>
                  )
                }
              />
            </List.Item>
          )}
        />
      )}

      <Divider />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text type="secondary">
          共 {totalCount} 项，已完成 {completedCount} 项
        </Text>
        {completedCount === totalCount && totalCount > 0 && (
          <Tag color="success">全部完成！</Tag>
        )}
      </div>
    </Card>
  );
}
