let errors;
const form = document.getElementById( "CreateCV" );

form.addEventListener( "submit", function ( event ) {
    let formdata = [];
    errors = [];
    Array.from(document.querySelectorAll('#CreateCV input')).reduce(function(acc, input) {
        if(input.name != "") {
            if(validateData(input)) {
                formdata[input.name] = input.value;
            }
        }
    });

    errors.forEach(function(elem) {
        document.querySelector('[data-name="'+elem+'"]').innerHTML = errorMessages[elem];
    });


});

const errorMessages = {
    // 'photo': 'Загрузите формат: jpg, jpeg, png',
    'first_name': 'Введите корректное имя',
    'last_name': 'Введите корректную фамилию',
    'position': 'Введено не верно',
    'Email': 'Необходимо указать действительный e-mail адрес',
    'phone': 'Номер введен не верно',
    'city': 'Город введен не верно',
    'LinkedIn': 'Ссылка должна выглядеть так: www.linkedin.com/in/иван-иванов',
    'messenger': 'Пример: @IvanIvanov',
    'shorInfo': '',
    'skill[0]': '',
    'skill[1]': '',
    'skill[2]': '',
    'company_name[0]': '',
    'your_position[0]': '',
    'date_start_job[0]': 'Дата начала больше даты окончания',
    'about_experience[0]': '',
    'education_institution[0]': '',
    'speciality[0]': '',
    'date_start_education[0]': 'Дата начала больше даты окончания',
};

const regexArr = {
    // 'photo' : /^[^.]*.(jpg|jpeg|png)$/gi,
    'first_name': /^[\wа-яА-Я]+$/gi, 
    'last_name': /^[\wа-яА-Я]+$/gi,
    'position': /^[\wа-яА-Я ,.'-]+$/gi,
    'Email': /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i,
    'phone': /^\+38\(?\d{3}\)?\d{3}\-?\d{2}\-?\d{2}$/g,
    'city': /^[\wа-яА-Я]*$/gi,
    'LinkedIn': /((https:\/\/)?www.linkedin.com\/in\/[\wа-яА-Я&+;=?#|%!-])*/gi,
    'messenger': /^[\wа-яА-Я&+;=?#|%@!-]*$/gi,
    'shorInfo': /^[\wа-яА-Я&+;=?#|@%!-]+$/gi,
    'skill': /^[\wа-яА-Я&+;=?#|%!-.,]+$/gi,
    'company_name[0]': /^[\wа-яА-Я&+;=?#|@%!-]+$/gi,
    'your_position[0]': /^[\wа-яА-Я&+;=?#|%!-]+$/gi,
    'about_experience[0]': /^[\wа-яА-Я&+;=?#@|%!-]+$/gi,
    'education_institution[0]': /^[\wа-яА-Я &+;=?#|%!-]+$/gi,
    'speciality[0]': /^[\wа-яА-Я]+$/gi,
};

function validateData(input) {
    let checkValue = input.value;

    if(input.name.indexOf('date_start_job') !== -1) {
        checkDate(input, 'date_start_job', 'date_finish_job')
    }

    if(input.name.indexOf('date_start_education') !== -1) {
        checkDate(input, 'date_start_education', 'date_finish_education')
    }


    if(checkValue.match(regexArr[input.name])) {
        return true;
    } else {
        errors.push(input.name);
        return false;
    }
}

function checkDate(input, date_start, date_finish) {
    let index = input.name.slice(input.name.indexOf('['));
    let startJob = document.querySelector('[name="'+date_start+index+'"]');
    let finishJob = document.querySelector('[name="'+date_finish+index+'"]');
    let startDate = new Date(startJob.value);
    let finishDate = new Date(finishJob.value);

    if(startDate <= finishDate || startJob.value == '') {
        return true;
    } else {
        errors.push(input.name);
        return false;
    }
}
