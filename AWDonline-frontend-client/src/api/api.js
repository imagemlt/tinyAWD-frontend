import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.xsrfHeaderName='X-CSRFToken';
//Vue.prototype.$axios = axios;
let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, qs.stringify(params)).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/team/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const getTeamListPage = params => { return axios.get(`${base}/admin/teams`, { params: params }); };
export const removeTeam = params => { return axios.post(`${base}/admin/teams/remove`, qs.stringify(params)); };
export const batchRemoveTeam = params => { return axios.get(`${base}/admin/teams/batchremove`, { params: params }); };
export const editTeam = params => { return axios.post(`${base}/admin/teams/edit`,  qs.stringify(params) ); };
export const addTeam = params => { return axios.post(`${base}/admin/teams/add`, qs.stringify(params) ); };


export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getChalListPage = params => {return axios.get(`${base}/team/chals`, {params:params});};
export const removeChal = pramas =>{return axios.post(`${base}/admin/chals/remove`,qs.stringify(params));};
export const batchRemoveChal = params => { return axios.get(`${base}/admin/chals/batchremove`, { params: params }); };
export const editChal = params => { return axios.post(`${base}/admin/chals/edit`,  qs.stringify(params) ); };
export const addChal = params => { return axios.post(`${base}/admin/chals/add`, qs.stringify(params) ); };

export const startAll = params => {return axios.post(`${base}/admin/startall`,qs.stringify(params));};
export const restartInstance = params =>{return axios.post(`${base}/admin/instances/restart`,qs.stringify(params));};
export const getInstancesListPage= params =>{return axios.get(`${base}/team/instances`,{params:params});};
export const confirmMessageCallback= params =>{return axios.get(`${base}/admin/instances/status`,{params:params});};
export const getInstances = params =>{return axios.get(`${base}/admin/instances`, {params:params});};
export const editInstance=params=>{return axios.post(`${base}/admin/instances/chpass`,qs.stringify(params));}

export const getAdminListPage =params=>{return axios.get(`${base}/admin/list`,{params:params});};
export const removeAdmin =params=>{return axios.post(`${base}/admin/remove`,qs.stringify(params));};
export const batchRemoveAdmin = params=>{return axios.post(`${base}/admin/batchremove`,qs.stringify(params));};
export const editAdmin =params =>{return axios.post(`${base}/admin/edit`,qs.stringify(params));};
export const addAdmin = params =>{return axios.post(`${base}/admin/add`,qs.stringify(params));};

export const getTeamInfo=params=>{return axios.get(`${base}/team/info`,{params:params});};


export const editTeamInfo=params=>{return axios.post(`${base}/team/edit`,qs.stringify(params));};
export const getAttacks=params=>{return axios.get(`${base}/team/attack`,{params:params});};

export const logout=params=>{return axios.post(`${base}/logout`,qs.stringify(params));};