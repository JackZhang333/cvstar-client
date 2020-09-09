<template>
  <div class="upload-wrapper">
    <div class="upload" @click="click" v-if="!imageUrl">
      
    </div>
    <div class="preview" v-else>
        <div class="image" ref="preview">
            <img :src="imageUrl" alt="">
        </div>
        <span class="btn" @click="click">重新上传</span>
    </div>
    <input type="file" style="display:none" ref="uploadFile" @change="upload" accept="image/*" />
  </div>
</template>

<script>
export default {
  props:['imageUrl'],
  data() {
    return {
      action: "url",
      fileHeader: {
        Authorization: "token",
      },
      filename: "",
      url: "",
    };
  },
  methods: {
    upload(event) {
      let files = event.target.files;
      let reader = new FileReader();
      let self =this
      reader.onload = function (e) {
        let imgBase64str = e.target.result;

        let img = new Image();
        img.src = imgBase64str;
        img.onload = function () {
          let originW = img.width;
          let originH = img.height;

        //   console.log("原始尺寸：" + originW + "/" + originH);

          let targetW, targetH;
          targetW = targetH = 200;
          //如果宽高比大于1则重新计算高度，保证不变形
          if (originW / originH > 1) {
            targetH = Math.round((originH / originW) * targetW);
          } else {
            targetW = Math.round((originW / originH) * targetH);
          }
        //   console.log("压缩尺寸：" + targetW + "/" + targetH);
          //借助canvas压缩图片
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");

          canvas.width = targetW;
          canvas.height = targetH;

          context.clearRect(0, 0, targetW, targetH);
          context.drawImage(img, 0, 0, targetW, targetH);

          let image = canvas.toDataURL("image/jpeg", 0.92);
          self.$emit('update:imageUrl',image)
          
        };

        // console.log(this.imgBase64str)
      };
      reader.readAsDataURL(files[0]);
    },
    click() {
      this.$refs.uploadFile.click();
    },
    
  },
  created(){
      // console.log('vue对象被生成了')
  },

};
</script>

<style lang="css" scoped>
.upload-wrapper {
  display: inline-block;
}
.upload {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-image: url("../assets/upload.png");
  background-size: 100px;
  cursor: pointer;
}
.upload:hover {
  background-position: 0 -105px;
}
.upload:active {
  background-position: 0 -210px;
}
.preview {
    width: 100px;
    text-align: center;
}
.image {
    height: 100px;
    border-radius: 2px;
    background-color:rgba(0, 0, 0, .65);
    background-size: contain;
    background-repeat: no-repeat;
    overflow: hidden;
    margin: 0 auto;
    line-height: 100px;
}
.image img {
    height: 100px;
}
.btn {
    font-size: 12px;
    color: #108cee;
    cursor: pointer;
    margin-top: 10px;
}
</style>