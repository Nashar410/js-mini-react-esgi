import { AbstractView } from "./AbstractView.view.js";
import {
  LinkNavbarComponent,
  NavbarComponent,
} from "../../../../framework/preset/NavbarComponent/Navbar.module.js";
import {
  createElement,
  render,
} from "../../../../framework/esgireact/EsgiReactDOM.module.js";
import { FooterComponent } from "../../../../framework/preset/FooterComponent/Footer.module.js";
import { MainBodyComponent } from "../../../../framework/preset/MainComponent/Main.module.js";
import {BaseView} from './Base.view.js';

export class AccueilView extends AbstractView {
  constructor() {
    super();
    this.setTitle("Accueil ESGIReact");
  }

  async getPage() {
    // On construit la page
    // On récupère nos éléments, dans l'ordre que l'on désire
    const elements = [BaseView.getNavbar(), this.getMainBody(), BaseView.getFooter()];

    // On créer la vue de la page
    let accueil = document.createElement("div");
    accueil.setAttribute('id', "currentPage" );

    // On les ajoute au root
    for (const elem of elements) {
      accueil.appendChild(elem);
    }

    return accueil;
  }


  getMainBody() {
    //Préparation des props du body
    const propsMainBody = MainBodyComponent.getPropsStructured();
    propsMainBody.text = ``;
    //Première enfant, un title
    const h1Title = createElement("h1", "Bienvenue !");
    const h2Title = createElement(
      "h2",
      "Ce site a été généré avec EsgiReact !"
    );
    const pTextPresentation1 = createElement(
      "p",
      `La totalité du HTML sur ce site a été généré avec notre framework. Personne n'a modifié directement le HTML... C'est EsgiReact qui s'en est occupé !`
    );
    const pTextPresentation2 = createElement(
      "p",
      `Nous espérons que la visite vous plaira. Nos CV sont trouvable dans les autres pages du site.`
    );

    const pTextPresentation3 = createElement(
      "p",
      `En attendant, voici un tableau`
    );

    //On rajoute les children
    propsMainBody.children = [
      h1Title,
      h2Title,
      pTextPresentation1,
      pTextPresentation2,
      pTextPresentation3,
    ];

    return createElement(MainBodyComponent, propsMainBody);
  }
}
