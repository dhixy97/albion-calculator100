import { useState, useContext, createContext, useEffect } from "react";

const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [selectFood, setSelectFood] = useState(null);
  const [premium, setPremium] = useState(true);
  const [sellTax, setSellTax] = useState(true);
  const [buyTax, setBuyTax] = useState(false);
  const [returnRate, setReturnRate] = useState(0.153)

  const addFoodRecipes = (newRecipes) => {
    setFoodRecipes((prev) => {
      const existingIndex = prev.findIndex(
        (r) => r.uniqueName === newRecipes.uniqueName,
      );
      let update;
      if (existingIndex !== -1) {
        update = [...prev];
        update[existingIndex].quantity += newRecipes.quantity;
      }else{
        update = [...prev, newRecipes]
      }

      return update
    });
  };

  const removeRecipes = (uniqueName) => {
    setFoodRecipes((prev) => {
        const update = prev.filter((r) => r.uniqueName !== uniqueName)
        return update
    })
  }

  const clearAll = () => {
    setFoodRecipes([])
  } 

  return (
    <FoodContext.Provider
      value={{
        foodRecipes,
        setFoodRecipes,
        selectFood,
        setSelectFood,
        premium,
        setPremium,
        sellTax,
        setSellTax,
        buyTax,
        setBuyTax,
        addFoodRecipes,
        returnRate,
        setReturnRate,
        removeRecipes,
        clearAll
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function UseFoodrecipes() {
  return useContext(FoodContext);
}
