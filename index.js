var p1 = document.getElementById('p1name');
var p2 = document.getElementById('p2name');

var button = document.getElementById('btn');

button.addEventListener('click', function(){
    if(p1.value!='' && p2.value!=''){
        localStorage.setItem("p1name", p1.value);
        localStorage.setItem("p2name", p2.value);
        location.href = 'start.html';
    }
    else{
        if(p1.value == ''){
            alert("Enter Player 1's Name");
        }
        else{
            alert("Enter Player 2's Name");
        }
    }
    
});