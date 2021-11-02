import axios from 'axios';
import API_KEY from '../config';

const headers = { headers: { Authorization: API_KEY } };

const getPaginatedProducts = (page, count, cb) => {
  axios.get(`/products/?page=${page}&count=${count}`, headers)
    .then((response) => { cb(null, response.data); })
    .catch((err) => { cb(err); });
};

const getProduct = (id, cb) => {
  axios.get(`/products/${id}`, headers)
    .then((response) => { cb(null, response.data); })
    .catch((err) => { cb(err); });
};

const getProductStyles = (id, cb) => {
  axios.get(`/products/${id}/styles`, headers)
    .then((response) => { cb(null, response.data); })
    .catch((err) => { cb(err); });
};

const getProductRelated = (id, cb) => {
  axios.get(`/products/${id}/related`, headers)
    .then((response) => { cb(null, response.data); })
    .catch((err) => { cb(err); });
};

const getReviewsMeta = (id, cb) => {
  axios.get(`/reviews/meta/?id=${id}`, headers)
    .then((response) => { cb(null, response.data); })
    .catch((err) => { cb(err); });
};

const getProductQuestions = (id, cb) => {
  axios.get(`/products/questions/?${id}`, headers)
    .then((response) => { cb(null, response.data); })
    .catch((err) => { cb(err); });
};

export {
  getPaginatedProducts,
  getProduct,
  getProductStyles,
  getProductRelated,
  getReviewsMeta,
  getProductQuestions,
};