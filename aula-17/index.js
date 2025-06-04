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
    
    for (let i = 0; i < divResultado.childElementCount; i ++) {
        divResultado.removeChild(divResultado.children[i]);
    }

    let consulta;
    let spanErro = document.createElement("span");
    spanErro.className = "erro";
    const regex = /^\d{8}$/;

    if (regex.test(inputCep.value)) {
        consulta = await consultaCep(inputCep.value);

        if (consulta[0] == 200) {
            const tableResultado = document.createElement("table");
            for (let i = 0; i < 2; i++) {
                tableResultado.appendChild(document.createElement("tr"));
                for (let j = 0; j < 4; j++) {
                    let thOrTd = "th";
                    if (i != 0) { 
                        thOrTd = "td";
                    }
                    tableResultado.children[i].appendChild(document.createElement(thOrTd));
                }
            }


            tableResultado.children[0].children[0].textContent = "Logradouro/Nome";
            tableResultado.children[0].children[1].textContent = "Bairro/Distrito";
            tableResultado.children[0].children[2].textContent = "Localidade/UF";
            tableResultado.children[0].children[3].textContent = "CEP";
            tableResultado.children[1].children[0].textContent = consulta[1].address;
            tableResultado.children[1].children[1].textContent = consulta[1].district;
            tableResultado.children[1].children[2].textContent = `${consulta[1].city} - ${consulta[1].state}`;
            tableResultado.children[1].children[3].textContent = consulta[1].cep;


            divResultado.appendChild(tableResultado);
        } else {
            spanErro.textContent = `O CEP "${inputCep.value}" não foi encontrado.`;
            divResultado.appendChild(spanErro);
        }
    } else {
        spanErro.textContent = `O CEP "${inputCep.value}" é inválido.`;
        divResultado.appendChild(spanErro);
    }
})