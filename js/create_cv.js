let errors;
let formdata = [];
const form = document.getElementById( "CreateCV" );

let photoInput = document.getElementById('photo');
let photoImg = document.getElementById('input_photo')

document.getElementById('photo').onchange = evt => {
    const [file] = photoInput.files
    if (file) {
        if (photoInput.files && photoInput.files[0]) {
            let FR = new FileReader();
            FR.addEventListener("load", function(e) {
                photoImg.src = e.target.result;
            }); 
            FR.readAsDataURL(photoInput.files[0]);
        }

        photoImg.closest('div').style.display = 'block';
        photoInput.closest('label').style.display = 'none';
    }
}

document.getElementById('remove_image').onclick = function(e) {
    photoImg.closest('div').style.display = 'none';
    photoInput.closest('label').style.display = 'inline-block';
    photoInput.value = '';
}


document.addEventListener("click", function (e) {
    let _this = e.target;

    if(_this.matches('#submit_form')) {
        formdata = [];
        errors = [];

        document.querySelectorAll('#CreateCV input').forEach(input => {
            if(typeof input != 'undefined' && input.name != "") {
                if(validateData(input)) {
                    formdata[input.name] = input.value;
                }
            }
        });

        if(errors.length > 0) {
            errors.forEach(function(elem) {
                let hasKey = elem.substring(0, elem.lastIndexOf('['));
                let errorKey = hasKey !== "" ? hasKey : elem;
                document.querySelector('[data-name="'+elem+'"]').innerHTML = errorMessages[errorKey];
            });
        } else {
            cvPreview(formdata);
        }  
    }


    if(_this.matches('#add_skill')) {
        let key = document.querySelectorAll('.professional_skill').length;
        let skillHtml = '<div class="col-sm current_skill"><input name="skill['+key+']" type="text" class="professional_skill"><p class="error" data-name="skill['+key+']"></p><span style="position: absolute; margin-top: 10px;"><img src="./img/remove_circle_outline_black_24dp.svg" alt="delete" class="remove_skill"></span></div>'
        document.querySelector('.skill_row').insertAdjacentHTML('beforeend', skillHtml);
    }

    if(_this.matches('.remove_skill')) {
        _this.closest('.current_skill').remove();
    }

    if(_this.matches('#add_work_experience')) {
        let key = document.querySelectorAll('.company_name').length;
        let workExperienceHtml = '<div class="work_exp_row"><hr><div class="row"><div class="col-sm"><label>Название компании</label><input class="company_name" name="work_exp[company_name]['+key+']" type="text"> <p class="error" data-name="work_exp[company_name]['+key+']"></p></div><div class="col-sm"> <label>Занимаемая должность</label> <input name="work_exp[your_position]['+key+']" type="text"> <p class="error" data-name="work_exp[your_position]['+key+']"></p></div></div><div class="row"> <div class="col-sm"> <label>Дата начала</label> <input name="work_exp[data_start_job]['+key+']" type="month"> <p class="error" data-name="work_exp[data_start_job]['+key+']"></p></div><div class="col-sm"> <label>Дата окончания</label> <input name="work_exp[data_finish_job]['+key+']" type="month"> </div></div><br><br><div class="form__short_info"> <span>Краткое описание</span> <button class="btn_style btn_help" data-bs-toggle="modal" data-bs-target="#shortDescriptionHelp"> Подсказки <div class="icon_btn"> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="svg--LightbulbOutline" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></svg> </div></button> <div class="short_info"> <label for="about_experience"></label> <input type="text" id="about_experience" name="work_exp[about_experience]['+key+']"> <p class="error" data-name="work_exp[about_experience]['+key+']"></p></div><button class="remove_work_experience btn_plus btn_add" style="width: 20%">Удалить</button></div></div>'
        document.querySelector('.work_experience').insertAdjacentHTML('beforeend', workExperienceHtml);
    }

    if(_this.matches('.remove_work_experience')) {
        _this.closest('.work_exp_row').remove();
    }

    if(_this.matches('#add_education')) {
        let key = document.querySelectorAll('.education_place').length;
        let educationHtml = '<div class="education_row"><hr><div class="row"> <div class="col-sm"> <label>Учебное заведение</label> <input class="education_place" name="education[education_institution]['+key+']" type="text"> <p class="error" data-name="education[education_institution]['+key+']"></p></div><div class="col-sm"> <label>Специальность/Научная степень</label> <input name="education[speciality]['+key+']" type="text"> <p class="error" data-name="education[speciality]['+key+']"></p></div></div><div class="row"> <div class="col-sm"> <label>Дата начала</label> <input name="education[data_start_education]['+key+']" type="month"> <p class="error" data-name="education[data_start_education]['+key+']"></p></div><div class="col-sm"> <label>Дата окончания</label> <input name="education[data_finish_education]['+key+']" type="month"> </div></div><button class="remove_education btn_plus btn_add" style="width: 20%">Удалить</button></div>'
        document.querySelector('.education_block').insertAdjacentHTML('beforeend', educationHtml);
    }

    if(_this.matches('.remove_education')) {
        _this.closest('.education_row').remove();
    }
});


