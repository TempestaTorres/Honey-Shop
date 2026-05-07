export interface SwiperVideoSlide {
  videoSrc: string,
  videoUrl: {
    url: string,
    param: string | null,
  },
  content?: {
    title: string,
    description: string,
    button: {
      className: string,
      buttonText: string,
    },
  }
}
export type SwiperVideoCarouselType = {
  className: string,
  slides: SwiperVideoSlide[],
  pagination: boolean,
  navigation: boolean,
  swiperOptions: any
}
