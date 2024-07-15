import React from 'react';
import { Box, List, Typography } from '@mui/material';
import DraggableList from './DraggableList';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


const ApprovalInfoModal = ({ data, moveFormItem, onRemove }) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    moveFormItem(result.source.index, result.destination.index);
  };

  return (
    <Box sx={{ border: "1px solid #ddd" }} width={340} height={360}>
      <Box height="15%" display="flex" alignItems="center" sx={{backgroundColor:"#ddd", paddingLeft: "3%"}}>
        <Typography variant='h5'>결재자</Typography>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <List component="nav" {...provided.droppableProps} ref={provided.innerRef} sx={{width:"100%", maxHeight: '85%', overflowY: 'auto' }}>
              {data.map((form, index) => (
                <DraggableList key={form.employeeId} id={form.employeeId} data={form} index={index} onRemove={onRemove} />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default ApprovalInfoModal;
