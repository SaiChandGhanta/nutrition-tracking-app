import React, { Component } from 'react'
import { TextField, Button} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useParams } from "react-router-dom";
import { debounce } from '@mui/material';

import * as foodAPI from '../constants.js'
import './RegisterIntakes.scss'


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

function cleanNutrientMap(nutrientMap) {
    for (var label in nutrientMap) {
        if (!foodAPI.nutrientLabelMap[label]) delete nutrientMap[label]
    }
    return nutrientMap
}


class RegisterIntake extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loadTime: Date.now(),
            foodId: '',
            foodLabel: '',
            foodCategory: 'meal',
            intakeValue: 100,
            totalNutrients: {},
            nutritionBreakdown: [],
            showSuccesspopup: false
        }

        this.handleOnChangeDateTime = this.handleOnChangeDateTime.bind(this)
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this)
        this.setNutritionBreakdown = this.setNutritionBreakdown.bind(this)
        this.saveIntake = this.saveIntake.bind(this)
        this.buildNutrientList = this.buildNutrientList.bind(this)
    }

    handleOnChangeDateTime(event) {
        this.setState({loadTime: new Date(event.toISOString())})
    }


    handleOnChangeInput = debounce((event) => {
        if(!event.target.value) return;
        this.setState({intakeValue: parseInt(event.target.value)})
        this.setNutritionBreakdown(this.state.foodId, parseInt(event.target.value))
    }, 500)


    componentDidMount() {
        this.setState({foodId: this.props.params.id})
        this.setNutritionBreakdown(this.props.params.id, 10)
    }


    setNutritionBreakdown(foodId, quantity) {
        const requestInfo = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "ingredients": [
                  {
                    "quantity": quantity,
                    "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                    "foodId": foodId
                  }
                ]
              })
          };

        fetch(`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${foodAPI.FOOD_APP_ID}&app_key=${foodAPI.FOOD_APP_KEY}`, requestInfo).then(res => res.json())
        .then(response => {
            this.setState({nutritionBreakdown: this.buildNutrientList(response['totalNutrients']), totalNutrients: cleanNutrientMap(response['totalNutrients']), foodLabel: response['ingredients'][0]['parsed'][0]['food']})
      })
    }

    buildNutrientList(totalNutrients) {
        var nutrientList = []
        for (var label in totalNutrients) {
            if (!foodAPI.nutrientLabelMap[label]) continue
            nutrientList.push(
            <div className='info-item'>
                <div className='info-label'>{foodAPI.nutrientLabelMap[label]}</div>
                <div className='info-value'>{Math.round(totalNutrients[label]['quantity']*10)/10} {totalNutrients[label]['unit']}</div>
            </div>
            )
        }
        return (
            nutrientList
        )
    }


    saveIntake(event) {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`},
            body: JSON.stringify({
                foodId: this.state.foodId,
                foodLabel: this.state.foodLabel,
                foodCategory: this.state.foodCategory,
                intakeTime: this.state.loadTime,
                measure: this.state.intakeValue,
                totalNutrients: this.state.totalNutrients
            })
          };
      
        fetch("http://localhost:5000/intake/", requestOptions)
            .then(response => response.json())
            .then(result => {console.log('Successfully recorded intake!')})
        
        window.location = "/food";
    }

    disablePopup = setTimeout(() => {
        this.setState({showSuccesspopup: false})
    }, 500)


  render() {
    return (
      <div>
          <div className='register-intake-popup'>
          <form className="intake-container" onSubmit={this.saveIntake}>
                <div className='intake-input-form'>
                <div className='food-label'>{this.state.foodLabel} <span className='food-category'>({this.state.foodCategory})</span> </div>
                <div className='intake-input-block'>
                    <TextField label="Intake amount (gm)" required type={"number"} onChange={this.handleOnChangeInput} focused />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker label="Date" inputFormat="MM/dd/yyyy" value={this.state.loadTime} onChange={this.handleOnChangeDateTime} renderInput={(params) => <TextField {...params} />}/>
                    <TimePicker label="Time" value={this.state.loadTime} onChange={this.handleOnChangeDateTime} renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>
                </div>
                <div className='nutrition-breakdown'>
                    {this.state.nutritionBreakdown}
                </div>
                <div className='intake-button'>
                    <Button type="submit" variant="contained" >Register intake</Button>
                </div>
                </div>
            </form>
          </div>
      </div>
    )
  }

}


export default withParams(RegisterIntake)
