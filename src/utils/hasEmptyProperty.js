/**
 * if obj has empty property, return true
 * @param {object} obj - any object with any properties
 * @returns {boolean}
 */

export function hasEmptyProperty(obj) {
    for (const key in obj) {
      if (obj[key] === "") {
        return true; // En az bir özellik boşsa, true döndür
      } else if (Array.isArray(obj[key])) {
        // Eğer özellik bir dizi ise, dizi içindeki nesneleri kontrol et
        for (const item of obj[key]) {
          if (typeof item === 'object' && hasEmptyProperty(item)) {
            return true; // Dizi içinde boş bir özellik bulunursa, true döndür
          }
        }
      } else if (typeof obj[key] === 'object' && hasEmptyProperty(obj[key])) {
        return true; // İç içe geçmiş nesnelerde boş bir özellik bulunursa, true döndür
      }
    }
    return false; // Tüm özellikler dolu ise, false döndür
  }
  