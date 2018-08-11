import React from 'react';
import { HashLink as HashLink } from 'react-router-hash-link';

import {
    Link,
} from 'react-router-dom'


export default class PrimeFooter extends React.Component{


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

    }

    render(){
        return(
            <footer id="form">
                <section className="container">
                    <article className="container__text">
                        Prezentowana powyżej baza artystów, jest dopiero
                        początkiem mojej oraz Twojej pracy :) Piszę tak, ponieważ
                        Ty również masz wpływ na to, kto do niej dołączy. Aby
                        dodać artystę, wypełnij poniższy formularz.</article>
                    <p className="add">Dodaj artystę:</p>
                    <h1 style={{color: 'green'}}>{this.state.succesMsg}</h1>
                    <input
                        className="fullName"
                        onChange={this.handleChange}
                        type="text"
                        name="name"
                        placeholder = "Imię i Nazwisko artysty" />
                    <input
                        className="image"
                        onChange={this.handleChange}
                        type="text"
                        name="image"
                        placeholder = "Link do zdjęcia"
                        title="Zdjęcia oddzielej przecinkami"/>
                    <h1
                        className="mistake"
                        style={{color: 'red'}}>{this.state.error}</h1>
                    <textarea
                        className="description description--artist"
                        onChange={this.handleChange}
                        name="about"
                        rows="4"
                        cols="50"
                        placeholder = "Klika słow o artyście"
                        title="Zalecane max 500 znaków"/>
                    <input
                        className="video"
                        onChange={this.handleChange}
                        type="text"
                        name="video"
                        placeholder = "Link do nagrania na YouTube"/>
                    <textarea
                        className="description"
                        onChange={this.handleChange}
                        name="aboutVideo"
                        rows="2"
                        cols="30"
                        placeholder = "Klika słow o nagraniu"
                        title="Zalecane max 300 znaków"/>
                    <button
                        onClick={this.handleFormSubmit}
                        className="container__button">Dodaj</button>
                </section>
                <section className="mainfooter">
                    <p className="container__logo">Polski Stand-up</p>
                    <div className="footer1">Copyright 2018 | All Rights Reserved.</div>
                </section>
            </footer>
        )
    }
}
