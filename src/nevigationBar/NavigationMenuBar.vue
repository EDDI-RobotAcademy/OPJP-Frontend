<template>
    <v-app-bar color="black" app dark height="64">
    <v-toolbar-title class="navbar-title">
        <v-btn text @click="goToHome" class="navbar-title-btn">
            <span>OPJP</span>
        </v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn text @click="goToBookList" class="btn-text">
        <span>BOOKS</span>
    </v-btn>

    <v-btn text @click="goToSubscriptionList" class="btn-text">
        <span>SUBSCRIPTION</span>
    </v-btn>

    <v-btn text @click="goToBookmarkList" class="btn-text">
        <span>BOOKMARK</span>
    </v-btn>

    <v-menu close-on-content-click>
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="btn-text">
                <b>Report</b>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="(item, index) in reportItems"
                :key="index"
                @click="item.action"
            >
                <v-list-title>{{ item.title }}</v-list-title>
            </v-list-item>
        </v-list>
    </v-menu>

    <v-menu v-if="isAuthenticated" close-on-content-click>
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="btn-text" style="margin-right: 16px;">
                <b>My Page</b>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="(item, index) in myPageItems"
                :key="index"
                @click="item.action"
            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>

    <v-btn v-if="!isAuthenticated" text @click="signIn" class="btn-text">
        <v-icon left>mdi-login</v-icon>
        <span>LOGIN</span>
    </v-btn>
    </v-app-bar>
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";
import router from "@router";
import { mapActions, mapState } from "vuex";
const authenticationModule = "authenticationModule";

export default {
    data() {
        return {
            reportItems: [
                {
                    title: "대여 현황",
                    action: () => {
                        this.goToRentalTrendAnalysisPage();
                    },
                },
                {
                    title: "관리자",
                    actio: () => {
                        this.goToRentalPredictionPage();
                    },
                },
            ],
            myPageItems: [
                {
                    title: "MY PAGE",
                    action: () => {
                        this.goToMyPage();
                    },
                },
                {
                    title: "LOGOUT",
                    action: () => {
                        this.signOut();
                    },
                },
            ],
        };
    },
    computed: {
        ...mapState(authenticationModule, ["isAuthenticated"]),
    },
    methods: {
        ...mapActions(authenticationModule, ["requestLogoutToDjango"]),
        goToHome() {
            router.push("/");
        },
        goToRentalTrendAnalysisPage() {
            router.push("/");
        },
        goToBookList() {
            router.push("/book/list");
        },
        goToSubscriptionList() {
            router.push("/subscription/list");
        },
        goToBookmarkList() {
            router.push("/bookmark/list");
        }
        // 추가해야 합니다. 나중에 업데이트하면서 찬찬히 해보도록 할게요~
    },
};
</script>

<style scoped>
.navbar-title {
    font-size: 24px;
    font-weight: bold;
    color: white;
}

.navbar-title-btn {
    color: white;
}

.mdi-icon {
    font-size: 32px;
    margin-right: 8px;
}

.btn-text {
    font-size: 14px;
    margin-right: 16px;
    color: white;
}

.v-btn {
    text-transform: uppercase;
}

.v-btn:hover {
    background-color: rgba(170, 255, 0, 0.233);
}

.v-btn:hover .btn-text {
    color: white;
}

.v-btn:focus {
    background-color: rgba(170, 255, 0, 0.233); /* 클릭해서 선택되었을시 표시 */
    color: white;
}

.v-btn:focus .btn-text {
    color: white;
}

.v-menu > .v-overlay__content > .v-card,
.v-menu > .v-overlay__content > .v-sheet,
.v-menu > .v-overlay__content > .v-list {
    background-color: #0000008a;
    color: white;
}

.v-list-item:hover {
    background-color: rgba(170, 255, 0, 0.233);
}
</style>