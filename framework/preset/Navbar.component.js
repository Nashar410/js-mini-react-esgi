import { LinkNavbarComponent } from "./LinkNavbar.component.js";
import {Component} from '../esgireact/Component.module.js';

/**
 * preset de component : Navbar
 */
export class NavbarComponent extends Component {

  /** Définiton du modèle et de la structure **/

  static componentModel = {
    type: "string",
    attributs: {
      id: "string",
      class: "string",
    },
    children: [LinkNavbarComponent],
  };

  static propStructure() {
    return {
      type: "nav",
      attributs: {
        id: "{{ content.attributs.id }}",
        class: "{{ content.attributs.class }}",
      },
      children: "{{ content.children }}",
    };
  }

  // raccourci pour avoir la structure de l'extérieur
  static getPropsStructured() {
    return {
      type: "nav",
      attributs: {
        id: "",
        class: "",
      },
      children: [],
    };
  }

  constructor(props) {
    super(NavbarComponent.componentModel, NavbarComponent.propStructure(), props);
  }


}
