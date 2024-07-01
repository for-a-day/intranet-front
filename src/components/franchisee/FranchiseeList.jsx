import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

const FranchiseeList = () => {
        const [franchisee, setFranchisee] = useState([]);
        const [selectedFranchisee, setSelectedFranchisee] = useState(null);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isEditModalOpen, setIsEditModalOpen] = useState(false);
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        const [initialWarningCount, setInitialWarningCount] = useState({ warningCount: 0 });
        const [isWarningReasonVisible, setIsWarningReasonVisible] = useState(false);
        const [isWarningReasonClicked, setIsWarningReasonClicked] = useState(false);
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
        
        const [warnData, setWarnData] = useState({
            warningReason: '',
            franchiseeId: '',
            closingId: null
        });

        // 목록 가져오기
        useEffect(() => {
            const fetchFranchisee = async () => {
                try {
                    const response = await axios.get('http://localhost:9000/app/store');
                    const franchiseeMap = response.data.data;

                    // Convert the Map object to an array
                    const franchiseeArray = Object.values(franchiseeMap);
                    setFranchisee(franchiseeArray);
                } catch (error) {
                    console.error('에러났슴둥', error);
                }
            };
            fetchFranchisee();
        }, []);

        // 화면 기능 - 행 클릭 시,
        const handleRowClick = (franchisee) => {
            console.log('Clicked franchisee:', franchisee);
            setSelectedFranchisee(franchisee);
            setIsModalOpen(true);
        };

        // 삭제 모달 열기
        const handleDeleteModalOpen = () => {
            console.log('삭제 모달 열기');
            setIsDeleteModalOpen(true);
        };

        // 화면 기능 - 모달 창 닫기
        const closeModal = () => {
            setIsModalOpen(false);
            setIsEditModalOpen(false);
            setIsDeleteModalOpen(false);
            setSelectedFranchisee(null);
        };

        // 화면 기능 - 수정 모달 창
        const handleEditModalOpen = () => {
            setIsEditModalOpen(true);
            if (selectedFranchisee) {
                setFormData({
                    franchiseeId: selectedFranchisee.franchiseeId,
                    franchiseeName: selectedFranchisee.franchiseeName,
                    owner: selectedFranchisee.owner,
                    address: selectedFranchisee.address,
                    phoneNumber: selectedFranchisee.phoneNumber,
                    contractDate: selectedFranchisee.contractDate,
                    expirationDate: selectedFranchisee.expirationDate,
                    warningCount: selectedFranchisee.warningCount,
                    employeeId: selectedFranchisee.employeeId.employeeId
                });
            }
        };

        // 화면 기능 - 경고사유 작성 토글
        const handleWarningReasonToggle = () => {
            setIsWarningReasonVisible(!isWarningReasonVisible);
            setIsWarningReasonClicked(true);
        };

        // input요소 변동 시, 반영기능
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            console.log(`Input changed: ${name} - ${value}`);

            setFormData({
                ...formData,
                [name]: value,
        });

        setWarnData({
            ...warnData,
            [name]: value
        });

        // 만료계약일 자동 설정
        if (name === 'contractDate') {
            const contractDate = new Date(value);
            const expirationDate = new Date(contractDate.getFullYear() + 2, contractDate.getMonth(), contractDate.getDate());
                setFormData(prevState => ({
                    ...prevState,
                    expirationDate: expirationDate.toISOString().split('T')[0]
                }));
            }
        };

        // 수정
        const editSubmit = async (e) => {
            console.log('editSubmit 함수가 실행되었습니다.');
            e.preventDefault();

            try {
                const url = `http://localhost:9000/app/store/${selectedFranchisee.franchiseeId}`;
                const response = await axios.put(url, formData);
                closeModal();
                console.log('api 담기 성공', response.data);
            } catch (error) {
                console.log('수정 중 에러 발생', error);
            }
        };

        // string => date 변환
        const formatDateString = (date) => {
            return new Date(date).toISOString().split('T')[0];
        };

        // 삭제 시, 값들 초기화
        useEffect(() => {
            if (selectedFranchisee) {
                setFormData({
                    franchiseeId: selectedFranchisee.franchiseeId,
                    franchiseeName: selectedFranchisee.franchiseeName,
                    employeeId: selectedFranchisee.employeeId,
                    owner: selectedFranchisee.owner,
                    address: selectedFranchisee.address,
                    phoneNumber: selectedFranchisee.phoneNumber,
                    contractDate: selectedFranchisee.contractDate,
                    expirationDate: selectedFranchisee.expirationDate,
                    warningCount: selectedFranchisee.warningCount,
                    warningReason: '',
                    closingReason: ''
                });
            }
        }, [selectedFranchisee]);

        const handleDelete = async () => {
            try {
                const franchisee_id = selectedFranchisee.franchiseeId;
        
                // 폐점 데이터
                const closeData = {
                    closingId: formData.franchiseeId,
                    closingName: formData.franchiseeName,
                    owner: formData.owner,
                    address: formData.address,
                    phoneNumber: formData.phoneNumber,
                    contractDate: formatDateString(formData.contractDate),
                    expirationDate: formatDateString(formData.expirationDate),
                    warningCount: formData.warningCount,
                    closingDate: new Date().toISOString().split('T')[0],
                    employeeId: parseInt(selectedFranchisee.employeeId.employeeId, 10),
                    closingReason: formData.closingReason
                };
                
                console.log('지금 담긴 closeData : ', closeData);        

                // 폐점 API 호출
                const closeResponse = await axios.post(`http://localhost:9000/app/close`, closeData);
                console.log('폐점 API 응답:', closeResponse.data);
        
                // 경고 API 호출 전에 franchisee_id가 경고 테이블에 존재하는지 확인
                const checkWarningExists = await axios.get( `http://localhost:9000/app/warn/exist/${franchisee_id}`);
                const warningExists = checkWarningExists.data.exists;
                
                if(warningExists){

                    // 경고 데이터
                    const warnData = {
                        warningReason: formData.warningReason || '-',
                        franchisee_id: null,
                        closing_id: {
                            closingId: formData.franchiseeId,  
                            closingName: 'Closing Name',
                            owner: formData.owner,
                            address: formData.address,
                            phoneNumber: formData.phoneNumber,
                            contractDate: formatDateString(formData.contractDate),
                            expirationDate: formatDateString(formData.expirationDate),
                            warningCount: formData.warningCount,
                            closingDate: new Date().toISOString().split('T')[0],
                            employeeId: parseInt(selectedFranchisee.employeeId.employeeId, 10),
                            closingReason: formData.closingReason 
                        }
                    };

                    // 경고 API 호출
                    const warnResponse = await axios.put(`http://localhost:9000/app/warn/${franchisee_id}`, warnData);
                    console.log('경고 API 응답:', warnResponse.data);   

                }else{
                    console.log(`franchisee_id ${franchisee_id}에 해당하는 경고가 없습니다. 경고 API 호출을 스킵합니다.`);
                }

        
                // 가맹점 삭제 API 호출
                const franResponse = await axios.delete(`http://localhost:9000/app/store/${franchisee_id}`);
                console.log('삭제 API 응답:', franResponse.data);
        
                alert('모든 작업이 완료되었습니다.');
                closeModal();
        
            } catch (error) {
                console.error('API 요청 중 오류 발생:', error);
        
                if (error.response) {
                    // 서버가 2xx 이외의 상태로 응답했을 때
                    console.log('응답 데이터:', error.response.data);
                    console.log('응답 상태:', error.response.status);
                    console.log('응답 헤더:', error.response.headers);
                } else if (error.request) {
                    // 요청은 성공했지만 응답을 받지 못했을 때
                    console.log('요청 데이터:', error.request);
                } else {
                    // 다른 어떤 오류가 발생했을 때
                    console.log('오류 메시지:', error.message);
                }
            }
        };
        

        // 경고 초기 횟수 값 설정
        useEffect(() => {
            console.log('formData.warningCount', formData.warningCount);

            if (formData.warningCount !== initialWarningCount.warningCount && !isWarningReasonClicked) {
                console.log('변경 : ', formData.warningCount, '기존 : ', initialWarningCount);
            }

            setInitialWarningCount(formData.warningCount);

        }, [formData.warningCount]);

        // 경고 등록
        const warnSubmit = async () => {
            console.log('저장버튼이 눌렸습니다');
            try {
                const url = `http://localhost:9000/app/warn`;
                const data = {
                    warningReason: warnData.warningReason,
                    franchisee_id: { franchiseeId: formData.franchiseeId },
                    closingId: null
                };
                console.log('담긴 데이터 ->', data);
                console.log('담긴 franchiseeId 데이터 ->', data.franchisee_id);
                const response = await axios.post(url, data);
                alert('가맹점 경고사항이 반영되었습니다');
                console.log('api 담기 성공', response.data);
                closeModal(); // 등록 성공 시 모달 닫기
                await editSubmit();
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
            input: {
                width: "100%", 
                marginBottom: "10px",
                height: "10%"
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
            confirmButton: {
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
            delModal :{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                width: '55%',
                maxWidth: '600px', // 최대 너비 설정
                height: '55%',
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
            cancelButton: {
                backgroundColor: '#0080FF',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '20px',
                marginLeft : '15px'
            },
            warnBtn: {
                backgroundColor: '#FF0040',       
                color: 'white',
                padding: '20px 14px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '5px'
            },
            warnInput: {
                width: "84%", 
                marginBottom: "10px",
                height: "10%"
            },
            warnRegister: {
                backgroundColor: '#0080FF',       
                color: 'white',
                padding: '20px 27px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '5px'
            },
            closingOverlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: '-600px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
            }
        };

        return (
            <div style={styles.container}>
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
                                <td style={{
                                    ...styles.td,
                                    color: franchisee.warningCount >= 5 ? 'red' : 'inherit'
                                }}>
                                    {franchisee.franchiseeName}
                                </td>
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
                            <p style={styles.paragraph}>
                                <strong>경고횟수 : </strong>{' '}
                                {selectedFranchisee.warningCount}
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
                            <form onSubmit={editSubmit}>
                                <div style={styles.paragraph}>
                                    <TextField sx={styles.input}
                                        type="text"
                                        name="franchiseeId"
                                        label="가맹점 ID"
                                        value={formData.franchiseeId}
                                        onChange={handleInputChange}
                                        readOnly
                                        required
                                    /></div>
                                <div style={styles.paragraph}>
                                    <TextField 
                                        sx={styles.input}
                                        type="text"
                                        name="franchiseeName"
                                        label="가맹점명"
                                        value={formData.franchiseeName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div style={styles.paragraph}>
                                    <TextField sx={styles.input}
                                        type="text"
                                        name="owner"
                                        label="가맹점 대표"
                                        value={formData.owner}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div style={styles.paragraph}>
                                    <TextField sx={styles.input}
                                        type="text"
                                        name="address"
                                        label="지점주소"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div style={styles.paragraph}>
                                    <TextField sx={styles.input}
                                        type="text"
                                        name="phoneNumber"
                                        label="연락처"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div style={styles.paragraph}>
                                    <TextField  sx={styles.input}
                                        type="date"
                                        name="contractDate"
                                        label="가맹계약일"
                                        value={formData.contractDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div style={styles.paragraph}>
                                    <TextField sx={styles.input}
                                        type="date"
                                        name="expirationDate"
                                        label="만료계약일"
                                        value={formData.expirationDate}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                </div>
                                <div style={styles.paragraph}>
                                    <TextField 
                                        sx={styles.warnInput}
                                        type="number"
                                        name="warningCount"
                                        label="경고횟수"
                                        inputProps={{ min: 0, max: 5 }}
                                        value={formData.warningCount}
                                        onChange={handleInputChange}
                                        required
                                    />
                                <button type="button" style={styles.warnBtn} onClick={handleWarningReasonToggle}>경고사유</button>
                                </div>
                                {isWarningReasonVisible && (
                                    <div style={styles.paragraph}>
                                            <TextField sx={styles.warnInput}
                                                name="warningReason"
                                                value={formData.warningReason}
                                                label="경고사유"
                                                onChange={handleInputChange}
                                                rows="1"
                                            />
                                            <button style={styles.warnRegister} type="submit" onClick={warnSubmit}>저장</button>
                                    </div>
                                )}
                                <div style={styles.paragraph}>
                                    <TextField sx={styles.input}
                                        type="text"
                                        name="employeeId"
                                        label="담당자"
                                        value={formData.employeeId}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div style={styles.paragraph}>
                                    <input sx={styles.input}
                                        type="hidden"
                                        name="employeeId"
                                        label="폐점일자"
                                        value={formData.closingDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <button style={styles.saveButton} onClick={editSubmit} type="submit">저장</button>
                                <button style={styles.delButton} onClick={handleDeleteModalOpen}>삭제</button>
                                {isDeleteModalOpen && (
                                    <>
                                        <div style={styles.closingOverlay} onClick={closeModal}></div>
                                        <div style={styles.delModal}>
                                            <span style={styles.closeButton} onClick={closeModal}>X</span>
                                            <h4>가맹점 폐점 사유를 입력해주세요</h4>
                                            <div style={styles.paragraph}>
                                                    <TextField sx={styles.input}
                                                        type="text"
                                                        name="closingReason"
                                                        label="폐점사유"
                                                        value={formData.closingReason}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            <button style={styles.confirmButton} onClick={handleDelete}>삭제</button>
                                            <button style={styles.cancelButton} onClick={closeModal}>취소</button>                                   
                                        </div>
                                    </>
                                )} 
                            </form>
                        </div>
                    </>
                )}
            </div>
        );
};


export default FranchiseeList;