/// <reference path="bower_components/controls.ts/controls.ts"/>

module gApp {

    var focus = Controls.makeNoneFocusable("-focus-info");

    var data = [];
    for (var i=0; i<20; i++) {
        data.push({
            type: 'typeSamll',
            text: 'Loem ipsum ' + i,
            longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie, quam eget consectetur aliquet, sem ex rhoncus mi, in consequat erat ligula fermentum lorem. Proin tristique quam nec urna ultricies, ac placerat ipsum rutrum. Nulla at lorem condimentum, pretium ligula et, molestie metus. Nulla placerat vestibulum magna ac ultrices. Fusce vitae tempor dui. Nam pulvinar commodo pellentesque. Mauris dignissim tempor pharetra. Praesent nec fermentum lacus. Phasellus vehicula velit sem, in malesuada mauris ornare non. Aenean lacinia dolor at ex molestie, quis mattis metus pulvinar. Praesent aliquet elit id condimentum fermentum. In elit turpis, aliquam non pharetra eu, sodales sed sem. Curabitur volutpat ac arcu quis venenatis. In vel gravida quam.'
        })
    }

    var dummy = {
        _slFocusedDataItemChanged: function (aKeyNew: any, aItemNew: any, aElNew: HTMLElement,
                                             aKeyOld: any, aItemOld: any, aElOld: HTMLElement) {
            var p = document.createElement("p");
            p.innerHTML = aItemNew.text;
            var focusInfo = focus.getElement();
            focusInfo.insertBefore(p, focusInfo.firstChild);
        },

        _slItemSelected: function (a, b, c) {
            debugger
        }
    };

    var listHorizontal: Controls.CListControl;
    listHorizontal = new Controls.CListControl(null);
    listHorizontal.setId('horizontal');
    listHorizontal.setListData(data);
    listHorizontal.setItemWidth(100);
    listHorizontal.setAnimation(true);
    listHorizontal.setOrientation(Controls.TParamOrientation.EHorizontal);
    listHorizontal.setScrollScheme(Controls.TParamScrollScheme.EByFixed);
    listHorizontal.connectFocusedDataItemChanged(dummy, "_slFocusedDataItemChanged", dummy._slFocusedDataItemChanged);
    listHorizontal.connectItemSelected(dummy, "_slItemSelected", dummy._slItemSelected);
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
    listVertical.connectFocusedDataItemChanged(dummy, "_slFocusedDataItemChanged", dummy._slFocusedDataItemChanged);
    listVertical.connectItemSelected(dummy, "_slItemSelected", dummy._slItemSelected);
    listVertical.setRedrawAfterOperation(true);
    listVertical.setDataDrawer(function (aKey:any, aItem:any, aEl:HTMLElement) {
        aEl.classList.add(aItem.type);
        aEl.style.opacity = '.5';
        aEl.innerText = aKey + ": " + aItem.text;
        return Controls.TFocusInfo.KFocusAble;
    });

    var root = new Controls.CLayoutGroupControl(document.body);
    root.setOrientation(Controls.TParamOrientation.EVertical);
    root.setOwnedChildControls([listHorizontal, listVertical, focus]);
    root.draw();
    root.setActiveFocus();

    document.body.addEventListener('keydown', function (e) {
        var keyStr = e['keyIdentifier'];
        var handled = root.doKey(keyStr);
        console.log(handled);

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
