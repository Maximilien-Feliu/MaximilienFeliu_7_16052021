<template>
<div id="body">
    
    <router-view/>
  </div>
</template>

<style>
html, body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.bold {
  font-weight: bold;
}
.router-link-active {
  font-weight: bold;
  color: white;
}
input {
  outline: none;
}
.hide {
  display: none;
}
@media screen and (max-width: 768px) {
  #app {
    font-size: smaller;
  }
}
</style>
