/**
 * returns a new object with trimmed values
 * @param {object} obj 
 * @returns {object}
 */

export function trimObj(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      } else if (Array.isArray(obj[key])) {
        // Eğer özellik bir dizi ise, dizi içindeki nesneleri ve bu nesnelerin içindeki dizeleri kırpın
        obj[key] = obj[key].map(item => {
          if (typeof item === 'object') {
            return trimObj(item);
          } else if (typeof item === 'string') {
            return item.trim();
          }
          return item; // Eğer öğe bir dize veya nesne değilse, dokunmadan bırakın
        });
      } else if (typeof obj[key] === 'object') {
        obj[key] = trimObj(obj[key]); // Özyinelemeli olarak nesneleri de işleyin
      }
      // Eğer özellik ne bir dize ne de bir dizi ne de bir nesne ise, dokunmadan bırakın
    }
    return obj;
  }


  