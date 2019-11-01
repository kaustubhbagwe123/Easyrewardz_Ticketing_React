import React, { Component, Fragment } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class TestingDemo extends Component {
  render() {
    return (
      <Fragment>
        <Editor
          // editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
      </Fragment>
    );
  }
}

export default TestingDemo;
