import React, { useEffect, useState } from "react";
import axios from "axios";

const WarningList = () => {
        const [warn, setWarn] = useState([]);
        
        useEffect(() => {
            const fetchWarn = async () => {
                try{
                    const response = await axios.get('http://localhost:9000/app/warn');
                    const warnMap = response.data.data;

                    const warnArray = Object.values(warnMap);
                    setWarn(warnArray);
                }catch(error){
                    console.error('폐점 목록 : 에러', error);
                }
            };
            fetchWarn();
        }, []);


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
            }
        };

        return (
            <div style={styles.container}>
                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}></th>
                            <th style={styles.th}>경고사유</th>
                            <th style={styles.th}>폐점명</th>
                            <th style={styles.th}>가맹점명</th>
                        </tr>
                    </thead>
                    <tbody>
                        {warn.map((warn) => (
                            <tr key={warn.warningId}>
                                <td style={styles.td}>{warn.warningId}</td>
                                <td style={styles.td}>{warn.warningReason}</td>
                                <td style={styles.td}>
                                    {warn.closing ? warn.closing.closingName : '-'}
                                </td>
                                <td style={styles.td}>
                                    {warn.franchisee ? warn.franchisee.franchiseeName : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
}

export default WarningList;