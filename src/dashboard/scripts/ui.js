import {
  openEditModal,
  closeModal,
  openDeleteModal,
  openDeleteOrderModal,
  openEditOrderModal,
} from "./modal.js";

// Função para atualizar o título principal da página
export function updateMainTitle(title) {
  document.querySelector(".main-content .header h1").textContent = title;
}

// Função para exibir itens de uma categoria no estoque
export async function showCategoryItems(category) {
  updateMainTitle("Estoque");
  const tableBody = document.getElementById("itemTableBody");
  const categoriaTitulo = document.getElementById("categoriaTitulo");

  tableBody.innerHTML = "";
  categoriaTitulo.textContent = category;

  const response = await fetch(`http://localhost:3000/categories/${category}`); // Endpoint da API para categorias
  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }
  const categories = await response.json();

  categories.forEach((item, index) => {
    // Função para formatar a data no formato DD/MM/AAAA
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.codigo}</td>
      <td>${item.nome}</td>
      <td>R$ ${item.preco}</td>
      <td>${item.estoque} (Un.)</td>
      <td>${formatDate(item.dataEntrada)}</td>
      <td>${formatDate(item.dataSaida)}</td>
      <td>${item.tipoMovimentacao || "-"}</td>
      <td>${item.usuario || "-"}</td>
      <td><i class="fa fa-edit edit-icon" data-index="${index}" data-category="${category}"></i></td>
      <td><i class="fa fa-trash delete-icon" data-index="${index}" data-category="${category}"></i></td>
    `;
    tableBody.appendChild(row);
  });

  document.querySelectorAll(".edit-icon").forEach((icon) => {
    icon.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      const category = this.getAttribute("data-category");
      openEditModal(data[category][index]);
    });
  });

  document.querySelectorAll(".delete-icon").forEach((icon) => {
    icon.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      const category = this.getAttribute("data-category");
      openDeleteModal(data[category][index]);
    });
  });

  document.getElementById("overview").style.display = "none";
  document.getElementById("orderList").style.display = "none";
  document.getElementById("itemList").style.display = "block";
}

// Função para exibir a lista de pedidos
export function showOrders() {
  updateMainTitle("Pedidos");

  const orderTableBody = document.getElementById("orderTableBody");
  orderTableBody.innerHTML = "";

  pedidos.forEach((pedido, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pedido.fornecedor}</td>
      <td>${pedido.dataPedido}</td>
      <td>${pedido.status}</td>
      <td>${pedido.tipoPedido}</td>
      <td>${pedido.quantidade}</td>
      <td>${pedido.nomeProduto}</td>
      ${
        pedido.tipoPedido === "Compra"
          ? `<td><i class="fa fa-edit edit-icon" data-index="${index}"></i></td><td><i class="fa fa-trash delete-icon" data-index="${index}"></i></td>`
          : `<td></td><td></td>`
      }
    `;
    orderTableBody.appendChild(row);

    if (pedido.tipoPedido === "Compra") {
      row
        .querySelector(".edit-icon")
        .addEventListener("click", () => openEditOrderModal(pedido));
      row
        .querySelector(".delete-icon")
        .addEventListener("click", () => openDeleteOrderModal(pedido));
    }
  });

  document.getElementById("overview").style.display = "none";
  document.getElementById("itemList").style.display = "none";
  document.getElementById("orderList").style.display = "block";
}

// Função para buscar e renderizar as categorias na sidebar
export async function addCategoriesToSidebar() {
  try {
    const response = await fetch("http://localhost:3000/categories"); // Endpoint da API para categorias
    if (!response.ok) {
      throw new Error("Erro ao buscar categorias");
    }
    const categories = await response.json();

    const categoriaList = document.getElementById("categoriaList");
    categoriaList.innerHTML = ""; // Limpa a lista antes de adicionar

    categories.forEach((category) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#">${category.categoria}</a>`;
      li.addEventListener("click", function (event) {
        event.preventDefault();
        showCategoryItems(category.categoria);
      });
      categoriaList.appendChild(li);
    });

    categoriaList.style.display = "block"; // Exibe a lista
  } catch (error) {
    console.error("Erro:", error);
  }
}

// scripts/ui.js

export function showOverview() {
  updateMainTitle("Dashboard");
  document.getElementById("overview").style.display = "block";
  document.getElementById("itemList").style.display = "none";
  document.getElementById("orderList").style.display = "none";
  document.getElementById("profileSection").style.display = "none";
}

export function showProfile() {
  updateMainTitle("Perfil");
  document.getElementById("overview").style.display = "none";
  document.getElementById("itemList").style.display = "none";
  document.getElementById("orderList").style.display = "none";
  document.getElementById("profileSection").style.display = "flex";
}

export function showSecurityTab() {
  document.getElementById("perfilContent").style.display = "none";
  document.getElementById("segurancaContent").style.display = "flex";
  document.getElementById("perfilTab").classList.remove("active");
  document.getElementById("segurancaTab").classList.add("active");
}

export function showProfileTab() {
  document.getElementById("perfilContent").style.display = "flex";
  document.getElementById("segurancaContent").style.display = "none";
  document.getElementById("perfilTab").classList.add("active");
  document.getElementById("segurancaTab").classList.remove("active");
}

export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:3000/categories"); // Endpoint da API para categorias
    if (!response.ok) {
      throw new Error("Erro ao buscar categorias");
    }
    const categories = await response.json();
    renderCards(categories);
    addCategoriesToSidebar(categories); // Adiciona as categorias à sidebar
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Função para renderizar cards dinamicamente
function renderCards(categories) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = ""; // Limpa os cards existentes

  categories.forEach((category) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
          <h3>${category.categoria}</h3>
          <span>${category.quantidade}</span>
      `;
    card.addEventListener("click", () => {
      showCategoryItems(category.categoria);
    });
    cardsContainer.appendChild(card);
  });
}
