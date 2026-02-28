import Service1 from "../images/Services1.png"
import Service2 from "../images/Services2.png"
import Service3 from "../images/Services3.png"
import qr from "../images/qr.png"
import googlePlay from "../images/googleplay.png"
import appStore from "../images/appstore.png"
import LoginSideImg from "../images/login-side-img.png"
import AboutImg from "../images/about_img.png"
import Team1 from "../images/team1.png"
import Team2 from "../images/team2.png"
import Team3 from "../images/team3.png"

import Phone from "../icons/Category-CellPhone.svg"
import Computer from "../icons/Category-Computer.svg"
import SmartWatch from "../icons/Category-SmartWatch.svg"
import Camera from "../icons/Category-Camera.svg"
import Headphone from "../icons/Category-Headphone.svg"
import Gaming from "../icons/Category-Gamepad.svg"
import GoogleIcon from "../icons/Icon-Google.png"

import MenSweatShirt01 from '../images/men/topwear/men-sweatshirt-beige-01.jpg'
import MenSweatShirt02 from '../images/men/topwear/men-sweatshirt-beige-02.jpg'
import MenSweatShirt03 from '../images/men/topwear/men-sweatshirt-beige-03.jpg'
import MenSweatShirt04 from '../images/men/topwear/men-sweatshirt-beige-04.jpg'
import MenCasualBeach01 from '../images/men/topwear/men-casual-beach-01.jpg'
import MenCasualBeach02 from '../images/men/topwear/men-casual-beach-02.jpg'
import MenCasualBeach03 from '../images/men/topwear/men-casual-beach-03.jpg'
import MenCasualBeach04 from '../images/men/topwear/men-casual-beach-04.jpg'
import MenPolysterPolo01 from '../images/men/topwear/men-polyster-polo-01.jpg'
import MenPolysterPolo02 from '../images/men/topwear/men-polyster-polo-02.jpg'
import MenPolysterPolo03 from '../images/men/topwear/men-polyster-polo-03.jpg'
import MenPolysterPolo04 from '../images/men/topwear/men-polyster-polo-04.jpg'
import MenBreatheableCotton01 from '../images/men/topwear/men-breatheable-cotton-01.jpg'
import MenBreatheableCotton02 from '../images/men/topwear/men-breatheable-cotton-02.jpg'
import MenBreatheableCotton03 from '../images/men/topwear/men-breatheable-cotton-03.jpg'
import MenBreatheableCotton04 from '../images/men/topwear/men-breatheable-cotton-04.jpg'
import MenLusterCottonSolid01 from '../images/men/topwear/men-luster-cotton-solid-01.jpg'
import MenLusterCottonSolid02 from '../images/men/topwear/men-luster-cotton-solid-02.jpg'
import MenLusterCottonSolid03 from '../images/men/topwear/men-luster-cotton-solid-03.jpg'
import MenLusterCottonSolid04 from '../images/men/topwear/men-luster-cotton-solid-04.jpg'

export const assets = {
    Service1,
    Service2,
    Service3,
    qr,
    googlePlay,
    appStore,
    LoginSideImg,
    GoogleIcon,
    AboutImg,
    Team1,
    Team2,
    Team3,
}

export const categories = [
    { id: 1, name: "Phone", icon: Phone },
    { id: 2, name: "Computer", icon: Computer },
    { id: 3, name: "Smart Watch", icon: SmartWatch },
    { id: 4, name: "Camera", icon: Camera },
    { id: 5, name: "Headphone", icon: Headphone },
    { id: 6, name: "Gaming", icon: Gaming },
];
export const products = [
  {
    _id: "aaaaa",
    title: "JVX Men Sweatshirts",
    description:
      "Men sweatshirts || Unisex hoodie || Available in Plus Size",
    price: 459,
    oldPrice: 2999,
    discount: 85,
    rating: 5,
    reviews: 134,
    images: [
      MenSweatShirt01,
      MenSweatShirt02,
      MenSweatShirt03,
      MenSweatShirt04,
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "brown", "gray", "beige"],
    stock: 6,
    flashSale: true,
    bestSeller: false,
  },

  {
    _id: "aaaab",
    title: "Men Casual Button Down Shirt",
    description:
      "COLEBROOK casual shirt blending tradition with modern design.",
    price: 399,
    oldPrice: 2195,
    discount: 82,
    rating: 3,
    reviews: 134,
    images: [
      MenCasualBeach01,
      MenCasualBeach02,
      MenCasualBeach03,
      MenCasualBeach04,
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["navy", "black", "gray", "green"],
    stock: 12,
    flashSale: true,
    bestSeller: false,
  },

  {
    _id: "aaaac",
    title: "Men Polyester Polo T-Shirt",
    description:
      "Polyester Polo T-Shirt with spread collar and regular fit.",
    price: 319,
    oldPrice: 999,
    discount: 68,
    rating: 5,
    reviews: 283,
    images: [
      MenPolysterPolo01,
      MenPolysterPolo02,
      MenPolysterPolo03,
      MenPolysterPolo04,
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL", "2XL"],
    colors: ["lightcoral", "black", "brown", "royalblue"],
    stock: 20,
    flashSale: true,
    bestSeller: false,
  },

  {
    _id: "aaaad",
    title: "Men Cotton Shirt",
    description:
      "Casual & formal cotton shirt with slim regular fit.",
    price: 469,
    oldPrice: 1999,
    discount: 77,
    rating: 4,
    reviews: 322,
    images: [
      MenBreatheableCotton01,
      MenBreatheableCotton02,
      MenBreatheableCotton03,
      MenBreatheableCotton04,
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL", "2XL"],
    colors: ["pink", "black", "white", "beige"],
    stock: 15,
    flashSale: true,
    bestSeller: false,
  },
]
