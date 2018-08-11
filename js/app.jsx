import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { HashLink as HashLink } from 'react-router-hash-link';
import '../styles/main.scss';

import {
    HashRouter,
    Route,
    Switch,
    Link,
    NavLink
} from 'react-router-dom'


class PrimeHeader extends React.Component{
    render(){
        return(
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
                        ich twórczości.</article>
                    <h2 className="container__text container__text--headline">Nasze gwiazdy:</h2>
                </section>
            </header>
        )}
}

class PrimeMain extends React.Component{
    render(){
        return(
            <main id="gallery">
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

class SubPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            artist: [],
            pending: true,
            currentImage: 0
        }
    }

    componentDidMount() {
        console.log('czy dziala?')
        fetch(`http://localhost:3000/artists/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                console.log('czy dziala fetch poprawnie?')
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


    }

    render() {
        if(this.state.pending) {
            return (
                <p> Loading... </p>
            )
        }
        // console.log(Number(this.state.artist.firstText.length))
        // console.log(Number(this.state.artist.secondText.length))

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
                            <button className="prev" onClick={() => this.changeImage('-')}></button>
                                <img className="slider" src={this.state.artist.photos[this.state.currentImage]}  />
                            <button className="next" onClick={() => this.changeImage('+')}></button>
                        </div>
                    </section>
                </header>
                <main>
                    <section className="container">
                            <article className="container__text">{this.state.artist.secondText}</article>
                            <iframe width="640" height="355" src={this.state.artist.youTube} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
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

class PrimeFooter extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            succesMsg: '',
            name: '',
            video: '',
            about: '',
            image: '',
            aboutVideo: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleFormSubmit = (ev) => {
        ev.preventDefault();
        console.log(this.state);
        if(this.state.name.length === 0) {
            this.setState({
                error: 'Pole Imię i Nazwisko musi zostać uzupełnione'
            })
        } else if (this.state.image.indexOf('http') < 0 || this.state.image.length === 0) {
            this.setState({
                error: 'Pole link nie posiada adresu do zdjęcia. Potrzebna ścieżka http'
            })
        } else if (this.state.about.length === 0){
            this.setState({
                error: 'Pole Kilka słow o Artyście musi zostać uzupełnione'
            })
        } else if (this.state.video.length === 0 ||this.state.video.indexOf('http') < 0){
            this.setState({
                error: 'Pole link nie posiada adresu do filmu. Potrzebna ścieżka http'
            })
        } else if (this.state.aboutVideo.length === 0){
            this.setState({
                error: 'Pole Kilka słow o Nagraniu musi zostać uzupełnione'
            })
        } else {
            this.setState({
                succesMsg: `Dziękujemy. Artysta został dodany :)`,
            })

            const artistObj = {
                firstText: this.state.about,
                name: this.state.name,
                photos: this.state.image.split(','),
                youTube: this.state.video,
                secondText: this.state.aboutVideo,
            }

            fetch('http://localhost:3000/artists/', {
                method: 'POST',
                body: JSON.stringify(artistObj),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(() => {
                    window.location.reload();
                })

        }


        // @TODO: opis jak dodać kilka zdjęć (pewnie po ,)

        // @TODO: wpisanie wymaganej liczby znaków




    }

    render(){
        return(
            <footer id="form">
                <section className="container">
                    <article className="container__text">
                        Prezentowana powyżej baza artystów, jest dopiero
                        początkiem mojej oraz Twojej pracy :) Piszę tak, ponieważ Ty również masz wpływ na to, kto do niej dołączy. Aby
                        dodać artystę, wypełnij poniższy formularz.</article>
                    <p className="add">Dodaj artystę:</p>
                    <h1 style={{color: 'green'}}>{this.state.succesMsg}</h1>
                    <input className="fullName" onChange={this.handleChange} type="text" name="name" placeholder = "Imię i Nazwisko artysty" />
                    <input className="image" onChange={this.handleChange} type="text" name="image" placeholder = "Link do zdjęcia" title="Zdjęcia oddzielej przecinkami"/>
                    <h1 className="mistake" style={{color: 'red'}}>{this.state.error}</h1>
                    <textarea
                        className="description description--artist"
                        onChange={this.handleChange}
                        name="about"
                        rows="4"
                        cols="50"
                        placeholder = "Klika słow o artyście" title="Zalecane max 500 znaków"></textarea>
                    <input className="video" onChange={this.handleChange} type="text" name="video" placeholder = "Link do nagrania na YouTube"/>
                    <textarea className="description" onChange={this.handleChange} name="aboutVideo" rows="2" cols="30" placeholder = "Klika słow o nagraniu" title="Zalecane max 300 znaków"></textarea>
                    <button onClick={this.handleFormSubmit} className="container__button">Dodaj</button>
                </section>
                <section className="mainfooter">
                    <p className="container__logo">Polski Stand-up</p>
                    <div className="footer1">Copyright 2018 | All Rights Reserved.</div>
                </section>
            </footer>
        )
    }
}
// maxLength={"Number(this.state.about.length)/500"}

class AllTogether extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            pending: true
        }
     }

    render(){
        if(this.state.pending) {
            return (
                <p> Loading... </p>
            )
        }

        return(
            <div className="app">
                <PrimeHeader />
                <PrimeMain artists={this.state.artists}/>
                <PrimeFooter/>
            </div>
        )
    }

    componentDidMount() {
        fetch(`http://localhost:3000/artists`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    artists: data,
                    pending: false
                })
            })
    }

}

class App extends React.Component {
    render() {
        return (
            <AllTogether/>
        )
    }
}



document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <HashRouter>
            <div>

                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/artist/:id" component={SubPage} />
                    {/*<Route path="/PrimeFooter" component={PrimeFooter} />*/}
                </Switch>

            </div>
        </HashRouter>,
        document.getElementById('app')
    );
});


