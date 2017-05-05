function replaceNullValues(value) {
  for (var x in value ) {
    if(value[x] === null) {
      value[x] = 0;
    }
  }
  return value;
}

function formatPrice(num) {
  if(num % 1 === 0) {
    return num;
  } else {
    return num.toFixed(2)
  }
}

function getType(value) {
  
  var type;
  if(value._type === 'offers_adtraction' && value.adtraction_type === 'ITEM') {
    type = 'adtraction_item'
  }
  if(value._type === 'offers_adtraction' && value.adtraction_type === 'PROGRAM') {
    type = 'adtraction_program'
  }
  if(value._type === 'offers_qr') {
    type = 'qr';
  }
  if(value._type === 'offers_form') {
    type = 'form';
  }
  
  return type;
}

function formatPriceAndCashback(value, cashback) {
  var main = document.getElementById('main')
  var deal = document.getElementById('deal')
   
  
  if(value.price === 0) {
    if(main !== null) {
      return '<p class="price-tag">Gratis</p>'+ (cashback === false ? '<p class="cashback" style="visibility:hidden;"><span>Din Cashback:</span></p>':'<p class="cashback"><span>Din Cashback: </span>' + cashback + '</p>') 
      }
    if(deal !== null) {
      return '<h2>Pris</h2><p class="price-tag">Gratis</p>'+ (cashback === false ? '<h2 style="display: none;">Din Cashback</h2><p class="cashback" style="display: none;"></p>':'<h2>Din Cashback</h2><p class="cashback">'+ cashback + '</p>')
      }
    } else if(value.price < 0) {
        if(main !== null) {
          return '<p class="price-tag" style="visibility:hidden">Gratis</p><p class="cashback" style="color: red"><span>Rabatt:' + cashback + 'kr</p>'
        }
        if(deal !== null) {
          return '<h2 style="color: red">Rabatt</h2><p style="color: red" class="cashback">'+ cashback + 'kr</p>'
        }
    } else {
        if(main !== null) {
          return '<p class="price-tag">' + value.price + 'kr</p>' +  (cashback === false ? '<p class="cashback" style="visibility:hidden;"><span>Din Cashback:</span> ' + cashback + '</p>' :'<p class="cashback"><span>Din Cashback:</span> ' + cashback + '</p>')
        }
        if(deal !== null) {
          return '<h2>Pris</h2><p class="price-tag">'+value.price+'kr</p>'+(cashback === false ? '<h2 style="display: none;">Din Cashback</h2><p class="cashback" style="display:none;">'+ cashback + '</p>':'<h2>Din Cashback</h2><p class="cashback">'+ cashback + '</p>')
        }
    }
} 

function calcGrant(value, type) {
  var grant;

  if(value.group_cashback_percentage === 0 && value.group_cashback_decimal === 0){
    grant = 0 + 'kr';
    return grant;
  }
  if(type === "adtraction_program" &&  value.group_cashback_percentage > 0) {
    grant = value.group_cashback_percentage + '%'; 
    return grant;
  }
  if(value.group_cashback_percentage > 0) {
    grant = formatPrice(value.price / 100 * value.group_cashback_percentage) + 'kr'
    return grant;
  }
  if(value.displayed_discount_type === "DECIMAL" && value.group_cashback_decimal > 0) {
    grant = formatPrice(value.group_cashback_decimal) + 'kr';
    return grant;
  }
}
    
function calcCashback(value, type) {
  var cashback;
  
  if(value.user_cashback_percentage === 0 && value.user_cashback_decimal === 0){
    cashback = false;
    return cashback;
  }
  if(type === "adtraction_program" && value.user_cashback_percentage > 0){
    cashback = value.user_cashback_percentage + '%';
    return cashback;
  }
  if(value.user_cashback_percentage > 0) { 
    cashback = formatPrice((value.price * 0.8) / 100 * value.user_cashback_percentage) + 'kr';
    return cashback;
  }
  if(value.displayed_discount_type === "DECIMAL" && value.user_cashback_decimal > 0) {
    cashback = formatPrice(value.user_cashback_decimal * 0.8) + 'kr';
    return cashback;
  }
  if(value.price < 0) {
    cashback = formatPrice((value.price)*(-1));
    return cashback;
  }
}

$(document).on("click", "#btn-toggle-popup", function(){
  
  var dealId = $("#btn-toggle-popup").data("offerid")
  var button = $(this);
  var userId = 793;
  var groupId = button.closest('.popover-content').find('select').val();
  var groupName = button.closest('.popover-content').find('select option:selected').text();
              
  var data = {user_cashback_group_id: parseInt(groupId), user_cashback_group_name: groupName};
  
  $.ajax({
      type: 'POST',
      url: "https://www.nikimember.se/api/v0.1/offers/" + dealId + "/activate",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(d){
          window.location = d.data.tracking_url;
      },
      error: function(){
          alert("something went wrong")
      },
      beforeSend: function(jqXHR){
          var token = "ZTg4ZWIyMmUtNzA4Yi00OGE2LTk2ODYtMjJlMmNlZTkxNDM5";
          token = btoa(token+':unused');
          jqXHR.setRequestHeader('Authorization', 'Basic '+ token);
          jqXHR.setRequestHeader('Nikimember-App-Version', "1.1.13");
      }
  })
});

