import React, { Component } from "react";
import "../css/todo.css";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { editable: false };
  }
  editTask = e => {
    //this.setState({editable:true});
    console.log("editTask");
  };
  endEdit = event => {
    let keycode = event.keyCode;
    if (keycode === "13") {
      this.setState({ editable: false });
    }
  };
  checkTask = event => {
    const task = this.props.tasks.find(t => {
      return t.id == event.target.id;
    });
    let prechecked = task.checked;
    task.checked = !prechecked;
    this.props.check(this.props.tasks);
  };
  render() {
    return (
      <ol className="task">
        {this.props.tasks.filter(t => t.visual).map(task => (
          <li className={task.checked ? "checked" : ""}>
            <input
              id={task.id}
              type="checkbox"
              className="done-todo"
              checked={task.checked ? "checked" : ""}
              onClick={this.checkTask}
            />
            <span>{task.text}</span>
          </li>
        ))}
      </ol>
    );
  }
}
