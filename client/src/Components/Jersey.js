function Jersey(jerseyData){
    var jersey=jerseyData.jerseyData;
    const jid = jersey.JerseyId;

    function saveCollection(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "jerseyId": jid
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:2222/collection/1", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    function saveWishlist(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "jerseyId": jid
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:2222/wishlist/1", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    return(
        <div className="col" key={jid+"as"}>
              <img
                className="jersey-img"
                src={jersey.JerseyImage}
              ></img>
              <h6>
                {jersey.name} {jersey.Edition} {jersey.Season}
              </h6>
              <div className="row buttons-div">
                <button className="col" onClick={saveCollection}><i className="fa-solid fa-trophy"></i></button>
                <button className="col" onClick={saveWishlist}><i className="fa-solid fa-heart"></i></button>
              </div>
            </div>
    );
}

export default Jersey;