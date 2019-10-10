const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  caseInfo:state => {
    console.log('taskList Getter refresh')
    for (let index in state.forensic.case_info) {
      if (state.forensic.case_info[index].case_id == state.forensic.case_id) {
        console.log(state.forensic.case_info[index]);
        return state.forensic.case_info[index];
      }
    }
  },
  taskInfo:state => {
    console.log('task Getter refresh')
    for (let index in state.forensic.case_info) {
      if (state.forensic.case_info[index].case_id == state.forensic.case_id) {
        for (let taskIndex in state.forensic.case_info[index].task_list) {
          if(state.forensic.case_info[index].task_list[taskIndex].task_id == state.forensic.task_id)
          {
            console.log(state.forensic.case_info[index].task_list[taskIndex]);
            return state.forensic.case_info[index].task_list[taskIndex];
          }
        }
      }
    }
  }
}
export default getters