$('#btn-activate').popover('show') 
function dealContainer(name, id) {
  return'<div class="row">'+
          '<div class="col-xs-12">'+
            '<h1 id="latest-deals-header" class="text-xs-center">' + name + '</h1>'+
            '<hr class="text-xs-center">'+
          '</div>'+
        '</div>'+
        '<div class="row">'+
          '<div id="' + id + '" class="col-xs-12">'+
          '</div>'+
        '</div>'+
        '</div>'
}

function deals(value, i, categoryArr) {
  value = replaceNullValues(value)
  
  var type = getType(value) 
  var grant = calcGrant(value,type) 
  var cashback = calcCashback(value,type)
  
  return '<div class="card-container col-md-6 col-lg-3 ">'+
            '<article id="'+value.id+'" class="card deal-card wow fadeIn" data-wow-delay="' + i + 's">'+
              '<figure class="deal-image-container">'+
              '<a href="deal.html#'+value.id+'">'+ 
              '<img class="card-img-top img-fluid" alt="product image" src="https://www.nikimember.se/images/' + value.image_ids[0] + '"' + '/>' + 
              '<div class="img-overlay"></div></a>' +
              '</figure>' +
              '<section class="clearfix deal-info">' +
                '<h2>'+value.title+'</h2>' +
                '<div style="float: left; width: 50%;">'+
                '<p style="margin-bottom:0;">'+categoryArr[parseInt(value.category_id)-1]+'</p>'+
                (value.publisher_name !== 0 ? '<p style="margin-bottom:0;">' + value.publisher_name + '</p>': '<p style="display: none;"></p>')+
                (value.brand !== 0 ? '<p style="margin-bottom:0;">' + value.brand + '</p>': '<p style="display: none;"></p>')+
                (value.purchases !== 0 ? '<p style="margin-bottom:0;">Antal köpta: ' + value.purchases + '</p>': '<p style="display: none;"></p>')+
                '</div>'+
                '<div style="float: left; width: 50%;">'+
                (value.original_price > value.price ? '<p class="original-price" style="text-decoration:line-through;">' + value.original_price + 'kr</p>' : '<p class="original-price" style="visibility: hidden"><strike>' + value.original_price + 'kr</strike></p>' )+
                (formatPriceAndCashback(value, cashback))+
                '<p class="contribution"><span>Föreningsbidrag:</span> ' + grant + '</p>'+
                '</div>'+
              '</section>' +
            '</article>' +
          '</div>'
}

function dealDetails(data, categoryArr) {
  data = replaceNullValues(data)
  var type = getType(data) 
  var grant = calcGrant(data,type) 
  var cashback = calcCashback(data,type)
  
  return '<div id="deal-overview" class="row">'+
              '<div id="btn-back"><a href="index.html"><i class="fa fa-2x fa fa-angle-left"></i><span style="padding-left: 3px;">Visa alla erbjudanden</span></a></div>'+ 
            '<figure class="col-sm-6 wow fadeInLeft fadeIn" data-wow-duration="1s" data-wow-delay=".2s">'+
              '<img class="img-fluid" src="https://www.nikimember.se/images/' + data.image_ids[0] +  '"' + ' alt="deal image"/>'+
            '</figure>'+
            '<section class="col-sm-6 wow fadeInRight" data-wow-duration="1s" data-wow-delay=".2s">'+
              '<h1>' + data.title + '</h1>'+
              '<h2 style="margin-bottom: 10px; font-size: 18px;">'+categoryArr[parseInt(data.category_id)-1]+'</h2>'+
              (data.brand !== 0 ? '<h2>' + data.brand + '</h2>': '<h2 style="display: none;"></h2>')+
              (data.original_price > data.price ? '<h2>Originalpris</h2><p class="original-price" style="text-decoration:line-through;">' + data.original_price + 'kr</p>' : '<h2 style="display: none;"></h2>')+ 
              (formatPriceAndCashback(data, cashback)) +
               '<h2>Föreningsbidrag</h2><p class="contribution">' + grant + '</p>' +
               (data.purchases !== 0 ? '<h2>Antal köpta</h2>' + '<p>'+data.purchases + 'st</p>': '<p style="display: none;"></p>')+
               (data._type !== "offers_adtraction" ? '<button id="btn-activate" class="btn btn-outline-primary style="visibility:hidden;">Till Erbjudandet</button>':'<button type="button" id="btn-activate" class="btn btn-outline-primary" data-userid="793">Till Erbjudandet</button>') +
               
            '</section>'+
          '</div>'+
          '<div class="row">'+
            '<article class="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">'+
            '<h1>' + data.title + '</h1>'+
              '<p>'+ 
                data.text +
              '</p>'+
            '</article>'+
          '</div>'
}

function carouselItem(className, img, data) {
  return '<div class="' + className + '">'+
            '<div class="image-wrapper col-md-12 ">'+
            '<a href="deal.html#'+data.id+'">'+ 
            '<img class="card-img-top img-fluid" alt="product image" src="' + img  + '"/></a>' + 
            '</div>'+
          '</div>'
}

function groupList(groups) {
  return '<option value="'+ groups.id + '">' + groups.name + '</option>'
}

