<template>
    <div class="home-container">
        <img :src="imageSrc" alt="Home Image" class="home-image" />

        <div class="text-container">
            <h2 class="title">"The smartest way to borrow books—your library, now online."</h2>
            <div style="margin-top: 60px; margin-bottom: 20px"></div>
            <p class="subtitle">SKN08 SECOND PROJECT</p>
            <div style="margin-bottom: 10px"></div>
            <p class="description">
                OPJP는 원하는 책을, 원하는 순간에, <br />
                구독형 도서 대여의 시대를 여는 시발점이 될 것입니다.
            </p>
            <div class="buttons">
                <button class="goTobook-button" @click="goToBookList">
                    도서관
                </button>
                <button class="goToSubscription-button" @click="goToSubscriptionList">
                    구독하기
                </button>
                <button class="goToBookmark-button" @click="goToBookmarkList">
                    내 북마크
                </button>
            </div>
        </div>

        <div class="footer-container">
            <p class="company-info">
                법인명(상호): 주식회사 OPJP 대표자(성명): 오민수 사업자 등록번호 안내: [123-456-7]
            </p>
            <p class="contact-info">
                통신판매 신고 제 2024-엔코어-1818호 주소: 서울특별시 금천구 가산디지털1로
                18 엔코어 18층<br />
                이메일: encore@kakao.com 전화: 02-1234-5678 (주) OPJP
            </p>
            <p class="reserved-info">2024 OPJP Korea LLM. All Rights Reserved.</p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import imageSrc from "@/assets/images/homeImage/image1.jpg";
import router from "@/router";
import { mapAction, mapState } from "vuex";
import AuthenticationModule from "../../authentication/store/authenticationModule";
const authenticationModule = "authenticationModule";

export default defineComponent ({
    name: "HomeView",
    data() {
        return {
            imageSrc,
        };
    },
    computed: {
        ...mapState(authenticationModule, ["isAuthenticated"]),
    },
    methods: {
        ...mapAction(AuthenticationModule, ["requestLogoutToDjango"]),

        goToBookList() {
            router.path("/book/list");
        },
        goToSubscriptionList() {
            router.path("/subscription/list");
        },
        goToBookmarkList() {
            router.path("/bookmark/list");
        },
    },
});
</script>

<style scoped>
.home-container {
    text-align: center;
}

.home-image {
    width: 100%;
    height: auto;
    margin: auto;
    display: block;
    object-fit: cover;
}

.text-container {
    margin-top: 20px;
}

.subtitle {
    font-size: 35px;
    font-weight: bold;
}

.title {
    font-size: 30px;
    font-weight: bold;
    margin: 10px 0;
}

.description {
    font-size: 18px;
    color: #777;
}

.buttons {
    margin-top: 20px;
}

.goTobook-button,
.goToSubscription-button,
.goToBookmark-button {
    background-color: black;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 20px;
    cursor: pointer;
    border-radius: 10px;
    font-size: 20px;
    width: 300px;
}

.goTobook-button:hover,
.goToSubscription-button:hover,
.goToBookmark-button:hover {
    background-color: rgba(87, 133, 57, 0.908);
}

.footer-container {
    text-align: left;
    margin-top: 50px;
    padding: 20px;
    background-color: #000000;
}

.footer-container p {
    color: #9b9b9b;
    font-size: 13px;
}

.company-info,
.contact-info {
    margin: 10px 0;
    color: #555;
}

</style>