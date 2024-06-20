import type { FC } from 'react';
import './App.css';

import { data } from './mock/data';
import Test from './components/test/Test';

const App: FC = () => {
  // const [data, setData] = useState<ITest | null>(null)
  
  // useEffect(() => {
  //     Получить данные с бэкенда
  //     setData(data)
  // }, [])

  return (
    <div className="App">
      <Test data={data} />
    </div>
  );
}

export default App;
