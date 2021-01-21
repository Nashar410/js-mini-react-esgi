
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

export
{
    getUnsecureID,
    
}