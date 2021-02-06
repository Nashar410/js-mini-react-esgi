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

export function checkElementTags(typeToCheck) {
  return HtmlList.htmlTags.includes(typeToCheck)

}

export function checkElementAttributes(typeToCheck) {
  return HtmlList.htmlAttributes.includes(typeToCheck);
}
