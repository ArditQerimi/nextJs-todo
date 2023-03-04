import React, {useState, useEffect, useRef} from "react";
import {tasks} from "@/pages/api/tasks";
import styled from 'styled-components';
import {FaCheck} from "react-icons/Fa";
import {MdDeleteOutline} from "react-icons/Md";
import Modal from "@/components/Modal";
import {BsPlusCircle} from "react-icons/Bs";

const Container = styled.div`
  display: flex;
  justify-content: center;

`


const ContentContainer = styled.div`
  width: 89%;
`;


const TaskListContainer = styled.div`
  margin: 2rem;
  padding: 2rem;
  border: 1px solid #ccc;
`;

const TaskListHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  outline: none;
  width: 1039px;
  left: 80px;
  top: 50px;
  border-radius: 8px;
  padding: 16px 28px 16px 28px;
  background: #FFFFFF;
  border: 1px solid #D0D5DD;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  font-family: 'Montserrat',serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  ::placeholder {
    font-family: 'Montserrat',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #344054;
    opacity: 0.5;
  }
  

`;


interface ButtonProps {
    background?:any;
    borderColor?:any;
    height?:any;
    width?:any;
}
const Button = styled.button<ButtonProps>`
  font-family: 'Montserrat',serif;
  font-style: normal;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color:  ${props => props.color ?? "#fff"};
  background-color: ${props => props.background ?? "#fff"};
  border: 1px solid ${props => props.borderColor ?? props.background};
  cursor: pointer;
  height: ${props=>props.height ? props.height : '60px'};
  width: ${props=>props.width ? props.width : '220px'};
  left: 1134px;
  top: 50px;
  border-radius: 8px;
  padding: 16px 28px 16px 28px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  position:relative;
  min-height: 500px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 0.5rem;
`;

interface TaskNameProps {
    completed?: boolean;
}
const TaskName = styled.div<TaskNameProps>`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 14px;
  border: 1px solid #D0D5DD;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  padding: 16px 28px;
  width: 956px;
  background: ${props => props.completed ? '#ECFDF3' : '#fff'};


`;
interface StatusProps {
    completed?: boolean;
}
const Status = styled.div<StatusProps>`
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid ${props => props.completed ? '#12B76A' : '#344054'};
  color: ${props => props.completed ? '#12B76A' : '#344054'};
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: ${({ color }) => color};
  color: #fff;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

