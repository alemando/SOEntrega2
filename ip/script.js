$(document).ready(function(){

    $( "#enviar" ).click(function() {
        var ip1 = $("#ip1").val();
        var ip2 = $("#ip2").val();
        var mascara = $("#red").val();
        var regex = RegExp("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$");


        if(regex.test(ip1) && regex.test(ip2) && regex.test(mascara)){
            
            if(validarMascara(mascara)){
                var red1 = direccionRed(ip1, mascara)
                var red2 = direccionRed(ip2, mascara)
                if(red1 == red2){
                    resultText = 'La dirección de red es: '+ direccionRedMascara(red1, mascara) + '\n'+
                    "La ip de broadcast es: "+direccionRedBroadcast(red1, mascara)+'\n'+
                    "La cantidad maxima de usuarios que pueden conectarsen es: "+direccionPosibles(mascara)
                    Swal.fire({
                        icon: 'success',
                        text: resultText
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Las redes no pertenecen a la misma red'
                    })
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Mal formato en la Mascara de red'
                })
            }
            
        }else if(regex.test(ip1) && regex.test(mascara)){
            if(validarMascara(mascara)){
                var red1 = direccionRed(ip1, mascara)
                resultText = 'La dirección de red es: '+ direccionRedMascara(red1, mascara) + '\n'+
                    "La ip de broadcast es: "+direccionRedBroadcast(red1, mascara)+'\n'+
                    "La cantidad maxima de usuarios que pueden conectarsen es: "+direccionPosibles(mascara)
                    Swal.fire({
                        icon: 'success',
                        text: resultText
                    })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Mal formato en la Mascara de red'
                })
            }

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mal formato en la Dirección IP o Mascara de red\n Ejemplo : 168.1.10.1'
              })
        }
      });
  
});

//Metodo para obtener el numero de conexiones posibles en una red
function direccionPosibles(mascara){
    var mascaraArray = mascara.split(".");

    var conexiones = 1;
    mascaraArray.forEach(e =>{
        if(e != "255"){
            conexiones = conexiones * (255 - parseInt(e))
        }
    })

    return conexiones-1;
}

//Metodo para obtener la direccion de broadcast de una red
function direccionRedBroadcast(red, mascara){
    var redDecimal = binaryStringToDecimal(red);

    var redArray = redDecimal.split(".");
    var mascaraArray = mascara.split(".");

    var result = '';
    for (let index = 0; index < mascaraArray.length; index++) {
        const element = mascaraArray[index];
        var num = 255 - parseInt(element);
        result += parseInt(redArray[index]) + num;
        if(index !=3){
            result += ".";
        }
    }

    return result;
}

//Metodo para obtener la direccion de red de una ip con los bits de mascara
function direccionRedMascara(red, mascara){
    count = 0;

    var mascaraBinaria = toBinaryString(mascara);

    mascaraBinaria.split("").forEach(e =>{
        if(e == "1"){
            count++;
        }
    })

    return binaryStringToDecimal(red) +"/"+count;
}


//Metodo para obtener la direccion de red de una ip
function direccionRed(ip, mascara){

    var ipBinaryString = toBinaryString(ip);
    var mascaraBinaryString = toBinaryString(mascara);

    var ipBinaryStringArray = ipBinaryString.split("");
    var mascaraBinaryStringArray = mascaraBinaryString.split("");
    var red = '';

    for (let index = 0; index < mascaraBinaryStringArray.length; index++) {
        const element = mascaraBinaryStringArray[index];
        if(element == "1"){
            red += ipBinaryStringArray[index];
        }else if(element == "."){
            red += ".";
        }else{
            red += "0";
        }
    }

    return red;
        
}


//Metodo para pasar de formato decimal ip, a binario ip
function toBinaryString(element){
    var result = '';
    var pos = element.split(".");
    var count = 0;
    pos.forEach( e => {
        count ++;
        e = parseInt(e);
        var divValue = 128;
        while (divValue != 0) {
            if(e - divValue >= 0){
                result += '1';
                e -= divValue;
            }else{
                result += '0';
            }
            if (divValue == 1){
                divValue = 0;
            }else{
                divValue = divValue/2;
            }
        }
        if(count != 4){
            result += '.';
        }
        
    })

    return result;

}

//Metodo para pasar de formato binario ip, a decimal ip
function binaryStringToDecimal(element){
    var result = '';
    var pos = element.split(".");
    var count = 0;
    pos.forEach( e => {
        count ++;
        var number = 0;
        var divValue = 128;
        e.split("").forEach( ele => {
            if(ele == "1"){
                number += divValue;
            }
            if (divValue == 1){
                divValue = 0;
            }else{
                divValue = divValue/2;
            }
        })

        if(count != 4){
            result += number+'.';
        }else{
            result += number;
        }
        
    })

    return result;

}


//Metodo para validar si en la mascara de red, al encontrar un 0 en las demas pos, no encuentre un 1
function validarMascara(mascara){
    var mascaraBinaryString = toBinaryString(mascara);

    var cero = false;
    var unoLuegoDeCero = false;

    var pos = mascaraBinaryString.split("");

    pos.forEach( e => {
        if(e == "0"){
            cero = true;
        }
        if(cero && e == "1"){
            unoLuegoDeCero = true;
        }
    })

    if(unoLuegoDeCero){
        return false;
    }else{
        return true;
    }

}
  