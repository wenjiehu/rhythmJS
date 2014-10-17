QUnit.test("test type detect functions", function(assert) {
    expect(3);

    assert.ok($.isArray([]), "Passed!");
    assert.ok(!$.isArray({}), "Passed!");
    assert.ok($.isString(''), "Passed!");
});

QUnit.test("test extend()", function(assert) {
    expect(1);

    var target = {
    	name: 'Tom',
    	age: 23,
    },
    object1 = {
    	gender: 'M'
    };
    $.extend(target, object1);
    assert.ok(target.gender === 'M', "Passed!");
});