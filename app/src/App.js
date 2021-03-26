import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import FundingFee from './pages/FundingFee';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Route path="/fee" component={FundingFee} />
      <Route path="/home" component={Home} />
    </div>
  );
}

export default App;
