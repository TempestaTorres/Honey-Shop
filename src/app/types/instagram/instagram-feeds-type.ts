export interface AccessoryType {
  name: string,
  price: number,
  position: { x: string, y: string },
}
export interface ProductDetailsType {
  name: string,
  image: string,
  type: string,
  price: string,
  url: string,
  linkStyle: string,
  sizes?: {key:string, sizes:string[]}[],
  soldout?: boolean
}
export interface InstagramFeedType {
  image: string,
  title: string,
  date: string,
  hasLink: boolean,
  author?: string,
  accessories?: AccessoryType[],
  details?: ProductDetailsType[]
}
