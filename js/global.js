  function hex2a(hexx) {
      var hex = hexx.toString();//force conversion
      var str = '';
      for (var i = 0; i < hex.length; i += 2)
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
  }

  function a2hex(str) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i ++) {
      var hex = Number(str.charCodeAt(i)).toString(16);
      arr.push(hex);
    }
    return arr.join('');
  }


  function getOrdinal(n) {
      var s=["th","st","nd","rd"],
      v=n%100;
      return n+(s[(v-20)%10]||s[v]||s[0]);
   }


    function sortByValue(a,b){
        a.value = parseInt(a.value);
        b.value = parseInt(b.value);
  	    return a.value < b.value ? 1 : -1;
  	};




  (function loadETH() {
    //$("#overlay").show();
    var network = "api"; //'api' for production, 'kovan' for Kovan Test Network
    address = "0xd208c95066909b5030B99B8eE693B0e41A535aCf";
    var etherscanAPI = "https://" + network + ".etherscan.io/api?";
    $.getJSON( etherscanAPI, {
      module: "account",
      action: "txlist",
      address: address,
      startblock: "0",
      endblock: "99999999",
      page: "1",
      offset: "100",
      sort: "desc",
      apikey: "4GPEDS81RIRUWRBYBAAIWXKYTMAZFRHB84",
    })
      .done(function( data ) {
          // var filteredData = $(data.result);
          var orderedData = $(data.result).sort(sortByValue);
          var j = 0;
        $.each( orderedData, function( i, result ) {
          var addressCheck1 = result.to.toUpperCase( );
          var addressCheck2 = address.toUpperCase( );

          if ( addressCheck1 == addressCheck2  ) {
            var hash = result.hash;
            var value = result.value * 0.000000000000000001;
            var rounded = value.toFixed(3);
            var rank = getOrdinal(j+1);
            var str = hex2a(result.input);
            var clean = str.replace('address','');
            var clean2 = clean.replace('alert','');
            var array = clean2.split("|");
            var name = (array[0]);
            var site = (array[1]);
            if (!site.startsWith("http")) { site = "http://" + site ; }
            var html = '<td>'  + rank + '</td> <td><a href="https://etherscan.io/tx/' + hash + '" style="text-decoration: none;" target="_blank">' + rounded + ' ETH</a></td> <td><a href="' + site + '"  target="_blank">' + name + '</a></td>';
           $( '<tr class="rank' + ( j + 1 ) + '">"').append( html ).appendTo( "#table" );
           j++;
           var num = Number(rounded);
           var newBid = num+0.001;
           if ( rank == '1st'  ) {$("#amount").attr("value", newBid);}

       }

       //$("#overlay").hide();
        });
      });
  })();
