<template>
  <!-- <el-container>
    <el-main>
      <el-card class="box-card form-login">
        <el-button @click="onJump('s21294')">s21294</el-button>
        <el-button @click="onJump('w15579')">w15579</el-button>
      </el-card>
    </el-main>
  </el-container> -->
  <n-space vertical size="large">
    <n-layout>
      <n-layout-content content-style="padding: 24px;">
        <n-card>
          <n-button @click="onJump('s21294')">s21294</n-button>
          <n-button @click="onJump('w15579')">w15579</n-button>
        </n-card>
      </n-layout-content>
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function onJump(token: string) {
  const path = '/Landlords/' + token;
  router.push({ path });
}
</script>

<style>
.form-login {
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px;
}
</style>
