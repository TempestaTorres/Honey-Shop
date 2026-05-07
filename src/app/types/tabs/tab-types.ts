import { UrlType } from '../url-type';

export const tabTypes = {
  HONEY_CLUB: 'honey-club',
}

export type Description = {
  title: string,
  description: string,
}
export type HoneyClub = {
  title: string,
  subTitle: string,
  image: string,
  listItems?: Description[]
}
export type HoneyTab = {
  type: string,
  content: any,
}
export type HoneyTabs = {
  type: string,
  tabs: any[],
}
export type Tab = {
  title: string,
  tabUrl: UrlType,
  button: string,
  productUrl: string,
}
export type ListTabs = {
  tabs: Tab[];
}
