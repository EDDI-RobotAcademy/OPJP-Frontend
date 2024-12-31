<template>
    <v-app>
        <navigation-menu-bar/>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationMenuBar from './nevigationBar/NavigationMenuBar.vue';

export default defineComponent({
    component: { NavigationMenuBar },
    name: 'App',

    data() {
        return {
            //
        }
    },
})
</script>