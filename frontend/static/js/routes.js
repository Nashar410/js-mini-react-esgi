import { AccueilView } from "./views/Accueil.view.js";
import {ChristopheView} from './views/Christophe.view.js';
import {MathieuView} from './views/Mathieu.view.js';

import {MohandView} from './views/Mohand.view.js';

// Liste des routes
export default [
        {path: '/', view: AccueilView },
        {path: '/mohand', view: MohandView },
        {path: '/mathieu', view: MathieuView },
        {path: '/christophe', view: ChristopheView },
];
