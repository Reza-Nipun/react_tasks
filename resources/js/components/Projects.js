import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { BsPencil, BsPlus } from "react-icons/bs"
import Select from 'react-select';
import ReactDOM from 'react-dom';

class Projects extends Component{
    constructor(props){
        super(props)
        this.state = {
            projects: [],
            projectList: [],
        }
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    getFilteredProject(project_Id){
        // e.preventDefault();

        // const project_Id = e.target.value;

        // console.log(project_Id);

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
                        <td>
                            <Link className='btn btn-primary btn-sm' size="sm"
                            to={{
                                pathname: `/project_tasks/${project.id}`,
                                data: [project.name],
                            }}
                            >
                                {project.tasks_count}
                            </Link>
                        </td>
                        <td>
                            <Link className='btn btn-warning btn-sm' size="sm" to={`edit_project/${project.id}`}>
                                <BsPencil />
                            </Link>
                        </td>
                    </tr>
                )
            })
    }

    componentDidMount(){
        document.title = "All Projects"

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

        const project_list = projectList.map( (projectl, index) => (
                                { label: projectl.name, value: projectl.id }
                             ));

        var new_value = {'label': "All Projects", 'value': ""}

        project_list.splice(0, 0, new_value);

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className='col-md-12'>
                        <div className="card">
                            <div className='card-header'>All Projects</div>
                            <div className='card-body'>
                                <Container>
                                    <Row>
                                        <Col md={{ span: 3 }}><label className="font-weight-bold">Search Project:</label></Col>
                                        <Col md={{ span: 5 }}>

                                            <Select options={project_list} name="select_project"
                                                    onChange={opt => this.getFilteredProject(opt.value)}
                                            />
                                        </Col>
                                        <Col md={{ span: 1 }}></Col>
                                        <Col md={{ span: 3 }}>
                                            <Link className='btn btn-primary btn-md mb-3' to='/create'>
                                                <BsPlus /> Project
                                            </Link>
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
                                            <th>#</th>
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
