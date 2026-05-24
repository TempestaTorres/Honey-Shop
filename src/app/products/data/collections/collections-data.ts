import { ProductType } from '../../types/product-type';
import { braSizes } from '../../../data/instagram-feeds-data';

export interface ShopCollectionType {
  name: string;
  url: string;
  products: Array<ProductType[]>;
}
export const AllCollectionsData: ShopCollectionType[] = [
  {
    name: "ANNALISE",
    url: "annalise-lingerie-collection",
    products: [
      [
        {
          name: "ANNALISE",
          description: "Bra",
          url: "annalise-underwire-plunge-sky-blue",
          addFavoriteButton: true,
          addToCartButton: true,
          price: 110,
          type: "bra",
          colorName: "sky blue",
          colorClass: "swatch-sky-blue",
          images: [
            "/assets/images/products/collections/annalise/sky-blue/Annelise_Bra_Brief_Front.jpg",
            "/assets/images/products/collections/annalise/sky-blue/Annelise_Bra_Front1.jpg",
            "/assets/images/products/collections/annalise/sky-blue/Annelise_Bra_Back2.jpg",
            "/assets/images/products/collections/annalise/sky-blue/Annelise_Bra_Side.jpg",
            "/assets/images/products/collections/annalise/sky-blue/Annelise_Bra_SideZOOM1.jpg",
            "/assets/images/products/collections/annalise/sky-blue/Annelise_Bra_Brief_Front1.jpg",
            "/assets/images/products/collections/annalise/sky-blue/Annelise_Bra_Brief_Back.jpg",
            "/assets/images/products/collections/annalise/sky-blue/Annelise_Bra_Brief_Side1.jpg",
            "/assets/images/products/collections/annalise/sky-blue/ANNALISE1.jpg",
          ],
          sizes: braSizes,
        },
      ],
    ]

  },
]
