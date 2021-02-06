import routes from "./routes.js";

/*********************************************************************
 *                          Logique du router                        *
 ********************************************************************/

/**
 * History API, gère l'historique de navigation
 * @param url Url que l'on veut visiter, sera ajouter à l'historique
 */
const navigateTo = (url) => {
  // Ajoute de l'url dans l'historique
  history.pushState(null, null, url);
  // Rappelle le router pour naviguer vers l'url
  router();
};

/**
 * Router, capte les URL et affiche les vues de l'application SANS RECHARCHER LA PAGE
 * Async pour pouvoir s'adapter à du fetch ou des requêtes dans les vues chargé
 * @returns {Promise<void>}
 */
const router = async () => {
  // Vérifie si l'url en cours dans location correspond à une route prévu
  const potentialsMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });

  // Récupère la route actuelle
  let match = potentialsMatches.find(
    (potentialsMatch) => potentialsMatch.isMatch
  );

  // Si la route n'existe pas
  if (!match) {
    // On met la route de base
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  // On construit la vue
  const view = new match.route.view();
  // On colle la vue dans le DOM en récupérant l'élément à afficher
  const root = document.querySelector("#root");
  // On regarde s'il y a déjà une page
  if (!!root.firstChild) root.removeChild(root.firstChild);
  // On recréé la vue demandée
  root.appendChild(await view.getPage());
};

// Listener qui va rejouer les routes lorsque l'on navigue
window.addEventListener("popstate", router);

// Listener qui attend que le dom soit charger pour surveiller les click et démarrer le router
document.addEventListener("DOMContentLoaded", () => {
  // Surveiller les click avec un attributs "[data-link]"
  // Cet attribut signifique qu'on veut naviguer dans l'app(sans recharger la page donc)
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[dataLink]")) {
      // Pas de navigation traditionnelle
      e.preventDefault();

      // On passe la main à notre router
      navigateTo(e.target.href);
    }
  });

  // Démarrage du router
  router();
});
