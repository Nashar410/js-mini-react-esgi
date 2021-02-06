import { Component } from "./Component.module.js";
import { checkElementType } from "../utils/Utils.module.js";

/**
 * Retourne le component visé par l'id demandé qui se trouve dans une list de components
 * @param string id Id du component
 * @param array list liste de component
 * @returns le component ou undefined
 */
export function getComponentById(id, componentList) {
  return getFromListById(id, componentList);
}

/**
 * Retourne la props de la liste fourni s'il concorde avec l'id donnée
 * @param string id
 * @param array list liste des props
 * @returns le props correspondant ou undefined
 */
export function getPropsByComponentId(id, propsList) {
  return getFromListById(id, propsList);
}

/**
 * Retourne l'item de la liste fourni s'il concorde avec l'id donnée
 * @param string id
 * @param array list liste de component ou liste de props
 * @returns un item de la liste concordant avec l'id  | un objet vide si rien n'a été trouvé
 */
export function getFromListById(id, list) {
  // Variable retournée
  let result = undefined;

  // Boucler sur la liste et examiner les items
  for (let item of list) {
    // Examination de l'id de l'item selon le type de liste
    if (
      (!!item.getId() && item.getId() === id) ||
      (!!item.getIdComponent() && item.getIdComponent() === id)
    ) {
      // Affectation si l'id est reconnu
      result = item;
      //Arrêt de la boucle au premier trouvé
      break;
    }
  }
  return result;
}

export function propAccess(content, path) {
  //On vérifie sur le content est bien un objet et qu'il n'est pas null
  if (typeof content !== "object" || content === null)
    throw new Error(path + " not exist");
  //On vérifie que le path est bien de type string et non vide
  if (typeof path !== "string" || path == "")
    throw new Error("Path must be valid");

  //On décompose le chemin à chaque '.'
  let decomposePath = path.split(".");
  //On initalise un tableau vide
  let tab = [];
  //Pour chaque élement de decompose path, on l'insère dans notre tab
  for (let element of decomposePath) {
    tab.push(element);
    let tabJoin = tab.join(".");
    //On throw une erreur avec le chemin complet si l'élement est undefined
    if (typeof content[element] == "undefined") {
      throw new Error(tabJoin + " not exist");
    }
    //On assigne la nouvelle valeur de content
    content = content[element];
  }
  return content;
}

export function interpolate(props, content) {
  //On commence par boucler sur chaque prop de notre composant
  for (let prop in props) {
    //On vérifie que la prop est bien de type string
    if (typeof props[prop] === "string") {
      //Si elle contient les moustaches, on les enlève, ainsi que les espace et on assigne dans une variable
      if (props[prop].includes("{{")) {
        let pureProp = props[prop].replace("{{", "").replace("}}", "").trim();
        //On utilise propaccess pour parcourir le content
        props[prop] = propAccess({ content }, pureProp);
      }
    }
    //Si ce que l'on examine n'est pas une string, on appelle la récursivité jusqu'à ce que l'on accède bien à la prop de type string qu'on veut changer
    else {
      props[prop] = interpolate(props[prop], content);
    }
  }
  return props;
}

export function createElement(element, props) {
  try {
    // Initialisation de l'Objet final
    let compo = {};
    if (typeof element === "string") {
      // Sinon si élement est un string, on veut le créer en component
      const type = checkElementType(element) ? element : "span";
      compo = new Component(
        { type: typeof element, text: typeof props },
        { type, text: props },
        { type, text: props }
      );
    } else {
      // On créer directement le component
      compo = new element(props);
    }
    return compo.convertToHtml();

  } catch (e) {
    throw e;
  }
}

export function render(componentToDisplay, destination) {
  if (destination.constructor.name !== "HTMLDivElement") {
    if (!destination.getComponentId()) {
      throw new Error("Mauvaise destination");
    }
  }

  let compoHtml = {};

  if (!!componentToDisplay.getComponentId()) {
    compoHtml = document.querySelector(
      `[data-id=${componentToDisplay.getComponentId()}]`
    ); // element html avec même id que destination
    if (!compoHtml) {
      compoHtml = componentToDisplay.convertToHtml();
    }
  } else if (typeof componentToDisplay === "string") {
    compoHtml = new Component(
      { type: componentToDisplay },
      {
        type: checkElementType(componentToDisplay)
          ? componentToDisplay
          : "span",
      },
      { type: componentToDisplay }
    ).convertToHtml();
  }

  if (!!componentToDisplay.getCurrentState().getChildren()) {
    for (let children of componentToDisplay.getCurrentState().getChildren()) {
      render(children, componentToDisplay);
    }
  }
  destination.appendChild(compoHtml);
}
