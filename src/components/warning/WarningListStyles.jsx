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
            }
        };

export default styles;