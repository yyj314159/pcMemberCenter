<template>
<div class="loading">
  <div class="loader-inner">
    <div><div></div></div>
    <div><div></div></div>
    <div><div></div></div>
  </div>
</div>
</template>
<style lang='scss' scope>
.loading {
  display: flex;
  justify-content: center;
  .loader-inner {
    display: flex;
    height:60px;
    align-items: center;
    justify-content: space-around;
    width: 65px;
    &>div:nth-child(1){
        width:10px;
        height:10px;
        animation-fill-mode: both;
        display: flex;
        align-items: center;
        justify-content: center;
        &>div{
          animation: line-scale1 .9s infinite ease;
          background-color: #3d9be9;
          border-radius: 50%;
        }
    }
    &>div:nth-child(2){
        width: 10px;
        height:10px;
        animation-fill-mode: both;
        display: flex;
        align-items: center;
        justify-content: center;
        &>div{
          animation: line-scale2 .9s infinite ease;
          background-color: #3d9be9;
          border-radius: 50%;
        }
    }
    &>div:nth-child(3){
        width: 10px;
        height:10px;
        animation-fill-mode: both;
        display: flex;
        align-items: center;
        justify-content: center;
        &>div{
          animation: line-scale3 .9s infinite ease;
          background-color: #3d9be9;
          border-radius: 50%;
        }
    }
  }
}
@keyframes line-scale1 {
  0% {
    width: 10px;
    height:10px;
  }
  25% {
    width: 8px;
    height:8px;
  }
  50% {
    width: 6px;
    height:6px;
  }
  75%{
    width: 8px;
    height:8px;
  }
  100%{
    width: 10px;
    height:10px;
  }
}

@keyframes line-scale2 {
  0% {
    width: 8px;
    height:8px;
  }

  25% {
    width: 10px;
    height:10px;
  }

  50% {
    width: 8px;
    height:8px;
  }
  75%{
    width: 10px;
    height:10px;
  }
  100%{
    width: 8px;
    height:8px;
  }
}
@keyframes line-scale3 {
  0% {
    width: 6px;
    height:6px;
  }

  25% {
    width: 8px;
    height:8px;
  }

  50% {
    width: 10px;
    height:10px;
  }
  75%{
    width: 8px;
    height:8px;
  }
  100%{
    width: 6px;
    height:6px;
  }
}
</style>
