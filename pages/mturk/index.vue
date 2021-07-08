<template>
   <div class="" style="text-align: -webkit-center;background-color: rgb(245, 249, 252);height: 100vh;font-size: 28px; padding: 0px 10px; padding-top: 4%;">
      <div v-if="elementIsReady !== true" class="container-fluid page-content display-column-flex" style="height: auto; width: 100%;overflow: auto;margin-top: 3%;margin-left: 2%;">
         <div id="loader"></div>
      </div>
      <div v-else class="">
         <div class="testComponent cardCss">
            <div class="card-header cardHeaderCss">
               Turk assessments
            </div>
            <div class="card-body" style="text-align:center;">
               <div class=""  style="margin:2%; margin-bottom:9%;">
                  <div class="row" style="min-height: 114px;">
                     <div class="col-lg-2" style="height: 88px;width: 88px;z-index: 1;">
                        <div>
                           <img src="../../assets/svg/Personality-Test.svg" style="z-index: -10;"/>
                        </div>
                     </div>
                     <div class="col-lg-10">
                        <div class="row">
                           <div class="col-lg-8" style="padding-left: 0px;">
                              <p class="testTitle">1. Self-Introduction Video</p>
                           </div>
                           <div class="col-lg-4">
                           </div>
                        </div>
                        <div class="row" style="padding-right: 1%;">
                           <p class="testDesc">
                              A self-introduction video can give potential employers or customers a
                              window into who you are and what you’d be like to work with.
                              Giving a few details can help your viewers feel like they know — and
                              like you — long before you meet.
                           </p>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-lg-2">
                     </div>
                     <div  class="col-lg-5" style="text-align: -webkit-left;padding-left: 0px;">
                        <button v-on:click="toVideoComponent()" class="testBtn" type="button" name="button">Get Started</button>
                     </div>
                  </div>
               </div>
            </div>
            <div class="card-body" style="text-align:center;">
               <div class=""  style="margin:2%;">
                  <div class="row" style="min-height: 114px;">
                     <div class="col-lg-2" style="height: 88px;width: 88px;z-index: 1;">
                        <div>
                           <img src="../../assets/svg/Personality-Test.svg" style="z-index: -10;"/>
                        </div>
                     </div>
                     <div class="col-lg-10">
                        <div class="row">
                           <div class="col-lg-8" style="padding-left: 0px;">
                              <p class="testTitle">2. Bodha’s VIP Assessment</p>
                           </div>
                           <div class="col-lg-4">
                              <p class="testTime">Assessment time: 30 minutes</p>
                           </div>
                        </div>
                        <div class="row" style="padding-right: 1%;">
                           <p class="testDesc">
                              The Bodha’s VIP Assessment, is a widely examined theory used by some
                              psychologists to describe the human personality and psyche.
                              The VIP stands for Values, Interests, and Personality
                           </p>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-lg-2">
                     </div>
                     <div  class="col-lg-5" style="text-align: -webkit-left;padding-left: 0px;">
                       <button v-if="status == 'complete'" class="testBtn" type="button" name="button">Assessment Taken</button>
                       <button v-if="status == 'ongoing'" v-on:click="toTest()" class="testBtn" type="button" name="button">Resume Assessment</button>
                        <button v-if="status == 'started'" v-on:click="toTest()" class="testBtn" type="button" name="button">Get Started</button>
                     </div>
                  </div>
               </div>
            </div>
            <div class="card-footer" style="height: 70px;text-align: right;">
              <button class="testBtn2" type="button" name="button">SUBMIT</button>
            </div>
            <!-- <hr> -->
         </div>
      </div>
   </div>
</template>
<script>
import {firestore} from '~/plugins/firebase.js'

export default {
  components: {},
  data () {
    return {
      // crumbs1value: 'Tests',
      elementIsReady: false,
      status: false
    }
  },
  mounted () {
    console.log(window.location.href, 'router-link')
    var url = window.location.href
    let workerId = this.$route.query.workerId
    console.log('response is 1', workerId)
    if (this.$route.query.assignmentId == undefined || this.$route.query.hitId == undefined || this.$route.query.workerId == undefined || this.$route.query.turkSubmitTo == undefined) {
      this.$router.push('/error')
    } else {
      firestore.collection('turkers-assessments').doc(workerId)
        .collection('tests-data').doc('status')
        .get().then((response) => {
          if (response.exists) {
            console.log('response is', response)
            this.status = response.data().status
          } else {
            console.log('response is NOT FOUND', response)
            this.status = 'started'
          }

        })
    }

    // console.log('COMPONENT', this.show_test)
    this.elementIsReady = true
    this.show_test = false
  },
  methods: {
    toVideoComponent() {
      this.$router.push('/mturk/video?assignmentId='+ this.$route.query.assignmentId + '&hitId=' + this.$route.query.hitId + '&workerId=' + this.$route.query.workerId + '&turkSubmitTo=https%3A%2F%2Fwww.mturk.com')
    },
    toTest(){
      this.$router.push('/mturk/test?assignmentId='+ this.$route.query.assignmentId + '&hitId=' + this.$route.query.hitId + '&workerId=' + this.$route.query.workerId + '&turkSubmitTo=https%3A%2F%2Fwww.mturk.com')
    }
  }
}
</script>
<style lang="css" scoped>
@font-face {
    font-family: 'Muli';
    src: url('../../assets/fonts/Muli/Muli.ttf') format('truetype');
}

