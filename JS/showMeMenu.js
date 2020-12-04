function showMeMenu()
{
    var all = document.getElementsByClassName("sub");
    var allLength = all.length;
    
    for (i=0 ; i < allLength ; i++)
    {
        all[i].style.display='block';
        
    }
    console.log("nombre d'element: " + " " + allLength);
}