export interface ProductCartType {
  name: string,
  url: string,
  price: string,
  image: string,
  count: string,
  type?: string,
  color?: string,
  favorite?: boolean,
  size?: {key: string, value: string}
}
