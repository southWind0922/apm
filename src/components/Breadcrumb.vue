<template>
    <div class="headBreadcrumb">
        <div class="container">
            <span class="fa fa-map-marker"></span>
            <div class="breadcrumb">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: item.path }" v-for="item in data" :key="item.id" v-if="item.name">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            this.data = this.$route.matched || []
        },
        data() {
            return {
                data: []
            };
        }
    };
</script>

<style lang="less" scoped>
    .headBreadcrumb {
        height: 50px;
        width: 100%;
        position: relative;
        border-bottom: 1px solid rgb(220, 220, 220);
        .container {
            position: absolute;
            top: 50%;
            left: 25px;
            transform: translateY(-50%);
            >span {
                float: left;
                font-size: 18px;
                color: #ADADAF;
                margin-right: 8px;
                position: relative;
                top: -2px
            }
            >.breadcrumb {
                float: left;
            }
        }
    }
</style>