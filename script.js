let inputArea=document.querySelector('.input-area')
let actionBtn=document.querySelector('.action-btn')
let btn=actionBtn.children[0]

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