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
                <span>{{testCollection.testName}}</span>
              </p>
            </div>
            <div class="card-body" style="text-align:center;">
              <div class="" style="margin:2%; text-align: -webkit-left">
                <div class="" style="display: block;color: #232323;font-size: 17px;line-height: 14px;">
                  <p v-if="testCollection.testName === 'personality_test'" style="margin-bottom: 7%;">Please use the rating scale next to each phrase to describe how accurately each statement describes you</p>
                  <p v-else style="margin-bottom: 7%;">Please rate the degree to which you like to do the following activities, using the following scale.</p>
                </div>
                <div class="row">
                  <div class="col-lg-1">
                    <p style="display: block;color: #232323;font-size: 16px;line-height: 14px;">{{testQuestion.qno}}</p>
                  </div>
                  <div class="col-lg-7" style=" float:left;width: 85%; margin-bottom:2%;color: #232323;font-size: 16px;line-height: 14px;padding-left: 10px;">
                    <p>{{testQuestion.questionText}}</p>
                    <!-- <p v-if="testQuestion.hint && testQuestion.hint.length > 0" style="color: #232323;font-size: 12px;line-height: 12px;margin: 5px auto auto 0px;font-weight: normal;">(Hint:&nbsp;{{testQuestion.hint}})</p> -->
                  </div>
                  <div class="col-lg-4" style="margin: 0px 0px auto auto;color: #232323;font-size: 12px;font-weight: 300;line-height: 16px;text-align: right;">
                    <p style="font-size: 13px;line-height: 14px;">
                      <span >{{testQuestion.qno}}</span>
                    <span>/</span>
                    <span style="font-weight: normal;">{{testCollection.totalQuestions}}</span>
                    </p>
                  </div>
                </div>

                <div class="display-row-flex" style="width: 100%;margin: 2px auto;">
                  <!-- <div style="display: block;width: 20px;color: #232323;font-size: 14px;font-weight: bold;line-height: 14px;">A:</div> -->
                  <div style="display: block;width: calc(100% - 30px);color: #232323;font-size: 16px;line-height: 14px;padding-left: 10px;">
                    <div class="display-column-flex" style="width: 100%;">
                      <!--  -->
                      <div v-if="testQuestion.answerType === 'TEXT'" class="display-column-flex">
                        <textarea
                        v-model="testQuestion.answer.answerText"
                        v-on:keyup="wordCount(testQuestion.answer.answerText)"
                        class="form-control auth-input-field"
                        required type="text"
                        placeholder = "Write your answer (min 50 words)"
                        rows="3" style="resize: none;"
                        ></textarea>
                      </div>
                      <!--  -->
                      <div v-if="testQuestion.answerType === 'QUICK_REPLY'" class="display-column-flex">
                        <!-- {{testQuestion}} -->
                        <!--   -->
                        <div v-if="testQuestion.multipleAnswersAllowed" class="display-column-flex">
                          <!--  -->
                          <div class="display-row-flex" v-for="(item, index) in testQuestion.quickReplies" style="margin: 5px auto;width: 100%;">
                            <div style="display: block;overflow-x: hidden;overflow-y: visible;width: 20px;">
                              <input v-if="testQuestion.quickReplies[index].checked === false" v-on:change="answerChecked(index, testQuestion.quickReplies[index].checked)" class="form-control" type="checkbox"
                              style="height: 16px;width: 16px;min-width: 16px;min-height: 16px;"
                              />
                              <input v-if="testQuestion.quickReplies[index].checked === true" v-on:change="answerChecked(index, testQuestion.quickReplies[index].checked)" class="form-control" type="checkbox"
                              style="height: 16px;width: 16px;min-width: 16px;min-height: 16px;"
                              checked/>
                            </div>
                            <div style="width: calc(100% - 20px);height: 16px;min-height: 16px;width: calc(100% - 25px);">
                              <p style="margin-left: 5px; margin-bottom: 0px;height: 16px;width: 100%;color: #232323;font-size: 16px;line-height: 16px;">{{item.text}}</p>
                              <input type="text" v-model="testQuestion.answer[index].checked"/>
                            </div>
                          </div>
                        </div>
                        <!--  -->
                        <div v-if="!testQuestion.multipleAnswersAllowed" class="">
                          <div class="row" v-for="(item, index) in testQuestion.quickReplies" style="margin: 20px auto;width: 100%;">
                            <div class="col-lg-1" style="padding-right: 0px; margin-top:3px;">
                              <input v-model="testQuestion.answer.quickReply" class="form-control" type="radio"
                              v-bind:id="'quickReplyRadioEle_chk_' + index"
                              v-bind:name="'quickReplyRadioEle_chk_' + index"
                              v-on:change="changeBtnDisability"
                              style="height: 14px;width: 16px;min-width: 16px;min-height: 14px;float: right"
                              v-bind:value="item"/>
                            </div>
                            <div class="col-lg-4" style="">
                              <p style="margin-left: 5px; margin-bottom: 0px;height: 16px;width: 100%;color: #232323;font-size: 16px;line-height: 16px;">{{item.title}}</p>
                            </div>
                          </div>
                          <!--<textarea v-model="testQuestion.answer[0].text"></textarea>-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="card-footer cardFooterCss" >
                  <div v-if="testCollection !== null && testOngoing === true" style="width: 100%;border-radius: 0 0 4px 4px;background-color: rgba(247,247,247,0.54);padding-left: 3%;padding-right: 3%;">
                    <div class="row" style="width: 100%;">
                      <div class="" style="width: 50%;left: 0px;">
                        <!--  -->
                        <div class="" v-if="testQuestion.qno !== 1">
                          <button id="previousBtn"
                          class="" v-on:click="previous"
                          style="height: 48px;width: 100px;color: black;margin: auto auto auto 0px;background-color: transparent;border: 0px;align-self: flex-start;position: relative;font-size: 14px;font-weight: normal;line-height: 14px;text-align: center;float:left;">
                          <img src="../../assets/Previous-Arrow.svg" style="height: 12px;width: 12px;margin: 0px auto;"/><span>&nbsp;Previous</span>
                        </button>
                      </div>
                    </div>
                    <div class="" style="width: 50%;">
                      <div class=""><!--disableNext === false-->
                        <button v-if="testQuestion.qno !== testCollection.totalQuestions"
                        :disabled="disableNext"
                        v-on:click="next"
                        style="	height: 48px;	width: 100px;	border-radius: 24px;	background-color: #796EFF;	color: #FFFFFF;		font-size: 16px;	font-weight: bold;	line-height: 16px;	text-align: center; float:right;">
                        Next
                      </button>
                      <button v-if="testQuestion.qno === testCollection.totalQuestions" v-on:click="completeTest(testCollection.testName)"
                      :disabled="disableNext"
                      style="cursor:pointer;height: 48px;border-radius: 24px;	background-color: #796EFF;	color: #FFFFFF;		font-size: 16px;	font-weight: bold;	line-height: 16px;	text-align: center; float:right;">
                      Complete Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </hr>
      </div>
    </div>
  </div>
