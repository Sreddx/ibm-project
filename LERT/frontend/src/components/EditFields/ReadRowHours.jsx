import { TableCell, IconButton } from "@mui/material";
import { ModeEditOutlineOutlined, DeleteOutlined } from "@mui/icons-material";

export const ReadRowHours = ({ row, handleEditClick, deleteRecord }) => {
    {
        console.log(row);
    }
    return (
        <>
            <TableCell>
                <IconButton onClick={(e) => handleEditClick(e, row)}>
                    <ModeEditOutlineOutlined />
                </IconButton>

                <IconButton onClick={(e) => deleteRecord(e, row)}>
                    <DeleteOutlined />
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="left">{row.country}</TableCell>
            <TableCell align="left">{row.band}</TableCell>
            <TableCell align="left">{row.rate}</TableCell>
            <TableCell align="left">{row.date_to_start}</TableCell>
            <TableCell align="left">{row.date_to_finish}</TableCell>
        </>
    );
};

export default ReadRowHours;
