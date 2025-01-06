<template>
    <v-app-bar app color="primary" dark>
        <v-btn @click="goToHome">
            <v-toolbar-title>OPJP</v-toolbar-title>
        </v-btn>

        <v-spacer></v-spacer>

        <template v-if="!kakaoAuthentication.isAuthenticated">
            <v-btn text @click="signIn" class="btn-text">
                <v-icon left>mdi-login</v-icon>
                <span>로그인</span>
            </v-btn>
        </template>

        <template v-else>
            <v-btn text @click="signOut" class="btn-text">
                <v-icon left>mdi-logout</v-icon>
                <span>로그아웃</span>
            </v-btn>
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useKakaoAuthenticationStore } from '~/kakaoAuthentication/stores/kakaoAuthenticationStore';

const router = useRouter()
const kakaoAuthentication = useKakaoAuthenticationStore();

const goToHome = () => {
  router.push('/')
}

const signIn = () => {
  console.log('로그인 클릭')
  router.push('/account/login')
}

const signOut = () => {
  console.log('로그아웃 클릭')
  const userToken = localStorage.getItem("userToken")

  if (userToken != null) {
    kakaoAuthentication.requestLogout(userToken)
  } else {
    console.log('userToken이 없습니다')
  }

  localStorage.removeItem("userToken")
  kakaoAuthentication.isAuthenticated = false
  router.push('/')
}

onMounted(async () => {
  const userToken = localStorage.getItem('userToken');
  
  if (userToken) {
    const isValid = await kakaoAuthentication.requestValidationUserToken(userToken)
    kakaoAuthentication.isAuthenticated = isValid;
  }
});
</script>
