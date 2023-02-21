import React, { Component } from 'react'
import {Button, TextField} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import * as flaxConstants from '../constants.js'

import './Activity.scss'

const ChoiceBlock = props => {
    var choice = props.choice
    return (
        <option value={choice} >{choice}</option>
    )
}

export default class Activity extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activityStartTime: Date.now(),
            enteredDuration: 0,
            selectedChoice: 'cycling',
            selectedSubChoice: 'Cycling, light', 
            userWeight: 80,
            choices: Object.keys(flaxConstants.physicalActivityMap).map(activity => {return <ChoiceBlock choice={activity} key={activity}/>}),
            subChoices: Object.keys(flaxConstants.physicalActivityMap['cycling']).map(subActivity => {return <ChoiceBlock choice={subActivity} key={subActivity}/>}), 
            caloriesBurned: 0
        }

        this.handleOnChangeDateTime = this.handleOnChangeDateTime.bind(this)
        this.handleOnSelectChoice = this.handleOnSelectChoice.bind(this)
        this.handleOnSelectSubChoice = this.handleOnSelectSubChoice.bind(this)
        this.handleOnDurationChange = this.handleOnDurationChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    handleOnChangeDateTime(event) {
        this.setState({activityStartTime: new Date(event.toISOString())})
    }

    handleOnSelectChoice(event) {
        this.setState({
            selectedChoice: event.target.value,
            subChoices: Object.keys(flaxConstants.physicalActivityMap[event.target.value]).map(subActivity => {return <ChoiceBlock choice={subActivity} key={subActivity}/>})
        })
    }

    handleOnSelectSubChoice(event) {
        this.setState({selectedSubChoice: event.target.value})
    }

    handleOnDurationChange(event) {
        var duration = parseInt(event.target.value)
        this.setState({
            enteredDuration: duration,
            caloriesBurned: flaxConstants.physicalActivityMap[this.state.selectedChoice][this.state.selectedSubChoice]*this.state.userWeight*duration
        })

    }

    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`},
            body: JSON.stringify({
                activity: this.state.selectedSubChoice,
                activityType: this.state.selectedChoice,
                duration: this.state.enteredDuration,
                startTime: this.state.activityStartTime,
                calorieBurn: this.state.caloriesBurned,
            })
          };
      
        fetch("http://localhost:5000/activity/", requestOptions)
            .then(response => response.json())
            .then(result => {console.log('Successfully recorded activity!')})
    }
    
  render() {
    return (
      <div className='parent-container'>
          <div className='top-input-section'>
            <form className="activity-container" onSubmit={this.handleSubmit}>
                  <div className='top-input-form'>
                    <div>
                        <select name="" className='select-choice' id="select-choice-id" onChange={this.handleOnSelectChoice}>
                        <option value="">Select Activity type</option>
                        {this.state.choices}
                        </select>
                    </div>
                    <div>
                        <select name="" className="select-sub-choice" id="select-subchoice-id" onChange={this.handleOnSelectSubChoice}>
                        <option value=""  >Select Activity</option>
                        {this.state.subChoices}
                        </select>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker label="Date" inputFormat="MM/dd/yyyy" value={this.state.activityStartTime} onChange={this.handleOnChangeDateTime} renderInput={(params) => <TextField {...params} />}/>
                    <TimePicker label="Time" value={this.state.activityStartTime} onChange={this.handleOnChangeDateTime} renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>
                    <TextField required id="duration" type={'number'} label="Duration" onChange={this.handleOnDurationChange} defaultValue={this.state.duration}/>
                  <div className='save-activity-button'>
                      <Button type="submit" variant="contained">Register Activity</Button>
                    </div>
                    </div>
                </form>
          </div>
          <div className='bottom-table-section'></div>
      </div>
    )
  }
}
