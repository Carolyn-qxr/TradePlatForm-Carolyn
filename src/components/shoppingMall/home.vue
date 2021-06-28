<template>
    <div>
        <app-head></app-head>
        <app-body>
            <div style="min-height: 85vh;">
<!--                <el-tabs v-model="labelName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="0"></el-tab-pane>
                    <el-tab-pane label="数码" name="1"></el-tab-pane>
                    <el-tab-pane label="家电" name="2"></el-tab-pane>
                    <el-tab-pane label="户外" name="3"></el-tab-pane>
                    <el-tab-pane label="图书" name="4"></el-tab-pane>
                    <el-tab-pane label="其他" name="5"></el-tab-pane>
                </el-tabs>-->

            </div>
            <app-foot></app-foot>
        </app-body>
    </div>
</template>

<script>
    import AppHead from '../shoppingMall/shopping_modules/AppHeader';
    import AppBody from '../shoppingMall/shopping_modules/AppPageBody'
    import AppFoot from '../shoppingMall/shopping_modules/AppFoot'
    //import releaseGoods from "./enter_modules/releaseGoods";
    export default {
        name: "index",
        components: {
            AppHead,
            AppBody,
            AppFoot,
        },
        data() {
            return {
                labelName: '0',
                idleList: [],
                currentPage: 1,
                totalItem:1,
            };
        },
        methods: {
            login(){
                this.$router.push({path: '/login'})
            },

        }
    }
</script>

<style scoped>

</style>