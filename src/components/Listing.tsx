import { state } from "../state"
import clsx from "clsx"

export default function Listing() {

  const items = state.filteredItems.use()

  return (
    <div className="flex gap-20px mt-20px flex-wrap">
      {items.map(item => (
        <div className={clsx(item.seri ? "bg-gray-2" : "bg-red-3", "min-w-100px px-20px rounded text-center text-gray-7")}>
          <h5>{item.availableSizes.join(", ")}</h5>
          <h5 className="text-18px">{item.materials.join(", ")}</h5>
          <div className="flex gap-x-5px py-10px">
            {item.color.map(color => (
              <div className={clsx(
                "w-20px h-20px rounded-full border-1px border-gray-7",
                color === "red" && "bg-red-5",
                color === "green" && "bg-green-5",
                color === "yellow" && "bg-yellow-5",
                color === "blue" && "bg-blue-5",
              )}></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
