import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Pagination,
} from "@mui/material";
import instance from "../../axiosConfig";
import EditModal from "./EditModal";
import DetailModal from "./DetailModal";

const MenuList = () => {
  const token = localStorage.getItem("token");
  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 정보를 저장할 상태
  const [showModal, setShowModal] = useState(false); // 상세 모달 표시 여부를 관리하는 상태
  const [showEditModal, setShowEditModal] = useState(false); // 수정 모달 표시 여부를 관리하는 상태
  const [formData, setFormData] = useState({
    menu_id: "",
    menu_name: "",
    menu_price: 0,
    menu_recipe: "",
    menu_origin_price: 0,
    menu_end: 0,
  });

  // 페이징
  const [currentPageSelling, setCurrentPageSelling] = useState(1);
  const [currentPageNotSelling, setCurrentPageNotSelling] = useState(1); // 수정: 0에서 1로 변경
  const itemsPerPage = 5;

  // 페이징 핸들러
  const handlePageChangeSelling = (event, value) => {
    setCurrentPageSelling(value);
  };

  const handlePageChangeNotSelling = (event, value) => {
    setCurrentPageNotSelling(value);
  };

  // 목록
  const fetchMenu = async () => {
    try {
      const response = await instance.get("/app/menu");
      const menuMap = response.data.data;

      const menuArray = Object.values(menuMap);
      setMenu(menuArray);
    } catch (error) {
      console.error("폐점 목록 : 에러", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [token]);

  // 메뉴 삭제 함수
  const handleDeleteMenu = async () => {
    const delData = {
      menu_id: selectedMenu.menu_id,
      menu_name: selectedMenu.menu_name,
      menu_price: selectedMenu.menu_price,
      menu_recipe: selectedMenu.menu_recipe,
      menu_origin_price: selectedMenu.menu_origin_price,
      menu_end: 0,
    };
    try {
      // 삭제 API 호출
      const delResponse = await instance.put(`/app/menu/delete/${selectedMenu.menu_id}`, delData);

      alert("메뉴가 미판매 처리 되었습니다.");
      console.log("메뉴 삭제 완료");
      handleCloseModal();
      console.log("삭제 API 응답:", delResponse.data);
    } catch (error) {
      console.error("메뉴 삭제 에러", error);
    }
    fetchMenu();
  };

  const handleModMenu = async () => {
    const modData = {
      menu_id: formData.menu_id,
      menu_name: formData.menu_name,
      menu_price: formData.menu_price,
      menu_recipe: formData.menu_recipe,
      menu_origin_price: formData.menu_origin_price,
      menu_end: formData.menu_end,
    };
    try {
      // 수정 API 호출
      const modResponse = await instance.put(`/app/menu/${selectedMenu.menu_id}`, modData);
      alert("메뉴가 성공적으로 수정되었습니다");
      handleCloseEditModal();
      console.log("수정 API 응답:", modResponse.data);
    } catch (error) {
      console.error("메뉴 수정 에러", error);
    }
    fetchMenu();
  };

  // 모달 열기
  const handleOpenModal = (menu) => {
    setSelectedMenu(menu);
    setShowModal(true);
  };

  // 수정 모달 열기
  const handleOpenEditModal = (menu) => {
    setSelectedMenu(menu);
    setFormData(menu);
    setShowEditModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setSelectedMenu(null);
    setShowModal(false);
  };

  // 수정 모달 닫기
  const handleCloseEditModal = () => {
    setSelectedMenu(null);
    setShowEditModal(false);
  };

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 메뉴 상태에 따라 필터링하여 테이블 렌더링
  const renderMenuTable = (isEnd, currentPage, handlePageChange) => {
    const filteredMenu = menu.filter((item) => item.menu_end === isEnd);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedMenuItems = filteredMenu.slice(startIndex, startIndex + itemsPerPage);
    
    return (
    <>
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        <TableHead sx={{ borderBottom: "2px solid #d1cfcf" }}>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                메뉴ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                메뉴명
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                판매가격
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                레시피
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                총 원가
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" align="center">
                판매여부
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedMenuItems.map((menu) => (
            <TableRow
              key={menu.menu_id}
              onClick={() => handleOpenModal(menu)}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }} align="center">
                  {menu.menu_id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }} align="center">
                  {menu.menu_name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }} align="center">
                  {menu.menu_price.toLocaleString()}원
                </Typography>
              </TableCell>
              <TableCell sx={{ width: 320 }}>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }} align="center">
                  {menu.menu_recipe}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }} align="center">
                  {menu.menu_origin_price.toLocaleString()}원
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: menu.menu_end === 1 ? "primary.main" : "error.main",
                    color: "#fff",
                  }}
                  size="small"
                  label={menu.menu_end === 1 ? "판매" : "미판매"}
                ></Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredMenu.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
    );
  };

  return (
    <>
      <Box sx={{ width: "90%", mx: "auto" }}>
        {/* 판매 중인 메뉴 */}
        <Typography variant="h2" sx={{ pt: 5, paddingBottom: "30px", fontWeight: "bold" }}>
          판매 중인 메뉴
        </Typography>
        {renderMenuTable(1, currentPageSelling, handlePageChangeSelling)}

        {/* 미판매 메뉴 */}
        <Typography variant="h2" sx={{ pt: 10, paddingBottom: "30px", fontWeight: "bold" }}>
          미판매 메뉴
        </Typography>
        {renderMenuTable(0, currentPageNotSelling, handlePageChangeNotSelling)}
      </Box>
        {/* 상세 모달 */}
        {selectedMenu && showModal && (
          <DetailModal
            selectedMenu={selectedMenu}
            handleCloseModal={handleCloseModal}
            handleDeleteMenu={handleDeleteMenu}
            handleOpenEditModal={handleOpenEditModal}
          />
        )}
        {/* 수정 모달 */}
        {selectedMenu && showEditModal && (
          <EditModal
          formData={formData}
          handleCloseEditModal={handleCloseEditModal}
          handleChange={handleChange}
          handleModMenu={handleModMenu}
        />
      )}
    </>
  );
};

export default MenuList;