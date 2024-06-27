import React, { useEffect, useState } from "react";
import axios from "axios";

const FranchiseeList = () => {
    const [franchisee, setFranchisee] = useState([]);
    const [selectedFranchisee, setSelectedFranchisee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        franchiseeName: '',
        owner: '',
        address: '',
        phoneNumber: '',
        contractDate: '',
        expirationDate: '',
        warningCount: '',
    });

    useEffect(() => {
        const fetchFranchisee = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:9000/app/store'
                );
                setFranchisee(response.data);
            } catch (error) {
                console.error('에러났슴둥', error);
            }
        };
        fetchFranchisee();
    },[]);

    const handleRowClick = (franchisee) => {
        setSelectedFranchisee(franchisee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedFranchisee(null);
    };

    const handleEditModalOpen = () => {
        setIsEditModalOpen(true);
        setFormData({
            franchiseeName: selectedFranchisee.franchiseeName,
            owner: selectedFranchisee.owner,
            address: selectedFranchisee.address,
            phoneNumber: selectedFranchisee.phoneNumber,
            contractDate: selectedFranchisee.contractDate,
            expirationDate: selectedFranchisee.expirationDate,
            warningCount: selectedFranchisee.warningCount,
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send formData to server for update
        // Implement API call here
        // After successful update, close edit modal and update franchisee list if necessary
        closeModal();
    };

    const styles = {
        container: {
            margin: '20px auto',
            maxWidth: '1000px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '24px',
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
        tr: {
            nthChildEven: {
                backgroundColor: '#f9f9f9',
            },
            hover: {
                backgroundColor: '#f1f1f1',
            },
        },
        editButton: {
            backgroundColor: '#0080FF',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
        },
        register: {
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px', 
        },     
        saveButton: {
            backgroundColor: '#0080FF',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
        },
        delButton: {
            backgroundColor: '#FF0040',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
            marginLeft: '10px'
        },
        modal: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            width: '40%',
            maxWidth: '600px', // 최대 너비 설정
            height: '45%',
            maxHeight: '80vh', // 최대 높이 설정
            overflow: 'auto',
        },
        paragraph: {
            margin: '20px', 
            marginLeft: '10px'
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
        },
        closeButton: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>가맹점 목록</h1>
            <button style={styles.register}>등록</button>
            <table style={styles.table}>
                <thead style={styles.thead}>
                    <tr>
                        <th style={styles.th}>가맹점 아이디</th>
                        <th style={styles.th}>담당자</th>
                        <th style={styles.th}>가맹점명</th>
                        <th style={styles.th}>대표자명</th>
                        <th style={styles.th}>지점주소</th>
                        <th style={styles.th}>연락처</th>
                    </tr>
                </thead>
                <tbody>
                    {franchisee.map(franchisee => (
                        <tr
                            key={franchisee.franchiseeId}
                            style={franchisee.franchiseeId % 2 === 0 ? styles.tr.nthChildEven : null}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = styles.tr.hover.backgroundColor}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = franchisee.franchiseeId % 2 === 0 ? styles.tr.nthChildEven.backgroundColor : ''}
                            onClick={() => handleRowClick(franchisee)}
                        >
                            <td style={styles.td}>{franchisee.franchiseeId}</td>
                            <td style={styles.td}>{franchisee.employeeId.name}</td>
                            <td style={styles.td}>{franchisee.franchiseeName}</td>
                            <td style={styles.td}>{franchisee.owner}</td>
                            <td style={styles.td}>{franchisee.address}</td>
                            <td style={styles.td}>{franchisee.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <>
                    <div style={styles.overlay} onClick={closeModal}></div>
                    <div style={styles.modal}>
                        <span style={styles.closeButton} onClick={closeModal}>
                            X
                        </span>
                        <h2>가맹점 상세 정보</h2>
                        <p style={styles.paragraph}>
                            <strong>가맹점 아이디 : </strong>{' '}
                            {selectedFranchisee.franchiseeId}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>사원 이름 : </strong>{' '}
                            {selectedFranchisee.employeeId.name}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>가맹점명 : </strong>{' '}
                            {selectedFranchisee.franchiseeName}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>대표자명 : </strong>{' '}
                            {selectedFranchisee.owner}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>지점주소 : </strong>{' '}
                            {selectedFranchisee.address}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>연락처 : </strong>{' '}
                            {selectedFranchisee.phoneNumber}
                        </p>
                        <button style={styles.editButton} onClick={handleEditModalOpen}>
                            수정하기
                        </button>
                    </div>
                </>
            )}
            {isEditModalOpen && (
                <>
                    <div style={styles.overlay} onClick={closeModal}></div>
                    <div style={styles.modal}>
                        <span style={styles.closeButton} onClick={closeModal}>
                            X
                        </span>
                        <h2>가맹점 수정</h2>
                        <form onSubmit={handleSubmit}>
                            <p style={styles.paragraph}><label>
                                가맹점명:
                                <input
                                    type="text"
                                    name="franchiseeName"
                                    value={formData.franchiseeName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                대표자명:
                                <input
                                    type="text"
                                    name="owner"
                                    value={formData.owner}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                지점주소:
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                연락처:
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                가맹계약일:
                                <input
                                    type="date"
                                    name="contractDate"
                                    value={formData.contractDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                만료계약일 : 
                                <input
                                    type="date"
                                    name="expirationDate"
                                    value={formData.expirationDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                경고횟수 : 
                                <input
                                    type="text"
                                    name="warningCount"
                                    value={formData.warningCount}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <button style={styles.saveButton} type="submit">저장</button>
                            <button style={styles.delButton}>삭제</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default FranchiseeList;