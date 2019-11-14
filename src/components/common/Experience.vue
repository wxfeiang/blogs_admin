<template>
    <div>
        <h4 class="mb-2">个人履历</h4>
        <table class="table">
            <thead>
                <tr>
                  <th>公司</th>
                  <th>标签</th>
                  <th>年份</th>
                  <th />
                </tr>
            </thead>
            <tbody>
                <tr v-for="exp in experience" :key="exp._id">
                    <td>{{exp.company}}</td>
                    <td>{{exp.title}}</td>
                    <td>
                    {{exp.from}} ~ {{exp.to ? exp.to : '至今'}}
                    </td>
                    <td>
                    <button class="btn btn-danger" @click="deleteClick(exp._id)">
                        删除
                    </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    experience: Array // 父组件传过来
  },
  methods: {
    deleteClick(id) {
      // 传字符串进去
      // 子组件操做
      //   this.$axios
      //     .delete(`/api/profile/experience/${id}`)
      //     .then(res => {
      //       console.log(res.data);
      //       //   this.profile = res.data;
      //     })
      //     .catch(error => {});

      // 子组件在操作父组件得数据  组件调用父组件得方法 就可以
      // 注册付组件得方法
      this.$emit("deleteExperience", id);
    }
  }
};
</script>
