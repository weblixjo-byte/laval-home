import React from 'react';
import Properties from './Properties';

// Inventory route seamlessly bridges to the modern Properties portfolio
const Inventory = (props) => {
  return <Properties {...props} />;
};

export default Inventory;
