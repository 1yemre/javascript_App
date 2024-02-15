
const container=document.querySelector(".container");
const count=document.getElementById("count");
const  amount=document.getElementById("amount");
const select=document.getElementById('movie');
const seats=document.querySelectorAll('.seat:not(.reserved)');


getFromLocalStorage();
calculateTotal();
container.addEventListener('click',function(e)
{
        if(e.target.classList.contains('seat') && (!e.target.classList.contains('reserved')))
        {
             e.target.classList.toggle('selected');
             calculateTotal();
           
        }
});


select.addEventListener('change',function(e){
    calculateTotal();   

});

//toggle: varsa siler yoksa ekler
function calculateTotal()
{
    const SelectedSeats=container.querySelectorAll('.seat.selected');
    const SelectedSeatsArr=[];
    const SeatsArr=[];

    SelectedSeats.forEach(function(seat){
          SelectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat){
          SeatsArr.push(seat);
    });

  
    let selectedSeatIndexs=SelectedSeatsArr.map(function(seat){
         return SeatsArr.indexOf(seat);
    });

    

    let  selectedSeatCount=SelectedSeats.length;
    count.innerText=selectedSeatCount;
     amount.innerText=selectedSeatCount*select.value;
     saveToLocalStorge(selectedSeatIndexs);
}

function saveToLocalStorge (indexs)
{
     localStorage.setItem('selectedSeats',JSON.stringify(indexs));
     localStorage.setItem('selectedMovieIndex',select.selectedIndex)
}


function getFromLocalStorage(){
     const SelectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
      if(SelectedSeats!=null && SelectedSeats.length>0)
      {
           seats.forEach(function(seat,index){
                if(SelectedSeats.indexOf(index)>-1)
                {
                     seat.classList.add('selected');
                }
           });
      }
     const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');

     if(selectedMovieIndex!=null)
     {
         select.selectedIndex=selectedMovieIndex;
     }
     else{
         
     }
}