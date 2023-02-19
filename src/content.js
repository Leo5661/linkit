console.log("content");
chrome.runtime.onMessage.addListener((obj, sender, res) => {
    console.log(obj, sender)
    console.log("content is run")
    runCode();

    if(obj.isLoad){
        res("we got message");
    }
 })


function runCode(){
const sec = document.getElementsByClassName("entity-result__actions");
console.log(sec.length);
for (let i = 0; i < sec.length; i++){
    const btn = sec[i].getElementsByTagName("button");
    console.log(btn.length)
    if(btn.length === 0){
        continue;
    } else {
        btn[0].style.background = "Red";
    }
    
}
}    
