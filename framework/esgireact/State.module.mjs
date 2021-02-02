
/**
 * Représente le state d'un component
 */
export class State {
    constructor(idComponent, props, content, children, event) {
        /** Id du component associé */
        var idComponent = idComponent;

        /** Proriété du component associée */
        var props = props;

        /** Contenu du component associé */
        var content = content;

        /** Enfant du component */
        var children = children;

        /** Event */
        var event = event;

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

        this.getEvent = function () {
            return event;
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

        /**
        * Ajout un event au state
        * @param Component enfant
        */
        this.addEvent = function (ev) {
            event.push(ev);
        };

        /**
        * Supprime un event au state 
        * @param Component enfant
        */
        this.removeEvent = function (ev) {
            event = event.filter(currentEv => currentEv.getId() !== ev.getId())
        };
    }
}