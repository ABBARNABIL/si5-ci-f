import React from 'react';
import ItemCard from './Components/ItemCard';
import SideBar from './Components/SideBar';
import './App.css';
import CartBar from './Components/CartBar';
import OrderScreen from './screens/OrderScreen';

function App() {
  return (
    <div className="App">
      <OrderScreen/>
    </div>
  );
}

export default App;
