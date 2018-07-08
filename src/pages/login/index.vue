<template>
    <div id="login">
        <div class="top">
            <div class="title">
                <img class="titleImg" src="~assets/images/index/logo.jpg" />
                <span class="titleWord">欢迎登录华润置地供应商管理系统</span>
            </div>
        </div>
        <div class="banner">
            <div class="login">
                <div class="loginBox">
                    <div class="wel">
                        欢迎登录系统
                    </div>
                    <div class="pls">
                        请登录
                    </div>
                    <div class="loginForm">
                        <el-form :model="form" :rules="rules" ref="form">
                            <el-form-item prop="username">
                                <el-input type="text" name="username" v-model="form.username" placeholder="请输入用户名" />
                                <el-input type="text" class="perventAutoComplete" disabled/>
                            </el-form-item>
                            <el-form-item prop="password">
                                <span class="showPsw" :class="pswParam.icon" @click="showPassword"></span>
                                <el-input :type="pswParam.type" class="passwordInput" name="password" v-model="form.password" placeholder="请输入密码" @keyup.enter.native="login" @keypress.native="checkCapsLock" />
                            </el-form-item>
                            <div class="showTags">
                                <span v-if="showTags">
                                	提示！大写锁定已打开
                                </span>
                            </div>
                            <el-button type="button" class="btn btn-primary" @click="login">Sign in</el-button>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="footer">
                <img src="~assets/images/index/company.png" />
                <span>版权所有 华润（集团）有限公司</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        LoginForm,
        LoginRule
    } from "./entity";

    export default {
        computed: {
            pswParam: function() {
                let res = {}
                if(this.showPsw) {
                    res.type = "text"
                    res.icon = "fa fa-eye-slash"
                } else {
                    res.type = "password"
                    res.icon = "fa fa-eye"
                }
                return res
            }
        },
        data() {
            return {
                showTags: false,
                showPsw: false,
                form: LoginForm(),
                rules: LoginRule()
            }
        },
        methods: {
            login() {
                this.$refs.form.validate(valid => {
                    this.loading = false;
                    if(valid) {
                        this.$store.dispatch('login', this.form.export()).then(() => {
                          console.log(this.$store.getters.routes)
                            this.$router.addRoutes(this.$store.getters.routes)
                            this.$router.push({
                                path: '/check/supplierList'
                            });
                        });
                    }
                });
            },
            checkCapsLock(e) {
                var capsLockKey = e.keyCode ? e.keyCode : e.which;
                var shifKey = e.shiftKey ? e.shiftKey : ((capsLockKey == 16) ? true : false);
                if(((capsLockKey >= 65 && capsLockKey <= 90) && !shifKey) || ((capsLockKey >= 97 && capsLockKey <= 122) && shifKey)) {
                    this.showTags = true;
                } else if(((capsLockKey >= 65 && capsLockKey <= 90) && shifKey) || ((capsLockKey >= 97 && capsLockKey <= 122) && !shifKey)) {
                    this.showTags = false;
                }
            },
            showPassword() {
                this.showPsw = !this.showPsw
            }
        }
    }
</script>

<style lang="less">
    #login {
        height: 100%;
        width: 100%;
        background-color: #FFF;
        .top {
            position: absolute;
            top: 0;
            height: 15%;
            width: 100%;
            .title {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 10%;
                .titleWord {
                    font-size: 22px;
                    letter-spacing: 2px;
                    line-height: 70px;
                    float: left;
                }
                .titleImg {
                    float: left;
                    margin-right: 20px;
                    height: 70px;
                    width: 70px;
                }
            }
        }
        .banner {
            height: 75%;
            width: 100%;
            background-image: url("~assets/images/index/bg.jpg");
            background-size: 100% 100%;
            position: absolute;
            top: 15%;
            >div {
                height: 100%;
                width: 50%;
                float: right;
                position: relative;
            }
            >.login .loginBox {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 400px;
                width: 360px;
                background: #FFF;
                padding: 25px;
                >.wel {
                    text-align: center;
                    padding: 10px;
                    color: #409EFF;
                    font-size: 22px;
                    font-weight: bolder;
                    letter-spacing: 2px;
                }
                >.pls {
                    text-align: center;
                    padding: 10px;
                    color: #666;
                }
                .loginForm {
                    float: left;
                    width: 100%;
                    padding-top: 20px;
                    .el-input__inner {
                        display: inline-block;
                        height: 50px;
                    }
                    .userPwdInput {
                        margin-top: 20px;
                    }
                    button {
                        width: 100%;
                        height: 50px;
                        background-color: #409EFF;
                        margin-top: 22px;
                        color: #fff;
                    }
                    .perventAutoComplete {
                        opacity: 0;
                        height: 0;
                        overflow: hidden;
                        display: block;
                    }
                    .showPsw {
                        position: absolute;
                        right: 10px;
                        top: 16px;
                        z-index: 2;
                        font-size: 18px;
                        color: #999;
                        cursor: pointer;
                    }
                    .showTags {
                        color: red;
                        text-align: right;
                        height: 20px;
                    }
                    .perventAutoComplete input {
                        height: 0;
                    }
                }
            }
        }
        >.bottom {
            position: absolute;
            bottom: 0;
            height: 10%;
            width: 100%;
            text-align: center;
            .footer {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                span {
                    border-left: 1px solid #ccc;
                    margin-left: 20px;
                    padding-left: 20px;
                    line-height: 50px;
                    float: left;
                }
                img {
                    float: left;
                }
            }
        }
    }
</style>
