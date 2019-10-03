<template>
	<section>
		<!--工具条-->
		<el-col :lg="18" :sm="12">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>

			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="instances" highlight-current-row v-loading="listLoading"  style="min-width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="实例名称" min-width="180" sortable>
			</el-table-column>
			<!--<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
			</el-table-column>-->
			<!--<el-table-column prop="teamname" label="队伍名" min-width="180" sortable>
			</el-table-column>-->
			<el-table-column prop="chalname" label="chal名称" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="ip" label="ip" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="password" label="ssh密码" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="attack_status" label="状态" min-width="100" sortable>
			</el-table-column>
			<!--<el-table-column prop="birth" label="得分" width="120" sortable>
			</el-table-column>-->

			<!--<el-table-column prop="addr" label="地址" min-width="180" sortable>
			</el-table-column>-->
			<!--<el-table-column labell="操作" min-width="200">
				<template scope="scope">
					<el-button size="small" @click="handleRestart(scope.$index, scope.row)">重启</el-button>
					<el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">更改ssh密码</el-button>
				</template>
			</el-table-column>-->
		</el-table>
			<strong  class="title" style="margin-top: 15px;display:block">Chals</strong>
			<el-col :span="24">



				<el-col :md="6" :sm="12" v-for="chal in chals" style="margin-top:10px;text-align:center">

					<p></p>
					<el-card class="box-card" style="width:90%;display:inline-block;text-align:left">
						<div slot="header" class="clearfix">
							<span>{{chal.name}}</span>
							<!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
						</div>
						<div  class="text item">
							chal名称：{{chal.name}}
						</div>
						<div  class="text item">
							chal类型：{{chal.type}}
						</div>
						<div  class="text item">
							chal分值：{{chal.score}}
						</div>
						<div  class="text item">
							chal描述：{{chal.desc}}
						</div>
					</el-card>
				</el-col>




			</el-col>


		</el-col>
		<!--工具条-->
		<!--<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>-->
		<el-col :lg="6" :sm="12" style="padding:10px 30px">
			<el-card class="box-card" style="">
				<div slot="header" class="clearfix">
					<span>我的信息</span>
					<!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
				</div>
				<div  class="text item">
					用户名：{{user.name}}
				</div>
				<div  class="text item">
					昵称：{{user.nickname}}
				</div>
				<div  class="text item">
					得分：{{user.score}}
				</div>
				<div  class="text item">
					排名：{{user.level}}
				</div>
				<div  class="text item">
					攻击id：{{user.attackid}}
				</div>
			</el-card>
			<el-card class="box=card">
				<div slot="header" class="clearfix">
					攻击情况
				</div>
				<div class="text item" id="attacks" style="overflow-y:auto;max-height:300px;">
				<el-alert
						v-for="mess in messages"
						:title="teamsMap[mess.attacker].name+ ' attacked '+ teamsMap[mess.attacked].name+' on '+ chalsMap[mess.chal].name"
						:type="mess.attacked==user.id?'error':'success'"
						center
						:closable="false"
						show-icon   style="margin-bottom:5px">
				</el-alert>
				</div>
			</el-card>
		</el-col>
		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">

				<el-form-item label="密码">
					<el-input type="password" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getInstancesListPage, getUserList, getAttacks, getChalListPage, editInstance, addUser, restartInstance, confirmMessageCallback ,startAll,getTeamInfo} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				user:{},
				instances: [],
				instancesMap:{},
				teams:[],
				teamsMap:{},
				chals:[],
				chalsMap:{},
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				messages:[],
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					password:''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getInstancesListPage(para).then((res) => {
					this.total = res.data.total;
					
					this.instances = res.data.instances;
					for(let instance of res.data.instances){
						if(instance['attack_status']=='stable'){
							instance['attack_status']='服务正常';
						}
						else if(instance['attack_status']=='attacked'){
							instance['attack_status']='被攻击'
						}
						else if(instance['attack_status']=='down'){
							instance['attack_status']='服务异常'
						}
						else{
							instance['attack_status']='被攻击/服务异常'
						}
					    this.instancesMap[instance.id]=instance;
					}
					this.listLoading = false;
					//NProgress.done();
				});
			},
			getChals(){
			    let para={
			        page:this.page,
					name:this.filters.name
				}
				getChalListPage(para).then((res)=>{
				    this.chals=res.data.chals;
				    for(let chal of res.data.chals){
				        this.chalsMap[chal.id]=chal;
					}
				})
			},
			getTeams(){
			    let para={
			        page:0,
					name:''
				}
				getUserList(para).then((res)=>{
				    this.teams=res.data.users;
				    console.log(this.teams);
				    for(let team of res.data.users){
				        this.teamsMap[team.id]=team;
					}
					console.log('teamsMap',this.teamsMap);
				})
			},
			getAttack(){
			    let para={};
			    getAttacks(para).then((res)=>{
			        //console.log(res.data.attacks);
			        this.messages=this.messages.concat(res.data.attacks);
			        console.log(this.messages);

				})
			},
			loadTeam(){
			    getTeamInfo({}).then((res)=>{

			        let user=Object.assign({},res.data.user);
			        user.level=0;
			        getUserList({page:''}).then((res)=>{
                        let ans=res.data.users;
                        ans.sort((a,b)=>{
                            if(a.score>b.score){return 1}
                            else if(a.score<b.score){return -1}
                            else return 0;
                        })
						let i=0;
                        for(let u of ans){
							console.log(u.name)
							console.log(user.name)
                            if(u.name==user.name){
                                break;
							}
							i++;
						}
						user.level=ans.length-i;
                        this.user=Object.assign({},user);
                        console.log(this.user.level);
					})
				})
			},
			//删除
			/*handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},*/
			querySuccess:function(id,succMess,failMess){
			    console.log(succMess,failMess)
                let query={'id':id};
                confirmMessageCallback(query).then((res)=>{
                    if(res.data.msg){
                        if(res.data.status=='success') {
                            this.$message({
                                'message': succMess,
                                'type': 'success'
                            });
                            return new Promise((resolve,reject)=>{
                                resolve(res);
							})
                        }
                        else{
                            this.$message.error(failMess+'：'+res.data.status);
                            return new Promise((resolve,reject)=>{
                                resolve(res);
							})
						}
                    }
                    else{
                        return this.querySuccess(id,succMess,failMess);
					}
                })
			},

			//显示编辑界面
			/*handleRestart: function (index, row) {

				this.$confirm('确认要重启吗？','提示',{}).then(()=>{
                   let para={'id':row.id};
                   restartInstance(para).then((res)=>{
                       console.log(res);
                       this.$message({
						   'message':res.data.msg,
						   'type':'success'
					   });
                       this.querySuccess(res.data.id,'重启成功','重启失败');
				   })
				})
			},*/
			/*handleEdit:function(index,row){
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
			},*/
			//显示新增界面
			/*startAward: function () {
				this.$confirm('确定开始吗?','提示',{}).then(()=>{
				    let para={};
				    startAll(para).then((res)=>{
				        console.log((res));
				        this.$message({
							'message':res.data.msg,
							'type':'success'
						});
				        this.querySuccess(res.data.id,'比赛已开始','开始比赛失败').then((res)=>{
				            this.getUsers();
						})
					})
				})
			},*/
			//编辑
			/*editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editInstance(para).then((res) => {
							    if(res.data.code==200) {
                                    this.editLoading = false;
                                    //NProgress.done();
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'success'
                                    });
                                    this.$refs['editForm'].resetFields();
                                    this.editFormVisible = false;
                                    this.getUsers();
                                    this.querySuccess(res.data.id, '更改成功', '更改失败');
                                }
                                else{
							        this.$message.error(res.data.msg);
								}
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
							    if(res.data.code==200) {
                                    this.addLoading = false;
                                    //NProgress.done();
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });

                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                    this.getUsers();
                                }
                                else{
							        this.$message.error(res.data.msg);
								}
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},*/
			//批量删除
			/*batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						if(res.data.code==200) {
                            this.listLoading = false;
                            //NProgress.done();

                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getUsers();
                        }
                        else{
						    $this.$message.error(res.data.msg);
						}

					});
				}).catch(() => {

				});
			}
			*/
		},
		mounted() {
			this.getUsers();
			this.loadTeam();
			this.getChals();
			this.getTeams();
			setInterval(()=>{
			    console.log('getAttack');
			    this.getAttack()
			},2000)
		},
		updated:function(){
            this.$nextTick(function(){
                let div = document.getElementById('attacks');
                div.scrollTop = div.scrollHeight;
            })
		}
	}

</script>

<style scoped>

	.text {
		font-size: 14px;
	}

	.item {
		padding: 5px 0;
	}

	.box-card {
		margin-bottom:15px;
	}
</style>