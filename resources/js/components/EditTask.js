import axios from 'axios'
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'

class EditTask extends Component {
    constructor (props) {
        super(props)
        this.state = {
            task: [],
            name: '',
            project_id: ''
        }

        this.handleFieldChange = this.handleFieldChange.bind(this)
        // this.handleFieldChangeDescription = this.handleFieldChangeDescription.bind(this)
        this.handleUpdateProject = this.handleUpdateProject.bind(this)
        // this.hasErrorFor = this.hasErrorFor.bind(this)
        // this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange(event) {

        // update the state
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleUpdateProject (event) {
        event.preventDefault()

        const { history } = this.props

        const task = {
            name: this.state.name,
        }

        const projectId = this.state.project_id

        const taskId = this.props.match.params.task_id

        axios.put(`/api/update_task_info/${taskId}`, task)
            .then(response => {
                history.push(`/project_tasks/${projectId}`)
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

    componentDidMount () {
        document.title = "Edit Tasks"

        const taskId = this.props.match.params.task_id

        axios.get(`/api/tasks_info/${taskId}`).then(response => {
            this.setState({
                task: response.data,
                name: response.data.title,
                project_id: response.data.project_id,
            })
        })
    }

    render () {
        const { task } = this.state

        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>Edit Task</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleUpdateProject}>
                                    <label>
                                        Name:
                                        <input
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.handleFieldChange} />
                                    </label>
                                    <br />
                                    <label>
                                        <button className="btn btn-success">UPDATE</button>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditTask