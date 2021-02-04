import * as EsgiReact from '../../esgireact/EsgiReact.module.mjs';
import {ButtonNavbarComponent} from '../NavbarComponent/ButtonNavbar.component.mjs';
import {DropdownNavBarComponent} from '../NavbarComponent/DropdownNavbar.component.mjs';

/**
 * preset de component : Navbar
 */
export class NavBarComponent extends EsgiReact.Component {

    
    constructor(content) {
        /** Le modèle à vérifier */
        var model = {
            attributs: {
                id: "string", // type du champ id
                class: "string", // type du champ id
            },
            text: "string",
            children: [ButtonNavbarComponent.name, DropdownNavBarComponent.name] // type que peuvent avoir les childrens
        };

        // Ici : 
        // if(type_check(model, content)) ... on continue, sinon throw error

        var props = {
            type: 'nav',
            attributs: {
                id: "{{ content.id }}",
                class: "{{ content.class }}",
            },
            text: "{{ content.text }}",
            children: "{{ content.children }}",
            event: "{{ content.event }}"
        };

        /**
         * Ici seront fait :
         * props = interpolate(props, content)
         *  */ 

        super(props, content);
    }
}