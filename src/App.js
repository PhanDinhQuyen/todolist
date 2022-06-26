import React, { Component } from "react";
import "./style/App.css";
console.log("Start!");

class Button extends Component {
  render() {
    return (
      <button
        className={this.props.className}
        type={this.props.type}
        onClick={this.props.onClick}
      >
        {this.props.title}
      </button>
    );
  }
}
class Input extends Component {
  render() {
    return (
      <input
        type={this.props.type}
        onChange={this.props.onChange}
        autoFocus={this.props.focusType || false}
        value={this.props.value}
        className={this.props.className}
        onKeyDown={this.props.handleOnKeyDown}
        placeholder={this.props.placeholder}
        maxLength={this.props.maxLength}
      />
    );
  }
}
const timeAdd = () => {
  const date = new Date();
  const [hours, minutes] = [
    date.getHours(),
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes(),
  ];

  return `${hours}:${minutes}`;
};
console.log(timeAdd());
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      current: "",
      value: "",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleDelAll = this.handleDelAll.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
  }
  handleOnChange(event) {
    const fLCapital = (s) => (s = s.charAt(0).toUpperCase() + s.slice(1));
    this.setState({
      current: fLCapital(event.target.value),
      value: fLCapital(event.target.value),
    });
    console.log("Run handleOnChange");
  }
  handleOnClick() {
    const { list, current } = this.state;
    if (Boolean(current)) {
      let idRandom = Math.floor(Math.random() * 10000);
      while (list.map((item) => item.id).includes(idRandom)) {
        idRandom = Math.floor(Math.random() * 10000);
      }
      this.setState({
        list: [...list, { id: idRandom, name: current, time: timeAdd() }],
      });
      this.setState({ value: "", current: "" });
      console.log("Run handleOnClick");
    }
  }
  handleDel(id) {
    this.setState({
      list: [...this.state.list.filter((item) => item.id !== id)],
    });
  }
  handleDelAll() {
    this.setState({ list: [] });
  }
  handleOnKeyDown(event) {
    return event.keyCode === 13 ? this.handleOnClick() : null;
  }
  render() {
    const { list, value } = this.state;

    return (
      <div className='to__do'>
        <h1>Things to do!</h1>
        <div className='input__text'>
          <Input
            type='text'
            onChange={this.handleOnChange}
            focusType={true}
            value={value}
            handleOnKeyDown={this.handleOnKeyDown}
            placeholder='Something...'
            maxLength={50}
          />
          <Button title='Add' onClick={this.handleOnClick} type='button' />
        </div>
        {list.length > 0 ? (
          <ul className='list__service'>
            {list.map((item, index) => (
              <li key={index}>
                <div>
                  <span className='list__item_name'>{item.name}</span>
                  <span className='list__item_time'>{item.time}</span>
                </div>
                <Button
                  title={<i className='fa-solid fa-delete-left'></i>}
                  onClick={() => this.handleDel(item.id)}
                  type='button'
                />
              </li>
            ))}
          </ul>
        ) : null}
        <Button
          className='btn_delall'
          title='Clear'
          onClick={this.handleDelAll}
          type='button'
        />
      </div>
    );
  }
}
export default App;
