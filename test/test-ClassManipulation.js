QUnit.test("test class manipulation", function(assert) {
    expect(5);

    assert.ok($('#link1').hasClass('link'), "Passed!");

    $('.link').addClass('active');
    assert.ok($('#link1').hasClass('active'), "Passed!");
    assert.ok($('#link2').hasClass('active'), "Passed!");

    $('#link1').removeClass('active');
    assert.ok(!$('#link1').hasClass('active'), "Passed!");
    assert.ok($('#link2').hasClass('active'), "Passed!");
});