<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="startAward">开始比赛</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="pauseAward">暂停比赛</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="unpauseAward">恢复比赛</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="danger" @click="endAward">结束比赛</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="instances" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="min-width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="实例名称" min-width="180" sortable>
			</el-table-column>
			<!--<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
			</el-table-column>-->
			<el-table-column prop="teamname" label="队伍名" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="chalname" label="chal名称" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="ip" label="ip" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="password" label="ssh密码" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="status" label="状态" min-width="100" sortable>
			</el-table-column>
			<!--<el-table-column prop="birth" label="得分" width="120" sortable>
			</el-table-column>-->
			<!--
			<el-table-column prop="addr" label="地址" min-width="180" sortable>
			</el-table-column>-->
			<el-table-column label="操作" min-width="200">
				<template scope="scope">
					<el-button size="small" @click="handleRestart(scope.$index, scope.row)">重启</el-button>
					<el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">更改ssh密码</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
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
	import { getInstancesListPage, removeUser, batchRemoveUser, editInstance, addUser, restartInstance, confirmMessageCallback ,startAll, pauseAll, unpauseAll, endAll} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				instances: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

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
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
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
			},
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
                        setTimeout(()=> {
                            return this.querySuccess(id, succMess, failMess);
                        },500);
					}
                })
			},
			//显示编辑界面
			handleRestart: function (index, row) {
				/**/
				this.$confirm('确认要重启吗？','提示',{}).then(()=>{
                   let para={'id':row.id};
                   restartInstance(para).then((res)=>{
                       console.log(res);
                       this.$message({
						   'message':res.data.msg,
						   'type':'success'
					   });
                       setTimeout(()=> {
                           this.querySuccess(res.data.id, '重启成功', '重启失败');
                       },500);
				   })
				})
			},
			handleEdit:function(index,row){
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			startAward: function () {
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
			},
			pauseAward:function(){
                this.$confirm('确定暂停比赛吗?','提示',{}).then(()=>{
                    let para={};
                    pauseAll(para).then((res)=>{
                        console.log((res));
                        this.$message({
                            'message':res.data.msg,
                            'type':'success'
                        });
                        this.querySuccess(res.data.id,'比赛已暂停','暂停比赛失败').then((res)=>{
                            this.getUsers();
                        })
                    })
                })
			},
			unpauseAward:function(){
                this.$confirm('确定恢复比赛吗?','提示',{}).then(()=>{
                    let para={};
                    unpauseAll(para).then((res)=>{
                        console.log((res));
                        this.$message({
                            'message':res.data.msg,
                            'type':'success'
                        });
                        this.querySuccess(res.data.id,'比赛已恢复','恢复比赛失败').then((res)=>{
                            this.getUsers();
                        })
                    })
                })
			},
			endAward:function(){
                this.$confirm('确定结束比赛吗?后台服务进程将被杀死','提示',{}).then(()=>{
                    let para={};
                    endAll(para).then((res)=>{
                        console.log((res));
                        this.$message({
                            'message':res.data.msg,
                            'type':'success'
                        });
                        this.querySuccess(res.data.id,'比赛已结束','结束比赛失败').then((res)=>{
                            this.getUsers();
                        })
                    })
                })
			},
			//编辑
			editSubmit: function () {
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
			},
			//批量删除
			batchRemove: function () {
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
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>