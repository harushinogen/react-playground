export type Color = "green" | "red" | "blue" | "yellow"
export type Size = "sm" | "md" | "lg" | "xl"
export type Material = "knit" | "cotton" | "leather"

export type Item = {
  color: Color[],
  availableSizes: Size[],
  materials: Material[],
  seri: boolean
}
