export type HeroSlide = {
  image: string;
  imageUrl: {
    url: string,
    param: string | null
  }
  content: {
    hasContent: boolean,
    title: string;
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
