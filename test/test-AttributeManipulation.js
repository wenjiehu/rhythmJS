QUnit.test("test attr()", function(assert) {
    expect(2);

    assert.ok($('.link').attr('href') === null, "Passed!");

    $('.link').attr('href', 'www.google.com');
    assert.ok($('.link').attr('href') === 'www.google.com', "Passed!");
});