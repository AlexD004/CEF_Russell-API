const formCreateBooking = document.querySelector('#formCreateBooking');

/* CREATE BOOKING */
if(formCreateBooking){
    formCreateBooking.addEventListener( 'submit', e => {
        const id = document.querySelector('input[name="catwayNumber"]').value;
        e.preventDefault();
        const dataForm = { };

        new FormData( formCreateBooking ).forEach( ( value, key ) => dataForm[ key ] = value );
        fetch('/catways/'+id+'/reservations', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            })
            .then( res => res.json())
            .then( data => {
                if (data.status == 201) {
                  window.location.replace('/catways/'+id+'/reservations/'+data.newBookId);
                }
            })
    })
}

/* DELETE BOOKING */
function deleteBooking(id, idReservation) {
    console.log(id);
    console.log(idReservation);
    /*fetch('/catways/' + id + '/reservations/' + idReservation, { method: 'DELETE' })
        .then ( (response) => {
            if (response.status == 200) {
                window.location.replace('/catways/'+id+'/reservations');
            }
        })*/
}