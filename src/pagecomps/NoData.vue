<template>
  <div class="no-data" v-if="dataSource? dataSource.length == 0 : noDataProps.dataSource.length==0">
    <img src="../assets/no-data.png" />
    <p>
      {{noDataProps.msg}}
      <a href="#" @click.prevent="noDataHandler">{{noDataProps.action}}</a>
    </p>
  </div>
</template>

<script>
export default {
    props:{
        dataSource:{
          default:()=>null
        },
        noDataProps:{
            default:{
                dataSource:[],
                msg:'暂无商品，点击',
                action:'新增商品'
            }
        }
    },
    inject:['noDataHandler']
};
</script>

<style lang="css" scoped>
.no-data {
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.no-data img {
  width: 440px;
  height: 300px;
}
.no-data p {
  margin-top: 20px;
  font-size: 20px;
  line-height: 28px;
  color: #999;
}
</style>