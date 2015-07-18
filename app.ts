/// <reference path="bower_components/controls.ts/controls.ts"/>

module gApp {

    var note = Controls.makeNoneFocusable("idNote", "<p>Please use arrow keys</p>");
    var focus = Controls.makeNoneFocusable("idInfo");

    var data = [];
    for (var i=0; i<20; i++) {
        data.push({
            type: 'typeSamll',
            text: 'Loem ipsum ' + i,
            longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie, quam eget consectetur aliquet, sem ex rhoncus mi, in consequat erat ligula fermentum lorem. Proin tristique quam nec urna ultricies, ac placerat ipsum rutrum. Nulla at lorem condimentum, pretium ligula et, molestie metus. Nulla placerat vestibulum magna ac ultrices. Fusce vitae tempor dui. Nam pulvinar commodo pellentesque. Mauris dignissim tempor pharetra. Praesent nec fermentum lacus. Phasellus vehicula velit sem, in malesuada mauris ornare non. Aenean lacinia dolor at ex molestie, quis mattis metus pulvinar. Praesent aliquet elit id condimentum fermentum. In elit turpis, aliquam non pharetra eu, sodales sed sem. Curabitur volutpat ac arcu quis venenatis. In vel gravida quam.'
        });
    }

    module Listener {

        export function _slFocusedDataItemChanged(
            aKeyNew: any, aItemNew: any, aElNew: HTMLElement,
            aKeyOld: any, aItemOld: any, aElOld: HTMLElement) {
            var focusInfo = focus.getElement();
            focusInfo.innerHTML = 'Focused Item: ' + aItemNew.text;
        }

        export function _slItemSelected(aControl: Controls.CControl, aIndex: number, aEl: HTMLElement) {
            var focusInfo = focus.getElement();
            focusInfo.innerHTML = 'Selected Item: ' + aEl.innerText;
        }
    }

    var listHorizontal: Controls.CListControl;
    listHorizontal = new Controls.CListControl(null);
    listHorizontal.setId('horizontal');
    listHorizontal.setListData(data);
    listHorizontal.setItemWidth(100);
    listHorizontal.setAnimation(true);
    listHorizontal.setOrientation(Controls.TParamOrientation.EHorizontal);
    listHorizontal.setScrollScheme(Controls.TParamScrollScheme.EByFixed);
    listHorizontal.connectFocusedDataItemChanged(Listener, "_slFocusedDataItemChanged", Listener._slFocusedDataItemChanged);
    listHorizontal.connectItemSelected(Listener, "_slItemSelected", Listener._slItemSelected);
    listHorizontal.setRedrawAfterOperation(true);
    listHorizontal.setDataDrawer(function (aKey:any, aItem:any, aEl:HTMLElement) {
        aEl.classList.add('horizontal');
        aEl.classList.add(aItem.type);
        aEl.style.opacity = '.5';
        aEl.innerText = aKey + ": " + aItem.text;
        return Controls.TFocusInfo.KFocusAble;
    });

    var listVertical: Controls.CListControl;
    listVertical = new Controls.CListControl(null);
    listVertical.setId('vertical');
    listVertical.setListData(data);
    listVertical.setItemHeight(70);
    listVertical.setAnimation(true);
    listVertical.setScrollScheme(Controls.TParamScrollScheme.EByFixed);
    listVertical.connectFocusedDataItemChanged(Listener, "_slFocusedDataItemChanged", Listener._slFocusedDataItemChanged);
    listVertical.connectItemSelected(Listener, "_slItemSelected", Listener._slItemSelected);
    listVertical.setRedrawAfterOperation(true);
    listVertical.setDataDrawer(function (aKey:any, aItem:any, aEl:HTMLElement) {
        aEl.classList.add(aItem.type);
        aEl.style.opacity = '.5';
        aEl.innerText = aKey + ": " + aItem.text;
        return Controls.TFocusInfo.KFocusAble;
    });

    var root = new Controls.CLayoutGroupControl(document.body);
    root.setOrientation(Controls.TParamOrientation.EVertical);
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

}
