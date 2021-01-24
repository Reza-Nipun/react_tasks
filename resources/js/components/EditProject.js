import axios from 'axios'
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'

class EditProject extends Component {
    constructor (props) {
        super(props)
        this.state = {
            project: [],
            name: '',
            description: ''
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

    handleFieldChangeDescription(event) {

        // update the state
        this.setState({
            description: event.target.value
        });
    }

    handleUpdateProject (event) {
        event.preventDefault()

        const { history } = this.props

        const project = {
            name: this.state.name,
            description: this.state.description
        }

        const projectId = this.props.match.params.id

        axios.put(`/api/projects/${projectId}`, project)
            .then(response => {
                history.push('/')
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
        document.title = "Edit Projects"

        const projectId = this.props.match.params.id

        axios.get(`/api/projects/${projectId}`).then(response => {
            this.setState({
                project: response.data,
                name: response.data[0].name,
                description: response.data[0].description,
            })
        })
    }

    render () {
        const { project } = this.state

        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Edit project</div>
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
                                        Description:
                                        <textarea
                                            name="description"
                                            id="description"
                                            className="form-control"
                                            value={this.state.description}
                                            onChange={this.handleFieldChange} ></textarea>
                                    </label>
                                    <br />
                                    <label>
                                        <button onClick="" className="btn btn-success">UPDATE</button>
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

export default EditProject