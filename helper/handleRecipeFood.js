const handleAddRecipeFood = () => {
    if(!selectedItem) return;
    const recipeData ={
      ...selectedItem,
      returnRate: parseFloat(localReturnRate) || 0,
      usageFee: 1000,
      quantity: 1,
      sellCity,
      cityBuyMats,
    }
    console.log("Recipe yang dikirim:", recipeData);
    addRecipe(recipeData)
    setSelectedItem(null);
  }