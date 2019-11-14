export const setIsAutnenticated = ({ commit }, data) =>
  commit("setIsAutnenticated", data); // 名字和 mutations 里的一样

export const setUser = ({ commit }, data) => commit("setUser", data);

export const setProfile = ({ commit }, data) => commit("setProfile", data);

export const setLoading = ({ commit }, data) => commit("setLoading", data);

export const setProfiles = ({ commit }, data) => commit("setProfiles", data);
// 退出后
export const clearCurrentState = ({ commit }) => {
  commit("setProfile", null);
  commit("setUser", null);
  commit("setIsAutnenticated", false);
};
