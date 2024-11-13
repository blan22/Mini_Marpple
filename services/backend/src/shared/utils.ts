import CONFIG from './config';

const createThumnbnailUrl = (thumbnail: string = '') => {
  return `${CONFIG.DOMAIN}/images/${thumbnail}`;
};

const paging = (page: number = 1, limit: number = 10) => {
  return {
    limit,
    offset: (page - 1) * limit,
  };
};

export { createThumnbnailUrl, paging };