let template1 = '<!DOCTYPE html><html lang="en"><head> <meta http-equiv="Content-type" content="text\html; charset=utf-8"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> <title>Template</title></head><body style="font-family: Arial, Helvetica, sans-serif; background: rgb(204,204,204);"> <page style="background: white; display: block; margin: 0 auto; margin-bottom: 0.5cm; box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width: 21cm; height: 29.7cm;" size="A4"> <div style="display: flex; justify-content: center;"> <button style="font-weight: 600; font-size: 16px; color: white; width: 34%; height: 45px; background: #1181c0; border: 1px solid #fff; border-radius: 5%; margin-top: 25px; margin-bottom: 40px;" id="download">Скачать</button> </div><div style="margin: 20px 40px;" id="cv"> <div style="display: flex; justify-content: space-between;"> <div> <h1 style="color: #2f80ed; margin-bottom: 0.25em;">{first_name}{last_name}</h1> <h3 style="margin-top: 0; margin-bottom: 1em;">{position}</h3> <div style="margin-bottom: 1em;"> <div style="display: flex; margin-bottom: 6px; align-items: center;"> <img style="margin-right: 8px;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDljMCA1LjI1IDcgMTMgNyAxM3M3LTcuNzUgNy0xM2MwLTMuODctMy4xMy03LTctN3pNNyA5YzAtMi43NiAyLjI0LTUgNS01czUgMi4yNCA1IDVjMCAyLjg4LTIuODggNy4xOS01IDkuODhDOS45MiAxNi4yMSA3IDExLjg1IDcgOXoiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjkiIHI9IjIuNSIvPjwvc3ZnPg==" alt="city"> <div style="min-width: 90px;"> <pre style="font-family: inherit; margin: 0;">Город   {city}</pre></div></div><div style="display: flex; margin-bottom: 6px; align-items: center;"> <img style="margin-right: 8px;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIyIDZjMC0xLjEtLjktMi0yLTJINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY2em0tMiAwbC04IDUtOC01aDE2em0wIDEySDRWOGw4IDUgOC01djEweiIvPjwvc3ZnPg==" alt="email"> <div style="min-width: 90px;"><pre style="font-family: inherit; margin: 0;">E-mail  {Email}</pre></div></div><div style="display: flex; margin-bottom: 6px; align-items: center;"> <img style="margin-right: 8px;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTYuNTQgNWMuMDYuODkuMjEgMS43Ni40NSAyLjU5bC0xLjIgMS4yYy0uNDEtMS4yLS42Ny0yLjQ3LS43Ni0zLjc5aDEuNTFtOS44NiAxMi4wMmMuODUuMjQgMS43Mi4zOSAyLjYuNDV2MS40OWMtMS4zMi0uMDktMi41OS0uMzUtMy44LS43NWwxLjItMS4xOU03LjUgM0g0Yy0uNTUgMC0xIC40NS0xIDEgMCA5LjM5IDcuNjEgMTcgMTcgMTcgLjU1IDAgMS0uNDUgMS0xdi0zLjQ5YzAtLjU1LS40NS0xLTEtMS0xLjI0IDAtMi40NS0uMi0zLjU3LS41Ny0uMS0uMDQtLjIxLS4wNS0uMzEtLjA1LS4yNiAwLS41MS4xLS43MS4yOWwtMi4yIDIuMmMtMi44My0xLjQ1LTUuMTUtMy43Ni02LjU5LTYuNTlsMi4yLTIuMmMuMjgtLjI4LjM2LS42Ny4yNS0xLjAyQzguNyA2LjQ1IDguNSA1LjI1IDguNSA0YzAtLjU1LS40NS0xLTEtMXoiLz48L3N2Zz4=" alt="phone"> <div style="min-width: 90px; "><pre style="font-family: inherit; margin: 0;">Телефон   {phone}</pre></div></div><div style="display: flex; margin-bottom: 6px; align-items: center;"> <img style="margin-right: 8px;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE3LjI3IDYuNzNsLTQuMjQgMTAuMTMtMS4zMi0zLjQyLS4zMi0uODMtLjgyLS4zMi0zLjQzLTEuMzMgMTAuMTMtNC4yM00yMSAzTDMgMTAuNTN2Ljk4bDYuODQgMi42NUwxMi40OCAyMWguOThMMjEgM3oiLz48L3N2Zz4=" alt="telegram"> <div style="min-width: 90px;"><pre style="font-family: inherit; margin: 0;">Telegram   {messenger}</pre></div></div><div style="display: flex; margin-bottom: 6px; align-items: center;"> <img style="margin-right: 8px;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiMwMDAwMDAiPjxnPjxwYXRoIGQ9Ik0wLDBoMjR2MjRIMFYweiIgZmlsbD0ibm9uZSIvPjwvZz48Zz48Zz48cGF0aCBkPSJNNCwxOHYtMC42NWMwLTAuMzQsMC4xNi0wLjY2LDAuNDEtMC44MUM2LjEsMTUuNTMsOC4wMywxNSwxMCwxNWMwLjAzLDAsMC4wNSwwLDAuMDgsMC4wMWMwLjEtMC43LDAuMy0xLjM3LDAuNTktMS45OCBDMTAuNDUsMTMuMDEsMTAuMjMsMTMsMTAsMTNjLTIuNDIsMC00LjY4LDAuNjctNi42MSwxLjgyQzIuNTEsMTUuMzQsMiwxNi4zMiwyLDE3LjM1VjIwaDkuMjZjLTAuNDItMC42LTAuNzUtMS4yOC0wLjk3LTJINHoiLz48cGF0aCBkPSJNMTAsMTJjMi4yMSwwLDQtMS43OSw0LTRzLTEuNzktNC00LTRDNy43OSw0LDYsNS43OSw2LDhTNy43OSwxMiwxMCwxMnogTTEwLDZjMS4xLDAsMiwwLjksMiwycy0wLjksMi0yLDIgYy0xLjEsMC0yLTAuOS0yLTJTOC45LDYsMTAsNnoiLz48cGF0aCBkPSJNMjAuNzUsMTZjMC0wLjIyLTAuMDMtMC40Mi0wLjA2LTAuNjNsMS4xNC0xLjAxbC0xLTEuNzNsLTEuNDUsMC40OWMtMC4zMi0wLjI3LTAuNjgtMC40OC0xLjA4LTAuNjNMMTgsMTFoLTJsLTAuMywxLjQ5IGMtMC40LDAuMTUtMC43NiwwLjM2LTEuMDgsMC42M2wtMS40NS0wLjQ5bC0xLDEuNzNsMS4xNCwxLjAxYy0wLjAzLDAuMjEtMC4wNiwwLjQxLTAuMDYsMC42M3MwLjAzLDAuNDIsMC4wNiwwLjYzbC0xLjE0LDEuMDEgbDEsMS43M2wxLjQ1LTAuNDljMC4zMiwwLjI3LDAuNjgsMC40OCwxLjA4LDAuNjNMMTYsMjFoMmwwLjMtMS40OWMwLjQtMC4xNSwwLjc2LTAuMzYsMS4wOC0wLjYzbDEuNDUsMC40OWwxLTEuNzNsLTEuMTQtMS4wMSBDMjAuNzIsMTYuNDIsMjAuNzUsMTYuMjIsMjAuNzUsMTZ6IE0xNywxOGMtMS4xLDAtMi0wLjktMi0yczAuOS0yLDItMnMyLDAuOSwyLDJTMTguMSwxOCwxNywxOHoiLz48L2c+PC9nPjwvc3ZnPg==" alt="linkedin"> <div style="min-width: 90px;"><pre style="font-family: inherit; margin: 0;">LinkedIn   {LinkedIn}</pre></div></div></div></div><div> <img src="{photo}" style="max-height: 170px; height: 170px; margin-top: 25px;"> </div></div><h4 style="width:100%; text-align:center; border-bottom: 2px solid cornflowerblue; line-height:0.1em; margin:10px 0 20px;"><span style="background:#fff; padding:0 10px;">Краткая информация</span></h2> <div style="margin-top: 20px; margin-bottom: 40px;">{shorInfo}</div><h4 style="width:100%; text-align:center; border-bottom: 2px solid cornflowerblue; line-height:0.1em; margin:10px 0 20px;"><span style="background:#fff; padding:0 10px;">Профессиональные навыки</span></h2> <div style="display: flex; flex-wrap: wrap;">{skills}</div><h4 style="width:100%; text-align:center; border-bottom: 2px solid cornflowerblue; line-height:0.1em; margin: 30px 0 20px;"><span style="background:#fff; padding:0 10px;">Опыт Работы</span></h2> <div style="display: flex; justify-content: space-evenly;">{work_exp}</div><h4 style="width:100%; text-align:center; border-bottom: 2px solid cornflowerblue; line-height:0.1em; margin: 30px 0 20px;"><span style="background:#fff; padding:0 10px;">Образование</span></h2> <div style="display: flex; justify-content: space-evenly;">{education}</div></div></page> <script>const download=document.getElementById("download"); download.addEventListener("click", function(){var element=document.getElementById("cv"); html2pdf(element);}); </script></body></html>';



