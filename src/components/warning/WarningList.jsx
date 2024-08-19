import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./WarningListStyles";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Pagination,
} from "@mui/material";
import instance from "../../axiosConfig";

const WarningList = () => {
  const token = localStorage.getItem("token");
  const [warn, setWarn] = useState([]);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Calculate the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = warn.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchWarn = async () => {
      try {
        const response = await instance.get("/app/warn");
        const warnMap = response.data.data;

        const warnArray = Object.values(warnMap);
        setWarn(warnArray);
      } catch (error) {
        console.error("폐점 목록 : 에러", error);
      }
    };
    fetchWarn();
  }, [token]);

  return (
    <Box sx={{ width: "95%", mx: "auto", mt: 4 }}>
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        <TableHead sx={{ borderBottom: "2px solid #d1cfcf" }}>
          <TableRow>
            <TableCell></TableCell>
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
          {currentItems.map((warn, index) => (
            <TableRow
              key={warn.warningId}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <TableCell align="center">{indexOfFirstItem + index + 1}</TableCell>
              <TableCell>
                <Typography variant="h6" align="center">
                  {warn.warningReason}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">
                  {warn.closing ? warn.closing.closingName : "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">
                  {warn.franchisee ? warn.franchisee.franchiseeName : "-"}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(warn.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default WarningList;
