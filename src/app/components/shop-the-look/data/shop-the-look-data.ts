
export interface ShopTheLookDescriptionType {
  name: string;
  text: string;
  url: string;
}
export interface ShopTheLookImages {
  images: string[];
  url: string;
}

export interface ShopTheLookType {
  descriptions: ShopTheLookDescriptionType[];
  slides: ShopTheLookImages[];
}

export const ShopTheLookData: ShopTheLookType[] = [
  {
    descriptions: [
      {
        name: "ANNALISE",
        text: "Light blue lingerie, designed to be yours. Featuring dimensional embroidery framed in sky-blue binds, the Annalise collection is pure femininity.",
        url: "annalise-lingerie-collection"
      },
      {
        name: "TARA",
        text: "Hot pink lingerie. Now that’s a bold move. Taking elements of inspiration from bandage-style strapping and bondage bodysuits, Tara layers elastics with panels of illusion tulle.",
        url: "tara-lingerie-collection"
      },
      {
        name: "ELODIE ROMANCE",
        text: "Get amorous in Elodie. Made effortlessly elegant with whisper-soft florals, this seductive lingerie style features garlands of forget-me-nots by Australian and Swiss design.",
        url: "elodie-romance-lingerie-collection"
      },
      {
        name: "WHITNEY CHARTREUSE",
        text: "Made for the limelight. Discover our most-loved lingerie in a high-impact hue.",
        url: "whitney-lingerie-collection"
      },
      {
        name: "CHARLOTTA EMERALD",
        text: "NOW 30% OFF",
        url: "charlotta-emerald-lingerie-collection"
      },
    ],
    slides: [
      {
        images: [
          "/assets/images/shop-look/annalise/ShopLook_Annalise_1.jpg",
          "/assets/images/shop-look/annalise/ShopLook_Annalise_2.jpg",
        ],
        url: "annalise-lingerie-collection"
      },
      {
        images: [
          "/assets/images/shop-look/tara/ShopLook_Tara_1.jpg",
          "/assets/images/shop-look/tara/ShopLook_Tara_2.jpg",
        ],
        url: "tara-lingerie-collection"
      },
      {
        images: [
          "/assets/images/shop-look/elodie/ShopLook_Elodie_1.jpg",
          "/assets/images/shop-look/elodie/ShopLook_Elodie_2.jpg",
        ],
        url: "elodie-romance-lingerie-collection"
      },
      {
        images: [
          "/assets/images/shop-look/whitney/ShopLook_Whit_1.jpg",
          "/assets/images/shop-look/whitney/ShopLook_Whit_2.jpg",
        ],
        url: "whitney-lingerie-collection"
      },
      {
        images: [
          "/assets/images/shop-look/charlotta/ShopLook_charlotta_1.jpg",
          "/assets/images/shop-look/charlotta/ShopLook_charlotta_2.jpg",
        ],
        url: "charlotta-emerald-lingerie-collection"
      },
    ]
  },
  {
    descriptions: [
      {
        name: "CHERRY",
        text: "Cherry red lingerie. Take a bite, baby.",
        url: "cherry-lingerie-collection"
      },
      {
        name: "AMETHYST",
        text: "Leave the lights on, honey. Amethyst shines from every angle.",
        url: "amethyst-lingerie-collection"
      },
      {
        name: "LORNA",
        text: "The low balconette that brings out your best.",
        url: "lorna-lingerie-collection"
      },
      {
        name: "EVERLY",
        text: "Sexy & supportive. You really can have both.",
        url: "everly-lingerie-collection"
      },
    ],
    slides: [
      {
        images: [
          "/assets/images/shop-look/cherry/ShopLook_CHERRY_1.jpg",
          "/assets/images/shop-look/cherry/ShopLook_CHERRY_2.jpg",
        ],
        url: "cherry-lingerie-collection"
      },
      {
        images: [
          "/assets/images/shop-look/amethyst/ShopLook_AMETHYST_1.jpg",
          "/assets/images/shop-look/amethyst/ShopLook_AMETHYST_2.jpg",
        ],
        url: "amethyst-lingerie-collection"
      },
      {
        images: [
          "/assets/images/shop-look/lorna/ShopLook_LORNA_1.jpg",
          "/assets/images/shop-look/lorna/ShopLook_LORNA_2.jpg",
        ],
        url: "lorna-lingerie-collection"
      },
      {
        images: [
          "/assets/images/shop-look/everly/ShopLook_EVERLY_1.jpg",
          "/assets/images/shop-look/everly/ShopLook_EVERLY_2.jpg",
        ],
        url: "everly-lingerie-collection"
      },
    ]
  },

]
