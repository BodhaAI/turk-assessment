<template>
  <div class="" style=" margin-left: 230px; font-size: 28px; padding: 0px 10px;">
    <!-- <sidebar :id="$route.params.id"/> -->
    <!-- <topbar :crumbs1="crumbs1value" :id="$route.params.id" /> -->
    <div v-if="!show_test" class="">
      <!-- <TestList v-if="!show_inst" @testId="test_id = $event" @showInst="show_inst = $event"/> -->
      <Instructions :testId="test_id" @showTest="show_test = $event" />
    </div>
    <Test v-if="show_test"/>
</div>
</template>
<script>
// import Sidebar from '~/components/SubComponents/JobSidebarCandidate.vue'
// import Topbar from '~/components/SubComponents/CandidateDashboardTopbar.vue'
// import TestList from '~/components/Tests/TestList.vue'
import Instructions from '~/components/Tests/Instructions.vue'
import Test from '~/components/Tests/Test.vue'
export default {
  components: {
    // Sidebar,
    // Topbar,
    // TestList,
    Instructions,
    Test
  },
  data () {
    return {
      // crumbs1value: 'Tests',
      test_id: '',
      show_inst: false,
      show_test: false
    }
  },
  mounted () {
    console.log('COMPONENT', this.show_test)
  }
}
</script>
<style lang="css" scoped>
.tipsText{
  color: #232323;	font-family: Muli;	font-size: 14px;	line-height: 22px;
}
.tipsHeadCss{
  border-radius: 4px 4px 0 0;	background-color: #F7F7F7;	box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24);
  color: #232323;	font-family: Muli;	font-size: 14px;	font-weight: bold;	line-height: 14px;
}
.helpcardCss{
  min-height: 270px; height: auto;	width: 228px;	border-radius: 4px;	background-color: #FFFFFF;	box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24); margin-left: 27%;
}
.cardCss{
  height: 618px;	width: 892px;	border-radius: 4px;	background-color: #FFFFFF;	box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24);margin-top: 6%;  margin-bottom: 4%;
}
.cardHeaderCss {
  color: #232323;	font-family: Muli;	font-size: 14px;	font-weight: bold;	line-height: 14px;
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
  font-family: Muli;
  font-size: 14px;
  font-weight: bold;
  line-height: 14px;
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
.testBtn{
  height: 48px;	width: 180px;	border: 2px solid #796EFF;	border-radius: 24px;	background-color: #FFFFFF;
  	color: #796EFF;	font-family: Muli;	font-size: 16px;	font-weight: bold;	line-height: 16px;
  }
</style>
