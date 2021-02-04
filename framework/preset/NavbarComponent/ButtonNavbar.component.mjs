import * as EsgiReact from '../../esgireact/EsgiReact.module.mjs';

/**
 * preset de component : ButtonNavbar
 */
export class ButtonNavbarComponent extends EsgiReact.Component {

    
    constructor(content, children) {
        /** Le modèle à vérifier */
        var model = {
            attributs: {
                id: "string", // type du champ 
                class: "string", // type du champ 
                type: "string" // type du champ 
            },
            event: ['function'], // // type que peut avoir les events
            text: "string",
        };
        super(props, content);
    }
}