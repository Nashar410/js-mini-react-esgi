
/**
 * Retourne le component visé par l'id demandé qui se trouve dans une list de components
 * @param string id Id du component
 * @param array list liste de component
 * @returns le component ou undefined
 */
export function getComponentById(id, componentList) {
    return getFromListById(id, componentList);
}

/**
 * Retourne la props de la liste fourni s'il concorde avec l'id donnée
 * @param string id
 * @param array list liste des props
 * @returns le props correspondant ou undefined
 */
export function getPropsByComponentId(id, propsList) {
    return getFromListById(id, propsList);
}

/**
 * Retourne l'item de la liste fourni s'il concorde avec l'id donnée
 * @param string id
 * @param array list liste de component ou liste de props
 * @returns un item de la liste concordant avec l'id  | un objet vide si rien n'a été trouvé
 */
export function getFromListById(id, list) {
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

export function createElement(NavbarComponent, props, content, children){
    ... let html = nbC.render(...)
    return html
}
