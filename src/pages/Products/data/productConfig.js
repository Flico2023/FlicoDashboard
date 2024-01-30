const BASIC_PRODUCT = [
  { label: "T-Shirt", value: "t-shirt" },
  { label: "Shirt", value: "shirt" },
  { label: "Pants", value: "pants" },
  { label: "Shorts", value: "shorts" },
  { label: "Jeans", value: "jeans" },
  { label: "Jogger", value: "jogger" },
  { label: "Tracksuit", value: "tracksuit" },
  { label: "Jacket", value: "jacket" },
  { label: "Coat", value: "coat" },
  { label: "Sweatshirt", value: "sweatshirt" },
  { label: "Hoodie", value: "hoodie" },
  { label: "Sweater", value: "sweater" },
  { label: "Vest", value: "vest" },
  { label: "Cardigan", value: "cardigan" },
  { label: "Pajamas", value: "pajamas" },
];

/**
 * @typedef {{label: string, value: string}} Option
 * 
 */

/**
 * Configuration object for product data.
 * @typedef {Object} ProductConfig
 * @property {Option[]} sizes - Array of size options.
 * @property {Option[]} genders - Array of gender options.
 * @property {Option[]} colors - Array of color options.
 * @property {Option[]} categories - Array of category options.
 * @property {{man:Option[],woman:Option[],kids:Option[],accessories:Option[]}} subcategories - Object containing subcategory options for each category.
 * @property {Option[]} brands - Array of brand options.
 */

/**
 * Product configuration object.
 * @type {ProductConfig}
 */
export const productConfig = {
  sizes: [
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
  ],
  genders: [
    { label: "Man", value: "man" },
    { label: "Woman", value: "woman" },
  ],
  colors: [
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue"},
    { label: "Green", value: "green" },
    { label: "Yellow", value: "yellow" },
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Gray", value: "gray" },
    { label: "Purple", value: "purple" },
    { label: "Orange", value: "orange" },
    { label: "Brown", value: "brown" },
  ],
  categories: [
    { label: "Man", value: "man" },
    { label: "Woman", value: "woman" },
    { label: "Kids", value: "kids" },
    { label: "Accessories", value: "accessories" },
  ],
  subcategories: {
    man: [...BASIC_PRODUCT],
    woman: [
      { label: "Skirts", value: "skirts" },
      { label: "Dress", value: "dress" },
      ...BASIC_PRODUCT,
    ],

    kids: [
      ...BASIC_PRODUCT,
      { label: "Skirts", value: "skirts" },
      { label: "Dress", value: "dress" },
    ],
    accessories: [
      { label: "Hat", value: "hat" },
      { label: "Scarf", value: "scarf" },
      { label: "Gloves", value: "gloves" },
      { label: "Socks", value: "socks" },
      { label: "Belt", value: "belt" },
      { label: "Bag", value: "bag" },
      { label: "Wallet", value: "wallet" },
    ],
  },
  /*brands: [
    { label: "Nike", value: "nike" },
    { label: "LC Waikiki", value: "lcw" },
    { label: "Koton", value: "koton" },
    { label: "Mavi", value: "mavi" },
    { label: "Colin's", value: "colins" },
    { label: "Defacto", value: "defacto" },
    { label: "Adidas", value: "adidas" },
    { label: "Polo Garage", value: "polo-garage" },
    { label: "US Polo Assn", value: "us-polo-assn" },
    { label: "Tommy Hilfiger", value: "tommy-hilfiger" },
    { label: "H&M", value: "hm" },
    { label: "Zara", value: "zara" },
    { label: "Bershka", value: "bershka" },
    { label: "Stradivarius", value: "stradivarius" },
    { label: "Pull & Bear", value: "pull-and-bear" },
    { label: "Oxxo", value: "oxxo" },
    { label: "Penti", value: "penti" },
    { label: "Mango", value: "mango" },
  ],*/
  brands: [
    { label: "Nike", value: "nike" },
    { label: "LC Waikiki", value: "LC Waikiki" },
    { label: "Koton", value: "Koton" },
    { label: "Mavi", value: "Mavi" },
    { label: "Colin's", value: "Colin's" },
    { label: "Defacto", value: "Defacto" },
    { label: "Adidas", value: "Adidas" },
    { label: "Polo Garage", value: "Polo Garage" },
    { label: "US Polo Assn", value: "US Polo Assn" },
    { label: "Tommy Hilfiger", value: "Tommy Hilfiger" },
    { label: "H&M", value: "H&M" },
    { label: "Zara", value: "Zara" },
    { label: "Bershka", value: "Bershka" },
    { label: "Stradivarius", value: "Stradivarius" },
    { label: "Pull & Bear", value: "Pull & Bear" },
    { label: "Oxxo", value: "Oxxo" },
    { label: "Penti", value: "Penti" },
    { label: "Mango", value: "Mango" },
  ],
};
