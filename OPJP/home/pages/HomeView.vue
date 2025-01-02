<template>
    <v-container fluid>
      <v-app-bar app>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-app-bar-title>OPJP Library</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn text v-for="link in navLinks" :key="link.text" :href="link.href">
          {{ link.text }}
        </v-btn>
      </v-app-bar>
  
      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <v-sheet class="pa-4 mt-8" elevation="2">
                <img :src="imageSrc" alt="Home Image" class="home-image" />
                <div class="text-container">
                  <h1 class="text-center display-2 font-weight-bold mb-4">
                    "The smartest way to borrow books—your library, now online."
                  </h1>
                  <p class="text-center subtitle-1">SKN08 SECOND PROJECT</p>
                  <p class="text-center description">
                    OPJP는 원하는 책을, 원하는 순간에, <br />
                    구독형 도서 대여의 시대를 여는 시발점이 될 것입니다.
                  </p>
                  <div class="text-center mt-4">
                    <v-btn class="ma-2" color="primary" @click="goToBookList">
                      도서관
                    </v-btn>
                    <v-btn class="ma-2" color="success" @click="goToSubscriptionList">
                      구독하기
                    </v-btn>
                    <v-btn class="ma-2" color="info" @click="goToBookmarkList">
                      내 북마크
                    </v-btn>
                  </div>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
  
      <v-footer app>
        <div class="text-center w-100">
          <p>법인명(상호): 주식회사 OPJP 대표자(성명): 오민수 사업자 등록번호 안내: [123-456-7]</p>
          <p>통신판매 신고 제 2024-엔코어-1818호 주소: 서울특별시 금천구 가산디지털1로 18 엔코어 18층</p>
          <p>이메일: encore@kakao.com | 전화: 02-1234-5678</p>
          <p>&copy; 2024 OPJP Korea LLM. All Rights Reserved.</p>
        </div>
      </v-footer>
  
      <v-snackbar v-model="snackbar" :timeout="2000">
        {{ snackbarText }}
      </v-snackbar>
    </v-container>
  </template>
  
  <script>
  import imageSrc from "@/assets/images/fixed/고양이 사진.webp";
  
  export default {
    name: "HomeView",
    data: () => ({
      navLinks: [
        { text: "홈", href: "#" },
        { text: "소개", href: "#" },
        { text: "서비스", href: "#" },
        { text: "연락처", href: "#" },
      ],
      imageSrc,
      snackbar: false,
      snackbarText: "",
    }),
    methods: {
      goToBookList() {
        this.showSnackbar("도서관 페이지로 이동합니다.");
      },
      goToSubscriptionList() {
        this.showSnackbar("구독 페이지로 이동합니다.");
      },
      goToBookmarkList() {
        this.showSnackbar("북마크 페이지로 이동합니다.");
      },
      showSnackbar(message) {
        this.snackbarText = message;
        this.snackbar = true;
      },
    },
  };
  </script>
  
  <style scoped>
  .home-image {
    width: 100%;
    height: auto;
    margin: auto;
    display: block;
    object-fit: cover;
  }
  
  .text-container {
    margin-top: 20px;
    text-align: center;
  }
  
  .subtitle-1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .description {
    font-size: 1rem;
    color: #777;
  }
  
  .footer-container {
    text-align: center;
    padding: 20px;
    background-color: #000;
    color: #fff;
  }
  </style>
  