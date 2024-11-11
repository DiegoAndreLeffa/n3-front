document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const loginButton = document.getElementById("loginButton");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.querySelector('input[type="text"]').value;
    const senha = document.querySelector('input[type="password"]').value;

    if (!email || !senha) {
      showToast("Por favor, preencha todos os campos.");
      return;
    }

    loginButton.classList.add("loading");
    loginButton.textContent = "Loading...";

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await fetch("http://localhost:3000/authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Erro na autenticação");
      }

      const data = await response.json();

      if (data) {
        sessionStorage.setItem("user", JSON.stringify(data));
        window.location.href = "../dashboard/index.html";
      } else {
        showToast("Nome de usuário ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro:", error);
      showToast("Ocorreu um erro ao fazer login. Tente novamente.");
    } finally {
      loginButton.classList.remove("loading");
      loginButton.textContent = "Login";
    }
  });

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
});
