<template>
  <div class="" style=" margin-left: 230px; font-size: 28px; padding: 0px 10px;">
    <div class="row" style="text-align:center;">
      <!-- <div class="col-lg-8">
        <p>Awww! <span>Something went wrong</span> </p>
      </div> -->
      <div class="col-lg-4">
        <img src="../assets/404-not-found.png" alt="">
      </div>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    if (this.$route.query.assignmentId == undefined || this.$route.query.hitId == undefined || this.$route.query.workerId == undefined || this.$route.query.turkSubmitTo == undefined) {
      this.$router.push('/error')
    }
  }
}
</script>
<style lang="css" scoped>

</style>
