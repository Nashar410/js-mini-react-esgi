import AbstractView from "./AbstractView.view.js";
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

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Accueil ESGIReact");
  }

  async getPage() {
    // On construit la page
    // On récupère nos éléments, dans l'ordre que l'on désire
    const elements = [this.getNavbar(), this.getMainBody(), this.getFooter()];

    // On créer la vue de la page
    let accueil = document.createElement("div");

    // On les ajoute au root
    for (const elem of elements) {
      accueil.appendChild(elem);
    }

    return accueil;
  }

  /**
   * Construit la navbar avec des liens de navigaton
   * @returns {*}
   */
  getNavbar() {
    // On récupère le modèle de navbar static pour travailler dessus
    const propsNavbar = NavbarComponent.getPropsStructured();
    // On rempli ses props avec notre content
    propsNavbar.attributs = {
      id: "navbarDemo",
      class: "w3-bar w3-border w3-black",
    };
    // On prépare la navbar pour push dedans dans la boucle
    propsNavbar.children = [];

    // On fait ses childrens : des liens (créer via une boucle pour gagner du temps)
    let linkContent = [
      { id: "navLink", href: "/", text: "Accueil" },
      { id: "navLink1", href: "/mohand", text: "CV de Mohand" },
      { id: "navLink2", href: "/mathieu", text: "CV de Mathieu" },
      { id: "navLink3", href: "/christophe", text: "CV de Christophe" },
    ];

    for (const childData of linkContent) {
      // Copie de la structure du component pour ne pas faire de bétise
      const propsLinkNavbar = LinkNavbarComponent.getPropsStructured();
      propsLinkNavbar.attributs = {
        id: childData.id,
        class: "w3-bar-item w3-button w3-hover-light-grey w3-xlarge navlink",
        dataLink: true,
        href: childData.href,
      };
      propsLinkNavbar.text = childData.text;
      // On le rajoute dans les props de la navbar
      propsNavbar.children.push(
        createElement(LinkNavbarComponent, propsLinkNavbar)
      );
    }

    // On peut construire la navbar maintenant
    return createElement(NavbarComponent, propsNavbar);
  }

  getFooter() {
    // Préparation des props du footer
    const propsFooter = FooterComponent.getPropsStructured();
    propsFooter.attributs.class = "w3-container w3-teal footer";
    propsFooter.text = `Ce site a été réalisé par AIT AMARA Mohand, JACQUENET Christophe et 
        ROBERT Mathieu pour le cours de Javascript l'ESGI.`;

    // On créer l'élément qu'on retourne
    return createElement(FooterComponent, propsFooter);
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
