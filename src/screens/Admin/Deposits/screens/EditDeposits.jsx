import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import TableComponent from "../../../../components/Table/Table.component";
import ModalUploadFileComponent from "../../../../components/Modal/ModalUploadFile.component";
import {
  getBorrowProduct,
  covertDate,
  getDeposits,
  updateDeposits,
} from "../../../../api/AdminAPI";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import {
  convertFromHTML,
  ContentState,
  EditorState,
  convertToRaw,
} from "draft-js";
import SaveIcon from "@material-ui/icons/Save";
import AdminSlug from "../../../../resources/AdminSlug";

export default function EditDeposits(props) {
  const history = useHistory();
  const id = useParams().type;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState();
  useEffect(async () => {
    props.handleLoading(false);
    if (id) {
      await getDeposits(id).then((res) => {
        const blocksFromHTML = convertFromHTML(res.data.content);
        const content = ContentState.createFromBlockArray(blocksFromHTML);
        setEditorState(EditorState.createWithContent(content));
        setContent(res.data.content);
        // setEditorState(res.data.content);
      });
    }
  }, [id]);

  const onEditorStateChange = (editorState) => {
    const converHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    setEditorState(editorState);
  };

  const handlePastedText = (text, html, callback) => {
    const modifiedHtml = html.replace(
      /<p class=MsoListParagraph[\s\S]*?>·([\s\S]*?)<\/p>/g,
      "<li>$1</li>"
    );
  };

  const handleSubmit = async () => {
    const converHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    const data = {
      content: converHtml,
    };
    props.handleLoading(true);
    await updateDeposits(id, data).then((res) => {
      history.push(AdminSlug.depositsManager);
    });
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">CẬP NHẬT TIỀN GỬI: </span>{" "}
        <span className="title">
          {parseInt(id) === 1 ? "Có kỳ hạn" : "Không kỳ hạn"}
        </span>
      </div>

      <div className="mt-3">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          handlePastedText={handlePastedText}
        />
      </div>
      <div className="mt-4">
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          style={{ float: "right " }}
          onClick={handleSubmit}
        >
          XÁC NHẬN
        </Button>
      </div>
    </Grid>
  );
}
