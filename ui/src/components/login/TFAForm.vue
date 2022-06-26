<template>
  <div style="display: flex; flex-direction: row;">
    <OtpInput
      ref="otpInput"
      input-classes="otp-input"
      separator="-"
      :num-inputs="6"
      :should-auto-focus="true"
      :is-input-num="true"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    />
    <button class="btn-send-otp" @click="sendInput()">Send</button>
    <button class="btn-clear-otp" @click="clearInput()">Clear</button>
  </div>
</template>

<style lang="scss">
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.btn-clear-otp {
  width: 80px;
  height: 40px;
  padding: 5px;
}
.btn-send-otp {
  width: 80px;
  height: 40px;
  padding: 5px;
}
</style>

<script lang="ts" setup>
import OtpInput from 'vue3-otp-input';
import {ref} from 'vue';
import axios from 'axios';

const otpInput = ref(null)
let currentOTP = ""

const handleOnComplete = (value: string) => {
    currentOTP = value;
};

const handleOnChange = (value: string) => {
};

const sendInput = () => {
  if(currentOTP){
    console.log(currentOTP);
  }
}
const clearInput = () => {
    otpInput.value.clearInput()
    currentOTP = ""
}

</script>