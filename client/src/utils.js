import axios from 'axios';
import API_KEY from '../config';

const headers = { headers: { Authorization: API_KEY } };

const getPaginatedProducts = (page, count) => axios.get(`/products/?page=${page}&count=${count}`, headers);

const getProduct = (id) => axios.get(`/products/${id}`, headers);

const getProductStyles = (id) => axios.get(`/products/${id}/styles`, headers);

const getProductRelated = (id) => axios.get(`/products/${id}/related`, headers);

const getReviewsMeta = (id) => axios.get(`/reviews/meta/?id=${id}`, headers);

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
