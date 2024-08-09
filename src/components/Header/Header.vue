<template>
    <header class="header">
      <div class="logo">
        <img src="../../assets/images/logo.png" alt="Logo" class="logo-image" />
        <h1 class="logo-text">Llama IA - Infinite Quiz</h1>
      </div>
      <nav class="nav-links">
        <a href="https://github.com/Jeanpk12/llama-infinite-quiz" target="_blank" class="nav-link"><i class="ri-github-fill"></i></a>
        <a href="https://www.linkedin.com/in/jeanoliveira-dev/" target="_blank" class="nav-link"><i class="ri-linkedin-line"></i></a>
      </nav>
    </header>
  </template>
  
  <script>
  import 'remixicon/fonts/remixicon.css'
  export default {
    name: 'Header'
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    background-color: #007bff;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    display: flex;
    align-items: center;
  }
  
  .logo-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  
  .logo-text {
    font-size: 1.5em;
    margin: 0;
    text-transform: uppercase;
  }
  
  .nav-links {
    display: flex;
    gap: 15px;
  }
  
  .nav-link {
    color: #007bff;
    text-decoration: none;
    font-size: 24px;
    padding: 5px;
    border-radius: 50%;
    background: white;
    border: 2px solid white;
  }
  </style>
  