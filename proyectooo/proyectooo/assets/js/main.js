$(document).ready(function(){


    $('header .programa .tab').on('click', function(){
        $('header .programa').animate({ left: '0px' });
    });

    $('.btn-idioma .opc').on('click', function(){
        var opc = $(this).attr('rel');
        $.ajax({
            type    : 'POST',
            url     : 'action/lenguage.php',
            data    : { opc:opc },
            cache   : false,
            success : function(rsp){
                location.reload();
            }
        });
    });


    $('.slide-prog').slick({
        centerMode: true,
        centerPadding: '176px',
        slidesToShow: 3,
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
        },{
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }]
    });
    
    $('#x').on('click', function(){
	    var height = $('body').height();
	    $('.nav-movil').css('height', height);
	    
        if ($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
            var effect = 'slide';
            var options = { direction: 'right' };
            var duration = 400;
            $('.nav-movil').toggle(effect, options, duration);
        }else{
            $(this).addClass('clicked');
            var effect = 'slide';
            var options = { direction: 'right' };
            var duration = 400;
            $('.nav-movil').toggle(effect, options, duration);
        }
    });

    $('.precio-btn').on('click', function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('.itine-btn').removeClass('active');
            $('.programa .itinerario').fadeOut('fast', function(){
                $('.programa .precios').fadeIn('fast');
            });
        }
    });
    $('.itine-btn').on('click', function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('.precio-btn').removeClass('active');
            $('.programa .precios').fadeOut('fast', function(){
                $('.programa .itinerario').fadeIn('fast');
            });
        }
    });

    $('.precios .opcion').on('click', function(){
        var $id = $(this).attr('rel');
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('.contain-'+$id).slideToggle();
        }else{
            $('.precios .opcion').each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
            $('.contain-'+$id).slideToggle();
        }
    })

    $('.dias .dia').on('click', function(){
        var $id = $(this).attr('rel');
        if(!$(this).hasClass('active')){
            $('.dias .dia').each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
            $('.info').load('action/programa/detalle-dia.php?d='+$id);
        }
    });

    $('.dias .angle-left').on('click', function(){
        $('.dias .dia').each(function(index){
            if($(this).hasClass('active')){
                $(this).removeClass('active')
                $('.dias .dia').eq(index - 1).addClass('active');
                var $id = $('.dias .dia').eq(index - 1).attr('rel');
                $('.info').load('action/programa/detalle-dia.php?d='+$id);
                return false;
            }
        });
    });

    $('.dias .angle-right').on('click', function(){
        $('.dias .dia').each(function(index){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                if(($('.dias .dia').length - 1) == index){
                    $('.dias .dia').eq(0).addClass('active');
                    var $id = $('.dias .dia').eq(0).attr('rel');
                    $('.info').load('action/programa/detalle-dia.php?d='+$id);
                }else{
                    $('.dias .dia').eq(index + 1).addClass('active');
                    var $id = $('.dias .dia').eq(index + 1).attr('rel');
                    $('.info').load('action/programa/detalle-dia.php?d='+$id);
                }
                return false;
            }
        });
    });


    /* ================= RESERVAS =================*/
    $('.cant-viajeros').on('blur', function(){
        var value = $(this).val();
        $('.cant-reservas .content').load('action/reservas/viajeros.php?cant=' + value);
    });

    $('.cant-reservas .arrow.up').on('click', function(){
        var value = parseInt($('.cant-viajeros').val());
        value++;

        if(value <= 8){
            $('.cant-reservas .content').load('action/reservas/viajeros.php?cant=' + value);
            $('.cant-viajeros').val(value);
        }
    });

    $('.cant-reservas .arrow.down').on('click', function(){
        var value = parseInt($('.cant-viajeros').val());
        value--;

        if(value >= 1){
            $('.cant-reservas .content').load('action/reservas/viajeros.php?cant=' + value);
            $('.cant-viajeros').val(value);
        }
    });
    
	$('#cantidad').on('change', function(){
		var value = $(this).val();
		$('.cant-reservas .content').load('action/reservas/viajeros.php?cant=' + value);
		$('.cant-viajeros').val(value);
	});
    

    $('.btn-resumen').on('click', function(){
        var total = $('#total').val();

        if(total != ''){
            $(this).empty();
            $(this).append('<i class="fa fa-spin fa-spinner"></i>');
            
            $.ajax({
                type    : 'POST',
                url     : 'action/reservas/resumen.php',
                data    : { total:total },
                cache   : false,
                success : function(rsp){
                    if(rsp.trim() == "SUCCESS"){
                        location.href = "reservas-datos";
                    }else{
		                swal({
						  title: "Perdiste la sesión",
						  type: "error",
						  showCancelButton: false,
						  showLoaderOnConfirm: true
						}).then(function (result) {
							if (result.value) {
								location.href = "reservas";			
							}
						});
	                }
                }
            });
        }
    });

    $('.datos .opcion .title').on('click', function(){
        var $this = $(this).parent();
        
        if($this.hasClass('active')){
            $this.removeClass('active');
            $this.find('.desc').slideUp();
        }else{
            $this.addClass('active');
            $this.find('.desc').slideDown();    
        }
    });

    $('.btn-reserva').on('click', function(){
	    //swal("","Las reservas no estan disponibles en este momento","warning");
        $(this).empty();
        $(this).append('<i class="fa fa-spin fa-spinner"></i>');
        var cantidad    = $('.cant-viajeros').val();
        var pais        = $('#ps1').val();

        $.ajax({
            type    : 'POST',
            url     : 'action/reservas/paso1.php',
            data    : { cantidad:cantidad, pais:pais },
            cache   : false,
            success : function(rsp){
                if(rsp.trim() == "SUCCESS"){
                    location.href = "reservas-paso2";
                }else{
	                swal({
					  title: "Perdiste la sesión",
					  type: "error",
					  showCancelButton: false,
					  showLoaderOnConfirm: true
					}).then(function (result) {
						if (result.value) {
							location.href = "reservas";			
						}
					});
                }
            }
        });
    });

    $('.paso2 .circuitos .circuito').on('click', function(){
        if(!$(this).hasClass('selected')){
            $('.paso2 .circuitos .circuito').each(function(){
                $(this).removeClass('selected');
            });
            $(this).addClass('selected');
        }
    });

    $('.btn-paso2').on('click', function(){
        $(this).empty();
        $(this).append('<i class="fa fa-spin fa-spinner"></i>');

        $('.paso2 .circuitos .circuito').each(function(){
            if($(this).hasClass('selected')){
                var ruta = $(this).attr('rel');        

                $.ajax({
                    type    : 'POST',
                    url     : 'action/reservas/paso2.php',
                    data    : { ruta:ruta },
                    cache   : false,
                    success : function(rsp){
                        if(rsp.trim() == "SUCCESS"){
                            location.href = "reservas-paso3";
                        }else{
			                swal({
							  title: "Perdiste la sesión",
							  type: "error",
							  showCancelButton: false,
							  showLoaderOnConfirm: true
							}).then(function (result) {
								if (result.value) {
									location.href = "reservas";			
								}
							});
		                }
                    }
                });
            }
        });
    });

    $('.opc-3').on('change', function(){
        var $this   = $(this);
        var val     = $this.val();
        var seek    = '.d'+val;
        $('.opc-3').each(function(){
            $(this).parent().find('.angle-right').removeClass('active');
            $('.desc').slideUp();
        });
        $this.parent().find('.angle-right').addClass('active');
        $this.parent().parent().parent().find(seek).slideDown();
    });

    $('.multiselect').on('click', function(){
        $(this).parent().find('ul').fadeIn('fast');
    });

    $('.sbox').on('click', function(){
        var $this   = $(this);
        var text    = $this.parent().parent().parent().find('.multiselect').text();
        var select  = $this.parent().parent().parent().find('.multiselect');
        var txt     = $this.parent().text();
        
        if($this.is(':checked')){
            if(text == 'Seleccione'){
                select.empty();
                select.append(txt);
            }else{
                select.append(", " + txt);
            }
        }else{
            if(text == txt){
                select.empty();
                select.append('Seleccione');
            }else{
                var opcs = text.split(', ');
                select.empty();
                for(i in opcs){
                    if(opcs[i] != txt){
                        var newText    = $this.parent().parent().parent().find('.multiselect').text();
                        if(newText == ''){
                            select.append(opcs[i]);
                        }else{
                            select.append(", "+opcs[i])
                        }
                    }
                }
                
            }
        }
    });

    /*$('.desde1').on('change', function(){
        var val     = $(this).attr('rel');
        var desde   = $(this).val();
        var $select = $('.taop1');

        console.log(val);
        console.log(desde);

        $.ajax({
            type    : 'POST',
            url     : 'action/reservas/carga-stock.php',
            data    : { id:val, opc:1, fecha:desde },
            cache   : false,
            success : function(rsp){
                console.log(rsp);
                $select.empty();
                $(rsp).each(function (index, o) { 
                    var $option = $("<option/>").attr("value", o[0]).text(o[1]+" ("+o[2]+")");
                    $select.append($option);
                });
            }
        });
    });*/

    $('.date1').on('change', function(e){
        e.preventDefault();
        var val     = $(this).attr('rel');
        var hasta   = $(this).val();
        var desde   = $('#desde_op1-'+val).val();
        var fh      = moment(hasta.substr(6, 4) + "-" + hasta.substr(3, 2) + "-" + hasta.substr(0, 2));
        var fd      = moment(desde.substr(6, 4) + "-" + desde.substr(3, 2) + "-" + desde.substr(0, 2));
        var hoy     = moment().format("YYYY-MM-DD");
        var dif     = fh.diff(fd, 'days');
        var dif_hoy = fh.diff(hoy, 'days');

        if(dif_hoy > 0){
            if(dif >= 1){
                $('#desde_op2-'+val).val(hasta);
            }else{
                alertify.error("la fecha hasta no puede ser menor o igual a la fecha de desde");
                $(this).val("");
                $('#desde_op2-'+val).val("");
            }
        }else{
            alertify.error("La fecha debe ser mayor o igual al dia de hoy");
            $(this).val("");
            $('#desde_op2-'+val).val("");
        }
    });

    $('.date3').on('change', function(e){
        e.preventDefault();
        var val     = $(this).attr('rel');
        var hasta   = $(this).val();
        var desde   = $('#desde_op2-'+val).val();
        var fh      = moment(hasta.substr(6, 4) + "-" + hasta.substr(3, 2) + "-" + hasta.substr(0, 2));
        var fd      = moment(desde.substr(6, 4) + "-" + desde.substr(3, 2) + "-" + desde.substr(0, 2));
        var hoy     = moment().format("YYYY-MM-DD");
        var dif     = fh.diff(fd, 'days');
        var dif_hoy = fh.diff(hoy, 'days');

        if(dif_hoy > 0){
            if(dif >= 1){
                $('#desde_op3-'+val).val(moment(hasta.substr(6, 4) + "-" + hasta.substr(3, 2) + "-" + hasta.substr(0, 2)).add(1, 'days').format('DD-MM-YYYY'));
            }else{
                alertify.error("la fecha hasta no puede ser menor o igual a la fecha de desde");
                $(this).val("");
                $('#desde_op3-'+val).val("");
            }
        }else{
            alertify.error("La fecha debe ser mayor o igual al dia de hoy");
            $(this).val("");
            $('#desde_op3-'+val).val("");
        }
    });
    
    $('.date4').on('change', function(e){
        e.preventDefault();
        var val     = $(this).attr('rel');
        var hasta   = $(this).val();
        var desde   = $('#desde_op2-'+val).val();
        var fh      = moment(hasta.substr(6, 4) + "-" + hasta.substr(3, 2) + "-" + hasta.substr(0, 2));
        var fd      = moment(desde.substr(6, 4) + "-" + desde.substr(3, 2) + "-" + desde.substr(0, 2));
        var hoy     = moment().format("YYYY-MM-DD");
        var dif     = fh.diff(fd, 'days');
        var dif_hoy = fh.diff(hoy, 'days');

        if(dif_hoy > 0){
            if(dif >= 1){
                $('#desde_op3-'+val).val(hasta);
            }else{
                alertify.error("la fecha hasta no puede ser menor o igual a la fecha de desde");
                $(this).val("");
                $('#desde_op3-'+val).val("");
            }
        }else{
            alertify.error("La fecha debe ser mayor o igual al dia de hoy");
            $(this).val("");
            $('#desde_op3-'+val).val("");
        }
    });

    $('.date5').on('change', function(e){
        e.preventDefault();
        var val     = $(this).attr('rel');
        var hasta   = $(this).val();
        var desde   = $('#desde_op3-'+val).val();
        var fh      = moment(hasta.substr(6, 4) + "-" + hasta.substr(3, 2) + "-" + hasta.substr(0, 2));
        var fd      = moment(desde.substr(6, 4) + "-" + desde.substr(3, 2) + "-" + desde.substr(0, 2));
        var hoy     = moment().format("YYYY-MM-DD");
        var dif     = fh.diff(fd, 'days');
        var dif_hoy = fh.diff(hoy, 'days');

        if(dif_hoy > 0){
            if(dif >= 1){
                $('#desde_op4-'+val).val(hasta);
            }else{
                alertify.error("la fecha hasta no puede ser menor o igual a la fecha de desde");
                $(this).val("");
                $('#desde_op4-'+val).val("");
            }
        }else{
            alertify.error("La fecha debe ser mayor o igual al dia de hoy");
            $(this).val("");
            $('#desde_op4-'+val).val("");
        }
    });

	$('.date7').on('change', function(e){
        e.preventDefault();
        var val     = $(this).attr('rel');
        var hasta   = $(this).val();
        var desde   = $('#desde_op4-'+val).val();
        var fh      = moment(hasta.substr(6, 4) + "-" + hasta.substr(3, 2) + "-" + hasta.substr(0, 2));
        var fd      = moment(desde.substr(6, 4) + "-" + desde.substr(3, 2) + "-" + desde.substr(0, 2));
        var hoy     = moment().format("YYYY-MM-DD");
        var dif     = fh.diff(fd, 'days');
        var dif_hoy = fh.diff(hoy, 'days');

        if(dif_hoy > 0){
            if(dif >= 1){
                //$('#desde_op4-'+val).val(hasta);
            }else{
                alertify.error("la fecha hasta no puede ser menor o igual a la fecha de desde");
                $(this).val("");
                //$('#desde_op4-'+val).val("");
            }
        }else{
            alertify.error("La fecha debe ser mayor o igual al dia de hoy");
            $(this).val("");
            //$('#desde_op4-'+val).val("");
        }
    });


    $('#hasta_op1-1').on('change', function(){ $('#tipo_alojamiento_op1-1').val(0); });
    $('#hasta_op2-1').on('change', function(){ $('#tipo_alojamiento_op2-1').val(0); });
    $('#hasta_op1-2').on('change', function(){ $('#tipo_alojamiento_op1-2').val(0); });
    $('#hasta_op2-2').on('change', function(){ $('#tipo_alojamiento_op2-2').val(0); });
    $('#hasta_op1-3').on('change', function(){ $('#tipo_alojamiento_op1-3').val(0); });
    $('#hasta_op1-4').on('change', function(){ $('#tipo_alojamiento_op1-4').val(0); });

    /*$('.dhoy, .date1, .dt2, .dt3, .dt4, .dt5, .dt6, .dt7').on('change', function(){
        $('.taop1').val("0"); 
    });

    $('.dhoy, .date1, .dt2, .dt3, .dt4, .dt5, .dt6, .dt7').on('change', function(){


    
$('.taop2').val("0"); $('.taop3').val("0"); $('.taop4').val("0");*/



    $('.dhoy').on('change', function(){
        var fecha   = moment($(this).val().substr(6, 4) + "-" + $(this).val().substr(3, 2) + "-" + $(this).val().substr(0, 2));
        var hoy     = moment().format("YYYY-MM-DD");
        var dif     = fecha.diff(hoy, 'days');

        if(dif < 0){
            alertify.error("La fecha debe ser mayor o igual al dia de hoy");
            $(this).val("");
            $('.date1').val("");
            $('.dt2').val("");
            $('.dt3').val("");
            $('.dt4').val("");
            $('.dt5').val("");
            $('.dt6').val("");
            $('.dt7').val("");
        }else{
            $('.date1').val("");
            $('.dt2').val("");
            $('.dt3').val("");
            $('.dt4').val("");
            $('.dt5').val("");
            $('.dt6').val("");
            $('.dt7').val("");
        }
    });

	$('.date1').on('change', function(){
	    $('.dt3').val("");
        $('.dt4').val("");
        $('.dt5').val("");
        $('.dt6').val("");
        $('.dt7').val("");
    }); 

	$('.dt2').on('change', function(){
	    $('.dt3').val("");
        $('.dt4').val("");
        $('.dt5').val("");
        $('.dt6').val("");
        $('.dt7').val("");
    }); 
    $('.dt3').on('change', function(){
        $('.dt5').val("");
        $('.dt6').val("");
        $('.dt7').val("");
    }); 
    $('.dt4').on('change', function(){
        $('.dt5').val("");
        $('.dt6').val("");
        $('.dt7').val("");
    }); 
    $('.dt5').on('change', function(){
        $('.dt7').val("");
    }); 
    $('.dt6').on('change', function(){
        $('.dt7').val("");
    }); 

    $('.fecha_programa').on('change', function(){
        var fecha   = moment($(this).val().substr(6, 4) + "-" + $(this).val().substr(3, 2) + "-" + $(this).val().substr(0, 2));
        var hoy     = moment().format("YYYY-MM-DD");
        var dif     = fecha.diff(hoy, 'days');

        if(dif < 0){
            alertify.error("La fecha debe ser mayor o igual al dia de hoy");
            $(this).val("");
            $('.date1').val("");
        }else{
            $('.date1').val("");
        }
    });

    var STOCKDISPONIBLE = false;

    $('.taop1').on('change', function(){
        STOCKDISPONIBLE = false;
        var val     = $(this).attr('rel');
        var value   = $(this).val()
        var desde   = $('#desde_op1-'+val).val();
        var hasta   = $('#hasta_op1-'+val).val();

		console.log("1.");

        if(desde == '' || hasta == ''){
            alertify.error("Seleccione las fechas");
            $(this).val(0);
            console.log("2.");
        }else{
	        console.log("3.");
            $.ajax({
                type    : 'POST',
                url     : 'action/reservas/carga-stock.php',
                data    : { id:val, opc:1, desde:desde, hasta:hasta, stoc:value },
                cache   : false,
                success : function(rsp){
	                console.log(rsp);
                    if(!rsp.stock){
                        $('.taop1').val("0");
                        swal("","No hay disponibilidad para las fechas seleccionada","error");
                        return false;
                    }else{
                        alertify.error("Hay Disponibilidad");
                        STOCKDISPONIBLE = true;
                    }
                }
            });

            $('.s1-'+val+' ul').load('action/reservas/servicios-add.php?st='+value+'&id='+val+'&opc=1');
        }
    });

    $('.taop2').on('change', function(){
        STOCKDISPONIBLE = false;
        var val     = $(this).attr('rel');
        var value   = $(this).val()
        var desde   = $('#desde_op2-'+val).val();
        var hasta   = $('#hasta_op2-'+val).val();

        if(desde == '' || hasta == ''){
            alertify.error("Seleccione las fechas");
            $(this).val(0);
        }else{
            $.ajax({
                type    : 'POST',
                url     : 'action/reservas/carga-stock.php',
                data    : { id:val, opc:2, desde:desde, hasta:hasta, stoc:value },
                cache   : false,
                success : function(rsp){
                    if(!rsp.stock){
                        $('.taop2').val("0");
                        swal("","No hay disponibilidad para las fechas seleccionada","error");
                        return false;
                    }else{
                        alertify.error("Hay Disponibilidad");
                        STOCKDISPONIBLE = true;
                    }
                }
            });

            $('.s2-'+val+' ul').load('action/reservas/servicios-add.php?st='+value+'&id='+val+'&opc=2');
        }
    });

    $('.taop3').on('change', function(){
        STOCKDISPONIBLE = false;
        var val     = $(this).attr('rel');
        var value   = $(this).val()
        var desde   = $('#desde_op3-'+val).val();
        var hasta   = $('#hasta_op3-'+val).val();

        if(desde == '' || hasta == ''){
            alertify.error("Seleccione las fechas");
            $(this).val(0);
        }else{
            $.ajax({
                type    : 'POST',
                url     : 'action/reservas/carga-stock.php',
                data    : { id:val, opc:3, desde:desde, hasta:hasta, stoc:value },
                cache   : false,
                success : function(rsp){
                    if(!rsp.stock){
                        $('.taop3').val("0");
                        swal("","No hay disponibilidad para las fechas seleccionada","error");
                        return false;
                    }else{
                        alertify.error("Hay Disponibilidad");
                        STOCKDISPONIBLE = true;
                    }
                }
            });

            $('.s3-'+val+' ul').load('action/reservas/servicios-add.php?st='+value+'&id='+val+'&opc=3');
        }
    });

    $('.taop4').on('change', function(){
        STOCKDISPONIBLE = false;
        var val     = $(this).attr('rel'); //OPCIONES RUTA ID
        var value   = $(this).val(); //TIPO ALOJAMIENTO ID
        var desde   = $('#desde_op4-'+val).val();// FECHA DESDE
        var hasta   = $('#hasta_op4-'+val).val(); // FECHA HASTA

        if(desde == '' || hasta == ''){
            alertify.error("Seleccione las fechas");
            $(this).val(0);
        }else{
            $.ajax({
                type    : 'POST',
                url     : 'action/reservas/carga-stock.php',
                data    : { id:val, opc:4, desde:desde, hasta:hasta, stoc:value },
                cache   : false,
                success : function(rsp){
                    if(!rsp.stock){
                        $('.taop4').val("0");
                        swal("","No hay disponibilidad para las fechas seleccionada","error");
                        return false;
                    }else{
                        alertify.error("Hay Disponibilidad");
                        STOCKDISPONIBLE = true;
                    }
                }
            });

            $('.s4-'+val+' ul').load('action/reservas/servicios-add.php?st='+value+'&id='+val+'&opc=4');
        }
    });



    $('.btn-paso3').on('click', function(){
        var form    = document.forms['formPaso3'];
        var opc     = form.opcion.value;

        if(opc != ''){

            var op1 = {
                desde       : $('#desde_op1-'+opc).val(),
                hasta       : $('#hasta_op1-'+opc).val(),
                alojamiento : $('#tipo_alojamiento_op1-'+opc).val(),
                servicios   : []
            };

            if(op1.alojamiento == 0){
                alertify.error("Seleccione el tipo de alojamiento");
                return false;
            }

            var op2 = {
                desde       : $('#desde_op2-'+opc).val(),
                hasta       : $('#hasta_op2-'+opc).val(),
                alojamiento : $('#tipo_alojamiento_op2-'+opc).val(),
                servicios   : []
            };

            if(op2.alojamiento == 0){
                alertify.error("Seleccione el tipo de alojamiento");
                return false;
            }

            var op3 = {
                desde       : $('#desde_op3-'+opc).val(),
                hasta       : $('#hasta_op3-'+opc).val(),
                alojamiento : $('#tipo_alojamiento_op3-'+opc).val(),
                servicios   : []
            };

            if(op3.alojamiento == 0){
                alertify.error("Seleccione el tipo de alojamiento");
                return false;
            }

            var op4 = {
                desde       : $('#desde_op4-'+opc).val(),
                hasta       : $('#hasta_op4-'+opc).val(),
                alojamiento : $('#tipo_alojamiento_op4-'+opc).val(),
                servicios   : []
            };

            if(op4.alojamiento == 0){
                alertify.error("Seleccione el tipo de alojamiento");
                return false;
            }

            $('.d'+opc+' .s1-'+opc+' .sbox').each(function(){
                if($(this).is(':checked')){
                    op1.servicios.push($(this).val());
                }
            });

            $('.d'+opc+' .s2-'+opc+' .sbox').each(function(){
                if($(this).is(':checked')){
                    op2.servicios.push($(this).val());
                }
            });

            $('.d'+opc+' .s3-'+opc+' .sbox').each(function(){
                if($(this).is(':checked')){
                    op3.servicios.push($(this).val());
                }
            });

            $('.d'+opc+' .s4-'+opc+' .sbox').each(function(){
                if($(this).is(':checked')){
                    op4.servicios.push($(this).val());
                }
            });

            if(!STOCKDISPONIBLE) return false;

            $.ajax({
                type    : 'POST',
                url     : 'action/reservas/paso3.php',
                data    : { opc:opc, op1:op1, op2:op2, op3:op3, op4:op4 },
                cache   : false,
                success : function(rsp){
                    console.log(rsp);
                    if(rsp.trim() == "SUCCESS"){
                        location.href = "reservas-resumen";
                    }else{
		                swal({
						  title: "Perdiste la sesión",
						  type: "error",
						  showCancelButton: false,
						  showLoaderOnConfirm: true
						}).then(function (result) {
							if (result.value) {
								location.href = "reservas";			
							}
						});
	                }
                }
            });

        }else{
            alertify.error("Selecciona una opción");
        }
    });


    $('.btn-pagar').on('click', function(){
        var $this       = $(this);
        var cant        = parseInt($this.attr('rel'));
        var i           = 0;
        var viajeros    = [];
        var terminos    = $('#terminos').is(':checked');

        while(i < cant){
            var form = document.forms['formViajero'+i];

            if(form.nombre.value == ''){ alertify.error("Todos los datos son obligatorios"); return false; }
            if(form.email.value == ''){ alertify.error("Todos los datos son obligatorios"); return false; }
            if(!validarEmail(form.email.value)){ alertify.error("El email no es valido"); return false; }
            if(form.identificacion.value == ''){ alertify.error("Todos los datos son obligatorios"); return false; }
            if(form.pais.value == 0){ alertify.error("Todos los datos son obligatorios"); return false; }

            var datos = {
                nombre  : form.nombre.value,
                email   : form.email.value,
                ident   : form.identificacion.value,
                pais    : form.pais.value
            };
            viajeros[i] = datos;
            i++;
        }

        if(terminos){
            $.ajax({
                type    : 'POST',
                url     : 'action/reservas/datos.php',
                data    : { viajeros:viajeros },
                cache   : false,
                success : function(rsp){
                    if(rsp.trim() == "SUCCESS"){
                        location.href="procesar-compra";
                    }else{
		                swal({
						  title: "Perdiste la sesión",
						  type: "error",
						  showCancelButton: false,
						  showLoaderOnConfirm: true
						}).then(function (result) {
							if (result.value) {
								location.href = "reservas";			
							}
						});
	                }
                }
            });
        }else{
	        swal("","Debe aceptar los terminos y condiciones","warning");
        }
    });
    
    $('.btn-pagar-paypal').on('click', function(){
        var $this       = $(this);
        var cant        = parseInt($this.attr('rel'));
        var i           = 0;
        var viajeros    = [];
        var terminos    = $('#terminos').is(':checked');

        while(i < cant){
            var form = document.forms['formViajero'+i];

            if(form.nombre.value == ''){ alertify.error("Todos los datos son obligatorios"); return false; }
            if(form.email.value == ''){ alertify.error("Todos los datos son obligatorios"); return false; }
            if(!validarEmail(form.email.value)){ alertify.error("El email no es valido"); return false; }
            if(form.identificacion.value == ''){ alertify.error("Todos los datos son obligatorios"); return false; }
            if(form.pais.value == 0){ alertify.error("Todos los datos son obligatorios"); return false; }

            var datos = {
                nombre  : form.nombre.value,
                email   : form.email.value,
                ident   : form.identificacion.value,
                pais    : form.pais.value
            };
            viajeros[i] = datos;
            i++;
        }

        if(terminos){
            $.ajax({
                type    : 'POST',
                url     : 'action/reservas/datos.php',
                data    : { viajeros:viajeros },
                cache   : false,
                success : function(rsp){
                    if(rsp.trim() == "SUCCESS"){
                        location.href="procesar-paypal";
                    }
                }
            });
        }else{
	        swal("","Debe aceptar los terminos y condiciones","warning");
        }
    });

    $('.enviar-contacto').on('click', function(){
        var form = document.forms['formContacto'];
        var datos = {
            nombre      : form.nombre.value,
            email       : form.email.value,
            telefono    : form.telefono.value,
            mensaje     : form.mensaje.value
        };

        if(datos.nombre == ''){ alertify.error("Ingrese su nombre"); return false; }
        if(datos.email == ''){ alertify.error("Ingrese su email"); return false; }
        if(!validarEmail(datos.email)){ alertify.error("El email ingresado no es valido"); return false; }
        if(datos.mensaje == ''){ alertify.error("Ingrese un mensaje"); return false; }

        $.ajax({
            type    : 'POST',
            url     : 'action/mensajes/contacto.php',
            data    : { datos:datos },
            cache   : false,
            success : function(rsp){
                swal("",rsp,"success");
                form.nombre.value   = "";
                form.email.value    = "";
                form.telefono.value = "";
                form.mensaje.value  = "";
            }
        });

    });
});

$(document).mouseup(function(e){
    if((!$('header .programa').is(e.target) && $('header .programa').has(e.target).length === 0) && (!$('#ui-datepicker-div').is(e.target) && $('#ui-datepicker-div').has(e.target).length === 0)){
        $('header .programa').animate({
            left: '-282px'
        });
    }

    if(!$('.desc .opcn .servicios ul li').is(e.target) && $('.desce .opcn .servicios ul li').has(e.target).length === 0){
        if(!$('.desc .opcn .servicios ul li input').is(e.target) && $('.desce .opcn .servicios ul li input').has(e.target).length === 0){
            $('.desc .opcn .servicios ul').fadeOut('fast');
        }
    }
});


function validarEmail(valor) {
	var patron=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
 	if (valor.search(patron) == 0){
  		return true;
  } else {
   		return false;
  }
}

function valideKey(evt){
    var code = (evt.which) ? evt.which : evt.keyCode;
    if(code==8) {
        return true;
    }else if(code>=48 && code<=57 || code == 9) {
        return true;
    }else{
        return false;
    }
}   