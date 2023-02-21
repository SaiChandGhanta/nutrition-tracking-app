import React, { Component} from 'react'
import { TextField, Autocomplete, Button } from '@mui/material';
import {Link} from "react-router-dom";
import { debounce } from '@mui/material';

import * as flaxConstants from '../constants.js'
import './SearchBars.scss'

const SuggestionBlock = props => {
    return (
        <div className='suggestion-box'>
            <Link to={'/add-intake/'+props.suggestion['foodId']}>
            <div className='suggestion-box-internal'>
                <div className='suggestion-left'>
                    {props.suggestion['image'] && <img className='suggestion-image' src={props.suggestion['image']} alt='food'></img>}
                </div>
                <div className='suggestion-right'>
                    <div className='suggestion-title'>{props.suggestion['label']}  </div>
                </div>
            </div>
            </Link>
        </div>
    )
}



export default class SearchBar extends Component {

    constructor(props) {
        super(props)

        
        this.state = {
            searchQuery: '',
            autoCompleteSuggestions: [],
            matchingResults: [],
            
        }
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSearchEvent = this.handleOnSearchEvent.bind(this)
        this.handleOnSelect = this.handleOnSelect.bind(this)

    }

    handleOnChange = debounce( (event) => {
        if(!event.target.value) return;
        this.setState({searchQuery: event.target.value})
        if (this.state.searchQuery.length > 2) {            
            const apiUrl = `https://api.edamam.com/auto-complete?app_id=${flaxConstants.FOOD_APP_ID}&app_key=${flaxConstants.FOOD_APP_KEY}&q=${this.state.searchQuery}&limit=7`
            fetch(apiUrl).then(res => res.json()).then(suggestions => {this.setState({autoCompleteSuggestions: suggestions.slice(0,7)})})
        }
    }, 500)

    handleOnSearchEvent (event) {
        this.setState({matchingResults: []})
        const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${flaxConstants.FOOD_APP_ID}&app_key=${flaxConstants.FOOD_APP_KEY}&ingr=${this.state.searchQuery}&nutrition-type=cooking`
        fetch(apiUrl).then(res => res.json()).then(data => {
            const foods = data['hints'].map(food => {return <SuggestionBlock suggestion={food['food']} key={food['food']['foodId']}/>})
            this.setState({matchingResults: foods.slice(0,4)})
        })
    }

    handleOnSelect = (event, values) => {
        this.setState({searchQuery: values})
    }

    render() {
        return (
            <div>
            <div className='search-block'>
            <Autocomplete disablePortal options={this.state.autoCompleteSuggestions} sx={{ width: 300 }} onChange={this.handleOnSelect} onInputChange={this.handleOnChange.bind(this)}
            renderInput={(params) => <TextField {...params} label="Enter food Item" />} />
            <div className='search-food-button' >
                <Button variant="contained" onClick={this.handleOnSearchEvent.bind(this)}>Search foods</Button>
            </div>
            </div>
            <div className='scroll-wrapper'>
                {this.state.matchingResults}
            </div>
            </div>
        )
    }
}