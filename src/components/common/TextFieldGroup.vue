<template>
  <div class= " textFieldGroup form-group">
    <input
      class="form-control form-control-lg" 
       :class="{'is-invalid': error}"
      :type="type"
      ref="input"
      :value="value"
      :placeholder="placeholder"
      :name='name'
      :disabled='disabled'
      @input="$emit('input', $event.target.value)"
    >
    <!-- 封装input 用到得 -->
    <div v-if="error" class="invalid-feedback">
       {{error}}
    </div>
    <small v-if="info" className="form-text text-muted">{{info}}</small>
  </div>
</template>

<script>
export default {
  name: "textFieldGroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String,
    error: String,
    info: String,
    disabled: Boolean //  判断当前是否在职
  }
};
</script>

<style scoped>
</style>
