import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';


const AddTask = ({ open, setOpen, classes }) => {
    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.formRoot}>
                    <div style={{ width: '100%' }}>
                        <Typography className={classes.formTitle}>Add Task</Typography>
                    </div>
                    <TextField
                        margin="normal"
                        required
                        label="Enter Project Name"
                        name="project"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter Task Name"
                        name="task"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter Employee Name"
                        name="employee"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <Stack direction='row' spacing={2}>
                        <FormControl className={classes.inputSelect}>
                            <InputLabel id="priority-label">Priority</InputLabel>
                            <Select
                                labelId="priority-label"
                                id="select"
                                label="Priority"
                            >
                                <MenuItem value='low'>Low</MenuItem>
                                <MenuItem value='medium'>Medium</MenuItem>
                                <MenuItem value='high'>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.inputSelect}>
                            <InputLabel size='large' id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                id="select"
                                label="Priority"
                            >
                                <MenuItem value='active'>Active</MenuItem>
                                <MenuItem value='completed'>Completed</MenuItem>
                                <MenuItem value='pending'>Pending</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <div>
                        <Button sx={{ color: '#FF6161', border: '#FF6767' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default AddTask