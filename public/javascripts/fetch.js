function deleteCatway(id) {
    fetch('/catways/' + id,  {
        method: 'DELETE'
    }).then ( (response) => {
        if (response.status == 200) {
            window.location.replace("/catways");
        }
    })
}