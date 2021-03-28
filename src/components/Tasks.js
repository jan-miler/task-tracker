import Task from "./Task";

const Tasks = ({ tasks, onDelete, toggleReminder }) => {
  return (
    <>
      {tasks.map(task => (
        <Task
          task={task}
          key={task.id}
          onDelete={onDelete}
          toggleReminder={toggleReminder}
        />
      ))}
    </>
  );
};

export default Tasks;
