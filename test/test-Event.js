QUnit.test("test trigger(), on() and off()", function(assert) {
    expect(2);

    var flag = 0,
    	eventHandler = function() {
    		flag = 10;
    	}

	$('.link').on('click', eventHandler).trigger('click');
    assert.ok(flag === 10, "Passed!");

    flag = 0;
    $('.link').off('click', eventHandler).trigger('click');
    assert.ok(flag === 0, "Passed!");
});