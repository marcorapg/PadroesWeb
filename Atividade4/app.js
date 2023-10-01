// Model
class TodoItem {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.done = false;
  }
}

const model = {
  id: 1,
  todos: [], //local storage, db
  addTodo: function (todo) {
    var newTodoItem = new TodoItem(this.id, todo);
    this.todos.push(newTodoItem);
    this.id++;
    return newTodoItem;
  },
  removeTodo: function (id) {
    var index = this.todos.findIndex(item => item.id === id);
    this.todos.splice(index, 1);
  },
  editTodo: function (id, text){
    var item = this.todos.find(item => item.id === id);
    item.text = text;
  },
  sortTodo: function(){
    this.todos.sort(function (a, b) {
      if(a.text.toLowerCase() == b.text.toLowerCase()) return 0;
      if(a.text.toLowerCase() > b.text.toLowerCase()) return 1;
      return -1;
    });
    todoList: document.getElementById("todo-list").textContent = "";
    this.todos.forEach(function(todo, i) {
      view.renderTodo(todo);
    })
  },
};

// View
const view = {
  todoList: document.getElementById("todo-list"),
  renderTodo: function (todo) {
    const todoItem = document.createElement("li");
    todoItem.id = "li_" + todo.id;

    //Checkbox
    var doneCheck = document.createElement('input');
    doneCheck.type = 'checkbox';
    doneCheck.id = "check_" + todo.id;
    doneCheck.value = todo.done;
    doneCheck.checked = todo.done;
    todoItem.appendChild(doneCheck);

    doneCheck.addEventListener('change', function() {
      if (this.checked) {
        model.todos.find(x => x.id === todo.id).done = true;
      } else {
        model.todos.find(x => x.id === todo.id).done = false;
      }
    });
    
    //Texto
    const itemText = document.createElement("span");
    itemText.textContent = todo.text;
    itemText.id = "span_" + todo.id;
    todoItem.appendChild(itemText);
    
    //Editar
    var inputEdit = document.createElement("input");
    inputEdit.id = "editInput_" + todo.id;
    inputEdit.style.display = "none";
    inputEdit.type = "text";
    todoItem.appendChild(inputEdit);

    var saveButton = document.createElement('button');
    saveButton.id = "saveButton_" + todo.id;
    saveButton.innerHTML = "Salvar";
    saveButton.hidden = true;
    saveButton.addEventListener("click", function (event) {
      var inputEditing = document.getElementById("editInput_" + todo.id);
      if(inputEditing.value == "")
        alert("Valor não pode ser vazio!");
      else{
        model.editTodo(todo.id, inputEditing.value);

        document.getElementById("span_" + todo.id).innerHTML = inputEditing.value;

        document.getElementById("span_" + todo.id).style.display = 'inline-block';
        document.getElementById("delete_" + todo.id).style.display = 'inline-block';
        document.getElementById("edit_" + todo.id).style.display = 'inline-block';

        document.getElementById("editInput_" + todo.id).style.display = 'none';
        document.getElementById("saveButton_" + todo.id).style.display = 'none';
      }
    });
    todoItem.appendChild(saveButton);


    var editButton = document.createElement('button');
    editButton.innerHTML = "Editar";
    editButton.id = "edit_" + todo.id;
    editButton.addEventListener("click", function (event) {
      document.getElementById("span_" + todo.id).style.display = 'none';
      document.getElementById("delete_" + todo.id).style.display = 'none';
      document.getElementById("edit_" + todo.id).style.display = 'none';

      document.getElementById("editInput_" + todo.id).style.display = 'inline-block';
      document.getElementById("saveButton_" + todo.id).style.display = 'inline-block';
    });
    todoItem.appendChild(editButton);
    
    //Botão Excluir
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Excluir";
    deleteButton.id = "delete_" + todo.id;
    deleteButton.addEventListener("click", function (event) {
      document.getElementById("li_" + todo.id).remove();
      model.removeTodo(todo.id);
    });
    todoItem.appendChild(deleteButton);

    this.todoList.appendChild(todoItem);
  },
};

// Controller
const controller = {
  init: function () {
    const todoForm = document.getElementById("todo-form");
    todoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const todoInput = document.getElementById("todo-input");
      const todo = todoInput.value;
      if (todo.trim() !== "") {
        var todoItem = model.addTodo(todo);
        view.renderTodo(todoItem);
        todoInput.value = "";
        todoInput.focus();
      }
    });

    const sortButton = document.getElementById("sort");
    sortButton.addEventListener("click", function (event) {
      model.sortTodo();
    });
  },
};

controller.init();
