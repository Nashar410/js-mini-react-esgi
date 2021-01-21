import * as Utils from './utils.module';

class Component
{
    constructor(props, content, children)
    {

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
        var currentState = new State(this.id, props, content);

        /** Mémoire du component */
        var oldState = {};

        /** Enfant du component */
        var children = children;
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
        if (this.shouldUpdate(this.getOldState(), newState))
        {
            // On demande une mise à jour du component
            return this.render(this, this.getCurrentState());
        }

        return this;
    }

    /**
     * Mise à jour un component et de ses childrens
     * @param {*} component 
     * @param {*} state 
     * @param {*} content 
     */
    render(component, state) {

        // Si le props n'est pas bon, on return le component directement
        if (component.getId() !== state.getComponentId()) return component;

        // Si oui, on affecte les newprops au currentState
        this.setCurrentState(state);

        // Si le component a des enfants
        if (!!this.children) {
            // Pour chacun d'entre eux
            for (let child of component.children) {
               // Récupération des props
                const childNewProps = getPropsByComponentId(child.getId(), state.getComponentId());

                // Si les props existent
                if (!!childNewProps) {
                    // on passe le relais à la méthode de l'enfant pour qu'il se mette à jour ou non
                    child = child.display(childNewProps);
                } else {
                    // les props n'ont pas été retransmise, cela veut dire que ce component n'existe plus
                    child = undefined;
                }
            }
            // On enlève les éventuelles undefined
            this.children = this.children.filter(child => !!child);
        }
        return component;
    }

    /** Setters */
    
    getComponentId()
    {
        return this.id;
    }

    getCurrentState()
    {
        return this.currentState;
    }

    getOldState()
    {
        return this.oldState
    }

    /** Getters */
    
    setCurrentState(currentState)
    {
        // Copie totalement l'objet currentState en créant un nouvel objet
        this.currentState = Object.assign({}, currentState);
    }

    setOldState(oldState)
    {
        // Copie totalement l'objet currentState en créant un nouvel objet
        this.oldState = Object.assign({}, oldState);
    }
}


class State 
{
    constructor(idComponent, props, content)
    {
        /** Id du component associé */
        var idComponent = idComponent;

        /** Proriété du component associée */
        var props = props;

        /** Contenu du component associé */
        var content = content;

    }

    getIdComponent()
    {
        return this.idComponent;
    }

    getProps()
    {
        return this.props;
    }

    getContent()
    {
        return this.content;
    }

    setProps(props)
    {
        this.props = props;
    }

    setContent(content)
    {
        this.content = content;
    }

}

/**
 * Retourne le component visé par l'id demandé qui se trouve dans une list de components
 * @param string id Id du component
 * @param array list liste de component
 * @returns le component ou undefined
 */
function getComponentById(id, componentList)
{
    return getFromListById(id, componentList);
}

/**
 * Retourne la props de la liste fourni s'il concorde avec l'id donnée
 * @param string id 
 * @param array list liste des props 
 * @returns le props correspondant ou undefined
 */
function getPropsByComponentId(id, propsList)
{
    return getFromListById(id, propsList);
}

/**
 * Retourne l'item de la liste fourni s'il concorde avec l'id donnée
 * @param string id 
 * @param array list liste de component ou liste de props
 * @returns un item de la liste concordant avec l'id  | un objet vide si rien n'a été trouvé
 */
function getFromListById(id, list)
{
    // Variable retournée
    let result = undefined;

    // Boucler sur la liste et examiner les items
    for(let item of list)
    {
        // Examination de l'id de l'item selon le type de liste
        if ((!!item.getId() && item.getID() === id)
            || (!!item.getIdComponent() && item.getIdComponent() === id))
        {
            // Affectation si l'id est reconnu
            result = item;    
            //Arrêt de la boucle au premier trouvé
            break;
        }
    }
    return result;
}

export
{
    Component,
    Props,
    getComponentById,
    getPropsByComponentId
}
