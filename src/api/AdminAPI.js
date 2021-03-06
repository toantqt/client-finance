import axios from "axios";
import { getRole } from "../auth/auth";
import { getAccessToken } from "../auth/auth";
import moment from "moment";

export const covertDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const randomPassword = (length) => {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const url = "https://server-finance.herokuapp.com/adminAPI";
const urlUser = "https://server-finance.herokuapp.com/api";
// const url = "http://localhost:6699/adminAPI";
// const urlUser = "http://localhost:6699/api";

const headers = async () => {
  return { Authorization: `${await getAccessToken()}` };
};
export const login = async (data) => {
  return await axios
    .post(`${url}/login`, data)
    .then(async (res) => {
      const token = {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      };
      await localStorage.setItem("userToken", JSON.stringify(token));
      let role;
      await getRole().then((user) => {
        role = user;
      });
      return role;
    })
    .catch((error) => {
      return error.response;
    });
};

export const importFileLoan = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await axios
    .post(`${url}/import-file-loan`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getCountLoan = async () => {
  return await axios
    .get(`${url}/count-loan`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getLoan = async (page) => {
  return await axios
    .get(`${url}/loan/${page}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const importFileSending = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await axios
    .post(`${url}/import-file-sending`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getCountSendingContract = async () => {
  return await axios
    .get(`${url}/count-sending-contract`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getSendingContract = async (page) => {
  return await axios
    .get(`${url}/sending-contract/${page}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getCountRegisterLoan = async (page) => {
  return await axios
    .get(`${url}/count-register-loan`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getRegisterLoan = async (page) => {
  return await axios
    .get(`${url}/register-loan/${page}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const searchLoan = async (data) => {
  return await axios
    .post(`${urlUser}/search-loan`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const searchSendingContract = async (data) => {
  return await axios
    .post(`${urlUser}/search-sending-contract`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getCountUser = async () => {
  return await axios
    .get(`${url}/count-user`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const searchUser = async (phone) => {
  return await axios
    .get(`${url}/search-user/${phone}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const profileUser = async (id) => {
  return await axios
    .get(`${urlUser}/profile/${id}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getUser = async (page) => {
  return await axios
    .get(`${url}/user/${page}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const resetPassword = async (data) => {
  return await axios
    .post(`${url}/reset-password`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateProfile = async (userID, data) => {
  return await axios
    .post(`${url}/update-profile/${userID}`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const createUser = async (data) => {
  return await axios
    .post(`${url}/create-user`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getLoanBrief = async () => {
  return await axios
    .get(`${urlUser}/loan-brief`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const DeleteLoanBrief = async (data) => {
  return await axios
    .post(`${url}/delete-loan-brief`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addLoanBrief = async (data) => {
  return await axios
    .post(`${url}/loan-brief`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateLoanBrief = async (data) => {
  return await axios
    .post(`${url}/update-loan-brief`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getAllBanner = async () => {
  return await axios
    .get(`${url}/get-all-banner`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getDetailsBanner = async (bannerID) => {
  return await axios
    .get(`${url}/get-details-banner/${bannerID}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteBanner = async (data) => {
  return await axios
    .post(`${url}/delete-banner`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getAllCategory = async () => {
  return await axios
    .get(`${url}/get-all-category`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateBanner = async (data) => {
  const formData = new FormData();
  if (data.image.file) {
    formData.append("image", data.image.file);
  } else {
    formData.append("image", data.image.url);
  }
  formData.append("index", data.index);
  formData.append("bannerID", data.bannerID);
  formData.append("url", data.url);

  return await axios
    .post(`${url}/update-banner`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getDetailsCategory = async (categoryID) => {
  return await axios
    .get(`${url}/get-details-category/${categoryID}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateCategory = async (data) => {
  return await axios
    .post(`${url}/update-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addSubCategory = async (data) => {
  return await axios
    .post(`${url}/add-sub-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteSubCategory = async (data) => {
  return await axios
    .post(`${url}/delete-sub-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateSubCategory = async (data) => {
  return await axios
    .post(`${url}/update-sub-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addCategory = async (data) => {
  return await axios
    .post(`${url}/add-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteCategory = async (data) => {
  return await axios
    .post(`${url}/delete-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateImage = async (data) => {
  const formData = new FormData();
  if (data.image.file) {
    formData.append("image", data.image.file);
  } else {
    formData.append("image", data.image.url);
  }
  formData.append("title", data.title);
  formData.append("imageID", data.imageID);

  return await axios
    .post(`${url}/update-image`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteImage = async (data) => {
  return await axios
    .post(`${url}/delete-image`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addImage = async (data) => {
  const formData = new FormData();
  formData.append("image", data.image.file);

  formData.append("title", data.title);

  return await axios
    .post(`${url}/add-image`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addVideo = async (data) => {
  const formData = new FormData();
  if (data.video.file) {
    formData.append("video", data.video.file);
  } else {
    formData.append("video", data.video.url);
  }
  formData.append("title", data.title);

  return await axios
    .post(`${url}/add-video`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteVideo = async (data) => {
  return await axios
    .post(`${url}/delete-video`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateVideo = async (data) => {
  const formData = new FormData();
  if (data.video.file) {
    formData.append("video", data.video.file);
  } else {
    formData.append("video", data.video.url);
  }
  formData.append("title", data.title);
  formData.append("videoID", data.videoID);

  return await axios
    .post(`${url}/update-video`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getCategoryNews = async (slug) => {
  return await axios
    .get(`${url}/get-category-news/${slug}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getNewsCategory = async (slug) => {
  return await axios
    .get(`${url}/get-news-category/${slug}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteNews = async (newsID) => {
  return await axios
    .delete(`${url}/delete-news/${newsID}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateIntroduce = async (data) => {
  const formData = new FormData();
  let i = 0;
  for (let item of data.history.image) {
    let title = "lists1Img" + i;
    if (item.file) {
      formData.append(title, item.file);
    } else {
      formData.append(title, JSON.stringify(item));
    }
    i++;
  }

  let y = 0;
  for (let item of data.structure.image) {
    let title = "lists2Img" + y;
    if (item.file) {
      formData.append(title, item.file);
    } else {
      formData.append(title, JSON.stringify(item));
    }
    y++;
  }

  formData.append("historyTitle", data.history.title);
  formData.append("historyTotal", data.history.total);

  formData.append("historyContent", data.history.content);
  formData.append("structureTitle", data.structure.title);
  formData.append("structureContent", data.structure.content);
  formData.append("structureTotal", data.structure.total);

  return await axios
    .post(`${url}/update-introduce`, formData, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const productManager = async (slug) => {
  return await axios
    .get(`${url}/manager-product/${slug}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteProduct = async (data) => {
  return await axios
    .post(`${url}/delete-product`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateProduct = async (data) => {
  const formData = new FormData();
  for (let i = 0; i < data.totalContent; i++) {
    let title = "listsImage" + i;
    const arrImg = data.listImage.filter((e) => {
      return e.list === i + 1;
    });
    for (let img of arrImg) {
      if (img.image.url) {
        formData.append(title, JSON.stringify(img.image));
      } else {
        formData.append(title, img.image);
      }
    }
  }

  for (let item of data.image) {
    if (item.image) {
      formData.append("image", item.image);
    } else {
      formData.append("image", JSON.stringify(item));
    }
  }
  formData.append("totalImageProduct", data.image.length);
  formData.append("totalContent", data.totalContent);
  formData.append("listsContent", JSON.stringify(data.listsContent));

  formData.append("productID", data.productID);
  formData.append("subCategoryID", data.subCategoryID);
  formData.append("name", data.name);
  formData.append("code", data.code);
  formData.append("price", data.price);
  formData.append("description", data.description);
  formData.append("highlight", data.highlight);

  return await axios
    .post(`${url}/update-product`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateNews = async (data) => {
  const formData = new FormData();

  for (let i = 0; i < data.totalContent; i++) {
    let title = "listsImage" + i;
    const arrImg = data.listImage.filter((e) => {
      return e.list === i + 1;
    });
    for (let img of arrImg) {
      if (img.image.url) {
        formData.append(title, JSON.stringify(img.image));
      } else {
        formData.append(title, img.image);
      }
    }
  }
  if (data.thumbnail.file) {
    formData.append("thumbnail", data.thumbnail.file);
  } else {
    formData.append("thumbnail", JSON.stringify(data.thumbnail));
  }

  formData.append("newsID", data.newsID);
  formData.append("subCategoryID", data.subCategoryID);
  formData.append("title", data.title);
  formData.append("listsContent", JSON.stringify(data.listsContent));
  formData.append("author", data.author);
  formData.append("totalContent", data.totalContent);

  return await axios
    .post(`${url}/update-news`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addProduct = async (data) => {
  const formData = new FormData();
  for (let i = 0; i < data.totalContent; i++) {
    let title = "listsImage" + i;
    const arrImg = data.listImage.filter((e) => {
      return e.list === i + 1;
    });
    for (let img of arrImg) {
      formData.append(title, img.image);
    }
  }
  for (let item of data.image) {
    formData.append("image", item.image);
  }

  formData.append("categoryID", data.categoryID);
  formData.append("subCategoryID", data.subCategoryID);
  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("code", data.code);
  formData.append("listsContent", JSON.stringify(data.listsContent));
  formData.append("description", data.description);
  formData.append("highlight", data.highlight);
  formData.append("totalContent", data.totalContent);

  return await axios
    .post(`${url}/add-product`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addNews = async (data) => {
  const formData = new FormData();

  for (let i = 0; i < data.totalContent; i++) {
    let title = "listsImage" + i;
    const arrImg = data.listImage.filter((e) => {
      return e.list === i + 1;
    });
    for (let img of arrImg) {
      formData.append(title, img.image);
    }
  }

  formData.append("thumbnail", data.thumbnail.file);
  formData.append("categoryID", data.categoryID);
  formData.append("title", data.mainTitle);
  formData.append("listsContent", JSON.stringify(data.listsContent));
  formData.append("totalContent", data.totalContent);
  return await axios
    .post(`${url}/add-news`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getNewsEdit = async (id) => {
  return await axios
    .get(`${url}/get-news-edit/${id}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addBanner = async (data) => {
  const formData = new FormData();
  formData.append("banner", data.banner.file);
  formData.append("index", data.index);
  formData.append("url", data.url);

  return await axios
    .post(`${url}/add-banner`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getBorrowProduct = async () => {
  return await axios
    .get(`${urlUser}/get-borrow-product`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getDetailsBorrowProduct = async (id) => {
  return await axios
    .get(`${urlUser}/get-details-borrow-product/${id}`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateBorrow = async (id, data) => {
  return await axios
    .post(`${url}/update-borrow/${id}`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const countNotification = async () => {
  return await axios
    .get(`${url}/count-notification`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getNotification = async (page) => {
  return await axios
    .get(`${url}/notification/${page}`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const createNotification = async (data) => {
  return await axios
    .post(`${url}/notification`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getCategoryVoucher = async () => {
  return await axios
    .get(`${urlUser}/get-voucher`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getDetailsVoucher = async (id) => {
  return await axios
    .get(`${urlUser}/get-details-voucher/${id}`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getListsNews = async (id) => {
  return await axios
    .get(`${urlUser}/lists-news-voucher/${id}`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getAllNews = async () => {
  return await axios
    .get(`${url}/lists-news`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getInterestRate = async () => {
  return await axios
    .get(`${urlUser}/interest-rate`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addInterestRate = async (data) => {
  return await axios
    .post(`${url}/interest-rate`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteInterestRate = async (id) => {
  return await axios
    .delete(`${url}/delete-interest-rate/${id}`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateInterestRate = async (data) => {
  return await axios
    .post(`${url}/update-interest-rate/${data._id}`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getDeposits = async (type) => {
  return await axios
    .get(`${urlUser}/deposits/${type}`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateDeposits = async (type, data) => {
  return await axios
    .post(`${url}/deposits/${type}`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getListsContact = async () => {
  return await axios
    .get(`${urlUser}/lists-contact`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const createContact = async (data, image) => {
  const formData = new FormData();
  formData.append("image", image.file);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("position", data.position);
  formData.append("fullName", data.fullName);
  formData.append("workAddress", data.workAddress);

  return await axios
    .post(`${url}/contact`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteContact = async (id) => {
  return await axios
    .delete(`${url}/contact/${id}`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const searchContact = async (phoneNumber) => {
  return await axios
    .get(`${url}/search-contact/${phoneNumber}`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getDetailsContact = async (id) => {
  return await axios
    .get(`${url}/contact/${id}`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateVoucher = async (data) => {
  return await axios
    .post(`${url}/voucher/${data.id}`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};
