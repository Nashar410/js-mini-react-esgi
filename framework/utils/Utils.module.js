import * as HtmlList from "./htmllists.js";

/**
 * Retourne un ID normalement unique
 * Peut avoir un risque de collision entre deux IDs
 * @deprecated Cette fonction se base sur Math.random pour générer un aléatoire,
 * ce n'est pas le meilleur choix mais le plus simple en l'occurence
 * @return Un ID avec un risque collision
 */
export function getUnsecureID() {
  return (Date.now() + Math.random()).toString(36);
}

/**
 * Affiche les paramètres dans la console ; syntaxe courte de console.log
 * @param log
 */
export function l(...log) {
  console.log(...log);
}

export function type_check_v1(variable, type) {
  switch (typeof variable) {
    case "symbol":
    case "number":
    case "string":
    case "boolean":
    case "undefined":
    case "function":
      return type === typeof variable;
    case "object":
      switch (type) {
        case "null":
          return variable === null;
        case "array":
          return Array.isArray(variable);
        default:
          return variable !== null && !Array.isArray(variable);
      }
  }
}

/**
 * Nouveau ! Permet de vérifier si une props est conforme à son modèle
 * @param model
 * @param content
 * @returns {boolean|*}
 */
export function type_check_v4(model, content) {
  for (let rule in model) {
    if (rule === "attributs") {
      for (const attr of content[rule]) {
        if (!type_check_v1(attr, model[attr])) {
          return false;
        }
      }
    } else if(rule === "event"){
      for (const event of content[rule]) {
        if (!type_check_v1(event, "function")) {
          return false;
        }
      }
    } else if (rule === "text") {
      if (!type_check_v1(content[rule], model[rule])) {
        return false;
      }
    } else if (rule === "children") {
      for (const element of content[rule]) {
        // On vérifie si ce qui est passé ou son parent correspond à ce qu'il y a
        // dans le modèle
        if (!model[rule].some(
            (modelRule) =>
              modelRule === element.name ||
              modelRule === Object.getPrototypeOf(element).name)) {
          return false;
        }
      }
    } else if (rule === "type") {
      return checkElementTags(content[rule]);
    }
  }
  return true;
}

/**
 * Vérifier si un le param fait partie de la liste des balises du HTML
 * @param typeToCheck
 * @returns {*}
 */
export function checkElementTags(typeToCheck) {
  return HtmlList.htmlTags.includes(typeToCheck);
}

/**
 * Vérifie le param est un attribut HTML valide
 * @param typeToCheck
 * @returns {*}
 */
export function checkElementAttributes(typeToCheck) {
  return HtmlList.htmlAttributes.includes(typeToCheck);
}

/**
 * Copie profondément un objet (ses propriétés et ses valeurs)
 * @source https://medium.com/weekly-webtips/deep-clone-with-vanilla-js-5ef16e0b365c
 * @param toCopy
 * @returns {{}|*}
 */
export function deepCopy(toCopy) {
  // Si pas du type object ou null, on retourne
  if(typeof toCopy !== 'object' || toCopy === null) {
    return toCopy;
  }

  // Si du type array
  if(toCopy instanceof Array) {
    // reduce de l'array pour copier les contents dans un nouvelle arr (accumulateur de l'ancien)
    return toCopy.reduce((arr, item, i) => {
      arr[i] = deepCopy(item);
      return arr;
    }, []);
  }
// Si c'est un object
  if(toCopy instanceof Object) {
    // reduce de l'objet dans un nouvelle objet (accumulateur)
    return Object.keys(toCopy).reduce((newObj, key) => {
      newObj[key] = deepCopy(toCopy[key]);
      return newObj;
    }, {})
  }
}

/**
 * Vérifie si deux objets sont strictement égaux (proprités et valeurs)
 * @source https://dev.to/sanderdebr/deep-equality-checking-of-objects-in-vanilla-javascript-5592
 * @param objA
 * @param objB
 * @returns {boolean}
 */
export function deepEqual(objA, objB){
  // Si égalité de référence
  if (objA === objB) return true;

  // Si non objet, on retourne
  if (typeof objA != 'object' || typeof objB != 'object' || objA == null || objB == null) return false;

  // Récupération des clés
  let keysA = Object.keys(objA), keysB = Object.keys(objB);

  // Si length différente, pas d'égalité possible
  if (keysA.length !== keysB.length) return false;

  // Pour chaque propriété
  for (let key of keysA) {
    // Si absence de l'autre objet
    if (!keysB.includes(key)) return false;

    // Vérification du type de la propriété
    if (typeof objA[key] === 'function' || typeof objB[key] === 'function') {
      // Si les objets sont différents en string, pas égaux
      if (objA[key].toString() !== objB[key].toString()) return false;
    } else {
      // Sinon, on retourne en récurcif
      if (!deepEqual(objA[key], objB[key])) return false;
    }
  }
  return true;
}
