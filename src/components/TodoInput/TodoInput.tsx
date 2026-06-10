import { Button, Input, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './TodoInput.css';

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export default function TodoInput({ value, onChange, onAdd }: TodoInputProps) {
  return (
    <Space.Compact className="todo-input">
      <Input
        placeholder="输入待办事项..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPressEnter={onAdd}
      />
      <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
        添加
      </Button>
    </Space.Compact>
  );
}