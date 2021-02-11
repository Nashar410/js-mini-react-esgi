import * as Utils from "../utils/Utils.module.js";
import {
  getComponentByDOMId,
  getHTMLElementByComponentId,
  getPropsByComponentId,
  interpolate,
} from "./EsgiReactDOM.module.js";
import { deepCopy, deepEqual } from "../utils/Utils.module.js";

/**
 * Cette class est un component de base
 * Contient toutes les méthodes pour se créer et se mettre à jour
 */
export class Component {
  /** State, ne doit pas être utilisé pour la mise à jour, préféré getState qui en rend une copie
   */
  currentState;

  /**
   *
   * @param componentModel
   * @param propsStructure
   * @param propsSend
   */
  constructor(componentModel, propsStructure, propsSend) {
    /** Vérification des entrants */

    // Si les props envoyés correspondent bien au modèle du component
    if (!Utils.type_check_v4(componentModel, propsSend)) {
      throw new Error(
        "Les proriétés soumises ne respectent pas le modèle pour ce component"
      );
    }

    // Si les props arrivent à s'interpolate
    let props = {};
    try {
      // On colle le contenu des props send dans les props
      props = interpolate(propsStructure, propsSend);
    } catch (e) {
      throw e;
    }

    // Affectation des props au state
    this.currentState = props;

    // Variable privée

    // Génération de l'id du component
    var id = Utils.getUnsecureID();

    /** Getters */

    this.getComponentId = function () {
      return id;
    };

    /** Setter du currentState, effectue un copie profonde des newProps et l'affecte au state */
    this.setCurrentState = function (newProps) {
      // Sauvegarde des childrens pour ne pas qu'il soit copié/découplé
      const children = !!newProps.children
        ? [...newProps.children]
        : [];

      // Copie totalement l'objet currentState en créant un nouvel objet
      this.currentState = deepCopy(newProps);

      //Réaffectation des children
      this.currentState.children = !!children ? children : [];
    };
  }

  /**
   * Retourne une copie du currentState
   * @returns {*}
   */
  getState() {
    // Sauvegarde des childrens pour ne pas qu'il soit copié/découplé
    const children = !!this.currentState.children
      ? [...this.currentState.children]
      : [];

    // Copie totalement l'objet currentState en créant un nouvel objet
    const copy = deepCopy(this.currentState);

    //Réaffectation des children
    copy.children = !!children ? children : [];

    return copy;
  }

  /**
   * Lance la procédure de mise à jour du component
   * @param newProps
   * @returns {*}
   */
  setState(newProps) {
    return this.display(newProps);
  }

  /**
   * Check si le nouveau state est égale à l'ancien
   * @param {*} newProps
   * @returns boolean
   */
  shouldUpdate(newProps) {
    return !deepEqual(this.currentState, newProps);
  }

  /**
   * Retourne un component avec les props données en paramètre
   * @returns
   * @param newProps
   */
  display(newProps) {
    // Vérifier si le state de l'application est égale aux new props envoyés
    if (this.shouldUpdate(newProps)) {
      // On demande une mise à jour du component
      return this.render(newProps);
    }
    return this.convertToHtml();
  }

  /**
   * Mise à jour un component et de ses childrens
   * @param {*} newProps
   */
  render(newProps) {
    // On effectue une sauvegarde du state

    // Si la props courant ou entrant a des event
    if (!deepEqual(this.currentState.event, newProps.event)) {
      this.currentState.event = newProps.event;
    }

    // Si le component a des children
    if (!deepEqual(this.currentState.children, newProps.children)) {
      // on boucle sur les childrens entrant

      for (const child of newProps.children) {
        // Pour chacun d'eux, déterminer s'ils sont présents dans les anciennes
        const currentChild = this.currentState.children.filter(
          (ch) => ch.getComponentId() === child.getComponentId()
        );
        // s'il l'est, il faut demander une maj
        if (!!currentChild) {
          // On demande au child de voir s'il a besoin d'une mise à jour, il s'occupe du reste
          currentChild.setState(child.getState());
        } else {
          // Il ne l'est pas, on l'ajoute
          this.currentState.children.push(child);
        }
      }
      // Enfin, on gère le cas d'une suppression en ne récupérant que les childrens commun au deux listes de children
      this.currentState.children = newProps.children.filter((chNewProps) =>
        this.currentState.children.includes(
          (chCurrentState) =>
            chCurrentState.getComponentId() === chNewProps.getComponentId()
        )
      );
    }

    // S'il y a une différence dans les attributs, on opère le changement
    if (!deepEqual(this.currentState.attributs, newProps.attributs)) {
      this.currentState.attributs = newProps.attributs;
    }

    // On change le text aussi en conséquence s'il y a du changement
    if (!deepEqual(this.currentState.text, newProps.text)) {
      this.currentState.text = newProps.text;
    }

    return this.convertToHtml();
  }

  /**
   * Transformation du component et de ses childrens en html
   */
  convertToHtml() {
    //Dans une variable, on créer un élement sur les props du state courant
    let elementHTML = document.createElement(this.currentState.type);

    //On boucle sur les attributs si ils existent, pour définir chacun de ses attributs sur notre nouvel élement
    if (!!this.currentState.attributs) {
      for (const [key, value] of Object.entries(this.currentState.attributs)) {
        // exemple : "id" "monId" ; "class" " maClass container collapse"
        elementHTML.setAttribute(key, value);
      }
    }

    //On boucle sur les évènements rattachés à l'élement si ils existent pour les lui assigner
    if (!!this.currentState.event) {
      for (const ev of this.currentState.event) {
        // exemple : "click" "()=>alert("coucou") ; "change" "($event) => console.log($event.target.value)"
        elementHTML.addEventListener(ev.name, ev);
      }
    }
    //On définit le contenu textuel de l'élement s'il existe en récupérant le contenu du state courant
    if (!!this.currentState.text) {
      elementHTML.textContent = this.currentState.text;
    }

    // PLacer l'id du component dans le data de l'élément
    // Donnera par exemple <div id="..." data-id="klopsd04.kj">Mon component div</div>
    elementHTML.setAttribute("data-id", this.getComponentId());

    //On vérifie sur des enfants existent
    if (!!this.currentState.children) {
      //  si oui on boucle sur chacun d'entre eux
      for (let child of this.currentState.children) {
        //Pour chaque enfant, l'insèrer à notre nouvel élement
        elementHTML.appendChild(child);
      }
    }
    // On stock le component actuelle dans l'HTML pour le retrouver rapidement
    elementHTML.component = this;

    // Si la vu existe dans le DOM, on la remplace par celle qu'on vient de créer, sinon on retourne l'élément html
    const existingHTML = getHTMLElementByComponentId(this.getComponentId());
    if (!!existingHTML) {
      // On remplace
      existingHTML.parentNode.replaceChild(elementHTML, existingHTML);
    } else {
      // Sinon retourne directement l'html
      return elementHTML;
    }
  }
}
