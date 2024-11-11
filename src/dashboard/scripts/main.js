// main.js

import { loadModal } from "./modal.js";

import {
  updateMainTitle,
  addCategoriesToSidebar,
  fetchCategories,
} from "./ui.js";

import {
  closeModal,
  openCreateModal,
  openCreateOrderModal,
  openEditOrderModal,
  openDeleteOrderModal,
} from "./modal.js";

export function showOverview() {
  updateMainTitle("Dashboard");
  document.getElementById("overview").style.display = "block";
  document.getElementById("itemList").style.display = "none";
  document.getElementById("orderList").style.display = "none";
  document.getElementById("categoriaList").style.display = "none"; // Esconde a lista de categorias ao mostrar a Dashboard
}

// Verifica se o usuário está autenticado antes de carregar a dashboard
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    document.querySelector(".user-info span").textContent = user.Nome;
    document.querySelector(".user-info span + span").textContent = user.Email;
    document.querySelector(
      "#overview h2"
    ).textContent = `Bem-Vindo, ${user.Nome}`;
    // Exibe o Dashboard
    showOverview();
  } else {
    window.location.href = "../login/index.html"; // Redireciona para o login se não encontrar o usuário
  }

  // Carrega os modais
  fetchCategories();
  addCategoriesToSidebar();

  loadModal("./modals/createModal.html", "modalContainer");
  loadModal("./modals/editModal.html", "modalContainer");
  loadModal("./modals/deleteModal.html", "modalContainer");
  loadModal("./modals/createModalOrder.html", "modalContainer");
  loadModal("./modals/editModalOrder.html", "modalContainer");
  loadModal("./modals/deleteModalOrder.html", "modalContainer");

  // Configura a lógica de fechar o modal ao clicar fora dele
  window.onclick = function (event) {
    const createModal = document.getElementById("createModal");
    const editModal = document.getElementById("editModal");
    const deleteModal = document.getElementById("deleteModal");

    const createModalOrder = document.getElementById("createOrderModal");
    const editModalOrder = document.getElementById("editOrderModal");
    const deleteModalOrder = document.getElementById("deleteOrderModal");

    if (event.target === createModal) closeModal("createModal");
    if (event.target === editModal) closeModal("editModal");
    if (event.target === deleteModal) closeModal("deleteModal");

    if (event.target === createModalOrder) closeModal("createOrderModal");
    if (event.target === editModalOrder) closeModal("editOrderModal");
    if (event.target === deleteModalOrder) closeModal("deleteOrderModal");
  };
});

// Exponha as funções de modal para uso global
window.openModal = openCreateModal;
window.closeModal = closeModal;
window.openCreateOrderModal = openCreateOrderModal;
