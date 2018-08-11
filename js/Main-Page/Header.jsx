import React from 'react';
import { HashLink as HashLink } from 'react-router-hash-link';



export default class PrimeHeader extends React.Component {

    render() {
        return (
            <header id="us">
                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <HashLink to="/#us">O nas</HashLink>
                        </li>
                        <li className="nav__item">
                            <HashLink to="/#gallery">Galeria Sław</HashLink>
                        </li>
                        <li className="nav__item">
                            <HashLink to="/#form">Formularz dodawania</HashLink>
                        </li>
                    </ul>
                </nav>
                <section className="container">

                    <h1 className="container__picture">Polski Stand-up</h1>
                    <article className="container__text">Witaj!!! Strona ta poświęcona jest w całości
                        naszym krajowym artystom parajacym się ciężką gałęzią branży rozrywkowej jaką jest Stend-up.
                        Jesteśmy tu, aby wspólnie dzielić się wiedzą o rodzimej scenie stand-upowej, artystach oraz
                        ich twórczości.
                    </article>
                </section>
            </header>
        )
    }
}

