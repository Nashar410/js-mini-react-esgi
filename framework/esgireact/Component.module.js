import * as Utils from "../utils/Utils.module.js";
import { State } from "./State.module.js";
import { getPropsByComponentId, interpolate } from "./EsgiReactDOM.module.js";

/**
 * Cette class est un component de base
 * Contient toutes les méthodes pour se créer et se mettre à jour
 */
export class Component {
  constructor(componentModel, propsStructure, propsSend) {
    /** Vérification des entrants */

    // Si les props envoyés correspondent bien au modèle du component
    if (!Utils.type_check_v4(componentModel, propsSend)) {
      throw new Error(
        "Les proriétés soumises ne respectent pas le modèle pour ce component"
      );
    }

    let props = {};
    try {
      // On colle le contenu des props send dans les props
      props = interpolate(propsStructure, propsSend);
    } catch (e) {
      throw e;
    }
    // Variable privée

    // Génération de l'id du component
    var id = Utils.getUnsecureID();

    /** State courant du component */
    var currentState = new State(id, props, propsSend);

    /** Mémoire du component */
    var oldState = {};

    /** Getters */

    this.getComponentId = function () {
      return id;
    };

    this.getCurrentState = function () {
      return currentState;
    };

    this.getOldState = function () {
      return oldState;
    };

    /** Setters */

    this.setCurrentState = function (currentState) {
      // Copie totalement l'objet currentState en créant un nouvel objet
      currentState = Object.assign({}, currentState);
    };

    this.setOldState = function (oldState) {
      // Copie totalement l'objet currentState en créant un nouvel objet
      oldState = Object.assign({}, oldState);
    };
  }

  /**
   * Check si le nouveau state est égale à l'ancien
   * @param {*} oldState
   * @param {*} newState
   * @returns boolean
   */
  shouldUpdate(oldState, newState) {
    // JSON.stringify des deux states pour comparer leur contenu
    return (
      JSON.stringify(oldState.getProps()) !==
        JSON.stringify(newState.getProps()) ||
      JSON.stringify(oldState.getContent()) !==
        JSON.stringify(newState.getContent())
    );
  }

  /**
   * Retourne un component avec les props données en paramètre
   * @returns
   * @param newState
   */
  display(newState) {
    // Affectation de l'ancien state avec la valeur du state courant pour sauvegarde
    this.setOldState(this.getCurrentState());

    // Vérifier si le state de l'application est égale aux new state envoyés
    if (this.shouldUpdate(this.getOldState(), newState)) {
      // On demande une mise à jour du component
      return this.render(this, newState);
    }

    return this.convertToHtml();
  }

  /**
   * Mise à jour un component et de ses childrens
   * @param {*} this
   * @param {*} state
   * @param {*} content
   */
  render(state) {
    // Si le props n'est pas bon, on lève une exception
    if (this.getComponentId() !== state.getComponentId())
      throw new Error(`l'id ${state.getComponentId()} n'est pas correct`);

    // Si oui, on affecte les newprops au currentState
    this.setCurrentState(state);

    // Si le component a des enfants
    if (!!this.getOldState().getChildren()) {
      // Pour chacun d'entre eux
      for (let child of this.getOldState().getChildren()) {
        // Récupération des props
        const locatedChildren = getPropsByComponentId(
          child.getComponentId(),
          state.getChildren()
        );

        // Si les props existent
        if (!!locatedChildren) {
          // on passe le relais à la méthode de l'enfant pour qu'il se mette à jour ou non
          child = child.display(locatedChildren.getCurrentState());
        } else {
          // les props n'ont pas été retransmise, cela veut dire que ce component n'existe plus
          child = undefined;
        }
      }
      // On enlève les éventuelles undefined
      this.children = this.children.filter((child) => !!child);
    }
    return this.convertToHtml();
  }

  /**
   * Transformation du component et de ses childrens en html
   */
  convertToHtml() {
    //On insère dans une variable le résultat de l'interpolation des props et du content (contenu dans un nouvel objet)
    let propsValue = interpolate(
      Object.assign({}, this.getCurrentState().getProps()),
      this.getCurrentState().getContent()
    );

    //Dans une variable, on créer un élement sur les props du state courant
    let elementHTML = document.createElement(propsValue.type);

    //On boucle sur les attributs si ils existent, pour définir chacun de ses attributs sur notre nouvel élement
    if (!!propsValue.attributs) {
      for (const [key, value] of Object.entries(propsValue.attributs)) {
        elementHTML.setAttribute(key, value);
      }
    }

    //On boucle sur les évènements rattachés à l'élement si ils existent pour les lui assigner
    if (!!propsValue.event) {
      for (const ev of propsValue.event) {
        elementHTML.addEventListener(ev.name, ev);
      }
    }
    //On définit le contenu textuel de l'élement s'il existe en récupérant le contenu du state courant
    if (!!this.getCurrentState().getContent().text) {
      elementHTML.textContent = this.getCurrentState().getContent().text;
    }

    // PLacer l'id du component dans le data de l'élément
    elementHTML.setAttribute("data-id", this.getComponentId());

    //On vérifie sur des enfants existent, si oui on boucle sur chacun d'entre eux
    if (!!this.getCurrentState().getChildren()) {
      for (let child of this.getCurrentState().getChildren()) {
        //Pour chaque enfant, on le converti en HTML et on l'insère à notre nouvel élement
        elementHTML.appendChild(child);
      }
    }
    // On l'instance de ce component dans l'HTML
    elementHTML.component = this;

    return elementHTML;
  }
}
