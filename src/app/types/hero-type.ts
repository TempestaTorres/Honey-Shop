export type HeroSlide = {
  image: string,
  mobileImage?: string,
  imageUrl: {
    url: string | null,
    param: string | null
  }
  content: {
    hasContent: boolean,
    title: string;
    subtitle?: string;
    text?: string;
    button: {
      hasButton: boolean,
      buttonType: string,
      buttonText: string,
    }
  }
}
export type HeroVideoSlide = {
  desktopImage: string,
  mobileImage: string,
  imageUrl: {
    url: string,
    param: string | null
  }
  content: {
    hasContent: boolean,
    title: string,
    title2?: string,
    text: string;
    button: {
      hasButton: boolean,
      buttonType: string,
      buttonText: string,
    }
  }
}
export type HeroType = {
  class: string,
  slides: HeroSlide[],
  pagination: boolean,
  navigation: boolean,
  swiperOptions: any
}
export type HeroVideoType = {
  class: string,
  slides: HeroVideoSlide[],
  pagination: boolean,
  navigation: boolean,
  swiperOptions: any
}
