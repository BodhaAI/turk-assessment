<template>
  <div class="" style=" margin-left: 230px; font-size: 28px; padding: 0px 10px;">
    <div class="row" style="text-align:center;">
      <!-- <div class="col-lg-8">
        <p>Awww! <span>Something went wrong</span> </p>
      </div> -->
      <div class="col-lg-8" style="margin-top:10%;margin-left: 8%;">
        <img src="../assets/smiley.jpg" alt="" style="width: 35%;">
        <p>Assessment completed successfully</p>
        <a href="" style="font-size: 22px;text-decoration: underline;" v-on:click="gohome">GO TO HOME</a>
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
    console.log('COMPONENT')
  },
  methods: {
    gohome () {
      this.$router.push('/mturk?assignmentId='+ this.$route.query.assignmentId + '&hitId=' + this.$route.query.hitId + '&workerId=' + this.$route.query.workerId + '&turkSubmitTo=https%3A%2F%2Fwww.mturk.com')
    }
  }
}
</script>
<style lang="css" scoped>

</style>
