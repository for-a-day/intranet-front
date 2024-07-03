import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ClosingListStyle";

const ClosingList = () => {
        const [close, setClose] = useState([]);
        const [selectedClose, setSelectedClose] = useState(null);
        const [isModalOpen, setIsModalOpen] = useState(false);
        
        useEffect(() => {
            const fetchClose = async () => {
                try{
                    const response = await axios.get('http://localhost:9000/app/close');
                    const closeMap = response.data.data;

                    const closeArray = Object.values(closeMap);
                    setClose(closeArray);
                }catch(error){
                    console.error('폐점 목록 : 에러', error);
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
            <div style={styles.container}>
                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>폐점 아이디</th>
                            <th style={styles.th}>가맹점명</th>
                            <th style={styles.th}>대표자명</th>
                            <th style={styles.th}>주소</th>
                            <th style={styles.th}>계약일</th>
                            <th style={styles.th}>계약 만료일</th>
                            <th style={styles.th}>폐점일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {close.map((close) => (
                            <tr key={close.closingId}
                                style={close.closingId % 2 === 0 ? styles.tr.nthChildEven : null}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = styles.tr.hover.backgroundColor}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = close.closingId % 2 === 0 ? styles.tr.nthChildEven.backgroundColor : ''}
                                onClick={() => handleRowClick(close)}
                            >
                                <td style={styles.td}>{close.closingId}</td>
                                <td style={styles.td}>{close.closingName}</td>
                                <td style={styles.td}>{close.owner}</td>
                                <td style={styles.td}>{close.address}</td>
                                <td style={styles.td}>{close.contractDate}</td>
                                <td style={styles.td}>{close.expirationDate}</td>
                                <td style={styles.td}>{close.closingDate}</td>
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
                            {selectedClose.closingId}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>담당자 : </strong>{' '}
                            {selectedClose.employeeId}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>가맹점명 : </strong>{' '}
                            {selectedClose.closingName}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>대표자명 : </strong>{' '}
                            {selectedClose.owner}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>지점주소 : </strong>{' '}
                            {selectedClose.address}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>연락처 : </strong>{' '}
                            {selectedClose.phoneNumber}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>계약일 : </strong>{' '}
                            {selectedClose.contractDate}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>계약만료일 : </strong>{' '}
                            {selectedClose.expirationDate}
                        </p>
                        <p style={styles.paragraph}>
                            <strong>폐점사유 : </strong>{' '}
                            {selectedClose.closingReason}
                        </p>
                    </div>
                </>
            )}
            </div>
        );
}

export default ClosingList;