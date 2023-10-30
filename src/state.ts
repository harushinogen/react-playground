import { observable, observe, type Observable } from "@legendapp/state"
import type { Item, Color, Size, Material } from "./utils"

type State = {
  items: Item[],
  filters: {
    colors: {
      selected: Color[],
      options: Color[],
    },
    sizes: {
      selected: Size[],
      options: Size[],
    },
    materials: {
      selected: Material[],
      options: Material[],
    },
    seri: {
      selected: boolean[],
      options: boolean[]
    }
  },
  amount: {
    colors: Record<Color, number>,
    sizes: Record<Size, number>,
    materials: Record<Material, number>,
    seri: Record<"true" | "false", number>,
  },
  filteredItems: Item[],
  order: Array<keyof State["filters"]>
}

export const state: Observable<State> = observable({
  items: [
    { color: ["red", "blue"], availableSizes: ["sm"], materials: ["knit", "cotton"], seri: false },
    { color: ["red", "green"], availableSizes: ["sm"], materials: ["leather"], seri: true },
    { color: ["blue"], availableSizes: ["sm", "lg"], materials: ["leather"], seri: false },
    // { color: "yellow", availableSizes: ["md", "xl"] },
    // { color: "red", availableSizes: ["md", "lg", "xl"] },
    // { color: "yellow", availableSizes: ["md", "lg"] },
    // { color: "blue", availableSizes: ["md", "xl"] },
    // { color: "blue", availableSizes: ["lg"] },
    { color: ["blue", "green"], availableSizes: ["md", "lg"], materials: ["knit"], seri: false },
    { color: ["red"], availableSizes: ["sm", "md"], materials: ["knit", "cotton"], seri: true },
    { color: ["yellow"], availableSizes: ["sm", "md", "lg"], materials: ["leather"], seri: true },
    { color: ["green"], availableSizes: ["sm", "xl"], materials: ["cotton"], seri: false },
    // { color: "blue", availableSizes: ["sm", "md"] },
    // { color: "yellow", availableSizes: ["md"] },
    // { color: "green", availableSizes: ["xl"] },
    // { color: "blue", availableSizes: ["sm", "lg"] }
  ],
  filters: {
    colors: {
      selected: [],
      options: ["green", "red", "blue", "yellow"],
    },
    materials: {
      selected: [],
      options: ["knit", "cotton", "leather"],
    },
    sizes: {
      selected: [],
      options: ["sm", "md", "lg", "xl"],
    },
    seri: {
      selected: [],
      options: [false, true]
    }
  },
  amount: {
    colors: { "red": 0, "blue": 0, "green": 0, "yellow": 0 },
    sizes: { sm: 0, md: 0, lg: 0, xl: 0 },
    materials: { knit: 0, leather: 0, cotton: 0 },
    seri: { "false": 0, "true": 0 }
  },
  filteredItems: [],
  order: ["colors", "sizes", "materials", "seri"],
})

observe(() => {
  let items = state.items.get()
  const filters = state.filters.get()
  const { amount } = state;

  amount.assign({
    colors: { "red": 0, "blue": 0, "green": 0, "yellow": 0 },
    sizes: { sm: 0, md: 0, lg: 0, xl: 0 },
    materials: { knit: 0, leather: 0, cotton: 0 },
    seri: { "false": 0, "true": 0 }
  })

  const originalOrder = ["colors", "sizes", "materials", "seri"] as Array<keyof State["filters"]>

  state.order.set(originalOrder.sort((a, b) => Math.min(1, filters[b].selected.length) - Math.min(1, filters[a].selected.length)))


  for (const filter of state.order.get()) {
    switch (filter) {
      case "colors":
        for (const item of items) {
          if (filters.colors.selected.length === 0) {
            for (const color of item.color) {
              amount.colors[color].set(old => old + 1)
            }
          } else {
            for (const color of item.color) {
              amount.colors[color].set(old => old + 1)
            }
          }
        }

        if (filters.colors.selected.length !== 0) items = items.filter(item => filters.colors.selected.some(col => item.color.includes(col)))
        break;

      case "sizes":

        for (const item of items) {
          if (filters.sizes.selected.length === 0) {
            for (const size of item.availableSizes) {
              amount.sizes[size].set(old => old + 1)
            }
          } else {
            for (const size of item.availableSizes) {
              amount.sizes[size].set(old => old + 1)
            }
          }
        }

        if (filters.sizes.selected.length !== 0) items = items.filter(item => filters.sizes.selected.some(el => item.availableSizes.includes(el)))
        break;


      case "materials":
        for (const item of items) {
          if (filters.materials.selected.length === 0) {
            for (const material of item.materials) {
              amount.materials[material].set(old => old + 1)
            }
          } else {
            for (const material of item.materials) {
              amount.materials[material].set(old => old + 1)
            }
          }
        }

        if (filters.materials.selected.length !== 0) items = items.filter(item => filters.materials.selected.some(el => item.materials.includes(el)))
        break;

      case "seri":

        for (const item of items) {
          if (filters.seri.selected.length === 0) {
            amount.seri[item.seri.toString() as "false" | "true"].set(old => old + 1)
          } else {
            amount.seri[item.seri.toString() as "false" | "true"].set(old => old + 1)
          }
        }

        if (filters.seri.selected.length !== 0) items = items.filter(item => filters.seri.selected.includes(item.seri))
        break;
    }
  }

  state.filteredItems.set(items)
})
