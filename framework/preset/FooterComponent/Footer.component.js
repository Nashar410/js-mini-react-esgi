import { Component } from "../../esgireact/EsgiReact.module.js";

/**
 * preset de component : Navbar
 */
export class FooterComponent extends Component {
  /** Définiton du modèle et de la structure **/
  static componentModel = {
    type: "string",
    attributs: {
      class: "string",
    },
    text: "string",
  };

  static propStructure() {
    return {
      type: "footer",
      attributs: {
        class: "{{ content.attributs.class }}",
      },
      text: "{{ content.text }}",
    };
  }

  constructor(props) {
    super(
      FooterComponent.componentModel,
      FooterComponent.propStructure(),
      props
    );
  }

  static getPropsStructured() {
    return {
      type: "footer",
      attributs: {
        class: "",
      },
      text: "",
    };
  }
}
