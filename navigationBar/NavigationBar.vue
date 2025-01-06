<template>
  <!-- Vuetify의 App Bar를 사용하여 네비게이션 바 구성 -->
  <v-app-bar app color="primary" dark>
    <!-- 홈 버튼: 브랜드명 "OPJP"로 설정 -->
    <v-btn @click="goToHome">
      <v-toolbar-title>OPJP</v-toolbar-title>
    </v-btn>

    <!-- 우측 공간을 채우기 위한 spacer -->
    <v-spacer></v-spacer>

    <!-- 로그인 여부에 따라 항목이 변경 -->
    <template v-if="!kakaoAuthentication.isAuthenticated">
      <!-- 로그인 전: 로그인, 고객센터, 구독 버튼 -->
      <v-btn text @click="goToLogin" class="btn-text">
        <v-icon left>mdi-login</v-icon>
        <span>로그인</span>
      </v-btn>
      <v-btn text @click="goToSupport" class="btn-text">
        <v-icon left>mdi-headset"></v-icon>
        <span>고객센터</span>
      </v-btn>
      <v-btn text @click="goToSubscription" class="btn-text">
        <v-icon left>mdi-book-open"></v-icon>
        <span>구독</span>
      </v-btn>
    </template>
    <template v-else>
      <!-- 로그인 후: 내 서재, 검색, 로그아웃 버튼 -->
      <v-btn text @click="goToLibrary" class="btn-text">
        <v-icon left>mdi-bookshelf"></v-icon>
        <span>내 서재</span>
      </v-btn>
      <v-btn text @click="goToSearch" class="btn-text">
        <v-icon left>mdi-magnify"></v-icon>
        <span>검색</span>
      </v-btn>
      <v-btn text @click="signOut" class="btn-text">
        <v-icon left>mdi-logout"></v-icon>
        <span>로그아웃</span>
      </v-btn>
    </template>

    <!-- 로그인 및 페이지 이동 스낵바 -->
    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ snackbarText }}
    </v-snackbar>
  </v-app-bar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useKakaoAuthenticationStore } from '~/kakaoAuthentication/stores/kakaoAuthenticationStore';

const router = useRouter();
const kakaoAuthentication = useKakaoAuthenticationStore();

const snackbar = ref(false);
const snackbarText = ref("");

const goToHome = () => {
  showSnackbar("홈으로 이동합니다.");
  router.push('/');
};

const goToLogin = () => {
  showSnackbar("로그인 페이지로 이동합니다.");
  router.push('/login');
};

const goToSupport = () => {
  showSnackbar("고객센터 페이지로 이동합니다.");
  router.push('/support');
};

const goToSubscription = () => {
  showSnackbar("구독 페이지로 이동합니다.");
  router.push('/subscription');
};

const goToLibrary = () => {
  showSnackbar("내 서재로 이동합니다.");
  router.push('/library');
};

const goToSearch = () => {
  showSnackbar("검색 페이지로 이동합니다.");
  router.push('/search');
};

const signOut = () => {
  // kakaoAuthentication.isAuthenticated = false;
  localStorage.removeItem('userToken');
  showSnackbar("로그아웃 되었습니다.");
  router.push('/');
};

const showSnackbar = (message: string) => {
  snackbarText.value = message;
  snackbar.value = true;
};

onMounted(async () => {
  const userToken = localStorage.getItem('userToken');
  if (userToken) {
    const isValid = await kakaoAuthentication.requestValidationUserToken(userToken);
    kakaoAuthentication.isAuthenticated = isValid;
  }
});
</script>

<style scoped>
.btn-text {
  font-weight: bold;
}

</style>
