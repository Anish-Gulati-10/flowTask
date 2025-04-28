import { useDroppable } from "@dnd-kit/core";

const DroppableList = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="flex-shrink-0 w-full sm:w-[300px] md:w-[450px] bg-white dark:bg-background shadow-sm rounded-md h-full border border-gray-200 dark:border-gray-700">
      {children}
    </div>
  );
};

export default DroppableList;