<template>
    <v-container>
        <v-row v-if="!isAuthenticated">
            <v-col cols="12">
                <v-card outlined class="mb-6 pa-4">
                    <h2 class="text-h6 orange-text">멤버에게 제공되는 북마크 서비스</h2>
                    <p class="text-body-2 mb-0">
                        OPJP 멤버가 되어 북마크 서비스를 비롯한 다양한 혜택을 누려보세요.
                        <a href="#", class="font-weight-bold" @click.prevent="goToRegister"
                            >가입하기</a
                        >
                        또는
                        <a href="#", class="font-weight-bold" @click.prevent="goToLogin">로그인</a>
                    </p>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="8">
                <v-card v-for="item in bookmarkItems" :key="item.bookmarkId" class="mb-6" outlined>
                    <v-row no-gutters>
                        <v-col cols="4">
                            <v-img :src="getBookImge(item.bookName)" contain></v-img>
                        </v-col>
                        <v-col cols="8" class="pa-4">
                            <div class="d-flex justfy-space-between align-start">
                                <div>
                                    <h4 class="text-h6">{{ item.bookName }}</h4>
                                    <p class="text-body-2 gray--text">{{ item.bookDescription }}</p>
                                    <p class="text-body-2">{{ item.bookImage }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-h6">{{ item.bookPrice.toLocaleString() }}원</p>
                                </div>
                            </div>
                            <div class="d-flax justfy-space-between align-center mt-4">
                                <v-select
                                    v-model="item.quantity"
                                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                                    label="수량"
                                    dense
                                    outlined
                                    hide-details
                                    class="flex-grow-0"
                                    style="max-width: 100px"
                                ></v-select>
                                <div>
                                    <v-btn icon small class="mr-2">
                                        <v-icon>mdi-heart-outline</v-icon>
                                    </v-btn>
                                    <v-btn icon small @click="removeItem(item)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>

                <v-card outlined class="pa-4 mb-4">
                    <h4 class="text-h6 mb-2">무료 배송</h4>
                    <p class="text-body-2 mb-0">도착 예정일: {{ deliverDate }}</p>
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-card outlined class="pa-4">
                    <h3 class="text-h6 mb-4">주문 내역</h3>

                    <div class="d-flex justify-space-between mb-2">
                        <span>상품 금액</span>
                        <span>{{ cartTotal.toLocaleString() }}원</span>
                    </div>
                    <div class="d-flex justify-space-between mb-2">
                        <span>배송비</span>
                        <span v-if="!isAuthenticaticated">{{ deliverPrice }}원</span>
                        <span v-if="isAuthenticated">무료</span>
                    </div>
                    <div class="d-flex justify-space-between text-h6 font-weight-bold mt-4">
                        <span>총 결제 금액</span>
                        <span v-if="!isAuthenticated">{{ totalPayment.toLocaleString() }} 원</span>
                        <span v-if="isAuthenticated">{{ cartTotal.toLocaleString() }} 원</span>
                    </div>

                    <v-btn color="black" dark block x-large class="mt-6" @click="confirmCheckout">
                        주문결제
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog v-model="isCheckoutDialogVisible" max-width="500">
            <v-card>
                <v-card-title>주문 확인</v-card-title>
                <v-card-text> 선택한 상품을 주문하시겠습니까? </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="isCheckoutDialogVisible = false"
                        >취소</v-btn>
                    <v-btn color="blue darken-1" text @click="preceedToOrder">확인</v-btn>
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
            cartItems: [],
            isCheckoutDialogVisible: false,
            deliverDate: 3000,
        };
    },
    computed: {
        ...mapState(authenticationModule, ["isAuthenticated"]),
        cartTotal() {
            return this.cartItems.reduce(
                (total, item) => total + item.bookPrice * item.quantity,
                0
            );
        },
        totalPayment() {
            const today = new Date();
            const deliverDate = new Date(today.setDate(today.getDate() + 2));
            return deliverDate.toLocaleDateString("ko-KR", {
                month: "long",
                day: "numeric",
                weekday: "short",
            });
        },
    },
    methods: {
        ...mapActions("cartModule", [
            "requesCartListToDjango",
            "requestRemoveCartItemToDjango",
        ]),
        ...mapActions("orderModule", ["requestCreatedOrderToDjango"]),
        getBookImge(bookName) {
            return require('@/assets/images/uploadImages/${mookName}.png');
        },
        async removeItem(item) {
            try {
                await this.requestRemoveBookmarkItemToDjango({ bookmarkItemId: [item.bookmarkItemId] });
                this.bookmarkItems = this.bookmarkItems.filter(
                    (bookmarkItem) => bookmarkItem.bookmarkItemId !== item.bookmarkItemId``
                );
            } catch(error) {
                console.error("Bookmark Item 삭제 중 에러 발생", error);
            }
        },
        goToRegister() {
            this.$router.push({ name: "AccountRegisterPage" });
        },
        goToLogin() {
            this.$router.push({ name: "AccountLoginPage" });
        },
        confirmCheckout() {
            this.isCheckoutDialogVisible = true;
        },
        async proceedToOrder() {
            this.isCheckoutDialogVisible = false;
            try {
                const orderItems = this.bookmarkItem.map((item) => ({
                    bookmarkItemId: item.bookmarkItemId,
                    bookPrice: item.bookPrice,
                    quantity: item.quantity,
                }));
                const bookmarkId = await this.requestCreatedOrderToDjango({ items: bookmarkItems });
                this.$router.push({
                    name: "OrderReadPage",
                    params: { bookmarkId: bookmarkId.toString() },
                });
            } catch(error) {
                console.error("Order creation failed:", error);
            }
        },
    },
    created() {
        this.fetchBookmarkList();
    },
};
</script>