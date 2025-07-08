import Header from './Header';
import Discover from './Discover';
import { DataContextProvider } from './context/DataContext';

function App() {

  return (
    <div className="App">
        <DataContextProvider>
          <Header />
          <Discover />
        </DataContextProvider>
    </div>
  );
}

export default App;
