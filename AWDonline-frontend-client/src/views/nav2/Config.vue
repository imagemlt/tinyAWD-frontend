<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="用户名">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
<!--		<el-form-item label="活动区域">
			<el-select v-model="form.region" placeholder="请选择活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="活动时间">
			<el-col :span="11">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
				<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
			</el-col>
		</el-form-item>-->
<!--		<el-form-item label="即时配送">
			<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
		</el-form-item>-->
<!--		<el-form-item label="chal"> e"></el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		-->
		<el-form-item label="昵称">
			<el-input v-model="form.nickname"></el-input>
		</el-form-item>

		<el-form-item label="原密码">
			<el-input type="password" v-model="form.old_password"></el-input>
		</el-form-item>
		<el-form-item label="新密码">
			<el-input type="password" v-model="form.password"></el-input>
		</el-form-item>
		<el-form-item label="确认密码">
			<el-input type="password" v-model="form.password_confirm"></el-input>
		</el-form-item>
		<!--

		<el-form-item label="启动指令">
			<el-input v-model="form.command"></el-input>
		</el-form-item>
		<el-form-item label="更新flag指令">
			<el-input v-model="form.flagcommand"></el-input>
		</el-form-item>

		<el-form-item label="chal描述">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>
		-->
		<el-form-item>
			<el-button type="primary" @click="onSubmit">更改</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>

	</el-form>
</template>

<script>
	import {getTeamInfo,editTeamInfo} from "../../api/api";

    export default {
		data() {
			return {
				form: {
					name: 'test1',
					nickname:'',
					old_password:'',
					password:'',
					password_confirm:''
				}
			}
		},
		methods: {
            onSubmit() {
                if (this.$data.form.password != this.$data.form.password_confirm) {
                    this.$message.error('两次密码不一致！');
                }
                else {
                    console.log('submit!');
                    this.editTeamInfo();
                    console.log(this.$data.form.type);
                }
            },
            loadInfo(){
                getTeamInfo({}).then(res=> {
                    this.form = Object.assign({}, res.data.user);
                });
            },
			editTeamInfo(){
                editTeamInfo(this.form).then(res=>{
                    if(res.data.code==200){
                        this.$message({
							message:'编辑成功',
							type:'success'
						});
                        this.loadInfo();
					}
					else{
                        this.$message.error(res.data.msg);
					}
				})
			},

        },
        mounted(){
            //console.log('mounted');
            this.loadInfo();
        }
	}

</script>
<style lang='scss'>
.el-form-item__label{
	text-align:left;
}
</style>