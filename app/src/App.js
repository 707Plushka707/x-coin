import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import FundingFee from './pages/FundingFee';

function App() {
  return (
    <div className="App">
      <Route path="/fee" component={FundingFee} />
    </div>
  );
}

export default App;
