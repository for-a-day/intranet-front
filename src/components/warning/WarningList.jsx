import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./WarningListStyles";
import { Box, TextField, Table, TableHead, TableRow, TableCell, Typography, TableBody } from "@mui/material";
import instance from "../../axiosConfig";

const WarningList = () => {
        const token = localStorage.getItem('token');
        const [warn, setWarn] = useState([]);
        
        useEffect(() => {
            const fetchWarn = async () => {
                try{
                    const response = await instance.get('/app/warn');
                    const warnMap = response.data.data;

                    const warnArray = Object.values(warnMap);
                    setWarn(warnArray);
                }catch(error){
                    console.error('폐점 목록 : 에러', error);
                }
            };
            fetchWarn();
        }, [token]);

        return (
            <Box sx={{width:'80%', mx:'auto', mt:4}}>
                  <Table
                    aria-label="simple table"
                    sx={{
                    whiteSpace: "nowrap",
                    }}
                >
                    <TableHead sx={{borderBottom:'2px solid #d1cfcf'}}>
                        <TableRow>
                            <TableCell sx={{width:50}}>
                            <Typography color="textSecondary" variant="h6" align="center">
                                번호
                                </Typography>
                            </TableCell>
                            <TableCell>
                            <Typography color="textSecondary" variant="h6" align="center">
                                경고사유
                                </Typography>
                                </TableCell>
                            <TableCell>
                            <Typography color="textSecondary" variant="h6" align="center">
                                폐점명
                                </Typography>
                                </TableCell>
                            <TableCell>
                            <Typography color="textSecondary" variant="h6" align="center">
                                가맹점명
                                </Typography>
                                </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {warn.map((warn) => (
                            <TableRow key={warn.warningId}
                            sx={{
                                cursor: "pointer",
                                "&:hover": { backgroundColor: "#f5f5f5" },
                            }}>
                                <TableCell>
                                <Typography variant="h6" align="center">
                                    {warn.warningId}
                                    </Typography>
                                    </TableCell>
                                <TableCell>
                                <Typography variant="h6" align="center">
                                    {warn.warningReason}
                                    </Typography>
                                    </TableCell>
                                <TableCell>
                                <Typography variant="h6" align="center">
                                    {warn.closing ? warn.closing.closingName : '-'}
                                </Typography>
                                </TableCell>
                                <TableCell>
                                <Typography variant="h6" align="center">
                                    {warn.franchisee ? warn.franchisee.franchiseeName : '-'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        );
}

export default WarningList;