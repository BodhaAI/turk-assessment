<template>
    <div class="body-content row" style="margin-left:1%">
      <div class="col-lg-9" style="">
        <div class="" style="width:560px; ">
          <div class="card cardCss" >
            <div class="card-header cardHeaderCss">
              <p style="margin-top: 4px;"> <span>{{testName}}</span>  </p>
            </div>

            <div class="card-body" style="text-align:center;">
              <div class="" style="margin:2%; text-align: -webkit-left">
                <p style="color: #232323;font-family: Muli;font-size: 14px;font-weight: bold;line-height: 14px;">Instructions</p>
                <p style="color: #232323;	font-family: Muli;font-size: 14px;line-height: 22px;" v-html="instructions"></p>
                <button style="height: 48px;width: 140px;border-radius: 24px;background-color: #796EFF;color: #FFFFFF;font-family: Muli;font-size: 16px;font-weight: bold;line-height: 16px;" type="button" v-on:click="startTest()" name="button">Start Your Test</button>
              </div>
            </div>
          </div>
        </hr>
      </div>
    </div>
  </div>
</template>
<script>
import { firestore } from '~/plugins/firebase.js'
export default {
  data () {
    return {
      testName: '',
      testCollection: '',
      instructions: '',
      gTestCollectionRef: '',
      cTestCollectionRef: ''
    }
  },
  props: ['testId'],
  mounted () {
    firestore.collection('turk-testCollection').doc('turk_assessment')
      .get().then((response) => {
        console.log('response is', response.data())
        this.testName = response.data().testName
        this.instructions = response.data().instructions
      })
    this.gTestCollectionRef = firestore.collection('turk-testCollection').doc('turk_assessment')
    this.cTestCollectionRef = firestore.collection('turkers-assessments').doc(this.$route.query.workerId).collection('tests-data')
    this.loadTestCollection()
  },
  methods: {
    startTest () {
      this.disableStartBtn = true
      if (this.testCollection.isComplete === true) {
        this.$emit('showTest', true)
      } else {
        this.adoptTest()
      }
      // this.adoptTest()
      // this.$emit('showTest', true)
    },
    loadTestCollection () {
      this.gTestCollectionRef.get()
        .then((gDoc) => {
          this.cTestCollectionRef.doc('status').get()
            .then((cDoc) => {
              const testCol = {
                instructions: gDoc.data().instructions,
                testName: gDoc.data().testName,
                id: gDoc.data().id,
                isComplete: false,
                hitId: this.$route.query.hitId,
                assignmentId: this.$route.query.assignmentId,
                totalQuestions: gDoc.data().totalQuestions
              }
              if (cDoc.exists) {
                testCol.isComplete = cDoc.data().isComplete
              }
              this.testCollection = testCol
            }).catch()
        }).catch()
    },
    adoptTest () {
      this.$emit('showTest', true)
      const executeTasks = []
      // this.testCollection.testAdopted = true
      const createTestCollection = this.cTestCollectionRef.doc('status').set({
        // instructions: gDoc.data().instructions,
        // testName: gDoc.data().testName,
        id: this.$route.query.workerId,
        isComplete: false,
        hitId: this.$route.query.hitId,
        assignmentId: this.$route.query.assignmentId,
        // totalQuestions: gDoc.data().totalQuestions
      }, { merge: true }).then(() => {
        this.gTestCollectionRef.collection('question_and_answers').get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              this.copyDocument(doc.data())
            })
          }).catch((error) => {
            return error
          })
      }).catch((error) => {
        return error
      })
      executeTasks.push(createTestCollection)
      Promise.all(executeTasks).then(() => {
        let time = 0
        const timer = setInterval(() => {
          if (time < 1) {
            time += 1
            // clearInterval(this.timer)
          } else {
            Promise.resolve().then(() => {
              // if (this.testQuestion.questionId && this.testQuestion.questionId.length > 0) {
              //   this.testCollection.testAdopted = true
              // } else {
              //   // time = 0
              // }
              clearInterval(timer)
            })
          }
        }, 1000)
      }).catch((error) => {
        console.log(error)
      })
    },
    copyDocument (document) {
      Promise.resolve(this.cTestCollectionRef.doc('data')
        .collection('question_and_answers').doc(document.questionId).set({
          answer: document.answer,
          answerType: document.answerType,
          questionId: document.questionId,
          multipleAnswersAllowed: document.multipleAnswersAllowed,
          questionText: document.questionText,
          answerTemplate: document.answerTemplate,
          quickReplies: document.quickReplies,
          qno: document.qno
        }, { merge: true }).then((data) => {
        }).catch((error) => {
          return error
        }))
    }
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
  min-height: 400px;	width: 892px;	border-radius: 4px;	background-color: #FFFFFF;	box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24);margin-top: 6%;  margin-bottom: 4%;
}
.cardHeaderCss {
  color: #232323;	font-family: Muli;	font-size: 14px;	font-weight: bold;	line-height: 14px; height: 46px;
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
