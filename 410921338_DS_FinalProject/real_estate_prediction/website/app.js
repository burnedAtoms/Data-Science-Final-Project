function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getRoomValue() {
    var uiRoom = document.getElementsByName("uiRoom");
    for(var i in uiRoom) {
      if(uiRoom[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var rooms = getRoomValue();
    var bathrooms = getBathValue();
    var district = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    var url = "http://127.0.0.1:5000/real_estate_prediction"; 
  
    $.post(url, {
        ['building shifting total area']: parseFloat(sqft.value),
        num_room: rooms,
        num_bathroom: bathrooms,
        district: district.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " NTD</h2>";
        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
     var url = "http://127.0.0.1:5000/get_location_names"; 

    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var district = data.districts;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in district) {
                var opt = new Option(district[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;