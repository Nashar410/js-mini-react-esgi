import { AbstractView } from "./AbstractView.view.js";
import {MainBodyComponent} from '../../../../framework/preset/MainComponent/MainBody.component.js';
import {createElement} from '../../../../framework/esgireact/EsgiReactDOM.module.js';
import {BaseView} from './Base.view.js';

export class ChristopheView extends AbstractView {

    constructor() {
        super();
        this.setTitle("Page de Christophe");
    }

    async getPage(){
        // On construit la page
        // On récupère nos éléments, dans l'ordre que l'on désire
        const elements = [
            BaseView.getNavbar(),
            this.getMainBody(),
            BaseView.getFooter()
        ];

        // On créer la vue de la page
        let christophePage = document.createElement("div");
        christophePage.setAttribute('id', "currentPage" );

        // On les ajoute au root
        for (const elem of elements) {
            christophePage.appendChild(elem);
        }

        return christophePage;
    }

    getMainBody(){
        const propsMainBody = MainBodyComponent.getPropsStructured();
        const h1Title = createElement("h1", "Page de Chris !");
        const p = createElement('p', "lorem ipsum sfdwsdhbfwsd ncv bwsdbvsdfw  cfwjfsdvgfws bhjg");

        //const onClick = ($event) => alert(!!$event ? $event.target.id : "pas event");

        //const btn = createElement("button", onClick);

        propsMainBody.children = [h1Title, p];
        return createElement(MainBodyComponent, propsMainBody);
    }

}