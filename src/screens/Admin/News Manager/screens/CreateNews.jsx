import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import EditorNewsComponent from "../components/Editor News/EditorNews.component";
import "./createNews.css";
// import SelectCategoryAuthorComponent from "../../components/Select Category Author/SelectCategoryAuthor.component";
// import { createNews } from "../../../../api/AdminAPI";
import TextField from "@material-ui/core/TextField";
import { addNews, getCategoryNews } from "../../../../api/AdminAPI";
import queryString from "query-string";
import ImagePreivewsComponent from "../../../../components/Image Previews/ImagePreviews.component";
import AdminSlug from "../../../../resources/AdminSlug";
export default function CreateNews(props) {
  const history = useHistory();
  const query = queryString.parse(props.location.search);
  const id = query.id;
  const [count, setCount] = useState(1);
  const [image, setImage] = useState([]);
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumnail] = useState();

  useEffect(async () => {
    if (id) {
      props.handleLoading(false);
    }
  }, [id]);

  const handleClickCount = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeImage = (data) => {
    setImage((image) => [...image, data]);
  };
  const handleDeleteImage = (name) => {
    const newArrImage = image.filter((e) => {
      return e.image.name != name;
    });
    setImage(newArrImage);
  };
  const handleChangeContent = (data, index) => {
    let items = [...content];
    let item = { ...content[index] };
    item = data;
    items[index] = item;
    setContent(items);
  };

  const handleClickCreateNews = async () => {
    const data = {
      categoryID: id,
      mainTitle: title,
      listsContent: content,
      listImage: image,
      totalContent: count,
      thumbnail: thumbnail,
    };

    if (data.mainTitle === "") {
      alert("Xin vui lòng thêm tiêu đề!");
    } else {
      props.handleLoading(true);
      await addNews(data).then((res) => {
        props.handleLoading(false);
        history.push({
          pathname: AdminSlug.newsManager,
          search: `?id=${id}`,
        });
      });
    }
  };

  const handleChangeThumbnail = (event) => {
    if (event.target.type === "file") {
      let files = Array.from(event.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          setThumnail({ url: reader.result, file: file });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <Grid container spacing={2} xs={12} style={{ backgroundColor: "white" }}>
      <Grid item lg={12}>
        <div className="news-title ">
          <p>Tiêu đề:</p>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handleChangeTitle}
          />
        </div>
      </Grid>
      <Grid item lg={12}>
        <div className=" news-title">
          <p className="mb-5">Thumbnail:</p>
          <ImagePreivewsComponent
            url={thumbnail}
            handleChangeImage={handleChangeThumbnail}
          />
        </div>
      </Grid>

      <Grid item lg={12}>
        {[...Array(count)].map((_, i) => (
          <EditorNewsComponent
            key={i}
            content={i + 1}
            handleChangeImage={handleChangeImage}
            handleDeleteImage={handleDeleteImage}
            handleChangeContent={handleChangeContent}
          />
        ))}
      </Grid>

      <div className="button-add">
        <button
          type="button"
          className="btn btn-outline-success  "
          onClick={handleClickCreateNews}
        >
          Tạo bài viết
        </button>
        <button
          type="button"
          className="btn btn-outline-primary mr-3"
          onClick={handleClickCount}
        >
          Thêm nội dung
        </button>
      </div>
    </Grid>
  );
}