@font-face {
    font-family: 'Muli Bold';
    src: url('../../assets/fonts/Muli/Muli-Bold.ttf') format('truetype');
}

@font-face {
    font-family: 'Muli Bold Italic';
    src: url('../../assets/fonts/Muli/Muli-BoldItalic.ttf') format('truetype');
}

@font-face {
    font-family: 'Muli ExtraLight';
    src: url('../../assets/fonts/Muli/Muli-ExtraLight.ttf') format('truetype');
}

@font-face {
    font-family: 'Muli ExtraLightItalic';
    src: url('../../assets/fonts/Muli/Muli-ExtraLightItalic.ttf') format('truetype');
}

@font-face {
    font-family: 'Muli Italic';
    src: url('../../assets/fonts/Muli/Muli-Italic.ttf') format('truetype');
}

@font-face {
    font-family: 'Muli Light';
    src: url('../../assets/fonts/Muli/Muli-Light.ttf') format('truetype');
}

@font-face {
    font-family: 'Muli Light Italic';
    src: url('../../assets/fonts/Muli/Muli-Light-Italic.ttf') format('truetype');
}

@font-face {
    font-family: 'Muli SemiBold';
    src: url('../../assets/fonts/Muli/Muli-SemiBold.ttf') format('truetype');
}

@font-face {
    font-family: 'Muli Semi-BoldItalic';
    src: url('../../assets/fonts/Muli/Muli-Semi-BoldItalic.ttf') format('truetype');
}
.cardCss{
	width: 65%;
  border-radius: 4px;
  background-color: #FFFFFF;
  border: 1px solid rgba(128, 128, 128, 0.2);
  margin-bottom: 4%;
}
.tipsText{
  color: #232323;		font-size: 14px;	line-height: 22px;
}
.tipsHeadCss{
  border-radius: 4px 4px 0 0;	background-color: #F7F7F7;	box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24);
  color: #232323;		font-size: 14px;	font-weight: bold;	line-height: 14px;
}
.helpcardCss{
  min-height: 270px; height: auto;	width: 228px;	border-radius: 4px;	background-color: #FFFFFF;	box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24); margin-left: 27%;
}
/* .cardCss{
	width: 90%;	border-radius: 4px;	background-color: #FFFFFF;	box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24);  margin-bottom: 4%;
} */
.cardHeaderCss {
  color: #232323;		font-size: 14px;	font-weight: bold;	line-height: 14px;
}
.topDiv{
  height: 62px;	width: 892px; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24);
  margin: 0px 0px 10px;
  height: 62px;
  border-radius: 4px;
  background-color: rgb(247, 247, 247);
  padding: 3%;
  margin-top: 3%;
}
.topDivTxt{
  height: 14px;
  margin-bottom: 0px;
  margin-top: 1%;
  vertical-align: middle;
  color: rgb(35, 35, 35);

  font-size: 14px;
  font-weight: bold;
  line-height: 14px;
}
.testTitle{
  	color: #232323;		font-size: 18px;	font-weight: bold;	line-height: 18px; text-align: -webkit-auto;
}
.testTime{
  	color: #232323;		font-size: 14px;	font-weight: 300;	line-height: 14px;	text-align: right;
}
.testDesc{
  color: #232323;		font-size: 14px;	line-height: 22px; text-align: left;
}
.testBtn{
  height: 48px;	width: 180px;	border: 2px solid #796EFF;	border-radius: 24px;	background-color: #FFFFFF;
  	color: #796EFF;		font-size: 16px;	font-weight: bold;	line-height: 16px;
  }
  .testBtn2{
    height: 48px;
    	width: 180px;	border: 2px solid #796EFF;	border-radius: 24px;	background-color: #796EFF;
    	color: #FFFFFF;		font-size: 16px;	font-weight: bold;	line-height: 16px;
    }
  button:focus {
    outline: none;
  }
  .cardHeaderCss {
    text-align: left;
  border-radius: 4px 4px 0 0;
  background-color: #F7F7F7;
  /* box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24); */
  height: 80px;
  padding-top: 3%;
  border: none;
  color: #232323;
  border-bottom: 0px !important;
  font-family: Muli;
  font-size: 14px;
  font-weight: bold;
  line-height: 14px;
}
  #loader {
    background-image: url('../../assets/loader1.svg');
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    display: block;
    height: 100px;
    width: 100px;
    /* margin: calc((340px - 100px)/2) auto; */
  }
  .testTitle{
  	color: #232323;	font-family: Muli;	font-size: 18px;	font-weight: bold;	line-height: 18px; text-align: -webkit-auto;
}
.testTime{
  	color: #232323;	font-family: Muli;	font-size: 14px;	font-weight: 300;	line-height: 14px;	text-align: right;
}
.testDesc{
  color: #232323;	font-family: Muli;	font-size: 14px;	line-height: 22px; text-align: left;
}
</style>
