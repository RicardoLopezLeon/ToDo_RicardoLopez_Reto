import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"

import 'dayjs/locale/en-gb';
import dayjs from 'dayjs';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import List from "@mui/material/List";
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/dist/sweetalert2.min.css';
import ListTasks from "../components/ListTasks";
import FormTask from "../components/FormTask";

import "../styles/Dashboard.css"


const MySwal = withReactContent(Swal);

const Dashboard = () => {

    const [tasks, addTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (!storedTasks) 
            return [];
        
        const parsed = JSON.parse(storedTasks);
        return parsed.map(task => ({...task,date: dayjs(task.date),}));
    });
    const [newTask, setNewTask] = useState({ name: "", description: "", date: dayjs(), state: "Pendiente", open: false, num: 0 })
    const [filter, setFilter] = useState("")
    const [filterSelected, setFilterSelected] = useState('radio-task')
    const [editingIndex, setEditingIndex] = useState(null);

    const handleChange = (event) => {
        setFilterSelected(event.target.value)
    }

    const controlProps = (item) => ({
        checked: filterSelected === item,
        onChange: handleChange,
        value: item,
        name: `${item}`,
    })

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    return (
        <>
            <div>
                <h1>ToDo</h1>
            </div>
            <div className="container">
                <FormTask newTask={newTask} setNewTask={setNewTask} tasks={tasks} addTasks={addTasks}
                    editingIndex={editingIndex} setEditingIndex={setEditingIndex}
                />
                <div className="container-Search">
                    <div>
                        <h2>Buscar Tareas</h2>
                        <TextField name="filtroTask" onChange={(e) => { setFilter(e.target.value) }} className="Search-TextField" />
                        <div>
                            <FormControlLabel control={<Radio {...controlProps("radio-task")} color="secondary" />} label="Descripción" />
                            <FormControlLabel control={<Radio {...controlProps("radio-state")} color="success" />} label="Estado" />
                        </div>
                    </div>
                    {
                        tasks.length < 1
                            ? <h2>No hay tareas por el momento</h2>
                            : filter === ""
                                ? <List>
                                    {tasks.map((task, index) => (
                                        <div key={index} className="Container-Search-List">
                                            <ListTasks tasks={tasks} task={task} addTasks={addTasks} indice={index}
                                                setNewTask={setNewTask} setEditingIndex={setEditingIndex}
                                            />
                                        </div>
                                    ))}
                                </List>
                                : filterSelected === "radio-state"
                                    ? <List>
                                        {tasks.filter(item => filter.trim().toLowerCase().split(/\s+/).every(words => item.state.toLowerCase().includes(words))).map((task, index) => (
                                            <div key={index}>
                                                <ListTasks tasks={tasks} task={task} addTasks={addTasks} indice={index}
                                                    setNewTask={setNewTask} setEditingIndex={setEditingIndex}
                                                />
                                            </div>
                                        ))}
                                    </List>
                                    : <List>
                                        {tasks.filter(item => filter.trim().toLowerCase().split(/\s+/).every(words => item.description.toLowerCase().includes(words))).map((task, index) => (
                                            <div key={index}>
                                                <ListTasks tasks={tasks} task={task} addTasks={addTasks} indice={index}
                                                    setNewTask={setNewTask} setEditingIndex={setEditingIndex}
                                                />
                                            </div>
                                        ))}
                                    </List>
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard;