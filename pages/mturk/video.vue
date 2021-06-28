<template>
  <div class="">
    <!-- <div v-if="elementIsReady !== true" class="container-fluid page-content display-column-flex" style="height: auto; width: 100%;overflow: auto;margin-top: 3%;margin-left: 2%;">
      <div id="loader"></div>
    </div> -->
    <div  class="row" style=" margin-left: 15rem; padding: 0px 10px">
      <div class="col-lg-8" style="">
        <div class="">
          <div class="card cardCss">
            <div class="card-body" style="padding:0px;">
              <div class="card-header">
                <!-- <p style="margin-top: 4px;"> -->

                  <!-- <span>Self-Introduction Video</span> -->
                <!-- </p> -->
                <h3>
                  <img v-on:click="$router.go(-1)" style="cursor:pointer;width: 14px;margin-right: 2%;" src="../../assets/svg/Go-Back-Arrow-Purple.svg" alt="">
                  Self-Introduction Video
                </h3>
              </div>
              <div class="instructionsDiv">
                <p style="font-family: Muli Bold;">Instructions:</p>
                <p> A self-introduction video can give potential employers or customers a
                  window into who you are and what you’d be like to work with.
                  Giving a few details can help your viewers feel like they know—and
                  like you—long before you meet.</p>
              </div>
              <div class="" v-if="loaderShow" style="width: 50%;margin: 0 auto;margin-top: 8%;">
                <p style="text-align: center;font-family: Muli Bold;">Uploading your video file</p>
                <v-progress-linear
                :active='loaderShow'
                color="deep-purple accent-4"
                indeterminate
                rounded
                height="6"
                ></v-progress-linear>
              </div>
              <div class="" v-if="!loaderShow">
                <div class="" v-if="!showpreview">
                  <v-stepper v-model="e1" class="customCssStepper">
                    <v-stepper-header style="box-shadow;none !important;border:none;">
                      <v-stepper-step
                      :complete="e1 > 1"
                      step="1">
                      Choose Upload option
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step
                    :complete="e1 > 2"
                    step="2">
                    Upload/Record Video
                  </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card
                    class=""
                    height="200px">
                    <div class="row" style="height: 150px;">
                      <div class="col-lg-12">
                        <div class="row">
                          <div class="col-lg-1 col-md-1 col-sm-1" style="text-align: right;margin-top: 1%;">
                            <input checked class="radio" type="radio" @click="getInput" name="intro" id="liveRec" value="live" style="width: 18px;height: 18px;">
                          </div>
                          <div class="col-sm-10 col-md-10 col-lg-10" style="padding-left: 0px;">
                            <label for="liveRec" style="font-family: Muli Bold;">Record live</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <!-- <v-btn color="red">TEST</v-btn> -->
                        <div class="row">
                          <div class="col-lg-1 col-md-1 col-sm-1" style="text-align: right;margin-top: 1%;">
                          <input class="radio" type="radio" @click="getInput" id="uploadFile" name="intro" value="upload" style="width: 18px;height: 18px;">
                          </div>
                          <div class="col-sm-10 col-md-10 col-lg-10" style="padding-left: 0px;">
                            <label for="uploadFile" style="font-family: Muli Bold;">Upload from computer</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="" style="text-align:right;">
                      <button class="testBtnPrimary" @click="nextStep">
                        Next
                      </button>
                    </div>
                  </v-card>
                </v-stepper-content>
                <v-stepper-content class="stepperContent2" step="2">
                  <div  class="" v-if="uploadBtn" style="text-align: -webkit-center;">
                    <div draggable="true" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)" class="dragCss">
                      <div class="dragContent">
                        <p style="margin-bottom:0px;font-family: Muli SemiBold;font-size: 14px;" v-if="this.fileToUpload !== null">{{displayFileName}}</p>
                        <p style="margin-bottom:0px;font-family: Muli SemiBold;font-size: 14px;" v-else>Drag a mp4 or webm file here</p>
                        <p v-if="this.fileToUpload === null"> <small class="text-muted" style="margin-bottom:4px;font-family: Muli SemiBold;">or, if you prefer</small> </p>
                        <button v-on:click="uploadFile()" class="dragBtnPrimary">
                          Select from your computer
                        </button>
                        <input id="browseLinkedInProfileInput"
                        type="file" ref="browseLinkedInProfileInput"
                        v-on:change="handleFileUpload($event)"
                        style="visibility: hidden"/>
                      </div>
                    </div>
                    <div class="" style="text-align: right;">
                      <button style="display:initial" id="cancelE1" class="testBtn" v-on:click="resetUpload()">
                        Cancel
                      </button>
                      <button class="testBtnPrimary" v-on:click="uploadFromComputer()">
                        Upload
                      </button>
                    </div>
                  </div>
                  <div class="" v-show="liveBtn">
                  </video>
                  <video  id="preview" class="feed"  muted="muted" style="width: 700px;margin: 0 auto;padding-bottom: 4%; margin-top: 2%;">
                  </video>
                  <video class="recorded" id="recording" controls="true" muted="muted" style="width: 700px;margin: 0 auto;padding-bottom: 4%; margin-top: 2%;">
                  </video>
                  <div class="" style="text-align: center;">
                    <button type="button" id="startButton" class="testBtnPrimary" style="width: auto !important"  v-on:click="startrecord()">Start Recording</button>
                    <button type="button" class="testBtn" style="display: none;" id="reRecord" v-on:click="startrecord()">Rerecord</button>
                    <button type="button" class="testBtnPrimary" style="display: none;" id="upload" v-on:click="getRecordedData()">upload</button>
                    <button type="button" class="testBtn" id="cancelButton" v-if="cancelBtn"  v-on:click="cancelRecord()">Cancel</button>
                    <button type="button" id="stopButton" v-else class="testBtnCancel" v-on:click="stop(preview.srcObject)">Stop Recording</button>
                  </div>
                </div>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </div>
        <div class="col-lg-12" v-if="showpreview">
          <div class="card cardCss" style="margin-top:0%;border: none;margin-bottom:0%;">
            <div class="card-body" style="padding:0px;">
              <div>
                <div class="card-header" style="background: transparent;border: none;">
                  <h3>Preview</h3>
                </div>
                <div style="text-align: center;margin: 3%;">
                  <video id="" style="width:700px;" :src="downloadUrlFetched" autoplay muted controls poster="posterimage.jpg">
                  </video>
                </div>
                <div class="" style="text-align: right;padding:4%;">
                  <button class="testBtnPrimary" style="width: 200px;" v-on:click="UpdateIntro()">
                    Update intro video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
              </div>
      <input id="browseLinkedInProfileInput"
      type="file" ref="browseLinkedInProfileInput"
      v-on:change="handleFileUpload($event)"
      style="visibility: hidden"/>
    </div>
  </div>
