jQuery(document).ready(function ($) {

    $('#txt_telefone').mask('(00) 00000-0000');
    $('#txt_cep').mask('00000-000');

    $('input[name="pessoa"]').on("click", function (e) {

        let ehPF = $('#rdb_pf').is(':checked');
        let ehPJ = $('#rdb_pj').is(':checked');

        if (ehPF == true) {

            $("#lbl_nome_razao").html('Nome Completo:');
            $("#txt_nome_razao").attr('placeholder','Informe o nome completo...');
            
            $("#lbl_nasc_abert").html('Data de Nascimento:');
            
            $("#lbl_documento").html('CPF:');
            $("#txt_documento").attr('placeholder','000.000.000-00');
            
            $("#lbl_sexo").css('display','inline-block');
            $("#slt_sexo").css('display','block');
            
            $("#h1_endereco").html('Endereço Residencial');

        } else if (ehPJ == true) {

            $("#lbl_nome_razao").html('Razão Social:');
            $("#txt_nome_razao").attr('placeholder','Informe a Razão Social...');
            
            $("#lbl_nasc_abert").html('Data de Abertura:');
            
            $("#lbl_documento").html('CNPJ:');
            $("#txt_documento").attr('placeholder','00.000.000/0001-00');
            
            $("#lbl_sexo").css('display','none');
            $("#slt_sexo").css('display','none');
            
            $("#h1_endereco").html('Endereço Comercial');



        }

    });

});