import { Component } from "../../esgireact/EsgiReact.module.js";

/**
 * preset de component : Navbar
 */
export class LinkNavbarComponent extends Component {
  /** Définiton du modèle et de la structure **/
  static componentModel = {
    type: "string",
    attributs: {
      id: "string",
      class: "string",
      href: "string",
      dataLink: "boolean",
    },
    text: "string",
  };

  static propStructure() {
    return {
      type: "a",
      attributs: {
        id: "{{ content.attributs.id }} ",
        class: "{{ content.attributs.class }} ",
        href: "{{ content.attributs.href }} ",
        dataLink: "{{ content.attributs.dataLink }}",
      },
      text: "{{ content.text }}",
    };
  }

  constructor(props) {
    super(
      LinkNavbarComponent.componentModel,
      LinkNavbarComponent.propStructure(),
      props
    );
  }

  static getPropsStructured() {
    return {
      type: "a",
      attributs: {
        id: "",
        class: "",
        href: "",
        dataLink: "",
      },
      text: "",
    };
  }
}
