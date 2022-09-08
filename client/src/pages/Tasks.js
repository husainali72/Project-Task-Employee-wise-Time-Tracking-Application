import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { TablePagination } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "../views/view-css";
import AddTask from "../components/AddTask";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useDispatch, useSelector } from "react-redux";
import { DeleteData } from "../utils/fetch-sevice";
import Loading from "../components/Loading";
import { GetFetch } from "../store/actions/taskActions";
import UpdateTask from "../components/UpdateTask";
import TaskPopUp from "../components/TaskPopUp";
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import SearchIcon from '@mui/icons-material/Search';


function Tasks() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.task.loading)
    const items = useSelector(state => state.task.tasks)

    const [rows, setRows] = useState(items);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [updateModal, setUpdateModal] = useState(false)
    const [updateRow, setUpdateRow] = useState({})
    const [pop, setPop] = useState(false);

    useEffect(() => {
        console.log("task", items)
        dispatch(GetFetch('task'));
    }, [])
    useEffect(()=> {
        setRows(items)
    }, [items])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    }

    const handleDelete = (index, id) => {
        const list = [...rows];
        list.splice(index, 1);
        setRows(list);
        dispatch(DeleteData(`task/delete/${id}`))
    };

    const editData = (row) => {
        setUpdateRow(row);
        setUpdateModal(true)
    }

    return (
        <div className={classes.pageRoot}>
            <AddTask open={open} setOpen={setOpen} classes={classes} />
            <TaskPopUp pop={pop} setPop={setPop} classes={classes} />
            <UpdateTask open={updateModal} setOpen={setUpdateModal} row={updateRow} classes={classes} />
            <TableContainer component={Paper} className={classes.tableContainer}>
                <div className={classes.titleContainer}>
                    <TextField
                        id="standard-basic"
                        placeholder="Search"
                        variant="outlined"
                        size='small'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button className={classes.addButton} onClick={() => setOpen(true)}>
                        {<ControlPointIcon fontSize='small' sx={{ mr: '5px' }} />}
                        Add Task
                    </Button>
                </div>
                <Table aria-label="caption table">
                    <TableHead style={{ backgroundColor: '#F5F3FF', height: '90px' }}>
                        <TableRow>
                            <TableCell align="left" className={classes.tableCell} >Id</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Project Name</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Employee Name</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Task Name</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Priority</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Status</TableCell>
                            <TableCell align="left" className={classes.tableCell}>Time On Task</TableCell>
                            <TableCell align="center" className={classes.tableCell}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    {loading ? <Loading /> :
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => (
                                    <>
                                        <TableRow key={row._id}>
                                            <TableCell align="left" >{row._id}</TableCell>
                                            <TableCell align="left" >{row.projectName}</TableCell>
                                            <TableCell align="left" >{row.employeeName}</TableCell>
                                            <TableCell align="left" >{row.taskName}</TableCell>
                                            <TableCell align="left" >{row.priority}</TableCell>
                                            <TableCell align="left" >{row.status}</TableCell>
                                            <TableCell align="left" >{row.timeOnTask}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="edit"
                                                    style={{ color: '#3525B5' }}
                                                    onClick={() => editData(row)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    style={{ color: '#FF6161' }}
                                                    onClick={() => handleDelete(i, row._id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="view"
                                                    style={{ color: '#67D1FF' }}
                                                    onClick={() => setPop(true)}
                                                >
                                                    <PlagiarismIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                        </TableBody>}
                </Table>
                <TablePagination
                    rowsPerPageOptions={[2, 5, 10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}
export default Tasks



// const StatusType = ({ row, name }) => {
//     if (row[name] === 'Completed') {
//         return <Typography sx={{ width: '110px', py: '2px', frontSize: '2px', backgroundColor: '#67EA52', color: '#ffffff', textAlign: 'center', borderRadius: '10px' }}>Completed</Typography>
//     }
//     if (row[name] === 'Pending') {
//         return <Typography sx={{ width: '110px', py: '2px', frontSize: '2px', backgroundColor: '#FF6767', color: '#ffffff', textAlign: 'center', borderRadius: '10px' }}>Pending</Typography>
//     }
//     if (row[name] === 'In Progress') {
//         return <Typography sx={{ width: '110px', py: '2px', frontSize: '2px', backgroundColor: '#FF9E67', color: '#ffffff', textAlign: 'center', borderRadius: '10px' }}>In Progress</Typography>
//     }
//     return <Typography>{row[name]}</Typography>
// }
