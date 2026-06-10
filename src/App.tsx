import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <TodoList />
    </ConfigProvider>
  );
}

export default App;
