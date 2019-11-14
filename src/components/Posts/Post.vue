<template>
    <div class="post">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>

                    <!-- 展示点赞内容 -->
                    <PostFeed 
                        v-if="postData != null"
                        :post="postData"
                        :showAction=false
                    ></PostFeed>
                   <!-- 不为空 传值 -->
                    <CommentForm
                      v-if="postData != null"
                      :postId="postData._id"
                      @update="getPost(postData._id)"
                    ></CommentForm>

                    <CommentFeed
                      v-if="postData != null && postData.comments.length > 0"
                      v-for="commenta in postData.comments"
                      :key="commenta._id"
                      :commenta="commenta"
                      :postId="postData._id"
                      @update='getPost(postData._id)'
                    ></CommentFeed> 
                  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PostFeed from "./PostFeed";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

export default {
  name: "post",
  data() {
    return {
      errors: "",
      postData: {}
    };
  },
  components: {
    CommentForm,
    CommentFeed,
    PostFeed
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getPost(to.params.id);
    });
  },
  methods: {
    getPost(id) {
      this.$axios
        .get(`/api/posts/${id}`)
        .then(res => {
          this.postData = res.data;
          console.log(this.postData);
          this.errors = "";
        })
        .catch(error => {
          this.postData = null;
          this.errors = error.response.data;
        });
    }
  }
};
</script>

