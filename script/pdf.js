let dropbox;

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", fileHandle, false);

let files;
let fileList;

function fileHandle() {
    fileList = this.files; /* now you can work with the file list */
    handleFiles(fileList)
}

function handleFiles(files) {
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
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(file.name))
        document.querySelector('#valitutlista').appendChild(li)
    }
    
}

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
dropbox.addEventListener("dragleave", dragleave, false);

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}
  
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

document.getElementById('Empty').addEventListener('click', () => {
    fileList = []
    files = []
    inputElement.value = ''
    handleFiles(files)
    document.getElementById('pdf').src = ""
})

document.getElementById('Merge').addEventListener('click', () => {
    mergeAllPDFs()
})

async function mergeAllPDFs() {
    // create an empty PDFLib object of PDFDocument to do the merging into
    const pdfDoc = await PDFLib.PDFDocument.create();
    
    // iterate over all documents to merge
    var ul = document.getElementById("valitutlista");
    var items = ul.getElementsByTagName("li");    
    for(var i = 0; i < items.length; i++) {

        // download the document
        console.log("../pdfshere/" + items[i].innerHTML)
        const donorPdfBytes = await fetch("../pdfshere/" + items[i].innerHTML).then(res => res.arrayBuffer());

        // load/convert the document into a PDFDocument object
        const donorPdfDoc = await PDFLib.PDFDocument.load(donorPdfBytes);

        // iterate over the document's pages
        const docLength = donorPdfDoc.getPageCount();
        for(var k = 0; k < docLength; k++) {
            // extract the page to copy
            const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);

            // add the page to the overall merged document
            pdfDoc.addPage(donorPage);
        }
    }
    
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById('pdf').src = pdfDataUri;

}