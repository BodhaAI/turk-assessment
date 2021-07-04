<template>
    <div class="body-content row" style="margin-left:1%">
      <div v-if="elementIsReady !== true" class="container-fluid page-content display-column-flex" style="height: auto; width: 100%;overflow: auto;margin-top: 3%;margin-left: 2%;">
        <div id="loader"></div>
      </div>
      <div v-else class="col-lg-9" style="">
        <div class="" style="width:560px; ">
          <div class="card cardCss" >
            <div class="card-header cardHeaderCss">
              <p style="margin-top: 4px;">
                <img v-on:click="$router.go(-1)" style="cursor:pointer;width: 14px;margin-right: 2%;" src="../../assets/svg/Go-Back-Arrow-Purple.svg" alt="">
                <span>Bodha VIP Assessment</span>
              </p>
            </div>

            <div class="card-body" style="text-align:center;">
              <div class="" style="margin:2%; text-align: -webkit-left">
                <p style="color: #232323;font-size: 14px;font-weight: bold;line-height: 14px;">Instructions</p>
                <p style="color: #232323;	font-size: 14px;line-height: 22px;" v-html="instructions"></p>
                <button style="height: 48px;width: 140px;border-radius: 24px;background-color: #796EFF;color: #FFFFFF;font-size: 16px;font-weight: bold;line-height: 16px;" type="button" v-on:click="startTest()" name="button">Start Your Test</button>
              </div>
              <p v-if="testDone" style="font-size: 14px;color: #7f68ff;">Test already taken and completed successfully!</p>
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
      testDone: false,
      elementIsReady: true,
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
        this.testDone = true
        // this.$emit('showTest', true)
      } else {
        this.cTestCollectionRef.doc('status').get()
          .then((response) => {
            console.log('RESPONSE', response)
            if (!response.exists) {
              this.adoptTest()
            } else {
              this.$emit('showTest', true)
            }
          })
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
              this.elementIsReady = true
            }).catch()
        }).catch()
    },
    adoptTest () {
      // this.$emit('showTest', true)
      const executeTasks = []
      // this.testCollection.testAdopted = true
      const createTestCollection = this.cTestCollectionRef.doc('status').set({
        // instructions: gDoc.data().instructions,
        // testName: gDoc.data().testName,
        id: this.$route.query.workerId,
        isComplete: false,
        status: 'ongoing',
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
          } else {
            Promise.resolve().then(() => {
              this.$emit('showTest', true)
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
  color: #232323;		font-size: 14px;	line-height: 22px;
}
.tipsHeadCss{
  border-radius: 4px 4px 0 0;	background-color: #F7F7F7;	box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24);
  color: #232323;		font-size: 14px;	font-weight: bold;	line-height: 14px;
}
.helpcardCss{
  min-height: 270px; height: auto;	width: 228px;	border-radius: 4px;	background-color: #FFFFFF;	box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24); margin-left: 27%;
}
.cardCss{
  min-height: 400px;	width: 892px;	border-radius: 4px;	background-color: #FFFFFF;	box-shadow: 0 1px 3px 0 rgba(0,0,0,0.24);margin-top: 6%;  margin-bottom: 4%;
}
.cardHeaderCss {
  color: #232323;		font-size: 14px;	font-weight: bold;	line-height: 14px; height: 46px;
  text-align: left;
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
  button:focus {
    outline: none;
  }
  #loader {
    background-image: url('../../assets/loader1.svg');
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    display: block;
    height: 100px;
    width: 100px;
    margin: calc((340px - 100px)/2) auto;
  }
</style>
