<template>
    <v-container class="membership-prediction">
        <h1 class="title">회원 예측</h1>
        <v-row>
            <v-col cols="12">
                <DatePredictionCard />
            </v-col>
            <v-col cols="12">
                <UserWithdrawlPredictionCard />
            </v-col>
            <v-col cols="12">
                <PreferredBookPrediction />
            </v-col>
            <v-col cols="12">
                <UserSpentPredictionCard />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import DatePredictionCard from "@/report/pages/customerChurnPrediction/DateInfoPrediction.vue";
import UserWithdrawlPredictionCard from "@/report/pages/customerchurnPrediction/UserInfoPrediction.vue";
import PreferredBookPrediction from "./PreferredBookPrediction.vue";
import UserSpentPrediction from "./UserSpentPrediction.vue";

export default {
    components: {
        DatePredictionCard,
        UserWithdrawlPredictionCard,
        PreferredBookPrediction,
        UserSpentPredictionCard,
    },
};
</script>

<style scoped>
.membership-prediction {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
}
</style>