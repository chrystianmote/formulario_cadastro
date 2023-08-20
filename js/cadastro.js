jQuery(document).ready(function ($) {

    var clientes = [];

    function Cliente(tipoPessoa = '', nomeRazao = '', dataNascAbertura = '',
        documento = '', sexo = '', email = '', telefone = '',
        cep = '', logradouro = '', numero = '', complemento = '',
        bairro = '', cidade = '', estado = '') {
        this.tipoPessoa = tipoPessoa;
        this.nomeRazao = nomeRazao;
        this.dataNascAbertura = dataNascAbertura;
        this.documento = documento;
        this.sexo = sexo;
        this.email = email;
        this.telefone = telefone;
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
    }

    function limparCamposCadastrais() {
        $('#txt_nome_razao').val('');
        $('#dt_nasc_abert').val('');
        $('#txt_documento').val('');
        $('#slt_sexo').val('');
        $('#txt_email').val('');
        $('#txt_telefone').val('');
    }

    function limparCamposEndereco() {
        $('#txt_cep').val('');
        $('#txt_logradouro').val('');
        $('#txt_numero').val('');
        $('#txt_complemento').val('');
        $('#txt_bairro').val('');
        $('#txt_cidade').val('');
        $('#slt_estado').val('');
    }


    //colocando mascara pra facilitar e digitar somente os numeros.
    $('#txt_telefone').mask('(00) 00000-0000');
    $('#txt_cep').mask('00000-000');
    $("#txt_documento").mask('000.000.000-00');

    // Se pressionar o radio de Pessoa Física ou Pessoa Jurídica
    // pois os dois tem o mesmo name='pessoa'
    $('input[name="pessoa"]').on("click", function (e) {

        let ehPF = $('#rdb_pf').is(':checked');
        let ehPJ = $('#rdb_pj').is(':checked');

        if (ehPF == true) {

            $("#lbl_nome_razao").html('Nome Completo:');
            $("#txt_nome_razao").attr('placeholder', 'Informe o nome completo...');

            $("#lbl_nasc_abert").html('Data de Nascimento:');

            $("#lbl_documento").html('CPF:');
            $("#txt_documento").attr('placeholder', '000.000.000-00');
            $("#txt_documento").mask('000.000.000-00');


            $("#lbl_sexo").css('display', 'inline-block');
            $("#slt_sexo").css('display', 'block');
            $("#slt_sexo").prop('required', '');

            $("#h1_endereco").html('Endereço Residencial');

            limparCamposCadastrais();
            limparCamposEndereco();

        } else if (ehPJ == true) {

            $("#lbl_nome_razao").html('Razão Social:');
            $("#txt_nome_razao").attr('placeholder', 'Informe a Razão Social...');

            $("#lbl_nasc_abert").html('Data de Abertura:');

            $("#lbl_documento").html('CNPJ:');
            $("#txt_documento").attr('placeholder', '00.000.000/0001-00');
            $("#txt_documento").mask('00.000.000/0000-00');

            $("#lbl_sexo").css('display', 'none');
            $("#slt_sexo").css('display', 'none');
            $("#slt_sexo").prop('required', false);


            $("#h1_endereco").html('Endereço Comercial');

            limparCamposCadastrais();
            limparCamposEndereco();

        }

    });

    $('#txt_cep').on('blur', function (e) {

        let cep_input = $('#txt_cep').val();
        let cep_sem_traco = cep_input.replace('-', '');
        let cep_sem_espaco_e_sem_traco = cep_sem_traco.trim();

        if (cep_sem_espaco_e_sem_traco.length === 0) {

            swal({
                title: "Erro",
                html: '<p style="color: black;">CEP Vazio!</p>',
                type: "error",
                allowOutsideClick: false,
                showCloseButton: false,
                confirmButtonText: '<a style="text-decoration: none;color: #FFF;">OK</a>',
                allowEscapeKey: false
            });

            limparCamposEndereco();

            return;

        }

        $.ajax({
            url: "https://viacep.com.br/ws/" + cep_sem_espaco_e_sem_traco + "/json",
            type: 'get',
            success: function (retorno) {

                if (retorno.erro !== true) {
                    $("#txt_logradouro").val(retorno.logradouro);
                    $("#txt_complemento").val(retorno.complemento);
                    $("#txt_bairro").val(retorno.bairro);
                    $("#txt_cidade").val(retorno.localidade);
                    $("#slt_estado").val(retorno.uf);

                } else {
                    swal({
                        title: "Erro",
                        html: '<p style="color: black;">CEP Inválido!</p>',
                        type: "error",
                        allowOutsideClick: false,
                        showCloseButton: false,
                        confirmButtonText: '<a style="text-decoration: none;color: #FFF;">OK</a>',
                        allowEscapeKey: false
                    }).then(function (result) {
                        //Pressionou OK
                        if (result.value == true) {

                            limparCamposEndereco();
                        }
                    });
                }
            },
            error: function (err) {
                swal({
                    title: "Erro",
                    html: '<p style="color: black;">CEP com Erro!</p>',
                    type: "error",
                    allowOutsideClick: false,
                    showCloseButton: false,
                    confirmButtonText: '<a style="text-decoration: none;color: #FFF;">OK</a>',
                    allowEscapeKey: false
                });
            }
        });

    });

    $('#btnCadastrar').on('click', function (e) {

        let temInputObrigatorioVazio = false;
        let quantidadeInputsVazio = 0;

        // traz todos os elementos com o atributo required no html.
        let inputsObrigatorios = $('[required]');


        $.each(inputsObrigatorios, function (index, input) {
            let valor = $(input).val().trim();
            if (valor == '') {
                temInputObrigatorioVazio = true;
                quantidadeInputsVazio++;
            }
        });

        if (temInputObrigatorioVazio == true) {
            
            let messageErro = '<p style="color: black;">Há '
                + quantidadeInputsVazio + ' Campos Obrigatórios Vazios!</p>';
            swal({
                title: "Erro",
                html: messageErro,
                type: "error",
                allowOutsideClick: false,
                showCloseButton: false,
                confirmButtonText: '<a style="text-decoration: none;color: #FFF;">OK</a>',
                allowEscapeKey: false
            });

            return;
        }

        let novoCliente = new Cliente();
        novoCliente.tipoPessoa = $('#rdb_pj').is(':checked') ? 'J' : 'F';
        novoCliente.nomeRazao = $('#txt_nome_razao').val();
        novoCliente.dataNascAbertura = $('#dt_nasc_abert').val();
        novoCliente.documento = $('#txt_documento').val();
        novoCliente.sexo = $('#slt_sexo option:selected').val();
        novoCliente.email = $('#txt_email').val();
        novoCliente.telefone = $('#txt_telefone').val();
        novoCliente.cep = $('#txt_cep').val();
        novoCliente.logradouro = $('#txt_logradouro').val();
        novoCliente.numero = $('#txt_numero').val();
        novoCliente.complemento = $('#txt_complemento').val();
        novoCliente.bairro = $('#txt_bairro').val();
        novoCliente.cidade = $('#txt_cidade').val();
        novoCliente.estado = $('#slt_estado option:selected').val();

        clientes.push(novoCliente);

        swal({
            title: "Efetuado",
            html: '<p style="color: black;">Novo Cliente Incluído na Base!</p>',
            type: "success",
            allowOutsideClick: false,
            showCloseButton: false,
            confirmButtonText: '<a style="text-decoration: none;color: #FFF;">OK</a>',
            allowEscapeKey: false
        }).then(function (result) {
            //Pressionou OK
            if (result.value == true) {
                limparCamposCadastrais();
                limparCamposEndereco();
            }
        });

        console.log(clientes);

    });


});