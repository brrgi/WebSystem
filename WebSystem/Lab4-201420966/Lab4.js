window.onload=function(){
    var number=0;
    var btnNode=document.getElementById("btn-count");
    var txtVal=document.getElementById('text');
    var sectionNode=document.getElementById("section");

    btnNode.addEventListener("click", function(){
        if (txtVal.value!==''){
            ++number;
            var newDiv=document.createElement("article");
            newDiv.className='articleOne';
            newDiv.innerHTML=txtVal.value;
            document.querySelector("#section").appendChild(newDiv);
            txtVal.value='';
            document.getElementById("state").innerHTML=number;
        }
    });
}