function TaskList() {
    const [todoTasks, setTodoTasks] = useState<any>(tasks);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [taskForEdit, setTaskForEdit] = useState<any>(null);
    const [deleteIndex, setDeleteIndex] = useState<any>(null);
    const [task, setTask] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState(todoTasks);
    const [filterType, setFilterType] = useState('all');



    const handleDelete = (index:number) => {
        setDeleteIndex(index)
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = (index:number) => {
        deleteTask(index)
        setIsModalOpen(false);
    };

    useEffect(() => {
        setTodoTasks(tasks);
    }, []);


    useEffect(()=>{
        setFilteredTasks(todoTasks)
    },[todoTasks])


    const deleteTask = (index: number) => {
        const newTodoTasks = todoTasks.filter((todo: any, i: number) => index !== i);
        setTodoTasks(newTodoTasks);
    };

    const editTask = (task: any, index: number) => {
        setTask(task.name);
        setIsEditing(true);
        let newTodoTasks = [...todoTasks];
        setTaskForEdit(newTodoTasks[index]);
    };

    const handleChange = (e: any) => {
        setTask(e.target.value);
    };

    const addTask = () => {
        if (!isEditing) {
            const newTask = {
                name: task,
                id: Math.random(),
                completed: false,
            };
            setTask('');
            setTodoTasks([...todoTasks, newTask]);
        } else if (isEditing) {
            const foundedIndex = todoTasks.findIndex((todo:any) => todo.id == taskForEdit.id);
            let newTodoTasks = [...todoTasks];
            newTodoTasks[foundedIndex].name = task;
            setTodoTasks(newTodoTasks);
            setTask('');
            setIsEditing(false)

        }
    };

    const markAsCompleted = (index: number) => {
        let newTodoTasks = [...todoTasks];
        newTodoTasks[index].completed = !newTodoTasks[index].completed;
        setTodoTasks(newTodoTasks);
    };


    const allTasks = (type:string) => {
        setFilterType(type)
        setFilteredTasks(todoTasks)
    }

    const completedTasks = (type:string) => {
        setFilterType(type)
        setFilteredTasks(todoTasks.filter((todo: any) => todo.completed));
    };

    const inCompletedTasks = (type:string) => {
        setFilterType(type)
        setFilteredTasks(todoTasks.filter((todo: any) => !todo.completed));

    };


    const inputRef = useRef(null);

    const handleFocus = () => {
        // @ts-ignore
        inputRef?.current.focus();
    };


    return (

            <Container>
                <ContentContainer>

              <div style={{width: "100%", display:"flex", gap: 15}}>

                <Input value={task} ref={inputRef} onChange={handleChange} style={{width:"81%"}} placeholder="Write your task here..."/>
                <Button onClick={addTask} color={'#fff'} background={'#12B76A'}>
                    {isEditing ? "Edit Done" : "Create"}
                </Button>
              </div>
                <div style={{display:"flex", gap: 15, marginTop:10}}>


                    <Button      color={'#000'}
                                 borderColor={'#D0D5DD'}
                                 background={filterType === 'all' ? '#F2F4F7' : '#fff'}
                                 height={"50px"}
                    onClick={()=>allTasks('all')}
                    >
                        All
                    </Button>
                    <Button      color={'#000'}
                                 borderColor={'#D0D5DD'}
                                 background={filterType === 'completed' ? '#F2F4F7' : '#fff'}
                                 onClick={()=>completedTasks('completed')}
                                 height={"50px"}



                    >
                        Completed
                    </Button>
                    <Button      color={'#000'}
                                 borderColor={'#D0D5DD'}
                                 background={filterType === 'incompleted' ? '#F2F4F7' : '#fff'}
                                 onClick={()=>inCompletedTasks('incompleted')}
                                 height={"50px"}

                    >
                        Incompleted
                    </Button>

</div>

                <List>
                    <div>{filteredTasks.length < 1 && <div style={{display:'flex', justifyContent:"center", flexDirection:"column", alignItems:"center", gap:20, position:"absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        margin: 'auto',}}>
                     <div style={{fontSize: 32}}>You don't have any tasks</div>
                     <div style={{       display:"flex",
                         alignItems:"center",
                         justifyContent:"center",
                         flexDirection:"column",
                     gap:20}}>
                         <div style={{
                             width:108.33,
                             height: 108.33,
                             color:"rgb(0,0,0,0.5)",
                             borderRadius:"50%",
                             border:"3px solid rgb(0,0,0,0.5)",
                             display:"flex",
                             alignItems:"center",
                             justifyContent:"center",
                             cursor:"pointer",
                             fontSize: 90,
                         }}
                              onClick={handleFocus}>

                             +
                         </div>
                         <div style={{fontSize: 32, color:"rgb(0,0,0,0.5)",}}>Create Task</div>
                     </div>
                    </div>}</div>
                    {filteredTasks.map((task: any, index: any) => (
                        <ListItem key={task.id}>

                            <TaskName  completed={task.completed}>

                                <Status
                                    onClick={() => markAsCompleted(index)}
                                    completed={task.completed}
                                >
                                    {task.completed ? <FaCheck size={20}/> :  <FaCheck size={20}/>}
                                </Status>

                                {task.name}

                            </TaskName>

                            <Button
                                onClick={() => {
                                    editTask(task, index);
                                }}
                                color={'#000'}
                                borderColor={'#dfdfdf'}

                                background={'#fff'}
                            >
                                Edit
                            </Button>
                            <Button color={'#fff'} background={'#F04438'} width={'100px'} onClick={() => handleDelete(index)} >
                                <MdDeleteOutline size={24} />
                            </Button>
                        </ListItem>
                    ))}
                </List>
                </ContentContainer>

                <Modal isOpen={isModalOpen} onCancel={handleCancel} onConfirm={()=>handleConfirm(deleteIndex)} />

            </Container>

    );
}

export default TaskList
