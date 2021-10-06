<template>
  <div class="row">
    <navbar/>
    <div class="row mt-5 d-flex justify-content-center">
      <div class="col-md-5">
        <div class="card">
          <div class="header_title">
            Your Github
          </div>

          <div class="user">
            <img style="width: 150px;border:1px solid #ddd;border-radius: 10px" :src="userinfo.avatar_url" alt="">
            <div class="user_name">
              <h2>zxcvh{{userinfo.name}}</h2>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card">
          <div class="header_title">
            Your Repositories Information
          </div>
          <div class="card-body">
            <table class="table">
              <tr>
                <th>Repositories</th>
                <th>Popular repositories</th>
                <th>Created</th>
              </tr>
              <tr>
                <td><div class="card-body">
                  <form class="d-flex mb-3">
                    <input class="form-control me-2" v-model="searchQuery" type="search" placeholder="Search" aria-label="Search">
                  </form>
                  <ul>
                    <li v-for="(repo,index) in filterRepo" :key="index"><a :href="repo.clone_url">{{repo.name}}</a> <br></li>
                  </ul>
                </div></td>
                <td>{{userinfo.public_repos}}</td>
                <td>{{userinfo.created_at}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/Navbar.vue';
export default {
  mounted(){
    let checktokenexist = Object.entries(this.$route.query).length;
    if(checktokenexist <1){
       this.$router.push({ name:'Login' });
      return;
    }else{
      this.getUserData(this.$route.query.token);
    }
  },
  data(){
    return {
      searchQuery: "",
      userinfo : {},
      repositories: []
    }
  },
  methods:{
    getUserData(token){
      console.log(token)
        axios.defaults.headers.common['Authorization'] = 'token '+token;

        axios.get('https://api.github.com/user')
        .then((res) => {
          this.userinfo = res.data;
          this.getUserRepo(res.data.repos_url);
          console.log(res);
    
        })
        .catch( (e) => {
          this.$router.push({ name:'Login' });
        })
    },

    getUserRepo(repos_url){
      axios.get(repos_url)
      .then( (res) => { 
          this.repositories = res.data;
      })
      .catch( (e) => { 
          console.log(e);
      })
    }
  },
  computed: {
    filterRepo(){
      if(this.searchQuery){
      return this.repositories.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
      })
      }else{
        return this.repositories;
      }
  }
  },
  name: 'Home',
  components: {
    Navbar
  }
}
</script>
<style>
table {
  border-collapse: collapse;
}
table td, table th {
  border: 1px solid #ddd;
  padding: 8px;
}
table tr:nth-child(even){
  background-color: #f2f2f2;
}
table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}



.header_title{
  background: #353535;
  padding: 10px 0;
  text-align: center;
  font-size: 25px;
  color: #ffffff;
}


ul{
  list-style: none;
}
li{
  display: block;
  padding: 8px 10px;
  border-radius: 5px;
}
ul li:hover{

  background: #c2bfbf;
}
li:nth-child(even){
  background: #ddd;
  border-radius: 5px;
}
ul li a{
  text-decoration: none;
  color: #000;
  font-size: 18px;
  font-weight: bold;
}
ul li a:hover{
  color: black;
}

.user{
  margin-left: 30px;
  justify-content: center;
  align-items: center;
}
</style>