$(document).ready(function(){

    $( "#enviar" ).click(function() {
        var ip1 = $("#ip1").val();
        var ip2 = $("#ip2").val();
        var red = $("#red").val();
        var regex = RegExp("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$");
        if(regex.test(ip1) && regex.test(ip2)){
            var sip1 = ip1.split(".");
            var sip2 = ip2.split(".");

            console.log(parseInt(sip1[0]).toString(2))
            console.log(ip2)
        }else if(regex.test(ip1) && regex.test(red)){
            console.log(red)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mal formato en la Dirección IP o Mascara de red\n Ejemplo : 168.1.10.1'
              })
        }
      });
  
  });
  