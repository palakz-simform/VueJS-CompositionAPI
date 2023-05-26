<template>
    <div class="user-list">
        <h1 class="user-heading">Users List</h1>
        <hr />
        <div class="wrapper">
            <v-container class="w-75">
                <v-table fixed-header height="700px" theme="dark">
                    <thead>
                        <tr>
                            <th class="text-center">
                                Name
                            </th>
                            <th class="text-center">
                                Email
                            </th>
                            <th class="text-center">
                                Role
                            </th>
                            <th class="text-center">
                                Gender
                            </th>
                            <th class="text-center">
                                Age
                            </th>
                            <th class="text-center">
                                DOB
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in usersList" :key="item.name" class="text-center">
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.role }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ item.age }}</td>
                            <td>{{ item.dob }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-container>
        </div>

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
@import 'vuetify/styles';

.user-container {
    padding: 0px;
}

.user-app {
    background-color: black;
}

.user-wrap {
    margin: 0 auto;
}

.user-list {
    margin-top: 100px;
}

.user-heading {
    color: white;
    text-align: center;
}

.wrapper {
    display: flex;
    justify-content: center;
}

.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th {
    background-color: rgb(35, 177, 172);
    color: black;
    font-size: 20px;
    font-weight: bolder;
}

.v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>td {
    font-size: 18px;
}

hr {

    margin: 0 auto;
    width: 128px;
    border: 5px solid rgb(35, 177, 172);
    border-radius: 5px;
    margin-bottom: 80px;
    margin-top: 20px;

}
</style>