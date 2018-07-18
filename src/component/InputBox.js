import React,{Component} from 'react'
import '../css/todo.css';

export default class InputBox extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
      <input className="input-text" type="text" name="ListItem"/>
      <div id="button">Add</div>
      </div>
    )
  }
}
