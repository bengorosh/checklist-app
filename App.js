import { useState } from "react";
import Switch from "react-switch";
import deleteIcon from './redx.png';
import './App.css';

var tasks = ["Sample task 1", "Sample task 2"];


export default function App() {//in index.js we import App, and JS loads index.js by default. here we tell is to look for root element and to run App func

  var [checkedState, setCheckedState] = useState(//come back to this; these are just defining functions, this is checkbox array and its setter
    new Array(1000).fill(false)
  );

  const switchCheckbox = (position) => {//find the index in the array and changes it
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const [newtask, setNewTask] = useState('');//in react, variables are defined this way - name of the var and func to change that var. it will make a setter func for you if you dont define one; useState('') is a package we imported to store var' state - '' is defVal for inside the text box in this case
  const [forceRefresh, setForceRefresh] = useState('');
  const [doneFilter, setDoneFilter] = useState(false);

  const setTask = (event) => {//this is a lambda func: you get passed an event and it calls setNewTask (the setter) and sets val with the event, this is the task setter
    setNewTask(event.target.value);
  };

  const handleKeyDown = (event) => {//says when you hit the enter key, pushes a new task with val newTask to var[] tasks
    if (event.key === 'Enter' && newtask.trim() != '') {
      // 👇 Get input value
      tasks.push(newtask);
      setNewTask('');
      setForceRefresh(event.target.value);
    }
  };

  function getName (name, checked) {
    return checked ? <s> {name} </s> : name;//this puts strikethrough through it if its checked
  }

  function removeTask (event, index) {
    tasks.splice(index,1);
    checkedState.splice(index,1);
    setForceRefresh(event);
    //tasks.filter(index);
    //checkedState.filter(index);
  }

  function filteredChecklist (filter) {
    return(
    tasks.map((name, index) => {//.map loops over var[] tasks; for each element of the array it calls the lambda func onChange
      if (filter) {//
       if (!checkedState[index]) {
          return (
            <li key={index}>
              <div className="entries-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => switchCheckbox(index)}
                    //<FontAwesomeIcon icon={faTrash} className="text-danger cursor"} />
                  />
                  <label htmlFor={`custom-checkbox-${index}`}> {getName(name,checkedState[index])}</label>
                </div>
                &nbsp;&nbsp;<img src={deleteIcon} alt="Delete" width="15" height="15" onClick={(e) => removeTask(e, index)}/>
              </div>
            </li>
          );
        }
      }
      else {//if the filter for a tasks[] element is set to false, then we go into this else
          return (//this is the peice of html it returns; a list item (li)
            <li key={index}>
              <div className="entries-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    //icon={index} onClick action = remove item with this index from both arrays
                    checked={checkedState[index]}//the status of the checkbox
                    onChange={() => switchCheckbox(index)}//event handler for the status
                  />
                  <label htmlFor={`custom-checkbox-${index}`}> {getName(name,checkedState[index])}</label>
                </div>
                &nbsp;&nbsp;<img src={deleteIcon} alt="Delete" width="15" height="15" onClick={(e) => removeTask(e, index)}/>
              </div>

            </li>
          );
      }

    })
    )
  }

  return (//this is where the App actually starts, above are just funitons it calls;  //starts by using HTML-classname is for the CSS section;  //div is a new vertical seciton in html; //
    <div className="App">
      <h2>Task Manager</h2>
      <div className="entries-list">
        <input//a react control; text input box
        class="custom"
        type="text"
        id="newtask"
        name="newtask"
        value={newtask} //all 3 defined above (ln 79); all curly braces are values(reference to funtion or variable above)
        onChange={setTask}//when you type anything in the box, setTask will be called;
        onKeyDown={handleKeyDown}//FIX ln 106 &nbsp is space bar char in html; in this case used to pad
      />
    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hide complete &nbsp; </label>
    <Switch onChange={setDoneFilter} checked={doneFilter} className="react-switch"//calls user defined func setDoneFilter for the onChange builtin of switch. setDoneFilter is the setter for doneFilter
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={13}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
            height={10}
            width={30}
            id="material-switch"/>
    </div>
      <h3></h3>
      <ul className="entries-list">
        {filteredChecklist(doneFilter)}
        <li>
        </li>
      </ul>
    </div>
  );
}
