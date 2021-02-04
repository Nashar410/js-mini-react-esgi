import * as EsgiReact from '../../esgireact/EsgiReact.module.mjs';

/**
 * preset de component : DropdownNavbar
 */
export class DropdownNavBarComponent extends EsgiReact.Component {

    
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