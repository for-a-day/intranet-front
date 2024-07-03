import { createPortal } from "react-dom";

const DragblePortal = (style, element) => {
  const dragEl = document.getElementById('draggable');
  if (style?.position === 'fixed') {
    return createPortal(element, dragEl);
  }
  return element;
};

export default DragblePortal;