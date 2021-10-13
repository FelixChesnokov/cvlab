let errors;
let formdata = [];
const form = document.getElementById( "CreateCV" );

form.addEventListener( "submit", function ( event ) {
    formdata = [];
    errors = [];
    Array.from(document.querySelectorAll('#CreateCV input')).reduce(function(acc, input) {
        if(input.name != "") {
            if(validateData(input)) {
                formdata[input.name] = input.value;
            }
        }
    });

    if(errors.length > 0) {
        errors.forEach(function(elem) {
            document.querySelector('[data-name="'+elem+'"]').innerHTML = errorMessages[elem];
        });
    } else {
        cvPreview(formdata);
    }    
});


const template1 = '<!DOCTYPE html><html lang="en"><head> <meta http-equiv="Content-type" content="text\html; charset=utf-8"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> <title>Template</title></head><body style="max-width: 595px; font-family: Arial, Helvetica, sans-serif;"> <button class="btn__create" id="download">Скачать</button> <div id="cv"> <h1 style="color: #2f80ed; margin-bottom: 0.25em;">First name:{first_name}{last_name}</h1> <h3 style="margin-top: 0; margin-bottom: 1em;">{position}</h3> <img src="/cvlab/img/ava2.jpg" height="100px"> <div style="margin-bottom: 2em;"> <div style="display: flex; margin-bottom: 6px;"> <div style="min-width: 90px;"> <pre style="font-family: inherit; margin: 0;">City{city}</pre></div></div><div style="display: flex; margin-bottom: 60px;"> <div style="min-width: 90px;">E-mail IvanIvanich@gmail.com{Email}</div></div><div style="display: flex; margin-bottom: 6px;"> <div style="min-width: 90px; ">Phone +38(093)123-45-67{phone}</div></div><div style="display: flex; margin-bottom: 6px;"> <div style="min-width: 90px;">Telegram @IvanIvanov{messenger}</div></div><div style="display: flex; margin-bottom: 6px;"> <div style="min-width: 90px;">LinkedIn www.linkedin.com/in/ivan-ivanov{LinkedIn}</div></div></div><hr style="border-color: cornflowerblue; margin-bottom: 25px;"></hr> <div>{shorInfo}Short information about myself. Short information about myself.<br>Short information about myself. Short information about myself.<br>Short information about myself. Short information about myself.<br>Short information about myself. Short information about myself. </div></div><script>const download=document.getElementById(\'download\'); download.addEventListener(\'click\', function(){// https://github.com/eKoopmans/html2pdf.js#options var element=document.getElementById(\'cv\'); html2pdf(element);}); </script></body></html>';

function cvPreview(formdata) {

    // замена ключ значения, нужно сделать цикл и в цикле заменить по name input'а и тегу в template.html
    // let userName = /{first_name}/gi;
    // let userTemplate = template1.replace(userName, formdata.first_name);

    let userTemplate;
    for (key in formdata) {
        var regex = new RegExp(key, 'gi');
        
        // console.log(formdata[key]);
        // console.log(regex);
        userTemplate = template1.replace(regex, formdata[key]);
    }

    console.log(userTemplate);
    // open html in new tab
    let newWindow = window.open();
    newWindow.document.write(userTemplate);
};


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
    'shorInfo': /^[\wа-яА-Я&+;=?#|@%!-]*$/gi,
    'skill': /^[\wа-яА-Я&+;=?#|%!-.,]+$/gi,
    'company_name[0]': /^[\wа-яА-Я&+;=?#|@%!-]*$/gi,
    'your_position[0]': /^[\wа-яА-Я&+;=?#|%!-]*$/gi,
    'about_experience[0]': /^[\wа-яА-Я&+;=?#@|%!-]*$/gi,
    'education_institution[0]': /^[\wа-яА-Я &+;=?#|%!-]*$/gi,
    'speciality[0]': /^[\wа-яА-Я]*$/gi,
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
