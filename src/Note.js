import React from 'react';

class Note extends  React.Component {
  render() {
    return (
      <div className="note">
        <div className="add-text-field">{this.props.content}</div>
        <button className="close" onClick={() => this.props.onRemove()}>✖</button>
      </div>
    );
  }
}

export default Note;
