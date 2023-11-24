const botaoNovaTarefa = document.querySelector(".botao-nova-tarefa")
const botaoAdicionarNovaTarefa = document.querySelector(".adicionar-tarefa")
const secaoNovaTarefa = document.querySelector(".nova-tarefa")
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
        </div>
    `

      listaTarefas.innerHTML = renderizarTarefa
    })
  }
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

function deletarTarefa(index) {
  minhasTarefas.splice(index, 1)
  console.log(index)

  mostrarTarefas()
}

function editarTarefa(index) {
  listaTarefas.forEach((tarefa) => {
    console.log(tarefa)
  })
  // minhasTarefas[index]
  console.log("editou")
}
