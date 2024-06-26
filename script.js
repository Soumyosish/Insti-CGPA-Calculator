function calculateGrade(grade, unit) {
    switch (grade) {
        case 'O':
            return 10 * unit;
        case 'A+':
            return 9 * unit;
        case 'A':
            return 8 * unit;
        case 'B+':
            return 7 * unit;
        case 'B':
            return 6 * unit;
        case 'C':
            return 5 * unit;
        case 'D':
            return 4 * unit;
        case 'F':
            return 3 * unit;
        case 'I':
            return 0 * unit;
        default:
            return 0;
    }
}
let count = 0;
document.querySelector('#add-course').addEventListener('click', addNewCourse);
function addNewCourse() {
    let newForm = document.createElement('div');
    newForm.classList.add(`get-${count}`);
    newForm.innerHTML = `
        <input type="text" placeholder="Enter the course code" class="courses get-${count}" required>
        <input type="number" placeholder="Enter the course unit" class="course-unit get-${count}" required>
        <select class="grade">
            <option value="select" class="grade">Select</option>
            <option value="O" class="grade">O</option>
            <option value="A+" class="grade">A+</option>
            <option value="A" class="grade">A</option>
            <option value="B+" class="grade">B+</option>
            <option value="B" class="grade">B</option>
            <option value="C" class="grade">C</option>
            <option value="D" class="grade">D</option>
            <option value="F" class="grade">F</option>
            <option value="I" class="grade">I</option>
        </select>
    `;
    document.querySelector('.course-div').appendChild(newForm);
    count++;
}
document.querySelector('#remove-course').addEventListener('click', removeForms);
function removeForms() {
    let lastForm = document.querySelector('.course-div').lastElementChild;
    if (lastForm && lastForm.classList.contains('get-' + (count - 1))) {
        lastForm.remove();
        count--;
    }
}
document.querySelector('.btn-success').addEventListener('click', gpaCalculator);
function gpaCalculator() {
    const result = document.getElementById('result');
    const gradeselect = document.querySelectorAll('select.grade');
    const unit = document.querySelectorAll('input.course-unit');
    let totalUnits = 0;
    let totalEarnedUnits = 0;
    gradeselect.forEach((select, index) => {
        const grade = select.value;
        const unitValue = parseInt(unit[index].value);
        if (grade !== 'select' && !isNaN(unitValue)) {
            totalUnits += unitValue;
            totalEarnedUnits += calculateGrade(grade, unitValue);
        }
    });
    if (totalUnits > 0) {
        const gpa = totalEarnedUnits / totalUnits;
        result.textContent = 'Your GPA is ' + gpa.toFixed(2);
    } else {
        result.textContent = 'Please enter correct grades and course units.';
    }
}