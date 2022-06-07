var sorteio, text, sortudoNome, conteiner, listaFilho, at, atConteiner, nomes, divErro, sortear, ok, pSorteado;
        text = document.getElementById('name')
        sortear = document.querySelector('#sorteio')
        sortudoNome = document.querySelector("#sortudoNome")
        conteiner = document.querySelector("#conteiner")
        nomes = document.getElementById("nomes")
        divErro = document.getElementById('erro')
        ok = document.querySelector('#ok')
        pSorteado = document.querySelector('#pSorteado')

        ok.addEventListener('click', finalizar)
        sortear.addEventListener('click', sortearNome)

        document.getElementById('incluir').addEventListener("click", addPessoas)
        document.addEventListener("keypress", function(e){
            if(e.which =='13'){
                addPessoas()
            }
        })

        onload = function(){
            const dados = localStorage.getItem("valor")
            const dadosNome = JSON.parse(dados)
            nomes.innerHTML = dadosNome
            const removeLink = document.getElementsByClassName('removeLink')
            for (remove of removeLink){
                remove.addEventListener('click', remover)
            }
            text.focus()

        }
        function addPessoas(){
            if(text.value.length == 0){
                divErro.innerHTML = "*Insira um nome*"
            } else{
            divErro.innerHTML = ""
            const name = text.value
            nomes.innerHTML = "<div class='divNome'> <p class = 'pNome'></p> <a class='removeLink'>🗑️</a></div>" + nomes.innerHTML
            const pNome = document.getElementsByClassName('pNome')[0]
            pNome.innerHTML = text.value
            text.value=''
            const valor = JSON.stringify(nomes.innerHTML)
            localStorage.setItem("valor", valor)
            document.getElementById('incluir').addEventListener("click", onload())
            }
        }
        function remover (){
            const removerNome = this
            const removerPai = removerNome.parentElement
            removerPai.remove()
            const valor = JSON.stringify(nomes.innerHTML)
            localStorage.setItem("valor", valor)
            onload()
        }


        function sortearNome (){
            let pNome = document.getElementsByClassName('pNome')
            if(nomes.innerHTML == ""){
                divErro.innerHTML = "*Favor Inserir pelo menos dois nomes*"
            }

            else if(pNome.length  == 1){
                divErro.innerHTML = "*Favor Inserir pelo menos dois nomes*"
            }
            else{
            divErro.innerHTML = ""
            const nSorteio = Math.floor(Math.random() * pNome.length)
            const sorteado = pNome[nSorteio]
            pSorteado.innerHTML = sorteado.innerHTML
            sortudoNome.style.display = "block"
            conteiner.style.filter = "blur(10px)"
            if (document.getElementById('check').checked){
                allRemove()
            }
            }
        }
        function finalizar(){
            sortudoNome.style.display = "none"
            conteiner.style.filter = "none"  
            text.value=""
            text.focus()
        }
        function allRemove(){
            nomes.innerHTML = ""
            const valor = JSON.stringify(nomes.innerHTML)
            localStorage.setItem("valor", valor)
        }
