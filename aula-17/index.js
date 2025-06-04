const { createElement } = require("react");

const inputCep = document.getElementById("cep");
const formConsulta = document.getElementById("consulta");
const divResultado = document.getElementById("resultado");

async function consultaCep(cep) {
    const req = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
    const res = await req.json();
    return [req.status, res];
}

formConsulta.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    let consulta;
    let spanErro = document.createElement("span");
    spanErro.className = "erro";
    const regex = /^\d{8}$/;

    if (regex.test(inputCep.value)) {
        for (let i = 0; i < divResultado.childElementCount; i ++) {
            divResultado.removeChild(divResultado.children[i]);
        }

        consulta = await consultaCep(inputCep.value);

        if (consulta[0] == 200) {
            const tableResultado = document.createElement("table");
            for (let i = 0; i < 2; i++) {
                tableResultado.appendChild(document.createElement("tr"));
                for (let j = 0; j <= 4; j++) {
                    let thOrTd = "th";
                    if (i != 0) { 
                        thOrTd = "td";
                    }
                    tableResultado.children[i].appendChild(document.createElement(thOrTd));
                }
            }            
        } else {
            spanErro.textContent = `O CEP "${inputCep.value}" não foi encontrado.`;
            divResultado.appendChild(spanErro);
        }
    } else {
        spanErro.textContent = `O CEP "${inputCep.value}" é inválido.`;
        divResultado.appendChild(spanErro);
    }
})