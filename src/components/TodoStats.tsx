import { Tag, Typography } from 'antd';

const { Text } = Typography;

interface TodoStatsProps {
  totalCount: number;
  completedCount: number;
}

export default function TodoStats({ totalCount, completedCount }: TodoStatsProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text type="secondary">
        共 {totalCount} 项，已完成 {completedCount} 项
      </Text>
      {completedCount === totalCount && totalCount > 0 && <Tag color="success">全部完成！</Tag>}
    </div>
  );
}