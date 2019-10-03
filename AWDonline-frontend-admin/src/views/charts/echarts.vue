<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="18">
                <div id="chartColumn" style="width:100%; height: 800px;
"></div>
            </el-col>
            <el-col :span="6">
                <el-table
                        :data="tableData"
                        stripe
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="nickname"
                            label="队名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="score"
                            label="得分"
                            min-width="180">
                    </el-table-column>
                </el-table>
            </el-col>
            <!--<el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>-->
            <!--<el-col :span="24">
                <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
            </el-col>-->
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import {getUserList} from "../../api/api";

    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                tableData:[],
                teams:[],
                scores:[]
            }
        },

        methods: {
            drawColumnChart() {

                    this.chartColumn = echarts.init(document.getElementById('chartColumn'),'dark');
                    this.chartColumn.setOption({
                        title: {text: 'top Ten 排行榜'},
                        tooltip: {},
                        xAxis: {
                            data: this.teams,
                            axisLabel: {
                                inside: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            axisTick: {
                                alignWithLabel:true
                            },
                            axisLine: {
                                show: true
                            },
                            z: 10
                        },
                        yAxis: {
                            axisLine: {
                                show: true
                            },
                            axisTick: {
                                show: true
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        dataZoom: [
                            {
                                type: 'inside'
                            }
                        ],
                        series: [{
                            name: '分数',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                            barGap:'-100%',
                            barCategoryGap:'40%',

                            animation: false,
                            data: this.scores
                        }]
                    });

            },

            drawCharts() {
                getUserList({'name':''}).then((res)=> {

                    //let Teams=[];
                    //let scores=[];
                    let ans = res.data.users;
                    ans.sort((a, b) => {
                        if (a.score > b.score) {
                            return -1
                        }
                        else if (a.score < b.score) {
                            return 1
                        }
                        else return 0;
                    })
                    this.tableData = ans;
                    let i = 0;
                    for (let team of res.data.users) {
                        this.teams.push(team.nickname);
                        this.scores.push(team.score);
                        i++;
                        if (i == 10) break;
                    }
                    this.drawColumnChart();

                });
/*
                getUserList({'name':''}).then((res)=> {
                    let Teams = [];
                    let scores = [];
                    let ans = res.data.users;
                    ans.sort((a, b) => {
                        if (a.score > b.score) {
                            return 1
                        }
                        else if (a.score < b.score) {
                            return -1
                        }
                        else return 0;
                    })
                    this.tableData = ans;
                    let i = 0;
                    for (let team of ans) {
                        Teams.push(team.nickname);
                        scores.push(team.score);
                        i++;
                        if (i == 10) break;
                    }
                    this.scores=scores;
                    this.drawColumnChart();
                });
                /* this.drawBarChart()
                 this.drawLineChart()
                 this.drawPieChart()*/
            },
        },

        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawColumnChart();
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
        height:100%;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
