import React, { useState, useEffect } from "react";
import UploadButtonComponent from "../Upload Button/UploadButton.component";
import ImagePreviewComponent from "../Image Previews/ImagePreviews.component";
import VideoPreviewComponent from "../Video Previews/VideoPreviews.component";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
// import "../Create News/createNews.css";
export default function EditorNewsComponent(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imagePreview, setImagePreview] = useState([]);
  const [totalContent, setTotalContent] = useState(props.content);
  const [display, setDisplay] = useState(1);

  // useEffect(() => {
  //   props.handleChangeImage(image);
  // }, [image]);

  const addImage = (event) => {
    if (event.target.type === "file") {
      let files = Array.from(event.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          props.handleChangeImage({ image: file, list: props.content });
          setImagePreview((imagePreview) => [
            ...imagePreview,
            { url: reader.result, name: file.name, type: file.type },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const deleteImage = (url) => {
    const newImagePreview = imagePreview.filter((e) => {
      return e.url != url.url;
    });
    setImagePreview(newImagePreview);
    props.handleDeleteImage(url.name);
  };
  const onEditorStateChange = (editorState) => {
    const converHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setEditorState(editorState);
    props.handleChangeContent(converHtml, props.content - 1);
  };
  const listImagePreview = imagePreview.map((e, index) => {
    if (e.type !== "video/mp4") {
      return (
        <ImagePreviewComponent url={e} key={index} deleteImage={deleteImage} />
      );
    } else {
      return (
        <VideoPreviewComponent url={e} key={index} deleteImage={deleteImage} />
      );
    }
  });

  const handlePastedText = (text, html, callback) => {
    const modifiedHtml = html.replace(
      /<p class=MsoListParagraph[\s\S]*?>·([\s\S]*?)<\/p>/g,
      "<li>$1</li>"
    );
  };

  const handleChangeDisplay = (value) => {
    setDisplay(value);
    props.handleChangeDisplay(value, props.content - 1);
  };

  return (
    <div className="create-news">
      <div className="news-editor mt-3">
        <p>Nội dung:</p>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          handlePastedText={handlePastedText}
        />
      </div>
      <div className="wrap-pick-image">
        <div className="wrapper">
          {listImagePreview}
          <UploadButtonComponent addImage={addImage} />
        </div>
      </div>
      <hr />
    </div>
  );
}