function cvPreview(formdata) {
    let skills = '';
    let work_exp = '';
    let work_exp_added = [];
    let education = '';
    let education_added = [];

    for (key in formdata) {
        if(key === 'photo') {
            template1 = template1.replace('{'+key+'}', photoImg.src);
        } else if (key.indexOf('skill') !== -1) { 
            skills += '<div style="width: 33%; text-align: center; margin-bottom: 15px;">'+formdata[key]+'</div>'
        } else if (key.indexOf('work_exp') !== -1) { 
            let currentKey = key.substring(key.lastIndexOf('['));
            if(!work_exp_added.includes(currentKey)) {
                work_exp_added.push(currentKey);
                work_exp += '<div style="width: 35%;"> <p>'+formdata['work_exp[company_name]'+currentKey]+'</p><p>'+formdata['work_exp[your_position]'+currentKey]+'</p><p>'+formdata['work_exp[data_start_job]'+currentKey]+' - '+formdata['work_exp[data_finish_job]'+currentKey]+'</p></div><div style="width: 55%;"> <p>'+formdata['work_exp[about_experience]'+currentKey]+'</p></div>'
            }
        } else if (key.indexOf('education') !== -1) { 
            let currentKey = key.substring(key.lastIndexOf('['));
            if(!education_added.includes(currentKey)) {
                education_added.push(currentKey);
                education += '<div style="width: 35%;"> <p>'+formdata['education[education_institution]'+currentKey]+'</p><p>'+formdata['education[data_start_education]'+currentKey]+' - '+formdata['education[data_finish_education]'+currentKey]+'</p></div><div style="width: 55%;"> <p>'+formdata['education[speciality]'+currentKey]+'</p></div>';
            }
        } else {
            template1 = template1.replace('{'+key+'}', formdata[key]);
        }
    }

    template1 = template1.replace('{skills}', skills);
    template1 = template1.replace('{work_exp}', work_exp);
    template1 = template1.replace('{education}', education);
   
    // open html in new tab
    let newWindow = window.open();
    newWindow.document.write(template1);
};


