import { AbstractView } from "./AbstractView.view.js";
import { MainBodyComponent } from "../../../../framework/preset/MainBody.component.js";
import {
  createComponent,
  getComponentByDOMId,
} from "../../../../framework/esgireact/EsgiReactDOM.module.js";
import { BaseView } from "./Base.view.js";

export class MathieuView extends AbstractView {
  constructor() {
    super();
    this.setTitle("Page de Mathieu");
  }

  async getPage() {
    // On construit la page
    // On récupère nos éléments, dans l'ordre que l'on désire
    const elements = [
      BaseView.getNavbar(),
      this.getMainBody(),
      BaseView.getFooter(),
    ];

    // On créer la vue de la page
    let mathieuPage = BaseView.getBasePage();

    // On les ajoute au root
    for (const elem of elements) {
      mathieuPage.appendChild(elem);
    }

    return mathieuPage;
  }

  getMainBody() {
    const propsMainBody = MainBodyComponent.getPropsStructured();
    const titlePageMathieu = createComponent(
      "h1", {
          text: "Page de Mathieu basée sur le framework ESGIREACT!",
          attributs: {
            id : 'titleMathieu'
          }
        }
    );

    propsMainBody.children = [
      titlePageMathieu,
        this.getAsideContent(),
        this.getMainContent(),
        this.getInfoLoc(),
    ];
    propsMainBody.attributs.class = "w3-container w3-light-grey bodyMathieu";
    propsMainBody.attributs.id = "mainBody";

    return createComponent(MainBodyComponent, propsMainBody);
  }

  getAsideContent() {

    const click = () => {
      const divToImplement = getComponentByDOMId('containerPokemon');
      const statePokemon = divToImplement.getState();

        fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * (151 - 1) + 1)}`)
            .then(response => response.json())
            .then(pokemon => {
              let pname = getComponentByDOMId('pokemonname');
              let pimg = getComponentByDOMId('pokemon');
              let numpeko = getComponentByDOMId('numeropokemon');
              pname.setState({
                ...pname.getState(), text:pokemon.name
              });
              pimg.setState({
                ...pimg.getState(), attributs: {
                  ...pimg.getState().attributs, src : pokemon.sprites.front_default, style: 'dispay:block;'
                }
              });
              numpeko.setState({
                ...numpeko.getState(), text: `Pokémon numéro : ` + pokemon.id + `/151`
              });
            })

    }

    return createComponent('aside', {
      text: '',
      attributs : {
        id: 'asideM',
      },
      children : [
          createComponent('p', {
            text: ''
          }),
          createComponent('button', {
            text: 'Appuyer ici pour découvrir un pokémon',
            attributs : {
              id : 'buttonpokemon'
            },
            event: [click]
          })
      ]
    });
  }

  getMainContent() {
    return createComponent('div', {
      attributs : {
        id: 'containerPokemon',
      },
      children : [
        createComponent('p', {
          text: '',
          attributs : {
            id: 'pokemonname'
          }
        }),
        createComponent('img', {
          attributs : {
            id: 'pokemon',
            src: 'https://cours-galilee.com/wp-content/uploads/2018/10/faq.png.webp',
            style:'height: 96px; width: 96px;'
          }
        }),
        createComponent('p', {
          text: '',
          attributs : {
            id: 'numeropokemon'
          }
        }),
      ]
    });
  }

  getInfoLoc() {
    const click = () => {
      geoFindMe();
    };
    return createComponent('div', {
      text: '',
      attributs: {
        id: "perdu",
      },
      children : [
        createComponent('button', {
          text: 'Vous ne savez plus ou vous êtes ?',
          attributs : {
            id: 'find-me',
          },
          event: [click],
        }),
        createComponent('p', {
          attributs : {
            id: 'status',
          }
        }),
        createComponent('p', {
          text: '',
          attributs : {
            id: 'map-link'
          }
        }),
        createComponent('p', {
          text: '',
          attributs : {
            id: 'merci-beaucoup'
          }
        }),
      ]
    });

  }

}

function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  const merci = document.querySelector('#merci-beaucoup');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    merci.textContent = `Voici vos coordonnées GPS, ravi de vous avoir été utile :)`;
  }

  function error() {
    status.textContent = 'Impossible de trouver votre localisation :(';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Votre navigateur ne permet pas la géolocalisation :(';
  } else {
    status.textContent = 'Géolocalisation…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
  document.querySelector('#find-me').addEventListener('click', geoFindMe);
}

