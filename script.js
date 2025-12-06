if(localStorage.getItem('History')==null){
    localStorage.setItem('History',JSON.stringify([]))
}
let inputArea=document.querySelector('.input-area')
let actionBtn=document.querySelector('.action-btn')
let btn=actionBtn.children[0]
let addBtn=document.querySelector('.add-btn')
let historyList = document.querySelector('.history-list')
let arrFromLS=JSON.parse(localStorage.getItem('History'))
let historyArr=arrFromLS

function init(){
    for(let i=0;i<arrFromLS.length;i++){
        let text=arrFromLS[i]
        let li = document.createElement("li")
        li.textContent = text
        historyList.appendChild(li)
    }
}
init()

const inactive='inactive'
const active='active'
const textFromSpeech=new (window.SpeechRecognition || window.webkitSpeechRecognition)()
textFromSpeech.lang='en-us'
textFromSpeech.interimResults=false;
textFromSpeech.maxAlternatives=1;
btn.addEventListener('click',function(){
    if(btn.classList.contains(inactive)){
        btn.classList.remove(inactive)
        btn.classList.add(active)
        alert("Speech to Text is Active")
        btn.innerText="Speech to Text is Active"
        inputArea.innerText=""
        
        textFromSpeech.start()

        textFromSpeech.onresult=(event)=>{
            const text=event.results[0][0].transcript
            inputArea.innerText=text
        };
        textFromSpeech.onerror=(event)=>{
            inputArea.innerText="Speech Recognition Error "+event.error
        }
    }
    else{
        btn.classList.remove(active)
        btn.classList.add(inactive)
        btn.innerText="Speech to Text is Inactive"
        alert("Speech to Text is Inactive")
    }
})

//managing history section
addBtn.addEventListener('click', function () {
    let text=inputArea.innerText

    if (text==="") {
        alert("No text available to add to history!")
        return
    }

    let li = document.createElement("li")
    li.textContent = text
    historyArr.push(text)
    localStorage.setItem('History',JSON.stringify(historyArr))
    historyList.appendChild(li)

})
