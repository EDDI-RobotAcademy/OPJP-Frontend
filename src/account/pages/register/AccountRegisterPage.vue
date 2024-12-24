<template>
    <v-container class="register-container" fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card>
                    <v-card-title>
                        <span class="headline">간편 신규 가입</span>
                    </v-card-title>

                    
                    <v-responsive class="mx-auto" min-width="400">
                        <v-form ref="form" v-model="formValid" lazy-validation>
                            <v-text-field
                                v-model="email"
                                label="Email"
                                variant="solo"
                                required
                                :rules="emailRules"
                                :disabled="true"/>
                            
                            <v-row align="center">
                                <v-col cols="10">
                                    <v-text-field
                                        v-model="nickname"
                                        label="Nickname"
                                        required
                                        :rules="nicknameRules"
                                        :error-message="nicknameErrorMessages"/>
                                </v-col>

                                <v-col cols="2">
                                    <v-btn
                                        color="gb(200, 255, 0)"
                                        style="color: black; width: 90px"
                                        small
                                        :disabled="
                                            nickname == '' ||
                                            isNicknameValid == true"
                                        type="button"
                                        @click="checkNicknameDuplication">
                                        중복 검사
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <div v-if="isNicknameValid" class="valid-nickname-box" style="color: chartreuse;">
                                        사용 가능한 닉네임입니다.
                            </div>

                            <div style="margin-top: 32px;">
                                <v-radio-group
                                    v-model="gender"
                                    inline
                                    label="성별"
                                    color="black">
                                <v-radio
                                    label="남성"
                                    value="MALE"
                                    color="cyan"
                                    base-color="white"
                                ></v-radio>
                                <v-radio
                                    label="여성"
                                    value="FEMALE"
                                    color="pink"
                                    base-color="white"
                                ></v-radio>
                                </v-radio-group>
                            </div>


                        <v-text-field
                            v-model="birthyear"
                            label="출생년도"
                            :rules="birthyearRules"
                            required
                        />

                        </v-form>
                    </v-responsive>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="black"
                                @click="submitForm"
                                :disabled="!isValidForSubmission">
                            회원가입 하기
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

const authenticationModule = 'authenticationModule'
const accountModule = 'accountModule'

export default {
    data() {
        return {
            formValid: false,
            email: '',
            nickname: '',
            emailRules: [
                v => !!v || 'Email 은 필수입니다!',
                v => /.+@.+\..+/.test(v) || '유효한 Email 주소를 입력하세요!'
            ],
            nicknameRules: [v => !!v || 'Nickname은 필수입니다!'],
            // passwordRules: [v => !!v || 'Password는 필수입니다!'],
            gender: "MALE",
            birthyear: '',
            nicknameErrorMessages: [],
            isNicknameValid: false,
            birthyearRules: [
                v => !!v || '출생년도는 필수입니다!',
                v => /^\d+S/.test(v) || '출생년도는 숫자여야 합니다!',
                v => v.length === 4 || '출생년도는 4자리야야 합니다!',
            ],
        }
    },
    async created () {
        await this.requestUserInfo()
    },
    computed: {
        inValidForSubmission () {
            return this.formValid && this.isNicknameValid && this.age !== 0;
        },
    },
    methods: {
        ...mapActions(authenticationModule, ['requestUserInfoToDjango', 'requestRedisAccessTokenToDjango']),
        ...mapActions(accountModule, ['requestNicknameDuplicationCheckToDjango', 'requestCreateNewAccountToDjango']),

        async requestUserInfo () {
            try {
                const userInfo = await this.requestUserInfoToDjango()
                this.email = userInfo.kakao_account.email
            } catch (error) {
                console.error('에러:', error)
                alert('사용자 정보를 가져오는데 실패하였습니다!')
            }
        },
        async checkNicknameDuplication () {
            console.log('닉네임 중복 검사 누름')
        }
    }
}
</script>