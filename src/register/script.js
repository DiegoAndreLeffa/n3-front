document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const registerButton = document.getElementById("registerButton");

  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmacaoSenha = document.getElementById("confirmacaoSenha").value;
    const cargo = document.getElementById("cargo").value;

    // Verificação dos campos
    if (!nome || !email || !senha || !confirmacaoSenha || !cargo) {
      showToast("Por favor, preencha todos os campos.");
      return;
    }

    // Verificação das senhas
    if (senha !== confirmacaoSenha) {
      showToast("As senhas não correspondem.");
      return;
    }

    console.log(nome, email, senha, cargo);

    registerButton.classList.add("loading");
    registerButton.textContent = "Registrando...";

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha, cargo }),
      });

      if (!response.ok) {
        throw new Error("Erro no registro");
      }

      const data = await response.json();

      if (data) {
        showToast("Registro realizado com sucesso!");
        setTimeout(() => (window.location.href = "../Login/index.html"), 2000);
      } else {
        showToast("Falha no registro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      showToast("Erro ao registrar. Tente novamente.");
    } finally {
      registerButton.classList.remove("loading");
      registerButton.textContent = "Registrar";
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
