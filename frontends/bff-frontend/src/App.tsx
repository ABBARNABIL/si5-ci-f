import React from 'react';
import ItemCard from './Components/ItemCard';
import SideBar from './Components/SideBar';
import './App.css';
import CartBar from './Components/CartBar';

function App() {
  return (
    <div className="App">
      <SideBar />
      <ItemCard />
      <CartBar />
    </div>
  );
}

export default App;
