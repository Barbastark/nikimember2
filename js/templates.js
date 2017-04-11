 function dealContainer(name, id) {
  return'<div class="row">'+
          '<div class="col-xs-12">'+
            '<h1 id="latest-deals-header" class="text-xs-center">' + name + '</h1>'+
            '<hr class="text-xs-center">'+
          '</div>'+
        '</div>'+
        '<div class="row">'+
          '<div id=' + '"' + id + '"' + 'class="col-xs-12">'+
          '</div>'+
        '</div>'+
        '</div>'
}
function deals(value) {
  var type, grant, cashback;
  for (var x in value ) {
    if(value[x] === null) {
      value[x] = 0;
    }
  }

function formatPrice(num) {
  if(num % 1 === 0) {
    return num;
  } else {
    return num.toFixed(2)
  }
}
  //Type
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

  //Grant
  if(value.group_cashback_percentage === 0 && value.group_cashback_decimal === 0){
    grant = 0 + 'kr';
  }
  
  if(type === "adtraction_program" && value.displayed_discount_type === "PERCENTAGE" &&  value.group_cashback_percentage > 0) {
    grant = value.group_cashback_percentage + '%';
  }

  if(value.group_cashback_percentage > 0) {
    grant = formatPrice(value.price / 100 * value.group_cashback_percentage) + 'kr'
  }

  if(value.displayed_discount_type === "DECIMAL" && value.group_cashback_decimal > 0) {
    grant = formatPrice(value.group_cashback_decimal) + 'kr';
  }

  //Cashback
  if(value.user_cashback_percentage === 0 && value.user_cashback_decimal === 0) {
    cashback = 0 + 'kr';
  }
  if(type === "adtraction_program" && value.displayed_discount_type === "PERCENTAGE" && value.user_cashback_percentage > 0){
    cashback = value.user_cashback_percentage + '%';
  }
  if(value.user_cashback_percentage > 0) { 
    cashback = formatPrice(value.price / 100 * value.user_cashback_percentage) + 'kr';
  }
  if(value.displayed_discount_type === "DECIMAL" && value.user_cashback_decimal > 0) {
    cashback = formatPrice(value.user_cashback_decimal) + 'kr';
  }
  if(value.price < 0) {
    cashback = formatPrice(value.price);
    //console.log('Price ' + value.price)
  }

  console.log(value)
  //console.log('bidrag: ' + grant + '  ' + 'cashback ' + cashback);

  return '<div class="card-container col-md-6 col-lg-3 ">'+
            '<article id="'+value.id+'" class="card deal-card wow fadeIn" data-wow-delay="0.1s">'+
              '<figure class="deal-image-container">'+
              '<a href="deal.html#'+value.id+'">'+ 
              '<img class="card-img-top img-fluid" alt="product image" src="https://www.nikimember.se/images/' + value.image_ids[0] + '"' + '/>' + 
              '<div class="img-overlay"></div></a>' +
              '</figure>' +
              '<section class="deal-info">' +
                '<h2>' + value.title +'</h2>' +
                (value.original_price > value.price ? '<p class="original-price"><strike>' + value.original_price + 'kr</strike></p>' : '<p class="original-price" style="visibility: hidden"><strike>' + value.original_price + 'kr</strike></p>' )+
                (value.price === 0 ? '<p class="price-tag">Gratis</p>' : '<p class="price-tag">' + value.price + 'kr</p>')  +
                '<p class="cashback">' + '<span>Din Cashback:</span> ' + cashback + '</p>' +
                '<p class="contribution"><span>Föreningsbidrag:</span> ' + grant + '</p>' +
              '</section>' +
            '</article>' +
          '</div>'
}
function carouselItem(className, img) {
  
  return '<div class="' + className + '">'+
            '<div class="image-wrapper col-md-12 ">'+
            '<img class="card-img-top img-fluid" alt="product image" src="' + img  + '"/>' + 
            '</div>'+
          '</div>'
}
function dealDetails(data) {
  return '<div id="deal-overview" class="row">'+
            '<figure class="col-sm-6 wow fadeInLeft fadeIn" data-wow-duration="1s" data-wow-delay=".2s">'+
              '<img class="img-fluid" src="https://www.nikimember.se/images/' + data.image_ids[0] +  '"' + ' alt="deal image"/>'+
            '</figure>'+
            '<section class="col-sm-6 wow fadeInRight" data-wow-duration="1s" data-wow-delay=".2s">'+
              '<h1>' + data.title + '</h1>'+
              '<p>pris ' + data.price  + '</p>'+
              '<p>tidigare pris ' + data.original_price + '</p>'+
            '</section>'+
          '</div>'+
          '<div class="row">'+
            '<article class="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">'+
              '<p>'+ 
                data.text +
              '</p>'+
            '</article>'+
          '</div>'
  
}

//ursprungspris, pris, din cashback, föreningsbidrag