import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { List } from './List'

function App() {
  const [colors, setColors] = useState([
    {
      newIndex: 1,
      color: "red"
    },

    {
      newIndex: 2,
      color: "green"
    },

    {
      newIndex: 3,
      color: "blue"
    },

    {
      newIndex: 4,
      color: "yellow"
    },

    {
      newIndex: 5,
      color: "orange"
    },

    {
      newIndex: 6,
      color: "black"
    }
  ]);
  return (
    <div className="App">
      <List colors={colors} />
    </div>
  );
}

export default App;