</div>
</div>
<div class="col-lg-3">
  <div class="card cardCssInst">
    <div class="card-body" style="padding:0px;">
      <div class="card-header">
        <h3>Questions</h3>
      </div>
      <div class="instructionsDiv">
        <p><ul style="margin-left: 9%;">
            <li>Introduce yourself.</li>
            <li>You can talk about your interests or previous experience.</li>
            <li>How would you describe yourself?</li>
            <li>Some problems you see with the world?</li>
            <li>About one of the best times of your life.</li>
          </ul></p>
      </div>
    </div>
  </div>
</div>
</div>
</div>

</template>
<script>
// import Sidebar from '~/components/SubComponents/JobSideBarCandidate.vue'
// import Topbar from '~/components/SubComponents/CandidateDashboardTopBar.vue'
import {projectId, storage, firestore} from '~/plugins/firebase.js'
// import vue2Dropzone from 'vue2-dropzone'
// import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  components: {
  },
  data () {
    return {
      loaderShow: false,
      elementIsReady: false,
      displayFileName: '',
      showpreview: false,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { 'My-Awesome-Header': 'header value' }
      },
      e1: 1,
      cancelBtn: false,
      playsinline: true,
      playerOptions: { // player configuration
        muted: false, // whether to mute
        language: 'en',
        width: '500px',
        height: '500px',
        playbackRates: [0.7, 1.0, 1.5, 2.0], // Playback speed
        sources: [{
          type: 'video/mp4',
          src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }],
        poster: ''
      },
      fileToUpload: null,
      uploadBtn: false,
      liveBtn: false,
      crumbs1value: 'Intro Video',
      stream: null,
      preview: null,
      VideoUrl: null,
      videoStream: null,
      videoFile: null,
      uploadSuccess: {
        flag: false,
        text: 'Your Resume has been uploaded successfully.'
      },
      downloadUrlFetched: '',
      videoToUpload: null,
      showRecording: false,
      showReview: false,
      uploadError: {
        flag: false,
        text: ''
      }
    }
  },
  watch: {
    videoFile: function (newValue) {
      if (newValue !== null && newValue !== undefined) {
        if (newValue.name.match(/.?\.mp4$/) || newValue.name.match(/.?\.webm$/)) {
          console.log(newValue.name)
          this.uploadVideo(newValue)
        } else {
          this.uploadError.flag = true
          this.uploadError.text = 'Only Resume of \'.mp4\' or \'.mp4\' format are supported.'
          // this.browseFileModal = false
        }
      }
    }
  },
  mounted () {
    console.log('COMPONENT', this.show_inst)
    var url = window.location.href
    if (this.$route.query.assignmentId == undefined || this.$route.query.hitId == undefined || this.$route.query.workerId == undefined || this.$route.query.turkSubmitTo == undefined) {
      this.$router.push('/error')
    }
    firestore.collection('turkers-assessments').doc(this.$route.query.workerId)
      .collection('video-data').doc('document')
      .get().then((resp) => {
        if (resp.exists) {
          console.log('Video Available', resp.data())
          this.showpreview = true
          this.downloadUrlFetched = resp.data().firebaseStorageUrl
          this.elementIsReady = true
        } else {
          this.elementIsReady = true
        }
      })
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    resetUpload () {
      this.displayFileName = ''
      this.fileToUpload = null
      this.e1 = 1
    },
    clickUpload () {
      // console.log(e)
      let file = document.getElementById('videoUploadInput').click()
      console.log(file)
      // e.dispatchEvent(new Event('input'))
      // e.dispatchEvent(event)
    },
    UpdateIntro () {
      console.log('updateINtro')
      this.showpreview = false
      this.e1 = 1
    },
    allowDrop (event) {
      console.log(event)
      event.preventDefault()
    },
    drop (event) {
      event.preventDefault()
      if (event.dataTransfer.files[0].name.match(/.?\.mp4$/) || event.dataTransfer.files[0].name.match(/.?\.webm$/)) {
        this.fileToUpload = event.dataTransfer.files[0]
        this.displayFileName = this.fileToUpload.name
        console.log('drop event', this.fileToUpload)
      } else {
        console.log('only video file')
      }
      // input.files = event.dataTransfer.files;
    },
    cancelRecord () {
      // let localStream = ''
      this.e1 = 1
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(mediaStream => {
        // mediaStream.getTracks()
        var video = document.querySelector('video')
        video.src = ''
        var audioTracks = mediaStream.getAudioTracks()
        var videoTracks = mediaStream.getVideoTracks()
        // videoTracks.stop()
        // audioTracks.stop()
        console.log('MEDIA STOPPER', videoTracks, audioTracks)
        videoTracks[0].enabled = false
        audioTracks[0].enabled = false
        videoTracks[0].stop()
        audioTracks[0].stop()
        // mediaStream.getTracks().forEach((track) => {
        //   track.enabled = false
        //   track.readyState = 'ended'
        //   console.log(track, mediaStream)
        // })
        // var video = document.querySelector('video')
        // window.localStream.getVideoTracks()[0].stop()
        // video.src = ''
        // console.log(window.localStream.getVideoTracks()[0].stop())
      })
      document.getElementById('preview').style.display = 'none'
      document.getElementById('recording').style.display = 'none'
      document.getElementById('reRecord').style.display = 'none'
      document.getElementById('upload').style.display = 'none'
      document.getElementById('startButton').style.display = 'none'
      // document.getElementById('stopButton').style.display = 'none'
      // console.log('stop', stream)
      this.showRecording = false
      this.uploadBtn = false
      // this.liveBtn = false
      this.cancelBtn = false
      this.stream = null
      this.preview = null
    },
    showRecord () {
      this.showRecording = true
      this.cancelBtn = true
      if (this.showRecording) {
        document.getElementById('preview').style.display = 'block'
        document.getElementById('recording').style.display = 'none'
        document.getElementById('startButton').style.display = 'initial'
        // console.log()
        // console.log()
        // let recording = document.getElementById('recording')
        var constraints = { audio: true, video: { width: 1280, height: 720 } }
        navigator.mediaDevices.getUserMedia(constraints)
          .then(function (mediaStream) {
            var video = document.querySelector('video')
            video.srcObject = mediaStream
            video.onloadedmetadata = function (e) {
              video.play()
            }
          })
      }
    },
    uploadFromComputer () {
      this.loaderShow = true
      this.videoFile = this.fileToUpload
    },
    uploadVideo (file) {
      let link = document.createElement('a')
      link.download = this.generateFileName()
      link.href = file
      // link.click()
      console.log('getdata', link.download)
      const metadata = {
        name: link.download,
        contentType: 'video'
      }
      const storageRef = storage.ref().child(projectId + '/turkers/intro-video/' + link.download)
      const uploadTaskComplete = storageRef.put(file, metadata)
      // const fileName = this.generateFileName()
      // const storageRef = storage.ref().child(projectId + '/candidate/intro-video/' + fileName)
      // const uploadTaskComplete = storageRef.put(file, metadata)
      Promise.resolve(uploadTaskComplete).then(async () => {
        console.log('UPLOAD COMPLETE')
        await Promise.resolve(storageRef.getDownloadURL())
          .then((url) => {
            console.log('URL', url.split('?')[0])
            // this.resumeData.downloadUrl = url
            this.loaderShow = false
            this.downloadUrlFetched = url
            // this.playerOptions.sources.src = url.split('?')[0]
            this.showpreview = true
            this.showRecording = false
            // document.getElementById('videoPreview').style.display = 'block'
            this.showRecording = false
            console.log('Downloaded URL', this.downloadUrlFetched)
            firestore.collection('turkers-assessments').doc(this.$route.query.workerId)
              .collection('video-data').doc('document')
              .set({
                name: link.download,
                metadata: metadata,
                firebaseStorageUrl: this.downloadUrlFetched
              }, { merge: true }).then(() => {
              // return null
              }).catch((error) => {
                return error
              })
          }).catch((error) => {
            self.uploadError.flag = true
            self.uploadError.text = 'Failed to upload file'
            console.log('ERROR IN upload', error.message)
            return error
          })
      })
    },
    uploadFile () {
      document.getElementById('browseLinkedInProfileInput').click()
    },
    handleFileUpload (event) {
      this.fileToUpload = this.$refs.browseLinkedInProfileInput.files[0]
      this.displayFileName = this.fileToUpload.name
      console.log('File', this.fileToUpload)
    },
    getInput () {
      var newVal = document.querySelector('input[name="intro"]:checked')
      console.log('RADIO', newVal.value)
      if (newVal.value === 'upload') {
        this.uploadBtn = true
        this.liveBtn = false
      } if (newVal.value === 'live') {
        this.liveBtn = true
        this.uploadBtn = false

        // this.showRecord()
      }
    },
    nextStep () {
      var newVal = document.querySelector('input[name="intro"]:checked')
      console.log('RADIO', newVal.value)
      console.log('liveBtn', this.liveBtn)
      if (newVal.value === 'upload') {
        this.uploadBtn = true
        this.liveBtn = false
      } if (newVal.value === 'live') {
        this.liveBtn = true
        this.uploadBtn = false
        console.log('liveBtn', this.liveBtn)
        this.showRecord()
      }
      // this.showRecord()
      this.e1 = 2
    },
    getData (e) {
      const file = e.target.files[0]
      const videoEl = document.createElement('video')
      videoEl.src = window.URL.createObjectURL(file)
      this.videoStream = videoEl.src
      console.log('INPUT DATA', videoEl.src)
    },
    sendtoDatabase () {
      console.log('video url', this.VideoUrl)
    },
    startrecord () {
      this.cancelBtn = false
      document.getElementById('reRecord').style.display = 'none'
      document.getElementById('upload').style.display = 'none'
      document.getElementById('startButton').style.display = 'none'
      document.getElementById('recording').style.display = 'none'
      document.getElementById('preview').style.display = 'block'
      let recording = document.getElementById('recording')
      this.preview = document.querySelector('video')
      // let recordingTimeMS = 5000
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        this.preview.srcObject = stream
        // downloadButton.href = stream
        this.preview.captureStream = this.preview.captureStream || this.preview.mozCaptureStream
        console.log(this.preview.captureStream)
        return new Promise(resolve => {
          this.preview.onplaying = resolve
        })
      }).then(() => this.startRecording(this.preview.captureStream()))
        .then(recordedChunks => {
          console.log('RECORDED CHUNKS', recordedChunks)
          let recordedBlob = new Blob(recordedChunks, { type: 'video/webm' })
          console.log('RECORDED BLOB', recordedBlob)
          this.VideoUrl = recordedBlob
          // this.getRecordedData(recordedBlob)
          recording.src = URL.createObjectURL(recordedBlob)
          this.videoToUpload = recording.src
          // this.getRecordedData(recording.src)
          // document.getElementById('downloadButton').href = recording.src
          // document.getElementById('downloadButton').download = 'RecordedVideo.webm'
          console.dir(document.getElementById('downloadButton'))
          console.log('Successfully recorded', recording)
        }).catch()
    },
    generateFileName () {
      const rStr = (Math.floor(Math.random() * (+10000000000 - +1000000000)) + +1000000000)
      const dStr = ((new Date()).getFullYear() + (new Date()).getMonth() + (new Date()).getDate() + (new Date()).getHours() + (new Date()).getMinutes() + (new Date()).getSeconds() + (new Date()).getMilliseconds())
      return (rStr + '_' + dStr + '.webm')
    },
    startRecording (stream) {
      let recorded
      let recorder = new MediaRecorder(stream)
      let data = []
      recorder.ondataavailable = event => data.push(event.data)
      recorder.start()
      console.log(recorder.state + 'seconds...')
      let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve
        recorder.onerror = event => reject(event.name)
      })
      setTimeout(() => {
        recorded = recorder.state === 'recording' && recorder.stop()
      }, 180000
      )
      return Promise.all([
        stopped,
        recorded
      ]).then(() => data)
    },
    stop (stream) {
      console.log('this is stream', stream)
      this.cancelBtn = true
      document.getElementById('reRecord').style.display = 'inline'
      document.getElementById('upload').style.display = 'inline'
      document.getElementById('recording').style.display = 'block'
      document.getElementById('preview').style.display = 'none'
      stream.getTracks().forEach(track => track.stop())
      // this.getRecordedData()
      // streamRecorder.getRecordedData(postVideoToServer)
    },
    getRecordedData () {
      this.loaderShow = true
      let link = document.createElement('a')
      link.download = this.generateFileName()
      link.href = this.videoToUpload
      // link.click()
      console.log('getdata', this.videoToUpload)
      const metadata = {
        name: link.download,
        contentType: 'video',
        extension: '.webm'
      }
      const storageRef = storage.ref().child(projectId + '/turkers/intro-video/' + link.download)
      const uploadTaskComplete = storageRef.put(this.VideoUrl, metadata)
      Promise.resolve(uploadTaskComplete).then(async () => {
        console.log('UPLOAD COMPLETE')
        await Promise.resolve(storageRef.getDownloadURL())
          .then((url) => {
            console.log('URL', url.split('?')[0])
            this.loaderShow = false
            // this.resumeData.downloadUrl = url
            this.downloadUrlFetched = url
            // this.playerOptions.sources.src = url.split('?')[0]

            this.showRecording = false
            this.showpreview = true
            // document.getElementById('videoPreview').style.display = 'block'
            console.log('Downloaded URL', this.downloadUrlFetched)
            firestore.collection('turkers-assessments').doc(this.$route.query.workerId)
              .collection('video-data').doc('document')
              .set({
                name: link.download,
                metadata: metadata,
                firebaseStorageUrl: this.downloadUrlFetched
              }, { merge: true }).then(() => {
              // return null
              }).catch((error) => {
                return error
              })
          }).catch((error) => {
            this.uploadError.flag = true
            this.uploadError.text = 'Failed to upload file'
            console.log('ERROR IN upload', error.message)
            return error
          })
      })
      // let file = {
      //   fname: 'newVideo',
      //   data: blob
      // }
      // var fd = new FormData()
      // console.log('fd', fd)
      // fd.append('fname', 'test.webm')
      // fd.append('data', blob)
      // console.log('data redordec', fd, file)
    }
  }
}
</script>
<style  media="screen">
@font-face {
    font-family: 'Muli';
    src: url('../../assets/fonts/Muli/Muli.ttf') format('truetype');
}
@font-face {
    font-family: 'Muli SemiBold';
    src: url('../../assets/fonts/Muli/Muli-SemiBold.ttf') format('truetype');
}
/* .v-application {
  font-family: 'Muli' !important;
} */
button:focus {
    /* outline: 1px dotted; */
    outline: none !important;
}
  .v-stepper__step {
    padding: 26px;
  }
  .v-stepper.customCssStepper {
    box-shadow: none !important;
    border: none;
  }
  .v-stepper.customCssStepper > .v-stepper__header {
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, .125);
  }
  .v-stepper__step__step.primary {
    background-color: #796EFF !important;
    border-color: #796EFF !important;
  }
  /* .v-stepper__label {
    font-family: Muli SemiBold;
  } */
  .v-sheet.v-card  {
    box-shadow: none !important;
  }

  .v-stepper .v-stepper__label  {
    font-family: 'Muli SemiBold' !important;
  }
