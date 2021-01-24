import * as EsgiReact from '../framework/esgireact/EsgiReact.module.mjs';
import * as Utils from '../framework/Utils.module.mjs';
import { NavBarComponent } from '../framework/pressets/Navbar.module.mjs';



const compo = new NavBarComponent(
    //Ajout de content pour tester la création de l'élement
    {
        id: 'monId',
        class: 'maClass',
        text: 'monText',
    },
    undefined
);

Utils.l(compo.convertToHtml());