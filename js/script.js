const tg = window.Telegram.WebApp;

tg.ready()
tg.expand()

const mainButton = Telegram.WebApp.MainButton;

mainButton.text = 'Yuborish';
mainButton.hide();

Telegram.WebApp.onEvent('mainButtonClicked', async ()=>{
    data.type = await 'f';
    tg.sendData(JSON.stringify(data));
})

let data = {};

const checkText = (regex, id, value, idName)=>{
    if(value == ''){
        document.getElementsByClassName('errorMessage')[id].style.display = 'none';
       return document.getElementById(idName).style.border = '1px solid blueviolet';
    }
    if(regex.test(value)){
        document.getElementsByClassName('errorMessage')[id].style.display = 'none';
        document.getElementById(idName).style.border = '1px solid green';
    }
    else{
        document.getElementsByClassName('errorMessage')[id].style.display = 'block';   
    }
}


const checkSelect = (idName)=>{
    document.getElementById(idName).style.border = '1px solid green';
}

document.getElementById('subject').addEventListener('input', function() {
    data.subject = this.value.split("'").join('+');
    check(data);
    checkText(/^[A-Za-z,.(-)!+']{0,100}$/g, 0, this.value, 'subject');
});

document.getElementById('price').addEventListener('input', function() {
    data.price = this.value;
    check(data);
    checkText(/^[0-9]{0,100}$/g, 1, this.value, 'price');
});

document.getElementById('language').addEventListener('input', function() {
    data.language = this.value;
    check(data);
    checkSelect('language');
});

document.getElementById('info').addEventListener('input', function() {
    data.info = this.value.split("'").join('+');
    check(data);
    checkText(/^[A-Za-z,.(-)!'+\s]{0,250}$/g, 2, this.value, 'info');
});

document.getElementById('url').addEventListener('input', function() {
    data.url = this.value;
    check(data);
    checkText(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/g, 3, this.value, 'url');
})


const check = (data) => {
    if(data.subject && data.price && data.language && data.info && data.url){
        if(/^[A-Za-z,.(-)!+']{0,100}$/g.test(data.subject) && /^[0-9]{0,100}$/g.test(data.price) && /^[A-Za-z,.(-)!+'\s]{0,250}$/g.test(data.info) && /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/g.test(data.url)){
            mainButton.show();
        }
        else{
            mainButton.hide();
        }
    }
    else{
        mainButton.hide();
    }
}