</style>
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
h3 {
  /* margin-top: 15px; */
    color: rgb(35, 35, 35);
    font-family: Muli;
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
}
p {
  color: #232323;
    font-family: Muli;
    font-size: 14px;
    font-weight: 400;
    /* line-height: 14px; */
}
button {
  font-family: Muli;
}
#loader {
  /* background-image: url('../../../assets/loader1.svg'); */
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  display: block;
  height: 100px;
  width: 100px;
  margin: calc((340px - 100px)/2) auto;
}
/* input[type=radio] {
  display: none;
} */
/* input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  width: 18px;
  height: 25px;
  background-clip: content-box;
  border: 2px solid grey;
  border-radius: 50%;
}
input[type=radio]:checked {
  border-radius: 50%;
  width: 18px !important;
  height: 18px !important;
  padding: 6px;
  content: " ";
  background: #796EFF !important;
} */
.dragContent{
  margin: 12% auto;
  width: 80%;
  text-align: center;
  font-family: Muli;
}
.dragBtnPrimary {
  border: none;	border-radius: 24px;	background-color: transparent;
  cursor: pointer;
  padding: 0 3%;
  color:  #796EFF;
  font-family: Muli Bold;	font-size: 16px;
  /* line-height: 12px; */
}
.dragBtnPrimary:hover {
  border-bottom: 1px solid #796EFF;
  border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  /* border: 2px solid #796EFF;	 */
  /* border-radius: 24px; */
  /* background-color:#796EFF ; */
  /* cursor: pointer;
  padding: 0 3%; */
  /* color:  #FFFFFF; */
  /* line-height: 12px; */
}
.dragCss{
  min-width: 200px;
  max-width: 700px;
  height: 300px;
  border: 1px #80808059 dashed;
  margin-bottom: 5%;
}
.feed {
  margin-top: 3%;
}
.cardCss{
  border-radius: 4px;	background-color: #FFFFFF; box-shadow: none;
  margin-top:4%;
  margin-bottom: 4%;
}
.cardCssInst{
  border-radius: 4px;	background-color: #FFFFFF; box-shadow: none;
  margin-top:12%;
  margin-bottom: 4%;
}
.recorded {
  margin-top: 2%;
  display: none;
}
.instructionsDiv{
  font-family: Muli;
  width: 100%;
  /* line-height: 12px; */
  padding: 3%;
}
.testBtn{
  margin-right: 2%;
  height: 48px;	min-width: 134px;	border: 2px solid #796EFF;	border-radius: 24px;	background-color: #FFFFFF;
  cursor: pointer;
  padding: 0 3%;
  color: #796EFF;	font-family: Muli;	font-size: 16px;	font-weight: bold;	line-height: 16px;
}
.testBtnCancel {
  margin-right: 2%;
  height: 48px;	min-width: 134px;	border: 2px solid #796EFF;	border-radius: 24px;	background-color: #FFFFFF;
  cursor: pointer;
  padding: 0 3%;
  color: #796EFF;	font-family: Muli;	font-size: 16px;	font-weight: bold;	line-height: 16px;
}
.testBtnPrimary {
  margin-right: 2%;
  height: 48px;	width: 134px;	border: 2px solid #796EFF;	border-radius: 24px;	background-color:#796EFF ;
  cursor: pointer;
  padding: 0 3%;
  color:  #FFFFFF;	font-family: Muli;	font-size: 16px;	font-weight: bold;	line-height: 16px;
}
.stepperContent2 {
  max-width: 700px;
  margin: 2% auto;
}

</style>
