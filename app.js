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
      for (let i = 0; i < data.semesters.length; i++) {
        if(data.semesters[i]['id'] === parseInt(id)) {
          return data.semesters[i];
        }
      }
    },

    addSubject(id, subject) {
      let newSubject, semesterID, arrayItem;

      semesterID = parseInt(id);
      console.log(semesterID);


      for(let i = 0; i < data.semesters.length; i++) {
        if(data.semesters[i]['id'] === semesterID) {
          if(data.semesters[i].subjects.length > 0) {
            newSubjectID =  data.semesters[i].subjects[data.semesters[i].subjects.length - 1].id + 1;
          } else {
            newSubjectID = 0;
          }

          arrayItem = i;
        }
      }


      newSubject = new Subject(newSubjectID, subject.name, subject.type);

      data.semesters[arrayItem].subjects.push(newSubject);

      return newSubject;
    },

    deleteSubject: function(semesterID, idItem) {
      let indx, copyOfDataArr;

      copyOfDataArr = data.semesters[semesterID].subjects.map(function(current) {
        return current.id;
      });

      indx = copyOfDataArr.indexOf(idItem);

      if (indx !== -1) {
          data.semesters[semesterID].subjects.splice(indx, 1);
      }
    },

    getSubject: function(subjectID, semesterID) {
      let semID, subID;
      semID = parseInt(semesterID);
      subID = parseInt(subjectID);

      for(let i = 0; i < data.semesters.length; i++) {
        if(data.semesters[i]['id'] === semID) {
          for(let j = 0; j < data.semesters[i].subjects.length; j++) {
            if(data.semesters[i].subjects[j]['id'] === subID) {
              console.log(data.semesters[i].subjects[j]);
              return data.semesters[i].subjects[j];
            }
          }
        }
      }
    },

    // addGrade: function(subjectID, grade) {
    //   let newGrade, gradeID;

    //   if(data.semesters)
    // },

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
    semesterID: '#semester-id',
    subjectNameTitle: '#subject-name-title',
    subjectID: '#subject-id',
    subjectsList: '#subjects-list',
    semesterCloseBtn: '#semester-close-btn',
    addSubjectBtn: '#addSubject',
    subjectSelect: '.select-select',
    weightInput: '#weight-input',
    subjectName: '#subject-name-input',
    subjectType: '#subject-type',
    subjectAddBtn: '#subject-add-btn',
    subjectCloseBtn: '#subject-close-btn',
    gradeAddValueBtn: '#grade-add-value-btn',
    gradeValueSelect: '#grade-value-select',
    gradeValue: '#grade-value',
    gradeAddBtn: '#add-grade-btn',
    gradeName: '#grade-name',
    gradeWeight: '#grade-weight',
    gradesList: '#subjects-list',
    gradeFormBtn: '#grade-form-show-btn',
    gradeFormCloseBtn: '#close-grade-form-btn',
    gradeForm: '#add-grade',
    gradeList: '#grade-list'
  }

  return {
    getDOMstrings: function() {
      return DOMstrings;
    },

    getSemesterAddInput: function() {
      let nameValue;
      nameValue = document.querySelector(DOMstrings.semesterFormInput).value;
      document.querySelector(DOMstrings.semesterFormInput).value = "";
      return {
        name: nameValue
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
      semesterID = DOMstrings.semesterID;
      document.querySelector(semesterName).textContent = items.name;
      document.querySelector(semesterID).value = items.id;

      for(let i = 0; i < items.subjects.length; i++) {
        html = '<div class="container__listItem" id="subject_id-%subjectID%"><div class="container__listItem--name">%subjectName%</div><button class="container__listItem--btn" id="semester_delete"><i class="ion-ios-close-outline"></i></button></div>';
        newHtml = html.replace('%subjectName%', items.subjects[i]['name']);
        newHtml = newHtml.replace('%subjectID%', items.subjects[i]['id']);
        document.querySelector(DOMstrings.subjectsList).insertAdjacentHTML('beforeend', newHtml);
      }
    },

    closeSemesterInUI: function() {
      let htmlToDestroy;

      htmlToDestroy = document.querySelector(DOMstrings.subjectsList);
      while(htmlToDestroy.firstChild) {
        htmlToDestroy.removeChild(htmlToDestroy.firstChild);
      }

      document.querySelector(DOMstrings.semester).classList.add('hidden');
      document.querySelector(DOMstrings.main).classList.remove('hidden');
    },

    getValueFromSubjectInputs: function() {
      let nameValue, typeValue;

      nameValue = document.querySelector(DOMstrings.subjectName).value;
      document.querySelector(DOMstrings.subjectName).value = "";

      typeValue = document.querySelector(DOMstrings.subjectSelect).value;
      document.querySelector(DOMstrings.subjectSelect).value = "arithmAvg";
      return {
        name: nameValue,
        type: typeValue,
        semesterID: document.querySelector(DOMstrings.semesterID).value
      }
    },

    addSubjectToList: function(item) {
      let html, newHtml, htmlContainer;

      html = '<div class="container__listItem" id="subject_id-%subjectID%"><div class="container__listItem--name">%subjectName%</div><button class="container__listItem--btn" id="semester_delete" ><i class="ion-ios-close-outline"></i></button></div>';
      newHtml = html.replace('%subjectName%', item.name);
      newHtml = newHtml.replace('%subjectID%', item.id);
      htmlContainer = DOMstrings.subjectsList;

      document.querySelector(htmlContainer).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteSubjectFromUI: function(element) {
      let el = document.getElementById(element);
      el.parentNode.removeChild(el);
    },

    showGradeForm: function() {
      document.querySelector(DOMstrings.FormSemester).classList.remove('hidden');
      document.querySelector(DOMstrings.gradeForm).classList.remove('hidden');
    },

    showProposeGradeValueSelect: function() {
      let gradeValue;

      gradeValue = document.querySelector(DOMstrings.gradeValueSelect).value;
      document.querySelector(DOMstrings.gradeValue).value = gradeValue;
      document.querySelector(DOMstrings.gradeAddValueBtn).classList.add("disappearEffect");
      document.querySelector(DOMstrings.gradeValueSelect).classList.remove("hidden");
    },

    changeGradeValue:function() {
      let gradeValue;

      gradeValue = document.querySelector(DOMstrings.gradeValueSelect).value;
      document.querySelector(DOMstrings.gradeValue).value = gradeValue;
    },

    getInputsValueFromGradeForm: function() {
      return {
        name: document.querySelector(DOMstrings.gradeName).value,
        value: parseInt(document.querySelector(DOMstrings.gradeValue).value),
        weight: parseInt(document.querySelector(DOMstrings.gradeWeight).value)
      }
    },

    showSubject: function(subject) {
      let html, newHtml;

      document.querySelector(DOMstrings.subject).classList.remove('hidden');
      document.querySelector(DOMstrings.semester).classList.add('hidden');

      document.querySelector(DOMstrings.subjectNameTitle).textContent = subject.name;
      document.querySelector(DOMstrings.subjectID).value = subject.id;
      document.querySelector(DOMstrings.subjectType).value = subject.type;

      html = '<div class="container__listItem"><div class="container__listItem--name subject">%gradeName%</div><div class="container__listItem--grade">%gradeValue%</div><button class="container__listItem--btn">x</button></div>';
      for(let i = 0; i < subject.grades.length; i++) {
        newHtml = html.replace('%gradeName%', subject.grades[i]['name']);
        newHtml = newHtml.replace('%gradeValue%', subject.grades[i]['value']);
        document.querySelector(DOM.gradesList).insertAdjacentHTML('beforeend', newHtml);
      }
    },

    closeSubjectInUI: function() {
      let htmlToDestroy;

      htmlToDestroy = document.querySelector(DOMstrings.gradeList);
      while(htmlToDestroy.firstChild) {
        htmlToDestroy.removeChild(htmlToDestroy.firstChild);
      }

      document.querySelector(DOMstrings.subject).classList.add('hidden');
      document.querySelector(DOMstrings.semester).classList.remove('hidden');
    },

    closeGradeForm: function() {
      document.querySelector(DOMstrings.gradeForm).classList.add('hidden');
      document.querySelector(DOMstrings.FormSemester).classList.add('hidden');
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
          document.querySelector(DOM.SemesterForm).classList.add('hidden');
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

        document.querySelector(DOM.subjectAddBtn).addEventListener('click', function() {
          addSubject();
          document.querySelector(DOM.FormSemester).classList.add('hidden');
          document.querySelector(DOM.SubjectForm).classList.add('hidden');
        });

        // Usunięcie przedmiotu
        document.querySelector(DOM.subjectsList).addEventListener('click', deleteSubject);

    /**********************************
      Formularz dodawania ocen

    **********************************/
        // Wyświetlenie zawartości klikniętego przedmiotu
        document.querySelector(DOM.subjectsList).addEventListener('click', function(e) {
          let item, dividedItem, dividedID, semesterID;

          semesterID = document.querySelector(DOM.semesterID).value;
          item = e.target.parentNode.id;
          dividedItem = item.split('-');
          dividedID = dividedItem[1];


          if(!isNaN(dividedID)) {
            // 1. Pobranie danych przedmiotu
            subject = gradeCtrl.getSubject(dividedID, semesterID);

            // 2. Wyświetlenie przedmiotu
            UICtrl.showSubject(subject);
          }

        });
        //Wyświetlenie formularza dodawania ocen
        document.querySelector(DOM.gradeFormBtn).addEventListener('click', function() {
          let subjectType;

          subjectType = document.querySelector(DOM.subjectType).value;

          if(subjectType !== 'weightAvg') {
            document.querySelector(DOM.gradeWeight).classList.add('hidden');
          }
          UICtrl.showGradeForm();
        });

        // Wyświetlenie selecta proponowanej wartości oceny do formularza
        document.querySelector(DOM.gradeAddValueBtn).addEventListener('click', UICtrl.showProposeGradeValueSelect);

        // Zmiana wartości oceny podczas zmiany wartości w selecie
        document.querySelector(DOM.gradeValueSelect).addEventListener('change', UICtrl.changeGradeValue);

        // Pobranie oceny z formularza i zamknięcie go
        document.querySelector(DOM.gradeAddBtn).addEventListener('click', addGrade);

        // Powrot do listy semestrów
        document.querySelector(DOM.subjectCloseBtn).addEventListener('click', UICtrl.closeSubjectInUI);

        // Zamkniecie formularza dodawania ocen
        document.querySelector(DOM.gradeFormCloseBtn).addEventListener('click', UICtrl.closeGradeForm);
  };

  let addSemester = function() {
    let newSemester, input;

    // 1. Pobranie całego inputa wraz z zawartością, Usunięcie zawartości w inpucie po pobraniu
    input = UICtrl.getSemesterAddInput();

    // 2. Dodanie do struktury danych nowego przedmiotu
    if (input.name !== "") {
      newSemester = gradeCtrl.addSemester(input.name);
    }

    // 3. Dodanie zawartości w widoku
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
    let inputs, semesterID;
    // 1. Pobranie zawartosci z inputow, Usunięcie zawartości z inputa po pobraniu
    inputs = UICtrl.getValueFromSubjectInputs();

    // 2. Walidacja i dodanie do struktury danych nowego przedmiotu
    if (inputs.name !== "") {
      newSubject = gradeCtrl.addSubject(parseInt(inputs.semesterID), inputs);
    }

    // 3. Dodanie zawartości do widoku
    UICtrl.addSubjectToList(newSubject);
  };

  let deleteSubject = function(e) {
    let itemToDeleteID, dividedItem, dividedID, semesterID;

    itemToDeleteID = e.target.parentNode.parentNode.id;
    dividedItem = itemToDeleteID.split('-');
    dividedID = parseInt(dividedItem[1]);

    if(e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[1].value) {
      semesterID = e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[1].value;
    }
    semesterID = parseInt(semesterID);



    if(itemToDeleteID !== 'subject_list') {

      // 1. Usunięcie zawartości z gradeControllera
      gradeCtrl.deleteSubject(semesterID, dividedID);

      // 2. Usunięcie zawartości z UI
      UICtrl.deleteSubjectFromUI(itemToDeleteID);
    }
  };

  let addGrade = function() {
    let grade;
    // 1. Pobranie wartości z inputów, sprawdzenie ich oraz wyczyszczenie jeśli są poprawne
    grade = UICtrl.getInputsValueFromGradeForm();

    if(grade.name != "" && grade.value != "" && (!isNaN(grade.value))) {
      // 2. Dodanie do struktury danych wartości
      gradeCtrl.addGradeToData();

      // 3. Dodanie do widoku ocen
    }

  }

  return {
    init: function() {
      setupEventListeners();
    }
  };
})(gradeController, UIController);


controller.init();