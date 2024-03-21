

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

  colors: [
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
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

  ],
  subcategories:
    [
      { label: "Skirts", value: "skirts" },
      { label: "Dress", value: "dress" },
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
    ],


  brands: [
    { label: "Nike", value: "nike" },
    { label: "LC Waikiki", value: "lcw" },
    { label: "Koton", value: "koton" },
    { label: "Mavi", value: "mavi" },
    { label: "Colin's", value: "colins" },
    { label: "Defacto", value: "defacto" },
    { label: "Adidas", value: "adidas" },
    { label: "US Polo Assn", value: "usPolo" },
    { label: "Tommy Hilfiger", value: "tommyHilfiger" },
    { label: "H&M", value: "H&M" },
    { label: "Zara", value: "zara" },
    { label: "Oxxo", value: "oxxo" },
    { label: "Penti", value: "penti" },
    { label: "Mango", value: "mango" },
  ],
};
