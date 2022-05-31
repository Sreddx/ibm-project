import { useState } from "react";
import {
    Box,
    IconButton,
    ListItem,
    List,
    Typography,
    Paper,
    Modal,
    TextField,
    Button,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { postNewEmployee } from "../../actions/Manager/employee";

export const AddFormEmployee = ({ closeModal, record, setRecord }) => {
    const [dateStart, setDateStart] = useState(new Date());
    const [dateFinish, setDateFinish] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        postNewEmployee(record);
    };

    return (
        <>
            <Modal
                sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    top: "5rem",
                    justifyContent: "center",
                    width: 700,
                }}
                open={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper>
                    <Box>
                        <Typography
                            sx={{
                                paddingLeft: 5,
                                paddingTop: 3,
                                paddingBottom: 2,
                            }}
                            variant="h5"
                            component="h2"
                        >
                            New Employee Information
                        </Typography>
                        <List sx={{ paddingLeft: 10, display: "inline-block" }}>
                            <ListItem>
                                <TextField
                                    sx={{ paddingRight: 6 }}
                                    required
                                    size="small"
                                    label="First Name"
                                    onChange={(e) => {
                                        setRecord({
                                            ...record,
                                            firstName: e.target.value,
                                        });
                                        console.log(record);
                                    }}
                                />

                                <TextField
                                    required
                                    size="small"
                                    label="Last Name"
                                    onChange={(e) => {
                                        setRecord({
                                            ...record,
                                            lastName: e.target.value,
                                        });
                                    }}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    sx={{ paddingRight: 6 }}
                                    required
                                    size="small"
                                    label="Email"
                                    onChange={(e) => {
                                        setRecord({
                                            ...record,
                                            email: e.target.value,
                                        });
                                    }}
                                />

                                <TextField
                                    required
                                    size="small"
                                    label="Country from"
                                    onChange={(e) => {
                                        setRecord({
                                            ...record,
                                            originCountry: e.target.value,
                                        });
                                    }}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    sx={{ paddingRight: 6 }}
                                    required
                                    size="small"
                                    label="ICA "
                                    onChange={(e) => {
                                        setRecord({
                                            ...record,
                                            ICA: e.target.value,
                                        });
                                    }}
                                />

                                <TextField
                                    required
                                    size="small"
                                    label="Country Working"
                                    onChange={(e) => {
                                        setRecord({
                                            ...record,
                                            currentCountry: e.target.value,
                                        });
                                    }}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    sx={{ paddingRight: 6 }}
                                    required
                                    size="small"
                                    label="Type"
                                    onChange={(e) => {
                                        setRecord({
                                            ...record,
                                            type: e.target.value,
                                        });
                                    }}
                                />

                                <TextField
                                    required
                                    size="small"
                                    label="Band"
                                    onChange={(e) => {
                                        setRecord({
                                            ...record,
                                            band: e.target.value,
                                        });
                                    }}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    sx={{ paddingRight: 6 }}
                                    required
                                    size="small"
                                    label="Squad"
                                    onChange={(e) => {
                                        setRecord({
                                            ...record,
                                            squad: e.target.value,
                                        });
                                    }}
                                />

                                <LocalizationProvider
                                    marginRight="50rem"
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DatePicker
                                        renderInput={(params) => (
                                            <TextField
                                                sx={{ width: "14rem" }}
                                                {...params}
                                            />
                                        )}
                                        value={dateStart}
                                        onChange={(date) => {
                                            const d = new Date(date);
                                            console.log(d);
                                            setRecord({
                                                ...record,
                                                dateStart: d,
                                            });
                                        }}
                                    />
                                </LocalizationProvider>
                            </ListItem>
                            <ListItem>
                                <LocalizationProvider
                                    marginRight="50rem"
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DatePicker
                                        renderInput={(params) => (
                                            <TextField
                                                sx={{ width: "14rem" }}
                                                {...params}
                                            />
                                        )}
                                        value={dateFinish}
                                        onChange={(date) => {
                                            const dF = new Date(date);
                                            console.log(dF);
                                            setRecord({
                                                ...record,
                                                dateFinish: dF,
                                            });
                                        }}
                                    />
                                </LocalizationProvider>
                            </ListItem>

                            <ListItem sx={{ paddingTop: 5 }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        marginRight: 6,
                                        textTransform: "none",
                                        borderRadius: "4px",
                                        width: "14rem",
                                        height: "40px",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        bgcolor: "#0062ff",
                                        ":hover": {
                                            bgcolor: "#0255DA",
                                        },
                                    }}
                                    onClick={() => closeModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        marginRight: 6,
                                        textTransform: "none",
                                        borderRadius: "4px",
                                        width: "14rem",
                                        height: "40px",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        bgcolor: "#0062ff",
                                        ":hover": {
                                            bgcolor: "#0255DA",
                                        },
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Modify
                                </Button>
                            </ListItem>
                        </List>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
};

export default AddFormEmployee;
