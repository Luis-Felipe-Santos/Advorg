<template>
  <div>
    <footer>
      <p>Todos os direitos reservados ADVORG.</p>
      <p>Desenvolvido por Luis Felipe dos Santos</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "RodapeComponent",
};
</script>

<style scoped>

footer {
  background-color: #2b59bd;
  width: 100vw;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  padding: 20px;
  bottom: 0;
}

footer p {
  margin: 5px;
}

@media (max-width: 768px) {
  footer {
    font-size: 14px;

  }
}
</style>
