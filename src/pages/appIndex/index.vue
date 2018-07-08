<template>
    <div id="appIndex">
        <div class="head">
            <headMenu></headMenu>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import headMenu from "@/components/headMenu"

    export default {
        components: {
            headMenu
        },
        name: 'appIndex'
    }
</script>

<style lang="less">
    #appIndex {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        >.head {
            height: 60px;
            width: 100%;
            position: relative;
        }
        >.container {
            height: 0;
            width: 100%;
            flex: auto;
            >div {
                height: 100%;
                width: 100%;
                position: relative;
            }
        }
    }
</style>