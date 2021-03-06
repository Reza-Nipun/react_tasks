import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { BsPencil, BsPlus } from "react-icons/bs"

class Tasks extends Component{
    constructor(props){
        super(props)
        this.state = {
            tasks: [],
            project_id: '',
            page_header_title: '',
        }
    }

    renderTableData() {

        return this.state.tasks.map( (task) => {

                return (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>{task.project_name}</td>
                        <td>
                            <Link className='btn btn-warning btn-sm' size="sm" to={`/edit_task/${task.id}`}>
                                <BsPencil />
                            </Link>
                        </td>
                    </tr>
                )
            })
    }

    componentDidMount(){
        document.title = "Tasks"

        const project_id = this.props.match.params.project_id

        axios.get(`/api/tasks/${project_id}`).then(response => {
            this.setState({
                tasks: response.data,
                project_id: response.data[0].project_id,
            })
        })

        this.renderTableData();
    }

    render() {

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className='col-md-12'>
                        <div className="card">
                            <div className='card-header'>
                                <Container>
                                    <Row>
                                        <Col md={{ span: 9 }}>
                                            <h3>Tasks</h3>
                                        </Col>
                                        <Col md={{ span: 3 }}>
                                            <Link className='btn btn-primary btn-md mb-3' to={`/create_tasks/${this.state.project_id}`}>
                                                <BsPlus /> Task
                                            </Link>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                            <div className='card-body'>

                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>TASK</th>
                                            <th>PROJECT</th>
                                            <th>ACTION</th>
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

export default Tasks
