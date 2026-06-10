import { Button, Checkbox, Input, List, Popconfirm, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { Todo } from '../../types';
import './TodoItem.css';

const { Text } = Typography;

interface TodoItemProps {
  todo: Todo;
  editing: boolean;
  editValue: string;
  onToggle: (id: number) => void;
  onStartEdit: (id: number, text: string) => void;
  onEditValueChange: (value: string) => void;
  onConfirmEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({
  todo,
  editing,
  editValue,
  onToggle,
  onStartEdit,
  onEditValueChange,
  onConfirmEdit,
  onCancelEdit,
  onDelete,
}: TodoItemProps) {
  return (
    <List.Item
      actions={
        editing
          ? [
              <Button
                type="text"
                icon={<CheckOutlined />}
                onClick={onConfirmEdit}
                key="save"
              />,
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={onCancelEdit}
                key="cancel"
              />,
            ]
          : [
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => onStartEdit(todo.id, todo.text)}
                key="edit"
              />,
              <Popconfirm
                title="确认删除"
                description="确定要删除这条待办吗？"
                onConfirm={() => onDelete(todo.id)}
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
        avatar={<Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />}
        title={
          editing ? (
            <Input
              value={editValue}
              onChange={(e) => onEditValueChange(e.target.value)}
              onPressEnter={onConfirmEdit}
              autoFocus
            />
          ) : (
            <Text
              className="todo-item-text"
              delete={todo.completed}
              type={todo.completed ? 'secondary' : undefined}
            >
              {todo.text}
            </Text>
          )
        }
      />
    </List.Item>
  );
}