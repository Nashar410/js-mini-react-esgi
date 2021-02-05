import AccueilView from "./views/Accueil.view.js";

// Liste des routes
export default [
        {path: '/', view: AccueilView },
        {path: '/mohand', view: () => console.log('page de mohand') },
        {path: '/mathieu', view: () => console.log('page de mathieu') },
        {path: '/christophe', view: () => console.log('page de christophe') },
];
