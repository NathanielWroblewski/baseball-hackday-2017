$(document).ready(function () {
  $('svg').hide();

  $('.tab').on('click', function (e) {
    $('h1').text(e.target.dataset.name);
    $('svg').hide();
    $('.caption').hide()
    $(`svg.${e.target.dataset.tab}`).show();
    $(`.caption.${e.target.dataset.tab}`).show();
  })

  $('.tab').first().click();
})
