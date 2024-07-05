import React from 'react';
import { MenuItem, TextField, styled } from '@mui/material';

    // 스타일
      export const styles = {
        register: {
          backgroundColor: '#007BFF',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginLeft: '10px',
        },
        modal: {
          width: "60%",
          minWidth: "300px",
          margin: "auto",
        },
        formControl: {
          width: "100%",
        },
      };

      export const RedDot = styled('div')({
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'red',
        display: 'inline-block',
      });
      
      export const GreenDot = styled('div')({
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'green',
        display: 'inline-block'
      });