const apiServer = "http://localhost:3001";

export const apiConfig = {
  path: {
    validateToken: `${apiServer}/auth/token`,
    postList: `${apiServer}/post`,
    postDetail: `${apiServer}/post`,
  },
};
