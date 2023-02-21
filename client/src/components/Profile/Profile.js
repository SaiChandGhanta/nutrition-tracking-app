import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Profile.scss'

import React, { Component } from 'react'


export default class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            age: '',
            weight: '',
            height: '',
            targetWeight: '',
            bmi: 0
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handleAgeChange = this.handleAgeChange.bind(this)
        this.handleWeightChange = this.handleWeightChange.bind(this)
        this.handleHeightChange = this.handleHeightChange.bind(this)
        this.handleTargetWeightChange = this.handleTargetWeightChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:5000/profile/' + JSON.parse(localStorage.getItem('profile')).userProfileId
        const data = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
            }
        }
        fetch(apiUrl, data).then(res => res.json()).then((data) => {
            this.setState({
                firstName: data['firstName'],
                lastName: data['lastName'],
                email: data['email'],
                age: data['age'],
                weight: data['weight'],
                height: data['height'],
                targetWeight: data['targetWeight']
            })
        })
    }

    handleOnSubmit(event) {
        event.preventDefault()
        const apiUrl = 'http://localhost:5000/profile/' + JSON.parse(localStorage.getItem('profile')).userProfileId
        const data = {
            method: 'PUT',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                age: this.state.age,
                weight: this.state.weight,
                height: this.state.height,
                targetWeight: this.state.targetWeight
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
            }
        }
        fetch(apiUrl, data).then(res => res.json()).then(() => {
            console.log('Profile successfully updated')
        })
    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value})
    }

    handleLastNameChange(event) {
        this.setState({lastName: event.target.value})
    }

    handleAgeChange(event) {
        this.setState({age: parseInt(event.target.value)})
    }

    handleWeightChange(event) {
        this.setState({weight: parseInt(event.target.value)})
    }

    handleHeightChange(event) {
        this.setState({height: parseInt(event.target.value)})
    }

    handleTargetWeightChange(event) {
        this.setState({targetWeight: parseInt(event.target.value)})
    }

  render() {
    return (
        <>
        <div className="contaier user-profile">
            <form method="" onSubmit={this.handleOnSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="profile-head">
                            <div className='ProfileInformation'>
                                <h2>Profile Information</h2>
                            </div>
                        </div>
                    </div>
                        <br />
                   <div className='txtField'>
                   <div className="textfield"> 
                   <TextField id="outlined-basic" value={this.state.firstName} onChange={this.handleFirstNameChange} label="First Name" variant="outlined" /> 
                   </div>
                   <div className="textfield"> 
                   <TextField id="outlined-basic" value={this.state.lastName} onChange={this.handleFirstNameChange} label="Last Name" variant="outlined" />
                   </div>
                   <div className="textfield"> 
                   <TextField id="outlined-basic" type={'number'} value={this.state.age} onChange={this.handleAgeChange} label="Age" variant="outlined" />
                   </div>
                   <div className="textfield"> 
                   <TextField id="outlined-basic" disabled value={this.state.email} label="email" variant="outlined" />
                   </div>
                </div>
                            <br />
                <div className='CurrentTextfield'>
                   <div className="textfield"> 
                   <TextField id="outlined-basic" type={'number'} value={this.state.weight} onChange={this.handleWeightChange} label="Weight (kg)" variant="outlined" />
                   </div>
                   <div className="textfield"> 
                   <TextField id="outlined-basic" type={'number'} value={this.state.height} onChange={this.handleHeightChange} label="Height (cm)" variant="outlined" />
                   </div>
                   <div className='TargetTextfield'>
                   <div className="textfield"> 
                   <TextField id="outlined-basic" type={'number'} value={this.state.targetWeight} onChange={this.handleTargetWeightChange} label="Target Weight" variant="outlined" />
                   </div>
                </div>
                </div>
                <br />
                <br/>
                <br/>
                <div className="UpdateButton">
                    <Button variant="contained" type='submit'>Update</Button> 
                </div>
                </div>
            </form>
        </div>
    </>
    )
  }
}
