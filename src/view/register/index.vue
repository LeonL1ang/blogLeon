<template>
<Row style="margin-top:100px;">
    <Col span="8" offset=8>    
        <Spin size="large" fix v-if="isLoading"></Spin>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="邮箱：" prop="mail">
                <Input type="email" v-model="formValidate.mail" @on-search="getEmailCode('formValidate')" placeholder="" search enter-button="获取验证码"></Input>
            </FormItem>        
            <FormItem label="验证码：" prop="code">
                <Input v-model="formValidate.code" placeholder=""></Input>
            </FormItem>      
            <FormItem label="密码：" prop="password">
                <Input type="password" v-model="formValidate.password" placeholder=""></Input>
            </FormItem>   
            <FormItem label="名字：" prop="name">
                <Input v-model="formValidate.name" placeholder=""></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">注册</Button>
                <Button @click="breakPage" style="margin-left: 8px">返回</Button>
            </FormItem>
        </Form>
    </Col>
</Row>
</template>
<script>
    export default {
        inject: ['reloadHeaderLogin'],
        data () {
            return {
                isSendEmail: false,
                isLoading: false,
                formValidate: {
                    name: '',
                    mail: '',
                    password: '',
                    code: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '名字不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '验证码不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        this.isLoading = true
                        this.$http.post(
                            '/auth/user/register/' + this.formValidate.code,
                            {
                                email: this.formValidate.mail,
                                name: this.formValidate.name,
                                password: this.formValidate.password
                            }
                        ).then( (res) => {  
                            res = res.data         
                            this.isLoading = false
                            if(res.code === 2000){
                                // 保存token
                                // 根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
                                this.$store.commit('ADD_COUNT', res.data)                                
                                this.reloadHeaderLogin()
                                this.$router.push('/')                                
                            }else{                                
                                this.$Message.error(res.message)
                            }
                        }).catch(err => {
                            this.isLoading = false
                            this.$Message.error(err + '')
                        })
                    } else {
                        // this.$Message.error('Fail!');
                    }
                })
            },
            breakPage () {                
                this.$router.back(-1)
            },
            getEmailCode(name){
                 this.$refs[name].validateField('mail', (err) => {
                     if(err === ''){
                        if(this.isSendEmail === false){
                             this.isSendEmail = true
                             this.$http.post(
                             '/auth/user/sendMailCode/' + this.formValidate.mail,                    
                         ).then( res => {  
                            res = res.data         
                            if(res.code === 2000){
                                this.$Message.success('邮件发送成功')
                            }else{                                
                                this.isSendEmail = false
                            }
                         }).catch( err => {                                
                            this.isSendEmail = false                          
                            this.$Message.error(err + '')
                         })
                        }else{                            
                            this.$Message.success('邮件已发送')
                        }
                     }
                 })
            }
        }
    }
</script>
