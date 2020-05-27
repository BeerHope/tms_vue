const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  account: state => state.user.account,
  routes: state => state.permission.routes
}
export default getters
