const boxText = document.querySelector('#box-text');
const boxSelect = document.querySelector('#box-select');

const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');

const erro = document.querySelector('.erro');

const options = document.querySelector('.options');

const formResponse = document.querySelector('.form-response');

const result = document.querySelector('.result');

boxText.addEventListener('change', ()=>{
    const value = boxText.value;
    if(value == 20){
        boxText.style.display = 'none';
        const p = document.createElement('p');
        p.innerHTML = value;
        box1.appendChild(p);

    }else{
        erro.classList.remove('erro');
        erro.classList.add('erro-on');
        boxText.style.borderTopLeftRadius = '0';
        boxText.style.borderBottomLeftRadius = '0';
    }
});

erro.addEventListener('click', ()=>{
    erro.classList.remove('erro-on');
    erro.classList.add('erro');
    boxText.value = '';
    boxText.focus();
    boxText.style.borderTopLeftRadius = '5px';
    boxText.style.borderBottomLeftRadius = '5px';

})



boxSelect.addEventListener('mouseenter', ()=>{
    boxSelect.disabled = true;
    options.classList.remove('options');
    options.classList.add('options-on');
    const optionsList = options.querySelectorAll('li');
    optionsList.forEach(option =>{
        option.addEventListener('click', ()=>{
            const value = option.innerHTML;
            if(value === '2'){
                boxSelect.style.display = 'none';
                result.classList.add('result-on');
                result.innerHTML = value;
            }else{
                boxSelect.value = value;
            }
        })
    })
});

boxSelect.addEventListener('click', ()=>{
    options.classList.remove('options');
    options.classList.add('options-on');

    const optionsList = options.querySelectorAll('li');
    optionsList.forEach(option =>{
        option.addEventListener('click', ()=>{
            const value = option.innerHTML;
            if(value === '2'){
                boxSelect.style.display = 'none';
                const p = document.createElement('p');
                p.innerHTML = value;
                box2.appendChild(p);
            }else{
                boxSelect.value = value;
            }
        })
    })
});

options.addEventListener('mouseleave', ()=>{
    options.classList.remove('options-on');
    options.classList.add('options');
    boxSelect.disabled = false;
})

document.addEventListener('click', (e)=>{
    if(e.target.id !== 'box-select'){
        options.classList.remove('options-on');
        options.classList.add('options');
        boxSelect.disabled = false;
    }
    
})

formResponse.addEventListener('submit', (e)=>{
    e.preventDefault();
})