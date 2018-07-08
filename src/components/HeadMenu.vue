<template>
    <header class="singularity-header">
        <div class="logo">
            <img src="~assets/images/index/logo.jpg" />
            <span>供应商信息管理平台</span>
        </div>
        <div class="menu">
            <ul>
                <li v-for="item in data" :key="item.id" v-if="!item.disabled">
                    <router-link :to="item.url">
                        {{item.name}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="loginBox">
            <div class="tool">
                <span class="icon-bell-alt"></span>
                <span class="icon-user"></span>
                <div class="off" @click="logout">
                    <span class="fa fa-power-off"></span>
                    <span>退出</span>
                </div>
                <span id="username">
		          <marquee direction="left" width="150px" scrollamount="4">欢迎登陆,{{userInfo.name}}</marquee>
		        </span>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        created() {
            this.data = this.$store.getters.menu;
            this.userInfo = this.$store.getters.userInfo;
        },
        data() {
            return {
                data: [],
                userInfo: {}
            };
        },
        methods: {
            logout() {
                window.location.href = "/"
                this.$store.dispatch('logout').then(() => {
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .singularity-header {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 3;
        background: #409EFF;
        display: flex;
        .logo {
            float: left;
            height: 100%;
            overflow: hidden;
            font: 400 18px "CenturyGothic";
            padding: 13px 25px;
            letter-spacing: 2px;
            color: #FFF;
            img {
                float: left;
                margin-right: 15px;
                position: relative;
                top: -2px;
                width: 35px;
            }
            span {
                float: left;
                line-height: 30px;
            }
        }
        .menu {
            height: 100%;
            width: 0;
            flex: auto;
            ul {
                padding: 0 10px 0 10px;
                float: left;
                position: absolute;
                height: 100%;
                overflow: hidden;
                transition: all linear 0.3s;
                li {
                    position: relative;
                    float: left;
                    display: block;
                    height: 100%;
                    width: 130px;
                    font: 400 14px "microsoft yahei";
                    text-align: center;
                    cursor: pointer;
                    a {
                        display: inline-block;
                        height: 100%;
                        width: 100%;
                        padding: 19px 0;
                        color: #FFF;
                        text-align: center;
                    }
                    a.router-link-active {
                        color: #409EFF;
                        background: #FFF
                    }
                    a.router-link-active:hover {
                        color: #409EFF;
                        background: #FFF
                    }
                    a:hover {
                        color: #409EFF;
                        background: rgba(255, 255, 255, 0.7)
                    }
                }
            }
        }
        .loginBox {
            height: 100%;
            color: #000;
            width: 320px;
            .tool {
                height: 100%;
                width: 100%;
                line-height: 58px;
                vertical-align: top;
                position: relative;
                >span {
                    color: #71AFF2;
                    font-size: 16px;
                    margin: 0px 12px;
                    cursor: pointer;
                }
                span#username {
                    float: right;
                    font-size: 14px;
                    letter-spacing: 1px;
                    margin-left: -5px;
                    cursor: default;
                    color: #E5EAF0;
                }
            }
            div.off {
                float: right;
                height: 100%;
                width: 75px;
                color: #E5EAF0;
                cursor: pointer;
                span:first-of-type {
                    margin-right: 8px;
                    cursor: pointer;
                }
            }
        }
    }
</style>