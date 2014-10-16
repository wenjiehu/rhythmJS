QUnit.test("test type detect functions", function(assert) {
    expect(3);

    assert.ok($.isArray([]), "Passed!");
    assert.ok(!$.isArray({}), "Passed!");
    assert.ok($.isString(''), "Passed!");
});