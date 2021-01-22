import * as Utils from './utils.module';

class Component {
    constructor(props, content, children) {

        /**
         *
         *
         *
         * TODO
         * VALIDER LES DONNEES ENTRANTES D'UNE FAÇON OU D'UNE AUTRE
         *
         *
         */

        // Variable privée

        // Génération de l'id du component
        var id = Utils.getUnsecureID();

        /** State courant du component */
        var currentState = new State(this.id, props, content, children);

        /** Mémoire du component */
        var oldState = {};

    }

    /**
     * Check si le nouveau state est égale à l'ancien
     * @param {*} oldState
     * @param {*} newState
     * @returns bool
     */
    shouldUpdate(oldState, newState) {
        // JSON.stringify des deux states pour comparer leur contenu
        return JSON.stringify(oldState.getProps()) !== JSON.stringify(newState.getProps())
            || JSON.stringify(oldState.getContent()) !== JSON.stringify(newState.getContent());
    }

    /**
     * Retourne un component avec les props données en paramètre
     * @param {*} newProps
     * @param {*} content
     * @returns
     */
    display(newState) {

/**
 *
 *
 *
 * TODO
 * VALIDER LES DONNEES ENTRANTES D'UNE FAÇON OU D'UNE AUTRE (se baser sur la
 * validation dans le constructeur)
 *
 *
 */

        // Affectation de l'ancien state avec la valeur du state courant pour sauvegarde
        this.setOldState(this.getCurrentState());

        // Vérifier si le state de l'application est égale aux new state envoyés
        if (this.shouldUpdate(this.getOldState(), newState)) {
            // On demande une mise à jour du component
            return this.render(this, newState);
        }

        return this;
    }

    /**
     * Mise à jour un component et de ses childrens
     * @param {*} this
     * @param {*} state
     * @param {*} content
     */
    render(state) {

        /**
         *
         * TODO
         *
         * THROW ERROR AU TEST
         */
        // Si le props n'est pas bon, on return le component directement
        if (this.getId() !== state.getComponentId()) return this;

        // Si oui, on affecte les newprops au currentState
        this.setCurrentState(state);

        // Si le component a des enfants
        if (!!this.oldState.getChildren()) {
            // Pour chacun d'entre eux
            for (let child of this.oldState.getChildren()) {
                // Récupération des props
                const locatedChildren = getPropsByComponentId(child.getId(), state.getChildren());

                // Si les props existent
                if (!!locatedChildren) {
                    // on passe le relais à la méthode de l'enfant pour qu'il se mette à jour ou non
                    child = child.display(locatedChildren.getCurrentState());
                } else {
                    // les props n'ont pas été retransmise, cela veut dire que ce component n'existe plus
                    child = undefined;
                }
            }
            // On enlève les éventuelles undefined
            this.children = this.children.filter(child => !!child);
        }
        return this;
    }

    convertToHtml() {
        let elementHTML = document.createElement(this.getCurrentState().getProps().type);
        for (const [key, value] of Object.entries(this.getCurrentState().getProps().attributs)) {
            elementHTML.setAttribute(key, value);
        }
        elementHTML.textContent(this.getCurrentState().getContent());
        if(!!this.getCurrentState().getChildren()) {
            for (let child of this.getCurrentState().getChildren()) {
                elementHTML.appendChild(child.convertToHtml());
            }
        }
        return elementHTML;
    }

    /** Setters */

    getComponentId() {
        return this.id;
    }

    getCurrentState() {
        return this.currentState;
    }

    getOldState() {
        return this.oldState
    }

    /** Getters */

    setCurrentState(currentState) {
        // Copie totalement l'objet currentState en créant un nouvel objet
        this.currentState = Object.assign({}, currentState);
    }

    setOldState(oldState) {
        // Copie totalement l'objet currentState en créant un nouvel objet
        this.oldState = Object.assign({}, oldState);
    }
}