const errorMessages = {
    'photo': 'Загрузите формат: jpg, jpeg, png',
    'first_name': 'Введите корректное имя',
    'last_name': 'Введите корректную фамилию',
    'position': 'Введено не верно',
    'Email': 'Необходимо указать действительный e-mail адрес',
    'phone': 'Номер введен не верно',
    'city': 'Город введен не верно',
    'LinkedIn': 'Ссылка должна выглядеть так: www.linkedin.com/in/иван-иванов',
    'messenger': 'Пример: @IvanIvanov',
    'shorInfo': '',
    // 'skill': 'Навык введен не верно',
    'company_name[0]': '',
    'your_position[0]': '',
    'work_exp[data_start_job]': 'Дата начала больше даты окончания',
    'education[data_start_education]': 'Дата начала больше даты окончания',
    'about_experience[0]': '',
    'education_institution[0]': '',
    'speciality[0]': '',
    'date_start_education[0]': 'Дата начала больше даты окончания',
};

const regexArr = {
    'photo' : /^[^.]*.(jpg|jpeg|png)$/gi,
    'first_name': /^[\wа-яА-Я\s]+$/gi, 
    'last_name': /^[\wа-яА-Я\s-]+$/gi,
    'position': /^[\wа-яА-Я ,.'-\s]+$/gi,
    'Email': /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i,
    'phone': /^\+38\(?\d{3}\)?\d{3}\-?\d{2}\-?\d{2}$/g,
    'city': /^[\wа-яА-Я\s-]*$/gi,
    'LinkedIn': /((https:\/\/)?www.linkedin.com\/in\/[\wа-яА-Я&+;=?#|%!-])*/gi,
    'messenger': /^[\wа-яА-Я&+;=?#|%@!-]*$/gi,
    'shorInfo': /^[\wа-яА-Я&+;=?#|@%!-\s]*$/gi,
    // 'skill': /^[\wа-яА-Я#&+;=?|%!-.,\s]+$/gi,
    // 'skill': /^[a-zA-Z]+$/gi,
    'company_name[0]': /^[\wа-яА-Я&+;=?#|@%!-]*$/gi,
    'your_position[0]': /^[\wа-яА-Я&+;=?#|%!-]*$/gi,
    'about_experience[0]': /^[\wа-яА-Я&+;=?#@|%!-]*$/gi,
    'education_institution[0]': /^[\wа-яА-Я &+;=?#|%!-]*$/gi,
    'speciality[0]': /^[\wа-яА-Я]*$/gi,
};

function validateData(input) {
    let checkValue = input.value;

    // if(input.name.indexOf('date_start_job') !== -1) {
    //     checkDate(input, 'date_start_job', 'date_finish_job')
    // }

    // if(input.name.indexOf('date_start_education') !== -1) {
    //     checkDate(input, 'date_start_education', 'date_finish_education')
    // }

    if(input.name.indexOf('skill') !== -1) {
        return true;
    }

    if(input.name.indexOf('work_exp[data_start_job]') !== -1) {
        return checkDate(input, 'work_exp[data_start_job]', 'work_exp[data_finish_job]')
    }

    if(input.name.indexOf('education[data_start_education]') !== -1) {
        return checkDate(input, 'education[data_start_education]', 'education[data_finish_education]')
    }

    if(checkValue.match(regexArr[input.name])) {
        return true;
    } else {
        errors.push(input.name);
        return false;
    }
}

function checkDate(input, date_start, date_finish) {
    let index = input.name.slice(input.name.lastIndexOf('['));
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
