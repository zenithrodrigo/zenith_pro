import React, {useEffect} from "react";
import useDraggableAndResizable from "./useDraggableAndResizable";
import "./drag-and-resize.css";

export default function DragAndResize({ children, handleSave }) {
  const [ref, offsets, size] = useDraggableAndResizable();
  
  useEffect(() => {
    handleSave(offsets, size)
  }, [handleSave, offsets, size]);

  return (
    <div className="draggable resizable" ref={ref}>
      <div className="resizer resizer--r" />
      <div className="resizer resizer--b" />
      {children}
    </div>
  );
}
