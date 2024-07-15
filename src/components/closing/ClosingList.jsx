import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  Pagination,
} from "@mui/material";
import styles from "./ClosingListStyle";
import { Close as CloseIcon } from "@mui/icons-material";
import instance from "../../axiosConfig";

const ClosingList = () => {
  const token = localStorage.getItem("token");
  const [close, setClose] = useState([]);
  const [selectedClose, setSelectedClose] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Calculate the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = close.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchClose = async () => {
      try {
        const response = await instance.get("/app/close");
        const closeMap = response.data.data;

        const closeArray = Object.values(closeMap);
        setClose(closeArray);
      } catch (error) {
        console.error("폐점 목록 : 에러", error);
      }
    };
    fetchClose();
  }, [token]);

  // 화면 기능 - 행 클릭 시,
  const handleRowClick = (close) => {
    setSelectedClose(close);
    setIsModalOpen(true);
  };
  // 화면 기능 - 모달 창 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClose(null);
  };

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
                폐점 아이디
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                가맹점명
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                대표자명
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                주소
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                계약일
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                계약 만료일
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                폐점일
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.map((close, index) => (
            <TableRow
              key={close.closingId}
              style={close.closingId % 2 === 0 ? styles.tr.nthChildEven : null}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = styles.tr.hover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  close.closingId % 2 === 0 ? styles.tr.nthChildEven.backgroundColor : "")
              }
              onClick={() => handleRowClick(close)}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <TableCell align="center">{indexOfFirstItem + index + 1}</TableCell>
              <TableCell>
                <Typography variant="h6" align="center">
                  {close.closingId}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">
                  {close.closingName}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">
                  {close.owner}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">
                  {close.address}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">
                  {close.contractDate}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">
                  {close.expirationDate}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">
                  {close.closingDate}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalOpen && (
        <>
          <div style={styles.overlay} onClick={closeModal}></div>
          <div style={styles.modal}>
            <IconButton sx={{ position: "absolute", top: 20, right: 20 }} onClick={closeModal}>
              <CloseIcon />
            </IconButton>

            <Typography
              variant="h2"
              sx={{ pt: 2, pl: 1, paddingBottom: "20px", fontWeight: "bold" }}
            >
              폐점 상세 정보
            </Typography>
            <hr style={{ marginBottom: "10px" }}></hr>
            <Grid container spacing={3} sx={{ mt: 1, pl: 2 }}>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  가맹점 아이디
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.closingId}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  담당자
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.employeeId}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  가맹점명
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.closingName}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  대표자명
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.owner}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  지점주소
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.address}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  연락처
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  계약일
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.contractDate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  계약만료일
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.expirationDate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" fontWeight="bold">
                  폐점사유
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{selectedClose.closingReason}</Typography>
              </Grid>
            </Grid>
          </div>
        </>
      )}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(close.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ClosingList;
