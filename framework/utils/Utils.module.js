import * as HtmlTagsList from './htmltagslists.js';

/**
 * Retourne un ID normalement unique
 * Peut avoir un risque de collision entre deux IDs
 * @deprecated Cette fonction se base sur Math.random pour générer un aléatoire, 
 * ce n'est pas le meilleur choix mais le plus simple en l'occurence
 * @return Un ID avec un risque collision
 */
function getUnsecureID()
{
    return (Date.now() + Math.random()).toString(36);
}

/**
 * Affiche les paramètres dans la console ; syntaxe courte de console.log
 * @param log 
 */
function l(...log)
{
    console.log(...log);
}

export
{
    getUnsecureID,
    l
    
}

function type_check_v1(variable, type) {
    switch (typeof variable) {
        case "symbol":
        case "number":
        case "string":
        case "boolean":
        case "undefined":
        case "function":
            return type === typeof variable;
        case "object":
            switch (type) {
                case "null":
                    return variable === null;
                case "array":
                    return Array.isArray(variable);
                default:
                    return variable !== null && !Array.isArray(variable);
            }
    }
}

function type_check_v4(model, content) {
    for (let rule in model) {
        switch(rule) {
            case "attributs" || "event":
                for (const element of model[rule]) {
                    if(!type_check_v1(content[rule], element)) {
                        return false;
                    }
                }
                break;
            case "text":
                if(!type_check_v1(content[rule], model[rule])) {
                    return false;
                }
                break;
            case "children":
                for (const element of model[rule]) {
                    if(!content[rule].includes(element)) {
                        return false;
                    }
                }
                break;
            case "type":
                return checkElementType(content[rule], model[rule]);
                break;
        }
    }
    return true;
}

async function checkElementType(typeToCheck, rule) {
    if(typeToCheck === rule) {
        if(HtmlTagsList.html.includes(typeToCheck)) {
            return true;
        }
    }
    return false;
}