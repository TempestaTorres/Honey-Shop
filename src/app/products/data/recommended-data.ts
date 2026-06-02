import { ProductItem } from '../types/product-type';
import { braSizes, dressSizes, stockingsSizes } from '../../data/instagram-feeds-data';

export const RecommendedData: ProductItem[] = [
  {
    product: [
      {
        name: "Pink Flower Suspender",
        description: "Stockings",
        url: "elodie-suspender-stockings-romantic-pink",
        collection: "elodie-romance-lingerie-collection",
        addFavoriteButton: true,
        addToCartButton: true,
        price: 30,
        colorName: "sparkling pink",
        colorClass: "swatch-sparkling-pink",
        type: "stockings",
        images: [
          "/assets/images/products/eloidie/stockings/pink/Elodie_Romance_Stockings.jpg",
        ],
        sizes: stockingsSizes
      },
    ]
  },
  {
    product: [
      {
        name: "ELODIE ROMANCE",
        description: "Bra",
        url: "elodie-underwire-balconette-romantic-pink",
        collection: "elodie-romance-lingerie-collection",
        addFavoriteButton: true,
        addToCartButton: true,
        price: 130,
        colorName: "sparkling pink",
        colorClass: "swatch-sparkling-pink",
        type: "bra",
        images: [
          "/assets/images/products/eloidie/lingerie-set/pink/ElodieRomance_Bra_Brief_Front.jpg",
        ],
        sizes: braSizes
      },
    ]
  },
  {
    product: [
      {
        name: "ELODIE ROMANCE",
        description: "Thong",
        url: "elodie-string-ouvert-romantic-pink",
        collection: "elodie-romance-lingerie-collection",
        addFavoriteButton: true,
        addToCartButton: true,
        price: 85,
        colorName: "sparkling pink",
        colorClass: "swatch-sparkling-pink",
        type: "thong",
        images: [
          "/assets/images/products/eloidie/lingerie-set/pink/ElodieRomance_Bra_Thong_Back.jpg",
        ],
        sizes: dressSizes
      },
    ]
  },
  {
    product: [
      {
        name: "ELODIE ROMANCE",
        description: "3 Piece Lingerie Set",
        url: "elodie-romance-3-piece-lingerie-set",
        collection: "elodie-romance-lingerie-collection",
        addFavoriteButton: false,
        addToCartButton: false,
        priceFrom: 325,
        type: "lingerie-set",
        colorName: "sparkling pink",
        colorClass: "swatch-sparkling-pink",
        images: [
          "/assets/images/products/eloidie/3-piece-lingerie-set/white/ElodieRomance_Bra_Suspender_Thong_Front.jpg",
        ],
      },
    ]
  },
  {
    product: [
      {
        name: "ELODIE ROMANCE",
        description: "Brief",
        url: "elodie-brazilian-romantic-pink",
        collection: "elodie-romance-lingerie-collection",
        addFavoriteButton: false,
        addToCartButton: false,
        price: 95,
        colorName: "sparkling pink",
        colorClass: "swatch-sparkling-pink",
        type: "brief",
        images: [
          "/assets/images/products/eloidie/lingerie-set/pink/ElodieRomance_Bra_Brief_Back.jpg",
        ],
        sizes: dressSizes
      },
    ]
  },
]
