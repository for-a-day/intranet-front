import React, { useEffect, useState } from "react";
import axios from "axios";

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
    useEffect(() => {
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
    };

    // 스타일
    const styles = {
        container: {
            margin: '20px auto',
            maxWidth: '1000px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#fff',
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        thead: {
            backgroundColor: '#f2f2f2',
        },
        th: {
            padding: '12px 15px',
            textAlign: 'left',
            border: '1px solid #ddd',
            backgroundColor: '#f4f4f4',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
        },
        td: {
            padding: '12px 15px',
            textAlign: 'left',
            border: '1px solid #ddd',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
        },
        modal: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '30px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '100%',
            animation: 'fadeIn 0.3s ease-out',
        },
        modalContent: {
            marginBottom: '20px',
        },
        modalButtons: {
            textAlign: 'right',
        },
        button: {
            marginLeft: '10px',
            padding: '10px 15px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
        },
        buttonDanger: {
            marginLeft: '10px',
            padding: '10px 15px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
        },
        delButton: {
            marginLeft: '10px',
            padding: '10px 15px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
        },
        buttonClose: {
            marginLeft: '10px',
            padding: '10px 15px',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease-out',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
        },
        label: {
            fontWeight: 'bold',
            marginBottom: '5px',
            display: 'block',
        }
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

    return (
        <div style={styles.container}>
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
                    {menu.map((menu) => (
                        <tr key={menu.menuId} onClick={() => handleOpenModal(menu)}>
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
            {selectedMenu && showModal && (
                <>
                    <div style={styles.overlay} onClick={handleCloseModal}></div>
                    <div style={styles.modal}>
                        <div style={styles.modalContent}>
                            <div><strong>메뉴ID:</strong> {selectedMenu.menu_id}</div>
                            <div><strong>메뉴명:</strong> {selectedMenu.menu_name}</div>
                            <div><strong>판매가격:</strong> {selectedMenu.menu_price}</div>
                            <div><strong>레시피:</strong> {selectedMenu.menu_recipe}</div>
                            <div><strong>총 원가:</strong> {selectedMenu.menu_origin_price}</div>
                            <div><strong>판매여부:</strong> {selectedMenu.menu_end === 1 ? '판매' : '미판매'}</div>
                        </div>
                        <div style={styles.modalButtons}>
                            <button style={styles.delButton} onClick={handleDeleteMenu}>삭제</button>
                            <button style={styles.button} onClick={() => handleOpenEditModal(selectedMenu)}>수정</button>
                            <button style={styles.button} onClick={handleCloseModal}>닫기</button>
                        </div>
                    </div>
                </>
            )}
            {selectedMenu && showEditModal && (
                <>
                    <div style={styles.overlay} onClick={handleCloseEditModal}></div>
                    <div style={styles.modal}>
                        <div style={styles.modalContent}>
                            <div>
                                <label>메뉴ID:</label>
                                <input
                                    type="text"
                                    name="menu_id"
                                    value={formData.menu_id}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                            <div>
                                <label>메뉴명:</label>
                                <input
                                    type="text"
                                    name="menu_name"
                                    value={formData.menu_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>판매가격:</label>
                                <input
                                    type="number"
                                    name="menu_price"
                                    value={formData.menu_price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>레시피:</label>
                                <input
                                    type="text"
                                    name="menu_recipe"
                                    value={formData.menu_recipe}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>총 원가:</label>
                                <input
                                    type="number"
                                    name="menu_origin_price"
                                    value={formData.menu_origin_price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>판매여부:</label>
                                <select
                                    name="menu_end"
                                    value={formData.menu_end}
                                    onChange={handleChange}
                                >
                                    <option value={1}>판매</option>
                                    <option value={0}>미판매</option>
                                </select>
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
