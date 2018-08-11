import React from 'react';
import { HashLink as HashLink } from 'react-router-hash-link';

import {
    Link,
} from 'react-router-dom'


export default class PrimeMain extends React.Component {
    render(){
        return(
            <main id="gallery">
                <h2 className="container__text container__text--headline">Nasze gwiazdy:</h2>
                <section className="container">
                    {this.props.artists.map((item, index) => {
                        return (
                            <Link to={`/artist/${item.id}`} key={index} className="tabel__artist">
                                <img className="tabel__picture" src={item.photos[0]} alt={item.name}/>
                                <p className="tabel__artist-name">{item.name}</p>
                            </Link>
                        )
                    })}
                </section>
            </main>
        )}
}
