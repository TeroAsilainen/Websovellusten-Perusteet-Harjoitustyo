let dropbox;

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", fileHandle, false);

let files;
let fileList;

function fileHandle() {
    fileList = this.files;
    handleFiles(fileList)
}

function handleFiles(files) {
    // Jos tiedostoja on valittuna, lisätään otsikko ja otetaan painikkeet käyttöön
    if (files.length >= 1){
        document.getElementById('valitutotsikko').innerHTML="Valitut tiedostot:"
        document.getElementById('Empty').removeAttribute('disabled')
        document.getElementById('Merge').removeAttribute('disabled')
    } else {
        document.getElementById('valitutotsikko').innerHTML= ""
        document.getElementById('Empty').disabled = true
        document.getElementById('Merge').disabled = true
        document.getElementById('valitutlista').innerHTML= ""
    }

    // Lisätään tiedostonimet listaan
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(file.name))
        document.querySelector('#valitutlista').appendChild(li)
    }
    
}

// Dropbox on tiedostojen pudotusalue
dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
dropbox.addEventListener("dragleave", dragleave, false);

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}

// dragover ja dragleave vaihtaa taustan väriä kun tiedostoja on dropboxin päällä
function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
    document.getElementById('dropbox').style.backgroundColor = ("var(--light-background-color)");
}

function dragleave(e) {
    e.stopPropagation();
    e.preventDefault();
    document.getElementById('dropbox').style.backgroundColor = ""
}
  
function drop(e) {
    e.stopPropagation();
    e.preventDefault();
  
    document.getElementById('dropbox').style.backgroundColor = ""
    const dt = e.dataTransfer;
    const files = dt.files;
  
    handleFiles(files);
}


// Tyhjentää kaikki listat ja myös pdf-ikkunan
document.getElementById('Empty').addEventListener('click', () => {
    fileList = []
    files = []
    inputElement.value = ''
    handleFiles(files)
    document.getElementById('pdf').src = ""
})

document.getElementById('Merge').addEventListener('click', () => {
    mergeAllPDFs();
})

async function mergeAllPDFs() {
    try {
        
    
    // luodaan tyhjä pdf johon tiedot lisätään
    const pdfDoc = await PDFLib.PDFDocument.create();
    
    // iteroidaan valittujen tiedostojen lista
    var ul = document.getElementById("valitutlista");
    var items = ul.getElementsByTagName("li");    
    for(var i = 0; i < items.length; i++) {

        // tiedostot haetaan pdfshere-kansiosta nimen perusteella
        console.log("../pdfshere/" + items[i].innerHTML)
        const donorPdfBytes = await fetch("../pdfshere/" + items[i].innerHTML).then(res => res.arrayBuffer());

        const donorPdfDoc = await PDFLib.PDFDocument.load(donorPdfBytes);

        // haetaan kaikki sivut
        const docLength = donorPdfDoc.getPageCount();
        for(var k = 0; k < docLength; k++) {
            const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
            pdfDoc.addPage(donorPage);
        }
    }
    
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    
    // asetetaan pdf näkyville
    document.getElementById('pdf').src = pdfDataUri;

    } catch (error) {
        fileList = []
        files = []
        inputElement.value = ''
        handleFiles(files)
        document.getElementById('pdf').src = ""
        alert("Jotain meni vikaan. Yritä uudelleen.")
}  
}