<template>
    <div class="wallet-header">
        <div class="header-container">
            <div class="app-name">校园二手交易平台-钱包</div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return{

            }
        },
        created() {
        },
        methods: {

        }
    }
</script>
<style scoped>
    .wallet-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 58px;
        background: #ffffff;
        display: flex;
        justify-content: center;
        border-bottom: #eeeeee solid 2px;
        z-index: 1000;
    }

    .header-container {
        width: 1000px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .app-name  {
        color: #409EFF;
        font-size: 24px;
        text-decoration: none;
    }

    .search-container {
        width: 300px;
    }
    .user-name-text{
        font-size: 16px;
        font-weight: 600;
        color: #409EFF;
        cursor: pointer;
        text-decoration: none;
    }
    .dropdown{
        position: absolute;
        top: 20px;
    }
</style>