class State {
    constructor(idComponent, props, content, children) {
        /** Id du component associé */
        var idComponent = idComponent;

        /** Proriété du component associée */
        var props = props;

        /** Contenu du component associé */
        var content = content;

        /** Enfant du component */
        var children = children;
    }

    getIdComponent() {
        return this.idComponent;
    }

    getProps() {
        return this.props;
    }

    getContent() {
        return this.content;
    }

    getChildren() {
        return this.children();
    }

    setProps(props) {
        this.props = props;
    }

    setContent(content) {
        this.content = content;
    }

    /**
    * Ajout un enfant au state
    * @param Component enfant
    */
    addChild(child) {
        this.children.push(child);
    }

    /**
    * Supprime un enfant au state 
    * @param Component enfant
    */
    removeChild(child) {
        this.children = this.children.filter(currentChild => currentChild.getId() !== child.getId())
    }

}

/**
 * Retourne le component visé par l'id demandé qui se trouve dans une list de components
 * @param string id Id du component
 * @param array list liste de component
 * @returns le component ou undefined
 */
function getComponentById(id, componentList) {
    return getFromListById(id, componentList);
}

/**
 * Retourne la props de la liste fourni s'il concorde avec l'id donnée
 * @param string id
 * @param array list liste des props
 * @returns le props correspondant ou undefined
 */
function getPropsByComponentId(id, propsList) {
    return getFromListById(id, propsList);
}

/**
 * Retourne l'item de la liste fourni s'il concorde avec l'id donnée
 * @param string id
 * @param array list liste de component ou liste de props
 * @returns un item de la liste concordant avec l'id  | un objet vide si rien n'a été trouvé
 */
function getFromListById(id, list) {
    // Variable retournée
    let result = undefined;

    // Boucler sur la liste et examiner les items
    for (let item of list) {
        // Examination de l'id de l'item selon le type de liste
        if ((!!item.getId() && item.getId() === id)
            || (!!item.getIdComponent() && item.getIdComponent() === id)) {
            // Affectation si l'id est reconnu
            result = item;
            //Arrêt de la boucle au premier trouvé
            break;
        }
    }
    return result;
}

function createElement(component, props, content, children){
    const newComp = new component(props, content, children);
    let proprietes = {
        type:'div',
        attributs : {
            id: 'maDiv',
            className: 'maClass',
        }
    }
    let elementHTML = document.createElement(props.type);
    for (const [key, value] of Object.entries(props.attributs)) {
        elementHTML.setAttribute(key, value);
    }
    elementHTML.textContent(content);
    if(!!children) {
        for (let child of children) {
            createElement(child);

            elementHTML.appendChild(child);
        }
    }
}

export {
    Component,
    State,
    getComponentById,
    getPropsByComponentId,
    createElement
}

/***
 *
 *
 * Avant propos :
 * J'ai rajouté un id au component et aux props, de sorte à ce qu'on puisse lié les deux
 * J'ai créer un objet State qui contiendra les props, l'id du component associé et le content
 * L'id sera à rajouter dans un attribut data quand on passera en HTML, sorte à ce que :
 * component.getId() = "aaaaa";
 *
 *
 * Done en HTML après le cretateElement
 * <unELementHtml data-id="aaaaa"></unElementHtml>
 * document.querySelectorAll('[data-foo="value"]');
 *
 * Algo render(componentToAffiche, componentOuEndroitToAppend)
 *
 * Check si componentOuEndroitToAppend est un Component ou un Objet HTML
 * Si Component > localiser son HTML dans le dom grâce à son data-id
 * Append le componentToAffiche dans le componentOuEndroitToAppend
 * Créer la version HTML à partir des props et content dans les states (props access à placer?)
 * Vérifier si le componentOuEndroitToAppend a des children
 * Si oui, pour chaque child de children, lancer de nouveau la fonction avec createElement(child, componentOuEndroitToAppend)
 */

