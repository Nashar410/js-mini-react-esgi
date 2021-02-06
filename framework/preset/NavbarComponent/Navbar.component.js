import { Component } from "../../esgireact/EsgiReact.module.js";
import { LinkNavbarComponent } from "./LinkNavbar.component.js";

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

  constructor(props) {
    super(NavbarComponent.componentModel, NavbarComponent.propStructure(), props);
  }

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
}
