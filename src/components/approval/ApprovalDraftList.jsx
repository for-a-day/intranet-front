import { Box, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React from 'react';

//아이콘
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ApprovalDraftList = ({type, participant = {} ,participants = []}) => {

  return (
    <Box p={2} borderRadius="10px" bgcolor="grey.100">
      <Typography p={2} variant='h4' sx={{fontWeight: 'bold'}}>결재정보</Typography>
      <Box width="330px" p={2}>
        <ListItem sx={{ mb: 2, height: '88px', borderRadius: '10px', bgcolor: type === 'W' ? '#E3F2FD' : '#FFF' }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
            <AssignmentIcon sx={{ color: '#757575' }} />
            <ListItemText
              sx={{ width: "33%" }}
              primary={
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.85rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  {participant.department}
                </Typography>
              }
            />
            <ListItemText
              sx={{ width: "30%" }}
              primary={
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.85rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  {participant.level}
                </Typography>
              }
            />
            <ListItemText
              sx={{ width: "30%" }}
              primary={
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.85rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  {participant.name}
                </Typography>
              }
            />
            <ListItemText
              sx={{ width: "20%", ml: 2 }}
              primary={
                <Typography
                  variant="body2"
                  sx={{ fontSize: '0.85rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  기안
                </Typography>
              }
            />
          </Stack>
        </ListItem>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Box width="100%" height="3px" bgcolor="grey.400" />
        </Box>
        <List component="nav" sx={{width:"100%", maxHeight: '85%', overflowY: 'auto' }}>
          {participants?.map((_participant, index) => (
            <ListItem key={index} sx={{ mb: 2, height: '88px', borderRadius: '10px', bgcolor: type === "D" && _participant.status === "대기" ? '#E0F7FA' : '#FFF'}}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
                {_participant.status === "승인" ?  <CheckCircleIcon sx={{ color: '#FFD700' }} /> : _participant.status === "반려" ? <CancelIcon sx={{ color: '#FF6347' }} /> : <AccountCircleIcon sx={{ color: '#757575' }} />}
                <ListItemText
                  sx={{ width: "33%" }}
                  primary={
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.85rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                    >
                      {_participant.department}
                    </Typography>
                  }
                />
                <ListItemText
                  sx={{ width: "30%" }}
                  primary={
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.85rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                    >
                      {_participant.level}
                    </Typography>
                  }
                />
                <ListItemText
                  sx={{ width: "30%" }}
                  primary={
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.85rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                    >
                      {_participant.name}
                    </Typography>
                  }
                />
                <ListItemText
                  sx={{ width: "20%", ml: 2 }}
                  primary={
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.85rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                    >
                      {_participant.status}
                    </Typography>
                  }
                />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ApprovalDraftList;