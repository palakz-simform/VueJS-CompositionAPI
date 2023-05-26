<template>
    <div class="user-list">
        <h1 class="user-heading">USERS</h1>
        <v-app class="user-app">
            <v-main class="user-main">
                <v-table fixed-header height="500px" theme="dark" class="mx-5 my-2 px-5 py-4 pl-15">
                    <thead>
                        <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Email
                            </th>
                            <th class="text-left">
                                Role
                            </th>
                            <th class="text-left">
                                Gender
                            </th>
                            <th class="text-left">
                                Age
                            </th>
                            <th class="text-left">
                                DOB
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in usersList" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.role }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ item.age }}</td>
                            <td>{{ item.dob }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-main>
        </v-app>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user';
const userStore = useUserStore()
const usersList = userStore.usersInfo
onMounted(() => {
    userStore.getUsersData()
})
</script>

<style scoped>
.user-app {
    background-color: black;
}

.user-list {
    margin-top: 100px;
}

.user-heading {
    color: white;
    text-align: center;
    margin-bottom: 80px;
}
</style>