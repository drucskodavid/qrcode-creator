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

function checkIfForcedSvg(checkboxState){
    if (checkboxState.checked){
        return 1000000;
    } else{
        return 1000;
    }
}

// Validate form
btGenerate.addEventListener('click', function(){
    // Validate field 1
    if(inputContent.value == ''){
        eiContent.innerHTML = "This field can't be empty!";
        eiContent.style.display = 'block';
        field1IsCorrect = false;
    } else if (inputContent.value.includes('&')){
        eiContent.innerHTML = "This field can't contain this symbol: &";
        eiContent.style.display = 'block';
        field1IsCorrect = false;
    } else{
        field1IsCorrect = true;
        eiContent.style.display = 'none';
    }

    // Validate field 2
    if(widthInPixels.value == ''){
        widthInPixels.value = 256;
    }

    if (checkIfInt(widthInPixels.value) && Number(widthInPixels.value) >= 10 && Number(widthInPixels.value) <= checkIfForcedSvg(cbSvgMode)){
        field2IsCorrect = true;
        eiWidth.style.display = 'none';
    } else{
        eiWidth.innerHTML = 'Invalid value! Min: 10, Max: ' + checkIfForcedSvg(cbSvgMode);
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
    } else{
        field3IsCorrect = false;
        eiMargin.innerHTML = 'Invalid value! Min: 0, Max: 50';
        eiMargin.style.display = 'block';
    }

    if(field1IsCorrect && field2IsCorrect && field3IsCorrect){
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
