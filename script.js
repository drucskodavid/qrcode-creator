// Init fields
let apiUrl, btGenerate, inputContent, cbSvgMode, imgCanvas, widthInPixels, marginInPixels, fgColor, bgColor, imageArea, dlLinkBt;

apiUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=';
btGenerate = document.getElementById('generateBt');
inputContent = document.getElementById('contentTx');
cbSvgMode = document.getElementById('vectorCb');
imgCanvas = document.getElementById('imgWrp');
widthInPixels = document.getElementById('widthInPixels');
marginInPixels = document.getElementById('marginInPixels');
fgColor = document.getElementById('fgColor');
bgColor = document.getElementById('bgColor');
imageArea = document.getElementById('ifImgReady');
dlLinkBt = document.getElementById('dlLinkBt');


// Init error handling fields
let eiContent, eiWidth, eiMargin;

eiContent = document.getElementById('eiContent');
eiWidth = document.getElementById('eiWidth');
eiMargin = document.getElementById('eiMargin');


// All fields are correct
let field1IsCorrect, field2IsCorrect, field3IsCorrect;


// Check if value contains only numbers
function checkIfInt(string) {
    return /^\d+$/.test(string);
}

function checkIfForcedSvg(x){
    if (x.checked){
        return 1000000;
    } else{
        return 1000;
    }
}

// Validate form - button on(C)lick
btGenerate.addEventListener('click', function(){
    // Validate field 1
    if(inputContent.value == ''){
        console.log('A mező nem lehet üres!');
        eiContent.innerHTML = 'A mező nem lehet üres!';
        eiContent.style.display = 'block';
        field1IsCorrect = false;
    } else if (inputContent.value.includes('&')){
        console.log('A mező nem tartalmazhat "&" karaktert!');
        eiContent.innerHTML = 'A mező nem tartalmazhat "&" karaktert!';
        eiContent.style.display = 'block';
        field1IsCorrect = false;
    } else{
        field1IsCorrect = true;
        console.log(field1IsCorrect);
        eiContent.style.display = 'none';
    }

    // Validate field 2
    if(widthInPixels.value == ''){
        widthInPixels.value = 256;
    }

    if (checkIfInt(widthInPixels.value) && Number(widthInPixels.value) >= 10 && Number(widthInPixels.value) <= checkIfForcedSvg(cbSvgMode)){
        field2IsCorrect = true;
        console.log(field2IsCorrect);
        eiWidth.style.display = 'none';
    } else{
        console.log('Helytelen érték');
        eiWidth.innerHTML = 'Érvénytelen érték! Min: 10, Max :' + checkIfForcedSvg(cbSvgMode);
        eiWidth.style.display = 'block';
        field2IsCorrect = false;
    }

    // Validate field 3
    if(marginInPixels.value == ''){
        marginInPixels.value = 0;
    }

    if(checkIfInt(marginInPixels.value) && Number(marginInPixels.value) >= 0 && Number(marginInPixels.value) <= 50){
        field3IsCorrect = true;
        eiMargin.style.display = 'none';
        console.log(field3IsCorrect);
    } else{
        field3IsCorrect = false;
        eiMargin.innerHTML = 'Érvénytelen érték! Max: 50, Min: 0';
        eiMargin.style.display = 'block';
    }

    if(field1IsCorrect && field2IsCorrect && field3IsCorrect){
        console.log('Minden mező helyes.');
        let fgColor_nohash = fgColor.value.split("#")[1];
        let bgColor_nohash = bgColor.value.split("#")[1];
        let format_filetype = 'png';
        if (cbSvgMode.checked){
            format_filetype = 'svg';
        }
        let link = apiUrl + inputContent.value + '&size=' + widthInPixels.value + 'x' + widthInPixels.value + '&margin=' + marginInPixels.value + '&color=' + fgColor_nohash + '&bgcolor=' + bgColor_nohash + '&format=' + format_filetype;
        
        imageArea.style.display = 'block';
        imgCanvas.src = link;

        dlLinkBt.href = link;
        dlLinkBt.target = '_blank';
    }

});
