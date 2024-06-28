import React, { useEffect, useState } from "react";
import axios from "axios";

const FranchiseeList = () => {
    const [franchisee, setFranchisee] = useState([]);
    const [selectedFranchisee, setSelectedFranchisee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isWarningReasonVisible, setIsWarningReasonVisible] = useState(false);
    const [formData, setFormData] = useState({
        franchiseeId: '',
        franchiseeName: '',
        employeeId: '',
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

    // 화면 기능 - 행 클릭 시,
    const handleRowClick = (franchisee) => {
        setSelectedFranchisee(franchisee);
        setIsModalOpen(true);
    };
    // 화면 기능 - 모달 창 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
        setIsRegisterOpen(false);
        setSelectedFranchisee(null);
    };
    // 화면 기능 - 수정 모달 창 닫기
    const handleEditModalOpen = () => {
        setIsEditModalOpen(true);
        setFormData({
            franchiseeId:selectedFranchisee.franchiseeId,
            franchiseeName: selectedFranchisee.franchiseeName,
            owner: selectedFranchisee.owner,
            address: selectedFranchisee.address,
            phoneNumber: selectedFranchisee.phoneNumber,
            contractDate: selectedFranchisee.contractDate,
            expirationDate: selectedFranchisee.expirationDate,
            warningCount: selectedFranchisee.warningCount,
            employeeId:selectedFranchisee.employeeId.employeeId
        });
    }
    // 화면 기능 - 등록 모달 창 닫기
    const handleRegisterModalOpen = () => {
        setIsRegisterOpen(true);
        setFormData({
            franchiseeId: '',
            franchiseeName: '',
            employeeId: '',
            owner: '',
            address: '',
            phoneNumber: '',
            contractDate: '',
            expirationDate: '',
            warningCount: 0
        });
    }
    // 화면 기능 - 경고사유 작성 토글
    const handleWarningReasonToggle = () => {
        setIsWarningReasonVisible(!isWarningReasonVisible);
    };
    // input요소 및 만료 계약일 생성
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // 만료계약일 자동 설정
        if(name === 'contractDate'){
            const contractDate = new Date(value);
            const expirationDate = new Date(contractDate.getFullYear() + 2
                                            , contractDate.getMonth(), contractDate.getDate());
            setFormData(prevState => ({
                ...prevState,
                expirationDate: expirationDate.toISOString().split('T')[0]
            }));
        }
    };
    // 수정
    const handleSubmit = async (e) => {
        console.log('handleSubmit 함수가 실행되었습니다.');
        try {
            const url = `http://localhost:9000/app/store/${selectedFranchisee.franchiseeId}`;
            const response = await axios.put(url, formData);
            alert('가맹점 정보가 성공적으로 수정되었습니다!');
            //closeModal();
            console.log('api 담기 성공', response.data);
        } catch (error) {
            console.log('수정 중 에러 발생', error);
        }
    };
    // 삭제
    const handleDelete = async () => {
        if(!window.confirm('운영하지 않는 가맹점이 맞습니까?')) return;

        try {
            await axios.post(`http://localhost:9000/app/store/${selectedFranchisee.franchiseeId}`, formData);
            alert('해당 가맹점은 폐점 목록에서 확인하세요.');
            closeModal();
            console.log('삭제 api 생성 완료');
        } catch (error) {
            console.log('삭제 진행 중 오류 발생', error);
        }
    };
    //등록
    const handleRegister = async () => {
        console.log('등록버튼이 눌렸습니다');
        try {
            const url = `http://localhost:9000/app/store`;
            const response = await axios.post(url, formData);
            alert('새로운 가맹점 등록을 축하드립니다!');
            console.log('api 담기 성공', response.data);
            closeModal(); // 등록 성공 시 모달 닫기
        } catch (error) {
            console.log('등록 중 에러 발생', error);
        }
    }; 
    
    // 스타일
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
        },
        warnBtn: {
            backgroundColor: '#FF0040',
            color: 'white',
            padding: '4px 8px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '5px'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>가맹점 목록</h1>
            <button style={styles.register} onClick={handleRegisterModalOpen}>등록</button>
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
                            <strong>담당자 : </strong>{' '}
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
                        <p style={styles.paragraph}>
                            <strong>계약일 : </strong>{' '}
                            {selectedFranchisee.contractDate}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>계약만료일 : </strong>{' '}
                            {selectedFranchisee.expirationDate}
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
                                가맹점 ID: {'  '}
                                <input
                                    type="text"
                                    name="franchiseeId"
                                    value={formData.franchiseeId}
                                    onChange={handleInputChange}
                                    readOnly
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                가맹점명: {'  '}
                                <input
                                    type="text"
                                    name="franchiseeName"
                                    value={formData.franchiseeName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                대표자명: {' '}
                                <input
                                    type="text"
                                    name="owner"
                                    value={formData.owner}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                지점주소: {' '}
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                연락처: {' '}
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                가맹계약일: {' '}
                                <input 
                                    type="date"
                                    name="contractDate"
                                    value={formData.contractDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                만료계약일 :  {' '}
                                <input
                                    type="date"
                                    name="expirationDate"
                                    value={formData.expirationDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                경고횟수 :  {' '}
                                <input
                                    type="number"
                                    name="warningCount"
                                    value={formData.warningCount}
                                    onChange={handleInputChange}
                                    required
                                />
                            <button type="button" style={styles.warnBtn} onClick={handleWarningReasonToggle}>경고사유</button>
                            </label>
                            </p>
                            {isWarningReasonVisible && (
                                <p style={styles.paragraph}>
                                    <label>
                                        경고사유: {' '}
                                        <textarea
                                            name="warningReason"
                                            value={formData.warningReason}
                                            onChange={handleInputChange}
                                            rows="1"
                                            required
                                        ></textarea>
                                    </label>
                                </p>
                            )}
                            <p style={styles.paragraph}><label>
                                담당자 : {' '}
                                <input
                                    type="text"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <button style={styles.saveButton} onClick={handleSubmit}>저장</button>
                            <button style={styles.delButton} onClick={handleDelete}>삭제</button>
                        </form>
                    </div>
                </>
            )}
            {isRegisterOpen && (
                    <>
                        <div style={styles.overlay} onClick={closeModal}></div>
                        <div style={styles.modal}>
                            <span style={styles.closeButton} onClick={closeModal}>
                                X
                            </span>
                            <h2>가맹점 등록</h2>
                            <form onSubmit={handleSubmit}>
                            <p style={styles.paragraph}><label>
                                가맹점 ID: {'  '}
                                <input
                                    type="text"
                                    name="franchiseeId"
                                    value={formData.franchiseeId}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                가맹점명: {'  '}
                                <input
                                    type="text"
                                    name="franchiseeName"
                                    value={formData.franchiseeName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                대표자명: {' '}
                                <input
                                    type="text"
                                    name="owner"
                                    value={formData.owner}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                지점주소: {' '}
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                연락처: {' '}
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                가맹계약일: {' '}
                                <input 
                                    type="date"
                                    name="contractDate"
                                    value={formData.contractDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                만료계약일 :  {' '}
                                <input
                                    type="date"
                                    name="expirationDate"
                                    value={formData.expirationDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                경고횟수 :  {' '}
                                <input
                                    type="hidden"
                                    name="warningCount"
                                    value={formData.warningCount}
                                    onChange={handleInputChange}
                                    required
                                    readOnly
                                />
                            </label></p>
                            <p style={styles.paragraph}><label>
                                담당자 : {' '}
                                <input
                                    type="text"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label></p>
                                <button onClick={handleRegister} style={styles.saveButton}>등록</button>
                            </form>
                        </div>
                    </>
                )}
        </div>
    );
};


export default FranchiseeList;