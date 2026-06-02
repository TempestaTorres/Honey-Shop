export interface ProductType {
  name: string,
  description: string,
  imageTitle?: string,
  url: string,
  collection: string,
  addFavoriteButton: boolean,
  addToCartButton: boolean,
  price?: number,
  priceFrom?: number,
  favorite?: boolean,
  type?: string,
  colorName: string,
  colorClass: string,
  images: string[],
  ratings?: {
    stars: number[],
    score: string,
  },
  sizes?: {key:string, sizes:string[]}[],
  models?: string[],
  setItems?: string[],
}
export type ProductItem = {
  product: ProductType[]
}
export type ProductRequestType = {
  type: string,
  key?: string
}
