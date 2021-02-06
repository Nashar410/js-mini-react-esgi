import { Component } from "./Component.module.js";
import {checkElementAttributes, checkElementTags, type_check_v1} from "../utils/Utils.module.js";

/**
 * Sélectionne un componenet dans le dom grâce son data-id
 * S'il ne le trouve pas, il renvoie undefined
 * @param id
 * @returns {undefined|*}
 */
export function getComponentByDOMId(id) {
  try {
    return document.querySelector(`[data-id=${id}]`).component;
  } catch (e) {
    return undefined;
  }
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
 * @returns un item de la liste concordant à l'id  | undefined
 */
export function getFromListById(id, list) {
  // Variable retournée
  let result = undefined;

  // Boucler sur la liste et examiner les items
  for (let item of list) {
    // Examination de l'id de l'item
    if (!!item.getIdComponent() && item.getIdComponent() === id) {
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
    if (props.hasOwnProperty(prop) && typeof props[prop] === "string") {
      //Si elle contient les moustaches, on les enlève, ainsi que les espace et on assigne dans une variable
      if (props.hasOwnProperty(prop) && props[prop].includes("{{")) {
        let pureProp = props[prop].replace("{{", "").replace("}}", "").trim();
        //On utilise propaccess pour parcourir le content
        props[prop] = propAccess({ content }, pureProp);
      }
    }
    //Si ce que l'on examine n'est pas une string, on appelle la récursivité jusqu'à ce que l'on accède bien à la prop de type string qu'on veut changer
    else if (props.hasOwnProperty(prop)) {
      props[prop] = interpolate(props[prop], content);
    }
  }
  // On retourne la props s'il a eut du changement, sinon le content s'il était ok de base
  return props;
}

/**
 * Permet de créer dynamiquement des props et son modèle
 * @param type
 * @param unprocessedProps
 */
export function getModelAndProps(unprocessedProps, type) {
  // Si props un objet, alors ce qui est passé est soit un objet d'attributs, soit des props classique
  // On ne s'occupe que du cas où c'est un props classique ici
  if (type_check_v1(unprocessedProps, "object")) {
    // On vérifie bien que ce sont des props
    const rules = ["attributs", "event", "children", "text"];
    // Variable ou les modèles et props seront accumulés
    const model = !!type ? { type } : {};
    const props = !!type ? { type } : {};
    // Boucle sur les rules pour vérifier si elle sont présentes
    for (const rule of rules) {
      if (unprocessedProps.hasOwnProperty(rule)) {
        // On récupère le modèle et la props qui seront accumulés
        const dynamic = getDynamicModelAndProps(unprocessedProps[rule]);
        if (rule !== "attributs") {
          // Gérer attributs qui est un objet, donc il faut aller chercher les props
          model[rule] = dynamic.model[rule];
          props[rule] = dynamic.props[rule];
        } else {
          // C'est l'objet attributs,
          // comme on ne veut pas attribut.attribut, on déstructure
          model[rule] = { ...dynamic.model[rule] };
          props[rule] = { ...dynamic.props[rule] };
        }
      }
    }
    return { model, props };
  } else {
    // C'est une propriété de props seul, on obtient son modèle et sa props et on revnoie
    const { model, props } = getDynamicModelAndProps(unprocessedProps);
    // setting du type
    model.type = !!type ? type : "";
    props.type = !!type ? type : "";
    return { model, props };
  }
}

export function getDynamicModelAndProps(unprocessedProps) {
  // Créer une props dynamique et son modèle en fonction de ce qui est envoyé
  // SI type est présent, on l'insert
  let props = {};
  let model = {};

  // Si c'est la props est un string, on cherche à créer du texte
  if (
    (unprocessedProps.hasOwnProperty("text") &&
      type_check_v1(unprocessedProps.text, "string")) ||
    typeof unprocessedProps === "string"
  ) {
    model.text = "string";
    props.text = !!unprocessedProps.text
      ? unprocessedProps.text
      : unprocessedProps;
  }
  // Si c'est un array, c'est soit un children soit des events
  else if (type_check_v1(unprocessedProps, "array")) {
    // On vérifie si le premier est une fonction
    if (
      !!unprocessedProps[0] &&
      type_check_v1(unprocessedProps[0], "function")
    ) {
      // C'est une fonction, on la charge donc dans event
      model.event = ["function"];
      props.event = unprocessedProps;
    } else if (
      unprocessedProps.hasOwnProperty("children") &&
      !!unprocessedProps[0] &&
      type_check_v1(unprocessedProps[0], "object")
    ) {
      // C'est donc des childrens
      model.children = [Component];
      props.children = unprocessedProps;
    }
  } else if (type_check_v1(unprocessedProps, "object")) {
    // Création des attributs et remplissage
    model.attributs = {};
    props.attributs = {};
    for (const [name, value] of Object.entries(unprocessedProps)) {
      //Si la propriété est bien à l'objet
      if (unprocessedProps.hasOwnProperty(name)) {
        // On regarde si l'attribut en question est légal
        if(!checkElementAttributes(name)) throw new Error("Attribut illégal détecté.");
        model.attributs[name] = typeof value;
        props.attributs[name] = value;
      }
    }
  }

  return { model, props };
}

export function createElement(element, data) {
  try {
    // Initialisation de l'Objet final
    let compo = {};
    // Si element est un string, on veut le créer en component
    if (type_check_v1(element, "string")) {
      // On déduit ses props des data passées en param
      // On donne le type span par défaut aux éléments non html
      const type = checkElementTags(element) ? element : "span";
      //On récupère le model et les props
      const propsAndModel = getModelAndProps(data, type);
      compo = new Component(
        propsAndModel.model,
        propsAndModel.props,
        propsAndModel.props
      );
    } else {
      // On créer directement le component
      compo = new element(data);
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
        type: checkElementTags(componentToDisplay)
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
