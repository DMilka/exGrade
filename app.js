const gradeController = (function() {

})();

const UIController = (function() {
  let DOMstrings = {
    main: '.main',
    semester: '.semester',
    subject: '.subject',
    FormSemester: '.form_semester',
    addSemesterBtn: '#addSemester'
  }

  return {
    getDOMstrings: function() {
      return DOMstrings;
    }
  }
})();

const controller = (function(budgetCtrl, UICtrl) {
  let setupEventListeners = function() {
    let DOM = UICtrl.getDOMstrings();


    document.querySelector(DOM.addSemesterBtn).addEventListener('click', function() {
      document.querySelector(DOM.FormSemester).classList.remove('hidden');
    });
  }

  return {
    init: function() {
      setupEventListeners();
    }
  };
})(gradeController, UIController);


controller.init();