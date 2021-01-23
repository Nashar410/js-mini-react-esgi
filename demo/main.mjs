import * as EsgiReact from '../framework/esgireact/EsgiReact.module.mjs';
import * as Utils from '../framework/Utils.module.mjs';
import { NavBarComponent } from '../framework/pressets/Navbar.module.mjs';



const compo = new NavBarComponent(
    {
        type: "div",
        attributs: { id: "monId", class: "maClass aa" }
    },
    "Je suis une Div",
    undefined
);

Utils.l(compo.convertToHtml());