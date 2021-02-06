import { Component } from "../../esgireact/EsgiReact.module.js";

/**
 * preset de component : MainBody
 */
export class MainBodyComponent extends Component {
  /** Définiton du modèle et de la structure **/
  static componentModel = {
    type: "string",
    attributs: {
      id: "string",
      class: "string",
    },
    text: "string",
    children: [Component],
    event: ["function"],
  };

  static propStructure() {
    return {
      type: "main",
      attributs: {
        id: "{{ content.attributs.id }}",
        class: "{{ content.attributs.class }}",
      },
      text: "{{ content.text }}",
      children: "{{ content.children }}",
      event: "{{ content.event }}",
    };
  }

  constructor(props) {
    super(
      MainBodyComponent.componentModel,
      MainBodyComponent.propStructure(),
      props
    );
  }

  static getPropsStructured() {
    return {
      type: "main",
      attributs: {
        id: "",
        class: "",
      },
      text: "",
      children: [],
      event: [],
    };
  }
}
