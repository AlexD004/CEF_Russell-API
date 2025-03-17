const formCreateCatway = document.querySelector('#formCreateCatway');
const formUpdateCatway = document.querySelector('#formUpdateCatway');

/* CREATE CATWAY */
if(formCreateCatway){
    formCreateCatway.addEventListener( 'submit', e => {
        e.preventDefault();
        const dataForm = { };

        new FormData( formCreateCatway ).forEach( ( value, key ) => dataForm[ key ] = value );
        fetch('/catways/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            })
            .then( (response) => {
                if (response.status == 201) {
                    window.location.replace('/catways/'+dataForm.catwayNumber);
                }
            })
    })
}

/* UPDATE CATWAY */
if(formUpdateCatway){
    formUpdateCatway.addEventListener( 'submit', e => {
        e.preventDefault();

        const id = document.querySelector('input[name="catwayNumber"]').value;
        const dataForm = { };

        new FormData( formUpdateCatway ).forEach( ( value, key ) => dataForm[ key ] = value );
        fetch('/catways/'+id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            })
            .then( (response) => {
                if (response.status == 201) {
                    window.location.replace('/catways/'+dataForm.catwayNumber);
                }
            })
    })
}

/* DELETE CATWAY */
function deleteCatway(id) {
    fetch('/catways/' + id, { method: 'DELETE' })
        .then ( (response) => {
            if (response.status == 200) {
                window.location.replace('/catways');
            }
        })
}