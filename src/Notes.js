import React from 'react';
import Note from "./Note";
import Api from "./services/Api"

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: [] };
  }

  componentDidMount() {
    this.refreshNotes();
  }

  refreshNotes() {
    Api.listNotes((notes) => this.setState({ notes }));
  }

  handleAdd = (event) => {
    const content = event.target.content.value;
    Api.addNote(content, () => this.refreshNotes());
    event.preventDefault();
  };

  handleRemove = (id) => {
    Api.deleteNote(id, () => this.refreshNotes());
  };

  render() {
    return (
      <div className="notes-total">
        <h3>New Note</h3>
        <form className="index-add-form" onSubmit={this.handleAdd}>
          <input className="text-field" type="text" name="content" />
          <button name="submit" className="submit" type="submit">➤</button>
        </form>

        <div className="body">
          <div className="button-update">
            <h3>Notes</h3>
            <button className="update" onClick={() => this.refreshNotes()}>⟳</button>
            {
              this.state.notes.map(({ id, content }) => <Note content={content} key={id} onRemove={() => this.handleRemove(id) } />)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;
