<template>
    <v-container>
        <v-row v-if="!isBookAuthenticated">
            <v-col cols="12">
                <v-card outlined class="mb-6 pa-4">
                    <h2 class="text-h6 orange--text">도서관</h2>
                    <p class="text-body-2 mb-0">
                        OPJP 구독 멤버가 되어 다양한 서적들을 대여해보세요!
                        <a href="#" class="font-weight-bold" @click.prevent="goToRegister"
                        >가입하기</a>
                    >
                    또는
                    <a href="#" class="font-weight-bold" @click.prevent="goTOLogin">로그인</a>
                    </p>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="8">
                <v-card v-for="item in bookItems" :key="item.bookItemId" class="mb-6" outline>
                    <v-row no-gutters>
                        <v-col cols="4">
                            <v-img :src="getBookImage(item.BookName)" contain></v-img>
                        </v-col>
                        <v-col cols="8" class="pa-4">
                            <div class="d-flex justify-space-between align-start">
                                <div>
                                    <h4 class="text-h6">{{ item.bookName }}</h4>
                                    <p class="text-body-2 gray--text">{{ item.bookDescription }}</p>
                                    <p class="text-body-2">{{ item.bookColor }}</p>
                                    <p class="text-body-2">제목: {{ item.bookTitle }}</p>>
                                </div>
                                <div class="text-right">
                                    <p class="text-h6">{{ item.bookTitle.toLocaleString() }} </p>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-card outlined class="pa-4">
                    <h3 class="text-h6 mb-4">대서 내역</h3>

                    <div class="d-flex justify-space-between mb-2">
                        <span>도서 제목</span>
                        <span>{{ BookmarkListPage.toLocaleString() }}</span>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog v-model="isCheckoutDialogVisible" max-width="500">
            <v-card>
                <v-card-title>도서 내역 확인</v-card-title>
                <v-card-text>선택한 도서를 대여하시겠습니까?</v-card-text>
                <v-card-actions>
                    <v-space></v-space>
                    <v-btn color="blue darken-1" text @click="isCheckoutDialogVisible = false"
                    >취소</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="prceedToOrder">확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
const authenticationModule = "authenticationModule";

export default {
    data() {
        return {
            bookItems: [],
            isCheckoutDialogVisible: false,
        };
    },
    computed: {
        ...mapState(authenticationModule, ["isAuthenticated"]),
        bookcartTotal() {
            return this.bookItems.reduce(
                bookName + bookDescription,
                0
            );
        },
    },
    methods: (
        ...mapActions("bookModule", [
            "requestBookListTODjango",
            "requestRemoveCartItemToDjango",
        ]);
        async removeItem(item) {
            try {
                await this.requestRemoveBookItemTODjango({ bookItemId: [item.bookItemId] });
                this.bookItems = this.bookItems.filter(
                    (bookItem) => bookItem.bookItemId !== item.bookItemId
                );
            } catch (error) {
                console.error("Book Item 삭제 중 에러 발생", error);
            }
        };
        goToRegister() {
            this.$router.push({ name: "AccountRegisterPage" });
        };
        confirmCheckout() {
            this.isCheckoutDialogVisible = true;
        };
        async fetchBookList() {
            try {
                const response = await this.requestBookListToDjango();
                this.bookItems = response;
            } catch (error) {
                console.error("Error fetching book list:", error);
            }
        };
    ),
    created() {
        this.fetchBookList();
    },
};
</script>