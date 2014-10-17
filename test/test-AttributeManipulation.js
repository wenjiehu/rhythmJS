QUnit.test("test attr()", function(assert) {
    expect(2);

    assert.ok($('.link').attr('href') === null, "Passed!");

    $('.link').attr('href', 'www.google.com');
    assert.ok($('.link').attr('href') === 'www.google.com', "Passed!");
});

// QUnit.test("test css()", function(assert) {
//     expect(2);

//     assert.ok($('.link').attr('css') === null, "Passed!");

//     $('.link').css({'height' : '30px', 'width' : '20px'});
//     assert.ok($('.link').attr('style').replace(/\s+/g, '') === 'height:30px;width:20px;', "Passed!");
// });