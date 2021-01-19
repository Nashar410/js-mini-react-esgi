class Component {
    constructor(props) {
        // Variable privée

        /** State courant du component */
        var currentState = {};

        /** Mémoire du component */
        var oldState = {};

        /** Enfant du component */
        var children = [];

        // Affectation des props entrantes aux states du component
        this.setCurrentState(props);
    }

    /**
     * Check si le nouveau state est égale à l'ancien
     * @param {*} oldState 
     * @param {*} newState 
     * @returns bool
     */
    shouldUpdate(oldState, newState) {
        // JSON.stringify des deux states pour comparer leur contenu
        return JSON.stringify(oldState) !== JSON.stringify(newState);
    }

    /**
     * Retourne un ... si les states sont différents
     * @param {*} newProps 
     * @param {*} content 
     * @returns
     */
    display(newProps, content = null) {
        // Affectation de l'ancien state avec la valeur du state courant
        this.setOldState(this.getCurrentState());

        // Vérifier si le state de l'application est égale aux new props envoyés
        if (this.shouldUpdate(this.getOldState(), newProps)) {
            // Si oui, on affecte les newprops au currentState
            this.setCurrentState(newProps);
            // On demande une mise à jour du component
            return this.render(this, this.getCurrentState(), content);
        }
    }

    /**
     * Mise à jour un component et de ses childrens
     * @param {*} component 
     * @param {*} props 
     * @param {*} content 
     */
    render(component, props, content) {
        // Si le component a des enfants
        if (!!this.children) {
            // Pour chacun d'entre eux
            for (let child of component.children) {
                // State tampon à envoyé au display de l'enfant
                let childPropToCheck = {};

                // Boucler sur les props des children passés en paramètre
                for (let childProp of props.children) {
                    // Si les deux states sont inégaux on affecte au tampon les nouvelles props
                    // sinon on lui réaffecte les anciennes
                    childPropToCheck = component.shouldUpdate(childProp, child.getCurrentState())
                        ? childProp : child.getCurrentState();
                }

                // On appelle la méthode display du child pour qu'il se mette à jout lui même
                child.display(childPropToCheck);
            }
        }
    }

    getCurrentState() {
        return this.currentState;
    }

    getOldState() {
        return this.oldState
    }

    setCurrentState(currentState) {
        // Copie totalement l'objet currentState en créant un nouvel objet
        this.currentState = Object.assign({}, currentState);
    }

    setOldState(oldState) {
        // Copie totalement l'objet currentState en créant un nouvel objet
        this.oldState = Object.assign({}, oldState);
    }
}
