import React from 'react';
import { ListItem, ListItemText, Typography, IconButton,  Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragblePortal from '../../config/DragblePortal';
import { Draggable } from 'react-beautiful-dnd';


const DraggableList = React.memo(({ id, data, index, onRemove = () => {}  }) => {

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => DragblePortal(provided.draggableProps.style, (<ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            opacity: snapshot.isDragging ? 0.5 : 1,
            backgroundColor: snapshot.isDragging ? '#f0f0f0' : 'white',
          }}
          button
        >
          <ListItemText sx={{width:"33%"}}
            primary={
              <Stack direction="row" spacing={0.5}>
                <Typography
                variant="body2"
                sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
              >
                {index+1}.
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
              >
                {data.department}
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
                {data.level}
              </Typography>
            }
          />
          <ListItemText sx={{width:"30%"}}
            primary={
              <Typography
                variant="body2"
                sx={{ fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
              >
                {data.name}
              </Typography>
            }
          />
          <IconButton edge="end" onClick={() => onRemove(id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItem>
      ))}
  </Draggable>
  );
});

export default DraggableList;