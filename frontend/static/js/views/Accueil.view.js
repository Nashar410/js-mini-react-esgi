import { AbstractView } from "./AbstractView.view.js";
import {
  createComponent
} from "../../../../framework/esgireact/EsgiReactDOM.module.js";
import {BaseView} from './Base.view.js';
import {MainBodyComponent} from '../../../../framework/preset/MainBody.component.js';

/**
 * View d'accueil
 */
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
    let accueil = BaseView.getBasePage();

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
    const h1Title = createComponent("h1", "Bienvenue !");
    const h2Title = createComponent(
      "h2",
      "Ce site a été généré avec EsgiReact !"
    );
    const pTextPresentation1 = createComponent(
      "p",
      `La totalité du HTML sur ce site a été généré avec notre framework. Personne n'a modifié directement le HTML... C'est EsgiReact qui s'en est occupé !`
    );
    const pTextPresentation2 = createComponent(
      "p",
      `Nous espérons que la visite vous plaira. Nos pages sont accessibles via le menu du site`
    );

    //On rajoute les children
    propsMainBody.children = [
      h1Title,
      h2Title,
      pTextPresentation1,
      pTextPresentation2,
    ];

    return createComponent(MainBodyComponent, propsMainBody);
  }
}
