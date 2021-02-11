import { NavbarComponent } from "../../../../framework/preset/Navbar.component.js";
import { LinkNavbarComponent } from "../../../../framework/preset/LinkNavbar.component.js";
import { createComponent } from "../../../../framework/esgireact/EsgiReactDOM.module.js";
import { FooterComponent } from "../../../../framework/preset/Footer.component.js";

export class BaseView {
  /**
   * Construit la navbar avec des liens de navigaton
   * @returns {*}
   */
  static getNavbar() {
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
      let propsLinkNavbar = LinkNavbarComponent.getPropsStructured();
      propsLinkNavbar.attributs = {
        id: childData.id,
        class: "w3-bar-item w3-button w3-hover-light-grey w3-xlarge navlink",
        dataLink: true,
        href: childData.href,
      };

      propsLinkNavbar.text = childData.text;
      // On le rajoute dans les props de la navbar
      propsNavbar.children.push(
        createComponent(LinkNavbarComponent, propsLinkNavbar)
      );
    }

    // On peut construire la navbar maintenant
    return createComponent(NavbarComponent, propsNavbar);
  }

  /**
   * Construit le footer de la view
   * @returns {*}
   */
  static getFooter() {
    // Préparation des props du footer
    const propsFooter = FooterComponent.getPropsStructured();
    propsFooter.attributs.class = "w3-container w3-teal footer";
    propsFooter.text = `Ce site a été réalisé par AIT AMARA Mohand, JACQUENET Christophe et 
        ROBERT Mathieu pour le cours de Javascript l'ESGI.`;

    // On créer l'élément qu'on retourne
    return createComponent(FooterComponent, propsFooter);
  }

  /**
   * Construit la div de base d'une page
   * @returns {HTMLDivElement}
   */
  static getBasePage() {
    const div = document.createElement("div");
    div.setAttribute("id", "currentPage");
    return div;
  }
}
