/// <reference path="bower_components/controls.ts/controls.ts"/>
var gApp;
(function (gApp) {
    var note = Controls.makeNoneFocusable("idNote", "<p>Please use arrow keys</p>");
    var focus = Controls.makeNoneFocusable("idInfo");
    var data = [];
    for (var i = 0; i < 20; i++) {
        data.push({
            type: 'typeSamll',
            text: 'Loem ipsum ' + i,
            longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie, quam eget consectetur aliquet, sem ex rhoncus mi, in consequat erat ligula fermentum lorem. Proin tristique quam nec urna ultricies, ac placerat ipsum rutrum. Nulla at lorem condimentum, pretium ligula et, molestie metus. Nulla placerat vestibulum magna ac ultrices. Fusce vitae tempor dui. Nam pulvinar commodo pellentesque. Mauris dignissim tempor pharetra. Praesent nec fermentum lacus. Phasellus vehicula velit sem, in malesuada mauris ornare non. Aenean lacinia dolor at ex molestie, quis mattis metus pulvinar. Praesent aliquet elit id condimentum fermentum. In elit turpis, aliquam non pharetra eu, sodales sed sem. Curabitur volutpat ac arcu quis venenatis. In vel gravida quam.'
        });
    }
    var Listener;
    (function (Listener) {
        function _slFocusedDataItemChanged(aKeyNew, aItemNew, aElNew, aKeyOld, aItemOld, aElOld) {
            var focusInfo = focus.getElement();
            focusInfo.innerHTML = 'Focused Item: ' + aItemNew.text;
        }
        Listener._slFocusedDataItemChanged = _slFocusedDataItemChanged;
        function _slItemSelected(aControl, aIndex, aEl) {
            var focusInfo = focus.getElement();
            focusInfo.innerHTML = 'Selected Item: ' + aEl.innerText;
        }
        Listener._slItemSelected = _slItemSelected;
    })(Listener || (Listener = {}));
    var listHorizontal;
    listHorizontal = new Controls.CListControl(null);
    listHorizontal.setId('horizontal');
    listHorizontal.setListData(data);
    listHorizontal.setItemWidth(100);
    listHorizontal.setAnimation(true);
    listHorizontal.setOrientation(2 /* EHorizontal */);
    listHorizontal.setScrollScheme(5 /* EByFixed */);
    listHorizontal.connectFocusedDataItemChanged(Listener, "_slFocusedDataItemChanged", Listener._slFocusedDataItemChanged);
    listHorizontal.connectItemSelected(Listener, "_slItemSelected", Listener._slItemSelected);
    listHorizontal.setRedrawAfterOperation(true);
    listHorizontal.setDataDrawer(function (aKey, aItem, aEl) {
        aEl.classList.add('horizontal');
        aEl.classList.add(aItem.type);
        aEl.style.opacity = '.5';
        aEl.innerText = aKey + ": " + aItem.text;
        return 2 /* KFocusAble */;
    });
    var listVertical;
    listVertical = new Controls.CListControl(null);
    listVertical.setId('vertical');
    listVertical.setListData(data);
    listVertical.setItemHeight(70);
    listVertical.setAnimation(true);
    listVertical.setScrollScheme(5 /* EByFixed */);
    listVertical.connectFocusedDataItemChanged(Listener, "_slFocusedDataItemChanged", Listener._slFocusedDataItemChanged);
    listVertical.connectItemSelected(Listener, "_slItemSelected", Listener._slItemSelected);
    listVertical.setRedrawAfterOperation(true);
    listVertical.setDataDrawer(function (aKey, aItem, aEl) {
        aEl.classList.add(aItem.type);
        aEl.style.opacity = '.5';
        aEl.innerText = aKey + ": " + aItem.text;
        return 2 /* KFocusAble */;
    });
    var root = new Controls.CLayoutGroupControl(document.body);
    root.setOrientation(1 /* EVertical */);
    root.setOwnedChildControls([note, focus, listHorizontal, listVertical]);
    root.draw();
    root.setActiveFocus();
    document.body.addEventListener('keydown', function (e) {
        var keyStr = e['keyIdentifier'];
        var handled = root.doKey(keyStr);
        var skip = {
            'Up': true,
            'Down': true,
            'Left': true,
            'Right': true
        };
        if (skip[keyStr]) {
            e.stopPropagation();
            e.preventDefault();
        }
    });
})(gApp || (gApp = {}));
//# sourceMappingURL=app.js.map