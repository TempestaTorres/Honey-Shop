export interface ReviewType {
  collection: string;
  authorName: string,
  title: string,
  description: string[],
}
export interface ReviewsType {
  count: number,
  reviews: ReviewType[];
}
export const ReviewsData: ReviewType[] = [
  {
    collection: "whitney-lingerie-collection",
    authorName: "Paul",
    title: "My favourite thong",
    description: [
      "Absolutely love this one and wear one almost daily. Will be buying more in the future for sure.",
      "Probably the best line released yet I think,"
    ]
  },
  {
    collection: "whitney-lingerie-collection",
    authorName: "Paul",
    title: "My absolute favourite line",
    description: [
      "The Whitney thing is so elegant and sexy , the fit is just right and feels so good when worn. Just like the entire range of black Whitney lingerie, in my opinion it’s perfection which is why I have it all and multiple items that I have bought on the sales for future use, I will continue to buy this range as money permits me to and increase my range as new items are released, it’s my almost daily set to wear out and around the house with a nicely matched pair of stilleto’s "
    ]
  },
  {
    collection: "whitney-lingerie-collection",
    authorName: "Peng Y.",
    title: "Love it",
    description: [
      "My grl loves it"
    ]
  },
  {
    collection: "whitney-lingerie-collection",
    authorName: "Mary L. R.",
    title: "Elegant and perfect!",
    description: [
      "I purchased the cami to this set a few months ago, and didn't get the bottoms- I was thrilled to find them in the sale - they are PERFECT with the cami- I should have never waited!"
    ]
  },
  {
    collection: "whitney-lingerie-collection",
    authorName: "CRISTIAN B.",
    title: "Pink thong",
    description: [
      "The thong looks great and quality is awesome as in the pic. The pendant is not great that is why 4 stars"
    ]
  },
  {
    collection: "whitney-lingerie-collection",
    authorName: "Ilija J. ",
    title: "Fantastic thong",
    description: [
      "Bought this for my girlfriend, she absolutely loves it.",
      "She says that the size and fit are perfect for her, and material is great quality.",
      "She looks absolutely stunning wearing it too."
    ]
  },
]
