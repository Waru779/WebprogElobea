class Person {
    constructor(name) {
      this.name = name;
    }
  
    getName() {
      return this.name;
    }
  }
  
  // Származtatott osztály: Alkalmazott
  class Employee extends Person {
    constructor(name, position, salary) {
      super(name);
      this.position = position;
      this.salary = salary;
    }
  
    getDetails() {
      return {
        name: this.getName(),
        position: this.position,
        salary: this.salary,
      };
    }
  }
  
  // Alkalmazotti nyilvántartó alkalmazás
  class EmployeeApp {
    constructor() {
      this.employees = [];
      this.initUI();
    }
  
    initUI() {
      // Cím
      const title = document.createElement("h1");
      title.textContent = "Alkalmazotti nyilvántartás";
      title.className = "header";
      document.body.appendChild(title);
  
      // Űrlap létrehozása
      this.form = document.createElement("form");
      this.form.className = "employee-form";
      this.form.id = "employeeForm";
  
      const nameInput = this.createInput("name", "Név");
      const positionInput = this.createInput("position", "Beosztás");
      const salaryInput = this.createInput("salary", "Fizetés", "number");
  
      this.form.appendChild(nameInput);
      this.form.appendChild(positionInput);
      this.form.appendChild(salaryInput);
  
      const submitBtn = document.createElement("input");
      submitBtn.type = "submit";
      submitBtn.value = "Hozzáadás";
      this.form.appendChild(submitBtn);
  
      document.body.appendChild(this.form);
  
      // Táblázat
      this.tableContainer = document.createElement("div");
      this.tableContainer.className = "employees-table";
  
      this.table = document.createElement("table");
      this.table.className = "list";
  
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      ["Név", "Beosztás", "Fizetés"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
  
      this.tbody = document.createElement("tbody");
  
      this.table.appendChild(thead);
      this.table.appendChild(this.tbody);
      this.tableContainer.appendChild(this.table);
      document.body.appendChild(this.tableContainer);
  
      // Eseménykezelő
      this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }
  
    createInput(id, labelText, type = "text") {
      const div = document.createElement("div");
  
      const label = document.createElement("label");
      label.textContent = labelText;
      label.htmlFor = id;
  
      const input = document.createElement("input");
      input.type = type;
      input.id = id;
      input.name = id;
  
      div.appendChild(label);
      div.appendChild(input);
  
      return div;
    }
  
    handleFormSubmit(e) {
      e.preventDefault();
      const name = this.form.name.value.trim();
      const position = this.form.position.value.trim();
      const salary = parseInt(this.form.salary.value.trim());
  
      if (!name || !position || isNaN(salary)) {
        alert("Kérlek, tölts ki minden mezőt helyesen!");
        return;
      }
  
      const employee = new Employee(name, position, salary);
      this.employees.push(employee);
      this.addEmployeeToTable(employee);
  
      this.form.reset();
    }
  
    addEmployeeToTable(employee) {
      const data = employee.getDetails();
      const row = document.createElement("tr");
  
      Object.values(data).forEach(value => {
        const td = document.createElement("td");
        td.textContent = value;
        row.appendChild(td);
      });
  
      this.tbody.appendChild(row);
    }
  }
  
  // Alkalmazás indítása
  new EmployeeApp();