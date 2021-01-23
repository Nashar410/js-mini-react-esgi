
/**
 * Représente le state d'un component
 */
export class State {
    constructor(idComponent, props, content, children) {
        /** Id du component associé */
        var idComponent = idComponent;

        /** Proriété du component associée */
        var props = props;

        /** Contenu du component associé */
        var content = content;

        /** Enfant du component */
        var children = children;

        this.getIdComponent = function () {
            return idComponent;
        };
    
        this.getProps = function () {
            return props;
        };
    
        this.getContent = function () {
            return content;
        };
    
        this.getChildren = function () {
            return children;
        };
    
        this.setProps = function (props) {
            props = props;
        };
    
        this.setContent = function (content) {
            content = content;
        };
    
        /**
        * Ajout un enfant au state
        * @param Component enfant
        */
        this.addChild = function (child) {
            children.push(child);
        };
    
        /**
        * Supprime un enfant au state 
        * @param Component enfant
        */
        this.removeChild = function (child) {
            children = children.filter(currentChild => currentChild.getId() !== child.getId())
        };
    }
}