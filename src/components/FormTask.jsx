import React, { useState } from "react";
import TextField from "@mui/material/TextField"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/en-gb';
import dayjs from 'dayjs';
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css';

import "../styles/FormTask.css"

const FormTask = ({ newTask, setNewTask, tasks, addTasks, editingIndex, setEditingIndex}) => {

    const resetValues = () => {
        setNewTask({ name: "", description: "", date: dayjs(), state: "Pendiente", open: false, num: tasks.length + 1 })
    }

    const handleClickChange = (e) => {
        switch (e.target.name) {
            case "nameTask":
                setNewTask((prev) => ({ ...prev, name: e.target.value }))
                break
            case "descriptionTask":
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
                break
        }
    }

    const handleClickChangeDate = (e) => {
        const newDate = dayjs(e.$d.valueOf())
        setNewTask((prev) => ({ ...prev, date: newDate }))
    }

    const handleClickSubmit = () => {
        if (newTask.name !== "" && newTask.description !== "") {
            if (editingIndex === null)
                addTasks(prev => [...prev, newTask]);
            else
                addTasks(prev => prev.map((t, i) => (i === editingIndex ? { ...newTask } : t)));

            resetValues();
            setEditingIndex(null);
        } else {
            Swal.fire("No puedes crear una nueva tarea con campos vacios")
        }

    }

    return (
        <div id="container-Form">
            <div>
                <h2>Nombre de la tarea</h2>
                <TextField id="1" name="nameTask" value={newTask.name} onChange={handleClickChange} 
                    className="Form-TextField"
                />
            </div>
            <div>
                <h2>Descripción de la tarea</h2>
                <TextField id="2" name="descriptionTask" multiline rows={4} value={newTask.description} onChange={handleClickChange} 
                    className="Form-TextField"
                />
            </div>
            <div>
                <h2>Fecha</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <DateTimePicker name="dateTask" value={newTask.date} onChange={handleClickChangeDate} disablePast
                        slotProps={{ textField: { name: 'dateTask' }, }} className="Form-TextField"
                    />
                </LocalizationProvider>
            </div>
            <div className="Form-State">
                <div className="Form-State-Text">
                    <h2>Estado</h2>
                    <TextField id="4" name="stateTask" value={newTask.state} disabled sx={{width:"8rem"}}/>
                </div>
                <div className="Form-State-Buttons">
                    <button onClick={resetValues}>Cancelar</button>
                    <button type="submit" onClick={() => handleClickSubmit()}>Guardar</button>
                </div>
            </div>
        </div>
    )
}

export default FormTask;