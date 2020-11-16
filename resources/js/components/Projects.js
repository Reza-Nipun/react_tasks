import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { BsPencil } from "react-icons/bs"

class Projects extends Component{
    constructor(props){
        super(props)
        this.state = {
            projects: [],
            projectList: [],
        }
    }

    getFilteredProject(e){
        e.preventDefault();

        const project_Id = e.target.value;

        axios.get(`/api/projects/${project_Id}`).then(response => {
            this.setState({
                projects: response.data
            })
        })

    }

    renderTableData() {

        return this.state.projects.map( (project) => {

                return (
                    <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>{project.tasks_count}</td>
                        <td>
                            <Link className='btn btn-warning btn-sm' size="sm" to={`/${project.id}`}>
                                <BsPencil />
                            </Link>
                        </td>
                    </tr>
                )
            })
    }

    componentDidMount(){
        axios.get('/api/projects/').then(response => {
            this.setState({
                projects: response.data,
                projectList: response.data,
            })
        })

        this.renderTableData();
    }

    render() {

        const { projectList } = this.state

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className='col-md-8'>
                        <div className="card">
                            <div className='card-header'>All Projects</div>
                            <div className='card-body'>
                                <Container>
                                    <Row>
                                        <Col md={{ span: 3 }}><label className="font-weight-bold">Select Project:</label></Col>
                                        <Col md={{ span: 5 }}>
                                            <select className="form-control" name="select_project"
                                                    onChange={this.getFilteredProject.bind(this)}>
                                                <option value=''>Select Project</option>
                                                { projectList.map( projectl => (
                                                    <option value={ projectl.id }>
                                                        { projectl.name }
                                                    </option>
                                                ))}
                                            </select>
                                        </Col>
                                    </Row>
                                </Container>

                                <div className="row">
                                    <div className='col-md-12'>
                                        <div className='col-md-4'>

                                        </div>
                                        <div className='col-md-4'>

                                        </div>
                                    </div>
                                </div>
                                <br />



                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Project Name</th>
                                            <th>Description</th>
                                            <th>Tasks Count</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    {this.renderTableData()}

                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Projects
