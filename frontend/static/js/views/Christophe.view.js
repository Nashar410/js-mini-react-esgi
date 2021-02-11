import { AbstractView } from "./AbstractView.view.js";
import { MainBodyComponent } from "../../../../framework/preset/MainBody.component.js";
import {
  createComponent,
  getComponentByDOMId,
} from "../../../../framework/esgireact/EsgiReactDOM.module.js";
import { BaseView } from "./Base.view.js";

export class ChristopheView extends AbstractView {
  constructor() {
    super();
    this.setTitle("Page de Christophe");
  }

  async getPage() {
    // On construit la page
    // On récupère nos éléments, dans l'ordre que l'on désire
    const elements = [
      BaseView.getNavbar(),
      this.getMainBody(),
      BaseView.getFooter(),
    ];

    // On créer la vue de la page
    let christophePage = BaseView.getBasePage();

    // On les ajoute au root
    for (const elem of elements) {
      christophePage.appendChild(elem);
    }

    return christophePage;
  }

  getMainBody() {
    const propsMainBody = MainBodyComponent.getPropsStructured();
    const h1Title = createComponent(
      "h1",
      "Page basique de présentation du framework!"
    );

    propsMainBody.children = [
      h1Title,
      this.getRandomizerButton(),
      this.getDivToChange(),
      this.getBtnChangeColor(),
      this.getForm(),
    ];
    propsMainBody.attributs.class = "w3-container w3-light-grey";
    propsMainBody.attributs.id = "mainBody";

    return createComponent(MainBodyComponent, propsMainBody);
  }

  getForm() {
    const keyup = ($event) => {
      // Récupération du p via son id
      const pToChange = getComponentByDOMId("pToChange");
      // Mise à jour du component en oneliner
      pToChange.setState({
        ...pToChange.getState(),
        text: $event.target.value,
      });
    };
    return createComponent("form", {
      attributs: {
        class: "w3-container w3-card-4 w3-round-large w3-pink",
        id: "formInput",
      },
      children: [
        createComponent("label", "Ce que vous écrivez ici sera copié dans la div !"),
        createComponent("input", {
          attributs: {
            id: "inputField",
            class: "w3-input w3-border w3-round-large w3-margin-bottom",
            type: "text",
            placeholder:
              "Remplissez moi pour changer le contenu de la div colorée en temps réel!",
          },
          event: [keyup],
        }),
      ],
    });
  }

  getDivToChange() {
    return createComponent("div", {
      text: `Cet élément HTML se met à jour en fonction des intéractions que vous avez avec la page.`,
      attributs: {
        id: "divToChange",
        class: "w3-blue w3-panel w3-padding w3-large",
      },
      children: [
        createComponent("p", {
          text: `Ce texte change en fonction du contenu de l'input.
          Bien sûr, les mêmes résultats peuvent être obtenu avec du Javascript basique, mais nous n'utilisons que les méthodes de notre EsgiReact.`,
          attributs: { id: "pToChange", class: "w3-medium" },
        }),
      ],
    });
  }

  getBtnChangeColor() {
    const click = () => {
      // Récupération de la div via son id
      const divToChange = getComponentByDOMId("divToChange");

      console.log("click1", divToChange.getState());
      // Copy du state à modifier
      const stateDiv = divToChange.getState();

      //On effectue nos changements
      stateDiv.attributs.style = `background:${
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      }!important`;

      // On donne les nouvelles props au component pour qu'il fasse la maj
      divToChange.setState(stateDiv);
    };

    return createComponent("button", {
      text: "Cliquez pour changer la couleur du block ! ",
      attributs: {
        id: "btnChangeColor",
        class: "w3-button w3-margin-bottom w3-medium w3-indigo w3-hover-purple",
      },
      event: [click],
    });
  }

  getRandomizerButton() {
    const click = () => {
      // récupération du component
      const mainBodyComponent = getComponentByDOMId("mainBody");
      // Récupération des childrens du component principal

      // Let's shuffle !
      mainBodyComponent.setState({
        ...mainBodyComponent.getState(),
        children: mainBodyComponent
            .currentState
            .children.sort(() => Math.random() - 0.5),
      });
    };
    return createComponent("button", {
      text: "Shuffle !",
      attributs: {
        id: "ShuffleBtn",
        class:
          "w3-btn w3-round-xlarge w3-margin-bottom w3-medium w3-aqua w3-hover-pink",
      },
      event: [click],
    });
  }
}
