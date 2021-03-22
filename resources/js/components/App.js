import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewProject from './NewProject'
import EditProject from './EditProject'
import Projects from './Projects'
import ProjectTasks from './Tasks'
import EditTask from './EditTask'
import NewTask from './NewTask'

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Projects} />
                        <Route path='/project_tasks/:project_id' component={ProjectTasks} />
                        <Route path='/create' component={NewProject} />
                        <Route path='/edit_project/:id' component={EditProject} />
                        <Route path='/create_tasks/:project_id' component={NewTask} />
                        <Route path='/edit_task/:task_id' component={EditTask} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'))
}