import React, { useState } from "react";

import 'dayjs/locale/en-gb';
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/dist/sweetalert2.min.css';

import "../styles/ListTasks.css"

const MySwal = withReactContent(Swal);

const ListTasks = ({ tasks, task, addTasks, indice, setNewTask, setEditingIndex }) => {

    const [isRemoving, setRemoving] = useState(false);

    const handleClickDelete = (task) => {
        setRemoving(true);                 // activa la animación
        setTimeout(() => {
            const newTasks = tasks.filter(item => item !== task)
            addTasks(newTasks)
        }, 250)
    }

    const handleClickExpand = (index) => {
        addTasks((prev) => prev.map((task, i) => i === index ? { ...task, open: !task.open } : task))
    }

    const handleClickChangeState = (actualState, index) => {
        MySwal.fire({
            title: <i>Cambia el estado</i>,
            text: "Selecciona el estado en que desear cambiar el estado de la tarea",
            input: "radio",
            inputOptions: {
                Pendiente: 'Pendiente',
                Proceso: 'En proceso',
                Completado: 'Completado',
            },
            inputValue: actualState,
            confirmButtonText: "Aceptar",
            showCancelButton: true,
            inputValidator: (value) =>
                !value && 'Selecciona un estado para la tarea',
        }).then(({ value, isConfirmed }) => {
            if (isConfirmed && value) {
                value !== "Proceso"
                    ? addTasks((prev) => prev.map((task, i) => i === index ? { ...task, state: value } : task))
                    : addTasks((prev) => prev.map((task, i) => i === index ? { ...task, state: "En Proceso" } : task))
            }
        })
    }

    return (
        <div className={`
            ${task.state === "Pendiente" ? "Search-Tasks-Pending" : task.state === "En Proceso" ? "Search-Tasks-Progress" : "Search-Tasks-Completed"}
             ${isRemoving ? 'Fade-Out' : ''}`
        }>
            <ListItemButton>
                <ListItemText
                    primary={<i><b>{task.name}</b></i>}
                    secondary={task.date.format("DD/MM/YYYY HH:mm")}
                />
                <IconButton onClick={() => handleClickDelete(task)}>
                    <DeleteOutlinedIcon />
                </IconButton>
                <IconButton
                    onClick={() => handleClickExpand(indice)}
                    aria-expanded={task.open}
                    aria-label="show more"
                    sx={{
                        transform: task.open ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                >

                    <ExpandMoreIcon />
                </IconButton>
            </ListItemButton>
            <Collapse in={task.open} timeout="auto" unmountOnExit>
                <div className="Search-Task-Description">
                    <h3>{task.description}</h3>
                    <IconButton onClick={() => {
                        setNewTask(task)
                        setEditingIndex(indice)
                    }}><EditOutlinedIcon fontSize="large" /></IconButton>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    <button onClick={() => handleClickChangeState(task.state, indice)}
                        className={
                            task.state === "Pendiente" ? "Search-Tasks-Pending-Btn" : task.state === "En Proceso" ? "Search-Tasks-Progress-Btn" : "Search-Tasks-Completed-Btn"}
                    >
                        {task.state}
                    </button>
                    <h3>{task.date.format("DD/MM/YYYY HH:mm")}</h3>
                </div>
            </Collapse>
        </div>
    )
}
export default ListTasks;