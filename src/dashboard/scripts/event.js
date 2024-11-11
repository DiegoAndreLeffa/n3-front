// scripts/events.js

import {
  showOverview,
  showCategoryItems,
  showOrders,
  showProfile,
  showSecurityTab,
  showProfileTab,
} from "./ui.js";
import { data } from "./data.js"; // Assumindo que o arquivo data.js contém o objeto `data`

// Evento para exibir a visão geral ao clicar em "Início"
document
  .getElementById("inicioLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    showOverview();
  });

// Evento para exibir os pedidos ao clicar em "Pedidos"
document
  .getElementById("pedidosLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    showOrders();
  });

// Função para adicionar as categorias ao sidebar
function addCategoriesToSidebar() {
  const categoriaList = document.getElementById("categoriaList");
  categoriaList.innerHTML = ""; // Limpa a lista

  // Cria e insere cada categoria como um link
  Object.keys(data).forEach((category) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#">${category}</a>`;
    li.addEventListener("click", function (event) {
      event.preventDefault();
      showCategoryItems(category);
    });
    categoriaList.appendChild(li);
  });

  // Exibe a lista de categorias
  categoriaList.style.display = "block";
}

// Chama `addCategoriesToSidebar` ao carregar a página
addCategoriesToSidebar();

document.getElementById("perfilIcon").addEventListener("click", function () {
  showProfile();
});

// Alterna entre as abas "Perfil" e "Segurança" na seção de perfil
document.getElementById("perfilTab").addEventListener("click", function () {
  showProfileTab();
});

document.getElementById("segurancaTab").addEventListener("click", function () {
  showSecurityTab();
});

const perfilTab = document.getElementById("perfilTab");
const segurancaTab = document.getElementById("segurancaTab");

function activateTab(tab) {
  perfilTab.classList.remove("active");
  segurancaTab.classList.remove("active");

  tab.classList.add("active");
}

perfilTab.addEventListener("click", function () {
  activateTab(perfilTab);
  showProfileTab();
});

segurancaTab.addEventListener("click", function () {
  activateTab(segurancaTab);
  showSecurityTab();
});
