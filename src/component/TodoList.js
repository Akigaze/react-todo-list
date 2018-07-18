import React,{Component} from 'react'
import InputBox from './InputBox'
import TaskGroup from './TaskGroup'
import '../css/todo.css';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      text: '' ,
      filters:[
        {name:"all",selected:true,text:"All"},
        {name:"active",selected:false,text:"Active"},
        {name:"complete",selected:false,text:"Complete"}
      ]
    };
    this.handleChange = this.handleChange.bind(this);
  }
  render(){
    return(
      <div className="container">
        <div>
          <h2>React To Do List</h2>
          <p>
            <em>Simple Todo List with adding and filter by diff status.</em>
          </p>
        </div>
        <div>
            <input
              onChange={this.handleChange}
              value={this.state.text}
              className="input-text"
            />
            <div id="button" onClick={this.addTask}>Add</div>
          <TaskGroup tasks={this.state.tasks} check={this.update}/>
        </div>
        <div>
        <ul id="filters">
          {this.state.filters.map(f=>(
            <li>
              <a href="#" name={f.name} class={f.selected?"selected":""} onClick={this.filter}>{f.text}</a>
            </li>
          ))}
        </ul>
        </div>
      </div>
    )
  }

  filter=(event)=>{
    const f=this.state.filters.find(f=>(f.name==event.target.name));
    const newFilters=this.state.filters.map(f=>{
      let {name,text}=f;
      return {name,selected:false,text}
    });
    newFilters.find(f=>(f.name==event.target.name)).selected=true;
    this.setState({filters:newFilters})
    const tempTasks=this.state.tasks.map(t=>{
      let {id,text,checked}=t;
      return {
        id,
        text,
        checked,
        visual:true
      };
    })
    let newTasks=tempTasks;
    if(event.target.name==="active"){
      newTasks=tempTasks.map(t=>{
        if(t.checked){
          t.visual=false;
        }
        return t;
      })
    }else if(event.target.name==="complete"){
      newTasks=tempTasks.map(t=>{
        if(!t.checked){
          t.visual=false;
        }
        return t;
      })
    }
    this.setState({tasks:newTasks});
  }

  update=(tasks)=>{
    this.setState({tasks})
  }

  addTask=()=>{
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      id: Date.now(),
      text: this.state.text,
      checked:false,
      visual:true
    };
    this.setState(prevState => ({
      tasks: prevState.tasks.concat(newItem),
      text: ''
    }));
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }
}
