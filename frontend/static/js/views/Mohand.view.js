import { AbstractView } from "./AbstractView.view.js";
import { MainBodyComponent } from "../../../../framework/preset/MainBody.component.js";
import {
  createComponent,
  getComponentByDOMId,
} from "../../../../framework/esgireact/EsgiReactDOM.module.js";
import { BaseView } from "./Base.view.js";

export class MohandView extends AbstractView {
  constructor() {
    super();
    this.setTitle("Page de Mohand");
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
    let mohandPage = BaseView.getBasePage();

    // On les ajoute au root
    for (const elem of elements) {
      mohandPage.appendChild(elem);
    }

    return mohandPage;
  }

  getMainBody() {
    const propsMainBody = MainBodyComponent.getPropsStructured();
    const h1Title = createComponent(
      "h1",
      "Page de bon goût !"
    );

    propsMainBody.children = [
      h1Title,
      this.getBtnVideo(),
      this.getFrameVideo()
    ];
    propsMainBody.attributs.class = "w3-container w3-light-grey";
    propsMainBody.attributs.id = "mainBody";

    return createComponent(MainBodyComponent, propsMainBody);
  }

  getBtnVideo() {
      const click = () => {
        let tab = [];
        fetch('/frontend/static/js/assets/youtubeLinks.json')
        .then(data => data.json())
        .then(function(link) {
            console.log(link);
            const iframeToChange = getComponentByDOMId("video");
            const stateIframe = iframeToChange.getState();
            stateIframe.attributs.src = link[Math.floor(Math.random() * link.length)];
            iframeToChange.setState(stateIframe);
        })
      };
      return createComponent("button", {
          text : `Video generator`,
          attributs : {
              id : 'btnVideo',
              class : 'w3-blue w3-panel w3-padding w3-large',
          },
          event : [click]
      });
  }

  getFrameVideo() {
      return createComponent("iframe", {
        attributs : {
            id : 'video',
            width : '560',
            height : '315',
            src : "https://www.youtube.com/embed/civgUOommC8",
            style : "display: block;"
        } 
      })
  }
}
