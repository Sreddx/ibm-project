import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Typography, Button, Grid, Box, TextField, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import data1 from "./dataTest";

export const ExpenseForm = () => {
    const [textValue, setTextValue] = useState("");

    const onTextChange = (e) => setTextValue(e.target.value);
    const handleSubmit = () => console.log(textValue);
    // const handleReset = () => setTextValue('');

    return (
        <Grid container spacing={2} sx={{ marginBottom: 5 }}>
            <Grid item xs={10}>
                <TextField
                    fullWidth
                    onChange={onTextChange}
                    value={textValue}
                    label={"Enter expense type"} //optional
                />
            </Grid>
            <Grid item xs={2}>
                <Button
                    onClick={console.log("Aguanta")}
                    variant="contained"
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        textTransform: "none",
                        borderRadius: "0px",
                        width: "12rem",
                        height: "50px",
                        fontSize: "15px",
                        fontWeight: "400",
                        bgcolor: "#0062ff",
                        ":hover": {
                            bgcolor: "#0255DA",
                        },
                    }}
                >
                    Submit
                </Button>
                {/* <Button
                    onClick={handleReset}
                    variant="contained"
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        textTransform: "none",
                        borderRadius: "0px",
                        width: "12rem",
                        height: "40px",
                        fontSize: "15px",
                        fontWeight: "400",
                        bgcolor: "#0062ff",
                        ":hover": {
                            bgcolor: "#0255DA",
                        },
                    }}
                >
                    Reset
                </Button> */}
            </Grid>
        </Grid>
    );
};

export const ExpensesTable = () => {
    const [expenseData, getExpenseData] = useState([]);
    const URL = "http://localhost:3000/expensesTypes";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(URL)
            .then((res) => res.json())

            .then((response) => {
                console.log(response);
                getExpenseData(response);
            });
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                "& .MuiTableCell-head": {
                    color: "#0062ff",
                    textTransform: "uppercase",
                    fontWeight: "500",
                },
                padding: "5px 20px",
            }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Expense Type Name</TableCell>
                        <TableCell>Expense Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenseData.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="left">
                                {row.expensesNames}
                            </TableCell>
                            <TableCell align="left">
                                {row.expensesAmount}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export const ExpensesTypes = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
            }}
        >
            <Typography
                align="center"
                variant="h3"
                sx={{ marginBottom: "4.5rem", fontWeight: "300" }}
            >
                New Type of Expense
            </Typography>

            <ExpenseForm />
            <ExpensesTable />
        </Box>
    );
};

export function getExpensesTypes(cb) {
    fetch("http://localhost:3000/expensesTypes", { method: "GET" })
        .then((response) => response.json()) // Parsing the data into a JavaScript object
        .then((result) => cb(result)); // Displaying the stringified data in an alert popup
}

export async function getExpensesTypes2() {
    const res = await fetch("http://localhost:3000/expensesTypes", {
        method: "GET",
    });
    const response = await res.json();
    return response;
}

// export function postNewExpenseType() {
//     fetch("http://localhost:3000/expensesTypes", { method: "GET" })
//         .then((response) => response.json()) // Parsing the data into a JavaScript object
//         .then((result) => cb(result)); // Displaying the stringified data in an alert popup
// }