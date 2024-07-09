import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  Pagination
} from "@mui/material";
import styles from "./ClosingListStyle";
import { Close as CloseIcon } from "@mui/icons-material";

const ClosingList = () => {
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
        const response = await axios.get("http://localhost:9000/app/close");
        const closeMap = response.data.data;

        const closeArray = Object.values(closeMap);
        setClose(closeArray);
      } catch (error) {
        console.error("폐점 목록 : 에러", error);
      }
    };
    fetchClose();
  }, []);

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
            <IconButton sx={{ position: "absolute", top: 10, right: 10 }} onClick={closeModal}>
              <CloseIcon />
            </IconButton>

            <h2>가맹점 상세 정보</h2>
            <p style={styles.paragraph}>
              <strong>가맹점 아이디 : </strong> {selectedClose.closingId}
            </p>
            <p style={styles.paragraph}>
              <strong>담당자 : </strong> {selectedClose.employeeId}
            </p>
            <p style={styles.paragraph}>
              <strong>가맹점명 : </strong> {selectedClose.closingName}
            </p>
            <p style={styles.paragraph}>
              <strong>대표자명 : </strong> {selectedClose.owner}
            </p>
            <p style={styles.paragraph}>
              <strong>지점주소 : </strong> {selectedClose.address}
            </p>
            <p style={styles.paragraph}>
              <strong>연락처 : </strong> {selectedClose.phoneNumber}
            </p>
            <p style={styles.paragraph}>
              <strong>계약일 : </strong> {selectedClose.contractDate}
            </p>
            <p style={styles.paragraph}>
              <strong>계약만료일 : </strong> {selectedClose.expirationDate}
            </p>
            <p style={styles.paragraph}>
              <strong>폐점사유 : </strong> {selectedClose.closingReason}
            </p>
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
