<template>
    <v-container>
        <v-form class="reason-section">
            <h3>서비스 품질 향상을 위해 탈퇴 사유를 선택해주세요.</h3>
            <v-radio-group class="radio-group-section" v-model="selectedReason">
                <v-radio
                    v-for="(reason, index) in reasons"
                    :key="index"
                    :label="reason.label"
                    :value="reason.value"
                ></v-radio>
            </v-radio-group>
            <v-btn
                
        </v-form>
    </v-container>
</template>