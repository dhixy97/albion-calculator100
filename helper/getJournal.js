export function getJournal(recipes) {

  const journals = {};

  recipes.forEach((recipe) => {

    if (!recipe.journalRequired || !recipe.journal) return;

    const quantity = recipe.quantity || 1;
    const fame = recipe.craftFame * quantity;

    const key = recipe.journal.uniqueName;

    if (!journals[key]) {
      journals[key] = {
        journal: recipe.journal,
        fame: 0,
        units: 0
      };
    }

    journals[key].fame += fame;
  });

  Object.values(journals).forEach((j) => {

    // berapa journal harus dibawa
    j.units = Math.ceil(j.fame / j.journal.fame);

  });

  return Object.values(journals);
}