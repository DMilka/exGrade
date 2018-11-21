const gradeController = (function() {
  let Semester = function(id, name) {
    this.id = id;
    this.name = name;
    this.subjects = [];
  };

  let Subject = function(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.grades = [];
  };

  let Grade = function(id, name, value, weightValue) {
    this.id = id;
    this.name = name;
    this.value =  value;
    this.weightValue = weightValue;
  };

  let data = {
    semesters: []
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

    showSemester: function(id) {
      return data.semesters[id];
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
    SemesterForm: '#add-semester',
    SubjectForm: '#add-subject',
    addSemesterBtn: '#addSemester',
    closeSemesterForm: '#close-semester-form-btn',
    closeSubjectForm: '#close-subject-form-btn',
    semesterFormInput: '#semester_name',
    confirmAddSemesterBtn: '.add_button',
    semesterList: '#semester_list',
    semesterDeleteBtn: '#semester_delete',
    semesterName: '#semester-name',
    subjectsList: '#subjects-list',
    semesterCloseBtn: '#semester-close-btn',
    addSubjectBtn: '#addSubject',
    subjectSelect: '.select-select',
    weightInput: '#weight-input'
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

      html = '<div class="container__listItem" id="semester_id-%semesterID%"><div class="container__listItem--name">%semesterName%</div><button class="container__listItem--btn" id="semester_delete" ><i class="ion-ios-close-outline"></i></button></div>';
      newHtml = html.replace('%semesterName%', item.name);
      newHtml = newHtml.replace('%semesterID%', item.id);
      htmlContainer = DOMstrings.semesterList;

      document.querySelector(htmlContainer).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteSemesterFromUI: function(element) {
      let el = document.getElementById(element);
      el.parentNode.removeChild(el);
    },

    showSemesterInUI: function(items) {
      let semesterName, html, newHtml;

      document.querySelector(DOMstrings.semester).classList.remove('hidden');
      document.querySelector(DOMstrings.main).classList.add('hidden');

      semesterName = DOMstrings.semesterName;
      document.querySelector(semesterName).textContent = items.name

      for(let i = 0; i < items.subjects.length; i++) {
        html = '<div class="container__listItem"><div class="container__listItem--name">%subjectName%</div><button class="container__listItem--btn" id="semester_delete">x</button></div>';
        newHtml = html.replace('%subjectName%', items.subjects[i]['name']);
        document.querySelector(DOMstrings.subjectsList).insertAdjacentElement('beforeend', newHtml);
      }
    },

    closeSemesterInUI: function() {
      let htmlToDestroy;

      htmlToDestroy = DOMstrings.subjectsList;
      while(htmlToDestroy.firstChild) {
        htmlToDestroy.removeChild(htmlToDestroy.firstChild);
      }

      document.querySelector(DOMstrings.semester).classList.add('hidden');
      document.querySelector(DOMstrings.main).classList.remove('hidden');
    }
  }
})();

const controller = (function(gradeCtrl, UICtrl) {
  let setupEventListeners = function() {
    let DOM = UICtrl.getDOMstrings();

    /**********************************
      Formularz dodawania semestru

    **********************************/
        //Otwieranie formularza z dodawaniem semestru
        document.querySelector(DOM.addSemesterBtn).addEventListener('click', function() {
          document.querySelector(DOM.FormSemester).classList.remove('hidden');
          document.querySelector(DOM.SemesterForm).classList.remove('hidden');
        });

        // Zamykanie formularza z dodawaniem semestru
        document.querySelector(DOM.closeSemesterForm).addEventListener('click', function() {
          document.querySelector(DOM.FormSemester).classList.add('hidden');
          document.querySelector(DOM.SemesterForm).classList.add('hidden');
        });

        // Zatwierdzenie formularza dodania semestru
        document.querySelector(DOM.confirmAddSemesterBtn).addEventListener('click', function() {
          addSemester();
          document.querySelector(DOM.FormSemester).classList.add('hidden');
        });

        // Usuniecie semestru
        document.querySelector(DOM.semesterList).addEventListener('click', deleteSemester);

        // Otwarcie okna z zawartoscia wybranego semestru
        document.querySelector(DOM.semesterList).addEventListener('click', function(e) {
          let item, dividedItem, dividedID, semester;

          item = e.target.parentNode.id;
          dividedItem = item.split('-');
          dividedID = parseInt(dividedItem[1]);
          if (!isNaN(dividedID)) {
            // 1. Pobranie danych z struktury danych
            semester = gradeCtrl.showSemester(dividedID);

            // 2. Wstawienie danych w odpowiednie pola oraz wygenerowanie listy z przedmiotami
            UICtrl.showSemesterInUI(semester);
          }

        });

        document.querySelector(DOM.semesterCloseBtn).addEventListener('click', UICtrl.closeSemesterInUI);
    /**********************************
      Formularz dodawania przedmiotu

    **********************************/
        //Otwieranie formularza z dodawaniem przedmiotu
        document.querySelector(DOM.addSubjectBtn).addEventListener('click', function() {
          document.querySelector(DOM.FormSemester).classList.remove('hidden');
          document.querySelector(DOM.SubjectForm).classList.remove('hidden');
        });

        // Zamykanie formularza z dodawaniem przedmiotu
        document.querySelector(DOM.closeSubjectForm).addEventListener('click', function() {
          document.querySelector(DOM.FormSemester).classList.add('hidden');
          document.querySelector(DOM.SubjectForm).classList.add('hidden');
        });

        // Zmiana typu przedmiotu
        document.querySelector(DOM.subjectSelect).addEventListener('change', function(e) {
          let selectValue, weightInput;

          selectValue = e.target.value;
          weightInput = document.querySelector(DOM.weightInput);

          if(selectValue === 'weightAvg') {
            weightInput.classList.remove('hidden');
          } else {
            if(!weightInput.classList.contains('hidden')) {
              weightInput.classList.add('hidden');
            }
          }
        });


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

    itemToDeleteID = e.target.parentNode.parentNode.id;
    dividedItem = itemToDeleteID.split('-');
    dividedID = parseInt(dividedItem[1]);


    if(itemToDeleteID !== 'semester_list') {

      // 1. Usunięcie zawartości z gradeControllera
      gradeCtrl.deleteSemester(dividedID);

      // 2. Usunięcie zawartości z UI
      UICtrl.deleteSemesterFromUI(itemToDeleteID);
    }
  };

  let addSubject = function() {
    let inputs
    // 1. Pobranie zawartosci z inputow
    inputs = UI.getValueFromSubjectInputs();

    // 2. Walidacja i dodanie do struktury danych nowego przedmiotu

    // 3. Usunięcie zawartości z inputa

    // 4. Dodanie zawartości do widoku
  };

  return {
    init: function() {
      setupEventListeners();
    }
  };
})(gradeController, UIController);


controller.init();