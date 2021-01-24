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
        var content = {
            id: 'monId',
            class: 'maClass',
            text: 'monText',
        }
        super(props, content, children);
    }
}