export interface Ad {
  id: string;
  image: string;
  imageAlt: string;
  /** 'top' | 'bottom' – which half of the composite to show when using shared asset */
  imagePosition: "top" | "bottom";
  title: string;
  description: string;
  buttonText: string;
}

export const ads: Ad[] = [
  {
    id: "international-guideline",
    image: "/ad1.jpg",
    imageAlt: "Hands holding a white KN95 respirator mask",
    imagePosition: "top",
    title: "International Guideline",
    description:
      "COVID safety measures adopted by various countries including VISA restrictions, quarantine rules, etc.",
    buttonText: "View guidelines",
  },
  {
    id: "great-deal",
    image: "/ad2.jpg",
    imageAlt: "SALE 50% - red price tags and gift box",
    imagePosition: "bottom",
    title: "We've found you a great deal!",
    description:
      "Get more, spend less with up to $575 off when you book your flight + stay together,",
    buttonText: "Shop flight",
  },
  {
    id: "login-discount",
    image: "/ad03.png",
    imageAlt: "Login and get exclusive discounts!",
    imagePosition: "bottom",
    title: "Log-in and get exclusive discounts!",
    description:
      "Log in and Unlock all the exclusive offers and use wallet etc",
    buttonText: "Login/Create Account",
  }
];
