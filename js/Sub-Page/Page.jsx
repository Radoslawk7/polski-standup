import React from 'react';
import { HashLink as HashLink } from 'react-router-hash-link';

import {
    Link,
} from 'react-router-dom'



export default class SubPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            artist: [],
            pending: true,
            currentImage: 0
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/artists/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    artist: data,
                    pending: false
                })
            })
    }

    changeImage = (sign) => {

        const condition = this.state.currentImage === this.state.artist.photos.length - 1;

        if(sign === '+') {
            this.setState({
                currentImage: condition ? 0 : this.state.currentImage + 1
            })
        } else {
            this.setState({
                currentImage: this.state.currentImage === 0 ? this.state.artist.photos.length - 1 : this.state.currentImage - 1
            })
        }
    };

    render() {
        if(this.state.pending) {
            return (
                <p> Loading... </p>
            )
        }

        return (
            <div className="appy">
                <header>
                    {/*<Link to={`/`} className="container__button container__button--back">Powrót do Strony Głównej</Link>*/}
                    <section className="container">
                        <Link to={`/`} className="container__button container__button--back">Powrót do Strony Głównej</Link>
                        <div className="aside">
                            <h2 className="container__text container__text--headline">{this.state.artist.name}</h2>
                            <article className="container__text">{this.state.artist.firstText} </article>
                        </div>

                        <div className="gallery">
                            <button className="prev" onClick={() => this.changeImage('-')}/>
                            <img className="slider" src={this.state.artist.photos[this.state.currentImage]}  />
                            <button className="next" onClick={() => this.changeImage('+')}/>
                        </div>
                    </section>
                </header>
                <main>
                    <section className="container">
                        <article className="container__text">{this.state.artist.secondText}</article>
                        <iframe
                            width="640"
                            height="355"
                            src={this.state.artist.youTube}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen/>
                    </section>
                </main>
                <footer>
                    <section className="container">
                        <section className="mainfooter">
                            <p className="container__logo">Polski Stand-up</p>
                            <div className="footer1">Copyright 2018 | All Rights Reserved.</div>
                        </section>
                    </section>
                </footer>
            </div>
        );
    }
}