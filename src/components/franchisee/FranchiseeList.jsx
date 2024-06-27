import React, { useEffect, useState } from "react";
import axios from "axios";

const FranchiseeList = () => {
    const [franchisee, setFranchisee] = useState([]);
    useEffect(() => {
        const address = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:9000/app/store'
                );
                setFranchisee(response.data);
            } catch (error) {
                console.error('에러났슴둥', error);
            }
        };
        address();
    },[]);

    return (
        <div>
            <h1>가맹점 목록</h1>
            <table>
                <thead>
                    <tr>
                        <th>가맹점 아이디</th>
                        <th>사원 이름</th>
                        <th>가맹점명</th>
                        <th>대표자명</th>
                        <th>지점주소</th>
                        <th>연락처</th>
                        <th>가맹계약일</th>
                        <th>만료계약일</th>
                        <th>경고횟수</th>
                    </tr>
                </thead>
                <tbody>
                    {franchisee.map(franchisee => (
                        <tr key={franchisee.franchiseeId}>
                            <td>{franchisee.franchiseeId}</td>
                            <td>{franchisee.employeeId.employeeId}</td>
                            <td>{franchisee.employeeId.name}</td>
                            <td>{franchisee.franchiseeName}</td>
                            <td>{franchisee.owner}</td>
                            <td>{franchisee.address}</td>
                            <td>{franchisee.phoneNumber}</td>
                            <td>{franchisee.contractDate}</td>
                            <td>{franchisee.expirationDate}</td>
                            <td>{franchisee.warningCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}; 

export default FranchiseeList;