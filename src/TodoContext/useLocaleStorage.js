import React from "react";

function useLocaleStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = [];
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem);
        }

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }, 2000);
  },[]);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return [{ item, saveItem, loading, error }];
}

export { useLocaleStorage };


// localStorage.removeItem('TODOS_V1');
// const defaultTodos = [
//   { text: "cortar cebollas", completed: false },
//   { text: "tomar curso de intro a reactjs", completed: false },
//   { text: "llorar con la llorona", completed: false },
//   { text: "otro task", completed: false },
//   { text: "llala", completed: false },
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
