let btn = document.querySelector('.btn')
let res = document.querySelector('.res')
let main = document.querySelector('.main')
let novoCalculo = document.querySelector('.novo-calculo-btn')

novoCalculo.addEventListener('click', funcNovoCalc)
btn.addEventListener('click', calcular)

function funcNovoCalc(){
    res.style.display = 'none'
    main.style.display = 'flex'

    document.querySelector('#combustivel-preco').value = ''
    document.querySelector('#combustivel-desc').value = ''
    document.querySelector('#km-por-litro').value = ''
    document.querySelector('#km-rodado').value = ''
    document.querySelector('#hora-inicio').value = ''
    document.querySelector('#hora-fim').value = ''
    document.querySelector('#faturamento').value = ''
    document.querySelector('#dia-seguinte').checked = false


}

function calcular(){

    let precoComb = Number(document.querySelector('#combustivel-preco').value)
    let descontoComb = Number(document.querySelector('#combustivel-desc').value)
    let kmPorLitro = Number(document.querySelector('#km-por-litro').value)
    let kmRodado = Number(document.querySelector('#km-rodado').value)
    let horaInicio = document.querySelector('#hora-inicio').value
    let horaFim = document.querySelector('#hora-fim').value
    let diaSeg = document.querySelector('#dia-seguinte')
    let faturamento = Number(document.querySelector('#faturamento').value)

    if(precoComb === 0){
        alert('Campo preço combustivel deve ser preenchido')
    }else if (kmPorLitro === 0){
        alert('Campo km por litro deve ser preenchido')
    }else if (kmRodado === 0){
        alert('Campo km rodado deve ser preenchido')
    }else if (horaInicio === ''){
        alert('Campo iniciou a rodar deve ser preenchido')
    }else if (horaFim === ''){
        alert('Campo parou de rodar deve ser preenchido')
    }else if(faturamento === 0 ){
        alert('Campo faturamento deve ser preenchido')
    }else{
        function dividir (n1, n2){
            return (n1 / n2).toFixed(2)
        }

        const subtrair = (n1, n2) => (n1 -n2).toFixed(2)

        res.style.display = 'flex'
        main.style.display = 'none'

        let descontoCombV = dividir(descontoComb, 100) * precoComb
        let combComDesc = subtrair(precoComb, descontoCombV)
        let gastoPorKmRodado = dividir(combComDesc, kmPorLitro)
        let gastoComComb = (kmRodado * gastoPorKmRodado).toFixed(2)
        let lucro = subtrair(faturamento, gastoComComb)
        let ganhoPorKm = dividir(lucro, kmRodado)

        //trabalhando com as horas 
        //transformando o horario de inicio(string) em valor decimal
        let minutosTrabInicio = (Number(horaInicio.split(':')[0]) * 60) + Number(horaInicio.split(':')[1]) // total de horas e minutos em minutos

        let horasTrabalhadasDecimalInicio = minutosTrabInicio / 60 //não chamei a função dividir pois nao quero arredondar os decimais

        //transformando o horario de fim(string) em valor decimal
        let minutosTrabFim = (Number(horaFim.split(':')[0]) * 60) + Number(horaFim.split(':')[1]) // total de horas e minutos em minutos
        let horasTrabalhadasDecimalFim = minutosTrabFim / 60 //não chamei a função dividir pois nao quero arredondar os decimais

        if (horasTrabalhadasDecimalInicio > horasTrabalhadasDecimalFim){
            diaSeg.checked = true
        }

        // verificando se ele começou em um dia e finalizou em outro dia
        let qntHoraTrabDecimal
        if(diaSeg.checked){
            qntHoraTrabDecimal = (24 - horasTrabalhadasDecimalInicio) + horasTrabalhadasDecimalFim
        }else{
            qntHoraTrabDecimal = horasTrabalhadasDecimalFim - horasTrabalhadasDecimalInicio // não chamei a função subtrair pois nao quero arredondar os decimais
        }
        let ganhoPorHora = dividir(lucro, qntHoraTrabDecimal)

        // convertendo a qnt de hora trabalhada decimal em qnt de hora trabalhada em string, ja formatada
        let horas = Math.floor(qntHoraTrabDecimal)
        let minutos = Math.floor((qntHoraTrabDecimal - horas) * 60)
        let horaFormatada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`

        let textosResultados = [
            `O preço do combustivel com desconto é <span>R$ ${combComDesc}</span>`,
            `Você gasta <span>R$ ${gastoPorKmRodado}</span> a cada km rodado`,
            `Você lucra <span>R$ ${ganhoPorKm}</span> a cada km rodado`,
            `Você gastou <span>R$ ${gastoComComb}</span> com combustivel hoje`,
            `Hoje você trabalhou <span>${horaFormatada} horas</span>`,
            `Você ganha <span>R$ ${ganhoPorHora}</span> por hora`,
            `Hoje você lucrou <span>R$ ${lucro}</span>`
        ];

        let resultados = document.querySelectorAll('.res-txt');

        for(let i = 0; i < resultados.length; i++){
            resultados[i].innerHTML = textosResultados[i];
        }
    }   
}




    