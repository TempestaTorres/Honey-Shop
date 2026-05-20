export interface ProductType {
  name: string,
  description: string,
  imageTitle?: string,
  url: string,
  addFavoriteButton: boolean,
  addToCartButton: boolean,
  price?: number,
  priceFrom?: number,
  favorite?: boolean,
  colorName: string,
  colorClass: string,
  images: string[],
  ratings?: {
    stars: number[],
    score: string,
  }
}
export type ProductItem = {
  product: ProductType[]
}
export type ProductRequestType = {
  type: string,
  key?: string
}
