const createCatway = document.querySelector('#createCatway');

/* CREATE CATWAY */
if(createCatway){
    createCatway.addEventListener( 'submit', e => {
        e.preventDefault();
        const dataForm = { };

        new FormData( createCatway ).forEach( ( value, key ) => dataForm[ key ] = value );
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

/* DELETE CATWAY */
function deleteCatway(id) {
    fetch('/catways/' + id, { method: 'DELETE' })
        .then ( (response) => {
            if (response.status == 200) {
                window.location.replace('/catways');
            }
        })
}