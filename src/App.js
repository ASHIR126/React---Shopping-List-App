import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  // HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
  const [items, setItems] = useState([
    { itemName: "item 1", quantity: 1, isSelected: false },
    { itemName: "item 2", quantity: 6, isSelected: false },
    { itemName: "item 3", quantity: 9, isSelected: false }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [totalValue,setTotalValue] = useState(9);

  const inputHandler = (e) => {
    setInputValue(e.target.value)
  };

  const handleAddButton = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    }

    const newItems = [...items, newItem]
    setItems(newItems);
    setInputValue('')
  };

  const increamentValue = (index) => {
    const newItems = [...items];
    newItems[index].quantity++;
    setItems(newItems)
    calculateQuantities()
  };

  const decreamentValue = (index) => {
    const newItems = [...items];
    newItems[index].quantity--;
    setItems(newItems);

    calculateQuantities();
  };

  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };
  const calculateQuantities = () => {
    const totalValue = items.reduce((total, item) => {
      return total + item.quantity;
    });
    setTotalValue(totalValue);
  }


  return (
    <div className='app-background'>
      <div className='main-container'>
        <div className='add-item-box'>
          <input value={inputValue} onChange={inputHandler} className='add-item-input' placeholder='Add an item...' />
          <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButton()} />
        </div>
        <div className='item-list'>

          {items.map((item, index) => (
            <div className='item-container' key={index}>
              <div className='item-name' onClick={() => toggleComplete(index)}>
                {/* HINT: replace false with a boolean indicating the item has been completed or not */}
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className='completed'>{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className='quantity'>
                <button>
                  <FontAwesomeIcon icon={faChevronLeft} onClick={() => decreamentValue(index)} />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon icon={faChevronRight} onClick={() => increamentValue(index)} />
                </button>
              </div>
            </div>
          ))}

        </div>
        <div className='total'>Total: {calculateQuantities}</div>
      </div>
    </div>
  );
};

export default App;