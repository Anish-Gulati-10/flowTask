import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import TaskDialog from "@/components/TaskDialog";

const DraggableTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskDialog task={task} listeners={listeners} attributes={attributes} />
    </div>
  );
};

export default DraggableTask;
