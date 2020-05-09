import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { withRouter } from "react-router-dom";


class home extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: "",
      list: [],
    }
  }

  addToList = () => {
    this.setState({ list: [...this.state.list, { todo: this.state.todo, state: false }] });
    this.setState({todo:""})
  }

  updateState = (e) => {
    this.setState({ todo: e.target.value });
  }

  changeState = (i) => {
    const a = this.state.list
    a[i].state = !a[i].state
    this.setState({ list: a });
  }
  delList = (i) => {
    const a = this.state.list;
    a.splice(i, 1)
    this.setState({ list: a });
  }


  render() {
    return (
      <>
        {localStorage.getItem('token') ? (
          <div className="container">
            <div className="row d-flex justify-content-center m-4">
              <div className="col-8 border border-dark bg-light shadow rounded p-4">
                <h2 className="text-center text-white bg-dark shadow border rounded m-1 p-1 mb-5">My To-Do</h2>
                <div className="m-3 p-2 ">
                  <List done={this.changeState} del={this.delList} list={this.state.list}></List>
                </div>
                <div className="border rounded m-3 p-2 bg-dark">
                  <Form change={this.updateState} add={this.addToList} ref={this.createRef} todo = {this.state.todo}></Form>
                </div>
              </div>
            </div>
          </div>
        ) : (this.props.history.push("/sign-in"))}
      </>
    );
  }
}


class List extends React.Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.list.map((value, index) => (
          <ListItem value={value} index={index} done={this.props.done} del={this.props.del} list={this.props.list} />
        ))}
      </ul>
    );
  }
}

class ListItem extends React.Component {
  render() {
    return (
      <li className="d-flex list-group-item mt-2 shadow border border-dark bg-dark rounded" id={this.props.index} key={this.props.index}>
        <div className={this.props.value.state ? "text-center text-danger done h4 mt-1 mr-auto" : "text-center text-success h4 mt-1 mr-auto"}>{this.props.value.todo}</div>
        <div className="ml-auto">
          <div className="btn shadow btn-primary text-white ml-auto" id={this.props.index} onClick={() => this.props.done(this.props.index)}>{this.props.value.state ? <i className="fa fa-close"></i> : <i className="fa fa-check"></i>}</div>
          <div className="btn shadow btn-danger ml-1 text-white" id={this.props.index} onClick={() => this.props.del(this.props.index)}><i className="fa fa-trash-o"></i>
          </div>
        </div>
      </li>
    )

  }

}

class Form extends React.Component {
  render() {
    // let { props, ref } = React.forwardRef((props, ref) => ({ props, ref }));
    return (
      <div className="input-group ">
        <input id="submit" type="text" className="form-control text-center rounded bg-secondary text-white" onChange={this.props.change} value={this.props.todo}/>
        <button className="btn btn-primary rounded ml-1" onClick={this.props.add}>Add</button>
      </div>
    );
  }
}

export default withRouter(home);
