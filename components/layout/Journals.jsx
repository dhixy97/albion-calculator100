import { useRecipes } from "@/context/RecipeContext";
import { getJournal } from "@/helper/getJournal";

export default function Journals() {
  const { recipes } = useRecipes();
  const journals = getJournal(recipes);

  // jika tidak ada journal jangan render apa pun
  if (!journals || journals.units === 0) {
    return null;
  }

  return (
    <div className="bg-neutral-900 rounded-xl p-5 mt-2">
      <h2>Journals</h2>

      <div className="mt-2 w-full">
        {journals.map((j) => (
          <div
            key={j.journal.uniqueName}
            className="bg-neutral-800 p-2 rounded-md"
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                <img
                  src={`https://render.albiononline.com/v1/item/${j.journal.uniqueName}.png`}
                  className="h-15 w-15"
                />
                <span>{j.journal.localizedNames}</span>
              </div>

              <div className="flex flex-col">
                <span>Total: {j.units} units</span>
                <span>Fame: {j.fame}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
