import { Box, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React from 'react';

const ApprovalDetailInfo = ({category, height, employeeList = []}) => {
  return (
    <Box sx={{ border: "1px solid #ddd", marginTop: "0 !important" }} width="100%" height={height}>
      <Box height="45px" display="flex" alignItems="center" sx={{backgroundColor:"#ddd", paddingLeft: "3%"}}>
        <Typography variant='h5'>{category}</Typography>
      </Box>
      <List component="nav" sx={{width:"100%", maxHeight: '85%', overflowY: 'auto' }}>
        {employeeList?.map((employee, index) => (
          <ListItem key={index}>
            <ListItemText sx={{width:"33%"}}
              primary={
                <Stack direction="row" spacing={0.5}>
                  <Typography
                  variant="body2"
                  sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontWeight:'bold' }}
                >
                  {index+1}.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  {employee.department}
                </Typography>
                </Stack>
              }
            />
            <ListItemText sx={{width:"30%"}}
              primary={
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  {employee.level}
                </Typography>
              }
            />
            <ListItemText sx={{width:"30%"}}
              primary={
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  {employee.name}
                </Typography>
              }
            />
            <ListItemText sx={{width:"20%", marginLeft:"30px"}}
              primary={
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  {employee.status}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ApprovalDetailInfo;