</template>
<script>
import { firestore, appengineBaseurl, firebaseAuth } from '~/plugins/firebase.js'
// import Timer from './Timer'
// import { eventBus } from '~/plugins/eventbus.js'
import axios from 'axios'
export default {
  components: {

  },
  data () {
    return {
      testCollection: {},
      testQuestion: {
        answer: null,
        pauseTime: '',
        answerTemplate: '',
        answerType: '',
        multipleAnswersAllowed: false,
        questionId: '',
        questionText: '',
        quickReplies: [],
        qno: 0,
        testOngoing: false,
        hint: ''
      },
      elementIsReady: false
      // testName: '',
      // instructions: ''
    }
  },
  props: ['testId', 'uid'],
  mounted () {
    this.loadTestCollection()
    this.loadQuestion()
  },
  methods: {
    startTest () {
      this.$emit = ('showTest', true)
    },
    previous () {
      const questionNo = this.testQuestion.qno
      this.loadPreviousQuestion(questionNo)
    },
    loadPreviousQuestion (questionNo) {
      firestore.collection('turkers-assessments').doc(this.$route.query.workerId).collection('tests-data').doc('data')
        .collection('question_and_answers').orderBy('qno', 'desc').where('qno', '<', questionNo).limit(1).get()
        .then((doc) => {
          this.resetElements()
          this.loadQuestionData(doc.docs[0].data())
        }).catch((error) => {
          console.error(error)
        })
    },
    completeTest (testName) {
      console.log('TEST COMPLETE', testName)
      this.updateQuestion(this.testQuestion.answer)
      this.updateTestCollection()
      this.$router.push('/Success')
      const options = {
        headers: {'Access-Control-Allow-Origin': '*'}
      }
      axios.post('https://www.mturk.com/mturk/externalSubmit?assignmentId=' + this.$route.query.assignmentId + '&altQuestion=NA', options)
        .then((response) => {
          console.log('RESPONSE', response)
          this.$router.push('/Success')
        })
        .catch((error) => {
          console.error(error)
        })
    },
    updateTestCollection () {
      firestore.collection('turkers-assessments').doc(this.$route.query.workerId).collection('tests-data').doc('status').set({
          isComplete: true
        }, { merge: true }).then().catch()
    },
    disableNextChecked (answer) {
      let hasCheckedAnswer = false
      for (const index in answer) {
        if (answer[index].checked === true) {
          hasCheckedAnswer = true
        }
      }
      this.disableNext = hasCheckedAnswer
    },
    next () {
      let answer = null
      if (this.testQuestion.answerType === 'QUICK_REPLY' && this.testQuestion.multipleAnswersAllowed) {
        answer = this.getCheckedItems()
      } else {
        answer = this.testQuestion.answer
        console.log('after writing an answer', this.testQuestion.answer)
      }
      Promise.all([this.updateQuestion(answer), this.loadQuestionNext()])
        .then().catch((error) => {
          console.error(error)
        })
    },
    getCheckedItems () {
      const checkedItems = []
      for (const index in this.testQuestion.answer) {
        if (this.testQuestion.answer[index].checked === true) {
          checkedItems.push({
            id: this.testQuestion.answer[index].id,
            text: this.testQuestion.answer[index].text
          })
        }
      }
      return checkedItems
    },
    updateQuestion (inputAnswer) {
      console.log('input answer', inputAnswer)
      firestore.collection('turkers-assessments').doc(this.$route.query.workerId).collection('tests-data').doc('data')
        .collection('question_and_answers').doc(this.testQuestion.questionId).set({
          answer: inputAnswer
        }, { merge: true }).then(() => {
          console.log('answer')
        }).catch((error) => {
          return error
        })
    },
    wordCount(str) {
      console.log(';str.split(" ").length;', str.split(" ").length)
      var length = str.split(" ").length
      if (length > 50 || length == 50) {
        this.disableNext = false
        // if (this.testQuestion.qno !== this.testCollection.totalQuestions) {
        //   Promise.resolve(this.next()).then(() => {
        //     // this.loadQuestionNext()
        //     this.disableNext = false
        //   })
        // }
      }
    },
    changeBtnDisability () {
      this.disableNext = false
      if (this.testQuestion.qno !== this.testCollection.totalQuestions) {
        Promise.resolve(this.next()).then(() => {
          this.loadQuestionNext()
        })
      }
    },
    loadQuestionNext () {
      firestore.collection('turkers-assessments').doc(this.$route.query.workerId).collection('tests-data').doc('data')
        .collection('question_and_answers').orderBy('qno').where('qno', '>', this.testQuestion.qno).limit(1).get()
        .then((doc) => {
          this.resetElements()
          this.loadQuestionData(doc.docs[0].data())
          // this.$nextTick(function () {})
        }).catch((error) => {
          console.error(error)
        })
    },
    resetElements () {
      this.testQuestion.answer = []
      this.testQuestion.answerType = ''
      this.testQuestion.questionId = ''
      this.testQuestion.multipleAnswersAllowed = false
      this.testQuestion.questionText = ''
      this.testQuestion.quickReplies = []
      this.testQuestion.answerTemplate = ''
      this.testQuestion.qno = ''
      this.testQuestion.hint = ''
      this.$nextTick()
    },
    loadQuestionData (data) {
      this.testQuestion.answerType = data.answerType
      this.testQuestion.questionId = data.questionId
      this.testQuestion.multipleAnswersAllowed = data.multipleAnswersAllowed
      this.testQuestion.questionText = data.questionText
      this.testQuestion.quickReplies = data.quickReplies
      this.testQuestion.qno = data.qno
      // this.testQuestion.hint = data.hint
      this.testQuestion.answerTemplate = data.answerTemplate
      this.testOngoing = true
      this.testQuestion.answer = (data.answer === null) ? JSON.parse(data.answerTemplate) : data.answer
      var self = this
      this.disableNext = true
      Object.keys(this.testQuestion.answer).map((key) => {
        if (self.testQuestion.answer[key] !== null) {
          this.disableNext = false
        }
      })
      this.$nextTick()
    },
    loadQuestion () {
      firestore.collection('turkers-assessments').doc(this.$route.query.workerId).collection('tests-data')
        .doc('data').collection('question_and_answers').where('answer', '==', null).orderBy('qno').limit(1).get()
        .then((doc) => {
          console.log('FINAL DOC , ', doc)
          if (doc.size === 1) {
            console.log('document', doc)
            // this.resetElements()
            // this.testQuestion.answer = (doc.docs[0].data().answer === null) ? [] : doc.docs[0].data().answer
            this.testQuestion.answerType = doc.docs[0].data().answerType
            this.testQuestion.questionId = doc.docs[0].data().questionId
            this.testQuestion.multipleAnswersAllowed = doc.docs[0].data().multipleAnswersAllowed
            this.testQuestion.questionText = doc.docs[0].data().questionText
            this.testQuestion.quickReplies = doc.docs[0].data().quickReplies
            this.testQuestion.answerTemplate = doc.docs[0].data().answerTemplate
            this.testQuestion.qno = doc.docs[0].data().qno
            this.testQuestion.hint = doc.docs[0].data().hint
            this.testOngoing = true
            this.testStarted = true
            // this.testQuestion.answer = (doc.docs[0].data().answer === null) ? [] : doc.docs[0].data().answer
            if (doc.docs[0].data().answer === null) {
              this.testQuestion.answer = {
                answerText: null,
                quickReply: null,
                quickReplies: null
              }
              this.disableNext = true
            } else {
              this.testQuestion.answer = doc.docs[0].data().answer
              console.log('marked answer', this.testQuestion.answer, doc.docs[0].data().answer)
              this.disableNext = false
            }
            if (doc.docs[0].data().answer === null && doc.docs[0].data().answerType === 'QUICK_REPLY' && doc.docs[0].data().multipleAnswersAllowed) {
              this.testQuestion.answer.quickReplies = []
            }
            console.log('test QUESTION', this.testQuestion)
          } else {
            firestore.collection('turkers-assessments').doc(this.$route.query.workerId).collection('tests-data').doc('data')
              .collection('question_and_answers').orderBy('qno', 'desc').limit(1).get()
              .then((docsFinished) => {
                console.log('FINAL DOC else, ', docsFinished)
                this.testQuestion.answer = docsFinished.docs[0].data().answer
                this.testQuestion.answerType = docsFinished.docs[0].data().answerType
                this.testQuestion.questionId = docsFinished.docs[0].data().questionId
                this.testQuestion.multipleAnswersAllowed = docsFinished.docs[0].data().multipleAnswersAllowed
                this.testQuestion.questionText = docsFinished.docs[0].data().questionText
                this.testQuestion.quickReplies = docsFinished.docs[0].data().quickReplies
                this.testQuestion.answerTemplate = docsFinished.docs[0].data().answerTemplate
                this.testQuestion.qno = docsFinished.docs[0].data().qno
                this.testQuestion.hint = docsFinished.docs[0].data().hint
                this.testOngoing = true
                this.testStarted = true
                this.disableNext = false
                // this.loadQuestionData(docsFinished.docs[0].data())
              })
          }
          this.elementIsReady = true
        }).catch((error) => {
          console.error(error)
        })
    },
    answerChecked (index, checkedValue) {
      this.testQuestion.answer[index].checked = !checkedValue
      // this.disableNextChecked(this.testQuestion.answer)
    },

    // loading test to the user collection

    loadTestCollection () {
      firestore.collection('turk-testCollection').doc('turk_assessment').get()
        .then((gDoc) => {
          firestore.collection('turkers-assessments')
            .doc(this.$route.query.workerId).collection('tests-data')
            .doc('status')
            .get().then((cDoc) => {
              const testCol = {
                description: gDoc.data().description,
                testName: gDoc.data().testName,
                id: gDoc.data().id,
                totalQuestions: gDoc.data().totalQuestions,
              }
              if (cDoc.exists) {
                testCol.isComplete = cDoc.data().isComplete
            }
              this.testCollection = testCol
              console.log('test collection in test comp', this.testCollection)
            }).catch()
        }).catch()
    }
  }
}
</script>
<style lang="css" scoped>
.form-control:focus{
  /* border:none; */
  box-shadow: none;
}
input[type="radio"]:checked {
    /* -webkit-appearance: none; */
    /* -moz-appearance: none; */
    /* -o-appearance: none; */
    /* appearance: none; */
    /* height: 20px; */
    /* width: 20px; */
    /* min-height: 20px; */
    /* min-width: 20px; */
    border: 1px solid #796EFF !important;
    /* border-radius: 2px; */
    background-color: #796EFF !important;
    /* background-image: url(../../../../assets/svg/Tick-Mark-in-Profile-Section.svg); */
    /* background-size: 10px 10px; */
    background-position: center;
    outline: transparent;
    box-shadow: none;
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
  .cardFooterCss{
    	height: 72px;	border-radius: 0 0 4px 4px;background-color: rgba(247,247,247,0.54);
  }
  .btnCss{
    height: 48px;	width: 100px;	border-radius: 24px;	background-color: #796EFF;
    	color: #FFFFFF;		font-size: 16px;	font-weight: bold;	line-height: 16px;	text-align: center; float: right;
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
  button:focus {
    outline: none;
  }
  textarea.form-control{
    min-height: 120px;
  }
</style>
