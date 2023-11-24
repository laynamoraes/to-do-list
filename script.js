const botaoNovaTarefa = document.querySelector(".botao-nova-tarefa")
const botaoAdicionarNovaTarefa = document.querySelector(".adicionar-tarefa")
const botaoFinalizarEdicao = document.querySelector(".finalizar-edicao")
const botaoPesquisarId = document.querySelector(".botao-pesquisar")
const secaoNovaTarefa = document.querySelector(".nova-tarefa")
const secaoEditarTarefa = document.querySelector(".editar-tarefa")
const listaTarefas = document.querySelector(".tarefas")

let minhasTarefas = []

botaoNovaTarefa.addEventListener("click", mostrarSecaoNovaTarefa)

function mostrarSecaoNovaTarefa() {
  if (secaoNovaTarefa.classList.contains("hidden")) {
    secaoNovaTarefa.classList.remove("hidden")
  } else {
    secaoNovaTarefa.classList.add("hidden")
  }
}

function mostrarTarefas() {
  let renderizarTarefa = ""

  if (minhasTarefas.length == 0) {
    listaTarefas.innerHTML = ""
  } else {
    minhasTarefas.forEach((tarefa, index) => {
      renderizarTarefa =
        renderizarTarefa +
        `
      <div id="${tarefa.id}" class="tarefa">
          <div class="tarefa-cabecalho">
            <div class="tarefa-titulo-container">
              <div class="checkbox-container">
                <input type="checkbox" name="" id="" />
              </div>
              <h2 class="tarefa-titulo">${tarefa.titulo}</h2>
            </div>
            <div class="tarefa-botoes">
              <button class="tarefa-botao-editar" onclick="editarTarefa(${index})">EDITAR</button>
              <button class="tarefa-botao-deletar" onclick="deletarTarefa(${index})">DELETAR</button>
            </div>
          </div>
          <p class="tarefa-descricao">${tarefa.descricao}</p>
          <p class="tarefa-id">ID: ${tarefa.id}</p>
        </div>
    `
      listaTarefas.innerHTML = renderizarTarefa

      localStorage.setItem("tarefas", JSON.stringify(minhasTarefas))
    })
  }
  console.log(minhasTarefas)
}

mostrarTarefas()

botaoAdicionarNovaTarefa.addEventListener("click", adicionarTarefa)

function adicionarTarefa() {
  const idTarefa = (Math.random() * 1000).toFixed()
  let tituloTarefa = document.getElementById("nova-tarefa-titulo")
  let descricaoTarefa = document.getElementById("nova-tarefa-descricao")

  const contarTitulo = tituloTarefa.value.length
  const contarDescricao = descricaoTarefa.value.length

  // Validações
  if (!isNaN(parseFloat(tituloTarefa.value))) {
    return alert("O título não pode conter apenas números!")
  } else if (contarTitulo < 4) {
    return alert("O título precisa conter no mínimo 4 caracteres!")
  } else if (contarDescricao < 20) {
    return alert("A descrição precisa conter no mínimo 20 caracteres!")
  } else {
    minhasTarefas.push({
      id: idTarefa,
      titulo: tituloTarefa.value,
      descricao: descricaoTarefa.value,
    })
  }

  tituloTarefa.value = ""
  descricaoTarefa.value = ""
  secaoNovaTarefa.classList.add("hidden")

  mostrarTarefas()
}

let idTarefaEditada = ""

function deletarTarefa(index) {
  localStorage.removeItem("tarefas")
  minhasTarefas.splice(index, 1)

  mostrarTarefas()
}

function editarTarefa(index) {
  let inputEditarTitulo = document.getElementById("editar-tarefa-titulo")
  let inputEditarDescricao = document.getElementById("editar-tarefa-descricao")
  const idEditarTarefa = minhasTarefas[index].id
  idTarefaEditada = idEditarTarefa

  if (secaoEditarTarefa.classList.contains("hidden")) {
    secaoEditarTarefa.classList.remove("hidden")
  } else {
    secaoEditarTarefa.classList.add("hidden")
  }

  inputEditarTitulo.value = minhasTarefas[index].titulo
  inputEditarDescricao.value = minhasTarefas[index].descricao

  console.log(idEditarTarefa)

  minhasTarefas.splice(index, 1)

  mostrarTarefas()
}

botaoFinalizarEdicao.addEventListener("click", finalizarTarefaEditada)

function finalizarTarefaEditada(index) {
  let inputEditarTitulo = document.getElementById("editar-tarefa-titulo")
  let inputEditarDescricao = document.getElementById("editar-tarefa-descricao")
  const idEditarTarefa = idTarefaEditada

  const tarefaEditada = {
    id: idEditarTarefa,
    titulo: inputEditarTitulo.value,
    descricao: inputEditarDescricao.value,
  }

  minhasTarefas.splice(index, 0, tarefaEditada)

  inputEditarTitulo.value = ""
  inputEditarDescricao.value = ""

  secaoEditarTarefa.classList.add("hidden")

  mostrarTarefas()
}

botaoPesquisarId.addEventListener("click", pesquisarTarefa)

function pesquisarTarefa() {
  let inputPesquisarId = document.querySelector(".pesquisar-tarefa-id")
  const tarefaId = document.getElementById(inputPesquisarId.value)

  if (tarefaId === null) {
    alert("Tarefa não encontrada!")
    inputPesquisarId.value = ""
  } else {
    tarefaId.classList.toggle("tarefa-encontrada")
    inputPesquisarId.value = ""
  }
}

function recarregarTarefasDoLocalStorage() {
  const tarefasLocalStorage = localStorage.getItem("tarefas")

  if (tarefasLocalStorage) {
    minhasTarefas = JSON.parse(tarefasLocalStorage)
  }

  mostrarTarefas()
}

recarregarTarefasDoLocalStorage()
