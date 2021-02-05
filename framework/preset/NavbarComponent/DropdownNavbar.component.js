import * as EsgiReact from '../../esgireact/EsgiReact.module.js';

/**
 * preset de component : DropdownNavbar
 */
export class DropdownNavbarComponent extends EsgiReact.Component {

    
    constructor(content, children) {

        /** Le modèle à vérifier */
        var model = {
            attributs: {
                id: "string",
                class: "string",
            },
            text: "string",
        };
        super(props, content, children);
    }
}