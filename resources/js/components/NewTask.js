import axios from 'axios'
import React, { Component } from 'react'

class NewTask extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: '',
            project_id: '',
            errors: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewTask = this.handleCreateNewTask.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateNewTask (event) {
        event.preventDefault()

        const { history } = this.props

        const task = {
            title: this.state.name,
            project_id: this.props.match.params.project_id
        }

        axios.post('/api/create_project_task', task)
            .then(response => {
                // redirect to the homepage
                history.push(`/project_tasks/${this.props.match.params.project_id}`)
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
            )
        }
    }

    render () {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create Task</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreateNewTask}>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Task Name</label>
                                        <input
                                            id='name'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                            name='name'
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('name')}
                                    </div>

                                    <button className='btn btn-primary'>Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewTask