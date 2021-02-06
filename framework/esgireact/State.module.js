
/**
 * Représente le state d'un component
 */
export class State {
    constructor(idComponent, props, content) {
        /** Id du component associé */
        var _idComponent = idComponent;

        /** Proriété du component associée */
        var _props = props;

        /** Contenu du component associé */
        var _content = content;

        /** Enfant du component */
        var _children = !!props.children ? props.children : [];

        /** Event */
        var _event = !!props.event ? props.event : [];


        /** Function **/

        this.getIdComponent = function () {
            return _idComponent;
        };

        this.getProps = function () {
            return _props;
        };

        this.getContent = function () {
            return _content;
        };

        this.getChildren = function () {
            return _children;
        };

        this.getEvent = function () {
            return _event;
        };

        this.setProps = function (props) {
            _props = props;
        };

        this.setContent = function (content) {
            _content = content;
        };

        /**
        * Ajout un enfant au state
        * @param Component enfant
        */
        this.addChild = function (child) {
            _children.push(child);
        };

        /**
        * Supprime un enfant au state 
        * @param Component enfant
        */
        this.removeChild = function (child) {
            _children = _children.filter(currentChild => currentChild.getId() !== child.getId())
        };

        /**
        * Ajout un event au state
        * @param Component enfant
        */
        this.addEvent = function (ev) {
            _event.push(ev);
        };

        /**
        * Supprime un event au state 
        * @param Component enfant
        */
        this.removeEvent = function (ev) {
            _event = _event.filter(currentEv => currentEv.getId() !== ev.getId())
        };
    }
}