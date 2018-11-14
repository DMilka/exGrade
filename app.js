const gradeController = (function() {
  let Semester = function(id, name) {
    this.id = id;
    this.name = name;
  };

  let Subject = function(id, semesterID, type) {

  };

  let data = {
    semesters: [],
    subjects: [],
    grades: []
  }

  return {
    addSemester: function(name) {
      let newSemester, newSemesterID;

      if(data.semesters.length > 0) {
        newSemesterID =  data.semesters[data.semesters.length - 1].id + 1;
      } else {
        newSemesterID = 0;
      }

      newSemester = new Semester(newSemesterID, name);

      data.semesters.push(newSemester);

      return newSemester;
    },

    deleteSemester: function(id) {
      let indx, copyOfDataArr;

      copyOfDataArr = data.semesters.map(function(current) {
        return current.id;
      });

      indx = copyOfDataArr.indexOf(id);

      if (indx !== -1) {
          data.semesters.splice(indx, 1);
      }
    },

    test: function() {
      return data;
    }
  }


})();

const UIController = (function() {
  let DOMstrings = {
    main: '.main',
    semester: '.semester',
    subject: '.subject',
    FormSemester: '.form_semester',
    addSemesterBtn: '#addSemester',
    closeSemesterForm: '.close_button',
    semesterFormInput: '#semester_name',
    confirmAddSemesterBtn: '.add_button',
    semesterList: '#semester_list',
    semesterDeleteBtn: '#semester_delete'
  }



  return {
    getDOMstrings: function() {
      return DOMstrings;
    },

    getSemesterAddInput: function() {
      return {
        name: document.querySelector(DOMstrings.semesterFormInput).value
      };
    },

    addSemesterToList: function(item) {
      let html, newHtml, htmlContainer;

      html = '<div class="container__listItem" id="semester_id-%semesterID%"><div class="container__listItem--name">%semesterName%</div><button class="container__listItem--btn" id="semester_delete" >x</button></div>';
      newHtml = html.replace('%semesterName%', item.name);
      newHtml = newHtml.replace('%semesterID%', item.id);
      htmlContainer = DOMstrings.semesterList;

      document.querySelector(htmlContainer).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteSemesterFromUI: function(element) {
      let el = document.getElementById(element);
      el.parentNode.removeChild(el);
    }


  }
})();

const controller = (function(gradeCtrl, UICtrl) {
  let setupEventListeners = function() {
    let DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.addSemesterBtn).addEventListener('click', function() {
    document.querySelector(DOM.FormSemester).classList.remove('hidden');

    });

    document.querySelector(DOM.closeSemesterForm).addEventListener('click', function() {
      document.querySelector(DOM.FormSemester).classList.add('hidden');
    });

    document.querySelector(DOM.confirmAddSemesterBtn).addEventListener('click', function() {
      addSemester();
      document.querySelector(DOM.FormSemester).classList.add('hidden');
    });

    document.querySelector(DOM.semesterList).addEventListener('click', deleteSemester);

  };

  let addSemester = function() {
    let newSemester, input;

    // 1. Pobranie całego inputa wraz z zawartością
    input = UICtrl.getSemesterAddInput();

    // 2. Dodanie do struktury danych nowego przedmiotu
    if (input.name !== "") {
      newSemester = gradeCtrl.addSemester(input.name);
    }

    // 3. Usunięcie zawartości w inpucie

    // 4. Dodanie zawartości w widoku
    UICtrl.addSemesterToList(newSemester);
  };

  let deleteSemester = function(e) {
    let itemToDeleteID, dividedItem, dividedID;

    itemToDeleteID = e.target.parentNode.id;
    dividedItem = itemToDeleteID.split('-');
    dividedID = parseInt(dividedItem[1]);

    // 1. Usunięcie zawartości z gradeControllera
    gradeCtrl.deleteSemester(dividedID);

    // 2. Usunięcie zawartości z UI
    UICtrl.deleteSemesterFromUI(itemToDeleteID);


  }

  return {
    init: function() {
      setupEventListeners();
    }
  };
})(gradeController, UIController);


controller.init();