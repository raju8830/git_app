<template>




  <div class="wrapper">
    <div class="button active">
      <a :href="express_server_url+'/auth'">
        <span>Github</span>
      </a>
    </div>
    <div class="button">
      <a href="#">
        <span>Twitter</span>
      </a>
    </div>
    <div class="button">
      <a href="#">
        <span>Instagram</span>
      </a>
    </div>
    <div class="button">
      <a href="#">
        <span>Github</span>
      </a>
    </div>
    <div class="button">
      <a href="#">
        <span>YouTube</span>
      </a>
    </div>

  </div>


</template>

<script>
export default {
  created(){
     let checktokenexist = Object.entries(this.$route.query).length;
      if(checktokenexist >1){
            this.$router.push({name: 'Home'})
      }
      this.express_server_url = express_server_url;
  },
  data(){
    return{
      express_server_url: "",
    }
  }
}
</script>

<style>
.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.wrapper .button{
  display:inline-block;
  height:60px;
  width:60px;
  float: left;
  margin:0 5px;
  background:#fff;
  border-radius:50px;
  cursor:pointer;
  box-shadow:0px 10px 10px rgba(0,0,0,0.1);
  transition:all .3s ease-out;
  overflow:hidden;
}

.wrapper .button span{
  font-size:20px;
  font-weight:500;
  line-height:60px;
  margin-left:10px;
  transition:all .3s ease-out;
}
.wrapper .button:hover{
  width:200px;
}

.wrapper .button a{
  text-decoration:none;
  color:#333;
}




.wrapper .button:nth-child(1) span{
  color:#4267B2;
}
.wrapper .button:nth-child(2) span{
  color:#1DA1F2;
}
.wrapper .button:nth-child(3) span{
  color:#E1306C;
}
.wrapper .button:nth-child(4) span{
  color:#333;
}
.wrapper .button:nth-child(5) span{
  color:#ff0000;
}

</style>