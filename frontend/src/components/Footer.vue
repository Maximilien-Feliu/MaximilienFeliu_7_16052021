<template>
    <footer>
        <h2>Groupomania - OpenClassrooms Project</h2>
        <p>Ce projet est le dernier projet du parcours de développeur web de l'école OpenClassrooms.</p>
        <nav class="footer_nav">
            <a href="https://github.com/Maximilien-Feliu/MaximilienFeliu_7_16052021" target="_blank">
                <i class="fab fa-github"></i>
                Github
            </a>
        </nav>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(8, 8, 58, 0.699);
    color: white;
    width: 100%;
    margin-top: 2em;
    height: 250px;
}
h2 {
    text-align: center;
    margin-bottom: 0px;
}
p {
    margin-bottom: 1.5em;
}
a {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  text-decoration: none;
}
a:hover {
  color: rgb(255, 57, 57);
  transition: .3s;
}
a i {
    font-size: 40px;
    margin-bottom: .3em;
}
@media screen and (max-width: 768px) {
    footer p {
        text-align: center;
    }
}
</style>