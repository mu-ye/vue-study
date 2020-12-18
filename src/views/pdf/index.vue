<template>
  <div style="text-align: center;padding-top: 200px">
    <a-spin :spinning="loading">
      <pdf
        v-for="i in numPages"
        :key="i"
        :src="src"
        :page="i"
        @page-loaded="loadPage"
        @error="error" />
    </a-spin>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  name: 'PdfViewer',
  data () {
    return {
      src: '',
      loading: true,
      numPages: 0
    }
  },
  mounted () {
    this.renderPdf(this.$route.query.url)
  },
  beforeDestroy () {
    this.loading = false
  },
  methods: {
    /**
     * 渲染 PDF
     * @param url PDF URL
     */
    renderPdf (url) {
      this.src = pdf.createLoadingTask('/zzp' + url)
      console.log(url)
      this.src.promise.then(pdf => {
        this.numPages = pdf.numPages
      })
    },
    /**
     * 加载页面
     * @param value 页数
     */
    loadPage (value) {
      if (this.numPages === value) {
        this.loading = false
      }
    },
    /**
     * 异常
     * @param error 异常
     */
    error (error) {
      console.log(error)
      this.loading = false
    }
  }
}
</script>
