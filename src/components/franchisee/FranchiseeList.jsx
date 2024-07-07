import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, TextField, Table, TableHead, TableRow, TableCell, Typography, TableBody, Grid, Button, IconButton } from "@mui/material";
import styles from "./FranchiseeListStyle";
import { Close as CloseIcon } from "@mui/icons-material";

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
            closing_id: null
        });

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

        // 목록 가져오기
        useEffect(() => {
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
                fetchFranchisee();
                console.log('api 담기 성공', response.data);
                //alert("수정이 완료되었습니다!");
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
                    employeeId: parseInt(formData.employeeId, 10),
                    closingReason: formData.closingReason
                };
                
                console.log('지금 담긴 closeData : ', closeData);        

                // 폐점 API 호출
                const closeResponse = await axios.post(`http://localhost:9000/app/close`, closeData);
                console.log('폐점 API 응답:', closeResponse.data);
            
                // 경고 API 호출 전에 franchisee_id가 경고 테이블에 존재하는지 확인
                const checkWarningExists = await axios.get( `http://localhost:9000/app/warn/exist/${franchisee_id}`);
                console.log(checkWarningExists);
                const warningExists = checkWarningExists.data;
                console.log('존재하는가? ', warningExists);
                
                if(warningExists){

                    // 경고 데이터
                    const warnData = {
                        warningReason: formData.warningReason || '-',
                        franchisee_id: null,
                        closing_id: formData.franchiseeId
                    };

                    console.log('경고 API :', warnData); 

                    // 경고 API 호출
                    const warnResponse = await axios.put(`http://localhost:9000/app/warn/${franchisee_id}`, warnData);
                    console.log('경고 DB 확인', warnResponse.data);
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
            fetchFranchisee();
        };
        

        // 경고 초기 횟수 값 설정
        useEffect(() => {
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
                    franchisee_id: formData.franchiseeId,
                    closing_id: null
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

        return (
            <Box sx={{width:'95%', mx:'auto', mt:4}}>
                 <Table
                    aria-label="simple table"
                    sx={{
                    whiteSpace: "nowrap",
                    }}
                >
                    <TableHead sx={{borderBottom:'2px solid #d1cfcf'}}>
                    <TableRow>
                        <TableCell>
                        <Typography color="textSecondary" variant="h6" align="center">
                            가맹점 아이디
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography color="textSecondary" variant="h6" align="center">
                            담당자
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
                            지점주소
                        </Typography>   
                        </TableCell>
                        <TableCell>
                        <Typography color="textSecondary" variant="h6" align="center">
                            연락처
                        </Typography>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {franchisee.map(franchisee => (
                            <TableRow
                                key={franchisee.franchiseeId}
                                style={franchisee.franchiseeId % 2 === 0 ? styles.tr.nthChildEven : null}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = styles.tr.hover.backgroundColor}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = franchisee.franchiseeId % 2 === 0 ? styles.tr.nthChildEven.backgroundColor : ''}
                                onClick={() => handleRowClick(franchisee)} 
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { backgroundColor: "#f5f5f5" },
                                }}
                            >
                                 <TableCell>
                                 <Typography variant="h6" align="center">
                                    {franchisee.franchiseeId}
                                </Typography>
                                </TableCell>
                                <TableCell>
                                <Typography variant="h6" align="center">
                                    {franchisee.employeeId.name}
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                    color: franchisee.warningCount >= 5 ? "red" : "inherit",
                                    }}
                                >
                                    <Typography variant="h6" align="center">
                                    {franchisee.franchiseeName}
                                </Typography>
                                </TableCell>
                                <TableCell>
                                <Typography variant="h6" align="center">
                                    {franchisee.owner}
                                </Typography>
                                </TableCell>
                                <TableCell>
                                <Typography variant="h6" align="center">
                                    {franchisee.address}
                                </Typography>
                                </TableCell>
                                <TableCell>
                                <Typography variant="h6" align="center">
                                    {franchisee.phoneNumber}
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

                        <IconButton
                            sx={{ position: "absolute", top: 10, right: 10 }}
                            onClick={closeModal}
                        >
                            <CloseIcon />
                        </IconButton>
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
                        <div style={styles.modalEdit}>
                        <IconButton
                            sx={{ position: "absolute", top: 10, right: 10 }}
                            onClick={closeModal}
                        >
                            <CloseIcon />
                        </IconButton>
                            <h2>가맹점 수정</h2>
                            <hr style={{marginBottom:'25px'}}></hr>
                            <form onSubmit={editSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField sx={styles.input}
                                        type="text"
                                        name="franchiseeId"
                                        label="가맹점 ID"
                                        value={formData.franchiseeId}
                                        onChange={handleInputChange}
                                        readOnly
                                        required
                                    /></Grid>
                                <Grid item xs={6}>
                                    <TextField 
                                        sx={styles.input}
                                        type="text"
                                        name="franchiseeName"
                                        label="가맹점명"
                                        value={formData.franchiseeName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField sx={styles.input}
                                        type="text"
                                        name="owner"
                                        label="가맹점 대표"
                                        value={formData.owner}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField sx={styles.input}
                                        type="text"
                                        name="address"
                                        label="지점주소"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField sx={styles.input}
                                        type="text"
                                        name="phoneNumber"
                                        label="연락처"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField  sx={styles.input}
                                        type="date"
                                        name="contractDate"
                                        label="가맹계약일"
                                        value={formData.contractDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField sx={styles.input}
                                        type="date"
                                        name="expirationDate"
                                        label="만료계약일"
                                        value={formData.expirationDate}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={6}>
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
                                </Grid>
                                    <Grid item xs={3}>
                                <button type="button" style={styles.warnBtn} onClick={handleWarningReasonToggle}>경고사유</button>
                                </Grid>
                                {isWarningReasonVisible && (
                                    <><Grid item xs={10}>
                                            <TextField sx={styles.warnInput}
                                                name="warningReason"
                                                value={formData.warningReason}
                                                label="경고사유"
                                                onChange={handleInputChange}
                                                rows="1" />
                                        </Grid><Grid item xs={2}>
                                                <button style={styles.warnRegister} type="submit" onClick={warnSubmit}>저장</button>
                                            </Grid></>
                                )}
                                <Grid item xs={12}>
                                    <TextField sx={styles.input}
                                        type="text"
                                        name="employeeId"
                                        label="담당자"
                                        value={formData.employeeId}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <input sx={styles.input}
                                        type="hidden"
                                        name="employeeId"
                                        label="폐점일자"
                                        value={formData.closingDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={editSubmit}
                                    type="submit"
                                    sx={{ marginRight: 2 }}
                                    >
                                    저장
                                    </Button>
                                    <Button
                                    variant="contained"
                                    onClick={handleDeleteModalOpen}
                                    sx={{backgroundColor:'#FF0040'}}
                                    >
                                    삭제
                                    </Button>
                                    </Box>
                                {isDeleteModalOpen && (
                                    <>
                                        <div style={styles.closingOverlay} onClick={closeModal}></div>
                                        <div style={styles.delModal}>
                                        <IconButton
                                            sx={{ position: "absolute", top: 10, right: 10 }}
                                            onClick={closeModal}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                            <h4>가맹점 폐점 사유를 입력해주세요</h4>
                                            <Grid item xs={12}>
                                                    <TextField sx={styles.input}
                                                        type="text"
                                                        name="closingReason"
                                                        label="폐점사유"
                                                        value={formData.closingReason}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </Grid>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={handleDelete}
                                                    sx={{ marginRight: 1, backgroundColor:'#FF0040' }}
                                                    >
                                                    삭제
                                                    </Button>
                                                    <Button
                                                    variant="contained"
                                                    onClick={closeModal}
                                                    sx={{ backgroundColor: '#6c757d', color: '#fff' }}
                                                    >
                                                    취소
                                                    </Button>              
                                                    </Box>                                               
                                        </div>
                                    </>
                                )} 
                                </Grid>
                            </form>
                        </div>
                    </>
                )}
            </Box>
        );
};


export default FranchiseeList;