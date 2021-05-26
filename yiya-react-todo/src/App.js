import React, {useState} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";


function App() {

 // const id = 0

  const [text, setText] = useState("")
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  })

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}



    setState(prev => {
      prev = {...prev}
      // Remove from previous items array
     /* if(itemCopy.completed === false) {
        itemCopy.completed === true
      }else{
        itemCopy.completed === false
      }*/
      const itemCopied =  {...state[source.droppableId].items[source.index].completed == true}

      prev[source.droppableId].items.splice(source.index, 1)

     console.log(itemCopied)
      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      console.log(prev)
      return prev

      
    })
  }



  
  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text,
              completed: false
            },
            ...prev.todo.items
          ]
        }
      }
    })

    setText("")
  }

const deleteItem = (index) => {

  setState(prev => {
    prev = {...prev}
  
    prev["todo"].items.splice(index, 1)
    
    return prev

    
  })
}


  return (
    <div className="App">
      <div style={{ justifyContent: "center", alignContent: "center" }}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={addItem}>Add</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((item, index) => {
                        return(
                          <Draggable key={item.id} index={index} draggableId={item.id}>
                            {(provided, snapshot) => {
                              console.log(snapshot)
                              return(
                                <div
                                  className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {item.name}
                                  <button onClick={() => deleteItem(index)}>delete</button>
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
