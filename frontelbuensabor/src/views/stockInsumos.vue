<template>
  <div>
    <div class="header"></div>
    <div id="nav"><menuLateral></menuLateral>    
    </div>

    <div class="costado"></div>
    <section class="informacion">
      <h1>Stock de insumos</h1>
    </section>
    
    <router-view />
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";
export default {
  components: {
    "menuLateral": MenuLateral
  }
  
};
</script>
<style>
h1{
  font-family: 'Baloo Bhaina 2';
  font-weight: 600;
  font-size: 18pt; 
  color:#151515;
}

.costado{
    background-image: url("../assets/images/sistema/reticulaVertical.png");
    background-repeat: repeat-y;
    position: absolute;
    left: 0;
    height: 100%;
    min-width: 200px;
    background-size: contain;
}

.informacion{
  background-color: red;
  width: 50%;
  min-height: 100px; 
  margin-left: 30%;
  padding: 20px;
  padding-top:50px;
}

.header{
  background-color: blue;
  width: 100%;
  top:0;
  min-height: 100px;  
  
}


@media screen and (max-width: 774px){
    .costado{
        background-image: url("../assets/images/sistema/reticulaVertical-mobile.png");
        width: 60px;
        min-width: 60px;
    }

    .informacion{
      background-color: red;
      width: 60%;
      min-height: 100px; 
      margin-left: 20%;
    }
}

</style>