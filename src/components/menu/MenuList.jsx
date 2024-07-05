import React, { useEffect, useState } from "react";
import axios from "axios";
import { MenuItem, TextField } from "@mui/material";
import styles from './MenuListStyles';

const MenuList = () => {
    const [menu, setMenu] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 정보를 저장할 상태
    const [showModal, setShowModal] = useState(false); // 상세 모달 표시 여부를 관리하는 상태
    const [showEditModal, setShowEditModal] = useState(false); // 수정 모달 표시 여부를 관리하는 상태
    const [formData, setFormData] = useState({
        menu_id: '',
        menu_name: '',
        menu_price: 0,
        menu_recipe: '',
        menu_origin_price: 0,
        menu_end: 0
    });

    // 목록
    const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:9000/app/menu');
                const menuMap = response.data.data;

                const menuArray = Object.values(menuMap);
                setMenu(menuArray);
            } catch (error) {
                console.error('폐점 목록 : 에러', error);
            }
        };

    useEffect(() => {
        fetchMenu();
    }, []);

    // 메뉴 삭제 함수
    const handleDeleteMenu = async () => {
        const delData = ({
            menu_id: selectedMenu.menu_id,
            menu_name: selectedMenu.menu_name,
            menu_price: selectedMenu.menu_price,
            menu_recipe: selectedMenu.menu_recipe,
            menu_origin_price: selectedMenu.menu_origin_price,
            menu_end: 0
        })
        try {
            // 삭제 API 호출
            const delResponse = await axios.put(`http://localhost:9000/app/menu/delete/${selectedMenu.menu_id}`, delData);

            alert('메뉴가 미판매 처리 되었습니다.');
            console.log('메뉴 삭제 완료');
            handleCloseModal();
            console.log('삭제 API 응답:', delResponse.data);
        } catch (error) {
            console.error('메뉴 삭제 에러', error);
        }
        fetchMenu();
    };

    const handleModMenu = async () => {
        const modData = ({
            menu_id: formData.menu_id,
            menu_name: formData.menu_name,
            menu_price: formData.menu_price,
            menu_recipe: formData.menu_recipe,
            menu_origin_price: formData.menu_origin_price,
            menu_end: formData.menu_end
        })
        try {
            // 수정 API 호출
            const modResponse = await axios.put(`http://localhost:9000/app/menu/${selectedMenu.menu_id}`, modData);
            alert('메뉴가 성공적으로 수정되었습니다');
            handleCloseEditModal();
            console.log('수정 API 응답:', modResponse.data);
        } catch (error) {
            console.error('메뉴 수정 에러', error);
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
    const renderMenuTable = (isEnd) => {
        const filteredMenu = menu.filter(item => item.menu_end === isEnd);
        return (
            <table style={styles.table}>
                <thead style={styles.thead}>
                    <tr>
                        <th style={styles.th}>메뉴ID</th>
                        <th style={styles.th}>메뉴명</th>
                        <th style={styles.th}>판매가격</th>
                        <th style={styles.th}>레시피</th>
                        <th style={styles.th}>총 원가</th>
                        <th style={styles.th}>판매여부</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMenu.map((menu) => (
                        <tr key={menu.menu_id} onClick={() => handleOpenModal(menu)}>
                            <td style={styles.td}>{menu.menu_id}</td>
                            <td style={styles.td}>{menu.menu_name}</td>
                            <td style={styles.td}>{menu.menu_price}</td>
                            <td style={styles.td}>{menu.menu_recipe}</td>
                            <td style={styles.td}>{menu.menu_origin_price}</td>
                            <td style={styles.td}>
                                {menu.menu_end === 1 ? '판매' : '미판매'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div style={styles.container}>
            {/* 판매 중인 메뉴 */}
            <h3>판매 중인 메뉴</h3>
            {renderMenuTable(1)}
            
            {/* 미판매 메뉴 */}
            <h3>미판매 메뉴</h3>
            {renderMenuTable(0)}

            {/* 상세 모달 */}
            {selectedMenu && showModal && (
                <>
                    <div style={styles.overlay} onClick={handleCloseModal}></div>
                    <div style={styles.modal}>
                        <div style={styles.modalContent}>
                            <h4 style={styles.modalTitle}>메뉴 상세 정보</h4>
                            <hr></hr>
                            <div><p><strong>메뉴ID : </strong> {selectedMenu.menu_id}</p></div>
                            <div><p><strong>메뉴명 : </strong> {selectedMenu.menu_name}</p></div>
                            <div><p><strong>판매가격 : </strong> {selectedMenu.menu_price}</p></div>
                            <div><p><strong>레시피 : </strong> {selectedMenu.menu_recipe}</p></div>
                            <div><p><strong>총 원가 : </strong> {selectedMenu.menu_origin_price}</p></div>
                            <div><p><strong>판매여부 : </strong> {selectedMenu.menu_end === 1 ? '판매' : '미판매'}</p></div>
                        </div>
                        <div style={styles.modalButtons}>
                            <button style={styles.delButton} onClick={handleDeleteMenu}>미판매</button>
                            <button style={styles.button} onClick={() => handleOpenEditModal(selectedMenu)}>수정</button>
                            <button style={styles.button} onClick={handleCloseModal}>닫기</button>
                        </div>
                    </div>
                </>
            )}

            {/* 수정 모달 */}
            {selectedMenu && showEditModal && (
                <>
                    <div style={styles.overlay} onClick={handleCloseEditModal}></div>
                    <div style={styles.modal}>
                        <div style={styles.modalContent}>
                            <h4 style={styles.modalTitle}>메뉴 수정</h4>
                            <hr></hr>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    type="text"
                                    name="menu_id"
                                    label="메뉴ID"
                                    value={formData.menu_id}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    type="text"
                                    name="menu_name"
                                    label="메뉴명"
                                    value={formData.menu_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    type="number"
                                    name="menu_price"
                                    label="판매가격"
                                    value={formData.menu_price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    type="text"
                                    name="menu_recipe"
                                    label="레시피"
                                    value={formData.menu_recipe}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    type="number"
                                    name="menu_origin_price"
                                    label="총 원가"
                                    value={formData.menu_origin_price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={styles.editInput}
                                    select
                                    name="menu_end"
                                    label="판매여부"
                                    value={formData.menu_end}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>판매</MenuItem>
                                    <MenuItem value={0}>미판매</MenuItem>
                                </TextField>
                            </div>
                        </div>
                        <div style={styles.modalButtons}>
                            <button style={styles.button} onClick={handleModMenu}>저장</button>
                            <button style={styles.button} onClick={handleCloseEditModal}>취소</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default MenuList;