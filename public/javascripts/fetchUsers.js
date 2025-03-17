const formCreateUser = document.querySelector('#formCreateUser');
const formUpdateUser = document.querySelector('#formUpdateUser');

/* CREATE USER */
if(formCreateUser){
    formCreateUser.addEventListener( 'submit', e => {
        e.preventDefault();
        const dataForm = { };

        new FormData( formCreateUser ).forEach( ( value, key ) => dataForm[ key ] = value );
        fetch('/users/', {
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
                    window.location.replace('/users/'+ data.userID);
                }
            })
    })
 }


/* UPDATE USER */
if(formUpdateUser){
    formUpdateUser.addEventListener( 'submit', e => {
        e.preventDefault();

        const id = document.querySelector('input[name="userID"]').value;
        const dataForm = { };

        new FormData( formUpdateUser ).forEach( ( value, key ) => dataForm[ key ] = value );
        fetch('/users/'+id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            })
            .then( (response) => {
                if (response.status == 201) {
                    window.location.replace('/users/'+dataForm.userID);
                }
            })
    })
}

/* DELETE CATWAY */
function deleteUser(id) {
    fetch('/users/' + id, { method: 'DELETE' })
        .then ( (response) => {
            if (response.status == 200) {
                window.location.replace('/users');
            }
        })
}