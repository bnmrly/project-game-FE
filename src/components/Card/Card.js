import React, { Component } from 'react';
import './Card.css';
import store from "../../redux"
import cardSelection from "../../redux/actions/cardSelectionEvent"
import {connect} from "react-redux"


class Card extends Component {
    render() {
        console.log("hi")
        return (
        <section className="card">
        <button value="LOW" onClick={(e) => store.dispatch(cardSelection(e.target.value))}>Low</button>
        <button value="MEDIUM"  onClick={(e) => store.dispatch(cardSelection(e.target.value))}>Medium</button>
        <button value="HIGH"  onClick={(e) => store.dispatch(cardSelection(e.target.value))}>High</button>
        <p>{store.getState().wallet.rating}</p>
        </section>
        )
    }
}

export default Card;