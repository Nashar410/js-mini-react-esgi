
import {Component} from '../esgireact/Component.module.js';
/**
 * preset de component : Footer (bas de page)
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

  // raccourci pour avoir la structure de l'extérieur
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
