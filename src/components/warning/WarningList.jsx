import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./WarningListStyles";

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