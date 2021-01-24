import * as EsgiReact from '../esgireact/EsgiReact.module.mjs';

/**
 * Presset de component : Navbar
 */
export class NavBarComponent extends EsgiReact.Component {
    constructor(content, children) {
        var props = {
            type: 'nav',
            attributs: {
                id: "{{ content.id }}",
                class: "{{ content.class }}",
            },
            text: "{{ content.text }}"
        };
        super(props, content, children);
    }
}