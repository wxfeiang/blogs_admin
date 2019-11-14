export const setIsAutnenticated = (state, data) => {
  state.isAutnenticated = data;
};
export const setUser = (state, data) => {
  //res.data
  state.user = data;
  // console.log(state.user);
};
export const setProfile = (state, data) => {
  state.profile = data;
};
export const setLoading = (state, data) => {
  state.loading = data; //加载
};
export const setProfiles = (state, data) => {
  state.profiles = data;
};
