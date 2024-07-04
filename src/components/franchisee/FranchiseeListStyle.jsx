import React from 'react';
import { MenuItem, TextField } from '@mui/material';

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

export default styles;