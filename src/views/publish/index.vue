<template>
  <div class="publish">
    <el-card>
      <div slot="header">
        <my-bread>{{articleid ? '修改' : '发布'}}文章</my-bread>
      </div>
      <el-form :model="articleForm" label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor :options="editorOption" v-model="articleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group @change="changetype()" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 单图 -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <!-- 三图 -->
          <div v-if="articleForm.cover.type===3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleid">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      },
      // 提交给后台的数据
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 数组长度，单图为1，三图为3
          images: []
        },
        channel_id: null
      },
      // 修改文章的id
      articleid: null
    }
  },
  components: {
    quillEditor
  },
  created () {
    this.articleid = this.$route.query.id
    // console.log(this.$route.query.id)
    // 可能拿不到，当时发布文章时，没有id
    // 获取文章数据
    if (this.articleid) {
      this.getarticle()
    }
  },
  watch: {
    $route () {
      // 监听一种，由修改切换到发布
      this.articleid = null
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 数组长度，单图为1，三图为3
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    // 获取文章数据
    async getarticle () {
      const {
        data: { data }
      } = await this.$http.get('articles/' + this.articleid)
      this.articleForm = data
    },
    // 发表和存入草稿
    async publish (draft) {
      // 校验数据  省略
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(!draft ? '发表成功' : '存入草稿成功')
      this.$router.push('/article')
    },
    // 修改
    async edit (draft) {
      // 校验数据  省略
      await this.$http.put(`articles/${this.articleid}?draft=${draft}`, this.articleForm)
      this.$message.success(!draft ? '修改成功' : '修改草稿成功')
      this.$router.push('/article')
    },
    changetype () {
      this.articleForm.cover.images = null
    }
  }
}
</script>

<style scope lang='less'>
</style>
