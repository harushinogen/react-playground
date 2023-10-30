// import type { Item, Color, Size } from "../utils"
import { state } from "../state"

export default function Filters() {

  const filters = state.filters.use()
  const amount = state.amount.use()
  const order = state.order.use()

  return (
    <div className="bg-blue-7 p-20px rounded-10px text-white">
      <div className="mb-20px">
        <h4 className="text-35px">Colors</h4>
        <div className="flex gap-20px">
          {filters.colors.options.map(color => (
            <div className="text-20px">
              <input
                checked={filters.colors.selected.includes(color)}
                onChange={() => {
                  if (filters.colors.selected.includes(color)) {
                    state.filters.colors.selected.set(old => old.filter(colorold => color !== colorold))
                  } else {
                    state.filters.colors.selected.push(color)
                  }
                }}
                type="checkbox"
                className="mr-5px" />
              {color}
              <span> </span>
              ({amount.colors[color]})
            </div>
          ))}
        </div>
        <div>Selected: {filters.colors.selected.join(", ")}</div>
      </div>

      <div>
        <h4 className="text-35px">Sizes</h4>
        <div className="flex gap-20px">
          {filters.sizes.options.map(size => (
            <div className="text-20px">
              <input
                checked={filters.sizes.selected.includes(size)}
                onChange={() => {
                  if (filters.sizes.selected.includes(size)) {
                    state.filters.sizes.selected.set(old => old.filter(colorold => size !== colorold))
                  } else {
                    state.filters.sizes.selected.push(size)
                  }
                }}
                type="checkbox"
                className="mr-5px" />
              {size}
              <span> </span>
              ({amount.sizes[size]})
            </div>
          ))}
        </div>
        <div>Selected: {filters.sizes.selected.join(", ")}</div>
      </div>

      <div>
        <h4 className="text-35px">Materials</h4>
        <div className="flex gap-20px">
          {filters.materials.options.map(size => (
            <div className="text-20px">
              <input
                checked={filters.materials.selected.includes(size)}
                onChange={() => {
                  if (filters.materials.selected.includes(size)) {
                    state.filters.materials.selected.set(old => old.filter(colorold => size !== colorold))
                  } else {
                    state.filters.materials.selected.push(size)
                  }
                }}
                type="checkbox"
                className="mr-5px" />
              {size}
              <span> </span>
              ({amount.materials[size]})
            </div>
          ))}
        </div>
        <div>Selected: {filters.materials.selected.join(", ")}</div>
      </div>

      <div>
        <h4 className="text-35px">Seri</h4>
        <div className="flex gap-20px">
          {filters.seri.options.map(seri => (
            <div className="text-20px">
              <input
                checked={filters.seri.selected.includes(seri)}
                onChange={() => {
                  if (filters.seri.selected.includes(seri)) {
                    state.filters.seri.selected.set(old => old.filter(colorold => seri !== colorold))
                  } else {
                    state.filters.seri.selected.push(seri)
                  }
                }}
                type="checkbox"
                className="mr-5px" />
              {seri ? "Seri" : "Warna"}
              <span> </span>
              ({amount.seri[seri.toString() as "true" | "false"]})
            </div>
          ))}
        </div>
        <div>Selected: {filters.seri.selected.join(", ")}</div>
      </div>

      <div className="mt-20px ">Order: {order.join(", ")}</div>
    </div>
  )
}
